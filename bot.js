var express     = require("express"),
    http        = require("http"),
    app         = express(),
    server      = http.createServer(app),
    io          = require('socket.io').listen(server),
    serialport  = require("serialport"),
    SerialPort  = serialport.SerialPort;

//var port = "/dev/tty.usbserial-FTDPYLFY";
var port = "/dev/ttyAMA0";

var bot = new SerialPort(port, {
  baudrate: 9600
});

// //var bot = new SerialPort("/dev/tty.usbmodemfa131", {
//  // baudrate: 9600
// //});

bot.on("data", function (data) {
  console.log("data:" + data.toString());
});

var botStatus = {
  lSpeed: 0,
  rSpeed: 0
};
//dummy
//var bot = {write: function() {}};



function forward() {
  if (bot.lSpeed < 9) {
    bot.lSpeed++;
  }
  if (bot.rSpeed < 9) {
    bot.rSpeed++;
  }
  sendCommand();
};

function backward() {
  if (bot.lSpeed > -9) {
    bot.lSpeed--;
  }
  if (bot.rSpeed > -9) {
    bot.rSpeed--;
  }
  sendCommand();
};

function left() {
  if (bot.lSpeed > -9) {
    bot.lSpeed--;
  }
  if (bot.rSpeed < 9) {
    bot.rSpeed++;
  }
  sendCommand();
};

function right() {
  if (bot.lSpeed < 9) {
    bot.lSpeed++;
  }
  if (bot.rSpeed > -9) {
    bot.rSpeed--;
  }
  sendCommand();
};

function stop(socket) {
  bot.lSpeed = 0;
  bot.rSpeed = 0;
  sendCommand();
};

function sendCommand() {
  var lDir = bot.lSpeed > 0 ? 1 : 0;
  var rDir = bot.rSpeed > 0 ? 1 : 0;
  bot.write("d" + lDir + 
    "f" + rDir + 
    "l" + Math.abs(botStatus.lSpeed) + 
    "r" + Math.abs(botStatus.rSpeed));
};

function moveCamera(isLeft) {
  bot.write('s' + isLeft ? '0': '1');
};

app.use(express.static(__dirname + '/public'));

// app.get('/command/f', function(req, res){
//   res.send('ok');
//   forward();
// });

// app.get('/command/b', function(req, res){
//   res.send('ok');
//   backward();
// });

// app.get('/command/l', function(req, res){
//   res.send('ok');
//   left();
// });

// app.get('/command/r', function(req, res){
//   res.send('ok');
//   right();
// });

// app.get('/command/s', function(req, res){
//   res.send('ok');
//   stop();
// });

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
      case "z":
        moveCamera(true);
        break;
      case "x":
        moveCamera(false);
        break;
    }

    socket.emit("status", botStatus);
      console.log(data.code);
  });
});

server.listen(8000);


