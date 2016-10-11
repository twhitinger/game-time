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
});
