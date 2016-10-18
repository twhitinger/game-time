const PlayHole = require('./play-hole');

function Menu() {
  this.canvas = document.getElementById("game-canvas");
  const ctx = this.canvas.getContext("2d");
  ctx.font = "40px Helvetica";
  ctx.fillText("Welcome to Lyger Woods 2017!", 10, 50);
  const gameWrapper = this;
  this.gameInProgress = false;
  //game menu logic goes here
  //gameplay explanation goes here

  window.addEventListener("keyup", function() {
    // if keyup == spacebar
      if (!gameWrapper.gameInProgress) {
        gameWrapper.gameInProgress = true;
          new PlayGolf();
      }
      //else if keyup == "i"
        // display instructions
  });

}

function PlayGolf(){
  this.canvas = document.getElementById("game-canvas");
  this.applauseSound = document.getElementById("applause");
  this.puttSound = document.getElementById("putt-sound");
  const ctx = this.canvas.getContext("2d");
  const self = this;
  this.holeNumber = 1;
  this.currentHole = new PlayHole(this, this.holeNumber);
  this.inProgress = false;

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

// modify start menu
window.addEventListener("load", function() {
  new Menu ();
});
