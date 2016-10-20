const chai = require('chai');
const assert = chai.assert;

const SandDune = require('../lib/sand-dune');

describe('SandDune', function() {
  context('with default attributes', function() {
    let sandDune = new SandDune();

    it('should be an object with defined attributes', function() {
      assert.isObject(sandDune, "sandDune is not an object");
    });

    it('should accept x, y, and holeNumber inputs', function() {
      let sandDune = new SandDune(100, 100, 1);

      assert.equal(sandDune.x, 100, "x is not 100");
      assert.equal(sandDune.y, 100, "y is not 100");
      assert.equal(sandDune.holeNumber, 1, "the holeNumber is not 1");
    });

    it('should have a default width and height', function() {
      assert.property(sandDune, 'width', 'width is not a sandDune property');
      assert.property(sandDune, 'height', 'height is not a sandDune property');
    });
  });

  context('with available functions', function() {
    let sandDune = new SandDune(100, 100, 1);

    it('should be able to draw itself', function() {
      assert.isFunction(sandDune.draw, 'draw is not a sandDune function');
    });
  });
});
