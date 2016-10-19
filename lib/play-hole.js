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

  this.obstacles = generateObstacles(this.hole); // different obstacles
  this.sprites = generateSprites(this.obstacles);
  this.sandDune = new SandDune(holeNumber);
  this.sandDuneArr = [this.sandDune];
  this.stroke = new Stroke(this, this.ball);
  this.strokes = 0;
  this.walls = [
    { x: -5, y: 0, width: 10, height: game.canvas.height },
    { x: game.canvas.width-5, y: 0, width: 10, height: game.canvas.height },
    { x: 0, y: -5, width: game.canvas.width, height: 10 },
    { x: 0, y: game.canvas.height-5, width: game.canvas.width, height: 10 } ];

  function generateObstacles(hole) {
    let obstacleArr = [];
    //  let spriteArr = [];
    let x = Math.floor((Math.random() * 100) + 50);
     let x1 = Math.floor((Math.random() * 150) + 100);
    let y = Math.floor((Math.random() * 50) + 25);
     let y1 = Math.floor((Math.random() * 50) + 25);
    for(let i = 0; i < 6; i++) {
      x = x * 1.35;
      y = y * 1.35;
      x1 = x1 * 1.35;
      y1 = y1 * 1.35;
      obstacleArr.push(new Obstacles(x,y,holeNumber));
      // let currentO = obstacleArr[i];
      // spriteArr.push(new Sprite(treeImage,currentO.width,currentO.height,currentO.x,currentO.y));
      obstacleArr.push(new Obstacles(x1,y1,holeNumber));
    }
    // PlayHole.sprite = spriteArr;

    return checkHole(hole ,obstacleArr);
  }

  function generateSprites(obstacles) {
    let spriteArr = [];
    for(let i = 0; i < obstacles.length; i++) {
      let currentO = obstacles[i];
      spriteArr.push(new Sprite(treeImage,currentO.width,currentO.height,currentO.x,currentO.y));
    }
    return spriteArr;
  }

  function checkHole(hole, objects) {
    for(let i = 0; i < objects.length; i++){
      let dx = (hole.x)-(objects[i].x + objects[i].width/2);
      let dy = (hole.y)-(objects[i].y + objects[i].height/2);
      let width = (hole.radius + objects[i].width)/2;
      let height = (objects[i].height) / 2;
      if(Math.abs(dx) <= width && Math.abs(dy) <= height){
         objects.splice(i,1);
      }
    }
    return objects;
  }
}

PlayHole.prototype = {
  update: function(ctx) {
    this.stroke.update(ctx);
    if (this.stroke.completed) {
      this.ball.hit(this.stroke.direction, this.stroke.power);
      this.strokes ++;
      this.stroke = new Stroke(this, this.ball);
    }
    this.ball.update();

    this.checkHoleInOne();

    this.obstacleCheck(this.ball, this.obstacles);
    this.collisionCheck(this.ball, this.walls);
    this.resistanceCheck(this.ball, this.sandDuneArr);
  },

  draw: function(ctx) {
    if (this.ball.v === 0) {
      this.stroke.draw(ctx);
    }
    this.ball.draw(ctx);
    this.hole.draw(ctx);

    this.obstacles.forEach(function(obstacle) {
      obstacle.draw(ctx);
    });
    this.holeCheck(this.hole,this.obstacles);
    this.sprites.forEach(function(sprite) {
      sprite.draw(ctx,this.hole);
    });
    this.sandDune.draw(ctx);
  },

  holeCheck: function(hole, objects) {
    for(let i = 0; i < objects.length; i++){
      let dx = (hole.x)-(objects[i].x + objects[i].width/2);
      let dy = (hole.y)-(objects[i].y + objects[i].height/2);
      let width = (hole.radius + objects[i].width)/2;
      let height = (objects[i].height) / 2;
      if(Math.abs(dx) <= width && Math.abs(dy) <= height){
         objects.splice(i,1);
      }
    }
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

        if (object.height >= 640){
          ball.xDeflect(); // need logic to determine x or y
        } else if (object.width >= 300) {
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
