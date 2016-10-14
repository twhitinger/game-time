const Selector = require('./selector');

function DirectionSpinner(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sAngle = 0;
  this.eAngle = 2*Math.PI;
  this.tickNumber = 0;
  this.pointerRadians = 0;
  this.selector = new Selector();
  this.begin = false;
}

DirectionSpinner.prototype.draw = function(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();
};

DirectionSpinner.prototype.rotate = function(ctx) {
  const tickTotal = 100;
  const pointerLength = this.radius;
  let targetX = this.x + Math.cos(this.pointerRadians) * pointerLength;
  let targetY = this.y + Math.sin(this.pointerRadians) * pointerLength;
  if ( this.tickNumber === tickTotal) { this.tickNumber = 0; }

  if (this.selector.isDown(this.selector.KEYS.SPACE)) {
    this.tickNumber = this.tickNumber + 1;
    this.pointerRadians = -2*Math.PI*(this.tickNumber/tickTotal);
    ctx.linewidth = 3;
    ctx.strokeStyle = '#DD0000';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
  }
};

module.exports = DirectionSpinner;
