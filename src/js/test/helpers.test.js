
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

