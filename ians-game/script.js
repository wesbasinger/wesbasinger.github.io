var canvas = document.getElementById("FRAME");
var c = canvas.getContext('2d');

console.log(canvas)
console.log(c)

var player = {
    x : 10,          // I fixed that. Sorry, I'm a noobie at the 'this' keyword
    y : 10,
    width : 10, // not sure why these need to be properties on the object, are they going to change?
    // No, I just put them there because I like it neat.
    height : 10, // not sure why these need to be properties on the object, are they going to change?
    color : "blue",
    make : function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }
}

player.make()
