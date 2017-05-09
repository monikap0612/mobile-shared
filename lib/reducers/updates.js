import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import moment from 'moment';
import { find, findIndex } from 'lodash/collection';
import { get } from 'lodash/object';

import UpdatesTypes from '../constants/updates';

export const INITIAL_STATE = Immutable({
  date: moment().format('YYYY-MM-DD'),
  rooms: {},
  inventory: {},
  rejections: {},
  tasks: [],
  photos: {}
});

const ACTION_HANDLERS = {
  [UpdatesTypes.UPDATES_RESET]: (state) => {
    return INITIAL_STATE;
  },
  [UpdatesTypes.INVENTORY_ADJUST]: (state, { assetRoomId, roomId }) => {
    if (!get(state, ['inventory', roomId], false)) {
      let inventory = {};
      inventory[assetRoomId] = 1
      return state.setIn(['inventory', roomId], Immutable(inventory));
    }

    if (!get(state, ['inventory', roomId, assetRoomId], false)) {
      return state.setIn(['inventory', roomId, assetRoomId], 1);
    }

    return state.updateIn(['inventory', roomId, assetRoomId], (x) => x + 1);
  },
  [UpdatesTypes.INVENTORY_REJECT]: (state, { assetRoomId, roomId }) => {
    if (!get(state, ['rejections', roomId], false)) {
      let rejections = {};
      rejections[assetRoomId] = 1
      return state.setIn(['rejections', roomId], Immutable(rejections));
    }

    if (!get(state, ['rejections', roomId, assetRoomId], false)) {
      return state.setIn(['rejections', roomId, assetRoomId], 1);
    }

    return state.updateIn(['rejections', roomId, assetRoomId], (x) => x + 1);
  },
  [UpdatesTypes.INVENTORY_RESET]: (state, { assetRoomId, roomId }) => {
    // if (!get(state, ['inventory', roomId, assetRoomId], false)) {
    //   return state;
    // }

    const roomInventory = get(state, ['inventory', roomId], {});
    const roomRejections = get(state, ['rejections', roomId], {});
    
    return state
      .setIn(['inventory', roomId], roomInventory.without(assetRoomId))
      .setIn(['rejections', roomId], roomInventory.without(assetRoomId));
  },
  [UpdatesTypes.ROOM_CLEAN_START]: (state, { roomId }) => {
    const { rooms } = state;
    const newEntry = {
      roomId,
      startTime: moment().unix(),
      endTime: null,
      pauseTime: 0,
      lastPauseTs: null,
      isPaused: false
    }

    return state.setIn(['rooms', roomId], Immutable(newEntry));
  },
  [UpdatesTypes.ROOM_CLEAN_RESTART]: (state, { roomId }) => {
    const { rooms } = state;
    const newEntry = {
      roomId,
      startTime: moment().unix(),
      endTime: null,
      pauseTime: 0,
      lastPauseTs: null,
      isPaused: false
    }

    return state.setIn(['rooms', roomId], Immutable(newEntry));
  },
  [UpdatesTypes.ROOM_CLEAN_PAUSE]: (state, { roomId }) => {
    return state
      .setIn(['rooms', roomId, 'lastPauseTs'], moment().unix())
      .setIn(['rooms', roomId, 'isPaused'], true);
  },
  [UpdatesTypes.ROOM_CLEAN_UNPAUSE]: (state, { roomId}) => {
    const lastPauseTs = get(state, ['rooms', roomId, 'lastPauseTs']);
    const pauseTime = get(state, ['rooms', roomId, 'pauseTime'], 0);

    return state
      .setIn(['rooms', roomId, 'lastPauseTs'], 0)
      .setIn(['rooms', roomId, 'pauseTime'], pauseTime + (moment().unix() - lastPauseTs))
      .setIn(['rooms', roomId, 'isPaused'], false);
  },
  [UpdatesTypes.ROOM_CLEAN_FLUSH]: (state, { roomId }) => {
    const { rooms } = state;
    return state.set('rooms', rooms.without(roomId));
  },
  [UpdatesTypes.ROOM_CANCEL]: (state, { roomId }) => {
    const { rooms } = state;
    return state.set('rooms', rooms.without(roomId));
  },
  [UpdatesTypes.PHOTO_UPLOAD]: (state, { path, id }) => {
    return state.setIn(['photos', id], Immutable({ path, loading: true }));
  },
  [UpdatesTypes.PHOTO_STORE]: (state, { id, url }) => {
    return state.setIn(['photos', id, 'url'], url).setIn(['photos', id, 'loading'], false);
  },
  [UpdatesTypes.PHOTO_UPLOAD_FAILURE]: (state, { id }) => {
    return state.setIn(['photos', id, 'loading'], false);
  },
  [UpdatesTypes.PHOTO_REMOVE]: (state, { id }) => {
    const { photos } = state;
    return state.set('photos', photos.without(id));
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
