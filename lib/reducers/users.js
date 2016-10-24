'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _users = require('../constants/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  users: [],
  hotelGroups: []
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_users2['default'].USERS_SUCCESS] = function (state, _ref) {
  var users = _ref.users;

  return state.set('users', users);
}, _ACTION_HANDLERS[_users2['default'].GROUPS_SUCCESS] = function (state, _ref2) {
  var groups = _ref2.groups;

  return state.set('hotelGroups', groups);
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);