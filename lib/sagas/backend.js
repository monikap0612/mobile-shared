import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';

import BackendTypes from '../constants/backend';
import RoomsActions from '../actions/rooms';

import { forkWatchers } from '../utils/sagas';

const STALE_TIME = 5 * 60 * 1000;

export default function({ apiUrl }) {

  // Hotel Rooms
  function * backendRoomsFlow() {
    const { auth: { hotelId, token }, backend: { rooms } } = yield select();
    const currentTs = moment().unix();

    try {
      if (!rooms.lastUpdate || currentTs - rooms.lastUpdate > STALE_TIME) {
        console.log(currentTs - rooms.lastUpdate, (currentTs - rooms.lastUpdate) / (60 * 1000));
        yield put(RoomsActions.roomsFetch());
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchBackendRoomsFlow() {
    yield * takeLatest(BackendTypes.ROOMS_BACKEND, backendRoomsFlow);
  }

  // Hotel Calendar
  function * backendCalendarFlow() {
    const { auth: { hotelId, token }, backend: { calendar } } = yield select();
    const currentTs = moment().unix();

    try {
      if (!calendar.lastUpdate || currentTs - calendar.lastUpdate > STALE_TIME) {
        yield put(RoomsActions.calendarFetch());
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchBackendCalendarFlow() {
    yield * takeLatest(BackendTypes.CALENDAR_BACKEND, backendCalendarFlow);
  }

  // Hotel Plannings
  function * backendPlanningsFlow() {
    const { auth: { hotelId, token }, backend: { plannings } } = yield select();
    const currentTs = moment().unix();

    try {
      if (!plannings.lastUpdate || currentTs - plannings.lastUpdate > STALE_TIME) {
        yield put(RoomsActions.planningsFetch());
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchBackendPlanningsFlow() {
    yield * takeLatest(BackendTypes.PLANNINGS_BACKEND, backendPlanningsFlow);
  }

  // Hotel Tasks
  function * backendTasksFlow() {
    const { auth: { hotelId, token }, backend: { tasks } } = yield select();
    const currentTs = moment().unix();

    try {
      if (!tasks.lastUpdate || currentTs - tasks.lastUpdate > STALE_TIME) {
        yield put(RoomsActions.tasksFetch());
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchBackendTasksFlow() {
    yield * takeLatest(BackendTypes.TASKS_BACKEND, backendTasksFlow);
  }

  // Hotel History
  function * backendHistoryFlow() {
    const { auth: { hotelId, token }, backend: { history } } = yield select();
    const currentTs = moment().unix();

    try {
      if (!history.lastUpdate || currentTs - history.lastUpdate > STALE_TIME) {
        yield put(RoomsActions.historyFetch());
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchBackendHistoryFlow() {
    yield * takeLatest(BackendTypes.HISTORY_BACKEND, backendHistoryFlow);
  }

  const watchers = {
    watchBackendRoomsFlow,
    watchBackendCalendarFlow,
    watchBackendPlanningsFlow,
    watchBackendTasksFlow
  };

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      backendRoomsFlow,
      backendCalendarFlow,
      backendPlanningsFlow,
      backendTasksFlow
    }
  }
}
