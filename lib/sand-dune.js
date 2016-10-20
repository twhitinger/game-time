function SandDune(x,y,holeNumber) {
  this.holeNumber = holeNumber;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
}

SandDune.prototype = {
  draw: function(ctx) {
    // forEach loop through all obstacles
    // ctx.beginPath();
    // ctx.lineWidth="4";
    // ctx.strokeStyle="pink";
    ctx.rect(this.x,this.y,this.width,this.height);
    // ctx.stroke();

  }
};

module.exports = SandDune;
