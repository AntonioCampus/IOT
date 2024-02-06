#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define BUZZER_INPUT_PIN D8
#define STATUS_LED D7

// Update these with values suitable for your network.

const char* ssid = "hottest spot";
const char* password = "12345678";
const char* mqtt_server = "mqtt.eclipseprojects.io";
const char * topic = "test";
const int port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(STATUS_LED, HIGH);
    delay(500);
    Serial.print(".");
    digitalWrite(STATUS_LED, LOW);
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  if (*payload == '1') activateBuzzer();
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
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
  pinMode(BUZZER_INPUT_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, port);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void activateBuzzer() {
  digitalWrite(BUZZER_INPUT_PIN, HIGH);
  delay(100);
  digitalWrite(BUZZER_INPUT_PIN, LOW);
}
