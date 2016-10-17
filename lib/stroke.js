const DirectionSpinner = require('./direction-spinner');
const PowerBar = require('./power-bar');

function Stroke(hole, ball) {
  this.ball = ball;
  this.ball.direction = 0;
  this.ball.v = 0;
  this.hole = hole;
  this.inProgress = true;
  this.powerBar = new PowerBar(this);
  this.directionSpinner = new DirectionSpinner(this);
  this.power = null;
  this.direction = null;
}

Stroke.prototype = {
  update: function(ctx) {
  //   // if (!this.powerBar.begin){
  //   //   // this.powerBar.update();
  //   //   debugger
  //   //  this.powerBar.draw(ctx).fill(ctx).eventListen(this.ball,this.powerBar);
  //   if (this.powerBar.begin) {
  //     // this.directionSpinner.update();
  //     // this.directionSpinner.draw(ctx).rotate(ctx).eventListen(this.ball,this.directionSpinner, this.powerBar);
  //   } else if (this.powerBar.begin === false && this.directionSpinner.begin) {
  //     // this.hole.ball.update();
  //     // this.hole.ball.update(this.directionSpinner.direction, this.powerBar, this.directionSpinner, this.directionSpinner.resistance);
    // }
  },

  draw: function(ctx) {
    if (!this.powerBar.begin) {
     this.powerBar.draw(ctx).fill(ctx).eventListen(this.ball,this.powerBar);
    } else if (this.powerBar.begin) {
      this.directionSpinner.draw(ctx).rotate(ctx).eventListen(this.ball,this.directionSpinner, this.powerBar);
    }
  },


  hit: function() {

    this.hole.ball.direction = this.direction;
    this.hole.ball.v = this.power;
    console.log('Hit ball with ' + this.power + ' Power and ' + this.direction + ' Radians Direction');
    this.inProgress = false;
  }
};

module.exports = Stroke;
