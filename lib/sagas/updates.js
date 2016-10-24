'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;

  var ROOM_UPDATE_API = apiUrl + '/room_update';
  var ROOM_LOG_CLEAN_API = apiUrl + '/attendant';
  var ROOM_NOTES_API = apiUrl + '/room_notes';
  var IMAGE_UPLOAD_API = 'http://api.roomchecking.com:3054/image-upload';
  var LOST_ITEM_API = apiUrl + '/lost_found/founds';
  var INVENTORY_API = apiUrl + '/hotel_inventory';
  var TASK_API = apiUrl + '/tasks';
  var VIRTUAL_ASSETS_API = apiUrl + '/virtual_assets';

  // Update Room
  function* updateRoom(_ref2) {
    var roomId = _ref2.roomId;
    var status = _ref2.status;

    var _ref3 = yield (0, _effects.select)();

    var _ref3$auth = _ref3.auth;
    var hotelId = _ref3$auth.hotelId;
    var token = _ref3$auth.token;
    var user = _ref3$auth.user;


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

  function* logClean(_ref4) {
    var roomId = _ref4.roomId;

    var _ref5 = yield (0, _effects.select)();

    var _ref5$auth = _ref5.auth;
    var hotelId = _ref5$auth.hotelId;
    var token = _ref5$auth.token;
    var user = _ref5$auth.user;
    var roomUpdates = _ref5.updates.rooms;
    var hotelRooms = _ref5.rooms.hotelRooms;

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

  function* logOther(_ref6) {
    var roomId = _ref6.roomId;
    var status = _ref6.status;

    var _ref7 = yield (0, _effects.select)();

    var _ref7$auth = _ref7.auth;
    var hotelId = _ref7$auth.hotelId;
    var token = _ref7$auth.token;
    var user = _ref7$auth.user;
    var roomUpdates = _ref7.updates.rooms;
    var hotelRooms = _ref7.rooms.hotelRooms;

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

  function* updateRoomFlow(_ref8) {
    var roomId = _ref8.roomId;
    var status = _ref8.status;

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
  function* createRoomNote(_ref9) {
    var roomId = _ref9.roomId;
    var note = _ref9.note;

    var _ref10 = yield (0, _effects.select)();

    var _ref10$auth = _ref10.auth;
    var hotelId = _ref10$auth.hotelId;
    var token = _ref10$auth.token;
    var user = _ref10$auth.user;
    var userId = _ref10$auth.userId;


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

  function* createRoomNoteFlow(_ref11) {
    var roomId = _ref11.roomId;
    var note = _ref11.note;

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

  function* removeRoomNote(_ref12) {
    var roomId = _ref12.roomId;
    var noteId = _ref12.noteId;

    var _ref13 = yield (0, _effects.select)();

    var _ref13$auth = _ref13.auth;
    var hotelId = _ref13$auth.hotelId;
    var token = _ref13$auth.token;
    var user = _ref13$auth.user;
    var userId = _ref13$auth.userId;


    return yield (0, _effects.call)(_request2['default'], ROOM_NOTES_API + '/' + roomId + '/' + noteId, {
      method: 'PUT',
      body: JSON.stringify({}),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  function* removeRoomNoteFlow(_ref14) {
    var roomId = _ref14.roomId;
    var noteId = _ref14.noteId;

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
  function uploadPhoto(_ref15) {
    var path = _ref15.path;

    return _reactNativeFetchBlob2['default'].fetch('POST', IMAGE_UPLOAD_API, {
      'Content-Type': 'multipart/form-data'
    }, [{
      name: 'file',
      filename: 'photo.jpg',
      data: _reactNativeFetchBlob2['default'].wrap(path)
    }]);
  }

  function* uploadPhotoFlow(_ref16) {
    var path = _ref16.path;
    var id = _ref16.id;

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

  function* submitLostItem(_ref17) {
    var desc = _ref17.desc;
    var roomId = _ref17.roomId;
    var photoId = _ref17.photoId;

    var _ref18 = yield (0, _effects.select)();

    var _ref18$auth = _ref18.auth;
    var hotelId = _ref18$auth.hotelId;
    var token = _ref18$auth.token;
    var user = _ref18$auth.user;
    var userId = _ref18$auth.userId;
    var photos = _ref18.updates.photos;

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

  function* addLostItemFlow(_ref19) {
    var desc = _ref19.desc;
    var roomId = _ref19.roomId;
    var photoId = _ref19.photoId;


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

  function* submitInventoryWithdrawl(_ref20) {
    var asset = _ref20.asset;
    var change = _ref20.change;
    var roomId = _ref20.roomId;

    var _ref21 = yield (0, _effects.select)();

    var _ref21$auth = _ref21.auth;
    var hotelId = _ref21$auth.hotelId;
    var token = _ref21$auth.token;
    var user = _ref21$auth.user;
    var userId = _ref21$auth.userId;


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

  function* submitInventoryWithdrawlFlow(_ref22) {
    var roomId = _ref22.roomId;

    var _ref23 = yield (0, _effects.select)();

    var inventory = _ref23.updates.inventory;
    var hotelAssetRooms = _ref23.assets.hotelAssetRooms;

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
  function* submitInventoryRestock(_ref24) {
    var assetRoomId = _ref24.assetRoomId;
    var id = _ref24.id;

    var _ref25 = yield (0, _effects.select)();

    var _ref25$auth = _ref25.auth;
    var hotelId = _ref25$auth.hotelId;
    var token = _ref25$auth.token;
    var user = _ref25$auth.user;
    var userId = _ref25$auth.userId;


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

  function* submitInventoryRestockFlow(_ref26) {
    var assetRoomId = _ref26.assetRoomId;
    var id = _ref26.id;


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
    var _ref27 = yield (0, _effects.select)();

    var _ref27$auth = _ref27.auth;
    var hotelId = _ref27$auth.hotelId;
    var token = _ref27$auth.token;
    var userId = _ref27$auth.userId;


    return yield (0, _effects.call)(_request2['default'], TASK_API, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  function* createVirtualAsset(_ref28) {
    var name = _ref28.name;
    var image = _ref28.image;

    var _ref29 = yield (0, _effects.select)();

    var _ref29$auth = _ref29.auth;
    var hotelId = _ref29$auth.hotelId;
    var token = _ref29$auth.token;
    var userId = _ref29$auth.userId;


    return yield (0, _effects.call)(_request2['default'], VIRTUAL_ASSETS_API, {
      method: 'POST',
      body: JSON.stringify({ name: name, image: image }),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  function* createTaskFlow(_ref30) {
    var data = _ref30.data;

    var _ref31 = yield (0, _effects.select)();

    var _ref31$auth = _ref31.auth;
    var hotelId = _ref31$auth.hotelId;
    var token = _ref31$auth.token;
    var userId = _ref31$auth.userId;
    var hotel = _ref31$auth.hotel;
    var photos = _ref31.updates.photos;
    var _ref31$users = _ref31.users;
    var users = _ref31$users.users;
    var hotelGroups = _ref31$users.hotelGroups;

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

  function* updateTask(_ref32) {
    var uuid = _ref32.uuid;
    var status = _ref32.status;

    var _ref33 = yield (0, _effects.select)();

    var _ref33$auth = _ref33.auth;
    var hotelId = _ref33$auth.hotelId;
    var token = _ref33$auth.token;
    var userId = _ref33$auth.userId;


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

  function* updateTaskFlow(_ref34) {
    var uuid = _ref34.uuid;
    var status = _ref34.status;

    try {
      var _ref35 = yield (0, _effects.call)(updateTask, { uuid: uuid, status: status });

      var task = _ref35.task;

      yield (0, _effects.put)(_rooms2['default'].taskUpdateSuccess({ task: task }));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchUpdateTaskFlow(state) {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].TASK_UPDATE, updateTaskFlow);
  }

  return {
    watchUpdateRoomFinish: watchUpdateRoomFinish,
    watchUpdateRoomCleaning: watchUpdateRoomCleaning,
    watchUpdateRoomDelay: watchUpdateRoomDelay,
    watchUpdateRoomDND: watchUpdateRoomDND,
    watchUpdateRoomRefuse: watchUpdateRoomRefuse,
    watchUpdateRoomNoCheck: watchUpdateRoomNoCheck,
    watchUpdateRoomConfirmDND: watchUpdateRoomConfirmDND,
    watchUpdateRoomCancel: watchUpdateRoomCancel,
    watchCreateRoomNote: watchCreateRoomNote,
    watchRemoveRoomNote: watchRemoveRoomNote,
    watchUploadPhoto: watchUploadPhoto,
    watchAddLostItem: watchAddLostItem,
    watchSubmitInventoryWithdrawal: watchSubmitInventoryWithdrawal,
    watchSubmitInventoryRestock: watchSubmitInventoryRestock,
    watchCreateTaskFlow: watchCreateTaskFlow,
    watchUpdateTaskFlow: watchUpdateTaskFlow
  };
};

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }