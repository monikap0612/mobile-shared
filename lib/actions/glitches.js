'use strict';

exports.__esModule = true;
exports.glitchesReset = glitchesReset;
exports.glitchesFetch = glitchesFetch;
exports.glitchesSuccess = glitchesSuccess;
exports.glitchActivate = glitchActivate;
exports.glitchDeactivate = glitchDeactivate;
exports.glitchSubmit = glitchSubmit;
exports.glitchUpdate = glitchUpdate;
exports.glitchHandover = glitchHandover;
exports.glitchEmail = glitchEmail;
exports.glitchClose = glitchClose;

var _glitches = require('../constants/glitches');

var _glitches2 = _interopRequireDefault(_glitches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function glitchesReset() {
  return {
    type: _glitches2['default'].GLITCHES_RESET
  };
}

function glitchesFetch() {
  return {
    type: _glitches2['default'].GLITCHES_FETCH
  };
}

function glitchesSuccess(_ref) {
  var glitches = _ref.glitches;

  return {
    type: _glitches2['default'].GLITCHES_SUCCESS,
    glitches: glitches
  };
}

function glitchActivate(glitchId) {
  return {
    type: _glitches2['default'].GLITCH_ACTIVATE,
    glitchId: glitchId
  };
}

function glitchDeactivate() {
  return {
    type: _glitches2['default'].GLITCH_DEACTIVATE
  };
}

function glitchSubmit(newGlitch) {
  return {
    type: _glitches2['default'].GLITCH_NEW,
    newGlitch: newGlitch
  };
}

function glitchUpdate(updatedGlitch) {
  return {
    type: _glitches2['default'].GLITCH_UPDATE,
    updatedGlitch: updatedGlitch
  };
}

function glitchHandover(handoverGlitch) {
  return {
    type: _glitches2['default'].GLITCH_HANDOVER,
    handoverGlitch: handoverGlitch
  };
}

function glitchEmail(emailGlitch) {
  return {
    type: _glitches2['default'].GLITCH_EMAIL,
    emailGlitch: emailGlitch
  };
}

function glitchClose(closedGlitch) {
  return {
    type: _glitches2['default'].GLITCH_CLOSE,
    closedGlitch: closedGlitch
  };
}

exports['default'] = {
  glitchesReset: glitchesReset,
  glitchesFetch: glitchesFetch,
  glitchesSuccess: glitchesSuccess,
  glitchActivate: glitchActivate,
  glitchDeactivate: glitchDeactivate,
  glitchSubmit: glitchSubmit,
  glitchUpdate: glitchUpdate,
  glitchHandover: glitchHandover,
  glitchEmail: glitchEmail,
  glitchClose: glitchClose
};