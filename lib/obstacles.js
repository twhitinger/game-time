function Obstacles(holeNumber) {
  this.holeNumber = holeNumber;
  this.x = 200;
  this.y = 200;
  this.width = 50;
  this.height = 50;
}

Obstacles.prototype = {
  draw: function(ctx) {
    // forEach loop through all obstacles
    ctx.beginPath();
    ctx.lineWidth="6";
    ctx.strokeStyle="black";
    ctx.rect(this.x,this.y,this.width,this.height);
    ctx.stroke();
  },

  update: function() {

  }
};

module.exports = Obstacles;
