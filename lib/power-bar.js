function PowerBar() {
  this.x = 600;
  this.y = 20;
  this.width = 20;
  this.height = 100;
  this.size = 1;
}

PowerBar.prototype.draw = function(ctx) {
  ctx.strokeStyle = 'black';
  ctx.strokeRect(this.x,this.y,this.width,this.height);

};

PowerBar.prototype.fill = function(ctx) {
  if (this.size <= 100) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y+this.height, this.width, -this.size);
    this.size ++;
  } else {
    this.size = 1;
  }
};

module.exports = PowerBar;
