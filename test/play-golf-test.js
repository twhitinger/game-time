// var sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

const PlayGolf = require('../lib/play-golf');

var canvas = document.createElement('game-canvas');
var fakeContext = {};

// sinon.stub(canvas, 'getContext');
// canvas.getContext.withArgs('2d').returns(fakeContext);
//

// sinon.stub(document, 'getElementById');
// document.getElementById.withArgs('game-canvas').returns(canvas);

describe("GamePlay", function() {
  context("managing the round of golf", function() {
    xit("creates a new hole when a hole is completed", function() {
      let playGolf = new PlayGolf();
      assert.equal(playGolf.holeNumber, 1, "holes aren't starting at 1");

      playGolf.currentHole.completed = true;
      playGolf.update();

      assert.equal(playGolf.holeNumber, 2, "no increment from hole 1 to hole 2");
    });

    xit("tracks strokes appropriately across holes", function() {
      let playGolf = new PlayGolf();
      assert.equal(playGolf.totalStrokes, 0);

      playGolf.currentHole.strokes = 5;
      playGolf.currentHole.completed = true;
      playGolf.update();

      assert.equal(playGolf.totalStrokes, 5);
    });
  });
});
