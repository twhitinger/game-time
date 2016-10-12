function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.v = 225;
  this.keyboarder = new Keyboarder();
}

// Ball.prototype.update = function() {
//   this.bodies = this.bodies.filter(notColliding)
// };
Ball.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#000000';
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();

  return this;
};

Ball.prototype.move = function(r) {
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE) && this.v > 0) {
    this.x = this.x + this.v/100;
    this.y = this.y + this.v/100;
    this.v = this.v - r;
    console.log(this.v);
  }
};

function isColliding(b1,b2) {
  return false;
};




function Keyboarder() {
  let keyState = {};

  window.addEventListener("keydown", function(e) {
    keyState[e.keyCode] = true;
  });
  window.addEventListener("keyup", function(e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };
  this.KEYS = { SPACE: 32 };
}

module.exports = Ball;
