
function calcMS(min, sec) {
  return (min * 60 + sec) * 1000;
}

function convertToMinSec(millisec) {
  var seconds = Math.round(millisec / 1000);
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60
  };
}

function getOrigin() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
}

function getBtnIndices(dind, numItems) {
  return {
    prev: (dind == 0) ? numItems - 1 : dind - 1,
    next: (dind == numItems - 1) ? 0 : dind + 1
  };
}

function transformCoords(origin, pos) {
  return {
    x: pos.x - origin.x,
    y: -(pos.y - origin.y)
  };
}

function calcAngle(pos) {
  var angle = Math.atan2(pos.y, pos.x);
  angle = (angle >= 0) ? angle : 2 * Math.PI + angle;
  return angle;
}

function transformAngle(angle) {
  // returns the equivalent angle counted clockwise from the +Y-axis
  if (angle <= Math.PI / 2) {
    angle = Math.PI / 2 - angle;
  } else {
    angle = 5 / 2 * Math.PI - angle;
  }
  return angle;
}

function rad2deg(rad) {
  return 360 * rad / (2 * Math.PI);
}

function val2deg(val, maxVal) {
  return val / maxVal * 360;
}

function deg2val(deg, maxVal) {
  return deg / 360 * maxVal;
}

function getAngle(event) {
  var pos = {
    x: event.pageX,
    y: event.pageY
  };
  var coords = transformCoords(getOrigin(), pos);
  var angle = calcAngle(coords);
  var trAngle = transformAngle(angle);
  return rad2deg(trAngle);
}

module.exports = {
  getOrigin: getOrigin,
  transformCoords: transformCoords,
  calcAngle: calcAngle,
  transformAngle: transformAngle,
  rad2deg: rad2deg,
  val2deg: val2deg,
  deg2val: deg2val,
  getAngle: getAngle,
  calcMS: calcMS,
  convertToMinSec: convertToMinSec,
  getBtnIndices: getBtnIndices
};
