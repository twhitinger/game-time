function Ball(options = {x: 50, y: 50, r: 3, v: 0}) {
  this.x = options.x;
  this.y = options.y;
  this.r = options.r;
  this.v = options.v;
}

Ball.prototype.move = function() {

};

module.exports = Ball; 
