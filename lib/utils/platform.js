'use strict';

exports.__esModule = true;
exports.isiOS = isiOS;
exports.isAndroid = isAndroid;

var _reactNative = require('react-native');

function isiOS() {
  return _reactNative.Platform.OS === 'ios';
}

function isAndroid() {
  return _reactNative.Platform.OS === 'android';
}