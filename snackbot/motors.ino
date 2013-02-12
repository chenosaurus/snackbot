
void MotorSpeedSetAB(unsigned char MotorSpeedA , unsigned char MotorSpeedB) {
  MotorSpeedA=map(MotorSpeedA,0,100,0,255);   //translate the data from 0~100% to 0~255
  MotorSpeedB=map(MotorSpeedB,0,100,0,255);   //translate the data from 0~100% to 0~255
  Wire.beginTransmission(I2CMotorDriverAdd); // transmit to device I2CMotorDriverAdd
  Wire.write(MotorSpeedSet);        // set pwm header 
  Wire.write(MotorSpeedA);              // send pwma data 
  Wire.write(MotorSpeedB);              // send pwmb data
  Wire.endTransmission();    // stop transmitting
}
 
void MotorPWMFrequenceSet (unsigned char Frequence) {    
  Wire.beginTransmission(I2CMotorDriverAdd); // transmit to device I2CMotorDriverAdd
  Wire.write(PWMFrequenceSet);        // set frequence header
  Wire.write(Frequence);              //  send frequence data
  Wire.write(Nothing);              //  need to send this byte as the third byte(no meaning)  
  Wire.endTransmission();    // stop transmitting
}
 
void MotorDirectionSet(unsigned char Direction)  {     //  Adjust the direction of the motors 0b0000 I4 I3 I2 I1
  Wire.beginTransmission(I2CMotorDriverAdd); // transmit to device I2CMotorDriverAdd
  Wire.write(DirectionSet);        // Direction control header
  Wire.write(Direction);              // send direction control information
  Wire.write(Nothing);              // need to send this byte as the third byte(no meaning)  
  Wire.endTransmission();    // stop transmitting 
}
 
void MotorAloneStatusSet(unsigned char MotorSelect,unsigned char MotorDirection, unsigned char MotorSpeed) {
  MotorSpeed=map(MotorSpeed,0,100,0,255);  //translate the data from 0~100% to 0~255
  Wire.beginTransmission(I2CMotorDriverAdd); // transmit to device MOTORSHIELDaddr
  Wire.write(MotorSelect);        // motor select information
  Wire.write(MotorDirection);        // motor direction information
  Wire.write(MotorSpeed);            //  motor speed information
  Wire.endTransmission();    // stop transmitting 
  delay(1);
}
 
void MotorDriectionAndSpeedSet(unsigned char Direction,unsigned char MotorSpeedA,unsigned char MotorSpeedB) {  //you can adjust the driection and speed together
  MotorDirectionSet(Direction);   //  Adjust the direction of the motors 0b0000 I4 I3 I2 I1
  MotorSpeedSetAB(MotorSpeedA,MotorSpeedB);  
}

void stop() {
 MotorSpeedSetAB(0, 0);
 MotorDirectionSet(0b1010);  
}

void backward(int leftSpeed, int rightSpeed) {
  MotorSpeedSetAB(leftSpeed, rightSpeed);
  MotorDirectionSet(0b1010);
}

void forward(int leftSpeed, int rightSpeed) {
  MotorSpeedSetAB(leftSpeed, rightSpeed);
  MotorDirectionSet(0b0101); 
}

void motorSet(int leftSpeed, int rightSpeed, boolean leftForward, boolean rightForward) {
   MotorSpeedSetAB(leftSpeed, rightSpeed);
   
   if (leftForward && rightForward) {
     MotorDirectionSet(0b0101); 
   } else if (!leftForward && !rightForward) {
     MotorDirectionSet(0b1010);
   } else if (leftForward && !rightForward) {
     MotorDirectionSet(0b1001);
   } else if (!leftForward && rightForward) {
     MotorDirectionSet(0b0110);
   }
  
}
 
