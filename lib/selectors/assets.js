'use strict';

exports.__esModule = true;
exports.computedAvailableRoomAreas = exports.computedInventoryAssetsByActiveRoom = exports.computedAssetsByActiveRoom = exports.computedGroupedAssetRooms = exports.computedAssetsIndex = exports.computedAssets = undefined;

var _reselect = require('reselect');

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');

var _fp = require('lodash/fp');

var assetsSelector = function assetsSelector(state) {
  return state.assets.hotelAssets;
};
var virtualAssetsSelector = function virtualAssetsSelector(state) {
  return state.assets.hotelVirtualAssets;
};
var assetRoomsSelector = function assetRoomsSelector(state) {
  return state.assets.hotelAssetRooms;
};
var roomAreasSelector = function roomAreasSelector(state) {
  return state.assets.hotelRoomAreas;
};
var activeRoomSelector = function activeRoomSelector(state) {
  return state.rooms.activeRoom;
};
var updatesInventorySelector = function updatesInventorySelector(state) {
  return state.updates.inventory;
};

var getComputedAssets = function getComputedAssets(hotelAssets, hotelVirtualAssets) {
  return (0, _array.concat)(hotelAssets || [], hotelVirtualAssets || []);
};

var getComputedAssetsIndex = function getComputedAssetsIndex(hotelAssets) {
  return (0, _collection.keyBy)(hotelAssets, '_id');
};

var getComputedGroupedAssetRooms = function getComputedGroupedAssetRooms(hotelAssetRooms) {
  return (0, _collection.groupBy)(hotelAssetRooms, 'room');
};

var getComputedAssetRoomsByActiveRoom = function getComputedAssetRoomsByActiveRoom(hotelAssetsIndex, hotelAssetRoomsGrouped, activeRoom) {
  return (0, _object.get)(hotelAssetRoomsGrouped, activeRoom, []).map(function (ar) {
    var assetId = (0, _object.get)(ar, 'asset');
    return (0, _object.extend)({}, ar, { asset: (0, _object.get)(hotelAssetsIndex, assetId) });
  });
};

var getComputedInventoryAssetsByActiveRoom = function getComputedInventoryAssetsByActiveRoom(activeAssetRooms, inventoryUpdates) {
  if (!activeAssetRooms || !activeAssetRooms.length) {
    return [];
  }

  var roomId = (0, _object.get)(activeAssetRooms, [0, 'room'], '');
  var roomInventoryUpdates = (0, _object.get)(inventoryUpdates, roomId, {});

  return (0, _fp.flow)((0, _fp.filter)(function (asset) {
    return (0, _object.get)(asset, 'assetType') === 'stock' || (0, _object.get)(asset, 'assetType') === 'quantity';
  }), (0, _fp.map)(function (asset, index) {
    var assetId = (0, _object.get)(asset, '_id');
    return (0, _object.extend)({}, asset, {
      update: (0, _object.get)(roomInventoryUpdates, assetId, 0),
      index: index
    });
  }), (0, _fp.sortBy)('asset.name'))(activeAssetRooms);
};

var getComputedInventoryRoomAreas = function getComputedInventoryRoomAreas(activeInventoryAssets, hotelRoomAreas) {
  if (!hotelRoomAreas || !hotelRoomAreas.length) {
    return [];
  }

  var indexRoomAreas = (0, _collection.keyBy)(hotelRoomAreas, '_id');

  return (0, _fp.flow)((0, _fp.map)('asset.roomArea'), _fp.uniq, (0, _fp.map)(function (id) {
    return (0, _object.get)(indexRoomAreas, id);
  }), (0, _fp.sortBy)('label'))(activeInventoryAssets);
};

var computedAssets = exports.computedAssets = (0, _reselect.createSelector)([assetsSelector, virtualAssetsSelector], getComputedAssets);

var computedAssetsIndex = exports.computedAssetsIndex = (0, _reselect.createSelector)([computedAssets], getComputedAssetsIndex);

var computedGroupedAssetRooms = exports.computedGroupedAssetRooms = (0, _reselect.createSelector)([assetRoomsSelector], getComputedGroupedAssetRooms);

var computedAssetsByActiveRoom = exports.computedAssetsByActiveRoom = (0, _reselect.createSelector)([computedAssetsIndex, computedGroupedAssetRooms, activeRoomSelector], getComputedAssetRoomsByActiveRoom);

var computedInventoryAssetsByActiveRoom = exports.computedInventoryAssetsByActiveRoom = (0, _reselect.createSelector)([computedAssetsByActiveRoom, updatesInventorySelector], getComputedInventoryAssetsByActiveRoom);

var computedAvailableRoomAreas = exports.computedAvailableRoomAreas = (0, _reselect.createSelector)([computedInventoryAssetsByActiveRoom, roomAreasSelector], getComputedInventoryRoomAreas);