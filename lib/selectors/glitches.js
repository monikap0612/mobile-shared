'use strict';

exports.__esModule = true;
exports.computedActiveGlitch = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reselect = require('reselect');

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');

var _fp = require('lodash/fp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var glitchesSelector = function glitchesSelector(state) {
  return state.glitches.hotelGlitches;
};
var activeGlitchSelector = function activeGlitchSelector(state) {
  return state.glitches.activeGlitch;
};

var getActiveGlitch = function getActiveGlitch(hotelGlitches, activeGlitch) {
  if (!hotelGlitches || !hotelGlitches.length) {
    return null;
  }

  return (0, _collection.find)(hotelGlitches, { uuid: activeGlitch });
};

var computedActiveGlitch = exports.computedActiveGlitch = (0, _reselect.createSelector)([glitchesSelector, activeGlitchSelector], getActiveGlitch);