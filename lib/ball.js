function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
}
Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();

  return this;
};

Ball.prototype.move = function(options = {}) {
  let v = options.v;
  let r = options.r;
  this.x = this.x + v[0] - r;
  this.y = this.y + v[1] - r;
  
};

module.exports = Ball;
