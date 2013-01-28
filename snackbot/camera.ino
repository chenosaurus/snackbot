void camRight() {
 camPos += 5;
 if (camPos > 180) {
   camPos = 180;
 } 
 Serial.println(camPos);
 camUpdate();
}

void camLeft() {
 camPos -= 5;
 if (camPos < 0) {
   camPos = 0;
 }
 Serial.println(camPos);
 camUpdate();
}

void camUpdate() {
  cam.write(camPos);  
}
