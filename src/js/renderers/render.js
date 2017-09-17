
var btnSettingsTempl = require('../templates/button-settings.hbs');
var btnPlayTempl = require('../templates/button-play.hbs');
var btnMuteTempl = require('../templates/button-mute.hbs');
var timerTempl = require('../templates/timer.hbs');

function renderItem(parent, template, data) {
  parent.innerHTML = template(data);
}

function settingsBtn(parent) {
  renderItem(parent, btnSettingsTempl, {});
}

function playBtn(parent, data) {
  renderItem(parent, btnPlayTempl, data);
}

function muteBtn(parent, data) {
  renderItem(parent, btnMuteTempl, data);
}

function timer(parent, data) {
  renderItem(parent, timerTempl, data);
}

module.exports = {
  settingsBtn: settingsBtn,
  playBtn: playBtn,
  muteBtn: muteBtn,
  timer: timer
};
