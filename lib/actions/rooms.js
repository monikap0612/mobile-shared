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

export function updateRoomOptimistic({ roomId, field, value }) {
  return {
    type: RoomsTypes.ROOM_UPDATE_OPTIMISTIC,
    roomId,
    field,
    value
  }
}

export function updateRoom(room) {
  return {
    type: RoomsTypes.ROOM_UPDATE_SUCCESS,
    room
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

export function roomsUpdates(updates) {
  return {
    type: RoomsTypes.ROOMS_UPDATES,
    updates
  }
}

export function roomsUpdateRead(updateId) {
  return {
    type: RoomsTypes.ROOMS_UPDATE_READ,
    updateId
  }
}

export function roomsUnblocks(updates) {
  return {
    type: RoomsTypes.ROOMS_UNBLOCKS,
    updates
  }
}

export function roomsUnblocksRead(updateId) {
  return {
    type: RoomsTypes.ROOMS_UNBLOCKS_READ,
    updateId
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

export function roomCategoriesFetch() {
  return {
    type: RoomsTypes.ROOM_CATEGORY_FETCH
  }
}

export function roomCategoriesSuccess({ roomCategories }) {

  return {
    type: RoomsTypes.ROOM_CATEGORY_SUCCESS,
    roomCategories
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

export function planningsUpdates(updates) {
  return {
    type: RoomsTypes.PLANNINGS_UPDATES,
    updates
  }
}

export function planningsUpdateRead(updateId) {
  return {
    type: RoomsTypes.PLANNINGS_UPDATE_READ,
    updateId
  }
}

export function planningsUpdateOptmistic({ roomId, user, options }) {
  return {
    type: RoomsTypes.PLANNING_UPDATE_OPTIMISTIC,
    roomId,
    user,
    options
  }
}

export function planningsNightFetch() {
  return {
    type: RoomsTypes.PLANNINGS_NIGHT_FETCH
  }
}

export function planningsNightSuccess({ planningNights }) {

  return {
    type: RoomsTypes.PLANNINGS_NIGHT_SUCCESS,
    planningNights
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

export function lostFetch() {
  return {
    type: RoomsTypes.LOST_FETCH
  }
}

export function lostFetchSuccess({ results }) {
  return {
    type: RoomsTypes.LOST_FETCH_SUCCESS,
    results
  }
}

export function foundFetch() {
  return {
    type: RoomsTypes.FOUND_FETCH
  }
}

export function foundFetchSuccess({ results }) {
  return {
    type: RoomsTypes.FOUND_FETCH_SUCCESS,
    results
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

export function taskUpdateOptimistic({ uuid, update }) {
  return {
    type: RoomsTypes.TASK_UPDATE_OPTIMISTIC,
    uuid,
    update
  }
}

export function taskUpdateSuccess({ task }) {
  return {
    type: RoomsTypes.TASK_UPDATE_SUCCESS,
    task
  }
}

export function historyFetch() {
  console.log('Call fetch from action')
  return {
    type: RoomsTypes.HISTORY_FETCH
  }
}

export function historySuccess({ history }) {
  return {
    type: RoomsTypes.HISTORY_SUCCESS,
    history
  }
}

export function guestBookFetch() {
  return {
    type: RoomsTypes.GUEST_BOOK_FETCH
  }
}

export function guestBookFetchSuccess({ results }) {
  return {
    type: RoomsTypes.GUEST_BOOK_FETCH_SUCCESS,
    results
  }
}

export function planningsHostInFetch() {
  return {
    type: RoomsTypes.PLANNINGS_HOSTS_IN_FETCH
  }
}

export function planningsHostInSuccess({ planningHostIns }) {
  return {
    type: RoomsTypes.PLANNINGS_HOSTS_IN_FETCH_SUCCESS,
    planningHostIns
  }
}

export function planningsHostOutFetch() {
  return {
    type: RoomsTypes.PLANNINGS_HOSTS_OUT_FETCH
  }
}

export function planningsHostOutSuccess({ planningHostOuts }) {
  return {
    type: RoomsTypes.PLANNINGS_HOSTS_OUT_FETCH_SUCCESS,
    planningHostOuts
  }
}

export function bookmarkAdd(roomId) {
  return {
    type: RoomsTypes.BOOKMARK_ADD,
    roomId
  }
}

export function bookmarkRemove(roomId) {
  return {
    type: RoomsTypes.BOOKMARK_REMOVE,
    roomId
  }
}

export function bookmarksClear() {
  return {
    type: RoomsTypes.BOOKMARKS_CLEAR
  }
}

export default {
  resetRooms,
  roomsFetch,
  roomsSuccess,
  roomsUpdates,
  roomsUpdateRead,
  roomsUnblocks,
  roomsUnblocksRead,
  updateRoomOptimistic,
  updateRoom,
  floorsFetch,
  floorsSuccess,
  roomStatusesFetch,
  roomStatusesSuccess,
  roomHousekeepingsFetch,
  roomHousekeepingsSuccess,
  roomCategoriesFetch,
  roomCategoriesSuccess,
  planningsFetch,
  planningsSuccess,
  planningsUpdateOptmistic,
  planningsNightFetch,
  planningsNightSuccess,
  planningsRunnerFetch,
  planningsRunnerSuccess,
  planningsUpdates,
  planningsUpdateRead,
  calendarFetch,
  calendarSuccess,
  roomNotesFetch,
  roomNotesSuccess,
  catalogsFetch,
  catalogsSuccess,
  lostFetch,
  lostFetchSuccess,
  foundFetch,
  foundFetchSuccess,
  tasksFetch,
  tasksSuccess,
  taskUpdateOptimistic,
  taskUpdateSuccess,
  historyFetch,
  historySuccess,
  guestBookFetch,
  guestBookFetchSuccess,
  planningsHostInFetch,
  planningsHostInSuccess,
  planningsHostOutFetch,
  planningsHostOutSuccess,
  activateRoom,
  deactivateRoom,
  bookmarkAdd,
  bookmarkRemove,
  bookmarksClear
}
