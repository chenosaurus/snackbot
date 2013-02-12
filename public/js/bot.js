var Bot = function() {
  this.init();
  this.camMoveTimer = false;
};

Bot.prototype.forward = function() {
  this.socket.emit('command', {code: "f"});
}

Bot.prototype.backward = function() {
  this.socket.emit('command', {code: "b"});
}

Bot.prototype.left = function() {
   this.socket.emit('command', {code: "l"});
}

Bot.prototype.right = function() {
   this.socket.emit('command', {code: "r"});
}

Bot.prototype.stop = function() {
  this.socket.emit('command', {code: 's'});
}

Bot.prototype.camLeft = function(on) {
  clearInterval(this.camMoveTimer);
  if (on) {
    setInterval(function() {
      this.socket.emit('command', {code: 'z'});
    }.bind(this), 500);
  } 
}

Bot.prototype.camRight = function(on) {
  clearInterval(this.camMoveTimer);
  if (on) {
    setInterval(function() {
      this.socket.emit('command', {code: 'x'});
    }.bind(this), 500);
  } 
}

Bot.prototype.camCenter = function() {
  this.socket.emit('command', {code: 'c'});
}


Bot.prototype.init = function() {
  $(window).on("keydown", function(e) {
      case 37:
        this.camLeft(true);
        break;
      case 39:
        this.camRight(true);
        break;
  });

  $(window).on("keyup", function(e) {
    switch(e.keyCode) {
      case 87:
        this.forward();
        break;
      case 83:
        this.backward();
        break;
      case 65:
        this.left();
        break;
      case 68:
        this.right();
        break;
      case 32:
        this.stop();
        break;
      case 37:
        this.camLeft(false);
        break;
      case 39:
        this.camRight(false);
        break;
      case 40:
        this.camCenter();
        break;
    }
  }.bind(this));

  this.initVideo();

  this.socket = io.connect('/');
  this.socket.on('status', this.onStatus.bind(this));
}

Bot.prototype.onStatus = function(data) {
  console.log('status', data);
}


Bot.prototype.initVideo = function() {
  var url = "http://" + window.location.hostname + ":8000/?action=stream";

  $("<img>").attr("src", url).appendTo(".video");
}
