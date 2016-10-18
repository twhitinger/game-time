const PlayHole = require('./play-hole');


function PlayGolf(){
  this.canvas = document.getElementById("game-canvas");
  this.applauseSound = document.getElementById("applause");
  this.puttSound = document.getElementById("putt-sound");
  const ctx = this.canvas.getContext("2d");
  const self = this;
  this.holeNumber = 1;
  this.currentHole = new PlayHole(this, this.holeNumber);



  function animate(){
    self.draw(ctx);
    self.update(ctx);

    requestAnimationFrame(animate);
  }

  animate();

}

PlayGolf.prototype = {
  update: function(ctx) {
    if (this.currentHole.completed === true) { //if the current hole is finished,
      this.holeNumber ++;                     // increment the hole number and
      this.currentHole = new PlayHole(this, this.holeNumber);  //create a new hole
    }
    this.currentHole.update(ctx);
  },

  draw: function(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = "30px Helvetica";
    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.5", "orange");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText("Hole " + this.holeNumber + ", Strokes: " + this.currentHole.strokes, 10, 30);
    this.currentHole.draw(ctx);
  }
};

window.addEventListener("load", function() {
  new PlayGolf ();
});
