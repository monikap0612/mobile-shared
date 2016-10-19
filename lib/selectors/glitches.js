'use strict';

exports.__esModule = true;
exports.computedActiveGlitch = undefined;

var _reselect = require('reselect');

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

  return find(hotelGlitches, { uuid: activeGlitch });
};

var computedActiveGlitch = exports.computedActiveGlitch = (0, _reselect.createSelector)([glitchesSelector, activeGlitchSelector], getActiveGlitch);