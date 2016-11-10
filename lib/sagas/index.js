'use strict';

exports.__esModule = true;

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _glitches = require('./glitches');

var _glitches2 = _interopRequireDefault(_glitches);

var _updates = require('./updates');

var _updates2 = _interopRequireDefault(_updates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var sagas = {
  assets: _assets2['default'],
  auth: _auth2['default'],
  glitches: _glitches2['default'],
  rooms: _rooms2['default'],
  routes: _routes2['default'],
  updates: _updates2['default'],
  users: _users2['default']
};

exports['default'] = sagas;