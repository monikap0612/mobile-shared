'use strict';

exports.__esModule = true;
exports.darkgray = exports.lightgray = exports.green = exports.red = exports.blue500 = exports.blue300 = exports.blue200 = exports.blue100 = exports.black = exports.white = exports.transparent = exports.opacityBlack = exports.opacityWhite = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* COLORS */


var _util = require('lodash/util');

var _collection = require('lodash/collection');

var _opacityStep = 10;
var steps = (0, _util.range)(1, 11).map(function (i) {
  return i / _opacityStep;
});

var buildColor = function buildColor(color) {
  return {
    color: color,
    text: {
      color: color
    },
    bg: {
      backgroundColor: color
    }
  };
};

var _opacity = function _opacity(color, opacity) {
  return 'rgba(' + color + ', ' + opacity + ')';
};
var buildOpacity = function buildOpacity(color) {
  return (0, _collection.flatMap)(steps, function (step) {
    var _ref;

    return _ref = {}, _ref['p' + step * 100] = buildColor(_opacity(color, step)), _ref;
  }).reduce(function (acc, n) {
    return _extends({}, acc, n);
  }, {});
};

var opacityWhite = exports.opacityWhite = buildOpacity('255, 255, 255');
var opacityBlack = exports.opacityBlack = buildOpacity('0, 0, 0');

var transparent = exports.transparent = buildColor('transparent');

var white = exports.white = buildColor('#FFF');
var black = exports.black = buildColor('#000');

var blue100 = exports.blue100 = buildColor('#BEE5FD');
var blue200 = exports.blue200 = buildColor('#83CEFB');
var blue300 = exports.blue300 = buildColor('#5EB9F5');
var blue500 = exports.blue500 = buildColor('#35A6F2');

var red = exports.red = buildColor('#D76D76');

var green = exports.green = buildColor('#24C776');

var lightgray = exports.lightgray = buildColor('#E6E6E6');
var darkgray = exports.darkgray = buildColor('#9A9A9A');