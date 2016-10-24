import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, map, find, filter } from 'lodash/collection';
import { uniq } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { map as fpMap, uniq as fpUniq, fpUniqWith, compose, flow } from 'lodash/fp';

const roomsSelector = state => state.updates.rooms;
const activeRoomSelector = state => state.rooms.activeRoom;

const getActiveRoomUpdate = (roomsUpdates, roomId) => {
  return roomsUpdates && get(roomsUpdates, roomId, null);
}

export const computedActiveRoomUpdate = createSelector(
  [roomsSelector, activeRoomSelector],
  getActiveRoomUpdate
);
