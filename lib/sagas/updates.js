import { delay, take } from 'redux-saga';
import { takeLatest, throttle, put, call, select, fork } from 'redux-saga/effects';
import RNFetchBlob from 'react-native-fetch-blob';
import { get, keys, has, extend } from 'lodash/object';
import { filter, includes, find } from 'lodash/collection';
import moment from 'moment';
import digestAssignment from '../utils/digest-assignment';

import UpdatesTypes from '../constants/updates';
import UpdatesActions from '../actions/updates';
import AssetsActions from '../actions/assets';
import RoomsActions from '../actions/rooms';
import OverlayActions from '../actions/overlay';

import { userIdSelector, userSelector } from '../selectors/auth';
import { tasksSelector } from '../selectors/rooms';
import { photosSelector } from '../selectors/updates';

import request, { authRequest } from '../utils/request';
import { forkWatchers } from '../utils/sagas';
import { offlineable } from '../offline';

export default function({ apiUrl }) {
  const ROOM_UPDATE_API = `${apiUrl}/room_update`;
  const ROOM_LOG_CLEAN_API = `${apiUrl}/attendant`;
  const ROOM_NOTES_API = `${apiUrl}/room_notes`;
  const IMAGE_UPLOAD_API = 'https://upload.roomchecking.com/image-upload';
  const LOST_ITEM_API = `${apiUrl}/lost_found/founds`;
  const INVENTORY_API = `${apiUrl}/hotel_inventory`;
  const TASK_API = `${apiUrl}/tasks`;
  const TASK_BATCH_API = `${apiUrl}/tasks/batch`;
  const VIRTUAL_ASSETS_API = `${apiUrl}/virtual_assets`;
  const PLANNING_API = `${apiUrl}/attendant_plannings`;
  const ROOM_RESET_API = `${apiUrl}/room_reset`;

  // Update Room
  const updateRoom = offlineable('updateRoom', function * updateRoom ({ roomId, status }) {
    const user = yield select(userSelector);

    const response = yield call(authRequest, `${ROOM_UPDATE_API}/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify({
        attendantStatus: status,
        session: { user: user },
        platform: 'attendant'
      }),
    })

    return response
  })

  const logClean = offlineable('logClean', function * logClean({ roomId }) {
    const { auth: { hotelId, token, user }, updates: { rooms: roomUpdates }, rooms: { hotelRooms }} = yield select();
    const room = find(hotelRooms, { _id: roomId });
    const roomUpdate = get(roomUpdates, roomId, {});

    if (!room || !get(roomUpdate, 'startTime')) {
      return true;
    }

    const data = {
      id: null,
      hotel_id: hotelId,
      room_id: roomId,
      room_name: room.name,
      start_ts: get(roomUpdate, 'startTime') || moment().unix(),
      end_ts: moment().unix(),
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
      paused_time: get(roomUpdate, 'pauseTime'),
    }

    const response = yield call(authRequest, `${ROOM_LOG_CLEAN_API}/${roomId}/${user._id}/cleaned`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield put(UpdatesActions.roomCleanFlush(roomId));
    return response
  })

  const logOther = offlineable('logOther', function * logOther({ roomId, status }) {
    const { auth: { hotelId, token, user }, updates: { rooms: roomUpdates }, rooms: { hotelRooms }} = yield select();
    const room = find(hotelRooms, { _id: roomId });

    let data = {
      date_ts: moment().unix(),
      hotel_id: hotelId,
      room_id: roomId,
      room_name: room.name,
      user_id: user._id,
      user_username: user.username,
      user_email: user.email,
      user_firstname: user.first_name,
      user_lastname: user.last_name,
      attendant_status: status,
      image: '',
    };

    return yield call(authRequest, `${ROOM_LOG_CLEAN_API}/${roomId}/${user._id}/log_other`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  })

  function * updateRoomFlow({ roomId, status }) {
    // console.log('UPDATING', roomId, status);
    try {
      yield put(RoomsActions.updateRoomOptimistic({ roomId, field: 'attendantStatus', value: status }));
      const response = yield call(updateRoom, { roomId, status });

      if (['dnd', 'refuse', 'delay', 'confirm-dnd'].includes(status)) {
        yield call(logOther, { roomId, status });
      }

      if (status === 'finish' || status === 'no-check') {
        yield call(logClean, { roomId });
        // yield put(UpdatesActions.roomCleanFlush(roomId));
      }

      return true

      // const { room } = response;
      // yield put(RoomsActions.roomsFetch());
      // yield put(RoomsActions.updateRoom(room))
    } catch(e) {
      console.log(e);
    } finally {

    }
  }

  function * watchUpdateRoomFinish(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CLEAN_FINISH, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CLEAN_FINISH, updateRoomFlow);
  }

  function * watchUpdateRoomCleaning(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CLEAN_START, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CLEAN_START, updateRoomFlow);
  }

  function * watchUpdateRoomPause(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CLEAN_PAUSE, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CLEAN_PAUSE, updateRoomFlow);
  }

  function * watchUpdateRoomUnpause(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CLEAN_UNPAUSE, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CLEAN_UNPAUSE, updateRoomFlow);
  }

  function * watchUpdateRoomCleaning(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CLEAN_START, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CLEAN_START, updateRoomFlow);
  }

  function * watchUpdateRoomDelay(state) {
    // yield takeLatest(UpdatesTypes.ROOM_DELAY, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_DELAY, updateRoomFlow);
  }

  function * watchUpdateRoomDND(state) {
    // yield takeLatest(UpdatesTypes.ROOM_DND, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_DND, updateRoomFlow);
  }

  function * watchUpdateRoomRefuse(state) {
    // yield takeLatest(UpdatesTypes.ROOM_REFUSE, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_REFUSE, updateRoomFlow);
  }

  function * watchUpdateRoomInspect(state) {
    // yield takeLatest(UpdatesTypes.ROOM_INSPECT, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_INSPECT, updateRoomFlow);
  }

  function * watchUpdateRoomNoCheck(state) {
    // yield takeLatest(UpdatesTypes.ROOM_NO_CHECK, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_NO_CHECK, updateRoomFlow);
  }

  function * watchUpdateRoomConfirmDND(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CONFIRM_DND, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CONFIRM_DND, updateRoomFlow);
  }

  function * watchUpdateRoomCancel(state) {
    // yield takeLatest(UpdatesTypes.ROOM_CANCEL, updateRoomFlow);
    yield throttle(10000, UpdatesTypes.ROOM_CANCEL, updateRoomFlow);
  }

  // Reset Room
  const resetRoom = offlineable('resetRoom', function * resetRoom(roomId) {
    const user = yield select(userSelector);

    return yield call(authRequest, `${ROOM_RESET_API}/${roomId}`, {
      method: 'POST',
      body: JSON.stringify({
        session: { user: user },
        platform: 'inspector'
      }),
    })
  })

  function * resetRoomFlow({ roomId }) {
    try {
      const response = yield call(resetRoom, roomId);
      // const { room } = response;
      // yield put(RoomsActions.roomsFetch());
      // yield put(RoomsActions.updateRoom(room))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchResetRoomFlow() {
    // yield takeLatest(UpdatesTypes.ROOM_RESET, resetRoomFlow);
    yield throttle(3000, UpdatesTypes.ROOM_RESET, resetRoomFlow);
  }

  // Room Model
  const updateRoomModel = function * updateRoomModel({ roomId, field, value }) {
    const user = yield select(userSelector);

    return yield call(authRequest, `${ROOM_UPDATE_API}/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify({
        [field]: value,
        session: { user: user },
        platform: 'inspector'
      }),
    })
  }

  const updateRoomModelFlow = offlineable('updateRoomModelFlow', function * updateRoomModelFlow({ roomId, field, value }) {
    yield put(RoomsActions.updateRoomOptimistic({ roomId, field, value }));
    const response = yield call(updateRoomModel, { roomId, field, value });
    const room = response.room;
    // yield put(RoomsActions.roomsFetch());
    return yield put(RoomsActions.updateRoom(room))
  })

  function * watchRoomModelComment() {
    // yield takeLatest(UpdatesTypes.ROOM_COMMENT, updateRoomModelFlow);
    yield throttle(3000, UpdatesTypes.ROOM_COMMENT, updateRoomModelFlow);
  }

  function * watchRoomModelHousekeeping() {
    // yield takeLatest(UpdatesTypes.ROOM_HOUSEKEEPING, updateRoomModelFlow);
    yield throttle(3000, UpdatesTypes.ROOM_HOUSEKEEPING, updateRoomModelFlow);
  }

  function * watchRoomModelRestock() {
    // yield takeLatest(UpdatesTypes.ROOM_RESTOCK, updateRoomModelFlow);
    yield throttle(3000, UpdatesTypes.ROOM_RESTOCK, updateRoomModelFlow);
  }

  function * watchRoomModelTurndown() {
    // yield takeLatest(UpdatesTypes.ROOM_TURNDOWN, updateRoomModelFlow);
    yield throttle(3000, UpdatesTypes.ROOM_TURNDOWN, updateRoomModelFlow);
  }

  // Planning
  const roomPlanning = offlineable('roomPlanning', function * roomPlanning({ roomId, user, options }) {
    const { auth: { userId }, rooms: { hotelPlannings }} = yield select();
    const isPlanned = !!find(hotelPlannings, { room_id: roomId, is_optimistic: false });
    const endpoint = isPlanned ? `${PLANNING_API}/${roomId}` : PLANNING_API;
    const method = isPlanned ? 'PUT' : 'POST';
    let data = isPlanned ?
      { user_id: user && user._id || null, credits: 1, room_id: roomId } :
      { user_id: user && user._id || null, room_id: roomId, creator_id: userId, credits: 1, is_priority: 0 };

    if (options) {
      data = extend({}, data, options);
    }

    return yield call(authRequest, endpoint, {
      method,
      body: JSON.stringify(data)
    });
  })

  function * roomPlanningFlow({ roomId, user, options }) {
    yield put(RoomsActions.planningsUpdateOptmistic({ roomId, user, options }));
    const response = yield call(roomPlanning, { roomId, user, options });
    return yield put(RoomsActions.planningsFetch());
  }

  function * watchRoomPlanningFlow() {
    // yield takeLatest(UpdatesTypes.PLANNING_USER, roomPlanningFlow);
    yield throttle(3000, UpdatesTypes.PLANNING_USER, roomPlanningFlow);
  }

  // Room Notes
  const createRoomNote = offlineable('createRoomNote', function * createRoomNote({ roomId, note }) {
    const userId = yield select(userIdSelector);

    return yield call(authRequest, `${ROOM_NOTES_API}/${roomId}`, {
      method: 'POST',
      body: JSON.stringify({
        note,
        userId,
        application: 'attendant'
      }),
    })
  })

  function * createRoomNoteFlow({ roomId, note }) {
    yield call(createRoomNote, { roomId, note });
    return yield put(RoomsActions.roomNotesFetch());
  }

  function * watchCreateRoomNote(state) {
    // yield takeLatest(UpdatesTypes.ROOM_NOTE_ADD, createRoomNoteFlow);
    yield throttle(3000, UpdatesTypes.ROOM_NOTE_ADD, createRoomNoteFlow);
  }

  const removeRoomNote = offlineable('removeRoomNote', function * removeRoomNote({ roomId, noteId }) {
    return yield call(authRequest, `${ROOM_NOTES_API}/${roomId}/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify({}),
    })
  })

  function * removeRoomNoteFlow({ roomId, noteId }) {
    try {
      const response = yield call(removeRoomNote, { roomId, noteId });
      return yield put(RoomsActions.roomNotesFetch());
    } catch(e) {
      console.log(e);
    } finally {

    }
  }

  function * watchRemoveRoomNote() {
    // yield takeLatest(UpdatesTypes.ROOM_NOTE_REMOVE, removeRoomNoteFlow);
    yield throttle(3000, UpdatesTypes.ROOM_NOTE_REMOVE, removeRoomNoteFlow);
  }

  // Image Upload
  const uploadPhoto = async function uploadPhoto({ path }) {
    // return RNFetchBlob
    // .fetch('POST', IMAGE_UPLOAD_API, {
    //   'Content-Type' : 'multipart/form-data'
    // }, [
    //   {
    //     name: 'file',
    //     filename: 'photo.jpg',
    //     data: RNFetchBlob.wrap(path)
    //   }
    // ])
    // .catch(e => {
    //   console.log('RNFetchBlog Error', e);
    // })

    try {
      const response = await RNFetchBlob
        .fetch('POST', IMAGE_UPLOAD_API, {
          'Content-Type' : 'multipart/form-data'
        }, [
          {
            name: 'file',
            filename: 'photo.jpg',
            data: RNFetchBlob.wrap(path)
          }
        ])

      return response;
    } catch (error) {
      // console.log(error);
      return error.respInfo;
    }
  }

  function * uploadPhotoFlow({ path, id }) {
    try {
      const response = yield call(uploadPhoto, { path });
      return yield put(UpdatesActions.photoStore({ path, id, url: JSON.parse(response.data).url }))
    } catch (e) {
      console.log(e);
      yield put(UpdatesActions.photoUploadFailure(id));
    } finally {

    }
  }

  function * watchUploadPhoto() {
    // yield takeLatest(UpdatesTypes.PHOTO_UPLOAD, uploadPhotoFlow);
    yield throttle(3000, UpdatesTypes.PHOTO_UPLOAD, uploadPhotoFlow);
  }

  // const submitLostItem = offlineable('submitLostItem', function * submitLostItem({ desc, roomId, photoId }) {
  function * submitLostItem({ desc, roomId, photoId }) {
    const userId = yield select(userIdSelector);
    const photos = yield select(photosSelector);

    const photoUrl = photoId ? get(photos, [photoId, 'url'], null) : null;

    return yield call(authRequest, `${LOST_ITEM_API}/${roomId}`, {
      method: 'POST',
      body: JSON.stringify({
        nameOrDescription: desc,
        image: photoUrl,
        userId
      }),
    });
  }

  // function * addLostItemFlow({ desc, roomId, photoId}) {
  //   try {
  //     const response = yield call(submitLostItem, { desc, roomId, photoId });
  //     const foundItem = response.foundItem;

  //     if (photoId) {
  //       yield put(UpdatesActions.photoRemove(photoId));
  //     }

  //     yield put(UpdatesActions.lostItemAddSuccess(foundItem));

  //     return response
  //   } catch (e) {
  //     console.log(e);
  //     yield put(UpdatesActions.lostItemAddFailure(error));
  //   } finally {

  //   }
  // }

  const addLostItemFlow = offlineable('addLostItemFlow', function * addLostItemFlow({ desc, roomId, photoId }) {
    const userId = yield select(userIdSelector);
    const { lostFound } = yield select();
    
    if (photoId) {
      const photoUpload = yield call(uploadPhoto, { path: lostFound.photoPath });
      yield put(UpdatesActions.photoStore({ path: lostFound.photoPath, id: photoId, url: JSON.parse(photoUpload.data).url }))
    }

    const response = yield call(submitLostItem, { desc, roomId, photoId });
    const foundItem = response.foundItem;

    if (photoId) {
      yield put(UpdatesActions.photoRemove(photoId));
    }

    yield put(UpdatesActions.lostItemAddSuccess(foundItem));

    return response;
  })

  function * watchAddLostItem() {
    // yield takeLatest(UpdatesTypes.LOST_ITEM_ADD, addLostItemFlow);
    yield throttle(3000, UpdatesTypes.LOST_ITEM_ADD, addLostItemFlow);
  }

  const submitInventoryWithdrawl = offlineable('submitInventoryWithdrawl', function * submitInventoryWithdrawl({ asset, change, roomId }) {
    const userId = yield select(userIdSelector);

    const data = {
      userId,
      roomId,
      withdrawal: change
    };

    return yield call(authRequest, `${INVENTORY_API}/${asset._id}/withdrawal`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  })

  function * submitInventoryWithdrawlFlow({ roomId }) {
    const { updates: { inventory }, assets: { hotelAssetRooms }} = yield select();
    const roomChanges = get(inventory, roomId, {})
    const assetIds = keys(roomChanges);
    const roomAssets = filter(hotelAssetRooms, a => includes(assetIds, get(a, '_id')));
    const filteredAssets = filter(roomAssets, a => get(roomChanges, get(a, '_id'), 0) > 0 && get(a, 'assetType', null) === 'stock');

    if (!filteredAssets || !filteredAssets.length) {
      return;
    }

    yield put(OverlayActions.overlayShow({ message: 'Updating' }));

    try {
      // console.log(filteredAssets);
      yield filteredAssets.map(asset => call(submitInventoryWithdrawl, { asset, change: -1 * get(roomChanges, asset._id, 1), roomId }));
      yield filteredAssets.map(asset => put(UpdatesActions.resetInventory({ assetRoomId: asset._id, roomId })));
    } catch (e) {
      console.log(e);
    } finally {
      return yield put(OverlayActions.overlayHide());
    }
  }

  function * watchSubmitInventoryWithdrawal() {
    // yield takeLatest(UpdatesTypes.INVENTORY_FLUSH, submitInventoryWithdrawlFlow);
    yield throttle(3000, UpdatesTypes.INVENTORY_FLUSH, submitInventoryWithdrawlFlow);
  }

  // Hotel Inventory Restock
  const submitInventoryRestock = offlineable('submitInventoryRestock', function * submitInventoryRestock({ assetRoomId, id }) {
    return yield call(authRequest, `${INVENTORY_API}/${assetRoomId}/withdrawal/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        is_restocked: 1
      }),
    });
  })

  function * submitInventoryRestockFlow({ assetRoomId, id }) {
    try {
      const response = yield call(submitInventoryRestock, { assetRoomId, id });
      return yield put(AssetsActions.inventoryWithdrawalFetch());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchSubmitInventoryRestock() {
    // yield takeLatest(UpdatesTypes.INVENTORY_RESTOCK, submitInventoryRestockFlow);
    yield throttle(3000, UpdatesTypes.INVENTORY_RESTOCK, submitInventoryRestockFlow);
  }


  // Hotel Tasks
  function * createTask(task) {
    return yield call(authRequest, TASK_API, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  function * createVirtualAsset({ name, image }) {
    return yield call(authRequest, VIRTUAL_ASSETS_API, {
      method: 'POST',
      body: JSON.stringify({ name, image }),
    });
  }

  const createTaskFlow = offlineable('createTaskFlow', function * createTaskFlow({ data }) {
    yield put(UpdatesActions.taskSending());
    const { auth: { hotelId, token, userId, hotel }, updates: { photos }, users: { users, hotelGroups } } = yield select();
    let image = get(data, 'asset.image', null);

    try {
      if (get(data, 'photoId') && get(photos, [get(data, 'photoId'), 'url'])) {
        // console.log('url for photo', get(photos, [get(data, 'photoId'), 'url']));
        image = get(photos, [get(data, 'photoId'), 'url']);
      } else if (get(data, 'photoId')) {
        const photoId = get(data, 'photoId');
        // console.log(photoId);
        const path = get(photos, [photoId, 'path']);
        // console.log(path);

        if (path) {
          const response = yield call(uploadPhoto, { path });
          // console.log(response);
          image = JSON.parse(response.data).url
        }
      }
    } catch (e) {
      console.log('PHOTO for task failed', e);
    }

    let asset = get(data, 'asset', null);
    let action = get(data, 'action', null);

    const taskAssignment = digestAssignment(data.assignments, users, hotelGroups);

    const dueDate = get(data, 'dueDate', null) || moment();

    const task = {
      creator_id: userId,
      task: null,
      type: 'quick',
      meta: {
        room_id: get(data, 'room._id', null),
        location: get(data, 'room.name', null),
        image,
        isBlocking: get(data, 'isBlocking', false),
        ...taskAssignment.meta,
      },
      guest_info: {
        guest_name: null,
      },
      assigned: {
        is_mandatory: get(data, 'isMandatory', false),
        ...taskAssignment.assigned
      },
      start_date: moment().format('YYYY-MM-DD'),
      due_date: dueDate.format('YYYY-MM-DD'),
      is_required: 1,
      is_optional: 0,
      is_priority: get(data, 'isPriority', false),
      is_group: 0,
    }

    if (get(data, 'createdAsset')) {
      const newAsset = yield call(createVirtualAsset, {
        name: get(data, 'createdAsset'),
        image
      });
      asset = get(newAsset, 'virtualAsset');
    }

    if (asset) {
      task.task = get(asset, 'name');
      if (has(asset, 'isStayPlanner')) {
        task.meta.virtual_asset_id = get(asset, '_id');
      } else if (has(asset, 'contractors')) {
        task.meta.durable_asset_id = get(asset, '_id');
      } else {
        task.meta.asset_id = get(asset, '_id');
      }
    } else {
      task.task = get(data, 'desc') || 'Issue';
      task.type = 'lite';
    }

    if (asset && action) {
      task.meta.action = action;
      task.task = `${task.task}: ${action.label}`;
      if (get(action, 'body.task_type')) { task.type = get(action, 'body.task_type') }
      if (get(action, 'body.estimated_time')) { task.meta.estimatedTime = get(action, 'body.estimated_time') }
      // if (get(action, 'body.is_mandatory')) { task.assigned.is_mandatory = true };
      if (get(data, 'useDefault') && get(action, 'body.default_assignment')) {
        let defaultAssignment = get(action, 'body.default_assignment');
        let defaultAssignmentLabel = defaultAssignment.split(':')[0];

        task.assigned.label = defaultAssignmentLabel;
        task.assigned.isDefaultAssignment = true;
      }
    }

    if (asset && get(data, 'desc')) {
      task.messages = [{
        userId: userId,
        message: get(data, 'desc'),
        date_ts: moment().unix()
      }];
    }

    const locations = data.locations;
    if (locations && locations.length) {
      task.locations = locations.map(location => ({ _id: location._id, name: location.name }))
    }

    const response = yield call(createTask, task);

    yield put(UpdatesActions.taskSendingSuccess());
    return yield put(RoomsActions.tasksFetch());
  })

  function * watchCreateTaskFlow() {
    // yield takeLatest(UpdatesTypes.TASK_CREATE, createTaskFlow);
    yield throttle(3000, UpdatesTypes.TASK_CREATE, createTaskFlow);
  }

  // Hotel Tasks
  function * createTaskBatch(task) {
    return yield call(authRequest, TASK_BATCH_API, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  const createTaskBatchFlow = offlineable('createTaskBatchFlow', function * createTaskFlow({ data }) {
    yield put(UpdatesActions.taskSending());
    const { auth: { hotelId, token, userId, hotel }, updates: { photos }, users: { users, hotelGroups } } = yield select();
    let image = get(data, 'asset.image', null);

    try {
      if (get(data, 'photoId') && get(photos, [get(data, 'photoId'), 'url'])) {
        // console.log('url for photo', get(photos, [get(data, 'photoId'), 'url']));
        image = get(photos, [get(data, 'photoId'), 'url']);
      } else if (get(data, 'photoId')) {
        const photoId = get(data, 'photoId');
        // console.log(photoId);
        const path = get(photos, [photoId, 'path']);
        // console.log(path);

        if (path) {
          const response = yield call(uploadPhoto, { path });
          // console.log(response);
          image = JSON.parse(response.data).url
        }
      }
    } catch (e) {
      console.log('PHOTO for task failed', e);
      // yield put(UpdatesActions.taskSendingFailure(e));
    }

    let asset = get(data, 'asset', null);
    let action = get(data, 'action', null);

    const taskAssignment = digestAssignment(data.assignments, users, hotelGroups);
    const dueDate = get(data, 'dueDate', null) || moment();

    const task = {
      creator_id: userId,
      task: null,
      type: 'quick',
      meta: {
        image,
        isBlocking: get(data, 'isBlocking', false),
        ...taskAssignment.meta,
      },
      guest_info: {
        guest_name: null,
      },
      assigned: {
        is_mandatory: get(data, 'isMandatory', false),
        ...taskAssignment.assigned
      },
      start_date: moment().format('YYYY-MM-DD'),
      due_date: dueDate.format('YYYY-MM-DD'),
      is_required: 1,
      is_optional: 0,
      is_priority: get(data, 'isPriority', false),
      is_group: 0,
    }

    if (get(data, 'createdAsset')) {
      const newAsset = yield call(createVirtualAsset, {
        name: get(data, 'createdAsset'),
        image
      });
      asset = get(newAsset, 'virtualAsset');
    }

    if (asset) {
      task.task = get(asset, 'name');
      if (has(asset, 'isStayPlanner')) {
        task.meta.virtual_asset_id = get(asset, '_id');
      } else if (has(asset, 'contractors')) {
        task.meta.durable_asset_id = get(asset, '_id');
      } else {
        task.meta.asset_id = get(asset, '_id');
      }
    } else {
      task.task = get(data, 'desc') || 'Issue';
      task.type = 'lite';
    }

    if (task.meta.durable_asset_id) {
      if (get(data, 'model')) {
        task.meta.model_name = get(data, 'model.name', "");
        task.meta.model_id = get(data, 'model.id', null);
      }

      if (get(data, 'sublocation')) {
        task.meta.sublocation_label = get(data, 'sublocation.sublocation', "");
        task.meta.sublocation_id = get(data, 'sublocation.id', null);
      }
    }

    if (asset && action) {
      task.meta.action = action;
      task.task = `${task.task}: ${action.label}`;
      if (get(action, 'body.task_type')) { task.type = get(action, 'body.task_type') }
      if (get(action, 'body.estimated_time')) { task.meta.estimatedTime = get(action, 'body.estimated_time') }
      // if (get(action, 'body.is_mandatory')) { task.assigned.is_mandatory = true };
      if (get(data, 'useDefault') && get(action, 'body.default_assignment')) {
        let defaultAssignment = get(action, 'body.default_assignment');
        let defaultAssignmentLabel = defaultAssignment.split(':')[0];

        task.assigned.label = defaultAssignmentLabel;
        task.assigned.isDefaultAssignment = true;
      }
    }

    if (asset && get(data, 'desc')) {
      task.messages = [{
        userId: userId,
        message: get(data, 'desc'),
        date_ts: moment().unix()
      }];
    }

    task.locations = get(data, 'locations', []).map(location => ({ _id: location._id, name: location.name }))
    if (!task.locations.length) {
      task.locations = [{ _id: '', name: '' }];
    }

    const response = yield call(createTaskBatch, task);

    yield put(UpdatesActions.taskSendingSuccess());
    return yield put(RoomsActions.tasksFetch());
  })

  function * watchCreateTaskBatchFlow() {
    // yield takeLatest(UpdatesTypes.TASK_CREATE_BATCH, createTaskBatchFlow);
    yield throttle(3000, UpdatesTypes.TASK_CREATE_BATCH, createTaskBatchFlow);
  }

  // Update Task
  function * updateTask({ uuid, status }) {
    const userId = yield select(userIdSelector);

    let data = {
      status,
      update_type: 'status',
      user_id: userId
    }
    if (status.is_reschedule) {
      data = {
        ...status,
        user_id: userId
      }
    }
    if (status.isReassign) {
      const assignee = status.user;
      data = {
        user_id: userId,
        update_ts: moment().unix(),
        due_date: status.dueDate.format('YYYY-MM-DD'),
        is_move: true,
      }

      if (status.message) {
        data = { ...data, update_type: "message", message: status.message };
      }
      const assigned = { label: assignee.fullName }

      if (assignee.isTeam) {
        assigned.user_ids = []
      } else {
        assigned.user_ids = [assignee._id]
        data = {
          ...data,
          responsible_id: assignee._id,
          responsible_first_name: assignee.first_name,
          responsible_last_name: assignee.last_name,
        }
      }
      data = { ...data, assigned };
    }
    if (status.isMessage) {
      data = {
        update_type: 'message',
        message: status.message,
        user_id: userId
      }
    }

    return yield call(authRequest, `${TASK_API}/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  const buildTaskOptimisticUpdate = function * ({ uuid, status }) {
    const userId = yield select(userIdSelector);
    const tasks = yield select(tasksSelector)
    const task = tasks.find(task => task.uuid === uuid)

    if (!task) {
      return;
    }

    let data;
    if (status.is_reschedule) {
      data = {
        due_date: status.due_date
      }
    } else if (status.isMessage) {
      data = {
        messages: [
          ...task.messages,
          {
            date_ts: moment().unix(),
            user_id: userId,
            message: status.message
          }
        ]
      }
    } else if (status.isReassign) {
      const assignee = status.user;
      data = {
        user_id: userId,
        update_ts: moment().unix(),
        due_date: status.dueDate.format('YYYY-MM-DD'),
        is_move: true,
      }

      if (status.message) {
        data = { ...data, update_type: "message", message: status.message };
      }
      const assigned = { label: assignee.fullName }

      if (assignee.isTeam) {
        assigned.user_ids = []
      } else {
        assigned.user_ids = [assignee._id]
        data = {
          ...data,
          responsible_id: assignee._id,
          responsible_first_name: assignee.first_name,
          responsible_last_name: assignee.last_name,
        }
      }
      data = { ...data, assigned };
    } else {
      data = {
        [`is_${status}`]: 1
      }
      if (status === "claimed") {
        data.responsible_id = userId
      }
    }

    return {
      ...task,
      ...data
    };
  }

  const updateTaskFlow = offlineable('updateTaskFlow', function * updateTaskFlow({ uuid, status }) {
    const taskUpdate = yield call(buildTaskOptimisticUpdate, { uuid, status })
    yield put(RoomsActions.taskUpdateOptimistic({ uuid, update: taskUpdate }));
    const { task } = yield call(updateTask, { uuid, status });
    return true;
  })

  function * watchUpdateTaskFlow(state) {
    // yield takeLatest(UpdatesTypes.TASK_UPDATE, updateTaskFlow);
    yield throttle(3000, UpdatesTypes.TASK_UPDATE, updateTaskFlow);
  }

  function * updateBatchTasks({ tasks }) {
    const { auth: { hotelId, token, userId, hotel }, users: { users, hotelGroups } } = yield select();
    
    const data = {
      user_id: userId,
      tasks
    }

    return yield call(authRequest, `${TASK_API}/batch`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  const updateBatchTasksFlow = offlineable('updateBatchTasksFlow', function * updateBatchTasksFlow({ tasks }) {
    const response = yield call(updateBatchTasks, { tasks });
    // console.log(response);
    return true;
  });

  function * watchUpdateBatchTasksFlow(state) {
    // yield takeLatest(UpdatesTypes.TASK_UPDATE_BATCH, updateBatchTasksFlow);
    yield throttle(3000, UpdatesTypes.TASK_UPDATE_BATCH, updateBatchTasksFlow);
  }

  function * reassignTask({ uuid, ids, dueDate }) {
    const { auth: { hotelId, token, userId, hotel }, users: { users, hotelGroups } } = yield select();
    let data = {
      user_id: userId
    }

    if (ids) {
      const taskAssignment = digestAssignment(ids, users, hotelGroups);
      data.meta = taskAssignment.meta;
      data.assigned = taskAssignment.assigned;
    }
    
    if (dueDate) {
      data.dueDate = dueDate;
    }

    return yield call(authRequest, `${TASK_API}/${uuid}/reassign`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  const reassignTaskFlow = offlineable('reassignTaskFlow', function * reassignTaskFlow({ uuid, ids, dueDate }) {
    yield call(reassignTask, { uuid, ids, dueDate });
    return true;
  });

  function * watchReassignTaskFlow(state) {
    // yield takeLatest(UpdatesTypes.TASK_REASSIGN, reassignTaskFlow);
    yield throttle(3000, UpdatesTypes.TASK_REASSIGN, reassignTaskFlow);
  }

  function * convertTask({ task, update }) {
    const { auth: { hotelId, token, userId, hotel }, users: { users, hotelGroups } } = yield select();
    const taskAssignment = digestAssignment(update.assignments, users, hotelGroups);

    let data = {
      task: '',
      type: 'lite',
      meta: {
        ...task.meta,
        ...taskAssignment.meta
      },
      assigned: {
        ...task.assigned,
        ...taskAssignment.assigned
      },
      is_priority: update.isPriority,
      user_id: userId,
      previous_task: task.task,
      update_type: 'reassign'
    }

    if (update.asset) {
      data.type = 'quick';
      data.task = get(update, 'asset.name');
    } else {
      data.type = 'lite';
      data.task = update.task || task.task;
    }

    if (update.asset && update.action) {
      data.meta.action = update.action;
      data.task = `${data.task}: ${update.action.label}`;
      if (get(update, 'action.body.task_type')) { data.type = get(update, 'action.body.task_type') }
      if (get(update, 'action.body.estimated_time')) { data.meta.estimatedTime = get(update, 'action.body.estimated_time') }
    }

    return yield call(authRequest, `${TASK_API}/${task.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  const convertTaskFlow = offlineable('convertTaskFlow', function * convertTaskFlow({ task, update }) {
    yield call(convertTask, { task, update });
    return true;
  });

  function * watchConvertTaskFlow(state) {
    // yield takeLatest(UpdatesTypes.TASK_CONVERT, convertTaskFlow);
    yield throttle(3000, UpdatesTypes.TASK_CONVERT, convertTaskFlow);
  }

  const createNotificationFlow = offlineable('createNotificationFlow', function * createNotificationFlow({ user, message, room, photoUrl, photoId, photoPath }) {
    const { auth: { userId }, updates: { photos }} = yield select();

    let image = null;
    if (photoUrl) {
      image = photoUrl;
    } else if (photoPath) {
      const uploadedPhoto = yield put(UpdatesActions.photoUpload({ path: photoPath, id: photoId }))
      const response = yield call(uploadPhoto, { path: photoPath });
      const url = JSON.parse(response.data).url;
      yield put(UpdatesActions.photoStore({ path: photoPath, id: photoId, url }))
      image = url
    } else if (photoId && get(photos, [photoId, 'url'])) {
      image = get(photos, [photoId, 'url']);
    }

    const task = {
      creator_id: userId,
      task: message,
      type: 'notification',
      meta: {
        room_id: room && room._id || null,
        location: room && room.name || null,
        image
      },
      guest_info: {
        guest_name: null,
      },
      assigned: {
        label: `${user.first_name} ${user.last_name}`,
        user_ids: [user._id],
      },
      start_date: moment().format('YYYY-MM-DD'),
      due_date: moment().format('YYYY-MM-DD'),
      is_required: 1,
      is_optional: 0,
      is_priority: false,
      is_group: 0,
    };

    const response = yield call(createTask, task);
    return yield put(RoomsActions.tasksFetch());
  });

  function * watchCreateNotificationFlow(state) {
    // yield takeLatest(UpdatesTypes.NOTIFICATION_CREATE, createNotificationFlow);
    yield throttle(3000, UpdatesTypes.NOTIFICATION_CREATE, createNotificationFlow);
  }

  const watchers = {
    watchUpdateRoomFinish,
    watchUpdateRoomCleaning,
    watchUpdateRoomPause,
    watchUpdateRoomUnpause,
    watchUpdateRoomDelay,
    watchUpdateRoomDND,
    watchUpdateRoomRefuse,
    watchUpdateRoomInspect,
    watchUpdateRoomNoCheck,
    watchUpdateRoomConfirmDND,
    watchUpdateRoomCancel,
    watchResetRoomFlow,
    watchRoomModelComment,
    watchRoomModelHousekeeping,
    watchRoomModelRestock,
    watchRoomModelTurndown,
    watchCreateRoomNote,
    watchRemoveRoomNote,
    watchUploadPhoto,
    watchAddLostItem,
    watchSubmitInventoryWithdrawal,
    watchSubmitInventoryRestock,
    watchCreateTaskFlow,
    watchCreateTaskBatchFlow,
    watchUpdateTaskFlow,
    watchUpdateBatchTasksFlow,
    watchReassignTaskFlow,
    watchConvertTaskFlow,
    watchRoomPlanningFlow,
    watchCreateNotificationFlow
  };

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      createRoomNoteFlow,
      createRoomNote,
      updateRoom,
      logClean,
      logOther,
      updateRoomFlow,
      updateRoomModel,
      resetRoom,
      resetRoomFlow,
      updateRoomModelFlow,
      removeRoomNote,
      removeRoomNoteFlow,
      uploadPhoto,
      uploadPhotoFlow,
      submitLostItem,
      addLostItemFlow,
      submitInventoryWithdrawl,
      submitInventoryWithdrawlFlow,
      submitInventoryRestock,
      submitInventoryRestockFlow,
      createTask,
      createTaskFlow,
      createTaskBatch,
      createTaskBatchFlow,
      createVirtualAsset,
      updateTask,
      updateTaskFlow,
      updateBatchTasks,
      updateBatchTasksFlow,
      reassignTask,
      reassignTaskFlow,
      convertTask,
      convertTaskFlow,
      roomPlanning,
      roomPlanningFlow,
      createNotificationFlow
    }
  }
}
