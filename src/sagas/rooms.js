import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

import RoomsTypes from '../constants/rooms'
import RoomsActions from '../actions/rooms'

import request from '../utils/request'

export default function({ apiUrl }) {
  const ROOMS_API = `${apiUrl}/rooms`
  const FLOORS_API = `${apiUrl}/floors`
  const ROOM_STATUSES_API = `${apiUrl}/room_statuses`
  const ROOM_HOUSEKEEPINGS_API = `${apiUrl}/room_housekeepings`
  const PLANNINGS_API = `${apiUrl}/attendant_plannings`
  const PLANNINGS_NIGHT_API = `${apiUrl}/attendant_planning_nights`
  const CALENDAR_API = `${apiUrl}/calendar`
  const ROOM_NOTES_API = `${apiUrl}/room_notes`
  const CATALOGS_API = `${apiUrl}/catalog_by_hotel`
  const TASKS_API = `${apiUrl}/tasks`

  // Hotel Rooms
  function * fetchRooms() {
    const { auth: { token } } = yield select()

    return yield call(request, ROOMS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchRoomsFlow() {
    try {
      const data = yield call(fetchRooms)
      yield put(RoomsActions.roomsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchRoomsFlow() {
    yield * takeLatest(RoomsTypes.ROOMS_FETCH, fetchRoomsFlow)
  }

  // Hotel Floors
  function * fetchFloors() {
    const { auth: { token } } = yield select()

    return yield call(request, FLOORS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchFloorsFlow() {
    try {
      const data = yield call(fetchFloors)
      yield put(RoomsActions.floorsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchFloorsFlow() {
    yield * takeLatest(RoomsTypes.FLOORS_FETCH, fetchFloorsFlow)
  }

  // Hotel Room Status
  function * fetchRoomStatuses() {
    const { auth: { token } } = yield select()

    return yield call(request, ROOM_STATUSES_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchRoomStatusesFlow() {
    try {
      const data = yield call(fetchRoomStatuses)
      yield put(RoomsActions.roomStatusesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchRoomStatusesFlow() {
    yield * takeLatest(RoomsTypes.ROOM_STATUSES_FETCH, fetchRoomStatusesFlow)
  }

  // Hotel Room Housekeepings
  function * fetchRoomHousekeepings() {
    const { auth: { token } } = yield select()

    return yield call(request, ROOM_HOUSEKEEPINGS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchRoomHousekeepingsFlow() {
    try {
      const data = yield call(fetchRoomHousekeepings)
      yield put(RoomsActions.roomHousekeepingsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchRoomHousekeepingsFlow() {
    yield * takeLatest(RoomsTypes.ROOM_HOUSEKEEPINGS_FETCH, fetchRoomHousekeepingsFlow)
  }

  // Hotel Plannings
  function * fetchPlannings() {
    const { auth: { token } } = yield select()

    return yield call(request, PLANNINGS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchPlanningsFlow() {
    try {
      const data = yield call(fetchPlannings)
      yield put(RoomsActions.planningsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchPlanningsFlow() {
    yield * takeLatest(RoomsTypes.PLANNINGS_FETCH, fetchPlanningsFlow)
  }

  // Hotel Plannings Night
  function * fetchPlanningsNight() {
    const { auth: { token } } = yield select()

    return yield call(request, PLANNINGS_NIGHT_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchPlanningsNightFlow() {
    try {
      const data = yield call(fetchPlanningsNight)
      yield put(RoomsActions.planningsNightSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchPlanningsNightFlow() {
    yield * takeLatest(RoomsTypes.PLANNINGS_NIGHT_FETCH, fetchPlanningsNightFlow)
  }

  // Hotel Calender
  function * fetchCalendar() {
    const { auth: { token } } = yield select()

    return yield call(request, CALENDAR_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchCalendarFlow() {
    try {
      const data = yield call(fetchCalendar)
      yield put(RoomsActions.calendarSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchCalendarFlow() {
    yield * takeLatest(RoomsTypes.CALENDAR_FETCH, fetchCalendarFlow)
  }

  // Hotel Room Notes
  function * fetchRoomNotes() {
    const { auth: { token } } = yield select()

    return yield call(request, ROOM_NOTES_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchRoomNotesFlow() {
    try {
      const data = yield call(fetchRoomNotes)
      yield put(RoomsActions.roomNotesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchRoomNotesFlow() {
    yield * takeLatest(RoomsTypes.ROOM_NOTES_FETCH, fetchRoomNotesFlow)
  }

  // Hotel Catalogs
  function * fetchCatalogs() {
    const { auth: { token } } = yield select()

    return yield call(request, CATALOGS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchCatalogsFlow() {
    try {
      const data = yield call(fetchCatalogs)
      yield put(RoomsActions.catalogsSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchCatalogsFlow() {
    yield * takeLatest(RoomsTypes.CATALOGS_FETCH, fetchCatalogsFlow)
  }

  // Hotel Tasks
  function * fetchTasks() {
    const { auth: { token } } = yield select()

    return yield call(request, TASKS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchTasksFlow() {
    try {
      const data = yield call(fetchTasks)
      yield put(RoomsActions.tasksSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchTasksFlow() {
    yield * takeLatest(RoomsTypes.TASKS_FETCH, fetchTasksFlow)
  }

  return {
    watchTasksFlow,
    watchCatalogsFlow,
    watchRoomNotesFlow,
    watchCalendarFlow,
    watchPlanningsNightFlow,
    watchPlanningsFlow,
    watchRoomHousekeepingsFlow,
    watchRoomStatusesFlow,
    watchFloorsFlow,
    watchRoomsFlow
  }
}
