function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.v = 0;
}

Ball.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();

  return this;
};

Ball.prototype.update = function(self) {
  let xMovement = Math.cos(self.stroke.directionSpinner.direction);
  let yMovement = -Math.sin(self.stroke.directionSpinner.direction);
  if (this.v > 0) {
    this.x = this.x + this.v*xMovement;
    this.y = this.y - this.v*yMovement;
    this.v = this.v - self.stroke.directionSpinner.resistance;
  } else if (this.v <= 0) {
    self.stroke.powerBar.begin = false;
    self.stroke.directionSpinner.begin = false;
    this.v = 0;
  }
};

module.exports = Ball;
