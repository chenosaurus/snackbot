var express     = require("express"),
    app         = express(),
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

app.get('/command/f', function(req, res){
  res.send('ok');
  forward();
});

app.get('/command/b', function(req, res){
  res.send('ok');
  backward();
});

app.get('/command/s', function(req, res){
  res.send('ok');
  stop();
});

app.listen(80);


