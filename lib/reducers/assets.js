'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _assets = require('../constants/assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  hotelAssets: [],
  hotelVirtualAssets: [],
  hotelAssetRooms: [],
  hotelCustomActions: [],
  hotelRoomAreas: [],
  hotelInventoryWithdrawals: []
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_assets2['default'].ASSETS_RESET] = function (state) {
  return INITIAL_STATE;
}, _ACTION_HANDLERS[_assets2['default'].ASSETS_SUCCESS] = function (state, _ref) {
  var assets = _ref.assets;

  return state.set('hotelAssets', assets);
}, _ACTION_HANDLERS[_assets2['default'].VIRTUAL_ASSETS_SUCCESS] = function (state, _ref2) {
  var virtualAssets = _ref2.virtualAssets;

  return state.set('hotelVirtualAssets', virtualAssets);
}, _ACTION_HANDLERS[_assets2['default'].ASSET_ROOMS_SUCCESS] = function (state, _ref3) {
  var assetsroom = _ref3.assetsroom;

  return state.set('hotelAssetRooms', assetsroom);
}, _ACTION_HANDLERS[_assets2['default'].CUSTOM_ACTIONS_SUCCESS] = function (state, _ref4) {
  var customActions = _ref4.customActions;

  return state.set('hotelCustomActions', customActions);
}, _ACTION_HANDLERS[_assets2['default'].ROOM_AREAS_SUCCESS] = function (state, _ref5) {
  var roomAreas = _ref5.roomAreas;

  return state.set('hotelRoomAreas', roomAreas);
}, _ACTION_HANDLERS[_assets2['default'].INVENTORY_WITHDRAWAL_SUCCESS] = function (state, _ref6) {
  var results = _ref6.results;

  return state.set('hotelInventoryWithdrawals', results);
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);