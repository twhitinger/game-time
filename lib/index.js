const PlayHole = require('./play-hole');

function Menu() {
  let lastScore = retrieveLastScore();
  let highScores = retrieveHighScores();
  let verticalSpacing = 60;
  this.canvas = document.getElementById("game-canvas");
  const ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.moveTo(this.canvas.width/2, this.canvas.height/2);
  ctx.textAlign = "center";
  ctx.font = "40px Helvetica";
  const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "red");
  gradient.addColorStop("1.0", "blue");
  ctx.fillStyle = gradient;
  ctx.fillText("Welcome to Lyger Woods 2017!", this.canvas.width/2, this.canvas.height/3);
  ctx.font = "30px Helvetica";
  ctx.fillText(lastScore, this.canvas.width/2, this.canvas.height/3 + 2*verticalSpacing);
  ctx.fillText(highScores, this.canvas.width/2, this.canvas.height/3 + 3*verticalSpacing);
  const gameWrapper = this;
  this.gameInProgress = false;

  window.addEventListener("keyup", function() {
    if (!gameWrapper.gameInProgress) {
      gameWrapper.gameInProgress = true;
        new PlayGolf();
    }
  });
}

function retrieveLastScore() {
  if (localStorage.lygerWoodsLastScore) {
    let lastScore = localStorage.lygerWoodsLastScore;
    return "Last Score: " + lastScore;
  } else {
    localStorage.lygerWoodsLastScore = "";
    return "You're the first person to play in this browser!";
  }
}

function retrieveHighScores() {
  if (localStorage.lygerWoodsHighScores) {
    return "Past Scores: " + localStorage.lygerWoodsHighScores;
  } else {
    localStorage.lygerWoodsHighScores = "";
    return "There are no top scores! This is your chance!";
  }
}

function PlayGolf(){
  this.canvas = document.getElementById("game-canvas");
  this.applauseSound = document.getElementById("applause");
  this.puttSound = document.getElementById("putt-sound");
  const ctx = this.canvas.getContext("2d");
  ctx.textAlign = "left";
  const self = this;
  this.totalStrokes = 0;
  this.holeNumber = 1;
  this.gameLength = 3;
  this.currentHole = new PlayHole(this, this.holeNumber);
  this.gameOver = false;

  function animate(){
    self.draw(ctx);
    self.update(ctx);
    if (self.gameOver) {
      new GameOver(this.canvas);
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

function GameOver() {
  this.canvas = document.getElementById("game-canvas");
  const ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.textAlign = "center";
  ctx.font = "50px Helvetica";
  const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "red");
  gradient.addColorStop("1.0", "blue");
  ctx.fillStyle = gradient;
  ctx.fillText("Game Over!", this.canvas.width/2, this.canvas.height/3);
  ctx.fillText("Your Score: " + localStorage.lygerWoodsLastScore, this.canvas.width/2, 2*this.canvas.height/3);
  setTimeout(function() {
    new Menu();
  }, 2500);
}

window.addEventListener("load", function() {
  new Menu();
});
