import UpdatesTypes from '../constants/updates';

export function adjustInventory({ assetRoomId, roomId }) {
  return {
    type: UpdatesTypes.INVENTORY_ADJUST,
    assetRoomId,
    roomId
  }
}

export function resetInventory({ assetRoomId, roomId }) {
  return {
    type: UpdatesTypes.INVENTORY_RESET,
    assetRoomId,
    roomId
  }
}

export function flushInventory({ roomId }) {
  return {
    type: UpdatesTypes.INVENTORY_FLUSH,
    roomId
  }
}

export function restockInventory({ assetRoomId, id }) {
  return {
    type: UpdatesTypes.INVENTORY_RESTOCK,
    assetRoomId,
    id
  }
}

export function roomCleanStart(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_START,
    roomId,
    status: 'cleaning'
  }
}

export function roomCleanRestart(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_RESTART,
    roomId,
    status: 'cleaning'
  }
}

export function roomCleanPause(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_PAUSE,
    roomId,
    status: 'paused'
  }
}

export function roomCleanUnpause(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_UNPAUSE,
    roomId,
    status: 'cleaning'
  }
}

export function roomCleanFinish(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_FINISH,
    roomId,
    status: 'finish'
  }
}

export function roomCleanFlush(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_FLUSH,
    roomId
  }
}

export function roomDelay(roomId) {
  return {
    type: UpdatesTypes.ROOM_DELAY,
    roomId,
    status: 'delay'
  }
}

export function roomDND(roomId) {
  return {
    type: UpdatesTypes.ROOM_DND,
    roomId,
    status: 'dnd'
  }
}

export function roomRefuse(roomId) {
  return {
    type: UpdatesTypes.ROOM_REFUSE,
    roomId,
    status: 'refuse'
  }
}

export function roomNoCheck(roomId) {
  return {
    type: UpdatesTypes.ROOM_NO_CHECK,
    roomId,
    status: 'no-check'
  }
}

export function roomConfirmDND(roomId) {
  return {
    type: UpdatesTypes.ROOM_CONFIRM_DND,
    roomId,
    status: 'confirm-dnd'
  }
}

export function roomReset(roomId) {
  return {
    type: UpdatesTypes.ROOM_RESET,
    roomId
  }
}

export function roomCancel(roomId) {
  return {
    type: UpdatesTypes.ROOM_CANCEL,
    roomId,
    status: ''
  }
}

export function roomNoteAdd({ roomId, note }) {
  return {
    type: UpdatesTypes.ROOM_NOTE_ADD,
    roomId,
    note
  }
}

export function roomNoteRemove({ roomId, noteId }) {
  return {
    type: UpdatesTypes.ROOM_NOTE_REMOVE,
    roomId,
    noteId
  }
}

export function photoUpload({ path, id }) {
  return {
    type: UpdatesTypes.PHOTO_UPLOAD,
    path,
    id
  }
}

export function photoStore({ path, id, url }) {
  return {
    type: UpdatesTypes.PHOTO_STORE,
    path,
    id,
    url
  }
}

export function photoUploadFailure(id) {
  return {
    type: UpdatesTypes.PHOTO_UPLOAD_FAILURE,
    id
  }
}

export function photoRemove(id) {
  return {
    type: UpdatesTypes.PHOTO_REMOVE,
    id
  }
}

export function lostItemAdd({ desc, roomId, photoId }) {
  return {
    type: UpdatesTypes.LOST_ITEM_ADD,
    desc,
    roomId,
    photoId
  }
}

export function lostItemAddSuccess(foundItem) {
  return {
    type: UpdatesTypes.LOST_ITEM_ADD_SUCCESS,
    foundItem
  }
}

export function lostItemAddFailure(error) {
  return {
    type: UpdatesTypes.LOST_ITEM_ADD_FAILURE,
    error
  }
}

export function resetUpdates() {
  return {
    type: UpdatesTypes.UPDATES_RESET
  }
}

export function taskCreate(data) {
  return {
    type: UpdatesTypes.TASK_CREATE,
    data
  }
}

export function taskUpdate({ uuid, status }) {
  return {
    type: UpdatesTypes.TASK_UPDATE,
    uuid,
    status
  }
}

export function roomComment({ roomId, value }) {
  return {
    type: UpdatesTypes.ROOM_COMMENT,
    roomId,
    field: 'comment',
    value
  }
}

export function roomHousekeeping({ roomId, value }) {
  return {
    type: UpdatesTypes.ROOM_HOUSEKEEPING,
    roomId,
    field: 'roomHousekeeping',
    value
  }
}

export function roomRestock({ roomId, value }) {
  return {
    type: UpdatesTypes.ROOM_RESTOCK,
    roomId,
    field: 'isRoomRestocked',
    value
  }
}

export function roomTurndown({ roomId, value }) {
  return {
    type: UpdatesTypes.ROOM_TURNDOWN,
    roomId,
    field: 'turndownService',
    value
  }
}

export function planningUser({ roomId, user, options }) {
  return {
    type: UpdatesTypes.PLANNING_USER,
    roomId,
    user,
    options
  }
}

export function notificationCreate({ user, message, room, photoUrl, photoId, photoPath }) {
  return {
    type: UpdatesTypes.NOTIFICATION_CREATE,
    user,
    message,
    room,
    photoUrl,
    photoId,
    photoPath
  }
}

export default {
  adjustInventory,
  resetInventory,
  flushInventory,
  restockInventory,
  roomCleanStart,
  roomCleanRestart,
  roomCleanPause,
  roomCleanUnpause,
  roomCleanFinish,
  roomCleanFlush,
  roomDelay,
  roomDND,
  roomRefuse,
  roomNoCheck,
  roomConfirmDND,
  roomCancel,
  roomReset,
  roomNoteAdd,
  roomNoteRemove,
  photoUpload,
  photoStore,
  photoUploadFailure,
  photoRemove,
  lostItemAdd,
  lostItemAddSuccess,
  lostItemAddFailure,
  taskCreate,
  taskUpdate,
  resetUpdates,
  roomComment,
  roomHousekeeping,
  roomRestock,
  roomTurndown,
  planningUser,
  notificationCreate
}
