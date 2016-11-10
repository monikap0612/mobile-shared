'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _filters = require('../constants/filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  roomsSearchQuery: null,
  activeFloor: null,
  activeSection: null,
  activeRooms: [],
  isActiveFilter: false
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_filters2['default'].RESET_ROOM_FILTERS] = function (state) {
  return INITIAL_STATE;
}, _ACTION_HANDLERS[_filters2['default'].UPDATE_SEARCH_ROOMS] = function (state, _ref) {
  var searchQuery = _ref.searchQuery;

  if (!searchQuery) {
    var isStillActive = state.activeFloor || state.activeSection || state.activeRooms.length;
    return state.set('roomsSearchQuery', null).set('isActiveFilter', isStillActive);
  }

  return state.set('roomsSearchQuery', searchQuery).set('isActiveFilter', true);
}, _ACTION_HANDLERS[_filters2['default'].UPDATE_ACTIVE_FLOOR] = function (state, _ref2) {
  var activeFloor = _ref2.activeFloor;

  if (!activeFloor) {
    var isStillActive = state.roomsSearchQuery || state.activeSection || state.activeRooms.length;
    return state.set('activeFloor', activeFloor).set('isActiveFilter', isStillActive);
  }

  return state.set('activeFloor', activeFloor).set('isActiveFilter', true);
}, _ACTION_HANDLERS[_filters2['default'].UPDATE_ACTIVE_SECTION] = function (state, _ref3) {
  var activeSection = _ref3.activeSection;

  if (!activeSection) {
    var isStillActive = state.roomsSearchQuery || state.activeFloor || state.activeRooms.length;
    return state.set('activeSection', activeSection).set('isActiveFilter', isStillActive);
  }

  return state.set('activeSection', activeSection).set('isActiveFilter', true);
}, _ACTION_HANDLERS[_filters2['default'].SET_ACTIVE_ROOMS] = function (state, _ref4) {
  var activeRooms = _ref4.activeRooms;

  if (!activeRooms || !activeRooms.length) {
    var isStillActive = state.roomsSearchQuery || state.activeFloor || state.activeSection;
    return state.set('activeRooms', []).set('isActiveFilter', isStillActive);
  }

  return state.set('activeRooms', activeRooms).set('isActiveFilter', true);
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);