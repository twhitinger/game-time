const Ball = require("./ball");
const Hole = require("./hole");
const Obstacles = require("./obstacles");
const Stroke = require("./stroke");

function PlayHole(game, holeNumber) {
  this.completed = false;
  this.game = game;
  this.holeNumber = holeNumber;
  this.ball = new Ball(170, 350);
  this.hole = new Hole(200, 300);
  this.obstacles = new Obstacles(holeNumber); // different obstacles
  this.stroke = new Stroke(this, this.ball);
  this.strokes = 0;
  this.obstacles << 
}

PlayHole.prototype = {

  update: function(ctx) {
      this.stroke.update(ctx);
      if (this.stroke.completed) {
        this.ball.hit(this.stroke.direction, this.stroke.power);
        console.log(this.stroke.direction + " direction and power: " + this.stroke.power);
        console.log(this.ball.direction + " direction and power: " + this.ball.v);
        this.strokes ++;
        this.stroke = new Stroke(this, this.ball);
      }
      this.ball.update();
      console.log(this.strokes);
  },

  draw: function(ctx) {
    this.stroke.draw(ctx);
    this.ball.draw(ctx);
    this.hole.draw(ctx);
  }
};

module.exports = PlayHole;
