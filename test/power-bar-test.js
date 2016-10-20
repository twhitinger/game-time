const chai = require('chai');
const assert = chai.assert;

const PowerBar = require('../lib/power-bar');

describe("PowerBar", function() {
  context('with default attributes', function() {
    let powerBar = new PowerBar();

    it('should be an object', function() {
      assert.isObject(powerBar, "powerBar is not an object!");
    });
  });

  context('with available functions', function() {
    let powerBar = new PowerBar();

    it('should have the ability to draw itself', function() {
      assert.isFunction(powerBar.draw, "draw is not a powerBar function");
    });

    it('should have the ability to fill itself', function() {
      assert.isFunction(powerBar.fill, "fill is not a powerBar function");
    });

    it('should have a function to listen to inputs', function() {
      assert.isFunction(powerBar.eventListen, "eventListen is not a powerBar function");
    });
  });
});
