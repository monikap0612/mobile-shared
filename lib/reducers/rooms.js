'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _rooms = require('../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  activeRoom: null,
  hotelRooms: [],
  hotelFloors: [],
  hotelRoomStatuses: [],
  hotelRoomHousekeepings: [],
  hotelCalendar: [],
  hotelPlannings: [],
  hotelRoomNotes: [],
  hotelCatalogs: [],
  hotelTasks: []
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_rooms2['default'].RESET_ROOMS] = function () {
  return INITIAL_STATE;
}, _ACTION_HANDLERS[_rooms2['default'].ROOM_ACTIVATE] = function (state, _ref) {
  var roomId = _ref.roomId;

  return state.set('activeRoom', roomId);
}, _ACTION_HANDLERS[_rooms2['default'].ROOM_DEACTIVATE] = function (state) {
  return state.set('activeRoom', null);
}, _ACTION_HANDLERS[_rooms2['default'].ROOMS_SUCCESS] = function (state, _ref2) {
  var rooms = _ref2.rooms;

  return state.set('hotelRooms', rooms);
}, _ACTION_HANDLERS[_rooms2['default'].FLOORS_SUCCESS] = function (state, _ref3) {
  var floors = _ref3.floors;

  return state.set('hotelFloors', floors);
}, _ACTION_HANDLERS[_rooms2['default'].ROOM_STATUSES_SUCCESS] = function (state, _ref4) {
  var roomStatuses = _ref4.roomStatuses;

  return state.set('hotelRoomStatuses', roomStatuses);
}, _ACTION_HANDLERS[_rooms2['default'].ROOM_HOUSEKEEPINGS_SUCCESS] = function (state, _ref5) {
  var roomHousekeepings = _ref5.roomHousekeepings;

  return state.set('hotelRoomHousekeepings', roomHousekeepings);
}, _ACTION_HANDLERS[_rooms2['default'].CALENDAR_SUCCESS] = function (state, _ref6) {
  var results = _ref6.results;

  return state.set('hotelCalendar', results);
}, _ACTION_HANDLERS[_rooms2['default'].PLANNINGS_SUCCESS] = function (state, _ref7) {
  var plannings = _ref7.plannings;

  return state.set('hotelPlannings', plannings);
}, _ACTION_HANDLERS[_rooms2['default'].ROOM_NOTES_SUCCESS] = function (state, _ref8) {
  var results = _ref8.results;

  return state.set('hotelRoomNotes', results);
}, _ACTION_HANDLERS[_rooms2['default'].CATALOGS_SUCCESS] = function (state, _ref9) {
  var catalogs = _ref9.catalogs;

  return state.set('hotelCatalogs', catalogs);
}, _ACTION_HANDLERS[_rooms2['default'].TASKS_SUCCESS] = function (state, _ref10) {
  var tasks = _ref10.tasks;

  return state.set('hotelTasks', tasks);
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);