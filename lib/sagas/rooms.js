import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import RoomsTypes from '../constants/rooms';
import RoomsActions from '../actions/rooms';
import BackendActions from '../actions/backend';

import request from '../utils/request';

export default function({ apiUrl }) {
  const ROOMS_API = `${apiUrl}/rooms`;
  const FLOORS_API = `${apiUrl}/floors`;
  const ROOM_STATUSES_API = `${apiUrl}/room_statuses`;
  const ROOM_HOUSEKEEPINGS_API = `${apiUrl}/room_housekeepings`;
  const PLANNINGS_API = `${apiUrl}/attendant_plannings`;
  const PLANNINGS_NIGHT_API = `${apiUrl}/attendant_planning_nights`;
  const PLANNINGS_RUNNER_API = `${apiUrl}/runner_plannings`;
  const CALENDAR_API = `${apiUrl}/calendar`;
  const ROOM_NOTES_API = `${apiUrl}/room_notes`;
  const CATALOGS_API = `${apiUrl}/catalog_by_hotel`;
  const TASKS_API = `${apiUrl}/tasks`;

  // Hotel Rooms
  function * fetchRooms() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ROOMS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchRoomsFlow() {
    try {
      const data = yield call(fetchRooms);
      yield put(RoomsActions.roomsSuccess(data));
      yield put(BackendActions.roomsFetched());
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, FLOORS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ROOM_STATUSES_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ROOM_HOUSEKEEPINGS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

  // Hotel Plannings
  function * fetchPlannings() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, PLANNINGS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchPlanningsFlow() {
    try {
      const data = yield call(fetchPlannings);
      yield put(RoomsActions.planningsSuccess(data))
      yield put(BackendActions.planningsFetched());
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, PLANNINGS_NIGHT_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, PLANNINGS_RUNNER_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, CALENDAR_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, ROOM_NOTES_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, CATALOGS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, TASKS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

  return {
    watchRoomsFlow,
    watchFloorsFlow,
    watchRoomStatusesFlow,
    watchRoomHousekeepingsFlow,
    watchPlanningsFlow,
    watchPlanningsNightFlow,
    watchPlanningsRunnerFlow,
    watchCalendarFlow,
    watchRoomNotesFlow,
    watchCatalogsFlow,
    watchTasksFlow
  }
}
