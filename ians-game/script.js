var canvas = document.getElementById("FRAME");
var c = canvas.getContext('2d');

var player = {
    this.x = 10,          // I fixed that. Sorry, I'm a noobie at the 'this' keyword
    this.y = canvas.height-this.x,
    width : 10, // not sure why these need to be properties on the object, are they going to change?
    // No, I just put them there because I like it neat.
    height : 10, // not sure why these need to be properties on the object, are they going to change?
    color : "powderblue",
    Make : function() {
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
}

function platforms() {
  c.beginPath();
  c.closePath();
}

function draw() {
  player.Make()
}

// Should I go ahead and work on player movement? Should my if (*keypressed*) be inside of the draw?



// I'm going to push the code up to my github repo and publish it so we can see it in action
// I'll paste a link in a second.

// Okay!

requestAnimationFrame(draw)
