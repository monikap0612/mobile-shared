'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _collection = require('lodash/collection');

var _object = require('lodash/object');

var _updates = require('../constants/updates');

var _updates2 = _interopRequireDefault(_updates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  date: (0, _moment2['default'])().format('YYYY-MM-DD'),
  rooms: {},
  inventory: {},
  tasks: [],
  photos: {}
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_updates2['default'].UPDATES_RESET] = function (state) {
  return INITIAL_STATE;
}, _ACTION_HANDLERS[_updates2['default'].INVENTORY_ADJUST] = function (state, _ref) {
  var assetRoomId = _ref.assetRoomId;
  var roomId = _ref.roomId;

  if (!(0, _object.get)(state, ['inventory', roomId], false)) {
    var inventory = {};
    inventory[assetRoomId] = 1;
    return state.setIn(['inventory', roomId], (0, _seamlessImmutable2['default'])(inventory));
  }

  if (!(0, _object.get)(state, ['inventory', roomId, assetRoomId], false)) {
    return state.setIn(['inventory', roomId, assetRoomId], 1);
  }

  return state.updateIn(['inventory', roomId, assetRoomId], function (x) {
    return x + 1;
  });
}, _ACTION_HANDLERS[_updates2['default'].INVENTORY_RESET] = function (state, _ref2) {
  var assetRoomId = _ref2.assetRoomId;
  var roomId = _ref2.roomId;

  if (!(0, _object.get)(state, ['inventory', roomId, assetRoomId], false)) {
    return state;
  }

  var roomInventory = (0, _object.get)(state, ['inventory', roomId], {});
  return state.setIn(['inventory', roomId], roomInventory.without(assetRoomId));
}, _ACTION_HANDLERS[_updates2['default'].ROOM_CLEAN_START] = function (state, _ref3) {
  var roomId = _ref3.roomId;
  var rooms = state.rooms;

  var newEntry = {
    roomId: roomId,
    startTime: (0, _moment2['default'])().unix(),
    endTime: null,
    pauseTime: 0,
    lastPauseTs: null,
    isPaused: false
  };

  return state.setIn(['rooms', roomId], (0, _seamlessImmutable2['default'])(newEntry));
}, _ACTION_HANDLERS[_updates2['default'].ROOM_CLEAN_RESTART] = function (state, _ref4) {
  var roomId = _ref4.roomId;
  var rooms = state.rooms;

  var newEntry = {
    roomId: roomId,
    startTime: (0, _moment2['default'])().unix(),
    endTime: null,
    pauseTime: 0,
    lastPauseTs: null,
    isPaused: false
  };

  return state.setIn(['rooms', roomId], (0, _seamlessImmutable2['default'])(newEntry));
}, _ACTION_HANDLERS[_updates2['default'].ROOM_CLEAN_PAUSE] = function (state, _ref5) {
  var roomId = _ref5.roomId;

  return state.setIn(['rooms', roomId, 'lastPauseTs'], (0, _moment2['default'])().unix()).setIn(['rooms', roomId, 'isPaused'], true);
}, _ACTION_HANDLERS[_updates2['default'].ROOM_CLEAN_UNPAUSE] = function (state, _ref6) {
  var roomId = _ref6.roomId;

  var lastPauseTs = (0, _object.get)(state, ['rooms', roomId, 'lastPauseTs']);
  var pauseTime = (0, _object.get)(state, ['rooms', roomId, 'pauseTime'], 0);

  return state.setIn(['rooms', roomId, 'lastPauseTs'], 0).setIn(['rooms', roomId, 'pauseTime'], pauseTime + ((0, _moment2['default'])().unix() - lastPauseTs)).setIn(['rooms', roomId, 'isPaused'], false);
}, _ACTION_HANDLERS[_updates2['default'].ROOM_CLEAN_FLUSH] = function (state, _ref7) {
  var roomId = _ref7.roomId;
  var rooms = state.rooms;

  return state.set('rooms', rooms.without(roomId));
}, _ACTION_HANDLERS[_updates2['default'].ROOM_CANCEL] = function (state, _ref8) {
  var roomId = _ref8.roomId;
  var rooms = state.rooms;

  return state.set('rooms', rooms.without(roomId));
}, _ACTION_HANDLERS[_updates2['default'].PHOTO_UPLOAD] = function (state, _ref9) {
  var path = _ref9.path;
  var id = _ref9.id;

  return state.setIn(['photos', id], (0, _seamlessImmutable2['default'])({ path: path }));
}, _ACTION_HANDLERS[_updates2['default'].PHOTO_STORE] = function (state, _ref10) {
  var id = _ref10.id;
  var url = _ref10.url;

  return state.setIn(['photos', id, 'url'], url);
}, _ACTION_HANDLERS[_updates2['default'].PHOTO_REMOVE] = function (state, _ref11) {
  var id = _ref11.id;
  var photos = state.photos;

  return state.set('photos', photos.without(id));
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);