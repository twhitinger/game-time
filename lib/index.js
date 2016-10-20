const Menu = require('./menu');

window.addEventListener("load", function() {
  let menu = new Menu();
  menu.main();
  menu.listen();
});
