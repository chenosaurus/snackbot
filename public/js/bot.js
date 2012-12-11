var Bot = function() {
  this.init();
};

Bot.prototype.forward = function(on) {
  if (on) {
    this.currentState = "f";
  } else {
    this.currentState = false;
  }
}

Bot.prototype.backward = function(on) {
  if (on) {
    this.currentState = "b";
  } else {
    this.currentState = false;
  }
}

Bot.prototype.left = function(on) {
  if (on) {
    this.currentState = "l";
  } else {
    this.currentState = false;
  }
}

Bot.prototype.right = function(on) {
  if (on) {
    this.currentState = "r";
  } else {
    this.currentState = false;
  }
}

Bot.prototype.init = function() {
  var that = this;
  this.currentState = false;

  $(window).on("keydown", function(e) {
    switch(e.keyCode) {
      case 87:
        that.forward(true);
        break;
      case 83:
        that.backward(true);
        break;
      case 65:
        that.left(true);
        break;
      case 68:
        that.right(true);
        break;
      case 32:
        that.stop();
        break;
    }
  });

  $(window).on("keyup", function(e) {
    switch(e.keyCode) {
      case 87:
        that.forward(false);
        break;
      case 83:
        that.backward(false);
        break;
      case 65:
        that.left(false);
        break;
      case 68:
        that.right(false);
        break;
      case 32:
        that.stop();
        break;
    }
  });

  this.initVideo();

  setInterval(function() {
    that.sendCommand();
  }, 300);
}

Bot.prototype.stop = function() {
  $.ajax({
      url: "/command/s",
      data: {}
    });
}

Bot.prototype.sendCommand = function() {
  if (this.currentState) {
    $.ajax({
      url: "/command/" + this.currentState,
      data: {}
    });
  }
}

Bot.prototype.initVideo = function() {
  var url = "http://" + window.location.hostname + ":8000/?action=stream";

  $("<img>").attr("src", url).appendTo(".video");
}