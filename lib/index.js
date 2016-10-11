const Spinner = require('./spinner');
const Ball = require('./ball');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const directionSpinner = new Spinner(60, 60, 50);

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  directionSpinner.draw(ctx);
  directionSpinner.rotate(ctx);

  requestAnimationFrame(gameLoop);
});
