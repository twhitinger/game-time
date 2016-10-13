function Selector() {

  let keyState = {};

  window.addEventListener("keydown", function(e) {
    keyState[e.keyCode] = true;
  });
  window.addEventListener("keyup", function(e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode];
  };

  this.KEYS = { SPACE: 32 };
}

module.exports = Selector;
