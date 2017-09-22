
var expect = require('chai').expect;
var h = require('../lib/helpers/helpers.js');

describe('calcMS function', function() {
  it('should return 0 for 0 min and 0 sec', function() {
    expect(h.calcMS(0, 0)).to.equal(0);
  });

  it('should convert minutes and seconds to milliseconds', function() {
    expect(h.calcMS(9, 45)).to.equal(585000);
  });
});

describe('convertToMinSec function', function() {
  it('should return object with two keys', function() {
    expect(h.convertToMinSec(0))
      .to.be.an('object')
      .that.has.all.keys('minutes', 'seconds');
  });

  it('should convert 0 to 0min and 0sec', function() {
    expect(h.convertToMinSec(0)).to.deep.equal({minutes: 0, seconds: 0});
  });

  it('should convert 10340 to 0min and 10sec', function() {
    expect(h.convertToMinSec(10340)).to.deep.equal({minutes: 0, seconds: 10});
  });

  it('should convert 9939 to 0min and 10sec', function() {
    expect(h.convertToMinSec(9939)).to.deep.equal({minutes: 0, seconds: 10});
  });

  it('should convert 599499 to 9min and 59sec', function() {
    expect(h.convertToMinSec(599499)).to.deep.equal({minutes: 9, seconds: 59});
  });

  it('should convert 599923 to 10min and 0sec', function() {
    expect(h.convertToMinSec(599923)).to.deep.equal({minutes: 10, seconds: 0});
  });
});

describe('getBtnIndices function', function() {
  it('should return an object with prev/next keys', function() {
    expect(h.getBtnIndices(0, 1))
      .to.be.an('object')
      .that.has.all.keys('prev', 'next');
  });

  it('should return 0 for both buttons if only one element', function() {
    expect(h.getBtnIndices(0, 1)).to.deep.equal({prev: 0, next: 0});
  });

  it('should return last index for prev if display item is 0', function() {
    expect(h.getBtnIndices(0, 4)).to.deep.equal({prev: 3, next: 1});
  });

  it('should return 0 for next if display item is last', function() {
    expect(h.getBtnIndices(4, 5)).to.deep.equal({prev: 3, next: 0});
  });
});

describe('transformCoords function', function() {
  before(function() {
    this.originZero = {x: 0, y: 0};
    this.origin1 = {x: 5, y: 10};
  });

  after(function() {
    delete this.originZero;
    delete this.origin1;
  });

  it('should return an object with "x" and "y" keys', function() {
    var coords = h.transformCoords(this.originZero, this.originZero);
    expect(coords).to.have.ownProperty('x');
    expect(coords).to.have.ownProperty('y');
    expect(Object.keys(coords).length).to.equal(2);
  });

  it('should return 0,0 position if given 0,0 position and origin', function() {
    var coords = h.transformCoords(this.originZero, this.originZero);
    expect(coords.x).to.equal(0);
    expect(coords.y).to.equal(0);
  });

  it('should return transformed coords if in quadrant 1', function() {
    var coords = h.transformCoords(this.origin1, {x: 8, y: 8});
    expect(coords).to.deep.equal({x: 3, y: 2});
  });

  it('should return transformed coords if in quadrant 2', function() {
    var coords = h.transformCoords(this.origin1, {x: 1, y: 2});
    expect(coords).to.deep.equal({x: -4, y: 8});
  });

  it('should return transformed coords if in quadrant 3', function() {
    var coords = h.transformCoords(this.origin1, {x: 2, y: 14});
    expect(coords).to.deep.equal({x: -3, y: -4});
  });

  it('should return transformed coords if in quadrant 4', function() {
    var coords = h.transformCoords(this.origin1, {x: 9, y: 25});
    expect(coords).to.deep.equal({x: 4, y: -15});
  });
});

describe('calcAngle function', function() {
  it('should return 0 if point on the positive X-axis', function() {
    expect(h.calcAngle({x: 2, y: 0})).to.equal(0);
  });

  it('should return 1/2*PI if point on the +Y-axis', function() {
    expect(h.calcAngle({x: 0, y: 1})).to.equal(1 / 2 * Math.PI);
  });

  it('should return 3/2*PI if point on the -Y-axis', function() {
    expect(h.calcAngle({x: 0, y: -1})).to.equal(3 / 2 * Math.PI);
  });

  it('should return the angle with +X-axis of point in Q1', function() {
    expect(h.calcAngle({x: 2, y: 2})).to.equal(Math.PI / 4);
  });

  it('should return the angle with +X-axis of point in Q2', function() {
    expect(h.calcAngle({x: -3, y: 3})).to.equal(3 / 4 * Math.PI);
  });

  it('should return the angle with +X-axis of point in Q3', function() {
    expect(h.calcAngle({x: -1, y: -1})).to.equal(5 / 4 * Math.PI);
  });

  it('should return the angle with +X-axis of point in Q4', function() {
    expect(h.calcAngle({x: 5, y: -5})).to.equal(7 / 4 * Math.PI);
  });
});

describe('transformAngle function', function() {
  it('should return 1/2*PI for 0', function() {
    expect(h.transformAngle(0)).to.equal(1 / 2 * Math.PI);
  });

  it('should return 1/4*PI for 1/4*PI', function() {
    expect(h.transformAngle(1 / 4 * Math.PI)).to.equal(1 / 4 * Math.PI);
  });

  it('should return 0 for 1/2*PI', function() {
    expect(h.transformAngle(1 / 2 * Math.PI)).to.equal(0);
  });

  it('should return 7/4*PI for 3/4*PI', function() {
    expect(h.transformAngle(3 / 4 * Math.PI)).to.equal(7 / 4 * Math.PI);
  });

  it('should return 3/2*PI for PI', function() {
    expect(h.transformAngle(Math.PI)).to.equal(3 / 2 * Math.PI);
  });

  it('should return 5/4*PI for 5/4*PI', function() {
    expect(h.transformAngle(5 / 4 * Math.PI)).to.equal(5 / 4 * Math.PI);
  });

  it('should return PI for 3/2*PI', function() {
    expect(h.transformAngle(3 / 2 * Math.PI)).to.equal(Math.PI);
  });

  it('should return 3/4*PI for 7/4*PI', function() {
    expect(h.transformAngle(7 / 4 * Math.PI)).to.equal(3 / 4 * Math.PI);
  });

  it('should return 4/3*PI for 7/6*PI', function() {
    expect(h.transformAngle(7 / 6 * Math.PI)).to.equal(4 / 3 * Math.PI);
  });

  it('should return 4/6*PI for 11/6*PI', function() {
    expect(
      h.transformAngle(11 / 6 * Math.PI)).to.be.closeTo(4 / 6 * Math.PI, 1e-10);
  });
});

describe('rad2deg function', function() {
  it('should return 0 for 0', function() {
    expect(h.rad2deg(0)).to.equal(0);
  });

  it('should return 45 for PI/4', function() {
    expect(h.rad2deg(Math.PI / 4)).to.equal(45);
  });

  it('should return 330 for 11/6PI', function() {
    expect(h.rad2deg(11 / 6 * Math.PI)).to.be.closeTo(330, 1e-10);
  });
});

describe('val2deg function', function() {
  it('should return 0 for 0 val', function() {
    expect(h.val2deg(0, 120)).to.equal(0);
  });

  it('should return a proportional angle to the val/maxVal', function() {
    expect(h.val2deg(23, 230)).to.equal(36);
  });
});

describe('deg2val function', function() {
  it('should return 0 for 0deg', function() {
    expect(h.deg2val(0, 23)).to.equal(0);
  });

  it('should return a proportional value to the angle', function() {
    expect(h.deg2val(36, 230)).to.equal(23);
  });
});
