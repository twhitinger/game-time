const Ball = require("./ball");
const Hole = require("./hole");
const Obstacles = require("./obstacles");
const Stroke = require("./stroke");

function PlayHole(game, holeNumber) {
  this.complete = false;
  this.game = game;
  this.holeNumber = holeNumber;
  this.ball = new Ball(170, 350);
  this.hole = new Hole(200, 300);
  this.obstacles = new Obstacles(holeNumber); // different obstacles
  this.stroke = new Stroke(this, this.ball);
}

PlayHole.prototype = {

  update: function(ctx) {
    if (!this.stroke.powerBar.begin) {
      this.ball.update(this);
    // } else if (this.stroke.powerBar.begin) {
    //   // debugger
    //   // this.stroke.update(ctx);
    // } else if (this.stroke.powerBar.begin === false && this.stroke.directionSpinner.begin) {
    //   debugger
    //   this.stroke = new Stroke(this, this.ball);
    //   this.ball.update();
    }
  },

  draw: function(ctx) {
    this.stroke.draw(ctx);
    this.ball.draw(ctx);
    this.hole.draw(ctx);
  }
};

module.exports = PlayHole;
