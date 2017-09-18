
window.jQuery = $ = require('jquery');
var bootstrap = require('bootstrap-sass');
var data = require('./data/data.js');
var render = require('./renderers/render.js');

var content = document.querySelector('.content');
var header = document.querySelector('#header');
var footer = document.querySelector('#footer');
var knob = document.querySelector('.knob');

renderWelcomeFace();

footer.addEventListener('click', function(event) {
  if (event.target.nodeName.toLowerCase() == 'button') {
    var btn = event.target;
    var play = data.data.status.play = !data.data.status.play;
    btn.setAttribute('data-play', String(play));
    btn.className = play ? 'fa fa-stop' : 'fa fa-play';
    if (play) {
      startTimer();
    } else {
      stopTimer();
    }
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
  console.log('timer started');
}

function stopTimer() {
  knob.style.animationName = '';
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
