const Selector = require('./selector.js');

function PowerBar() {
  this.x = 50;
  this.y = 500;
  this.width = 20;
  this.height = 100;
  this.power = 0;
  this.size = 1;
  this.selector = new Selector();
}

PowerBar.prototype.convertPower = function() {
  this.power = this.size/10.0;
};


PowerBar.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(this.x,this.y,this.width,this.height);
  ctx.fillRect(this.x,this.y,this.width,this.height);
};

PowerBar.prototype.fill = function(ctx) {
  if (this.selector.isDown(this.selector.KEYS.SPACE)) {
    if (this.size <= 100) {
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y + this.height, this.width, -this.size);
      ctx.fillRect(this.x, this.y + this.height, this.width, -this.size);
      this.size ++;
    } else {
      this.size = 1;
    }
  }
};

module.exports = PowerBar;
