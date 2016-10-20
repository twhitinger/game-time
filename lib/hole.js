function Hole(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 8;
}

Hole.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();

  return this;
};

module.exports = Hole;
