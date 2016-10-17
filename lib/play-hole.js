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
    this.checkHoleInOne();
    console.log(this.strokes);
  },

  draw: function(ctx) {
    this.stroke.draw(ctx);
    this.ball.draw(ctx);
    this.hole.draw(ctx);
  },

  checkHoleInOne: function() {
    let dx = this.ball.x - this.hole.x;
    let dy = this.ball.y - this.hole.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < this.ball.radius + this.hole.radius){
      console.log("Holed it");
      this.completed = true;
    }
  }

};



module.exports = PlayHole;
