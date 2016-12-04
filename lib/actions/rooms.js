import RoomsTypes from '../constants/rooms';

export function resetRooms() {
  return {
    type: RoomsTypes.RESET_ROOMS
  }
}

export function activateRoom(roomId, tabIndex) {
  return {
    type: RoomsTypes.ROOM_ACTIVATE,
    roomId,
    tabIndex
  }
}

export function deactivateRoom(roomId) {
  return {
    type: RoomsTypes.ROOM_DEACTIVATE
  }
}

export function roomsFetch() {
  return {
    type: RoomsTypes.ROOMS_FETCH
  }
}

export function roomsSuccess({ rooms }) {

  return {
    type: RoomsTypes.ROOMS_SUCCESS,
    rooms
  }
}

export function floorsFetch() {
  return {
    type: RoomsTypes.FLOORS_FETCH
  }
}

export function floorsSuccess({ floors }) {

  return {
    type: RoomsTypes.FLOORS_SUCCESS,
    floors
  }
}

export function roomStatusesFetch() {
  return {
    type: RoomsTypes.ROOM_STATUSES_FETCH
  }
}

export function roomStatusesSuccess({ roomStatuses }) {

  return {
    type: RoomsTypes.ROOM_STATUSES_SUCCESS,
    roomStatuses
  }
}

export function roomHousekeepingsFetch() {
  return {
    type: RoomsTypes.ROOM_HOUSEKEEPINGS_FETCH
  }
}

export function roomHousekeepingsSuccess({ roomHousekeepings }) {

  return {
    type: RoomsTypes.ROOM_HOUSEKEEPINGS_SUCCESS,
    roomHousekeepings
  }
}

export function planningsFetch() {
  return {
    type: RoomsTypes.PLANNINGS_FETCH
  }
}

export function planningsSuccess({ plannings }) {

  return {
    type: RoomsTypes.PLANNINGS_SUCCESS,
    plannings
  }
}

export function planningsNightFetch() {
  return {
    type: RoomsTypes.PLANNINGS_NIGHT_FETCH
  }
}

export function planningsNightSuccess({ planningsNight }) {

  return {
    type: RoomsTypes.PLANNINGS_NIGHT_SUCCESS,
    planningsNight
  }
}

export function planningsRunnerFetch() {
  return {
    type: RoomsTypes.PLANNINGS_RUNNER_FETCH
  }
}

export function planningsRunnerSuccess({ planningRunners }) {

  return {
    type: RoomsTypes.PLANNINGS_RUNNER_SUCCESS,
    planningRunners
  }
}

export function calendarFetch() {
  return {
    type: RoomsTypes.CALENDAR_FETCH
  }
}

export function calendarSuccess({ results }) {

  return {
    type: RoomsTypes.CALENDAR_SUCCESS,
    results
  }
}

export function roomNotesFetch() {
  return {
    type: RoomsTypes.ROOM_NOTES_FETCH
  }
}

export function roomNotesSuccess({ results }) {

  return {
    type: RoomsTypes.ROOM_NOTES_SUCCESS,
    results
  }
}

export function catalogsFetch() {
  return {
    type: RoomsTypes.CATALOGS_FETCH
  }
}

export function catalogsSuccess({ catalogs }) {

  return {
    type: RoomsTypes.CATALOGS_SUCCESS,
    catalogs
  }
}

export function tasksFetch() {
  return {
    type: RoomsTypes.TASKS_FETCH
  }
}

export function tasksSuccess({ tasks }) {

  return {
    type: RoomsTypes.TASKS_SUCCESS,
    tasks
  }
}

export function taskUpdateSuccess({ task }) {
  return {
    type: RoomsTypes.TASK_UPDATE_SUCCESS,
    task
  }
}

export default {
  resetRooms,
  roomsFetch,
  roomsSuccess,
  floorsFetch,
  floorsSuccess,
  roomStatusesFetch,
  roomStatusesSuccess,
  roomHousekeepingsFetch,
  roomHousekeepingsSuccess,
  planningsFetch,
  planningsSuccess,
  planningsNightFetch,
  planningsNightSuccess,
  planningsRunnerFetch,
  planningsRunnerSuccess,
  calendarFetch,
  calendarSuccess,
  roomNotesFetch,
  roomNotesSuccess,
  catalogsFetch,
  catalogsSuccess,
  tasksFetch,
  tasksSuccess,
  taskUpdateSuccess,
  activateRoom,
  deactivateRoom
}
