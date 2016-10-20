function Obstacles(x,y,holeNumber) {
  this.holeNumber = holeNumber;
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 80;
}

Obstacles.prototype = {
  draw: function(ctx) {
    ctx.strokeStyle="black";
    ctx.rect(this.x,this.y,this.width,this.height);
  },
};

module.exports = Obstacles;
