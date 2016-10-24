'use strict';

exports.__esModule = true;
exports.computedActiveRoomUpdate = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reselect = require('reselect');

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');

var _fp = require('lodash/fp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var roomsSelector = function roomsSelector(state) {
  return state.updates.rooms;
};
var activeRoomSelector = function activeRoomSelector(state) {
  return state.rooms.activeRoom;
};

var getActiveRoomUpdate = function getActiveRoomUpdate(roomsUpdates, roomId) {
  return roomsUpdates && (0, _object.get)(roomsUpdates, roomId, null);
};

var computedActiveRoomUpdate = exports.computedActiveRoomUpdate = (0, _reselect.createSelector)([roomsSelector, activeRoomSelector], getActiveRoomUpdate);