const chai = require('chai');
const assert = chai.assert;

const Sprite = require('../lib/sprite');

describe('Sprite', function() {
  context('with default attributes', function() {
    let sprite = new Sprite();

    it('is an object with default attributes', function() {
      assert.isObject(sprite, "sprite is not an Object!");
      assert.property(sprite, 'width', 'width is not a property of sprite!');
      assert.property(sprite, 'height', 'height is not a property of sprite!');
      assert.property(sprite, 'x', 'x is not a property of sprite!');
      assert.property(sprite, 'y', 'y is not a property of sprite!');
    });
  });

  context("with available functions", function() {
    let sprite = new Sprite({}, 100, 100, 100, 100);
    
    it('has ability to draw itself', function() {
      assert.isFunction(sprite.draw, 'draw is not a function available to Sprite!');
    });
  });
});
