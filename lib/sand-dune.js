function SandDune(holeNumber) {
  this.holeNumber = holeNumber;
  this.x = 100;
  this.y = 100;
  this.width = 50;
  this.height = 50;
}

SandDune.prototype = {
  draw: function(ctx) {
    // forEach loop through all obstacles
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="pink";
    ctx.rect(this.x,this.y,this.width,this.height);
    ctx.stroke();
  },

  update: function() {

  }
};

module.exports = SandDune;
