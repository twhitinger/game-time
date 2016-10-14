const DirectionSpinner = require('./direction-spinner');
const PowerBar = require('./power-bar');
const Ball = require('./ball');
const Hole = require('./hole');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const directionSpinner = new DirectionSpinner(60, 60, 50);
const powerBar = new PowerBar();
const hole = new Hole(200, 300);
let ball = new Ball(170, 350);
let once = 0;

requestAnimationFrame(function gameLoop() {
  collisionCheck();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hole.draw(ctx);
  ball.draw(ctx);

  if (powerBar.begin === false) {
    directionSpinner.eventListen(once,directionSpinner).draw(ctx).rotate(ctx).directionTurn(ball,directionSpinner);
  }

  // if (once === 0) {
    powerBar.draw(ctx);
    powerBar.fill(ctx);
    window.addEventListener("keyup", powerBarTurn);
  // }


  if (powerBar.begin === true) {

      move();
      if(ball.v <= 0){
        powerBar.begin = false;
      }
      debugger
  }



  function move()  {
    ball.move(directionSpinner.direction, directionSpinner.resistance);
  }

  function collisionCheck () {
    let dx = ball.x - hole.x;
    let dy = ball.y - hole.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < ball.radius + hole.radius){
      console.log("Holed it");
      ball = null;
      // trigger a round end and start a new round
    }
  }

  // function directionTurn() {
  //   ball.radian = directionSpinner.pointerRadians;
  //   let direction = ball.radian;
  //   let resistance = 0.15;
  //   ball.move(direction, resistance);
  // }

  function powerTurn() {
    let power =  powerBar.size/12;
    ball.v = power;
    powerBar.begin = true;
    once = 0;
  }


  function powerBarTurn(e) {
    if (e.keyCode === 32 && once === 0 ) {
      once = 1;
      powerTurn();
    }
  }

  // function spinnerTurn(e) {
  //   if (e.keyCode === 32 & once === 1) {
  //     directionSpinner.begin = true;
  //     once += 1;
  //     directionTurn();
  //   }
  // }
  requestAnimationFrame(gameLoop);
});
