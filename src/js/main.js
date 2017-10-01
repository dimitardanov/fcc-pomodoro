
var helpers = require('./lib/helpers/helpers.js');
var data = require('./data/data.js');
var render = require('./renderers/render.js');

var content = document.querySelector('.content');
var header = document.querySelector('#header');
var footer = document.querySelector('#footer');
var knob = document.querySelector('.knob');
var btnDrag = document.querySelector('#ticker');
var body = document.querySelector('body');
var sound = document.querySelector('audio');
var hint = document.querySelector('.hint');

renderWelcomeFace();

footer.addEventListener('click', function(event) {
  if (event.target.nodeName.toLowerCase() == 'button') {
    var play = data.data.status.play = !data.data.status.play;
    if (play) {
      hideHint();
      startTimer();
      deactivateDragBtn();
    } else {
      renderWelcomeFace();
    }
    playSound();
  }
});

header.addEventListener('click', function(event) {
  if (event.target.nodeName.toLowerCase() == 'button') {
    var targetID = event.target.getAttribute('id');
    if (targetID == 'settings') {
      renderSettings(0);
      rotateKnob(0, true);
      activateDragBtn();
      showHint();
    } else if (targetID == 'mute') {
      toggleSound();
    }
  }
});

content.addEventListener('click', function(event) {
  if (event.target.nodeName.toLowerCase() == 'button' ||
  event.target.nodeName.toLowerCase() == 'li') {
    var index = parseInt(event.target.getAttribute('data-target'), 10);
    renderSettings(index);
    rotateKnob(index, true);
  }
});

function startTimer() {
  render.muteBtn(header, {mute: data.data.sound.mute});
  render.timer(
    content,
    {
      minutes: ('0' + data.data.timer.minutes).slice(-2),
      seconds: ('0' + data.data.timer.seconds).slice(-2),
      message: data.data.timer.message
    }
  );
  render.playBtn(footer, data.data.status);
  knob.style.animationName = 'knob-spin';
  ticker(
    helpers.calcMS(data.data.timer.minutes, data.data.timer.seconds),
    250,
    'timer',
    Date.now()
  );
}

function renderWelcomeFace() {
  render.settingsBtn(header);
  render.timer(
    content,
    {
      minutes: ('0' + data.data.timer.minutes).slice(-2),
      seconds: ('0' + data.data.timer.seconds).slice(-2)
    }
  );
  render.playBtn(footer, data.data.status);
  knob.style.animationName = '';
  knob.style.transform = '';
}

function ticker(ms, timeout, type, start) {
  if (!data.data.status.play) {
    return;
  } else if (ms >= 0) {
    var remainder = helpers.convertToMinSec(ms);
    render.timer(
      content,
      {
        minutes: '-' + ('0' + remainder.minutes).slice(-2),
        seconds: ('0' + remainder.seconds).slice(-2),
        message: data.data[type].message
      }
    );
    setTimeout(function() {
      var now = Date.now();
      ticker(ms - (now - start), timeout, type, now);
    }, timeout);
  } else {
    type = (type == 'timer') ? 'break' : 'timer';
    knob.style.animationName = '';
    knob.style.animationName = 'knob-spin';
    playSound();
    ticker(
      helpers.calcMS(data.data[type].minutes, data.data[type].seconds),
      timeout,
      type,
      Date.now()
    );
  }
}

function renderSettings(index, smooth) {
  var key = data.order[index];
  var btnIndices = helpers.getBtnIndices(index, data.order.length);
  var renderData = {
    minutes: ('0' + data.data[key].minutes).slice(-2),
    seconds: ('0' + data.data[key].seconds).slice(-2),
    message: data.data[key].settings.message,
    order: data.order,
    prevBtnTarget: btnIndices.prev,
    nextBtnTarget: btnIndices.next,
    prevBtnTitle: data.order[btnIndices.prev],
    nextBtnTitle: data.order[btnIndices.next]
  };
  render.settings(content, renderData);
  render.title(header, {title: 'Settings'});
  content.setAttribute('data-settings', index);
  content.querySelector(
    'ul li:nth-child(' + (index + 1) + ')'
  ).classList.add('active');
}

function rotateKnob(index, smooth) {
  var key = data.order[index];
  var angle = helpers.val2deg(data.data[key].minutes, 59);
  _rotateKnobByAngle(knob, angle, smooth);
}

function playSound() {
  if (!data.data.sound.mute) {
    sound.currentTime = 0;
    sound.play();
  }
}

function toggleSound() {
  data.data.sound.mute = !data.data.sound.mute;
  render.muteBtn(header, {mute: data.data.sound.mute});
  sound.volume = (data.data.sound.mute) ? 0 : 1;
}

function showHint() {
  hint.style.animationName = 'fade-in-out';
}

function hideHint() {
  if (hint.style.animationName) {
    hint.style.display = 'none';
  }
}

function deactivateDragBtn() {
  btnDrag.removeEventListener('mousedown', adjustKnob);
  btnDrag.removeEventListener('touchstart', touchAdjust);
  btnDrag.classList.remove('active');
}

function activateDragBtn() {
  btnDrag.addEventListener('mousedown', adjustKnob);
  btnDrag.addEventListener('touchstart', touchAdjust);
  btnDrag.classList.add('active');
}

function adjustKnob(event) {
  body.addEventListener('mousemove', move);
  body.addEventListener('mouseup', function() {
    body.removeEventListener('mousemove', move);
  });
}

function touchAdjust(event) {
  body.addEventListener('touchmove', touchMove);
  body.addEventListener('touchend', function() {
    body.removeEventListener('touchmove', touchMove);
  });
}

function move(event) {
  var index = parseInt(content.getAttribute('data-settings'), 10);
  var key = data.order[index];
  var deg = helpers.getAngle(event);
  var mins = Math.floor(helpers.deg2val(deg, 59));
  if (mins != data.data[key].minutes) {
    data.data[key].minutes = mins;
    renderSettings(index);
    rotateKnob(index, false);
  }
}

function touchMove(event) {
  move(event.touches[0]);
}

function _rotateKnobByAngle(knob, angle, smooth) {
  if (smooth) {
    knob.style.transitionProperty = 'transform';
    knob.style.transitionDuration = '200ms';
    setTimeout(function() {
      knob.style.transitionProperty = '';
      knob.style.transitionDuration = '';
    }, 200);
  }
  knob.style.transform = 'rotate(' + angle + 'deg)';
}
