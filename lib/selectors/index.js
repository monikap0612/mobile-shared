'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assets = require('./assets');

var assets = _interopRequireWildcard(_assets);

var _glitches = require('./glitches');

var glitches = _interopRequireWildcard(_glitches);

var _rooms = require('./rooms');

var rooms = _interopRequireWildcard(_rooms);

var _updates = require('./updates');

var updates = _interopRequireWildcard(_updates);

var _users = require('./users');

var users = _interopRequireWildcard(_users);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var selectors = _extends({}, assets, glitches, rooms, updates, users);

exports['default'] = selectors;