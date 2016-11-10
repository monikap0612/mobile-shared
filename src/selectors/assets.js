import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, groupBy, map, find, filter, sortBy } from 'lodash/collection';
import { uniq, concat } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { map as fpMap, uniq as fpUniq, fpUniqWith, filter as fpFilter, sortBy as fpSortBy, flow } from 'lodash/fp';

const assetsSelector = state => state.assets.hotelAssets;
const virtualAssetsSelector = state => state.assets.hotelVirtualAssets;
const assetRoomsSelector = state => state.assets.hotelAssetRooms;
const roomAreasSelector = state => state.assets.hotelRoomAreas;
const activeRoomSelector = state => state.rooms.activeRoom;
const updatesInventorySelector = state => state.updates.inventory;

const getComputedAssets = (hotelAssets, hotelVirtualAssets) => {
  return sortBy(concat(hotelAssets || [], hotelVirtualAssets || []), 'name');
}

const getComputedAssetsIndex = (hotelAssets) => {
  return keyBy(hotelAssets, '_id');
}

const getComputedGroupedAssetRooms = (hotelAssetRooms) => {
  return groupBy(hotelAssetRooms, 'room');
}

const getComputedAssetRoomsByActiveRoom = (hotelAssetsIndex, hotelAssetRoomsGrouped, activeRoom) => {
  return get(hotelAssetRoomsGrouped, activeRoom, []).map(ar => {
    const assetId = get(ar, 'asset');
    return extend({}, ar, { asset: get(hotelAssetsIndex, assetId)});
  });
}

const getComputedInventoryAssetsByActiveRoom = (activeAssetRooms, inventoryUpdates) => {
  if (!activeAssetRooms || !activeAssetRooms.length) {
    return [];
  }

  const roomId = get(activeAssetRooms, [0, 'room'], '');
  const roomInventoryUpdates = get(inventoryUpdates, roomId, {});

  return flow(
    fpFilter(asset => {
      return get(asset, 'assetType') === 'stock' || get(asset, 'assetType') === 'quantity';
    }),
    fpMap((asset, index) => {
      const assetId = get(asset, '_id');
      return extend({}, asset, {
        update: get(roomInventoryUpdates, assetId, 0),
        index
      });
    }),
    fpSortBy('asset.name')
  )(activeAssetRooms);
}

const getComputedInventoryRoomAreas = (activeInventoryAssets, hotelRoomAreas) => {
  if (!hotelRoomAreas || !hotelRoomAreas.length) {
    return [];
  }

  const indexRoomAreas = keyBy(hotelRoomAreas, '_id');

  return flow(
    fpMap('asset.roomArea'),
    fpUniq,
    fpMap(id => get(indexRoomAreas, id)),
    fpSortBy('label')
  )(activeInventoryAssets);
}

export const computedAssets = createSelector(
  [assetsSelector, virtualAssetsSelector],
  getComputedAssets
);

export const computedAssetsIndex = createSelector(
  [computedAssets],
  getComputedAssetsIndex
);

export const computedGroupedAssetRooms = createSelector(
  [assetRoomsSelector],
  getComputedGroupedAssetRooms
);

export const computedAssetsByActiveRoom = createSelector(
  [computedAssetsIndex, computedGroupedAssetRooms, activeRoomSelector],
  getComputedAssetRoomsByActiveRoom
);

export const computedInventoryAssetsByActiveRoom = createSelector(
  [computedAssetsByActiveRoom, updatesInventorySelector],
  getComputedInventoryAssetsByActiveRoom
)

export const computedAvailableRoomAreas = createSelector(
  [computedInventoryAssetsByActiveRoom, roomAreasSelector],
  getComputedInventoryRoomAreas
)