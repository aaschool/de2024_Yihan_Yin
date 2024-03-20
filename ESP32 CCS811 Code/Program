#include <Wire.h>    // I2C library
#include "ccs811.h"  // CCS811 library

CCS811 ccs811(21); // Use GPIO21 for the nWAKE pin on the ESP32

void setup() {
  Serial.begin(115200);
  Serial.println("");
  Serial.println("setup: Starting CCS811 basic demo with people density estimation");
  Serial.print("setup: ccs811 lib version: "); Serial.println(CCS811_VERSION);

  Wire.begin(); 
  
  bool ok= ccs811.begin();
  if( !ok ) Serial.println("setup: CCS811 begin FAILED");

  Serial.print("setup: hardware version: "); Serial.println(ccs811.hardware_version(), HEX);
  Serial.print("setup: bootloader version: "); Serial.println(ccs811.bootloader_version(), HEX);
  Serial.print("setup: application version: "); Serial.println(ccs811.application_version(), HEX);
  
  ok= ccs811.start(CCS811_MODE_1SEC);
  if( !ok ) Serial.println("setup: CCS811 start FAILED");
}

void loop() {
  uint16_t eco2, etvoc, errstat, raw;
  ccs811.read(&eco2, &etvoc, &errstat, &raw); 
  
  if( errstat==CCS811_ERRSTAT_OK ) {
    Serial.print("CCS811: ");
    Serial.print("eco2=");  Serial.print(eco2);     Serial.print(" ppm  ");
    Serial.print("etvoc="); Serial.print(etvoc);    Serial.print(" ppb  ");
    Serial.println();

    // People density estimation
    // Assuming 400ppm as base CO2 level with no people and 40ppm increase per person per hour
    int baseCO2 = 400; 
    float ppmPerPerson = 40;
    float peopleDensity = (eco2 - baseCO2) / ppmPerPerson;

    Serial.print("Estimated People Density: ");
    Serial.println(peopleDensity);
  } else if( errstat==CCS811_ERRSTAT_OK_NODATA ) {
    Serial.println("CCS811: waiting for (new) data");
  } else if( errstat & CCS811_ERRSTAT_I2CFAIL ) { 
    Serial.println("CCS811: I2C error");
  } else {
    Serial.print("CCS811: errstat="); Serial.print(errstat,HEX); 
    Serial.print("="); Serial.println( ccs811.errstat_str(errstat) ); 
  }

  delay(1000);
}
