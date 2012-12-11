var express     = require("express"),
    app         = express(),
    serialport  = require("serialport"),
    SerialPort = serialport.SerialPort; 

// var bot = new SerialPort("/dev/ttyAMA0", {
//    baudrate: 9600 
// });

// //var bot = new SerialPort("/dev/tty.usbmodemfa131", {
//  // baudrate: 9600
// //});

// bot.on("data", function (data) {
//   console.log(data.toString());
// });


function forward() {
  bot.write('f');
}

function backward() {
  bot.write('b');
}

function left() {
  bot.write('l');
}

function right() {
  bot.write('r');
}

function stop() {
  bot.write('s');
}

app.use(express.static(__dirname + '/public'));

app.get('/command/f', function(req, res){
  res.send('ok');
  forward();
});

app.get('/command/b', function(req, res){
  res.send('ok');
  backward();
});

app.get('/command/l', function(req, res){
  res.send('ok');
  left();
});

app.get('/command/r', function(req, res){
  res.send('ok');
  right();
});

app.get('/command/s', function(req, res){
  res.send('ok');
  stop();
});

app.listen(80);


