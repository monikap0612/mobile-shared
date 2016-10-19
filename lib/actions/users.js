'use strict';

exports.__esModule = true;
exports.usersFetch = usersFetch;
exports.usersSuccess = usersSuccess;

var _users = require('../constants/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function usersFetch() {
  return {
    type: _users2['default'].USERS_FETCH
  };
}

function usersSuccess(_ref) {
  var users = _ref.users;

  return {
    type: _users2['default'].USERS_SUCCESS,
    users: users
  };
}

exports['default'] = {
  usersFetch: usersFetch,
  usersSuccess: usersSuccess
};