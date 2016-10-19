function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.v = 0;
  this.direction = null;
  this.resistance = 0.15;
}

Ball.prototype = {
  draw: function(ctx) {
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    return this;
  },

  update: function() {
    if (this.v > 0) {
      [this.x, this.y] = this.nextPos();
      this.v = this.v - this.resistance;
    } else {
      this.v = 0;
    }
  },

  hit: function(direction, power) {
    this.direction = direction;
    this.v = power;
  },

  xDeflect: function() {
    this.direction = Math.PI - this.direction;
  },

  yDeflect: function() {
    this.direction = -1 * this.direction;
  },
  nextPos: function() {
    let xMovement = Math.cos(this.direction);
    let yMovement = -Math.sin(this.direction);
    return [this.x + this.v*xMovement, this.y - this.v*yMovement];
  }
};

module.exports = Ball;
