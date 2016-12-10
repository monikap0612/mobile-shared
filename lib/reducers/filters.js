import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import FiltersTypes from '../constants/filters';

export const INITIAL_STATE = Immutable({
  roomsSearchQuery: "",
  activeFloor: null,
  activeSection: null,
  activeRooms: [],
  isActiveFilter: false,
});

const ACTION_HANDLERS = {
  [FiltersTypes.RESET_ROOM_FILTERS]: (state) => {
    return INITIAL_STATE;
  },
  [FiltersTypes.UPDATE_SEARCH_ROOMS]: (state, { searchQuery }) => {
    if (!searchQuery) {
      const isStillActive = state.activeFloor || state.activeSection || state.activeRooms.length;
      return state
        .set('roomsSearchQuery', null)
        .set('isActiveFilter', isStillActive);
    }

    return state
      .set('roomsSearchQuery', searchQuery)
      .set('isActiveFilter', true);
  },
  [FiltersTypes.UPDATE_ACTIVE_FLOOR]: (state, { activeFloor })  => {
    if (!activeFloor) {
      const isStillActive = state.roomsSearchQuery || state.activeSection || state.activeRooms.length;
      return state
        .set('activeFloor', activeFloor)
        .set('isActiveFilter', isStillActive);
    }

    return state
      .set('activeFloor', activeFloor)
      .set('isActiveFilter', true)
  },
  [FiltersTypes.UPDATE_ACTIVE_SECTION]: (state, { activeSection }) => {
    if (!activeSection) {
      const isStillActive = state.roomsSearchQuery || state.activeFloor || state.activeRooms.length;
      return state
        .set('activeSection', activeSection)
        .set('isActiveFilter', isStillActive);
    }

    return state
      .set('activeSection', activeSection)
      .set('isActiveFilter', true);
  },
  [FiltersTypes.SET_ACTIVE_ROOMS]: (state, { activeRooms }) => {
    if (!activeRooms || !activeRooms.length) {
      const isStillActive = state.roomsSearchQuery || state.activeFloor || state.activeSection;
      return state
        .set('activeRooms', [])
        .set('isActiveFilter', isStillActive);
    }

    return state
      .set('activeRooms', activeRooms)
      .set('isActiveFilter', true);
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
