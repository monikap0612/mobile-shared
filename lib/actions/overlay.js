'use strict';

exports.__esModule = true;
exports.overlayShow = overlayShow;
exports.overlayHide = overlayHide;

var _overlay = require('../constants/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function overlayShow(_ref) {
  var icon = _ref.icon;
  var message = _ref.message;
  var color = _ref.color;

  return {
    type: _overlay2['default'].SHOW_OVERLAY,
    icon: icon,
    message: message,
    color: color
  };
}

function overlayHide() {
  return {
    type: _overlay2['default'].HIDE_OVERLAY
  };
}

exports['default'] = {
  overlayShow: overlayShow,
  overlayHide: overlayHide
};