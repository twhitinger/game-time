const chai = require('chai');
const assert = chai.assert;

const PlayHole = require('../lib/play-hole');

describe("PlayHole", function() {
  let gameStub = {
    canvas: {width: 100, height: 100},
    applauseSound: {load: function(){}, play: function(){}}
  };
  context("with default attributes", function() {
    let playHole = new PlayHole(gameStub, 1);

    it("is an object", function() {
      assert.isObject(playHole, 'playHole is not an object!');
    });

    it("has required objects game, ball, hole, and stroke as attributes", function() {
      assert.isObject(playHole.game, "playHole.game is not an object");
      assert.isObject(playHole.ball, "playHole.ball is not an object");
      assert.isObject(playHole.hole, "playHole.hole is not an object");
      assert.isObject(playHole.stroke, "playHole.stroke is not an object");
    });

    it("has default values", function() {
      assert.equal(playHole.strokes, 0, 'strokes are not 0!');
      assert.equal(playHole.holeNumber, 1, 'holeNumber is not assigned properly!');
    });
  });

  context('it manages strokes appropriately', function() {
    it('creates a new stroke automatically upon stroke completion', function() {
      let playHole = new PlayHole(gameStub, 1);
      let firstStroke = playHole.stroke;
      firstStroke.completed = true;
      playHole.update();

      assert.notEqual(firstStroke, playHole.stroke, 'new stroke was not created');
    });

    it('keeps tally of strokes correctly', function() {
      let playHole = new PlayHole(gameStub, 1);
      assert.equal(playHole.strokes, 0, 'stroke tally at hole beginning is not 0');

      playHole.stroke.completed = true;
      playHole.update();
      assert.equal(playHole.strokes, 1, 'stroke tally is not correct after 1');

      playHole.stroke.completed = true;
      playHole.update();
      assert.equal(playHole.strokes, 2, 'stroke tally is not correct after 2');
    });
  });

  context("it can check for ball interactions on the course", function() {
    let playHole = new PlayHole(gameStub, 1);

    it("knows when the ball goes in the hole", function() {
      assert.isFalse(playHole.completed, "hole initialized as completed");

      [playHole.hole.x, playHole.hole.y] = [100, 100];
      [playHole.ball.x, playHole.ball.y] = [100, 100];
      playHole.checkHoleInOne();

      assert(playHole.completed, "ball in hole complete status did not change appropriately");
    });

    it("knows when the ball is colliding with objects", function() {
      assert.isFalse(playHole.ball.colliding, "ball is already colliding");
      [playHole.ball.x, playHole.ball.y] = [100, 100];
      playHole.objects = [{x: 95, y: 95, width: 10, height: 10}];
      playHole.obstacleCheck(playHole.ball, playHole.objects);

      assert.isTrue(playHole.ball.colliding);
    });
  });
});
