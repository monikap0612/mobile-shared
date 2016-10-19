'use strict';

exports.__esModule = true;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isImmutable = _ramda2['default'].has('asMutable');
var convertToJs = function convertToJs(state) {
  return state.asMutable({ deep: true });
};
var fromImmutable = _ramda2['default'].when(isImmutable, convertToJs);
var toImmutable = function toImmutable(raw) {
  return (0, _seamlessImmutable2['default'])(raw);
};

exports['default'] = {
  out: function out(state) {
    state.mergeDeep = _ramda2['default'].identity;
    return toImmutable(state);
  },
  'in': function _in(raw) {
    return fromImmutable(raw);
  }
};