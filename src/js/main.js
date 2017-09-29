
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
    var btn = event.target;
    var play = data.data.status.play = !data.data.status.play;
    btn.setAttribute('data-play', String(play));
    btn.className = play ? 'fa fa-stop' : 'fa fa-play';
    if (play) {
      startTimer();
      ticker(
        helpers.calcMS(data.data.timer.minutes, data.data.timer.seconds),
        1000,
        'timer'
      );
    } else {
      stopTimer();
    }
    playSound();
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
  knob.style.animationName = 'knob-spin';
  btnDrag.classList.remove('active');
  btnDrag.removeEventListener('mousedown', adjustKnob);
  btnDrag.removeEventListener('touchstart', touchAdjust);
  console.log('timer started');
}

function stopTimer() {
  knob.style.animationName = '';
  knob.style.transform = '';
  renderWelcomeFace();
  console.log('timer stopped');
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
}

function ticker(ms, timeout, type) {
  if (!data.data.status.play) {
    renderWelcomeFace();
  } else if (ms > 0) {
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
      ticker(ms - timeout, timeout, type);
    }, timeout);
  } else {
    type = (type == 'timer') ? 'break' : 'timer';
    playSound();
    ticker(
      helpers.calcMS(data.data[type].minutes, data.data[type].seconds),
      timeout,
      type
    );
  }
}

header.addEventListener('click', function(event) {
  if (event.target.nodeName.toLowerCase() == 'button') {
    var targetID = event.target.getAttribute('id');
    if (targetID == 'settings') {
      renderSettings(0, true);
      btnDrag.addEventListener('mousedown', adjustKnob);
      btnDrag.addEventListener('touchstart', touchAdjust);
    } else if (targetID == 'mute') {
      data.data.sound.mute = !data.data.sound.mute;
      render.muteBtn(header, {mute: data.data.sound.mute});
      toggleVolume();
    }
  }
});

function renderSettings(index, smooth) {
  render.title(header, {title: 'Settings'});
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
  content.setAttribute('data-settings', index);
  content.querySelector('ul li').className = '';
  content.querySelector(
    'ul li:nth-child(' + (index + 1) + ')')
    .className = 'active';
  var angle = helpers.val2deg(data.data[key].minutes, 59);
  if (smooth) {
    rotateKnob(angle);
  } else {
    knob.style.transform = 'rotate(' + angle + 'deg)';
  }
  btnDrag.classList.add('active');
  hint.style.animationName = 'fade-in-out';
}

function rotateKnob(angle) {
  knob.style.transitionProperty = 'transform';
  knob.style.transitionDuration = '200ms';
  knob.style.transform = 'rotate(' + angle + 'deg)';
  setTimeout(function() {
    knob.style.transitionProperty = '';
    knob.style.transitionDuration = '';
  }, 200);
}

content.addEventListener('click', function(event) {
  if (event.target.nodeName.toLowerCase() == 'button' ||
      event.target.nodeName.toLowerCase() == 'li') {
    var index = parseInt(event.target.getAttribute('data-target'), 10);
    renderSettings(index, true);
  }
});

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
    renderSettings(index, false);
  }
}

function touchMove(event) {
  move(event.touches[0]);
}

function playSound() {
  if (!data.data.sound.mute) {
    sound.currentTime = 0;
    sound.play();
  }
}

function toggleVolume() {
  sound.volume = (data.data.sound.mute) ? 0 : 1;
}
