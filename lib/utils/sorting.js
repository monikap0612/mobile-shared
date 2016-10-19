'use strict';

exports.__esModule = true;
exports.roomsSorting = roomsSorting;
exports.floorsSorting = floorsSorting;

var _object = require('lodash/object');

function roomsSorting(name, sortValue) {
  if (sortValue && parseFloat(sortValue) && parseFloat(sortValue) > 0) {
    return parseFloat(sortValue) || 0;
  }
  try {
    if (!name || !name.length) {
      return Infinity;
    }
    var value = name.trim().replace(/\D/g, ' ').trim().split(' ');
    if (!value || !value.length || !value[0].length) {
      return Infinity;
    }
    var numeric = parseInt(value[0]);
    if (!isFinite(parseInt((0, _object.get)(name, 'first')))) {
      numeric += 10001;
    }
    if (name.length !== value[0].length) {
      numeric += 10001;
    }
    return numeric;
  } catch (e) {
    return Infinity;
  }
}

function floorsSorting(number, sortValue) {
  if (sortValue && parseFloat(sortValue) && parseFloat(sortValue) > 0) {
    return parseFloat(sortValue) || 0;
  }
  try {
    if (!number || !number.length) {
      return Infinity;
    }
    var value = number.trim().replace(/\D/g, ' ').trim().split(' ');
    if (!value || !value.length || !value[0].length) {
      return Infinity;
    }
    var numeric = parseInt(value[0]);
    if (!isFinite(parseInt((0, _object.get)(value, 'first')))) {
      numeric += 10001;
    }
    return numeric;
  } catch (e) {
    return Infinity;
  }
}