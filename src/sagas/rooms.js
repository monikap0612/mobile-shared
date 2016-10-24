import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import RoomsTypes from '../constants/rooms';
import RoomsActions from '../actions/rooms';
import BackendActions from '../actions/backend';

import request from '../utils/request';
import API_URL from '../api';

const ROOMS_API = `${API_URL}/rooms`;
const FLOORS_API = `${API_URL}/floors`;
const ROOM_STATUSES_API = `${API_URL}/room_statuses`;
const ROOM_HOUSEKEEPINGS_API = `${API_URL}/room_housekeepings`;
const PLANNINGS_API = `${API_URL}/attendant_plannings`;
const PLANNINGS_NIGHT_API = `${API_URL}/attendant_planning_nights`;
const PLANNINGS_RUNNER_API = `${API_URL}/runner_plannings`;
const CALENDAR_API = `${API_URL}/calendar`;
const ROOM_NOTES_API = `${API_URL}/room_notes`;
const CATALOGS_API = `${API_URL}/catalog_by_hotel`;
const TASKS_API = `${API_URL}/tasks`;

// Hotel Rooms
export function * fetchRooms() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ROOMS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchRoomsFlow() {
  try {
    const data = yield call(fetchRooms);
    yield put(RoomsActions.roomsSuccess(data));
    yield put(BackendActions.roomsFetched());
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchRoomsFlow(state) {
  yield * takeLatest(RoomsTypes.ROOMS_FETCH, fetchRoomsFlow);
}

// Hotel Floors
export function * fetchFloors() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, FLOORS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchFloorsFlow() {
  try {
    const data = yield call(fetchFloors);
    yield put(RoomsActions.floorsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchFloorsFlow(state) {
  yield * takeLatest(RoomsTypes.FLOORS_FETCH, fetchFloorsFlow);
}

// Hotel Room Status
export function * fetchRoomStatuses() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ROOM_STATUSES_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchRoomStatusesFlow() {
  try {
    const data = yield call(fetchRoomStatuses);
    yield put(RoomsActions.roomStatusesSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchRoomStatusesFlow(state) {
  yield * takeLatest(RoomsTypes.ROOM_STATUSES_FETCH, fetchRoomStatusesFlow);
}

// Hotel Room Housekeepings
export function * fetchRoomHousekeepings() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ROOM_HOUSEKEEPINGS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchRoomHousekeepingsFlow() {
  try {
    const data = yield call(fetchRoomHousekeepings);
    yield put(RoomsActions.roomHousekeepingsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchRoomHousekeepingsFlow(state) {
  yield * takeLatest(RoomsTypes.ROOM_HOUSEKEEPINGS_FETCH, fetchRoomHousekeepingsFlow);
}

// Hotel Plannings
export function * fetchPlannings() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, PLANNINGS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchPlanningsFlow() {
  try {
    const data = yield call(fetchPlannings);
    yield put(RoomsActions.planningsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchPlanningsFlow(state) {
  yield * takeLatest(RoomsTypes.PLANNINGS_FETCH, fetchPlanningsFlow);
}

// Hotel Plannings Night
export function * fetchPlanningsNight() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, PLANNINGS_NIGHT_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchPlanningsNightFlow() {
  try {
    const data = yield call(fetchPlanningsNight);
    yield put(RoomsActions.planningsNightSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchPlanningsNightFlow(state) {
  yield * takeLatest(RoomsTypes.PLANNINGS_NIGHT_FETCH, fetchPlanningsNightFlow);
}

// Hotel Plannings Runner
export function * fetchPlanningsRunner() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, PLANNINGS_RUNNER_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchPlanningsRunnerFlow() {
  try {
    const data = yield call(fetchPlanningsRunner);
    yield put(RoomsActions.planningsRunnerSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchPlanningsRunnerFlow(state) {
  yield * takeLatest(RoomsTypes.PLANNINGS_RUNNER_FETCH, fetchPlanningsRunnerFlow);
}

// Hotel Calender
export function * fetchCalendar() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, CALENDAR_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchCalendarFlow() {
  try {
    const data = yield call(fetchCalendar);
    yield put(RoomsActions.calendarSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchCalendarFlow(state) {
  yield * takeLatest(RoomsTypes.CALENDAR_FETCH, fetchCalendarFlow);
}

// Hotel Room Notes
export function * fetchRoomNotes() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, ROOM_NOTES_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchRoomNotesFlow() {
  try {
    const data = yield call(fetchRoomNotes);
    yield put(RoomsActions.roomNotesSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchRoomNotesFlow(state) {
  yield * takeLatest(RoomsTypes.ROOM_NOTES_FETCH, fetchRoomNotesFlow);
}

// Hotel Catalogs
export function * fetchCatalogs() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, CATALOGS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchCatalogsFlow() {
  try {
    const data = yield call(fetchCatalogs);
    yield put(RoomsActions.catalogsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchCatalogsFlow(state) {
  yield * takeLatest(RoomsTypes.CATALOGS_FETCH, fetchCatalogsFlow);
}

// Hotel Tasks
export function * fetchTasks() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, TASKS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchTasksFlow() {
  try {
    const data = yield call(fetchTasks);
    yield put(RoomsActions.tasksSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchTasksFlow() {
  yield * takeLatest(RoomsTypes.TASKS_FETCH, fetchTasksFlow);
}
