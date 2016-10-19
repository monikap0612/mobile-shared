'use strict';

exports.__esModule = true;
exports.resetRooms = resetRooms;
exports.activateRoom = activateRoom;
exports.deactivateRoom = deactivateRoom;
exports.roomsFetch = roomsFetch;
exports.roomsSuccess = roomsSuccess;
exports.floorsFetch = floorsFetch;
exports.floorsSuccess = floorsSuccess;
exports.roomStatusesFetch = roomStatusesFetch;
exports.roomStatusesSuccess = roomStatusesSuccess;
exports.roomHousekeepingsFetch = roomHousekeepingsFetch;
exports.roomHousekeepingsSuccess = roomHousekeepingsSuccess;
exports.planningsFetch = planningsFetch;
exports.planningsSuccess = planningsSuccess;
exports.planningsNightFetch = planningsNightFetch;
exports.planningsNightSuccess = planningsNightSuccess;
exports.calendarFetch = calendarFetch;
exports.calendarSuccess = calendarSuccess;
exports.roomNotesFetch = roomNotesFetch;
exports.roomNotesSuccess = roomNotesSuccess;
exports.catalogsFetch = catalogsFetch;
exports.catalogsSuccess = catalogsSuccess;
exports.tasksFetch = tasksFetch;
exports.tasksSuccess = tasksSuccess;

var _rooms = require('../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function resetRooms() {
  return {
    type: _rooms2['default'].RESET_ROOMS
  };
}

function activateRoom(roomId) {
  return {
    type: _rooms2['default'].ROOM_ACTIVATE,
    roomId: roomId
  };
}

function deactivateRoom(roomId) {
  return {
    type: _rooms2['default'].ROOM_DEACTIVATE,
    roomId: roomId
  };
}

function roomsFetch() {
  return {
    type: _rooms2['default'].ROOMS_FETCH
  };
}

function roomsSuccess(_ref) {
  var rooms = _ref.rooms;


  return {
    type: _rooms2['default'].ROOMS_SUCCESS,
    rooms: rooms
  };
}

function floorsFetch() {
  return {
    type: _rooms2['default'].FLOORS_FETCH
  };
}

function floorsSuccess(_ref2) {
  var floors = _ref2.floors;


  return {
    type: _rooms2['default'].FLOORS_SUCCESS,
    floors: floors
  };
}

function roomStatusesFetch() {
  return {
    type: _rooms2['default'].ROOM_STATUSES_FETCH
  };
}

function roomStatusesSuccess(_ref3) {
  var roomStatuses = _ref3.roomStatuses;


  return {
    type: _rooms2['default'].ROOM_STATUSES_SUCCESS,
    roomStatuses: roomStatuses
  };
}

function roomHousekeepingsFetch() {
  return {
    type: _rooms2['default'].ROOM_HOUSEKEEPINGS_FETCH
  };
}

function roomHousekeepingsSuccess(_ref4) {
  var roomHousekeepings = _ref4.roomHousekeepings;


  return {
    type: _rooms2['default'].ROOM_HOUSEKEEPINGS_SUCCESS,
    roomHousekeepings: roomHousekeepings
  };
}

function planningsFetch() {
  return {
    type: _rooms2['default'].PLANNINGS_FETCH
  };
}

function planningsSuccess(_ref5) {
  var plannings = _ref5.plannings;


  return {
    type: _rooms2['default'].PLANNINGS_SUCCESS,
    plannings: plannings
  };
}

function planningsNightFetch() {
  return {
    type: _rooms2['default'].PLANNINGS_NIGHT_FETCH
  };
}

function planningsNightSuccess(_ref6) {
  var planningsNight = _ref6.planningsNight;


  return {
    type: _rooms2['default'].PLANNINGS_NIGHT_SUCCESS,
    planningsNight: planningsNight
  };
}

function calendarFetch() {
  return {
    type: _rooms2['default'].CALENDAR_FETCH
  };
}

function calendarSuccess(_ref7) {
  var results = _ref7.results;


  return {
    type: _rooms2['default'].CALENDAR_SUCCESS,
    results: results
  };
}

function roomNotesFetch() {
  return {
    type: _rooms2['default'].ROOM_NOTES_FETCH
  };
}

function roomNotesSuccess(_ref8) {
  var results = _ref8.results;


  return {
    type: _rooms2['default'].ROOM_NOTES_SUCCESS,
    results: results
  };
}

function catalogsFetch() {
  return {
    type: _rooms2['default'].CATALOGS_FETCH
  };
}

function catalogsSuccess(_ref9) {
  var catalogs = _ref9.catalogs;


  return {
    type: _rooms2['default'].CATALOGS_SUCCESS,
    catalogs: catalogs
  };
}

function tasksFetch() {
  return {
    type: _rooms2['default'].TASKS_FETCH
  };
}

function tasksSuccess(_ref10) {
  var tasks = _ref10.tasks;


  return {
    type: _rooms2['default'].TASKS_SUCCESS,
    tasks: tasks
  };
}

exports['default'] = {
  resetRooms: resetRooms,
  roomsFetch: roomsFetch,
  roomsSuccess: roomsSuccess,
  floorsFetch: floorsFetch,
  floorsSuccess: floorsSuccess,
  roomStatusesFetch: roomStatusesFetch,
  roomStatusesSuccess: roomStatusesSuccess,
  roomHousekeepingsFetch: roomHousekeepingsFetch,
  roomHousekeepingsSuccess: roomHousekeepingsSuccess,
  planningsFetch: planningsFetch,
  planningsSuccess: planningsSuccess,
  planningsNightFetch: planningsNightFetch,
  planningsNightSuccess: planningsNightSuccess,
  calendarFetch: calendarFetch,
  calendarSuccess: calendarSuccess,
  roomNotesFetch: roomNotesFetch,
  roomNotesSuccess: roomNotesSuccess,
  catalogsFetch: catalogsFetch,
  catalogsSuccess: catalogsSuccess,
  tasksFetch: tasksFetch,
  tasksSuccess: tasksSuccess,
  activateRoom: activateRoom,
  deactivateRoom: deactivateRoom
};