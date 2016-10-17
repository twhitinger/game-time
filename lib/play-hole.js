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
      if(!this.stroke.inProgress){
        this.stroke = new Stroke(this, this.ball);
      }
        this.stroke.update(ctx);
  },

  draw: function(ctx) {
    this.stroke.draw(ctx);
    this.ball.draw(ctx);
    this.hole.draw(ctx);
  }
};

module.exports = PlayHole;
