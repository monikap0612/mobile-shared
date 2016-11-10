import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { findIndex } from 'lodash/array';

import RoomsTypes from '../constants/rooms';

export const INITIAL_STATE = Immutable({
  activeRoom: null,
  hotelRooms: [],
  hotelFloors: [],
  hotelRoomStatuses: [],
  hotelRoomHousekeepings: [],
  hotelCalendar: [],
  hotelPlannings: [],
  hotelPlanningsNight: [],
  hotelPlanningsRunner: [],
  hotelRoomNotes: [],
  hotelCatalogs: [],
  hotelTasks: []
});

const ACTION_HANDLERS = {
  [RoomsTypes.RESET_ROOMS]: (state) => {
    return INITIAL_STATE;
  },
  [RoomsTypes.ROOM_ACTIVATE]: (state, { roomId }) => {
    return state.set('activeRoom', roomId);
  },
  [RoomsTypes.ROOM_DEACTIVATE]: (state) => {
    return state.set('activeRoom', null);
  },
  [RoomsTypes.ROOMS_SUCCESS]: (state, { rooms }) => {
    return state.set('hotelRooms', rooms);
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
  [RoomsTypes.CALENDAR_SUCCESS]: (state, { results }) => {
    return state.set('hotelCalendar', results);
  },
  [RoomsTypes.PLANNINGS_SUCCESS]: (state, { plannings }) => {
    return state.set('hotelPlannings', plannings);
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
  [RoomsTypes.TASK_UPDATE_SUCCESS]: (state, { task }) => {
    const foundIndex = findIndex(state.hotelTasks, { 'uuid': task.uuid });
    if (foundIndex === -1) {
      return state;
    }

    return state.setIn(['hotelTasks', foundIndex], task);
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);