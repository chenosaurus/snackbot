var express     = require("express"),
    app         = express(),
    http        = require('http'),
    server      = http.createServer(app),
    io          = require('socket.io').listen(server),
    SerialPort  = require("serialport").SerialPort,
    bot         = new SerialPort("/dev/ttyACM0", {
      baudrate: 9600
    });


app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
  socket.on('drive', function (data) {
    console.log(data);
    if (data.command) {
      bot.write(data.command);
    }
  });
});

server.listen(80);


