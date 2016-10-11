function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.v = 200;
}
Ball.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#000000';
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();

  return this;
};

Ball.prototype.move = function(r) {
  if (this.v > 0) {
    this.x = this.x + this.v/100;
    this.y = this.y + this.v/100;
    this.v = this.v - r;
  }
};

module.exports = Ball;
