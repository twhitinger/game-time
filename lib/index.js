const DirectionSpinner = require('./direction-spinner');
const PowerBar = require('./power-bar');
const Ball = require('./ball');
const Hole = require('./hole');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const directionSpinner = new DirectionSpinner(60, 60, 50);
const powerBar = new PowerBar();
const hole = new Hole(200, 400);
const ball = new Ball(170, 350);
let once = 0;

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hole.draw(ctx);
  ball.draw(ctx);

  if (once === 0) {
    powerBar.draw(ctx);
    powerBar.fill(ctx);
    window.addEventListener("keyup", powerBarTurn);
  }
  if (once > 0) {
    directionSpinner.draw(ctx);
    directionSpinner.rotate(ctx);
    window.addEventListener("keyup", spinnerTurn);
  }

  if (ball.v > 0 && directionSpinner.begin === true ) {
    directionTurn();
  }

  function directionTurn() {
    ball.radian = directionSpinner.pointerRadians;
    let direction = ball.radian;
    let resistance = 0.15;
    ball.move(direction, resistance);
  }

  function powerTurn() {
    let power =  powerBar.size/12;
    ball.v = power;
  }


  function powerBarTurn(e) {
    if (e.keyCode === 32 && once === 0 ) {
      once = 1;
      powerTurn();
    }
  }

  function spinnerTurn(e) {
    if (e.keyCode === 32 & once === 1) {
      directionSpinner.begin = true;
      once += 1;
      directionTurn();
    }
  }
  requestAnimationFrame(gameLoop);
});
