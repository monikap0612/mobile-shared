import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { findIndex } from 'lodash/array';
import { extend } from 'lodash/object';

import RoomsTypes from '../constants/rooms';

export const INITIAL_STATE = Immutable({
  activeRoom: null,
  tabIndex: 0,
  hotelRooms: [],
  hotelFloors: [],
  hotelRoomStatuses: [],
  hotelRoomHousekeepings: [],
  hotelRoomCategories: [],
  hotelCalendar: [],
  hotelPlannings: [],
  hotelPlanningsNight: [],
  hotelPlanningsRunner: [],
  hotelRoomNotes: [],
  hotelCatalogs: [],
  hotelTasks: [],
  hotelHistory: []
});

const ACTION_HANDLERS = {
  [RoomsTypes.RESET_ROOMS]: (state) => {
    return INITIAL_STATE;
  },
  [RoomsTypes.ROOM_ACTIVATE]: (state, { roomId, tabIndex }) => {
    return state.set('activeRoom', roomId).set('tabIndex', tabIndex || 0)
  },
  [RoomsTypes.ROOM_DEACTIVATE]: (state) => {
    return state.set('activeRoom', null);
  },
  [RoomsTypes.ROOMS_SUCCESS]: (state, { rooms }) => {
    return state.set('hotelRooms', rooms);
  },
  [RoomsTypes.ROOM_UPDATE_OPTIMISTIC]: (state, { roomId, field, value }) => {
    const foundIndex = findIndex(state.hotelRooms, { '_id': roomId });
    if (foundIndex === -1) {
      return state;
    }

    return state.setIn(['hotelRooms', foundIndex, field], value);
  },
  [RoomsTypes.ROOM_UPDATE_SUCCESS]: (state, { room }) => {
    const foundIndex = findIndex(state.hotelRooms, { '_id': room._id });
    if (foundIndex === -1) {
      return state;
    }

    return state.setIn(['hotelRooms', foundIndex], room);
  },
  [RoomsTypes.FLOORS_SUCCESS]: (state, { floors }) => {
    return state.set('hotelFloors', floors);
  },
  [RoomsTypes.ROOM_STATUSES_SUCCESS]: (state, { roomStatuses }) => {
    return state.set('hotelRoomStatuses', roomStatuses);
  },
  [RoomsTypes.ROOM_HOUSEKEEPINGS_SUCCESS]: (state, { roomHousekeepings }) => {
    return state.set('hotelRoomHousekeepings', roomHousekeepings);
  },
  [RoomsTypes.ROOM_CATEGORY_SUCCESS]: (state, { roomCategories }) => {
    return state.set('hotelRoomCategories', roomCategories);
  },
  [RoomsTypes.CALENDAR_SUCCESS]: (state, { results }) => {
    return state.set('hotelCalendar', results);
  },
  [RoomsTypes.PLANNINGS_SUCCESS]: (state, { plannings }) => {
    return state.set('hotelPlannings', plannings);
  },
  [RoomsTypes.PLANNING_UPDATE_OPTIMISTIC]: (state, { roomId, user, options }) => {
    const foundIndex = findIndex(state.hotelPlannings, { '_id': roomId });
    let planning;
    if (foundIndex > -1) {
      planning = state.hotelPlannings[foundIndex];
      planning.planning_user_id = user && user._id || null;
    } else {
      planning = {
        planning_user_id: user && user._id || null,
        room_id: roomId,
        is_optimistic: true
      }
    }
    if (options) {
      planning = extend({}, planning, options);
    }

    if (foundIndex > -1) {
      return state.setIn(['hotelPlannings', foundIndex], planning);
    } else {
      let plannings = state.hotelPlannings.asMutable();
      plannings.push(planning);
      return state.set('hotelPlannings', plannings);
    }
  },
  [RoomsTypes.PLANNINGS_NIGHT_SUCCESS]: (state, { planningsNight }) => {
    return state.set('hotelPlanningsNight', planningsNight);
  },
  [RoomsTypes.PLANNINGS_RUNNER_SUCCESS]: (state, { planningRunners }) => {
    return state.set('hotelPlanningsRunner', planningRunners);
  },
  [RoomsTypes.ROOM_NOTES_SUCCESS]: (state, { results }) => {
    return state.set('hotelRoomNotes', results);
  },
  [RoomsTypes.CATALOGS_SUCCESS]: (state, { catalogs }) => {
    return state.set('hotelCatalogs', catalogs);
  },
  [RoomsTypes.TASKS_SUCCESS]: (state, { tasks }) => {
    return state.set('hotelTasks', tasks);
  },
  [RoomsTypes.TASK_UPDATE_OPTIMISTIC]: (state, { uuid, update }) => {
    const foundIndex = findIndex(state.hotelTasks, { 'uuid': uuid });
    if (foundIndex === -1) {
      return state;
    }

    return state.setIn(['hotelTasks', foundIndex], update);
  },
  [RoomsTypes.TASK_UPDATE_SUCCESS]: (state, { task }) => {
    const foundIndex = findIndex(state.hotelTasks, { 'uuid': task.uuid });
    if (foundIndex === -1) {
      return state;
    }

    return state.setIn(['hotelTasks', foundIndex], task);
  },
  [RoomsTypes.HISTORY_SUCCESS]: (state, { history }) => {
    return state.set('hotelHistory', history);
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
