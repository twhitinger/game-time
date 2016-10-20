function SandDune(x,y,holeNumber) {
  this.holeNumber = holeNumber;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
}

SandDune.prototype = {
  draw: function(ctx) {
    ctx.rect(this.x,this.y,this.width,this.height);
  }
};

module.exports = SandDune;
