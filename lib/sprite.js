

function Sprite(img, width, height, x, y){
  this.img = img;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
}

Sprite.prototype = {
  draw: function(ctx){
    // let pos = this.positions[position];
    ctx.drawImage(
      this.img,
      0,
      0,
      50,
      100,
      this.x,
      this.y,
      50,
      100
    );
  }
};

module.exports = Sprite;
