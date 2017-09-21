
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

module.exports = {
  calcMS: calcMS,
  convertToMinSec: convertToMinSec,
  getBtnIndices: getBtnIndices
};
