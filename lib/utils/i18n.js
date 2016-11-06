'use strict';

exports.__esModule = true;
exports.setup = exports.t = undefined;

var _string = require('lodash/string');

var _reactNativeI18n = require('react-native-i18n');

var _reactNativeI18n2 = _interopRequireDefault(_reactNativeI18n);

var _translations = require('../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var t = exports.t = function t(key) {
  return _reactNativeI18n2['default'].t((0, _string.lowerCase)(key));
};

var setup = exports.setup = function setup() {
  _reactNativeI18n2['default'].fallbacks = true;
  _reactNativeI18n2['default'].translations = _translations2['default'];
};