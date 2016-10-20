function GameOver(menu) {
  this.canvas = document.getElementById("game-canvas");
  const ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.textAlign = "center";
  ctx.font = "50px Helvetica";
  const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "red");
  gradient.addColorStop("1.0", "blue");
  ctx.fillStyle = gradient;
  ctx.fillText("Game Over!", this.canvas.width/2, this.canvas.height/3);
  ctx.fillText("Your Score: " + localStorage.lygerWoodsLastScore, this.canvas.width/2, 2*this.canvas.height/3);
  setTimeout(function() {
    menu.main();
  }, 2500);
}

module.exports = GameOver;
