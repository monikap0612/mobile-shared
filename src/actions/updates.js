import UpdatesTypes from '../constants/updates'

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

export function roomCleanPause(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_PAUSE,
    roomId
  }
}

export function roomCleanUnpause(roomId) {
  return {
    type: UpdatesTypes.ROOM_CLEAN_UNPAUSE,
    roomId
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

export default {
  adjustInventory,
  resetInventory,
  flushInventory,
  restockInventory,
  roomCleanStart,
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
  roomNoteAdd,
  roomNoteRemove,
  photoUpload,
  photoStore,
  photoRemove,
  lostItemAdd,
  taskCreate,
  taskUpdate,
  resetUpdates
}
