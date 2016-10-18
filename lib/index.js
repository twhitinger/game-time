const PlayHole = require('./play-hole');

function PlayGolf(){
  this.canvas = document.getElementById("game-canvas");
  this.applauseSound = document.getElementById("applause");
  this.puttSound = document.getElementById("putt-sound");
  const ctx = this.canvas.getContext("2d");
  const self = this;
  this.holeNumber = 1;
  this.currentHole = new PlayHole(this, this.holeNumber);

  function animate(){
    self.draw(ctx);
    self.update(ctx);

    requestAnimationFrame(animate);
  }

  animate();

}

PlayGolf.prototype = {
  update: function(ctx) {
    if (this.currentHole.completed === true) { //if the current hole is finished,
      this.holeNumber ++;                     // increment the hole number and
      this.currentHole = new PlayHole(this, this.holeNumber);  //create a new hole
    }
    this.currentHole.update(ctx);
  },

  draw: function(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = "30px Helvetica";
    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.5", "orange");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText("Hole " + this.holeNumber + ", Strokes: " + this.currentHole.strokes, 10, 30);
    this.currentHole.draw(ctx);
  }
};

window.addEventListener("load", function() {
  new PlayGolf ();
});


// const DirectionSpinner = require('./direction-spinner');
// const PowerBar = require('./power-bar');
// const Ball = require('./ball');
// const Hole = require('./hole');
// const Obstacles = require('./obstacles');

// const ctx = canvas.getContext("2d");

// const directionSpinner = new DirectionSpinner(60, 60, 50);
// const powerBar = new PowerBar();
// // const hole = new Hole(200, 300);
// // const obstacle = new Obstacles(1);
// // let ball = new Ball(170, 350);
//
// requestAnimationFrame(function gameLoop() {
//   collisionCheck();
//   nullCheck();
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   hole.draw(ctx);
//   ball.draw(ctx);
//   obstacle.draw(ctx);
//   roundLoop();
//
//   function nullCheck(){
//     if (ball === null) {
//       ball = new Ball(170,350);
//       powerBar.begin = false;
//       directionSpinner.begin = false;
//     }
//   }
//
//   function roundLoop(){
//     if (powerBar.begin === false ) {
//       powerBar.draw(ctx).fill(ctx).eventListen(ball,powerBar);
//     }
//     if(powerBar.begin === true){
//       directionSpinner.draw(ctx).rotate(ctx).eventListen(ball,directionSpinner, powerBar);
//     }
//     if (powerBar.begin === false && directionSpinner.begin === true) {
//       ball.move(directionSpinner.direction, powerBar, directionSpinner, directionSpinner.resistance);
//     }
//   }
//
//
//   requestAnimationFrame(gameLoop);
//
// });
