#include <SoftwareSerial.h> 
#include <ESP8266WiFi.h>

const char * ssid = "hottest spot";
const char * password = "12345678";
const char * server_ip = "192.168.106.248";
const int port = 8080;

#define RX_PIN D2 
#define TX_PIN D1 

int start_reading = 0;
WiFiClient client;

SoftwareSerial commSerial(TX_PIN, RX_PIN); 
char command; 

void setup() { 
  Serial.begin(9600); 
  //Serial Comm (Serial Monitor) 
  commSerial.begin(115200); 
  //NodeMCU comm 

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected!");
} 

void loop() { 
  //if the nodeMCU is sendig data 
  if(commSerial.available() > 0) { 
    //Save the received string in the variable command 
    command = (uint8_t)commSerial.read(); 
    if (command == '0') {
      start_reading = 1;
      commSerial.write('1');
    }
    //Show the received string on the Arduino Serial 
    if (start_reading) {
      if (client.connect(server_ip, port)) {
        //Serial.println(WiFi.localIP());
        client.print(command);
      }
      //Serial.println(command); 
      client.stop();
    }
  }
}
