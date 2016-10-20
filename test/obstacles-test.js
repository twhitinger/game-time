const chai = require('chai');
const assert = chai.assert;

const Obstacles = require('../lib/obstacles');

describe("Obstacles", function() {
  context("with default attributes", function() {
    let obstacles = new Obstacles(100, 100, 1);

    it('is an object', function() {
      assert.isObject(obstacles, 'obstacles is not an object');
    });

    it('accepts x, y, and holeNumber', function() {
      assert.equal(obstacles.x, 100, "x failed to be assigned");
      assert.equal(obstacles.y, 100, "y failed to be assigned");
      assert.equal(obstacles.holeNumber, 1, "holeNumber failed to be assigned");
      assert.property(obstacles, 'width', 'width is not a property of obstacles');
      assert.property(obstacles, 'height', 'height is not a property of obstacles');
    });
  });

  context('with available functions', function() {
    let obstacles = new Obstacles(100, 100, 1);

    it('should be able to draw itself', function() {
      assert.isFunction(obstacles.draw, 'draw is not a function of obstacles');
    });
  });
});
