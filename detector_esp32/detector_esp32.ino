/**
 * DETECTOR IMPLEMENTATION based on ESP32-CAM MODULE
 * IoT Class project - Antonio Campus & Nicola Deidda
 * 
 * A.Y. 2023/2024
 * University of Cagliari
*/

#include <Arduino.h>
#include <WiFi.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"
#include <HTTPClient.h>
#include <ArduinoJson.h>

/**
 * CONFIG
 */

const char* jsonPayload = "{\"idname\":\"detector1\", \"passcode\":\"123\"}"; //SET DETECTOR ID AND PASSCODE BEFORE START
const int delay_time = 1000*60; // 1000 = 1s

// NETWORK PARAMETERS
const char* ssid = "Casa";
const char* password = "12345678";

// API PARAMETERS
#define LOCALHOST 1 // 0 -> provide URL | 1 -> provide IP address + port
#define USE_HTTPS 0 // 0 -> HTTP | 1 -> HTTPS

String serverPath = "/api/devices/classify"; 
String authPath = "api/devices/login";

#if USE_HTTPS
  String protocol = "https";
#else 
  String protocol = "http";
#endif

#if LOCALHOST
  char * server = "192.168.43.172";
  const int serverPort = 5000;
  String url = String(protocol) + "://" + String(server) + ":" + String(serverPort) + String(serverPath);
  String jwt_url = String(protocol) + "://" + String(server) + ":" + String(serverPort) + String(authPath);
#else
  char * server = "example.com";
  String url = String(protocol) + "://" + String(server) + String(serverPath);
  String jwt_url = String(protocol) + "://" + String(server) + String(authPath);
#endif

// JWT
String accessToken;

HTTPClient http;

String fileName = "image.jpg";
String contentType = "image/jpeg";

// CAMERA
camera_config_t config;

// CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const int timerInterval = 30000;    // time between each HTTP POST image
unsigned long previousMillis = 0;   // last time image was sent

void setup_wifi() {
  WiFi.mode(WIFI_STA);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    // try until WiFi is connected
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("ESP32-CAM IP Address: ");
  Serial.println(WiFi.localIP());
}

void config_camera() {
  /**
   * CAMERA CONFIGURATION
   * Each pin is mapped to SoC GPIOs
  */
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // init with high specs to pre-allocate larger buffers
  if (psramFound()) {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 10;  //0-63 lower number means higher quality
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_CIF;
    config.jpeg_quality = 12;  //0-63 lower number means higher quality
    config.fb_count = 1;
  }
}

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  Serial.begin(115200);

  // Start connecting to WiFi
  setup_wifi();

  // WiFi connected -> config & init camera
  config_camera();

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    // camera error - restart required
    Serial.printf("Camera init failed with error 0x%x", err);
    delay(1000);
    ESP.restart();
  }

  // customize camera parameters
  sensor_t * s = esp_camera_sensor_get();
  s->set_brightness(s, 1);     // -2 to 2
  s->set_contrast(s, 2);       // -2 to 2
  s->set_saturation(s, 0);     // -2 to 2
  s->set_special_effect(s, 0); // 0 to 6 (0 - No Effect, 1 - Negative, 2 - Grayscale, 3 - Red Tint, 4 - Green Tint, 5 - Blue Tint, 6 - Sepia)
  s->set_whitebal(s, 1);       // 0 = disable , 1 = enable
  s->set_awb_gain(s, 1);       // 0 = disable , 1 = enable
  s->set_wb_mode(s, 0);        // 0 to 4 - if awb_gain enabled (0 - Auto, 1 - Sunny, 2 - Cloudy, 3 - Office, 4 - Home)
  s->set_exposure_ctrl(s, 1);  // 0 = disable , 1 = enable
  s->set_aec2(s, 0);           // 0 = disable , 1 = enable
  s->set_ae_level(s, 0);       // -2 to 2
  s->set_aec_value(s, 300);    // 0 to 1200
  s->set_gain_ctrl(s, 1);      // 0 = disable , 1 = enable
  s->set_agc_gain(s, 0);       // 0 to 30
  s->set_gainceiling(s, (gainceiling_t)0);  // 0 to 6
  s->set_bpc(s, 0);            // 0 = disable , 1 = enable
  s->set_wpc(s, 1);            // 0 = disable , 1 = enable
  s->set_raw_gma(s, 1);        // 0 = disable , 1 = enable
  s->set_lenc(s, 1);           // 0 = disable , 1 = enable
  s->set_hmirror(s, 0);        // 0 = disable , 1 = enable
  s->set_vflip(s, 0);          // 0 = disable , 1 = enable
  s->set_dcw(s, 1);            // 0 = disable , 1 = enable
  s->set_colorbar(s, 0);       // 0 = disable , 1 = enable

  Serial.println("Get jwt");
  // Get auth token
  getJWT();  
}

void getJWT() {
  HTTPClient http_jwt;
  http_jwt.begin(jwt_url);
  http_jwt.addHeader("Content-Type", "application/json");

  // try authenticate to the server
  int httpCode = http_jwt.POST(jsonPayload);
  
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      // auth success
      String payload = http_jwt.getString();
      DynamicJsonDocument doc(1024);
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print("Failed to parse JSON: ");
        Serial.println(error.c_str());
      } else {
        // Extract access_token -> is the JWT
        const char * tmp = doc["access_token"];
        accessToken = String(tmp);
        Serial.println("JWT acquired - Device correctly authenticated");
      }
    } else Serial.printf("JWT - HTTP request failed with error code %d\n", httpCode);
  } else Serial.println("JWT - HTTP request failed");

  http_jwt.end();
}

void loop() {
  sendPhoto();
  delay(1000*60);
}

String sendPhoto() {
  String getAll;
  String getBody;

  camera_fb_t * fb = NULL;

  // acquire image
  fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    delay(1000);
    ESP.restart();
  }

  // image ok -> send it to the server
  http.begin(url);
  http.addHeader("Content-Type", "multipart/form-data; boundary=----BBDetector");
  http.addHeader("Authorization", "Bearer " + accessToken);

  String body = "";
  // set body structure
  body += "------BBDetector\r\n";
  body += "Content-Disposition: form-data; name=\"file\"; filename=\"" + fileName + "\"\r\n";
  body += "Content-Type: " + contentType + "\r\n\r\n";

  // inject image in the body
  for (size_t i = 0; i < fb->len; i++) {
    body += (char)fb->buf[i];
  }

  // close body content
  body += "\r\n------BBDetector--\r\n";

  // Send the POST request with data
  int httpResponseCode = http.POST(body);

  // Check for a successful response
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    // Print the response payload
    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.print("HTTP Request failed with error code: ");
    Serial.println(httpResponseCode);
  }

  // Close the connection
  http.end();
  esp_camera_fb_return(fb);
  delay(delay_time);
}
