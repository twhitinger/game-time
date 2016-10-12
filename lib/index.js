const Spinner = require('./spinner');
const Ball = require('./ball');
const PowerBar = require('./power-bar')

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const directionSpinner = new Spinner(60, 60, 50);


// const ball = new Ball(150, 50);
const hole = new Hole(300, 200);
const powerBar = new PowerBar();
const ball = new Ball(350, 170);


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

function Hole(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
}
Hole.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#000000';
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();

  return this;
};
