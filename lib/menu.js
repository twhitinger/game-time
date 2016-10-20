const PlayGolf = require('./play-golf');

function Menu() {
  this.canvas = document.getElementById("game-canvas");
  this.ctx = this.canvas.getContext("2d");
  this.lastScore = retrieveLastScore();
  this.highScores = retrieveHighScores();
  this.verticalSpacing = 60;
}

Menu.prototype = {
  main: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.moveTo(this.canvas.width/2, this.canvas.height/2);
    this.ctx.textAlign = "center";
    this.ctx.font = "45px Helvetica";
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop("0.2", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("0.8", "red");
    this.ctx.fillStyle = gradient;
    this.ctx.fillText("Welcome to Lyger Woods 2017!", this.canvas.width/2, this.canvas.height/3);
    this.ctx.font = "30px Helvetica";
    this.ctx.fillText("press [spacebar] to play, [i] for instructions", this.canvas.width/2, this.canvas.height/3 + 2*this.verticalSpacing);
    this.ctx.fillText(this.lastScore, this.canvas.width/2, this.canvas.height/3 + 3*this.verticalSpacing);
    this.ctx.fillText(this.highScores, this.canvas.width/2, this.canvas.height/3 + 4*this.verticalSpacing);
    this.gameInProgress = false;
    this.listen();
  },

  listen: function() {
    let menu = this;
    window.addEventListener("keyup", function(e) {
      let key = e.which;
      console.log(key);
      if (key === 32) {
        if (!menu.gameInProgress) {
          menu.gameInProgress = true;
            new PlayGolf();
        }
      } else if (key === 73) {
        let gameCanvas = document.getElementById("game-canvas");
        let ctx = gameCanvas.getContext("2d");
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.moveTo(gameCanvas.width/2, gameCanvas.height/2);
        ctx.textAlign = "center";
        ctx.font = "20px Helvetica";
        const gradient = ctx.createLinearGradient(0, 0, gameCanvas.width, 0);
        gradient.addColorStop("0.2", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("0.8", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("9 Holes per round", gameCanvas.width/2, 200);
        ctx.fillText("Maximum 10 strokes per hole", gameCanvas.width/2, 250);
        ctx.fillText("PRESS and HOLD [spacebar] to start inputs", gameCanvas.width/2, 300);
        ctx.fillText("1st input is to choose the stroke power", gameCanvas.width/2, 350);
        ctx.fillText("2nd input is to choose the stroke swing", gameCanvas.width/2, 400);
        ctx.fillText("Watch out for obstacles! Good luck!", gameCanvas.width/2, 450);
        ctx.fillText("Press [m] for the Menu or [spacebar] to Play Golf!", gameCanvas.width/2, 500);
      } else if (key === 77) {
        let menu = new Menu();
        menu.main();
      }
    });
  }
};

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

module.exports = Menu;
