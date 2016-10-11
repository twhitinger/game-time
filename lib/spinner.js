function Spinner(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sAngle = 0;
  this.eAngle = 2*Math.PI;
  this.tickNumber = 0;
  this.pointerRadians = 0;
}

Spinner.prototype.draw = function(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle);
  ctx.stroke();

  return this;
};

Spinner.prototype.rotate = function(ctx) {
  const tickTotal = 300;
  const pointerLength = this.r;
  let targetX = this.x + Math.cos(this.pointerRadians) * pointerLength;
  let targetY = this.y + Math.sin(this.pointerRadians) * pointerLength;
  if ( this.tickNumber === tickTotal) { this.tickNumber = 0; }
  this.tickNumber = this.tickNumber + 1;
  this.pointerRadians = 2*Math.PI*(this.tickNumber/tickTotal);
  // this.pointerRadians = (this.tickNumber/this.tickTotal)*2*Math.PI;
  ctx.linewidth = 3;
  ctx.strokeStyle = '#DD0000';
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(targetX, targetY);
  ctx.stroke();
  console.log(this.tickNumber);
};

module.exports = Spinner;
