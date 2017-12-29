var canvas = document.getElementById("FRAME");
var c = canvas.getContext('2d');
var A_PRESSED = false;
var D_PRESSED = false;
var SPACE_PRESSED = false;
var A = 65;
var D = 68;
var SPACE = 32;
var platformFill = "green";

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// the keyDownHandler and the keyUpHandler is for seeing if the player presses some keys, and if they do a boolean changes.
function keyDownHandler(e) {
  if (e.keyCode == A) {
    A_PRESSED = true;
  }
  else if (e.keyCode == D) {
    D_PRESSED = true;
  }
  else if (e.keyCode == SPACE) {
    SPACE_PRESSED = true;
  }
}

// the keyDownHandler and the keyUpHandler is for seeing if the player presses some keys, and if they do a boolean changes.
function keyUpHandler(e) {
  if (e.keyCode == A) {
    A_PRESSED = false;
  }
  else if (e.keyCode == D) {
    D_PRESSED = false;
  }
  else if (e.keyCode == SPACE) {
    SPACE_PRESSED = false;
  }
}


var player = {
    x : 30,
    y : 380,
    width : 20,
    height : 20,
    color : "blue",
    Make : function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }
}

// This function makes the platforms that the player can jump on.
function platforms() {
  c.beginPath();
  // Make all platforms under this comment!
  c.rect(0, 325, 150, 20);
  // Make all platforms above this comment!
  c.fillStyle = platformFill;
  c.fill();
  c.closePath();
}

// This function has all of the animation inside of it.
function draw() {
  platforms();
  player.Make()
}

// https://wesbasinger.github.io/ians-game/index.html

// Makes the animation happen
requestAnimationFrame(draw)
