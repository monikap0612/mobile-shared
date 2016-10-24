'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.updateRoom = updateRoom;
exports.logClean = logClean;
exports.logOther = logOther;
exports.updateRoomFlow = updateRoomFlow;
exports.watchUpdateRoomFinish = watchUpdateRoomFinish;
exports.watchUpdateRoomCleaning = watchUpdateRoomCleaning;
exports.watchUpdateRoomDelay = watchUpdateRoomDelay;
exports.watchUpdateRoomDND = watchUpdateRoomDND;
exports.watchUpdateRoomRefuse = watchUpdateRoomRefuse;
exports.watchUpdateRoomNoCheck = watchUpdateRoomNoCheck;
exports.watchUpdateRoomConfirmDND = watchUpdateRoomConfirmDND;
exports.watchUpdateRoomCancel = watchUpdateRoomCancel;
exports.createRoomNote = createRoomNote;
exports.createRoomNoteFlow = createRoomNoteFlow;
exports.watchCreateRoomNote = watchCreateRoomNote;
exports.removeRoomNote = removeRoomNote;
exports.removeRoomNoteFlow = removeRoomNoteFlow;
exports.watchRemoveRoomNote = watchRemoveRoomNote;
exports.uploadPhoto = uploadPhoto;
exports.uploadPhotoFlow = uploadPhotoFlow;
exports.watchUploadPhoto = watchUploadPhoto;
exports.submitLostItem = submitLostItem;
exports.addLostItemFlow = addLostItemFlow;
exports.watchAddLostItem = watchAddLostItem;
exports.submitInventoryWithdrawl = submitInventoryWithdrawl;
exports.submitInventoryWithdrawlFlow = submitInventoryWithdrawlFlow;
exports.watchSubmitInventoryWithdrawal = watchSubmitInventoryWithdrawal;
exports.submitInventoryRestock = submitInventoryRestock;
exports.submitInventoryRestockFlow = submitInventoryRestockFlow;
exports.watchSubmitInventoryRestock = watchSubmitInventoryRestock;
exports.createTask = createTask;
exports.createVirtualAsset = createVirtualAsset;
exports.createTaskFlow = createTaskFlow;
exports.watchCreateTaskFlow = watchCreateTaskFlow;
exports.updateTask = updateTask;
exports.updateTaskFlow = updateTaskFlow;
exports.watchUpdateTaskFlow = watchUpdateTaskFlow;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactNativeFetchBlob = require('react-native-fetch-blob');

var _reactNativeFetchBlob2 = _interopRequireDefault(_reactNativeFetchBlob);

var _object = require('lodash/object');

var _collection = require('lodash/collection');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _digestAssignment = require('../utils/digest-assignment');

var _digestAssignment2 = _interopRequireDefault(_digestAssignment);

var _updates = require('../constants/updates');

var _updates2 = _interopRequireDefault(_updates);

var _updates3 = require('../actions/updates');

var _updates4 = _interopRequireDefault(_updates3);

var _assets = require('../actions/assets');

var _assets2 = _interopRequireDefault(_assets);

var _rooms = require('../actions/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _overlay = require('../actions/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ROOM_UPDATE_API = _api2['default'] + '/room_update';
var ROOM_LOG_CLEAN_API = _api2['default'] + '/attendant';
var ROOM_NOTES_API = _api2['default'] + '/room_notes';
var IMAGE_UPLOAD_API = 'http://api.roomchecking.com:3054/image-upload';
var LOST_ITEM_API = _api2['default'] + '/lost_found/founds';
var INVENTORY_API = _api2['default'] + '/hotel_inventory';
var TASK_API = _api2['default'] + '/tasks';
var VIRTUAL_ASSETS_API = _api2['default'] + '/virtual_assets';

// Update Room
function* updateRoom(_ref) {
  var roomId = _ref.roomId;
  var status = _ref.status;

  var _ref2 = yield (0, _effects.select)();

  var _ref2$auth = _ref2.auth;
  var hotelId = _ref2$auth.hotelId;
  var token = _ref2$auth.token;
  var user = _ref2$auth.user;


  return yield (0, _effects.call)(_request2['default'], ROOM_UPDATE_API + '/' + roomId, {
    method: 'PUT',
    body: JSON.stringify({
      attendantStatus: status,
      session: { user: user.asMutable() },
      platform: 'attendant'
    }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* logClean(_ref3) {
  var roomId = _ref3.roomId;

  var _ref4 = yield (0, _effects.select)();

  var _ref4$auth = _ref4.auth;
  var hotelId = _ref4$auth.hotelId;
  var token = _ref4$auth.token;
  var user = _ref4$auth.user;
  var roomUpdates = _ref4.updates.rooms;
  var hotelRooms = _ref4.rooms.hotelRooms;

  var room = (0, _collection.find)(hotelRooms, { _id: roomId });
  var roomUpdate = (0, _object.get)(roomUpdates, roomId, {});

  if (!room || !(0, _object.get)(roomUpdate, 'startTime')) {
    return;
  }

  var data = {
    id: null,
    hotel_id: hotelId,
    room_id: roomId,
    room_name: room.name,
    start_ts: (0, _object.get)(roomUpdate, 'startTime'),
    end_ts: (0, _moment2['default'])().unix(),
    start_user_id: user._id,
    start_username: user.username,
    start_email: user.email,
    start_firstname: user.first_name,
    start_lastname: user.last_name,
    end_user_id: user._id,
    end_username: user.username,
    end_email: user.email,
    end_firstname: user.first_name,
    end_lastname: user.last_name,
    paused_time: (0, _object.get)(roomUpdate, 'pauseTime')
  };

  return yield (0, _effects.call)(_request2['default'], ROOM_LOG_CLEAN_API + '/' + roomId + '/' + user._id + '/cleaned', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* logOther(_ref5) {
  var roomId = _ref5.roomId;
  var status = _ref5.status;

  var _ref6 = yield (0, _effects.select)();

  var _ref6$auth = _ref6.auth;
  var hotelId = _ref6$auth.hotelId;
  var token = _ref6$auth.token;
  var user = _ref6$auth.user;
  var roomUpdates = _ref6.updates.rooms;
  var hotelRooms = _ref6.rooms.hotelRooms;

  var room = (0, _collection.find)(hotelRooms, { _id: roomId });

  var data = {
    date_ts: (0, _moment2['default'])().unix(),
    hotel_id: hotelId,
    room_id: roomId,
    room_name: room.name,
    user_id: user._id,
    user_username: user.username,
    user_email: user.email,
    user_firstname: user.first_name,
    user_lastname: user.last_name,
    attendant_status: status,
    image: ''
  };

  return yield (0, _effects.call)(_request2['default'], ROOM_LOG_CLEAN_API + '/' + roomId + '/' + user._id + '/log_other', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* updateRoomFlow(_ref7) {
  var roomId = _ref7.roomId;
  var status = _ref7.status;

  try {
    var response = yield (0, _effects.call)(updateRoom, { roomId: roomId, status: status });

    if (['dnd', 'refuse', 'delay', 'confirm-dnd'].includes(status)) {
      yield (0, _effects.call)(logOther, { roomId: roomId, status: status });
    }

    if (status === 'finish') {
      yield (0, _effects.call)(logClean, { roomId: roomId });
      yield (0, _effects.put)(_updates4['default'].roomCleanFlush(roomId));
    }
    yield (0, _effects.put)(_rooms2['default'].roomsFetch());
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchUpdateRoomFinish(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CLEAN_FINISH, updateRoomFlow);
}

function* watchUpdateRoomCleaning(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CLEAN_START, updateRoomFlow);
}

function* watchUpdateRoomDelay(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_DELAY, updateRoomFlow);
}

function* watchUpdateRoomDND(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_DND, updateRoomFlow);
}

function* watchUpdateRoomRefuse(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_REFUSE, updateRoomFlow);
}

function* watchUpdateRoomNoCheck(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_NO_CHECK, updateRoomFlow);
}

function* watchUpdateRoomConfirmDND(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CONFIRM_DND, updateRoomFlow);
}

function* watchUpdateRoomCancel(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CANCEL, updateRoomFlow);
}

// Room Notes
function* createRoomNote(_ref8) {
  var roomId = _ref8.roomId;
  var note = _ref8.note;

  var _ref9 = yield (0, _effects.select)();

  var _ref9$auth = _ref9.auth;
  var hotelId = _ref9$auth.hotelId;
  var token = _ref9$auth.token;
  var user = _ref9$auth.user;
  var userId = _ref9$auth.userId;


  return yield (0, _effects.call)(_request2['default'], ROOM_NOTES_API + '/' + roomId, {
    method: 'POST',
    body: JSON.stringify({
      note: note,
      userId: userId,
      application: 'attendant'
    }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* createRoomNoteFlow(_ref10) {
  var roomId = _ref10.roomId;
  var note = _ref10.note;

  try {
    var response = yield (0, _effects.call)(createRoomNote, { roomId: roomId, note: note });
    yield (0, _effects.put)(_rooms2['default'].roomNotesFetch());
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchCreateRoomNote(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_NOTE_ADD, createRoomNoteFlow);
}

function* removeRoomNote(_ref11) {
  var roomId = _ref11.roomId;
  var noteId = _ref11.noteId;

  var _ref12 = yield (0, _effects.select)();

  var _ref12$auth = _ref12.auth;
  var hotelId = _ref12$auth.hotelId;
  var token = _ref12$auth.token;
  var user = _ref12$auth.user;
  var userId = _ref12$auth.userId;


  return yield (0, _effects.call)(_request2['default'], ROOM_NOTES_API + '/' + roomId + '/' + noteId, {
    method: 'PUT',
    body: JSON.stringify({}),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* removeRoomNoteFlow(_ref13) {
  var roomId = _ref13.roomId;
  var noteId = _ref13.noteId;

  try {
    var response = yield (0, _effects.call)(removeRoomNote, { roomId: roomId, noteId: noteId });
    yield (0, _effects.put)(_rooms2['default'].roomNotesFetch());
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchRemoveRoomNote() {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_NOTE_REMOVE, removeRoomNoteFlow);
}

// Image Upload
function uploadPhoto(_ref14) {
  var path = _ref14.path;

  return _reactNativeFetchBlob2['default'].fetch('POST', IMAGE_UPLOAD_API, {
    'Content-Type': 'multipart/form-data'
  }, [{
    name: 'file',
    filename: 'photo.jpg',
    data: _reactNativeFetchBlob2['default'].wrap(path)
  }]);
}

function* uploadPhotoFlow(_ref15) {
  var path = _ref15.path;
  var id = _ref15.id;

  try {
    var response = yield (0, _effects.call)(uploadPhoto, { path: path });
    yield (0, _effects.put)(_updates4['default'].photoStore({ path: path, id: id, url: JSON.parse(response.data).url }));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchUploadPhoto() {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].PHOTO_UPLOAD, uploadPhotoFlow);
}

function* submitLostItem(_ref16) {
  var desc = _ref16.desc;
  var roomId = _ref16.roomId;
  var photoId = _ref16.photoId;

  var _ref17 = yield (0, _effects.select)();

  var _ref17$auth = _ref17.auth;
  var hotelId = _ref17$auth.hotelId;
  var token = _ref17$auth.token;
  var user = _ref17$auth.user;
  var userId = _ref17$auth.userId;
  var photos = _ref17.updates.photos;

  var photoUrl = photoId ? (0, _object.get)(photos, [photoId, 'url'], null) : null;

  return yield (0, _effects.call)(_request2['default'], LOST_ITEM_API + '/' + roomId, {
    method: 'POST',
    body: JSON.stringify({
      nameOrDescription: desc,
      image: photoUrl,
      userId: userId
    }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* addLostItemFlow(_ref18) {
  var desc = _ref18.desc;
  var roomId = _ref18.roomId;
  var photoId = _ref18.photoId;


  try {
    var response = yield (0, _effects.call)(submitLostItem, { desc: desc, roomId: roomId, photoId: photoId });
    console.log(response);

    if (photoId) {
      yield (0, _effects.put)(_updates4['default'].photoRemove(photoId));
    }
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchAddLostItem() {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].LOST_ITEM_ADD, addLostItemFlow);
}

function* submitInventoryWithdrawl(_ref19) {
  var asset = _ref19.asset;
  var change = _ref19.change;
  var roomId = _ref19.roomId;

  var _ref20 = yield (0, _effects.select)();

  var _ref20$auth = _ref20.auth;
  var hotelId = _ref20$auth.hotelId;
  var token = _ref20$auth.token;
  var user = _ref20$auth.user;
  var userId = _ref20$auth.userId;


  var data = {
    userId: userId,
    roomId: roomId,
    withdrawal: -1 * change
  };

  return yield (0, _effects.call)(_request2['default'], INVENTORY_API + '/' + asset._id + '/withdrawal', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* submitInventoryWithdrawlFlow(_ref21) {
  var roomId = _ref21.roomId;

  var _ref22 = yield (0, _effects.select)();

  var inventory = _ref22.updates.inventory;
  var hotelAssetRooms = _ref22.assets.hotelAssetRooms;

  var roomChanges = (0, _object.get)(inventory, roomId, {});
  var assetIds = (0, _object.keys)(roomChanges);
  var roomAssets = (0, _collection.filter)(hotelAssetRooms, function (a) {
    return (0, _collection.includes)(assetIds, (0, _object.get)(a, '_id'));
  });
  var filteredAssets = (0, _collection.filter)(roomAssets, function (a) {
    return (0, _object.get)(roomChanges, (0, _object.get)(a, '_id'), 0) > 0 && (0, _object.get)(a, 'assetType', null) === 'stock';
  });

  if (!filteredAssets || !filteredAssets.length) {
    return;
  }

  yield (0, _effects.put)(_overlay2['default'].overlayShow({ message: 'Updating' }));

  try {
    console.log(filteredAssets);
    yield filteredAssets.map(function (asset) {
      return (0, _effects.call)(submitInventoryWithdrawl, { asset: asset, change: -1 * (0, _object.get)(roomChanges, asset._id, 1), roomId: roomId });
    });
    yield filteredAssets.map(function (asset) {
      return (0, _effects.put)(_updates4['default'].resetInventory({ assetRoomId: asset._id, roomId: roomId }));
    });
  } catch (e) {
    console.log(e);
  } finally {
    yield (0, _effects.put)(_overlay2['default'].overlayHide());
  }
}

function* watchSubmitInventoryWithdrawal() {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].INVENTORY_FLUSH, submitInventoryWithdrawlFlow);
}

// Hotel Inventory Restock
function* submitInventoryRestock(_ref23) {
  var assetRoomId = _ref23.assetRoomId;
  var id = _ref23.id;

  var _ref24 = yield (0, _effects.select)();

  var _ref24$auth = _ref24.auth;
  var hotelId = _ref24$auth.hotelId;
  var token = _ref24$auth.token;
  var user = _ref24$auth.user;
  var userId = _ref24$auth.userId;


  return yield (0, _effects.call)(_request2['default'], INVENTORY_API + '/' + assetRoomId + '/withdrawal/' + id, {
    method: 'PUT',
    body: JSON.stringify({
      is_restocked: 1
    }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* submitInventoryRestockFlow(_ref25) {
  var assetRoomId = _ref25.assetRoomId;
  var id = _ref25.id;


  try {
    var response = yield (0, _effects.call)(submitInventoryRestock, { assetRoomId: assetRoomId, id: id });
    yield (0, _effects.put)(_assets2['default'].inventoryWithdrawalFetch());
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchSubmitInventoryRestock() {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].INVENTORY_RESTOCK, submitInventoryRestockFlow);
}

// Hotel Tasks
function* createTask(task) {
  var _ref26 = yield (0, _effects.select)();

  var _ref26$auth = _ref26.auth;
  var hotelId = _ref26$auth.hotelId;
  var token = _ref26$auth.token;
  var userId = _ref26$auth.userId;


  return yield (0, _effects.call)(_request2['default'], TASK_API, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* createVirtualAsset(_ref27) {
  var name = _ref27.name;
  var image = _ref27.image;

  var _ref28 = yield (0, _effects.select)();

  var _ref28$auth = _ref28.auth;
  var hotelId = _ref28$auth.hotelId;
  var token = _ref28$auth.token;
  var userId = _ref28$auth.userId;


  return yield (0, _effects.call)(_request2['default'], VIRTUAL_ASSETS_API, {
    method: 'POST',
    body: JSON.stringify({ name: name, image: image }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* createTaskFlow(_ref29) {
  var data = _ref29.data;

  var _ref30 = yield (0, _effects.select)();

  var _ref30$auth = _ref30.auth;
  var hotelId = _ref30$auth.hotelId;
  var token = _ref30$auth.token;
  var userId = _ref30$auth.userId;
  var hotel = _ref30$auth.hotel;
  var photos = _ref30.updates.photos;
  var _ref30$users = _ref30.users;
  var users = _ref30$users.users;
  var hotelGroups = _ref30$users.hotelGroups;

  var image = (0, _object.get)(data, 'photoId') && (0, _object.get)(photos, [(0, _object.get)(data, 'photoId'), 'url'], null) || (0, _object.get)(data, 'asset.image', null);

  var asset = (0, _object.get)(data, 'asset', null);
  var action = (0, _object.get)(data, 'action', null);

  var taskAssignment = (0, _digestAssignment2['default'])(data.assignments, users, hotelGroups);

  var task = {
    creator_id: userId,
    task: null,
    type: 'quick',
    meta: _extends({
      room_id: (0, _object.get)(data, 'room._id', null),
      location: (0, _object.get)(data, 'room.name', null),
      image: image,
      isBlocking: (0, _object.get)(data, 'isBlocking', false)
    }, taskAssignment.meta),
    guest_info: {
      guest_name: null
    },
    assigned: _extends({
      is_mandatory: (0, _object.get)(data, 'isMandatory', false)
    }, taskAssignment.assigned),
    start_date: (0, _moment2['default'])().format('YYYY-MM-DD'),
    due_date: (0, _moment2['default'])().format('YYYY-MM-DD'),
    is_required: 1,
    is_optional: 0,
    is_priority: (0, _object.get)(data, 'isPriority', false),
    is_group: 0
  };

  try {

    if ((0, _object.get)(data, 'createdAsset')) {
      var newAsset = yield (0, _effects.call)(createVirtualAsset, {
        name: (0, _object.get)(data, 'createdAsset'),
        image: image
      });
      asset = (0, _object.get)(newAsset, 'virtualAsset');
    }

    if (asset) {
      task.task = (0, _object.get)(asset, 'name');
      if ((0, _object.has)(asset, 'isStayPlanner')) {
        task.meta.virtual_asset_id = (0, _object.get)(asset, '_id');
      } else {
        task.meta.asset_id = (0, _object.get)(asset, '_id');
      }
    } else {
      task.task = (0, _object.get)(data, 'desc');
      task.type = 'lite';
    }

    if (asset && action) {
      task.meta.action = action;
      task.task = task.task + ': ' + action.label;
      if ((0, _object.get)(action, 'body.task_type')) {
        task.type = (0, _object.get)(action, 'body.task_type');
      }
      if ((0, _object.get)(action, 'body.estimated_time')) {
        task.meta.estimatedTime = (0, _object.get)(action, 'body.estimated_time');
      }
      if ((0, _object.get)(action, 'body.is_mandatory')) {
        task.assigned.is_mandatory = true;
      };
      if ((0, _object.get)(action, 'body.default_assignment')) {
        var defaultAssignment = (0, _object.get)(choosenAction, 'body.default_assignment');
        var defaultAssignmentLabel = defaultAssignment.split(':')[0];

        task.assigned.label = defaultAssignmentLabel;
        task.assigned.isDefaultAssignment = true;
      }
    }

    if (asset && (0, _object.get)(data, 'desc')) {
      task.messages = [{
        userId: userId,
        message: (0, _object.get)(data, 'desc'),
        date_ts: (0, _moment2['default'])().unix()
      }];
    }

    var response = yield (0, _effects.call)(createTask, task);

    if (hotel.isAttendantTaskNotes) {
      console.log('here');
    }

    yield (0, _effects.put)(_rooms2['default'].tasksFetch());
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchCreateTaskFlow() {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].TASK_CREATE, createTaskFlow);
}

function* updateTask(_ref31) {
  var uuid = _ref31.uuid;
  var status = _ref31.status;

  var _ref32 = yield (0, _effects.select)();

  var _ref32$auth = _ref32.auth;
  var hotelId = _ref32$auth.hotelId;
  var token = _ref32$auth.token;
  var userId = _ref32$auth.userId;


  return yield (0, _effects.call)(_request2['default'], TASK_API + '/' + uuid, {
    method: 'PUT',
    body: JSON.stringify({
      status: status,
      update_type: 'status',
      user_id: userId
    }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function* updateTaskFlow(_ref33) {
  var uuid = _ref33.uuid;
  var status = _ref33.status;

  try {
    var _ref34 = yield (0, _effects.call)(updateTask, { uuid: uuid, status: status });

    var task = _ref34.task;

    yield (0, _effects.put)(_rooms2['default'].taskUpdateSuccess({ task: task }));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchUpdateTaskFlow(state) {
  yield* (0, _reduxSaga.takeEvery)(_updates2['default'].TASK_UPDATE, updateTaskFlow);
}