const DirectionSpinner = require('./direction-spinner');
const PowerBar = require('./power-bar');

function Stroke(hole, ball) {
  this.ball = ball;
  this.hole = hole;
  this.inProgress = true;
  this.powerBar = new PowerBar(this);
  this.directionSpinner = new DirectionSpinner(this);
  this.power = null;
  this.direction = null;
  this.completed = false;
}

Stroke.prototype = {
  update: function(ctx) {
    if (!this.powerBar.begin){
      this.powerBar.fill(ctx).eventListen(this, this.powerBar);
    }
    if (this.powerBar.begin) {
      this.directionSpinner.rotate(ctx).eventListen(this ,this.directionSpinner, this.powerBar);
    } else if (this.powerBar.begin === false && this.directionSpinner.begin) {
      this.completed = true;
      // this.hole.ball.update();
      // this.hole.ball.update(this.directionSpinner.direction, this.powerBar, this.directionSpinner, this.directionSpinner.resistance);
    }
},

draw: function(ctx) {
  if (!this.powerBar.begin) {
    this.powerBar.draw(ctx);
  } else if (this.powerBar.begin) {
    this.directionSpinner.draw(ctx);
  }
}
};



module.exports = Stroke;
