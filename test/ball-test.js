const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/ball');

describe('Ball', function() {
  context('with default attributes', function() {
    let ball = new Ball({});

    it('should be an object', function() {
      assert.isObject(ball);
    });
  });

  context('movement', function() {
    let ball = new Ball();
    it('should have the ability to move', function() {
      assert.isFunction(ball.move, "move is NOT a function");
    });
    it('should move to a new location', function() {
      ball.move({v: [2, 2], r: 1});
      assert.notEqual(ball.x, 50);
      assert.notEqual(ball.y, 50);
    });
  });
});
