'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;

  var ROOM_UPDATE_API = apiUrl + '/room_update';
  var ROOM_NOTES_API = apiUrl + '/room_notes';
  var IMAGE_UPLOAD_API = 'http://localhost:3054/image-upload';
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

  function* updateRoomFlow(_ref4) {
    var roomId = _ref4.roomId;
    var status = _ref4.status;

    try {
      yield (0, _effects.call)(updateRoom, { roomId: roomId, status: status });

      if (status === 'finish') {
        yield (0, _effects.put)(_updates4['default'].roomCleanFlush(roomId));
      }
      yield (0, _effects.put)(_rooms2['default'].roomsFetch());
    } catch (e) {
      console.log(e);
    }
  }

  function* watchUpdateRoomFinish() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CLEAN_FINISH, updateRoomFlow);
  }

  function* watchUpdateRoomCleaning() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CLEAN_START, updateRoomFlow);
  }

  function* watchUpdateRoomDelay() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_DELAY, updateRoomFlow);
  }

  function* watchUpdateRoomDND() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_DND, updateRoomFlow);
  }

  function* watchUpdateRoomRefuse() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_REFUSE, updateRoomFlow);
  }

  function* watchUpdateRoomNoCheck() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_NO_CHECK, updateRoomFlow);
  }

  function* watchUpdateRoomConfirmDND() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CONFIRM_DND, updateRoomFlow);
  }

  function* watchUpdateRoomCancel() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_CANCEL, updateRoomFlow);
  }

  // Room Notes
  function* createRoomNote(_ref5) {
    var roomId = _ref5.roomId;
    var note = _ref5.note;

    var _ref6 = yield (0, _effects.select)();

    var _ref6$auth = _ref6.auth;
    var token = _ref6$auth.token;
    var userId = _ref6$auth.userId;


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

  function* createRoomNoteFlow(_ref7) {
    var roomId = _ref7.roomId;
    var note = _ref7.note;

    try {
      yield (0, _effects.call)(createRoomNote, { roomId: roomId, note: note });
      yield (0, _effects.put)(_rooms2['default'].roomNotesFetch());
    } catch (e) {
      console.log(e);
    }
  }

  function* watchCreateRoomNote() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_NOTE_ADD, createRoomNoteFlow);
  }

  function* removeRoomNote(_ref8) {
    var roomId = _ref8.roomId;
    var noteId = _ref8.noteId;

    var _ref9 = yield (0, _effects.select)();

    var token = _ref9.auth.token;


    return yield (0, _effects.call)(_request2['default'], ROOM_NOTES_API + '/' + roomId + '/' + noteId, {
      method: 'PUT',
      body: JSON.stringify({}),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  function* removeRoomNoteFlow(_ref10) {
    var roomId = _ref10.roomId;
    var noteId = _ref10.noteId;

    try {
      yield (0, _effects.call)(removeRoomNote, { roomId: roomId, noteId: noteId });
      yield (0, _effects.put)(_rooms2['default'].roomNotesFetch());
    } catch (e) {
      console.log(e);
    }
  }

  function* watchRemoveRoomNote() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].ROOM_NOTE_REMOVE, removeRoomNoteFlow);
  }

  // Image Upload
  function uploadPhoto(_ref11) {
    var path = _ref11.path;

    return _reactNativeFetchBlob2['default'].fetch('POST', IMAGE_UPLOAD_API, {
      'Content-Type': 'multipart/form-data'
    }, [{
      name: 'file',
      filename: 'photo.jpg',
      data: _reactNativeFetchBlob2['default'].wrap(path)
    }]);
  }

  function* uploadPhotoFlow(_ref12) {
    var path = _ref12.path;
    var id = _ref12.id;

    try {
      var response = yield (0, _effects.call)(uploadPhoto, { path: path });
      yield (0, _effects.put)(_updates4['default'].photoStore({ path: path, id: id, url: JSON.parse(response.data).url }));
    } catch (e) {
      console.log(e);
    }
  }

  function* watchUploadPhoto() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].PHOTO_UPLOAD, uploadPhotoFlow);
  }

  function* submitLostItem(_ref13) {
    var desc = _ref13.desc;
    var roomId = _ref13.roomId;
    var photoId = _ref13.photoId;

    var _ref14 = yield (0, _effects.select)();

    var _ref14$auth = _ref14.auth;
    var token = _ref14$auth.token;
    var userId = _ref14$auth.userId;
    var photos = _ref14.updates.photos;

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

  function* addLostItemFlow(_ref15) {
    var desc = _ref15.desc;
    var roomId = _ref15.roomId;
    var photoId = _ref15.photoId;


    try {
      var response = yield (0, _effects.call)(submitLostItem, { desc: desc, roomId: roomId, photoId: photoId });
      console.log(response);

      if (photoId) {
        yield (0, _effects.put)(_updates4['default'].photoRemove(photoId));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function* watchAddLostItem() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].LOST_ITEM_ADD, addLostItemFlow);
  }

  function* submitInventoryWithdrawl(_ref16) {
    var asset = _ref16.asset;
    var change = _ref16.change;
    var roomId = _ref16.roomId;

    var _ref17 = yield (0, _effects.select)();

    var _ref17$auth = _ref17.auth;
    var token = _ref17$auth.token;
    var userId = _ref17$auth.userId;


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

  function* submitInventoryWithdrawlFlow(_ref18) {
    var roomId = _ref18.roomId;

    var _ref19 = yield (0, _effects.select)();

    var inventory = _ref19.updates.inventory;
    var hotelAssetRooms = _ref19.assets.hotelAssetRooms;

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
  function* submitInventoryRestock(_ref20) {
    var assetRoomId = _ref20.assetRoomId;
    var id = _ref20.id;

    var _ref21 = yield (0, _effects.select)();

    var token = _ref21.auth.token;


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

  function* submitInventoryRestockFlow(_ref22) {
    var assetRoomId = _ref22.assetRoomId;
    var id = _ref22.id;

    try {
      yield (0, _effects.call)(submitInventoryRestock, { assetRoomId: assetRoomId, id: id });
      yield (0, _effects.put)(_assets2['default'].inventoryWithdrawalFetch());
    } catch (e) {
      console.log(e);
    }
  }

  function* watchSubmitInventoryRestock() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].INVENTORY_RESTOCK, submitInventoryRestockFlow);
  }

  // Hotel Tasks
  function* createTask(task) {
    var _ref23 = yield (0, _effects.select)();

    var token = _ref23.auth.token;


    return yield (0, _effects.call)(_request2['default'], TASK_API, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  function* createVirtualAsset(_ref24) {
    var name = _ref24.name;
    var image = _ref24.image;

    var _ref25 = yield (0, _effects.select)();

    var token = _ref25.auth.token;


    return yield (0, _effects.call)(_request2['default'], VIRTUAL_ASSETS_API, {
      method: 'POST',
      body: JSON.stringify({ name: name, image: image }),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  function* createTaskFlow(_ref26) {
    var data = _ref26.data;

    var _ref27 = yield (0, _effects.select)();

    var _ref27$auth = _ref27.auth;
    var userId = _ref27$auth.userId;
    var hotel = _ref27$auth.hotel;
    var photos = _ref27.updates.photos;

    var image = (0, _object.get)(data, 'photoId') ? (0, _object.get)(photos, [(0, _object.get)(data, 'photoId'), 'url'], null) : null;

    var asset = (0, _object.get)(data, 'asset', null);
    var action = (0, _object.get)(data, 'action', null);

    var task = {
      creator_id: userId,
      task: null,
      type: 'quick',
      meta: {
        room_id: (0, _object.get)(data, 'room._id', null),
        location: (0, _object.get)(data, 'room.name', null),
        isMaintenance: true
      },
      guest_info: {
        guest_name: null
      },
      assigned: {
        label: 'Maintenance Team',
        user_ids: [],
        isPlannedAttendant: false
      },
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

      task.task = (0, _object.get)(asset, 'name');
      if ((0, _object.has)(asset, 'isStayPlanner')) {
        task.meta.virtual_asset_id = (0, _object.get)(asset, '_id');
      } else {
        task.meta.asset_id = (0, _object.get)(asset, '_id');
      }

      if (action) {
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
        }
        if ((0, _object.get)(action, 'body.default_assignment')) {
          var defaultAssignment = (0, _object.get)(action, 'body.default_assignment');
          var defaultAssignmentLabel = defaultAssignment.split(':')[0];

          task.assigned.label = defaultAssignmentLabel;
          task.assigned.isDefaultAssignment = true;
        }
      }

      if ((0, _object.get)(data, 'desc')) {
        task.messages = [{
          userId: userId,
          message: (0, _object.get)(data, 'desc'),
          date_ts: (0, _moment2['default'])().unix()
        }];
      }

      yield (0, _effects.call)(createTask, task);

      if (hotel.isAttendantTaskNotes) {
        console.log('here');
      }

      yield (0, _effects.put)(_rooms2['default'].tasksFetch());
    } catch (e) {
      console.log(e);
    }
  }

  function* watchCreateTaskFlow() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].TASK_CREATE, createTaskFlow);
  }

  function* updateTask(_ref28) {
    var uuid = _ref28.uuid;
    var status = _ref28.status;

    var _ref29 = yield (0, _effects.select)();

    var _ref29$auth = _ref29.auth;
    var token = _ref29$auth.token;
    var userId = _ref29$auth.userId;


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

  function* updateTaskFlow(_ref30) {
    var uuid = _ref30.uuid;
    var status = _ref30.status;

    try {
      yield (0, _effects.call)(updateTask, { uuid: uuid, status: status });
      yield (0, _effects.put)(_rooms2['default'].tasksFetch());
    } catch (e) {
      console.log(e);
    }
  }

  function* watchUpdateTaskFlow() {
    yield* (0, _reduxSaga.takeEvery)(_updates2['default'].TASK_UPDATE, updateTaskFlow);
  }

  return {
    watchUpdateTaskFlow: watchUpdateTaskFlow,
    watchCreateTaskFlow: watchCreateTaskFlow,
    watchSubmitInventoryRestock: watchSubmitInventoryRestock,
    watchSubmitInventoryWithdrawal: watchSubmitInventoryWithdrawal,
    watchAddLostItem: watchAddLostItem,
    watchUploadPhoto: watchUploadPhoto,
    watchRemoveRoomNote: watchRemoveRoomNote,
    watchCreateRoomNote: watchCreateRoomNote,
    watchUpdateRoomCancel: watchUpdateRoomCancel,
    watchUpdateRoomConfirmDND: watchUpdateRoomConfirmDND,
    watchUpdateRoomNoCheck: watchUpdateRoomNoCheck,
    watchUpdateRoomRefuse: watchUpdateRoomRefuse,
    watchUpdateRoomDND: watchUpdateRoomDND,
    watchUpdateRoomDelay: watchUpdateRoomDelay,
    watchUpdateRoomCleaning: watchUpdateRoomCleaning,
    watchUpdateRoomFinish: watchUpdateRoomFinish
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