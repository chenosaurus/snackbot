#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
 
#define MotorSpeedSet        0x82
#define PWMFrequenceSet      0x84
#define DirectionSet         0xaa
#define MotorA               0xa1
#define MotorB               0xa5
#define Nothing              0x01

#define I2CMotorDriverAdd    0x0a  

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
#define SERVOMIN  200 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  650 // this is the 'maximum' pulse length count (out of 4096)

uint8_t servonum = 15;

int camPos = 90;
int leftSpeed = 0;
int rightSpeed = 0;
boolean leftForward = true;
boolean rightForward = true;

int commandState = 0; //1 = motor 2 = servo
 
 
void setup() {
  //cam.attach(5); 
  Wire.begin(); // join i2c bus (address optional for master)
  delayMicroseconds(10000); //wait for motor driver to initialization
  Serial.begin(9600);
  
  pwm.begin();
  
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
}

void checkCommandState(char code) {
  if (code == 'l') {
   Serial.write("motor left speed mode\n");
   commandState = 1; 
  } else if (code == 's') {
    Serial.write("servo mode\n");
    commandState = 2; 
  } else if (code == 'r') {
    Serial.write("motor right speed mode\n");
    commandState = 3; 
  } else if (code == 'd') {
    Serial.write("motor left direction mode\n");
    commandState = 4;
  } else if (code == 'f') {
    Serial.write("motor right direct mode\n");
    commandState = 5;
  } else {
    commandState = 0;
  }
}

void checkCommand(char code) {
  if (commandState == 1) {
    //execute motor control 
    setMotorSpeed(true, code);
  } else if (commandState == 2) {
    //execute servo control 
    checkCameraCommand(code);
  } else if (commandState == 3) {
    setMotorSpeed(false, code); 
  } else if (commandState == 4) {
    setMotorDirection(true, code);
  } else if (commandState == 5) {
    setMotorDirection(false, code);
  }
  
  
  commandState = 0;
}

void setMotorDirection(boolean left, char code) {
  boolean dir = true;
  if (code == '1') {
    dir = true; 
  } else if (code == '0') {
    dir = false;
  }
  
  if (left) {
    leftForward = dir;
  } else {
    rightForward = dir;
  }
  
  forward(leftSpeed, rightSpeed);
//  motorSet(leftSpeed, rightSpeed, leftForward, rightForward);
}

void setMotorSpeed(boolean left, char code) {
  int spd;
  switch(code) {
    case '0':
      spd = 0;
      break;
    case '1':
      spd = 10;
      break;
    case '2':
      spd = 20;
      break;
    case '3':
      spd = 30;
      break;
    case '4':
      spd = 40;
      break;
    case '5':
      spd = 50;
      break;
    case '6':
      spd = 60;
      break;
    case '7':
      spd = 70;
      break;
    case '8':
      spd = 80;
      break;
    case '9':
      spd = 90;
      break;
  }
  if (left) {
    leftSpeed = spd;
  } else {
    rightSpeed = spd;
  }
  
 
  motorSet(leftSpeed, rightSpeed, leftForward, rightForward);
  Serial.println(leftSpeed);
  Serial.println(rightSpeed);
 
}

void checkCameraCommand(char code) {
  if (code == '0') {
    camLeft(); 
  } else if (code == '1') {
    camRight();
  }
}


void loop() {
  if (Serial.available()) {   
    char ch = Serial.read();
    
    if (commandState == 0) {
      checkCommandState(ch); 
    } else {
      checkCommand(ch); 
    }    
  }
  
  //set cam position
 // cam.write(camPos);
  camUpdate();
//  if (isForward) {
//    forward(leftSpeed, rightSpeed);
//  } else {
//    
//  }

}
