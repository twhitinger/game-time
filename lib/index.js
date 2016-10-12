const Spinner = require('./spinner');
const Ball = require('./ball');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const directionSpinner = new Spinner(60, 60, 50);

const ball = new Ball(350, 170);

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  directionSpinner.draw(ctx);
  directionSpinner.rotate(ctx);
  ball.draw(ctx);
  let direction = Math.PI/2;
  let resistance = 0.15;
  ball.move(direction, resistance);

  requestAnimationFrame(gameLoop);
});
