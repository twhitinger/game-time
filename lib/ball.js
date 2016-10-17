function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.v = 0;
  this.direction = null;
  this.resistance = 0.1;
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

Ball.prototype.update = function() {
  let xMovement = Math.cos(this.direction);
  let yMovement = -Math.sin(this.direction);
  if (this.v > 0) {
    this.x = this.x + this.v*xMovement;
    this.y = this.y - this.v*yMovement;
    this.v = this.v - this.resistance;
  } else if (this.v <= 0) {
    // self.stroke.powerBar.begin = false;
    // self.stroke.directionSpinner.begin = false;
    // this.v = 0;
  }
};

Ball.prototype.hit = function(direction, power) {

  this.direction = direction;
  this.v = power;
  console.log('Hit ball with ' + this.power + ' Power and ' + this.direction + ' Radians Direction');
};


module.exports = Ball;
