const PlayHole = require('./play-hole');
const GameOver = require('./game-over');

function PlayGolf(menu){
  this.menu = menu;
  this.canvas = document.getElementById("game-canvas");
  this.applauseSound = document.getElementById("applause");
  this.puttSound = document.getElementById("putt-sound");
  const ctx = this.canvas.getContext("2d");
  ctx.textAlign = "left";
  const self = this;
  this.totalStrokes = 0;
  this.holeNumber = 1;
  this.gameLength = 9;
  this.currentHole = new PlayHole(this, this.holeNumber);
  this.gameOver = false;

  function animate(){
    self.draw(ctx);
    self.update(ctx);
    if (self.gameOver) {
      new GameOver(this.menu);
    } else {
      requestAnimationFrame(animate);
    }
  }
  animate();
}

PlayGolf.prototype = {
  update: function(ctx) {
    if (this.currentHole.completed === true) {
      this.totalStrokes += this.currentHole.strokes;
      if (this.holeNumber === this.gameLength) {
        localStorage.lygerWoodsLastScore = this.totalStrokes;
        localStorage.lygerWoodsHighScores += (this.totalStrokes + "  ");
        this.gameOver = true;
        new GameOver(this.canvas);
      } else {
        this.holeNumber ++;
        this.currentHole = new PlayHole(this, this.holeNumber);
      }
    }
    this.currentHole.update(ctx);
  },

  draw: function(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = "30px Helvetica";
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "red");
    gradient.addColorStop("1.0", "blue");
    ctx.fillStyle = gradient;
    ctx.fillText("Hole " + this.holeNumber + ", Strokes: " + this.currentHole.strokes, 10, 30);
    this.currentHole.draw(ctx);
  }
};

module.exports = PlayGolf;
