'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _glitches = require('../constants/glitches');

var _glitches2 = _interopRequireDefault(_glitches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  activeGlitch: null,
  hotelGlitches: []
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_glitches2['default'].GLITCHES_RESET] = function (state) {
  return INITIAL_STATE;
}, _ACTION_HANDLERS[_glitches2['default'].GLITCHES_SUCCESS] = function (state, _ref) {
  var glitches = _ref.glitches;

  return state.set('hotelGlitches', glitches);
}, _ACTION_HANDLERS[_glitches2['default'].GLITCH_ACTIVATE] = function (state, _ref2) {
  var glitchId = _ref2.glitchId;

  return state.set('activeGlitch', glitchId);
}, _ACTION_HANDLERS[_glitches2['default'].GLITCH_DEACTIVATE] = function (state) {
  return state.set('activeGlitch', null);
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);