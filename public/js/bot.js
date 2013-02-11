var Bot = function() {
  this.init();
};

Bot.prototype.forward = function() {
  this.socket.emit('command', {code: "f"});
}

Bot.prototype.backward = function() {
  this.socket.emit('command', {code: "b"});
}

Bot.prototype.left = function(on) {
   this.socket.emit('command', {code: "l"});
}

Bot.prototype.right = function(on) {
   this.socket.emit('command', {code: "r"});
}

Bot.prototype.stop = function() {
  this.socket.emit('command', {code: 's'});
}

Bot.prototype.camLeft = function() {
  this.socket.emit('command', {code: 'z'});
}

Bot.prototype.camRight = function() {
  this.socket.emit('command', {code: 'x'});
}

Bot.prototype.init = function() {
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
        this.camLeft();
        break;
      case 39:
        this.camRight();
        break;
    }
  }.bind(this));

  this.initVideo();

  this.socket = io.connect('/');
  this.socket.on('status', this.onStatus.bind(this));
}

Bot.prototype.onStatus = function(data) {
  console.log(data);
}


Bot.prototype.initVideo = function() {
  var url = "http://" + window.location.hostname + ":8000/?action=stream";

  $("<img>").attr("src", url).appendTo(".video");
}
