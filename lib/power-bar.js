const Selector = require('./selector.js');

function PowerBar(stroke) {
  this.stroke = stroke;
  this.x = 50;
  this.y = 500;
  this.width = 20;
  this.height = 100;
  this.power = 0;
  this.size = 1;
  this.selector = new Selector();
  this.begin = false;
}

PowerBar.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(this.x,this.y,this.width,this.height);
  ctx.fillRect(this.x,this.y,this.width,this.height);
  return this;
};

PowerBar.prototype.fill = function(ctx) {

  if (this.selector.isDown(this.selector.KEYS.SPACE)) {
    if (this.size <= 100) {
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y + this.height, this.width, -this.size);
      ctx.fillRect(this.x, this.y + this.height, this.width, -this.size);
      this.size += 1.5;
    } else {
      this.size = 1;
    }
  }
  return this;
};

PowerBar.prototype.eventListen = function(ball,powerBar){

  window.addEventListener("keyup", powerBarTurn);
  function powerBarTurn(e) {
    if (e.keyCode === 32) {
      powerTurn(ball,powerBar);
    }
  }
  function powerTurn(ball,powerBar) {
      let power =  powerBar.size/12;
      ball.v = power;
      powerBar.begin = true;
  }
};


module.exports = PowerBar;
