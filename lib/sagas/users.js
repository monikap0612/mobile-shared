'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;

  var USERS_API = apiUrl + '/users';
  var GROUPS_API = apiUrl + '/groups';

  // Hotel Users
  function* fetchUsers() {
    var _ref2 = yield (0, _effects.select)();

    var _ref2$auth = _ref2.auth;
    var hotelId = _ref2$auth.hotelId;
    var token = _ref2$auth.token;


    return yield (0, _effects.call)(_request2['default'], USERS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchUsersFlow() {
    try {
      var data = yield (0, _effects.call)(fetchUsers);
      yield (0, _effects.put)(_users4['default'].usersSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchUsersFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_users2['default'].USERS_FETCH, fetchUsersFlow);
  }

  // Hotel Groups
  function* fetchGroups() {
    var _ref3 = yield (0, _effects.select)();

    var _ref3$auth = _ref3.auth;
    var hotelId = _ref3$auth.hotelId;
    var token = _ref3$auth.token;


    return yield (0, _effects.call)(_request2['default'], GROUPS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchGroupsFlow() {
    try {
      var data = yield (0, _effects.call)(fetchGroups);
      yield (0, _effects.put)(_users4['default'].groupsSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchGroupsFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_users2['default'].GROUPS_FETCH, fetchGroupsFlow);
  }

  return {
    watchGroupsFlow: watchGroupsFlow,
    watchUsersFlow: watchUsersFlow
  };
};

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _users = require('../constants/users');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('../actions/users');

var _users4 = _interopRequireDefault(_users3);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }