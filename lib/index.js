const DirectionSpinner = require('./direction-spinner');
const PowerBar = require('./power-bar');
const Ball = require('./ball');
const Hole = require('./hole');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let directionSpinner = new DirectionSpinner(60, 60, 50);
let powerBar = new PowerBar();
const hole = new Hole(200, 300);
let ball = new Ball(170, 350);
let once = 0;

requestAnimationFrame(function gameLoop() {
  collisionCheck();
  roundLoop();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hole.draw(ctx);
  ball.draw(ctx);
  roundLoop();

  function roundLoop(){
    if (ball === null) {
      ball = new Ball(170,350);
      powerBar.begin = false;
      directionSpinner.begin = false;
      once = 0;
    }
    if (powerBar.begin === false ) {
      powerBar.draw(ctx).fill(ctx).eventListen(ball,powerBar,once);
    }
    if(powerBar.begin === true){
      directionSpinner.draw(ctx).rotate(ctx).eventListen(ball,directionSpinner,once, powerBar);
      once = 1;
    }
    if (powerBar.begin === false && directionSpinner.begin === false && once === 1) {
      once = ball.move(directionSpinner.direction, powerBar, directionSpinner,once, directionSpinner.resistance);
    }
  }



  function collisionCheck () {
    let dx = ball.x - hole.x;
    let dy = ball.y - hole.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < ball.radius + hole.radius){
      console.log("Holed it");
      ball = null;
    }
  }
    requestAnimationFrame(gameLoop);

  });
