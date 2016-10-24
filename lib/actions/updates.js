'use strict';

exports.__esModule = true;
exports.adjustInventory = adjustInventory;
exports.resetInventory = resetInventory;
exports.flushInventory = flushInventory;
exports.restockInventory = restockInventory;
exports.roomCleanStart = roomCleanStart;
exports.roomCleanRestart = roomCleanRestart;
exports.roomCleanPause = roomCleanPause;
exports.roomCleanUnpause = roomCleanUnpause;
exports.roomCleanFinish = roomCleanFinish;
exports.roomCleanFlush = roomCleanFlush;
exports.roomDelay = roomDelay;
exports.roomDND = roomDND;
exports.roomRefuse = roomRefuse;
exports.roomNoCheck = roomNoCheck;
exports.roomConfirmDND = roomConfirmDND;
exports.roomCancel = roomCancel;
exports.roomNoteAdd = roomNoteAdd;
exports.roomNoteRemove = roomNoteRemove;
exports.photoUpload = photoUpload;
exports.photoStore = photoStore;
exports.photoRemove = photoRemove;
exports.lostItemAdd = lostItemAdd;
exports.resetUpdates = resetUpdates;
exports.taskCreate = taskCreate;
exports.taskUpdate = taskUpdate;

var _updates = require('../constants/updates');

var _updates2 = _interopRequireDefault(_updates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function adjustInventory(_ref) {
  var assetRoomId = _ref.assetRoomId;
  var roomId = _ref.roomId;

  return {
    type: _updates2['default'].INVENTORY_ADJUST,
    assetRoomId: assetRoomId,
    roomId: roomId
  };
}

function resetInventory(_ref2) {
  var assetRoomId = _ref2.assetRoomId;
  var roomId = _ref2.roomId;

  return {
    type: _updates2['default'].INVENTORY_RESET,
    assetRoomId: assetRoomId,
    roomId: roomId
  };
}

function flushInventory(_ref3) {
  var roomId = _ref3.roomId;

  return {
    type: _updates2['default'].INVENTORY_FLUSH,
    roomId: roomId
  };
}

function restockInventory(_ref4) {
  var assetRoomId = _ref4.assetRoomId;
  var id = _ref4.id;

  return {
    type: _updates2['default'].INVENTORY_RESTOCK,
    assetRoomId: assetRoomId,
    id: id
  };
}

function roomCleanStart(roomId) {
  return {
    type: _updates2['default'].ROOM_CLEAN_START,
    roomId: roomId,
    status: 'cleaning'
  };
}

function roomCleanRestart(roomId) {
  return {
    type: _updates2['default'].ROOM_CLEAN_RESTART,
    roomId: roomId,
    status: 'cleaning'
  };
}

function roomCleanPause(roomId) {
  return {
    type: _updates2['default'].ROOM_CLEAN_PAUSE,
    roomId: roomId
  };
}

function roomCleanUnpause(roomId) {
  return {
    type: _updates2['default'].ROOM_CLEAN_UNPAUSE,
    roomId: roomId
  };
}

function roomCleanFinish(roomId) {
  return {
    type: _updates2['default'].ROOM_CLEAN_FINISH,
    roomId: roomId,
    status: 'finish'
  };
}

function roomCleanFlush(roomId) {
  return {
    type: _updates2['default'].ROOM_CLEAN_FLUSH,
    roomId: roomId
  };
}

function roomDelay(roomId) {
  return {
    type: _updates2['default'].ROOM_DELAY,
    roomId: roomId,
    status: 'delay'
  };
}

function roomDND(roomId) {
  return {
    type: _updates2['default'].ROOM_DND,
    roomId: roomId,
    status: 'dnd'
  };
}

function roomRefuse(roomId) {
  return {
    type: _updates2['default'].ROOM_REFUSE,
    roomId: roomId,
    status: 'refuse'
  };
}

function roomNoCheck(roomId) {
  return {
    type: _updates2['default'].ROOM_NO_CHECK,
    roomId: roomId,
    status: 'no-check'
  };
}

function roomConfirmDND(roomId) {
  return {
    type: _updates2['default'].ROOM_CONFIRM_DND,
    roomId: roomId,
    status: 'confirm-dnd'
  };
}

function roomCancel(roomId) {
  return {
    type: _updates2['default'].ROOM_CANCEL,
    roomId: roomId,
    status: ''
  };
}

function roomNoteAdd(_ref5) {
  var roomId = _ref5.roomId;
  var note = _ref5.note;

  return {
    type: _updates2['default'].ROOM_NOTE_ADD,
    roomId: roomId,
    note: note
  };
}

function roomNoteRemove(_ref6) {
  var roomId = _ref6.roomId;
  var noteId = _ref6.noteId;

  return {
    type: _updates2['default'].ROOM_NOTE_REMOVE,
    roomId: roomId,
    noteId: noteId
  };
}

function photoUpload(_ref7) {
  var path = _ref7.path;
  var id = _ref7.id;

  return {
    type: _updates2['default'].PHOTO_UPLOAD,
    path: path,
    id: id
  };
}

function photoStore(_ref8) {
  var path = _ref8.path;
  var id = _ref8.id;
  var url = _ref8.url;

  return {
    type: _updates2['default'].PHOTO_STORE,
    path: path,
    id: id,
    url: url
  };
}

function photoRemove(id) {
  return {
    type: _updates2['default'].PHOTO_REMOVE,
    id: id
  };
}

function lostItemAdd(_ref9) {
  var desc = _ref9.desc;
  var roomId = _ref9.roomId;
  var photoId = _ref9.photoId;

  return {
    type: _updates2['default'].LOST_ITEM_ADD,
    desc: desc,
    roomId: roomId,
    photoId: photoId
  };
}

function resetUpdates() {
  return {
    type: _updates2['default'].UPDATES_RESET
  };
}

function taskCreate(data) {
  return {
    type: _updates2['default'].TASK_CREATE,
    data: data
  };
}

function taskUpdate(_ref10) {
  var uuid = _ref10.uuid;
  var status = _ref10.status;

  return {
    type: _updates2['default'].TASK_UPDATE,
    uuid: uuid,
    status: status
  };
}

exports['default'] = {
  adjustInventory: adjustInventory,
  resetInventory: resetInventory,
  flushInventory: flushInventory,
  restockInventory: restockInventory,
  roomCleanStart: roomCleanStart,
  roomCleanRestart: roomCleanRestart,
  roomCleanPause: roomCleanPause,
  roomCleanUnpause: roomCleanUnpause,
  roomCleanFinish: roomCleanFinish,
  roomCleanFlush: roomCleanFlush,
  roomDelay: roomDelay,
  roomDND: roomDND,
  roomRefuse: roomRefuse,
  roomNoCheck: roomNoCheck,
  roomConfirmDND: roomConfirmDND,
  roomCancel: roomCancel,
  roomNoteAdd: roomNoteAdd,
  roomNoteRemove: roomNoteRemove,
  photoUpload: photoUpload,
  photoStore: photoStore,
  photoRemove: photoRemove,
  lostItemAdd: lostItemAdd,
  taskCreate: taskCreate,
  taskUpdate: taskUpdate,
  resetUpdates: resetUpdates
};