'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _glitches = require('./glitches');

var _glitches2 = _interopRequireDefault(_glitches);

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _updates = require('./updates');

var _updates2 = _interopRequireDefault(_updates);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var actions = _extends({}, _assets2['default'], _auth2['default'], _glitches2['default'], _overlay2['default'], _rooms2['default'], _routes2['default'], _updates2['default'], _users2['default']);

exports['default'] = actions;