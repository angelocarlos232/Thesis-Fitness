#include <Firebase_ESP_Client.h>
//  #include <ArduinoJson.h> // Include the ArduinoJson library for parsing JSON
#include <time.h> // Include the time library
#include "HX711.h"

//  Sensors
#define LOADCELL_DOUT_PIN 4
#define LOADCELL_SCK_PIN 5

#define TRIG_PIN 12
#define ECHO_PIN 13

#define WIFI_SSID "Rooftop"
#define WIFI_PASSWORD "R00ftough!!!"
// #define WIFI_SSID "sinigang mix"
// #define WIFI_PASSWORD "kisssabayhug"

// Firebase API Key, Project ID, and user credentials
#define API_KEY "AIzaSyBE1tbbRldVIrsbPtO-BV5L6T_cvWnw74Y" //myAPI
#define FIREBASE_PROJECT_ID "esp8266-aeab1" //myID
// #define API_KEY "AIzaSyDrv0bCtKlYgvv3b_cFfaVskdtex2rHiSs"
// #define FIREBASE_PROJECT_ID "chillipepper-f1952"

#define USER_EMAIL "yen.gestrude26@gmail.com"
#define USER_PASSWORD "renyenzen"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

HX711 scale;

void setup()
{
  Serial.begin(115200);
  
  // Initialize the HX711
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(); // Set the scale to the default value
  scale.tare(); // Reset the scale to zero

  // Initialize the HC-SR04 sensor
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Firebase.begin(&config, &auth);
  // Check if Firebase is connected
  if (Firebase.ready()) {
    Serial.println("Firebase connected successfully!");
  } else {
    Serial.println("Failed to connect to Firebase!");
  }
  Firebase.reconnectWiFi(true);

  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("Time synchronized.");
}

void loop()
{
  // Incase wifi shutted down or restarts
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected. Attempting to reconnect...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
    int attempt = 0;
    while (WiFi.status() != WL_CONNECTED && attempt < 100) {
      delay(500);
      Serial.print(".");
      attempt++;
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nWiFi reconnected!");
    } else {
      Serial.println("\nFailed to reconnect to WiFi. Restarting...");
      ESP.restart();
    }
  }
  
  // Reading from HX711
  float weight = scale.get_units(5); // Get the average of 5 readings

  // Reading from HC-SR04
  long duration;
  float distance;

  // Trigger the HC-SR04 sensor
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Read the echo
  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration * 0.0343) / 2; // Convert to centimeters

  // Fetch current date and time
  String datetime = getDateTime();
  String date = datetime.substring(0, 10);            // Extract date part
  String timeonly = datetime.substring(11, 19);
  String currentHour = datetime.substring(11, 13);
  int nextHour = currentHour.toInt();
  int originalNextHour = nextHour;                    // Store the original nextHour value
  nextHour = (nextHour + 1) % 24;                     // Adding 1 and using modulo operator to handle 24

  Serial.print("Date: ");
  Serial.println(date);
  Serial.print("Time: ");
  Serial.println(timeonly);
  Serial.print("Next Upload: ");
  Serial.println(padDigits(nextHour) + ":00");
  
  // Print weight and distance
  Serial.print("Weight: ");
  Serial.print(weight);
  Serial.print(" kg");

  Serial.print(" | Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Check if the date synchronized and the time for sending data to firestore hourly
  // if (timeonly == padDigits(originalNextHour) + ":00" && date != "1970-01-01")
  // {
    // Sensor data to upload to Firestore
    uploadDataToFirebase();
  // }

  delay(5000);
}

void uploadDataToFirebase()
{
  String datetime1 = getDateTime();
  String hourOnly = datetime1.substring(11, 13); // Extract hour part
  String documentPath = "Sensors/" + getDate() + hourOnly;
  FirebaseJson content;

  // Reading from HX711
  float weight = scale.get_units(5); // Get the average of 5 readings

  // Reading from HC-SR04
  long duration;
  float distance;

  // Trigger the HC-SR04 sensor
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Read the echo
  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration * 0.0343) / 2; // Convert to centimeters

  if ((weight) && (distance)) {
    content.set("fields/weight/stringValue", String(weight, 2));
    content.set("fields/height/stringValue", String(distance, 2));
    content.set("fields/date/stringValue", datetime1);

    Serial.print("Adding Sensors Data... ");
    if (Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "weight") 
    && Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "height") 
    && Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "date"))
    {
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
    }
    else
    {
      Serial.printf("Failed to add data: %s\n", fbdo.errorReason().c_str());
      Serial.printf("Firestore operation: %s\n", fbdo.dataPath().c_str());
    }
  }
  else {
    Serial.println("Failed to read sensor data.");
  }
}

String getDateTime() {
  time_t now = time(nullptr);

  struct tm *timeinfo;
  timeinfo = localtime(&now);

  timeinfo->tm_hour += 8;
  mktime(timeinfo); 
  
  char datetime[20];
  strftime(datetime, sizeof(datetime), "%Y-%m-%d %H:%M", timeinfo);
  return String(datetime);
}

String getDate()
{
  time_t now = time(nullptr);

  struct tm *timeinfo;
  timeinfo = localtime(&now);

  timeinfo->tm_hour += 8;
  mktime(timeinfo); 
  char dateonly[20];
  strftime(dateonly, sizeof(dateonly), "%Y%m%d", timeinfo);
  return String(dateonly);
}

String padDigits(int num)
{
  if (num < 10)
  {
    return "0" + String(num);
  }
  return String(num);
}
