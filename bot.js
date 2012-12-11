var express     = require("express"),
    app         = express(),
    http        = require('http'),
    server      = http.createServer(app),
    io          = require('socket.io').listen(server),
    SerialPort  = require("serialport").SerialPort,
    bot         = new SerialPort("/dev/ttyACM0", {
      baudrate: 9600
    });

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

io.sockets.on('connection', function(socket) {
  socket.on('f', function(data) {
    forward();
  });
  socket.on('b', function(data) {
    backward();
  });
  socket.on('l', function(data) {
    left();
  });
  socket.on('r', function(data) {
    right();
  });
  socket.on('s', function(data) {
    stop();
  });
});

server.listen(80);


