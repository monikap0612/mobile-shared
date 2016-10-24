'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _overlay = require('../constants/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  isVisible: false,
  icon: 'Wave',
  message: '',
  color: '#FFFFFF'
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_overlay2['default'].SHOW_OVERLAY] = function (state, _ref) {
  var icon = _ref.icon;
  var message = _ref.message;
  var color = _ref.color;

  return state.set('isVisible', true).set('icon', icon).set('message', message).set('color', color);
}, _ACTION_HANDLERS[_overlay2['default'].HIDE_OVERLAY] = function (state) {
  return INITIAL_STATE;
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);