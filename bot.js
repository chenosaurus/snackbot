var express     = require("express"),
    http        = require("http"),
    app         = express(),
    server      = http.createServer(app),
    io          = require('socket.io').listen(server),
    serialport  = require("serialport"),
    SerialPort  = serialport.SerialPort;

var bot = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600
});

// //var bot = new SerialPort("/dev/tty.usbmodemfa131", {
//  // baudrate: 9600
// //});

bot.on("data", function (data) {
  console.log(data.toString());
});

//dummy
//var bot = {write: function() {}};

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

io.sockets.on('connection', function (socket) {
  socket.on('command', function (data) {
    switch (data.code) {
      case "f":
        forward();
        break;
      case "b":
        backward();
        break;
      case "l":
        left();
        break;
      case "r":
        right();
        break;
      case "s":
        stop();
        break;

    }
      console.log(data.code);
  });
});

server.listen(8000);


