'use strict';

exports.__esModule = true;
exports.positioning = exports.margin = exports.padding = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = require('lodash/util');

var _string = require('lodash/string');

var _collection = require('lodash/collection');

var _layoutStep = 5;

var steps = (0, _util.range)(1, 11).map(function (i) {
  return i * _layoutStep;
});
var directions = [{
  l: 'x'
}, {
  l: 'y'
}, {
  l: 'a'
}, {
  l: 'l',
  v: 'left'
}, {
  v: 'right',
  l: 'r'
}, {
  v: 'top',
  l: 't'
}, {
  v: 'bottom',
  l: 'b'
}];

var calcPositioning = function calcPositioning(property, dir, step) {
  var _ref4;

  if (dir.l === 'x') {
    var _ref;

    return _ref = {}, _ref[(0, _string.camelCase)(property + 'Left')] = step, _ref[(0, _string.camelCase)(property + 'Right')] = step, _ref;
  }
  if (dir.l === 'y') {
    var _ref2;

    return _ref2 = {}, _ref2[(0, _string.camelCase)(property + 'Top')] = step, _ref2[(0, _string.camelCase)(property + 'Bottom')] = step, _ref2;
  }
  if (dir.l === 'a') {
    var _ref3;

    return _ref3 = {}, _ref3[property] = step, _ref3;
  }
  return _ref4 = {}, _ref4[(0, _string.camelCase)(property + ' ' + dir.v)] = step, _ref4;
};

var calcPositioningGlobal = function calcPositioningGlobal(dir, step) {
  var _ref5;

  if (dir.l === 'x') {
    return {
      left: step,
      right: step
    };
  }
  if (dir.l === 'y') {
    return {
      top: step,
      bottom: step
    };
  }
  if (dir.l === 'a') {
    return {
      top: step,
      bottom: step,
      left: step,
      right: step
    };
  }
  return _ref5 = {}, _ref5[dir.v] = step, _ref5;
};

var buildPositioning = function buildPositioning(property) {
  return (0, _collection.flatMap)(directions, function (dir) {
    return steps.map(function (step) {
      var _ref6;

      return _ref6 = {}, _ref6[(0, _string.camelCase)('' + dir.l + step)] = property ? calcPositioning(property, dir, step) : calcPositioningGlobal(dir, step), _ref6;
    });
  }).reduce(function (acc, n) {
    return _extends({}, acc, n);
  }, {});
};

var padding = buildPositioning('padding');
var margin = buildPositioning('margin');
var positioning = buildPositioning();

exports.padding = padding;
exports.margin = margin;
exports.positioning = positioning;