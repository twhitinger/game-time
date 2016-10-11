function Ball(options = {x: 50, y: 50, r: 3}) {
  this.x = options.x;
  this.y = options.y;
  this.r = options.r;
}

Ball.prototype.move = function(options = {}) {
  let v = options.v;
  let r = options.r;

};

module.exports = Ball;
