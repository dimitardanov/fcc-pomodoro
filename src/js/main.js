
window.jQuery = $ = require('jquery');
var bootstrap = require('bootstrap-sass');

var content = document.querySelector('.content');
var header = document.querySelector('#header');
var footer = document.querySelector('#footer');

(function showTimerFace() {
  [content, header, footer].forEach(function(el) {
    el.style.display = 'block';
  });
})();
});
