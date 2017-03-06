import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select, fork } from 'redux-saga/effects';

import RoomsTypes from '../constants/rooms';
import RoomsActions from '../actions/rooms';
import BackendActions from '../actions/backend';
import DifferencesActions from '../actions/differences';

import request, { authRequest } from '../utils/request';
import { forkWatchers } from '../utils/sagas';
import { offlineable } from '../offline';

import { planningsForUser, attendantRooms, planningsSelector, roomsSelector } from '../selectors/rooms';
import { findUpdates as findPlanningUpdates } from '../utils/plannings';
import { findUpdates as findRoomUpdates } from '../utils/rooms';
import {
  rooms as roomDifferences,
  plannings as planningDifferences,
  calendar as calendarDifferences
} from '../utils/differences';

export default function({ apiUrl, userType }) {
  const ROOMS_API = `${apiUrl}/rooms`;
  const FLOORS_API = `${apiUrl}/floors`;
  const ROOM_STATUSES_API = `${apiUrl}/room_statuses`;
  const ROOM_HOUSEKEEPINGS_API = `${apiUrl}/room_housekeepings`;
  const ROOM_CATEGORIES_API = `${apiUrl}/room_categories`;
  const PLANNINGS_API = `${apiUrl}/attendant_plannings`;
  const PLANNINGS_NIGHT_API = `${apiUrl}/attendant_planning_nights`;
  const PLANNINGS_RUNNER_API = `${apiUrl}/runner_plannings`;
  const CALENDAR_API = `${apiUrl}/calendar`;
  const ROOM_NOTES_API = `${apiUrl}/room_notes`;
  const CATALOGS_API = `${apiUrl}/catalog_by_hotel`;
  const TASKS_API = `${apiUrl}/tasks`;
  const HISTORY_API = `${apiUrl}/hotel_history`;

  // Hotel Rooms
  function * fetchRooms() {
    return yield call(authRequest, ROOMS_API);
  }

  function * fetchRoomsFlow() {
    try {
      const data = yield call(fetchRooms);
      const old = userType === 'attendant' ?
        yield select(attendantRooms) :
        yield select(roomsSelector);

      const updates = findRoomUpdates(old, data.rooms);
      // const differences = roomDifferences(old, data.rooms);

      yield put(RoomsActions.roomsSuccess(data));
      yield put(BackendActions.roomsFetched());

      if (updates) {
        yield put(RoomsActions.roomsUpdates(updates));
      }
      // if (differences.messages) {
      //   yield put(DifferencesActions.roomMessageDifference(differences.messages));
      // }
      // if (differences.unblocks) {
      //   yield put(DifferencesActions.roomUnblockDifference(differences.unblocks));
      // }
      // if (differences.restocks) {
      //   yield put(DifferencesActions.roomRestockDifference(differences.restocks));
      // }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchRoomsFlow(state) {
    yield * takeLatest(RoomsTypes.ROOMS_FETCH, fetchRoomsFlow);
  }

  // Hotel Floors
  function * fetchFloors() {
    return yield call(authRequest, FLOORS_API);
  }

  function * fetchFloorsFlow() {
    try {
      const data = yield call(fetchFloors);
      yield put(RoomsActions.floorsSuccess(data))
      yield put(BackendActions.floorsFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchFloorsFlow(state) {
    yield * takeLatest(RoomsTypes.FLOORS_FETCH, fetchFloorsFlow);
  }

  // Hotel Room Status
  function * fetchRoomStatuses() {
    return yield call(authRequest, ROOM_STATUSES_API);
  }

  function * fetchRoomStatusesFlow() {
    try {
      const data = yield call(fetchRoomStatuses);
      yield put(RoomsActions.roomStatusesSuccess(data))
      yield put(BackendActions.roomStatusesFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchRoomStatusesFlow(state) {
    yield * takeLatest(RoomsTypes.ROOM_STATUSES_FETCH, fetchRoomStatusesFlow);
  }

  // Hotel Room Housekeepings
  function * fetchRoomHousekeepings() {
    return yield call(authRequest, ROOM_HOUSEKEEPINGS_API);
  }

  function * fetchRoomHousekeepingsFlow() {
    try {
      const data = yield call(fetchRoomHousekeepings);
      yield put(RoomsActions.roomHousekeepingsSuccess(data))
      yield put(BackendActions.roomHousekeepingsFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchRoomHousekeepingsFlow(state) {
    yield * takeLatest(RoomsTypes.ROOM_HOUSEKEEPINGS_FETCH, fetchRoomHousekeepingsFlow);
  }

  // Hotel Room Categories
  function * fetchRoomCategories() {
    return yield call(authRequest, ROOM_CATEGORIES_API);
  }

  function * fetchRoomCategoriesFlow() {
    try {
      const data = yield call(fetchRoomCategories);
      yield put(RoomsActions.roomCategoriesSuccess(data));
      yield put(BackendActions.roomCategoriesFetched());
    } catch(e) {
      console.log(e)
    } finally {

    }
  }

  function * watchRoomCategoriesFlow(state) {
    yield * takeLatest(RoomsTypes.ROOM_CATEGORY_FETCH, fetchRoomCategoriesFlow);
  }

  // Hotel Plannings
  function * fetchPlannings() {
    return yield call(authRequest, PLANNINGS_API);
  }

  function * fetchPlanningsFlow() {
    try {
      const data = yield call(fetchPlannings);
      const previous = userType === 'attendant' ?
        yield select(planningsForUser) :
        yield select(planningsSelector);
      const updates = findPlanningUpdates(previous, data.plannings)
      const differences = planningDifferences(previous, data.plannings);

      yield put(RoomsActions.planningsSuccess(data))
      yield put(BackendActions.planningsFetched());

      if (updates) {
        yield put(RoomsActions.planningsUpdates(updates))
      }
      if (differences.priorities) {
        yield put(DifferencesActions.planningPriorityDifference(differences.priorities));
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchPlanningsFlow(state) {
    yield * takeLatest(RoomsTypes.PLANNINGS_FETCH, fetchPlanningsFlow);
  }

  // Hotel Plannings Night
  function * fetchPlanningsNight() {
    return yield call(authRequest, PLANNINGS_NIGHT_API);
  }

  function * fetchPlanningsNightFlow() {
    try {
      const data = yield call(fetchPlanningsNight);
      yield put(RoomsActions.planningsNightSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchPlanningsNightFlow(state) {
    yield * takeLatest(RoomsTypes.PLANNINGS_NIGHT_FETCH, fetchPlanningsNightFlow);
  }

  // Hotel Plannings Runner
  function * fetchPlanningsRunner() {
    return yield call(authRequest, PLANNINGS_RUNNER_API);
  }

  function * fetchPlanningsRunnerFlow() {
    try {
      const data = yield call(fetchPlanningsRunner);
      yield put(RoomsActions.planningsRunnerSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchPlanningsRunnerFlow(state) {
    yield * takeLatest(RoomsTypes.PLANNINGS_RUNNER_FETCH, fetchPlanningsRunnerFlow);
  }

  // Hotel Calender
  function * fetchCalendar() {
    return yield call(authRequest, CALENDAR_API);
  }

  function * fetchCalendarFlow() {
    try {
      const data = yield call(fetchCalendar);
      yield put(RoomsActions.calendarSuccess(data));
      yield put(BackendActions.calendarFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchCalendarFlow(state) {
    yield * takeLatest(RoomsTypes.CALENDAR_FETCH, fetchCalendarFlow);
  }

  // Hotel Room Notes
  function * fetchRoomNotes() {
    return yield call(authRequest, ROOM_NOTES_API);
  }

  function * fetchRoomNotesFlow() {
    try {
      const data = yield call(fetchRoomNotes);
      yield put(RoomsActions.roomNotesSuccess(data));
      yield put(BackendActions.roomNotesFetched());
    } catch (e) {
      console.log('ROOM NOTES ERR',e);
    } finally {

    }
  }

  function * watchRoomNotesFlow(state) {
    yield * takeLatest(RoomsTypes.ROOM_NOTES_FETCH, fetchRoomNotesFlow);
  }

  // Hotel Catalogs
  function * fetchCatalogs() {
    return yield call(authRequest, CATALOGS_API);
  }

  function * fetchCatalogsFlow() {
    try {
      const data = yield call(fetchCatalogs);
      yield put(RoomsActions.catalogsSuccess(data))
      yield put(BackendActions.catalogsFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchCatalogsFlow(state) {
    yield * takeLatest(RoomsTypes.CATALOGS_FETCH, fetchCatalogsFlow);
  }

  // Hotel Tasks
  function * fetchTasks() {
    return yield call(authRequest, TASKS_API);
  }

  function * fetchTasksFlow() {
    try {
      const data = yield call(fetchTasks);
      yield put(RoomsActions.tasksSuccess(data));
      yield put(BackendActions.tasksFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchTasksFlow() {
    yield * takeLatest(RoomsTypes.TASKS_FETCH, fetchTasksFlow);
  }

  // Hotel History
  function * fetchHistory() {
    return yield call(authRequest, HISTORY_API);
  }

  function * fetchHistoryFlow() {
    try {
      const data = yield call(fetchHistory);
      yield put(RoomsActions.historySuccess(data));
      yield put(BackendActions.historyFetched());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchHistoryFlow() {
    yield * takeLatest(RoomsTypes.HISTORY_FETCH, fetchHistoryFlow);
  }

  const watchers = {
    watchRoomsFlow,
    watchFloorsFlow,
    watchRoomStatusesFlow,
    watchRoomHousekeepingsFlow,
    watchRoomCategoriesFlow,
    watchPlanningsFlow,
    watchPlanningsNightFlow,
    watchPlanningsRunnerFlow,
    watchCalendarFlow,
    watchRoomNotesFlow,
    watchCatalogsFlow,
    watchTasksFlow,
    watchHistoryFlow
  }

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      fetchRooms,
      fetchRoomsFlow,
      fetchFloors,
      fetchFloorsFlow,
      fetchRoomStatuses,
      fetchRoomStatusesFlow,
      fetchRoomHousekeepings,
      fetchRoomHousekeepingsFlow,
      fetchRoomCategories,
      fetchRoomCategoriesFlow,
      fetchPlannings,
      fetchPlanningsFlow,
      fetchPlanningsNight,
      fetchPlanningsNightFlow,
      fetchPlanningsRunner,
      fetchPlanningsRunnerFlow,
      fetchCalendar,
      fetchCalendarFlow,
      fetchRoomNotes,
      fetchRoomNotesFlow,
      fetchCatalogs,
      fetchCatalogsFlow,
      fetchTasks,
      fetchTasksFlow,
      fetchHistory,
      fetchHistoryFlow
    }
  }
}
