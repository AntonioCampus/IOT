//
// Created by indrek on 1.05.2016.
//

// set EXAMPLE to EXAMPLE_UART in setup.h to activate
#include "ExampleUART.h"


#include "Arduino.h"
#include "CameraOV7670.h"



char str[10];

#define UART_MODE 5




const uint8_t VERSION = 0x10;
const uint8_t COMMAND_NEW_FRAME = 0x01 | VERSION;
const uint8_t COMMAND_DEBUG_DATA = 0x03 | VERSION;

const uint16_t UART_PIXEL_FORMAT_RGB565 = 0x01;
const uint16_t UART_PIXEL_FORMAT_GRAYSCALE = 0x02;

// Pixel byte parity check:
// Pixel Byte H: odd number of bits under H_BYTE_PARITY_CHECK and H_BYTE_PARITY_INVERT
// Pixel Byte L: even number of bits under L_BYTE_PARITY_CHECK and L_BYTE_PARITY_INVERT
//                                          H:RRRRRGGG
const uint8_t H_BYTE_PARITY_CHECK =  0b00100000;
const uint8_t H_BYTE_PARITY_INVERT = 0b00001000;
//                                          L:GGGBBBBB
const uint8_t L_BYTE_PARITY_CHECK =  0b00001000;
const uint8_t L_BYTE_PARITY_INVERT = 0b00100000;
// Since the parity for L byte can be zero we must ensure that the total byet value is above zero.
// Increasing the lowest bit of blue color is OK for that.
const uint8_t L_BYTE_PREVENT_ZERO  = 0b00000001;


const uint16_t COLOR_GREEN = 0x07E0;
const uint16_t COLOR_RED = 0xF800;



void processGrayscaleFrameBuffered();
void processGrayscaleFrameDirect();
void processRgbFrameBuffered();
void processRgbFrameDirect();
typedef void (*ProcessFrameData)(void) ;




#if UART_MODE==5
const uint16_t lineLength = 160;
const uint16_t lineCount = 120;
const uint32_t baud  = 115200;
const ProcessFrameData processFrameData = processRgbFrameBuffered; //processRgbFrameBuffered; //processRgbFrameDirect;
const uint16_t lineBufferLength = lineLength * 2;
const bool isSendWhileBuffering = true;
const uint8_t uartPixelFormat = UART_PIXEL_FORMAT_RGB565;
CameraOV7670 camera(CameraOV7670::RESOLUTION_QVGA_320x240, CameraOV7670::PIXEL_RGB565, 32);
#endif





uint8_t lineBuffer [lineBufferLength]; // Two bytes per pixel
uint8_t * lineBufferSendByte;
bool isLineBufferSendHighByte;
bool isLineBufferByteFormatted;

uint16_t frameCounter = 0;
uint16_t processedByteCountDuringCameraRead = 0;


void commandStartNewFrame(uint8_t pixelFormat);
void commandDebugPrint(const String debugText);
uint8_t sendNextCommandByte(uint8_t checksum, uint8_t commandByte);

void sendBlankFrame(uint16_t color);
inline void processNextGrayscalePixelByteInBuffer() __attribute__((always_inline));
inline void processNextRgbPixelByteInBuffer() __attribute__((always_inline));
inline void tryToSendNextRgbPixelByteInBuffer() __attribute__((always_inline));
inline void formatNextRgbPixelByteInBuffer() __attribute__((always_inline));
inline uint8_t formatRgbPixelByteH(uint8_t byte) __attribute__((always_inline));
inline uint8_t formatRgbPixelByteL(uint8_t byte) __attribute__((always_inline));
inline uint8_t formatPixelByteGrayscaleFirst(uint8_t byte) __attribute__((always_inline));
inline uint8_t formatPixelByteGrayscaleSecond(uint8_t byte) __attribute__((always_inline));
inline void waitForPreviousUartByteToBeSent() __attribute__((always_inline));
inline bool isUartReady() __attribute__((always_inline));



// this is called in Arduino setup() function
void initializeScreenAndCamera() {

  // Enable this for WAVGAT CPUs
  // For UART communiation we want to set WAVGAT Nano to 16Mhz to match Atmel based Arduino
  //CLKPR = 0x80; // enter clock rate change mode
  //CLKPR = 1; // set prescaler to 1. WAVGAT MCU has it 3 by default.

  Serial.begin(baud);
  camera.init();
  /*
  if (camera.init()) {
    sendBlankFrame(COLOR_GREEN);
    delay(1000);
  } else {
    sendBlankFrame(COLOR_RED);
    delay(3000);
  }
  */
}


void sendBlankFrame(uint16_t color) {
  uint8_t colorH = (color >> 8) & 0xFF;
  uint8_t colorL = color & 0xFF;

  commandStartNewFrame(UART_PIXEL_FORMAT_RGB565);
  for (uint16_t j=0; j<lineCount; j++) {
    for (uint16_t i=0; i<lineLength; i++) {
      waitForPreviousUartByteToBeSent();
      UDR0 = formatRgbPixelByteH(colorH);
      waitForPreviousUartByteToBeSent();
      UDR0 = formatRgbPixelByteL(colorL);
    }
  }
}




// this is called in Arduino loop() function
void processFrame() {
  processedByteCountDuringCameraRead = 0;
  commandStartNewFrame(uartPixelFormat);
  noInterrupts();
  processFrameData();
  interrupts();
  frameCounter++;
  //commandDebugPrint("Frame " + String(frameCounter)/* + " " + String(processedByteCountDuringCameraRead)*/);
  //commandDebugPrint("Frame " + String(frameCounter, 16)); // send number in hexadecimal
}




void processRgbFrameBuffered() {
  camera.waitForVsync();
  //commandDebugPrint("Vsync");

  camera.ignoreVerticalPadding();

  for (uint16_t y = 0; y < lineCount; y++) {
    lineBufferSendByte = &lineBuffer[0];
    isLineBufferSendHighByte = true; // Line starts with High byte
    isLineBufferByteFormatted = false;

    camera.ignoreHorizontalPaddingLeft();

    for (uint16_t x = 0; x < lineBufferLength;  x++) {
     
      camera.waitForPixelClockRisingEdge();
      camera.readPixelByte(lineBuffer[x]);
      
      if (isSendWhileBuffering) {
        processNextRgbPixelByteInBuffer();
      }
    };

    camera.ignoreHorizontalPaddingRight();

    // Debug info to get some feedback how mutch data was processed during line read.
    processedByteCountDuringCameraRead = lineBufferSendByte - (&lineBuffer[0]);

    // send rest of the line
    while (lineBufferSendByte < &lineBuffer[lineLength * 2]) {
      processNextRgbPixelByteInBuffer();
    }
  }
  
}

// this first wrapper to send frame
void processNextRgbPixelByteInBuffer() {
  // Format pixel bytes and send out in different cycles.
  // There is not enough time to do both on faster frame rates.
  // in processRgbFrameBuffered isLineBufferByteFormatted is equal to 5
  if (isLineBufferByteFormatted) {
    tryToSendNextRgbPixelByteInBuffer();
  } else {
    formatNextRgbPixelByteInBuffer();
  }
}


  
void formatNextRgbPixelByteInBuffer() {
  // // in processRgbFrameBuffered isLineBufferByteFormatted is equal to 5
  if (isLineBufferSendHighByte) {
    *lineBufferSendByte = formatRgbPixelByteH(*lineBufferSendByte);
  } else {
    *lineBufferSendByte = formatRgbPixelByteL(*lineBufferSendByte);
  }
  isLineBufferByteFormatted = true;
  isLineBufferSendHighByte = !isLineBufferSendHighByte;
}




// RRRRRGGG
uint8_t formatRgbPixelByteH(uint8_t pixelByteH) {
  // Make sure that
  // A: pixel color always slightly above 0 since zero is end of line marker
  // B: odd number of bits for H byte under H_BYTE_PARITY_CHECK and H_BYTE_PARITY_INVERT to enable error correction
  if (pixelByteH & H_BYTE_PARITY_CHECK) {
    return pixelByteH & (~H_BYTE_PARITY_INVERT);
  } else {
    return pixelByteH | H_BYTE_PARITY_INVERT;
  }
}


// GGGBBBBB
uint8_t formatRgbPixelByteL(uint8_t pixelByteL) {
  // Make sure that
  // A: pixel color always slightly above 0 since zero is end of line marker
  // B: even number of bits for L byte under L_BYTE_PARITY_CHECK and L_BYTE_PARITY_INVERT to enable error correction
  if (pixelByteL & L_BYTE_PARITY_CHECK) {
    return pixelByteL | L_BYTE_PARITY_INVERT | L_BYTE_PREVENT_ZERO;
  } else {
    return (pixelByteL & (~L_BYTE_PARITY_INVERT)) | L_BYTE_PREVENT_ZERO;
  }
}



// send byte to uart
void tryToSendNextRgbPixelByteInBuffer() {
  if (isUartReady()) {
    UDR0 = *lineBufferSendByte;
    lineBufferSendByte++;
    isLineBufferByteFormatted = false;
  }
}






void commandStartNewFrame(uint8_t pixelFormat) {
  waitForPreviousUartByteToBeSent();
  UDR0 = 0x00; // New command

  waitForPreviousUartByteToBeSent();
  UDR0 = 4; // Command length

  uint8_t checksum = 0;
  checksum = sendNextCommandByte(checksum, COMMAND_NEW_FRAME);
  checksum = sendNextCommandByte(checksum, lineLength & 0xFF); // lower 8 bits of image width
  checksum = sendNextCommandByte(checksum, lineCount & 0xFF); // lower 8 bits of image height
  checksum = sendNextCommandByte(checksum, 
      ((lineLength >> 8) & 0x03) // higher 2 bits of image width
      | ((lineCount >> 6) & 0x0C) // higher 2 bits of image height
      | ((pixelFormat << 4) & 0xF0));

  waitForPreviousUartByteToBeSent();
  UDR0 = checksum;
}


void commandDebugPrint(const String debugText) {
  if (debugText.length() > 0) {
    
    waitForPreviousUartByteToBeSent();
    UDR0 = 0x00; // New commnad

    waitForPreviousUartByteToBeSent();
    UDR0 = debugText.length() + 1; // Command length. +1 for command code.
    
    uint8_t checksum = 0;
    checksum = sendNextCommandByte(checksum, COMMAND_DEBUG_DATA);
    for (uint16_t i=0; i<debugText.length(); i++) {
      checksum = sendNextCommandByte(checksum, debugText[i]);
    }

    waitForPreviousUartByteToBeSent();
    UDR0 = checksum;
  }
}


uint8_t sendNextCommandByte(uint8_t checksum, uint8_t commandByte) {
  waitForPreviousUartByteToBeSent();
  UDR0 = commandByte;
  return checksum ^ commandByte;
}




void waitForPreviousUartByteToBeSent() {
  while(!isUartReady()); //wait for byte to transmit
}


bool isUartReady() {
  return UCSR0A & (1<<UDRE0);
}
