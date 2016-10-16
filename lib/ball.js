function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.v = 7;
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

Ball.prototype.move = function(direction,  powerBar, directionSpinner,once,resistance = 0.1) {
  let xMovement = Math.cos(direction);
  let yMovement = -Math.sin(direction);

    if (this.v > 0) {
      this.x = this.x + this.v*xMovement;
      this.y = this.y - this.v*yMovement;
      this.v = this.v - resistance;
  }
  if (this.v > 0) {
    this.x = this.x + this.v*xMovement;
    this.y = this.y - this.v*yMovement;
    this.v = this.v - resistance;
  } else if (this.v <= 0) {
    powerBar.begin = false;
    directionSpinner.begin = false;
    this.v = 0.1;
    once = 0;
  }
  return once;
};

Ball.prototype.checkComplete = function(powerBar,directionSpinner) {
  if(this.v <= 0){
    debugger
    powerBar.begin = false;
    directionSpinner.begin = false;
  }
};




module.exports = Ball;
