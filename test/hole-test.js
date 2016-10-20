const chai = require('chai');
const assert = chai.assert;

const Hole = require('../lib/hole');

describe('Hole', function() {
  context('with default attributes', function() {
    let hole = new Hole();

    it('should be an object', function() {
      assert.isObject(hole, "hole is not an object!");
    });

    it('should accept x,y coordinates for placement', function() {
      let hole = new Hole(100, 100);
      assert.equal(hole.x, 100, "hole.x is not 100");
      assert.equal(hole.y, 100, "hole.y is not 100");
    });

    it('should have a radius', function() {
      assert.property(hole, 'radius', "radius is not a hole property");
    });
  });

  context("with available methods", function() {
    let hole = new Hole();
    it('should be able to draw itself', function() {
      assert.isFunction(hole.draw, 'draw is not a hole function');
    });
  });
});
