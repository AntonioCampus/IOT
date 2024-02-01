#include <SoftwareSerial.h>

#define RX_PIN 8
#define TX_PIN 9

int sync = 0;
char command;

SoftwareSerial commSerial(TX_PIN, RX_PIN); 
void setup() { 
  //Serial Comm (Serial Monitor) 
  Serial.begin(9600); 
  //New Serial Comm (Arduino) 
  commSerial.begin(115200); 
} 

void loop() { 
  if (!sync) delay(2000);
  commSerial.write('0'); 
  if (!sync && commSerial.available() > 0) {
    command = (uint8_t)commSerial.read(); 
    if (command == '1') sync = 1;
  }
}
