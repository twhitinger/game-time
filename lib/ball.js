function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.keyboarder = new Keyboarder();
  this.v = 7;
}

Ball.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();

  return this;
};

Ball.prototype.move = function(direction, resistance = 0.1) {
  let xMovement = Math.cos(direction);
  let yMovement = -Math.sin(direction);
  if (this.v > 0) {
    this.x = this.x + this.v*xMovement;
    this.y = this.y + this.v*yMovement;
    this.v = this.v - resistance;
  }
};

function isColliding(b1,b2) {
  return false;
}




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
