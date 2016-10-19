'use strict';

exports.__esModule = true;
exports.resetAssets = resetAssets;
exports.assetsFetch = assetsFetch;
exports.assetsSuccess = assetsSuccess;
exports.virtualAssetsFetch = virtualAssetsFetch;
exports.virtualAssetsSuccess = virtualAssetsSuccess;
exports.assetRoomsFetch = assetRoomsFetch;
exports.assetRoomsSuccess = assetRoomsSuccess;
exports.customActionsFetch = customActionsFetch;
exports.customActionsSuccess = customActionsSuccess;
exports.roomAreasFetch = roomAreasFetch;
exports.roomAreasSuccess = roomAreasSuccess;
exports.inventoryWithdrawalFetch = inventoryWithdrawalFetch;
exports.inventoryWithdrawalSuccess = inventoryWithdrawalSuccess;

var _assets = require('../constants/assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function resetAssets() {
  return {
    type: _assets2['default'].ASSETS_RESET
  };
}

function assetsFetch() {
  return {
    type: _assets2['default'].ASSETS_FETCH
  };
}

function assetsSuccess(_ref) {
  var assets = _ref.assets;

  return {
    type: _assets2['default'].ASSETS_SUCCESS,
    assets: assets
  };
}

function virtualAssetsFetch() {
  return {
    type: _assets2['default'].VIRTUAL_ASSETS_FETCH
  };
}

function virtualAssetsSuccess(_ref2) {
  var virtualAssets = _ref2.virtualAssets;

  return {
    type: _assets2['default'].VIRTUAL_ASSETS_SUCCESS,
    virtualAssets: virtualAssets
  };
}

function assetRoomsFetch() {
  return {
    type: _assets2['default'].ASSET_ROOMS_FETCH
  };
}

function assetRoomsSuccess(_ref3) {
  var assetsroom = _ref3.assetsroom;

  return {
    type: _assets2['default'].ASSET_ROOMS_SUCCESS,
    assetsroom: assetsroom
  };
}

function customActionsFetch() {
  return {
    type: _assets2['default'].CUSTOM_ACTIONS_FETCH
  };
}

function customActionsSuccess(_ref4) {
  var customActions = _ref4.customActions;

  return {
    type: _assets2['default'].CUSTOM_ACTIONS_SUCCESS,
    customActions: customActions
  };
}

function roomAreasFetch() {
  return {
    type: _assets2['default'].ROOM_AREAS_FETCH
  };
}

function roomAreasSuccess(_ref5) {
  var roomAreas = _ref5.roomAreas;

  return {
    type: _assets2['default'].ROOM_AREAS_SUCCESS,
    roomAreas: roomAreas
  };
}

function inventoryWithdrawalFetch() {
  return {
    type: _assets2['default'].INVENTORY_WITHDRAWAL_FETCH
  };
}

function inventoryWithdrawalSuccess(_ref6) {
  var results = _ref6.results;

  return {
    type: _assets2['default'].INVENTORY_WITHDRAWAL_SUCCESS,
    results: results
  };
}

exports['default'] = {
  resetAssets: resetAssets,
  assetsFetch: assetsFetch,
  assetsSuccess: assetsSuccess,
  virtualAssetsFetch: virtualAssetsFetch,
  virtualAssetsSuccess: virtualAssetsSuccess,
  assetRoomsFetch: assetRoomsFetch,
  assetRoomsSuccess: assetRoomsSuccess,
  customActionsFetch: customActionsFetch,
  customActionsSuccess: customActionsSuccess,
  roomAreasFetch: roomAreasFetch,
  roomAreasSuccess: roomAreasSuccess,
  inventoryWithdrawalFetch: inventoryWithdrawalFetch,
  inventoryWithdrawalSuccess: inventoryWithdrawalSuccess
};