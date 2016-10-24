'use strict';

exports.__esModule = true;
exports['default'] = checkEqual;

var _object = require('lodash/object');

var _lang = require('lodash/lang');

var _collection = require('lodash/collection');

function checkEqual(c, n, path) {
  return (0, _lang.isEqual)((0, _object.get)(c, path), (0, _object.get)(n, path));
}