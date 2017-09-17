
window.jQuery = $ = require('jquery');
var bootstrap = require('bootstrap-sass');
var data = require('./data/data.js');
var render = require('./renderers/render.js');

var content = document.querySelector('.content');
var header = document.querySelector('#header');
var footer = document.querySelector('#footer');

render.settingsBtn(header);
render.timer(
  content,
  {
    minutes: ('0' + data.data.timer.minutes).slice(-2),
    seconds: ('0' + data.data.timer.seconds).slice(-2)
  }
);
render.playBtn(footer);

});
