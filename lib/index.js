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


requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (directionSpinner.begin === true && ball.v > 0) {
    powerTurn();
    directionTurn();
  }
  window.addEventListener("keyup", powerBarTurn);
  window.addEventListener("keyup", spinnerTurn);

  directionSpinner.draw(ctx);
  directionSpinner.rotate(ctx);
  ball.draw(ctx);

  function directionTurn() {
    ball.radian = directionSpinner.pointerRadians;
    let direction = ball.radian;
    let resistance = 0.15;
    ball.move(direction, resistance);
  }

  function powerTurn() {
    let power =  powerBar.size/25;
    ball.v = power;
  }


  function powerBarTurn(e) {
    if (e.keyCode === 32 && ball.v > 0 && directionSpinner.begin !== true ) {
      directionSpinner.begin = true;
      powerTurn();
    }
  }

  function spinnerTurn(e) {
    if (e.keyCode === 32 && ball.v > 0 && directionSpinner.begin !== true ) {
      directionSpinner.begin = true;

      directionTurn();
    }
  }
  // directionSpinner.draw(ctx);
  // directionSpinner.rotate(ctx);
  powerBar.draw(ctx);
  powerBar.fill(ctx);
  ball.draw(ctx);
  hole.draw(ctx);
  //
  //
  //
  requestAnimationFrame(gameLoop);
});
