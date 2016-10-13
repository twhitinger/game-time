const Spinner = require('./spinner');
const PowerBar = require('./power-bar');
const Ball = require('./ball');
const Hole = require('./hole');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "assets/images/grass.jpeg";
background.onload = function() {
  ctx.drawImage(background, 0, 0);
};

const directionSpinner = new Spinner(60, 60, 50);


// const ball = new Ball(150, 50);
const hole = new Hole(200, 400);
const powerBar = new PowerBar();
const ball = new Ball(170, 350);


requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  directionSpinner.draw(ctx);
  directionSpinner.rotate(ctx);
  powerBar.draw(ctx);
  powerBar.fill(ctx);
  ball.draw(ctx);
  hole.draw(ctx);

  let direction = Math.PI/2;
  let resistance = 0.15;
  ball.move(direction, resistance);


  requestAnimationFrame(gameLoop);
});
