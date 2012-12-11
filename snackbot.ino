//Motor control setup
int pinI1 = 8;//define I1 interface
int pinI2 = 11;//define I2 interface 
int speedpinA = 9;//enable motor A
int pinI3 = 12;//define I3 interface 
int pinI4 = 13;//define I4 interface 
int speedpinB = 10;//enable motor B
int sp = 150;
unsigned int counter = 0;
int timeout = 25000;
int turnTimeout = 15000;
int even = 0;
int stopat = 0;
 
void setup() {
  Serial.begin(9600);
  pinMode(pinI1,OUTPUT);
  pinMode(pinI2,OUTPUT);
  pinMode(speedpinA,OUTPUT);
  pinMode(pinI3,OUTPUT);
  pinMode(pinI4,OUTPUT);
  pinMode(speedpinB,OUTPUT);
}
 
void setStop(int count) {
  counter = 0;
  stopat = count;
}

void clearStop() {
  stopat = 0; 
}

void left() {
  updateSpeed();
  digitalWrite(pinI4,HIGH);
  digitalWrite(pinI3,LOW);
  digitalWrite(pinI2,LOW);
  digitalWrite(pinI1,HIGH);
  setStop(turnTimeout);
}

void right() {
  updateSpeed();
  digitalWrite(pinI4,LOW);
  digitalWrite(pinI3,HIGH);
  digitalWrite(pinI2,HIGH);
  digitalWrite(pinI1,LOW);
  setStop(turnTimeout);
}

void forward() {
  updateSpeed();
  digitalWrite(pinI4,HIGH);
  digitalWrite(pinI3,LOW);
  digitalWrite(pinI2,HIGH);
  digitalWrite(pinI1,LOW);
  setStop(timeout);
}

void backward() {
  updateSpeed();
  digitalWrite(pinI4,LOW);
  digitalWrite(pinI3,HIGH);
  digitalWrite(pinI2,LOW);
  digitalWrite(pinI1,HIGH);
  setStop(timeout);
}

void updateSpeed() {
  analogWrite(speedpinA, sp);
  analogWrite(speedpinB, sp);
}

void stop() {
   digitalWrite(speedpinA, LOW);
   digitalWrite(speedpinB, LOW);
   clearStop();
}

void loop() {
  if (Serial.available()) {
    char ch = Serial.read();
    
    switch(ch) {
      case 'f':
        forward();
        Serial.write("fOK");
        break;
      case 'b':
        backward();
        Serial.write("bOK");
        break;
      case 'l':
        left();
        Serial.write("lOK");
        break;
      case 'r':
        right();
        Serial.write("rOK");
        break;
      case 's':
        stop();
        Serial.write("sOK");
        break;
      case '1':
        sp = 150;
        updateSpeed();
        break;
      case '2':
        sp = 100;
        updateSpeed();
        break;
      case '3':
        sp = 50;
        updateSpeed();
        break;

    }    
  }
  
  if (even == 0) {
   even = 1; 
  } else {
    counter++;
    even = 0;
  }
  
  if (counter >= 60000) {
    counter = 0; 
  }
  
  if (stopat != 0 && counter >= stopat) {
     stop();
  }
}
