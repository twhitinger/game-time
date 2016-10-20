const chai = require('chai');
const assert = chai.assert;

const Stroke = require('../lib/stroke');

describe('Stroke', function() {
  context('with default attributes', function() {
    let stroke = new Stroke({});

    it('should be an object with defined properties', function() {
      assert.isObject(stroke);
      assert.property(stroke, 'ball', 'ball is not a property on stroke');
      assert.property(stroke, 'hole', 'hole is not a property on stroke');
      assert.property(stroke, 'power', 'power is not a property on stroke');
      assert.property(stroke, 'direction', 'direction is not a property on stroke');
    });

    it('should have direction and power inputs', function() {
      assert.isObject(stroke.powerBar);
      assert.isObject(stroke.directionSpinner);
    });

    it('should not be completed upon initiatialization', function() {
      assert(stroke.inProgress);
      assert.isFalse(stroke.completed);
    });
  });

  context('with available functions', function() {
    let stroke = new Stroke();

    it('should have the ability to update itself', function() {
      assert.isFunction(stroke.update, "update is NOT a function");
    });

    it('should have the ability to draw itself', function() {
      assert.isFunction(stroke.draw, "draw is NOT a function");
    });
  });
});
