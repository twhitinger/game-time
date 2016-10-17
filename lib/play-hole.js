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
  this.walls = [
    {
      x: 0,
      y: 0,
      width: 1,
      height: game.canvas.height
    },
    {
      x: game.canvas.width,
      y: 0,
      width: 1,
      height: game.canvas.height
    },
    {
      x: 0,
      y: 0,
      width: game.canvas.width,
      height: 1
    },
    {
      x: 0,
      y: game.canvas.height,
      width: game.canvas.width,
      height: 1
    }
  ];
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
      this.collisionCheck(this.ball, this.walls);
      console.log(this.strokes);

  },

  draw: function(ctx) {
    this.stroke.draw(ctx);
    this.ball.draw(ctx);
    this.hole.draw(ctx);
  },

  collisionCheck: function(ball, objects) {
    objects.forEach(function(object) {
      if (ball.x < object.x + object.width &&
      ball.x > object.x &&
      ball.y < object.y + object.height &&
      ball.y > object.y) {
        ball.v = 0;
        console.log("I HIT SOMETHING!!!");
      }
    });
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
