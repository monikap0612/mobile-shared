import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import moment from 'moment';

import BackendTypes from '../constants/backend';

export const INITIAL_STATE = Immutable({
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
  glitches: { lastUpdate: null },
});

const ACTION_HANDLERS = {
  [BackendTypes.ROOMS_FETCHED]: (state) => {
    return state.setIn(['rooms', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.FLOORS_FETCHED]: (state) => {
    return state.setIn(['floors', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.ROOM_STATUSES_FETCHED]: (state) => {
    return state.setIn(['roomStatuses', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.ROOM_HOUSEKEEPINGS_FETCHED]: (state) => {
    return state.setIn(['roomHousekeepings', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.CALENDAR_FETCHED]: (state) => {
    return state.setIn(['calendar', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.PLANNINGS_FETCHED]: (state) => {
    return state.setIn(['plannings', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.ROOM_NOTES_FETCHED]: (state) => {
    return state.setIn(['roomNotes', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.CATALOGS_FETCHED]: (state) => {
    return state.setIn(['catalogs', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.TASKS_FETCHED]: (state) => {
    return state.setIn(['tasks', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.ASSETS_FETCHED]: (state) => {
    return state.setIn(['assets', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.VIRTUAL_ASSETS_FETCHED]: (state) => {
    return state.setIn(['virtualAssets', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.ROOM_AREAS_FETCHED]: (state) => {
    return state.setIn(['roomAreas', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.CUSTOM_ACTIONS_FETCHED]: (state) => {
    return state.setIn(['customActions', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.ASSET_ROOMS_FETCHED]: (state) => {
    return state.setIn(['assetRooms', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.INVENTORY_WITHDRAWAL_FETCHED]: (state) => {
    return state.setIn(['inventoryWithdrawal', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.USERS_FETCHED]: (state) => {
    return state.setIn(['usersFetch', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.GROUPS_FETCHED]: (state) => {
    return state.setIn(['groups', 'lastUpdate'], moment().unix());
  },
  [BackendTypes.GLITCHES_FETCHED]: (state) => {
    return state.setIn(['glitches', 'lastUpdate'], moment().unix());
  }
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);