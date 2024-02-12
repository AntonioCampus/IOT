#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define MSG_BUFFER_SIZE  (50)

// CONFIG
#define ACTIVATION_TIME 1000 // 1000 = 1s

// OUTPUT PINS
#define BUZZER_INPUT_PIN D8
#define STATUS_LED D7

// CONNECTION DETAILS
const char* ssid = "Casa";
const char* password = "12345678";

// MQTT
const char* mqtt_server = "mqtt.eclipseprojects.io";
const char * topic = "zone1"; // change the topic to zone<zone_id> when configuring the zone
const int port = 1883;

WiFiClient espClient;
PubSubClient client(espClient); 

unsigned long lastMsg = 0;
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {
  delay(10);
  // Connecting to WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    // while WiFi is not connected, the LED blinks
    digitalWrite(STATUS_LED, HIGH);
    delay(500);
    Serial.print(".");
    digitalWrite(STATUS_LED, LOW);
  }

  // Connected
  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  /**
   * This function will be called each time a new messaged is received.
   * When the actuator receives the activation command from the server through the
   * MQTT broker, it turns on both the buzzer and the LED
   */
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  if (*payload == '1') activateBuzzer();
  Serial.println();
}

void reconnect() {
  // try to reconnect to MQTT broker
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) { 
      Serial.println("connected");
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  // set pins
  pinMode(BUZZER_INPUT_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  Serial.begin(9600);

  // set WiFi
  setup_wifi();

  // set MQTT
  client.setServer(mqtt_server, port);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    // try to reconnect
    reconnect();
  }

  // idle while wainting commands
  client.loop();
}

void activateBuzzer() {
  
  digitalWrite(BUZZER_INPUT_PIN, HIGH);
  delay(ACTIVATION_TIME);
  digitalWrite(BUZZER_INPUT_PIN, LOW);
}
