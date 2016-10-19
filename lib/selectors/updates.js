'use strict';

exports.__esModule = true;
exports.computedActiveRoomUpdate = undefined;

var _reselect = require('reselect');

var _object = require('lodash/object');

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