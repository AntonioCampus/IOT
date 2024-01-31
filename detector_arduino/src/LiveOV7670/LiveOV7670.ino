




// change setup.h to switch between buffered and pixel-by-pixel processing
#include "ExampleUART.h"



void setup() {
  // This is not necessary and has no effect for ATMEGA based Arduinos.
  // WAVGAT Nano has slower clock rate by default. We want to reset it to maximum speed
  CLKPR = 0x80; // enter clock rate change mode
  CLKPR = 0; // set prescaler to 0. WAVGAT MCU has it 3 by default.

  initializeScreenAndCamera();
}

int x = 1;

void loop() {
  if(x>0){
    processFrame();
    x--;
  }
}
