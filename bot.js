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
  if (botStatus.lSpeed < 9) {
    botStatus.lSpeed++;
  }
  if (botStatus.rSpeed < 9) {
    botStatus.rSpeed++;
  }
  sendCommand();
};

function backward() {
  if (botStatus.lSpeed > -9) {
    botStatus.lSpeed--;
  }
  if (botStatus.rSpeed > -9) {
    botStatus.rSpeed--;
  }
  sendCommand();
};

function left() {
  if (botStatus.lSpeed > -5) {
    botStatus.lSpeed--;
  }
  if (botStatus.rSpeed < 5) {
    botStatus.rSpeed++;
  }
  sendCommand();
};

function right() {
  if (botStatus.lSpeed < 5) {
    botStatus.lSpeed++;
  }
  if (botStatus.rSpeed > -5) {
    botStatus.rSpeed--;
  }
  sendCommand();
};

function stop(socket) {
  botStatus.lSpeed = 0;
  botStatus.rSpeed = 0;
  sendCommand(true);
};

function sendCommand(stop) {
  var lSpeed = stop ? 0 : Math.max(2, Math.abs(botStatus.lSpeed));
  var rSpeed = stop ? 0 : Math.max(2, Math.abs(botStatus.rSpeed));
  var lDir = botStatus.lSpeed > 0 ? 1 : 0;
  var rDir = botStatus.rSpeed > 0 ? 1 : 0;
  var cmd = "d" + lDir +
    "f" + rDir +
    "l" + lSpeed +
    "r" + rSpeed;

  console.log('sending cmd', cmd);
  bot.write(cmd);
};

function moveCamera(isLeft) {
  var dir = isLeft ? "0" : "1";
  console.log('servo,', "s" + dir);
  bot.write("s" + dir);
};

function centerCamera() {
  bot.write("c0");
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
    console.log('data', data);
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
      case "c":
        centerCamera();
        break;
    }

    socket.emit("status", botStatus);
      console.log(data.code);
  });
});

server.listen(8001);


