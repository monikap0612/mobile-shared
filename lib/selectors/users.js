'use strict';

exports.__esModule = true;
exports.computedIndexedUsers = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reselect = require('reselect');

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');

var _fp = require('lodash/fp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var usersSelector = function usersSelector(state) {
  return state.users.users;
};

var getIndexedUsers = function getIndexedUsers(hotelUsers) {
  if (!hotelUsers || !hotelUsers.length) {
    return {};
  }

  return (0, _collection.keyBy)(hotelUsers, '_id');
};

var computedIndexedUsers = exports.computedIndexedUsers = (0, _reselect.createSelector)([usersSelector], getIndexedUsers);