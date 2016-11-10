'use strict';

exports.__esModule = true;
exports.greyDk = exports.grey = exports.greyLt = exports.blue500 = exports.blue300 = exports.blue200 = exports.blue100 = exports.blueDk = exports.blue = exports.blueLt = exports.green = exports.red = exports.slate = exports.black = exports.white = exports.transparent = exports.opacityBlack = exports.opacityWhite = undefined;

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
    },
    bc: {
      borderColor: color,
      borderWidth: 1
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
var slate = exports.slate = buildColor('#4A4A4A');

var red = exports.red = buildColor('#C93C46');

var green = exports.green = buildColor('#3CC86B');

var blueLt = exports.blueLt = buildColor('#5AAAFB');
var blue = exports.blue = buildColor('#1A8CFF');
var blueDk = exports.blueDk = buildColor('#3F5872');

var blue100 = exports.blue100 = buildColor('#BEE5FD');
var blue200 = exports.blue200 = buildColor('#83CEFB');
var blue300 = exports.blue300 = buildColor('#5EB9F5');
var blue500 = exports.blue500 = buildColor('#35A6F2');

var greyLt = exports.greyLt = buildColor('#F7F7F7');
var grey = exports.grey = buildColor('#F0F0F0');
var greyDk = exports.greyDk = buildColor('#9B9B9B');