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

  context('with available functions', function() {
    let ball = new Ball(100, 100);

    it('should have the ability to update itself', function() {
      assert.isFunction(ball.update, "update is NOT a function");
    });

    it('should have the ability to draw itself', function() {
      assert.isFunction(ball.draw, "draw is NOT a function");
    });

    it('should move in a horizontal vector', function() {
      ball.hit(Math.PI, 5);
      ball.update();
      assert.equal(ball.y, 100);
      assert.notEqual(ball.x, 100);
    });

    it('should move in a vertical vector', function() {
      ball.x = 100;
      ball.hit(Math.PI/2, 5);
      ball.update();
      assert.equal(ball.x, 100);
      assert.notEqual(ball.y, 100);
    });

    it('should move in x,y-planes equally for a diagonal PI/4 radian vector', function() {
      let xInit = 100;
      let yInit = 100;
      ball.x = xInit;
      ball.y = yInit;
      ball.hit(Math.PI/4, 5);
      ball.update();
      assert.equal(((ball.x - xInit) - (ball.y - yInit)), 0);
    });

    it('should deflect in x-direction', function() {
      let ball = new Ball({});
      ball.direction = 0;
      ball.xDeflect();
      assert.notEqual(ball.direction, 0);
      assert.equal(ball.direction, Math.PI);
    });

    it('should deflect in y-direction', function() {
      let ball = new Ball({});
      ball.direction = Math.PI/2;
      ball.yDeflect();
      assert.notEqual(ball.direction, Math.PI/2);
      assert.equal(ball.direction, -Math.PI/2);
    });
  });
});
