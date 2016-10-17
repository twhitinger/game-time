function Obstacles(holeNumber) {
  this.holeNumber = holeNumber;
}

Obstacles.prototype = {
  draw: function(ctx) {
    // forEach loop through all obstacles
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="black";
    ctx.rect(30,30,50,50);
    ctx.stroke();
  },

  update: function() {

  }
};

module.exports = Obstacles;
