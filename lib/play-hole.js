const Ball = require("./ball");
const Hole = require("./hole");
const Obstacles = require("./obstacles");
const SandDune = require("./sand-dune");
const Stroke = require("./stroke");
const Sprite = require("./sprite");
let treeImage = new Image();
treeImage.src = "./assets/images/tree-1.jpg";

function PlayHole(game, holeNumber) {
  this.completed = false;
  this.game = game;
  this.holeNumber = holeNumber;
  this.ball = new Ball(170, 350);
  this.hole = new Hole(300, 100);

  this.obstacles = generateObstacles(); // different obstacles
  this.sprites = generateSprites(this.obstacles);
  this.sandDune = new SandDune(holeNumber);
  this.sandDuneArr = [this.sandDune];
  this.stroke = new Stroke(this, this.ball);
  this.strokes = 0;
  this.walls = [
    {
      x: 0,
      y: 0,
      width: 5,
      height: game.canvas.height
    },
    {
      x: game.canvas.width,
      y: 0,
      width: 5,
      height: game.canvas.height
    },
    {
      x: 0,
      y: 0,
      width: game.canvas.width,
      height: 5
    },
    {
      x: 0,
      y: game.canvas.height,
      width: game.canvas.width,
      height: 5
    }
  ];
  function generateObstacles() {
    let obstacleArr = [];
    //  let spriteArr = [];
    let x = Math.floor((Math.random() * 150) + 1);
     let x1 = Math.floor((Math.random() * 250) + 100);
    let y = Math.floor((Math.random() * 150) + 1);
     let y1 = Math.floor((Math.random() * 250) + 100);
    for(let i = 0; i < 6; i++) {
      x = x * 1.10;
      y = y * 1.10;
      x1 = x1 * 1.10;
      y1 = y1 * 1.10;
      obstacleArr.push(new Obstacles(x,y,holeNumber));
      // let currentO = obstacleArr[i];
      // spriteArr.push(new Sprite(treeImage,currentO.width,currentO.height,currentO.x,currentO.y));
      obstacleArr.push(new Obstacles(x1,y1,holeNumber));
    }
    // PlayHole.sprite = spriteArr;
    return obstacleArr;
  }


  function generateSprites(obstacles) {
    let spriteArr = [];
    for(let i = 0; i < obstacles.length; i++) {
      let currentO = obstacles[i];
      spriteArr.push(new Sprite(treeImage,currentO.width,currentO.height,currentO.x,currentO.y));
    }
    return spriteArr;
  }

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
    this.obstacleCheck(this.ball, this.obstacles);
    this.collisionCheck(this.ball, this.walls);
    this.resistanceCheck(this.ball, this.sandDuneArr);
    console.log(this.strokes);
  },

  draw: function(ctx) {
    this.stroke.draw(ctx);
    this.ball.draw(ctx);
    this.hole.draw(ctx);
    this.obstacles.forEach(function(obstacle) {
      obstacle.draw(ctx);
    });
    this.sprites.forEach(function(sprite) {

      sprite.draw(ctx);
    });
    this.sandDune.draw(ctx);

  },


  obstacleCheck: function(ball, objects) {
    objects.forEach(function(object) {
      let dx = (ball.x)-(object.x + object.width/2);
      let dy = (ball.y)-(object.y + object.height/2);
      let width = (ball.radius + object.width)/2;
      let height = (object.height) / 2;
      let crossWidth = width * dy;
      let crossHeight = height * dx;
      let collision = 'none';

      if(Math.abs(dx) <= width && Math.abs(dy) <= height){
        if (crossWidth > crossHeight){
          collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
        } else {
          collision = (crossWidth >- (crossHeight)) ? 'right' : 'top';
        }
        if (collision === "bottom" || collision === "top") {
          ball.yDeflect();
        } else {
          ball.xDeflect();
        }
      }
    });
  },
  collisionCheck: function(ball, objects) {
    objects.forEach(function(object) {
      if (ball.x > object.x &&
        ball.x < object.x + object.width &&
        ball.y < object.y + object.height &&
        ball.y > object.y) {

          if (object.x === 360 || object.height === 640){
            ball.xDeflect(); // need logic to determine x or y
          } else {
            ball.yDeflect();
          }
        }
      });
    },

    resistanceCheck: function(ball, objects) {
      objects.forEach(function(object) {
        if (ball.x > object.x &&
          ball.x < object.x + object.width &&
          ball.y < object.y + object.height &&
          ball.y > object.y) {
            ball.drag();
          }
        });
      },

      checkHoleInOne: function() {
        let dx = this.ball.x - this.hole.x;
        let dy = this.ball.y - this.hole.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.ball.radius + this.hole.radius){
          this.game.applauseSound.load();
          this.game.applauseSound.play();
          this.completed = true;
        }
      }
    };



    module.exports = PlayHole;
