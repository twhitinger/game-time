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
    let ball = new Ball(100, 100);
    it('should have the ability to move', function() {
      assert.isFunction(ball.move, "move is NOT a function");
    });
    it('should move in a horizontal vector', function() {
      ball.move(Math.PI);
      assert.equal(ball.y, 100);
      assert.notEqual(ball.x, 100);
    });
    it('should move in a vertical vector', function() {
      ball.x = 100;
      ball.move(Math.PI/2);
      assert.equal(ball.x, 100);
      assert.notEqual(ball.y, 100);
    });
    it('should move in x,y-planes equally for a diagonal PI/4 radian vector', function() {
      let xInit = 100;
      let yInit = 100;
      ball.x = xInit;
      ball.y = yInit;
      ball.move(Math.PI/4);
      assert.equal(((ball.x - xInit) - (ball.y - yInit)), 0);
    });
  });
});
