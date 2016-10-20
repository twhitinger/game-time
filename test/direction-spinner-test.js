const chai = require('chai');
const assert = chai.assert;

const DirectionSpinner = require('../lib/direction-spinner');

describe('DirectionSpinner', function() {
  context('with default attributes', function() {
    let directionSpinner = new DirectionSpinner();

    it('should be an object', function() {
      assert.isObject(directionSpinner, "directionSpinner is not an object!");
    });
  });

  context('with available functions', function() {
    let directionSpinner = new DirectionSpinner();

    it('should have the ability to rotate itself', function() {
      assert.isFunction(directionSpinner.rotate, "rotate is NOT a function");
    });

    it('should be able to listen to input events', function() {
      assert.isFunction(directionSpinner.eventListen, "eventListen is NOT a function");
    });

    it('should have the ability to draw itself', function() {
      assert.isFunction(directionSpinner.draw, "draw is NOT a function");
    });
  });
});
