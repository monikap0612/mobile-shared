'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _backend = require('../constants/backend');

var _backend2 = _interopRequireDefault(_backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  rooms: { lastUpdate: null },
  floors: { lastUpdate: null },
  roomStatuses: { lastUpdate: null },
  roomHousekeepings: { lastUpdate: null },
  calendar: { lastUpdate: null },
  plannings: { lastUpdate: null },
  roomNotes: { lastUpdate: null },
  catalogs: { lastUpdate: null },
  tasks: { lastUpdate: null },
  assets: { lastUpdate: null },
  virtualAssets: { lastUpdate: null },
  roomAreas: { lastUpdate: null },
  customActions: { lastUpdate: null },
  assetRooms: { lastUpdate: null },
  inventoryWithdrawal: { lastUpdate: null },
  users: { lastUpdate: null },
  groups: { lastUpdate: null },
  glitches: { lastUpdate: null }
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_backend2['default'].ROOMS_FETCHED] = function (state) {
  return state.setIn(['rooms', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].FLOORS_FETCHED] = function (state) {
  return state.setIn(['floors', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].ROOM_STATUSES_FETCHED] = function (state) {
  return state.setIn(['roomStatuses', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].ROOM_HOUSEKEEPINGS_FETCHED] = function (state) {
  return state.setIn(['roomHousekeepings', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].CALENDAR_FETCHED] = function (state) {
  return state.setIn(['calendar', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].PLANNINGS_FETCHED] = function (state) {
  return state.setIn(['plannings', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].ROOM_NOTES_FETCHED] = function (state) {
  return state.setIn(['roomNotes', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].CATALOGS_FETCHED] = function (state) {
  return state.setIn(['catalogs', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].TASKS_FETCHED] = function (state) {
  return state.setIn(['tasks', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].ASSETS_FETCHED] = function (state) {
  return state.setIn(['assets', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].VIRTUAL_ASSETS_FETCHED] = function (state) {
  return state.setIn(['virtualAssets', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].ROOM_AREAS_FETCHED] = function (state) {
  return state.setIn(['roomAreas', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].CUSTOM_ACTIONS_FETCHED] = function (state) {
  return state.setIn(['customActions', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].ASSET_ROOMS_FETCHED] = function (state) {
  return state.setIn(['assetRooms', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].INVENTORY_WITHDRAWAL_FETCHED] = function (state) {
  return state.setIn(['inventoryWithdrawal', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].USERS_FETCHED] = function (state) {
  return state.setIn(['usersFetch', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].GROUPS_FETCHED] = function (state) {
  return state.setIn(['groups', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS[_backend2['default'].GLITCHES_FETCHED] = function (state) {
  return state.setIn(['glitches', 'lastUpdate'], (0, _moment2['default'])().unix());
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);