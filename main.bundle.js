/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Menu = __webpack_require__(1);

	window.addEventListener("load", function () {
	  let menu = new Menu();
	  menu.main();
	  menu.listen();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const PlayGolf = __webpack_require__(2);

	function Menu() {
	  this.canvas = document.getElementById("game-canvas");
	  this.ctx = this.canvas.getContext("2d");
	  this.lastScore = retrieveLastScore();
	  this.highScores = retrieveHighScores();
	  this.verticalSpacing = 60;
	}

	Menu.prototype = {
	  main: function () {
	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
	    this.ctx.textAlign = "center";
	    this.ctx.font = "45px Helvetica";
	    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
	    gradient.addColorStop("0.2", "magenta");
	    gradient.addColorStop("0.5", "blue");
	    gradient.addColorStop("0.8", "red");
	    this.ctx.fillStyle = gradient;
	    this.ctx.fillText("Welcome to Lyger Woods 2017!", this.canvas.width / 2, this.canvas.height / 3);
	    this.ctx.font = "30px Helvetica";
	    this.ctx.fillText("press [spacebar] to play, [i] for instructions", this.canvas.width / 2, this.canvas.height / 3 + 2 * this.verticalSpacing);
	    this.ctx.fillText(this.lastScore, this.canvas.width / 2, this.canvas.height / 3 + 3 * this.verticalSpacing);
	    this.ctx.fillText(this.highScores, this.canvas.width / 2, this.canvas.height / 3 + 4 * this.verticalSpacing);
	    this.gameInProgress = false;
	    this.listen();
	  },

	  listen: function () {
	    let menu = this;
	    window.addEventListener("keyup", function (e) {
	      let key = e.which;
	      if (key === 32) {
	        if (!menu.gameInProgress) {
	          menu.gameInProgress = true;
	          new PlayGolf(menu);
	        }
	      } else if (key === 73) {
	        let gameCanvas = document.getElementById("game-canvas");
	        let ctx = gameCanvas.getContext("2d");
	        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	        ctx.moveTo(gameCanvas.width / 2, gameCanvas.height / 2);
	        ctx.textAlign = "center";
	        ctx.font = "20px Helvetica";
	        const gradient = ctx.createLinearGradient(0, 0, gameCanvas.width, 0);
	        gradient.addColorStop("0.2", "magenta");
	        gradient.addColorStop("0.5", "blue");
	        gradient.addColorStop("0.8", "red");
	        ctx.fillStyle = gradient;
	        ctx.fillText("9 Holes per round", gameCanvas.width / 2, 200);
	        ctx.fillText("Maximum 10 strokes per hole", gameCanvas.width / 2, 250);
	        ctx.fillText("PRESS and HOLD [spacebar] to start inputs", gameCanvas.width / 2, 300);
	        ctx.fillText("1st input is to choose the stroke power", gameCanvas.width / 2, 350);
	        ctx.fillText("2nd input is to choose the stroke swing", gameCanvas.width / 2, 400);
	        ctx.fillText("Watch out for obstacles! Good luck!", gameCanvas.width / 2, 450);
	        ctx.fillText("Press [m] for the Menu or [spacebar] to Play Golf!", gameCanvas.width / 2, 500);
	      } else if (key === 77) {
	        let menu = new Menu();
	        menu.main();
	      }
	    });
	  }
	};

	function retrieveLastScore() {
	  if (localStorage.lygerWoodsLastScore) {
	    let lastScore = localStorage.lygerWoodsLastScore;
	    return "Last Score: " + lastScore;
	  } else {
	    localStorage.lygerWoodsLastScore = "";
	    return "You're the first person to play in this browser!";
	  }
	}

	function retrieveHighScores() {
	  if (localStorage.lygerWoodsHighScores) {
	    return "Past Scores: " + localStorage.lygerWoodsHighScores;
	  } else {
	    localStorage.lygerWoodsHighScores = "";
	    return "There are no top scores! This is your chance!";
	  }
	}

	module.exports = Menu;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const PlayHole = __webpack_require__(3);
	const GameOver = __webpack_require__(13);

	function PlayGolf(menu) {
	  this.menu = menu;
	  this.canvas = document.getElementById("game-canvas");
	  this.applauseSound = document.getElementById("applause");
	  this.puttSound = document.getElementById("putt-sound");
	  const ctx = this.canvas.getContext("2d");
	  ctx.textAlign = "left";
	  const self = this;
	  this.totalStrokes = 0;
	  this.holeNumber = 1;
	  this.gameLength = 9;
	  this.currentHole = new PlayHole(this, this.holeNumber);
	  this.gameOver = false;

	  function animate() {
	    self.draw(ctx);
	    self.update(ctx);
	    if (self.gameOver) {
	      new GameOver(this.menu);
	    } else {
	      requestAnimationFrame(animate);
	    }
	  }
	  animate();
	}

	PlayGolf.prototype = {
	  update: function (ctx) {
	    if (this.currentHole.completed === true) {
	      this.totalStrokes += this.currentHole.strokes;
	      if (this.holeNumber === this.gameLength) {
	        localStorage.lygerWoodsLastScore = this.totalStrokes;
	        localStorage.lygerWoodsHighScores += this.totalStrokes + "  ";
	        this.gameOver = true;
	        new GameOver(this.canvas);
	      } else {
	        this.holeNumber++;
	        this.currentHole = new PlayHole(this, this.holeNumber);
	      }
	    }
	    this.currentHole.update(ctx);
	  },

	  draw: function (ctx) {
	    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    ctx.font = "30px Helvetica";
	    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
	    gradient.addColorStop("0", "magenta");
	    gradient.addColorStop("0.5", "red");
	    gradient.addColorStop("1.0", "blue");
	    ctx.fillStyle = gradient;
	    ctx.fillText("Hole " + this.holeNumber + ", Strokes: " + this.currentHole.strokes, 10, 30);
	    this.currentHole.draw(ctx);
	  }
	};

	module.exports = PlayGolf;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Ball = __webpack_require__(4);
	const Hole = __webpack_require__(5);
	const Obstacles = __webpack_require__(6);
	const SandDune = __webpack_require__(7);
	const Stroke = __webpack_require__(8);
	const Sprite = __webpack_require__(12);
	let treeImage = new Image();
	treeImage.src = "./assets/images/tree-1.jpg";
	let sandImage = new Image();
	sandImage.src = "./assets/images/fire.jpg";

	function PlayHole(game, holeNumber) {
	  this.completed = false;
	  this.game = game;
	  this.holeNumber = holeNumber;
	  this.ball = new Ball(170, 350);
	  this.hole = new Hole(300, 100);

	  this.obstacles = generateObstacles(this.hole, this.holeNumber, this.ball);
	  this.sprites = generateSprites(this.obstacles, treeImage);
	  this.sandDunes = generateSandDunes(this.hole, this.holeNumber, this.obstacles, this.ball);
	  this.spritesSand = generateSprites(this.sandDunes, sandImage);
	  this.stroke = new Stroke(this, this.ball);
	  this.strokes = 0;
	  this.maxStrokes = 10;
	  this.walls = [{ x: -500, y: -100, width: 500, height: game.canvas.height + 100 }, { x: game.canvas.width, y: 0, width: 500, height: game.canvas.height + 100 }, { x: -100, y: -500, width: game.canvas.width + 100, height: 500 }, { x: -100, y: game.canvas.height, width: game.canvas.width + 100, height: 500 }, { x: 0, y: 0, width: 5, height: 5 }, { x: game.canvas.width - 5, y: 0, width: 5, height: 5 }, { x: 0, y: game.canvas.height - 5, width: 5, height: 5 }, { x: game.canvas.width - 5, y: game.canvas.height - 5, width: 5, height: 5 }];

	  function generateSandDunes(hole, holeNumber, obstacles, ball) {
	    let sandDuneArr = [];
	    let x = Math.floor(Math.random() * 200 + 50);
	    let y = Math.floor(Math.random() * 150 + 25);
	    for (let i = 0; i < holeNumber * 10; i++) {
	      x = x * (Math.random() * (1.5 - 0.75) + 0.75).toFixed(4);
	      y = y * (Math.random() * (1.5 - 0.75) + 0.75).toFixed(4);
	      sandDuneArr.push(new SandDune(x, y, holeNumber));
	    }
	    sandDuneArr = checkObstacles(sandDuneArr, obstacles);
	    sandDuneArr = checkBall(ball, sandDuneArr);
	    return checkHole(hole, sandDuneArr);
	  }
	  function checkBall(ball, objects) {
	    for (let i = 0; i < objects.length; i++) {
	      let dx = ball.x - (objects[i].x + objects[i].width / 2);
	      let dy = ball.y - (objects[i].y + objects[i].height / 2);
	      let width = (ball.radius + objects[i].width) / 2;
	      let height = objects[i].height / 2;
	      if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
	        objects.splice(i, 1);
	      }
	    }
	    return objects;
	  }

	  function generateObstacles(hole, holeNumber, ball) {
	    let obstacleArr = [];
	    let x = Math.floor(Math.random() * 200 + 50);
	    let x1 = Math.floor(Math.random() * 200 + 100);
	    let y = Math.floor(Math.random() * 150 + 25);
	    let y1 = Math.floor(Math.random() * 150 + 25);
	    for (let i = 0; i < holeNumber * 10; i++) {
	      x = x * (Math.random() * (1.3 - 0.95) + 0.95).toFixed(4);
	      y = y * (Math.random() * (1.3 - 0.95) + 0.95).toFixed(4);
	      x1 = x1 * (Math.random() * (1.3 - 0.95) + 0.95).toFixed(4);
	      y1 = y1 * (Math.random() * (1.3 - 0.95) + 0.95).toFixed(4);
	      obstacleArr.push(new Obstacles(x, y, holeNumber));
	      obstacleArr.push(new Obstacles(x1, y1, holeNumber));
	    }
	    obstacleArr = checkBall(ball, obstacleArr);
	    return checkHole(hole, obstacleArr);
	  }

	  function generateSprites(obstacles, img) {
	    let spriteArr = [];
	    for (let i = 0; i < obstacles.length; i++) {
	      let currentO = obstacles[i];
	      spriteArr.push(new Sprite(img, currentO.width, currentO.height, currentO.x, currentO.y));
	    }
	    return spriteArr;
	  }

	  function checkObstacles(sandDunes, objects) {
	    for (let i = 0; i < objects.length; i++) {
	      for (let j = 0; i < sandDunes.length; i++) {
	        if (sandDunes[j].x < objects[i].x + objects[i].width && sandDunes[j].x + sandDunes[j].width > objects[i].x && sandDunes[j].y < objects[i].y + objects[i].height && sandDunes[j].height + sandDunes[j].y > objects[i].y) {
	          sandDunes.splice(j, 1);
	        }
	      }
	    }
	    return sandDunes;
	  }

	  function checkHole(hole, objects) {
	    for (let i = 0; i < objects.length; i++) {
	      let dx = hole.x - (objects[i].x + objects[i].width / 2);
	      let dy = hole.y - (objects[i].y + objects[i].height / 2);
	      let width = (hole.radius + objects[i].width) / 2;
	      let height = objects[i].height / 2;
	      if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
	        objects.splice(i, 1);
	      }
	    }
	    return objects;
	  }
	}

	PlayHole.prototype = {
	  update: function (ctx) {
	    this.stroke.update(ctx);
	    if (this.stroke.completed) {
	      this.ball.hit(this.stroke.direction, this.stroke.power);
	      this.strokes++;
	      this.game.puttSound.load();
	      this.game.puttSound.play();
	      this.stroke = new Stroke(this, this.ball);
	    }
	    this.checkHoleInOne();
	    this.obstacleCheck(this.ball, this.obstacles);
	    this.obstacleCheck(this.ball, this.walls);
	    this.ball.update();
	    this.resistanceCheck(this.ball, this.sandDunes);
	    if (this.strokes === this.maxStrokes) {
	      this.completed = true;
	    }
	  },

	  draw: function (ctx) {
	    ctx.textAlign = "left";
	    if (this.ball.v === 0) {
	      this.stroke.draw(ctx);
	    }
	    this.obstacles.forEach(function (obstacle) {
	      obstacle.draw(ctx);
	    });
	    this.sandDunes.forEach(function (sandDune) {
	      sandDune.draw(ctx);
	    });

	    this.spritesSand.forEach(function (sprite) {
	      sprite.draw2(ctx, this.hole);
	    });
	    this.hole.draw(ctx);
	    this.ball.draw(ctx);

	    this.sprites.forEach(function (sprite) {
	      sprite.draw(ctx, this.hole);
	    });
	  },

	  obstacleCheck: function (ball, objects) {
	    objects.forEach(function (object) {
	      let [x, y] = ball.nextPos();
	      let dx = Math.abs(x - (object.x + object.width / 2));
	      let dy = Math.abs(y - (object.y + object.height / 2));
	      let width = (ball.radius + object.width) / 2;
	      let height = (ball.radius + object.height) / 2;
	      let crossWidth = width * dy;
	      let crossHeight = height * dx;
	      let collision = 'none';

	      if (dx <= width && dy <= height) {
	        ball.colliding = true;
	        if (crossWidth > crossHeight) {
	          collision = crossWidth > crossHeight ? 'bottom' : 'left';
	        } else {
	          collision = crossWidth > -1 * crossHeight ? 'right' : 'top';
	        }
	        if (collision === "bottom" || collision === "top") {
	          ball.yDeflect();
	        } else {
	          ball.xDeflect();
	        }
	      }
	    });
	  },

	  resistanceCheck: function (ball, objects) {
	    for (let i = 0; i < objects.length; i++) {
	      let dx = ball.x - (objects[i].x + objects[i].width / 2);
	      let dy = ball.y - (objects[i].y + objects[i].height / 2);
	      let width = (ball.radius + objects[i].width) / 2;
	      let height = objects[i].height / 2;
	      if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
	        ball.v = 0;
	      }
	    }
	  },

	  holeCheck: function (hole, objects) {
	    for (let i = 0; i < objects.length; i++) {
	      let dx = hole.x - (objects[i].x + objects[i].width / 2);
	      let dy = hole.y - (objects[i].y + objects[i].height / 2);
	      let width = (hole.radius + objects[i].width) / 2;
	      let height = objects[i].height / 2;
	      if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
	        objects.splice(i, 1);
	      }
	    }
	  },

	  checkHoleInOne: function () {
	    let dx = this.ball.x - this.hole.x;
	    let dy = this.ball.y - this.hole.y;
	    let distance = Math.sqrt(dx * dx + dy * dy);

	    if (distance < this.ball.radius + this.hole.radius) {
	      this.game.applauseSound.load();
	      this.game.applauseSound.play();
	      this.completed = true;
	    }
	  }
	};

	module.exports = PlayHole;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Ball(x, y) {
	  this.x = x;
	  this.y = y;
	  this.radius = 3;
	  this.v = 0;
	  this.direction = null;
	  this.resistance = 0.15;
	  this.colliding = false;
	}

	Ball.prototype = {
	  draw: function (ctx) {
	    ctx.strokeStyle = '#000000';
	    ctx.fillStyle = '#ffffff';
	    ctx.lineWidth = 4;
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	    ctx.stroke();
	    ctx.fill();
	  },

	  update: function () {
	    if (this.v > 0) {
	      if (this.colliding === false) {
	        [this.x, this.y] = this.nextPos();
	        this.v = this.v - this.resistance;
	      } else {
	        this.colliding = false;
	      }
	    } else {
	      this.v = 0;
	    }
	  },

	  hit: function (direction, power) {
	    this.direction = direction;
	    this.v = power;
	  },

	  xDeflect: function () {
	    this.direction = Math.PI - this.direction;
	  },

	  yDeflect: function () {
	    this.direction = -1 * this.direction;
	  },
	  nextPos: function () {
	    let xMovement = Math.cos(this.direction);
	    let yMovement = -Math.sin(this.direction);
	    return [this.x + this.v * xMovement, this.y - this.v * yMovement];
	  }
	};

	module.exports = Ball;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Hole(x, y) {
	  this.x = x;
	  this.y = y;
	  this.radius = 8;
	}

	Hole.prototype.draw = function (ctx) {
	  ctx.strokeStyle = '#ffffff';
	  ctx.fillStyle = '#000000';
	  ctx.lineWidth = 4;
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	  ctx.stroke();
	  ctx.fill();

	  return this;
	};

	module.exports = Hole;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function Obstacles(x, y, holeNumber) {
	  this.holeNumber = holeNumber;
	  this.x = x;
	  this.y = y;
	  this.width = 30;
	  this.height = 80;
	}

	Obstacles.prototype = {
	  draw: function (ctx) {
	    ctx.strokeStyle = "black";
	    ctx.rect(this.x, this.y, this.width, this.height);
	  }
	};

	module.exports = Obstacles;

/***/ },
/* 7 */
/***/ function(module, exports) {

	function SandDune(x, y, holeNumber) {
	  this.holeNumber = holeNumber;
	  this.x = x;
	  this.y = y;
	  this.width = 50;
	  this.height = 50;
	}

	SandDune.prototype = {
	  draw: function (ctx) {
	    ctx.rect(this.x, this.y, this.width, this.height);
	  }
	};

	module.exports = SandDune;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const DirectionSpinner = __webpack_require__(9);
	const PowerBar = __webpack_require__(11);

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
	  update: function (ctx) {
	    if (!this.powerBar.begin) {
	      this.powerBar.fill(ctx).eventListen(this, this.powerBar);
	    }
	    if (this.powerBar.begin) {
	      this.directionSpinner.rotate(ctx).eventListen(this, this.directionSpinner, this.powerBar);
	    } else if (this.powerBar.begin === false && this.directionSpinner.begin) {
	      this.completed = true;
	    }
	  },

	  draw: function (ctx) {
	    if (!this.powerBar.begin) {
	      this.powerBar.draw(this.ball.x, this.ball.y, ctx);
	    } else if (this.powerBar.begin) {
	      this.directionSpinner.draw(this.ball.x, this.ball.y, ctx);
	    }
	    ctx.globalAlpha = 1.0;
	  }
	};

	module.exports = Stroke;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Selector = __webpack_require__(10);

	function DirectionSpinner(stroke) {
	  this.stroke = stroke;
	  this.inProgress = true;
	  this.radius = 50;
	  this.sAngle = 0;
	  this.eAngle = 2 * Math.PI;
	  this.tickNumber = 0;
	  this.pointerRadians = 0;
	  this.selector = new Selector();
	  this.begin = false;
	  this.direction = 0;
	  this.resistance = 0;
	}

	DirectionSpinner.prototype.draw = function (x, y, ctx) {
	  if (x < 110) {
	    this.x = x + 50;
	  } else {
	    this.x = x - 50;
	  }
	  if (y < 110) {
	    this.y = y + 50;
	  } else {
	    this.y = y - 50;
	  }
	  ctx.globalAlpha = 0.5;
	  ctx.lineWidth = 1;
	  ctx.strokeStyle = '#000000';
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.fillStyle = '#ffffff';
	  ctx.fill();

	  return this;
	};

	DirectionSpinner.prototype.rotate = function (ctx) {
	  const tickTotal = 150;
	  const pointerLength = this.radius;
	  let targetX = this.x + Math.cos(this.pointerRadians) * pointerLength;
	  let targetY = this.y + Math.sin(this.pointerRadians) * pointerLength;
	  if (this.tickNumber === tickTotal) {
	    this.tickNumber = 0;
	  }

	  if (this.selector.isDown(this.selector.KEYS.SPACE)) {
	    this.tickNumber = this.tickNumber + 1;
	    this.pointerRadians = -2 * Math.PI * (this.tickNumber / tickTotal);
	    ctx.linewidth = 3;
	    ctx.strokeStyle = '#DD0000';
	    ctx.beginPath();
	    ctx.moveTo(this.x, this.y);
	    ctx.lineTo(targetX, targetY);
	    ctx.stroke();
	  }
	  return this;
	};

	DirectionSpinner.prototype.eventListen = function (stroke, directionSpinner, powerBar) {
	  window.addEventListener("keyup", spinnerTurn);

	  function spinnerTurn(e) {
	    if (e.keyCode === 32) {
	      directionTurn(stroke, directionSpinner, powerBar);
	    }
	  }
	  function directionTurn(stroke, directionSpinner, powerBar) {
	    stroke.direction = directionSpinner.pointerRadians;
	    directionSpinner.begin = true;
	    powerBar.begin = false;
	  }
	};

	module.exports = DirectionSpinner;

/***/ },
/* 10 */
/***/ function(module, exports) {

	function Selector() {

	  let keyState = {};

	  window.addEventListener("keydown", function (e) {
	    keyState[e.keyCode] = true;
	  });
	  window.addEventListener("keyup", function (e) {
	    keyState[e.keyCode] = false;
	  });

	  this.isDown = function (keyCode) {
	    return keyState[keyCode];
	  };

	  this.KEYS = { SPACE: 32 };
	}

	module.exports = Selector;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	const Selector = __webpack_require__(10);

	function PowerBar(stroke) {
	  this.stroke = stroke;
	  this.width = 20;
	  this.height = 100;
	  this.power = 0;
	  this.size = 1;
	  this.selector = new Selector();
	  this.begin = false;
	}

	PowerBar.prototype.draw = function (x, y, ctx) {
	  if (x < 50) {
	    this.x = x + 20;
	  } else {
	    this.x = x - 40;
	  }
	  if (y < 130) {
	    this.y = y + 20;
	  } else {
	    this.y = y - 100;
	  }
	  ctx.globalAlpha = 0.5;
	  ctx.strokeStyle = '#ffffff';
	  ctx.fillStyle = '#ffffff';
	  ctx.lineWidth = 2;
	  ctx.strokeRect(this.x, this.y, this.width, this.height);
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	PowerBar.prototype.fill = function (ctx) {

	  if (this.selector.isDown(this.selector.KEYS.SPACE)) {
	    if (this.size <= 100) {
	      ctx.strokeStyle = '#ffffff';
	      ctx.fillStyle = '#ff0000';
	      ctx.lineWidth = 2;
	      ctx.strokeRect(this.x, this.y + this.height, this.width, -this.size);
	      ctx.fillRect(this.x, this.y + this.height, this.width, -this.size);
	      this.size += 1.5;
	    } else {
	      this.size = 1;
	    }
	  }
	  return this;
	};

	PowerBar.prototype.eventListen = function (stroke, powerBar) {

	  window.addEventListener("keyup", powerBarTurn);
	  function powerBarTurn(e) {
	    if (e.keyCode === 32) {
	      powerTurn(stroke, powerBar);
	    }
	  }
	  function powerTurn(stroke, powerBar) {
	    let power = powerBar.size / 12;
	    stroke.power = power;
	    powerBar.begin = true;
	  }
	};

	module.exports = PowerBar;

/***/ },
/* 12 */
/***/ function(module, exports) {

	function Sprite(img, width, height, x, y) {
	  this.img = img;
	  this.width = width;
	  this.height = height;
	  this.x = x;
	  this.y = y;
	}

	Sprite.prototype = {
	  draw2: function (ctx) {
	    ctx.drawImage(this.img, 0, 0, 50, 100, this.x, this.y, 50, 50);
	  },

	  draw: function (ctx) {
	    ctx.drawImage(this.img, 0, 0, 50, 100, this.x * 0.98, this.y, 50, 100);
	  }
	};

	module.exports = Sprite;

/***/ },
/* 13 */
/***/ function(module, exports) {

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
	  ctx.fillText("Game Over!", this.canvas.width / 2, this.canvas.height / 3);
	  ctx.fillText("Your Score: " + localStorage.lygerWoodsLastScore, this.canvas.width / 2, 2 * this.canvas.height / 3);
	  ctx.fillText("Press [m] to return to the Main Menu", this.canvas.width / 2, 3 * this.canvas.height / 4);
	  setTimeout(function () {
	    menu.main();
	  }, 2500);
	}

	module.exports = GameOver;

/***/ }
/******/ ]);