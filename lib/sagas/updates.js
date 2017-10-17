import { delay, take } from 'redux-saga';
import { takeLatest, throttle, put, call, select, fork } from 'redux-saga/effects';
import RNFetchBlob from 'react-native-fetch-blob';
import { get, keys, has, extend } from 'lodash/object';
import { filter, includes, find } from 'lodash/collection';
import moment from 'moment';

import digestAssignment from '../utils/digest-assignment';
import buildTask from '../utils/build-task';
import buildUpdateTask from '../utils/build-update-task';
import buildReassignTask from '../utils/build-reassign-task';

import UpdatesTypes from '../constants/updates';
import UpdatesActions from '../actions/updates';
import OutboundActions from '../actions/outbound';
import AssetsActions from '../actions/assets';
import RoomsActions from '../actions/rooms';
import OverlayActions from '../actions/overlay';

import { userIdSelector, userSelector } from '../selectors/auth';
import { tasksSelector } from '../selectors/rooms';
import { photosSelector } from '../selectors/updates';

import request, { authRequest } from '../utils/request';
import { forkWatchers } from '../utils/sagas';
import { roomUpdate as ruHash } from '../utils/hashes';
import { offlineable } from '../offline';

export default function({ apiUrl }) {
  const ROOM_UPDATE_API = `/room_update`;
  const ROOM_LOG_CLEAN_API = `/attendant`;
  const ROOM_NOTES_API = `/room_notes`;
  const IMAGE_UPLOAD_API = 'https://upload.roomchecking.com/image-upload';
  const LOST_ITEM_API = `/lost_found/founds`;
  const INVENTORY_API = `/hotel_inventory`;
  const TASK_API = `/tasks`;
  const TASK_BATCH_API = `/tasks/batch`;
  const VIRTUAL_ASSETS_API = `/virtual_assets`;
  const PLANNING_API = `/attendant_plannings`;
  const ROOM_RESET_API = `/room_reset`;
  const GLITCHES_API = `/glitches`;

  // Update Room
  function * updateRoomFlow({ roomId, status, tapTs }) {
    const { updates: { outgoingHashes: { room } }} = yield select();
    const oldHash = get(room, roomId, null);
    const hash = ruHash(roomId, 'attendantStatus', status);
    if (oldHash === hash) {
      return true;
    }
    
    try {
      yield put(UpdatesActions.saveOutgoingHash('room', roomId, hash));
      yield put(RoomsActions.updateRoomOptimistic({ roomId, field: 'attendantStatus', value: status }));
      
      if (status === "cleaning") {
        yield put(OutboundActions.roomCleanStart(roomId));
      } else if (status === "paused") {
        yield put(OutboundActions.roomCleanPause(roomId));
      } else if (status === "finish") {
        yield put(OutboundActions.roomCleanFinish(roomId));
      } else if (status === "delay") {
        yield put(OutboundActions.roomDelay(roomId));
      } else if (status === "dnd") {
        yield put(OutboundActions.roomDND(roomId));
      } else if (status === "refuse") {
        yield put(OutboundActions.roomRefuse(roomId));
      } else if (status === "no-check") {
        yield put(OutboundActions.roomNoCheck(roomId));
      } else if (status === "confirm-dnd") {
        yield put(OutboundActions.roomConfirmDND(roomId));
      } else if (status === "") {
        yield put(OutboundActions.roomCancel(roomId));
      }

      if (['dnd', 'refuse', 'delay', 'confirm-dnd'].includes(status)) {
        const { auth: { user }, rooms: { hotelRooms }} = yield select();
        const room = find(hotelRooms, { _id: roomId });
      }

      if (status === 'finish' || status === 'no-check') {
        const { auth: { user }, updates: { rooms: roomUpdates }, rooms: { hotelRooms }} = yield select();
        const room = find(hotelRooms, { _id: roomId });
        const roomUpdate = get(roomUpdates, roomId, {});
        yield put(OutboundActions.logClean(room, user, roomUpdate))
        yield put(UpdatesActions.roomCleanFlush(roomId));
      }
      
      return true
    } catch(e) {
      console.log(e);
    } finally {

    }
  }

  function * watchUpdateRoomFinish(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CLEAN_FINISH, updateRoomFlow);
  }

  function * watchUpdateRoomCleaning(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CLEAN_START, updateRoomFlow);
  }

  function * watchUpdateRoomPause(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CLEAN_PAUSE, updateRoomFlow);
  }

  function * watchUpdateRoomUnpause(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CLEAN_UNPAUSE, updateRoomFlow);
  }

  function * watchUpdateRoomCleaning(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CLEAN_START, updateRoomFlow);
  }

  function * watchUpdateRoomDelay(state) {
    yield throttle(3000, UpdatesTypes.ROOM_DELAY, updateRoomFlow);
  }

  function * watchUpdateRoomDND(state) {
    yield throttle(3000, UpdatesTypes.ROOM_DND, updateRoomFlow);
  }

  function * watchUpdateRoomRefuse(state) {
    yield throttle(3000, UpdatesTypes.ROOM_REFUSE, updateRoomFlow);
  }

  function * watchUpdateRoomInspect(state) {
    yield throttle(3000, UpdatesTypes.ROOM_INSPECT, updateRoomFlow);
  }

  function * watchUpdateRoomNoCheck(state) {
    yield throttle(3000, UpdatesTypes.ROOM_NO_CHECK, updateRoomFlow);
  }

  function * watchUpdateRoomConfirmDND(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CONFIRM_DND, updateRoomFlow);
  }

  function * watchUpdateRoomCancel(state) {
    yield throttle(3000, UpdatesTypes.ROOM_CANCEL, updateRoomFlow);
  }

  // Reset Room
  function * resetRoomFlow({ roomId, tapTs }) {
    const status = "";
    const hash = ruHash(roomId, 'attendantStatus', status);
    
    try {
      yield put(UpdatesActions.saveOutgoingHash('room', roomId, hash));
      yield put(RoomsActions.updateRoomOptimistic({ roomId, field: 'attendantStatus', value: status }));
      // const response = yield call(resetRoom, roomId, tapTs);
      yield put(OutboundActions.roomReset(roomId))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchResetRoomFlow() {
    yield throttle(3000, UpdatesTypes.ROOM_RESET, resetRoomFlow);
  }

  // Room Model
  function * updateRoomModelFlow({ roomId, field, value }) {
    const { updates: { outgoingHashes: { room } }} = yield select();
    const oldHash = get(room, roomId, null);
    const hash = ruHash(roomId, field, value);
    if (oldHash === hash) {
      return true;
    }
    
    try {
      yield put(UpdatesActions.saveOutgoingHash('room', roomId, hash));
      yield put(RoomsActions.updateRoomOptimistic({ roomId, field, value }));
      yield put(OutboundActions.roomUpdate(roomId, field, value));
      return true;
    } catch (error) {
      console.log(error);
    }    
  }

  function * watchRoomModelComment() {
    yield throttle(3000, UpdatesTypes.ROOM_COMMENT, updateRoomModelFlow);
  }

  function * watchRoomModelGuestLocator() {
    yield throttle(3000, UpdatesTypes.ROOM_GUEST_LOCATOR, updateRoomModelFlow);
  }

  function * watchRoomModelUnblock() {
    yield throttle(3000, UpdatesTypes.ROOM_UNBLOCK, updateRoomModelFlow);
  }

  function * watchRoomModelHousekeeping() {
    yield throttle(3000, UpdatesTypes.ROOM_HOUSEKEEPING, updateRoomModelFlow);
  }

  function * watchRoomModelRestock() {
    yield throttle(3000, UpdatesTypes.ROOM_RESTOCK, updateRoomModelFlow);
  }

  function * watchRoomModelTurndown() {
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
    yield throttle(3000, UpdatesTypes.ROOM_NOTE_REMOVE, removeRoomNoteFlow);
  }

  // Image Upload
  const uploadPhoto = function * (path) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: path,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
  
      const response = yield call(request, IMAGE_UPLOAD_API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
        body: formData,
      });
  
      return response.url
    } catch(error) {
      console.log(error)
      return null
    }
  }

  function * uploadPhotoFlow({ path, id }) {
    try {
      const photoUrl = yield call(uploadPhoto, path);
      return yield put(UpdatesActions.photoStore({ path, id, url: photoUrl }))
    } catch (e) {
      console.log(e);
      yield put(UpdatesActions.photoUploadFailure(id));
    } finally {

    }
  }

  function * watchUploadPhoto() {
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

  const addLostItemFlow = offlineable('addLostItemFlow', function * addLostItemFlow({ desc, roomId, photoId }) {
    const userId = yield select(userIdSelector);
    const { lostFound } = yield select();
    
    if (photoId) {
      const photoUrl = yield call(uploadPhoto, lostFound.photoPath);
      yield put(UpdatesActions.photoStore({ path: lostFound.photoPath, id: photoId, url: photoUrl }))
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

    }
    // return yield put(OverlayActions.overlayHide());
  }

  function * watchSubmitInventoryWithdrawal() {
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
    yield throttle(3000, UpdatesTypes.INVENTORY_RESTOCK, submitInventoryRestockFlow);
  }

  // Hotel Tasks
  function * createTask(task, tapTs = null) {
    return yield call(authRequest, TASK_API, {
      method: 'POST',
      body: JSON.stringify({ ...task, tapTs }),
    });
  }

  function * createVirtualAsset({ name, image }) {
    return yield call(authRequest, VIRTUAL_ASSETS_API, {
      method: 'POST',
      body: JSON.stringify({ name, image }),
    });
  }

  function * updateGlitch({ glitchId, task_id, user_id }) {
    return yield call(authRequest, `${GLITCHES_API}/${glitchId}/task`, {
      method: 'PUT',
      body: JSON.stringify({ task_id, user_id }),
    });
  }

  function * createTaskFlow({ data }) {
    const { auth: { hotelId, token, userId, hotel }, updates: { photos }, users: { users, hotelGroups } } = yield select();
    
    try {
      yield put(UpdatesActions.taskSending());
    } catch (error) {
      
    }

    let image = get(data, 'asset.image', null);
    
    try {
      if (get(data, 'photoId') && get(photos, [get(data, 'photoId'), 'url'])) {
        image = get(photos, [get(data, 'photoId'), 'url']);
      } else if (get(data, 'photoId')) {
        const photoId = get(data, 'photoId');
        const path = get(photos, [photoId, 'path']);

        if (path) {
          image = yield call(uploadPhoto, path);
        }
      }
    
    } catch (error) {
      console.log('Photo for task failed', error);
    }

    try {
      const task = buildTask(data, userId, image, users, hotelGroups);
      yield put(OutboundActions.taskCreate(task));

      if (get(task, 'meta.isGlitch')) {
        const { uuid: task_id, creator_id: userId, meta: { glitchId }} = task;
        yield put(OutboundActions.updateGlitch({ task_id, user_id, glitchId }));
      }
      
      yield delay(1000);
      yield put(UpdatesActions.taskSendingSuccess());
  
    } catch (error) {
      console.log(error);
    }
  }

  function * watchCreateTaskFlow() {
    yield throttle(3000, UpdatesTypes.TASK_CREATE, createTaskFlow);
  }

  // Hotel Tasks
  function * createTaskBatch(task, tapTs = null) {
    return yield call(authRequest, TASK_BATCH_API, {
      method: 'POST',
      body: JSON.stringify({ ...task, tapTs }),
    });
  }

  function * createTaskBatchFlow({ data }) {
    const { auth: { hotelId, token, userId, hotel }, updates: { photos }, users: { users, hotelGroups } } = yield select();
    
    try {
      yield put(UpdatesActions.taskSending());
    } catch (error) {
      
    }

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
          // const response = yield call(uploadPhoto, { path });
          image = yield call(uploadPhoto, path);
        }
      }
    } catch (error) {
      console.log('PHOTO for task failed', error);
      // yield put(UpdatesActions.taskSendingFailure(e));
    }

    try {
      const task = buildTask(data, userId, image, users, hotelGroups);
      yield put(OutboundActions.tasksCreate(task));

      yield delay(1000);
      yield put(UpdatesActions.taskSendingSuccess());

    } catch (error) {
      console.log(error);
    }
  }

  function * watchCreateTaskBatchFlow() {
    yield throttle(3000, UpdatesTypes.TASK_CREATE_BATCH, createTaskBatchFlow);
  }

  // Update Task  
  function * updateTaskFlow({ uuid, status }) {
    const userId = yield select(userIdSelector);
    const tasks = yield select(tasksSelector);
    const task = find(tasks, { uuid });

    if (!task) {
      return;
    }

    try {
      const { data, optimistic } = buildUpdateTask(task, uuid, status, userId);
      yield put(RoomsActions.taskUpdateOptimistic({ uuid, update: optimistic }));
      yield put(OutboundActions.taskUpdate(uuid, data));
    
    } catch (error) {
      console.log(error)
    }
  }

  function * watchUpdateTaskFlow(state) {
    yield throttle(3000, UpdatesTypes.TASK_UPDATE, updateTaskFlow);
  }

  function * updateBatchTasksFlow({ tasks }) {
    const userId = yield select(userIdSelector);

    try {
      yield put(OutboundActions.taskUpdateBatch(tasks, userId));
    
    } catch (error) {
      console.log(error);
    }
  }

  function * watchUpdateBatchTasksFlow(state) {
    yield throttle(3000, UpdatesTypes.TASK_UPDATE_BATCH, updateBatchTasksFlow);
  }

  function * reassignTaskFlow({ uuid, ids, dueDate }) {
    const { auth: { hotelId, token, userId, hotel }, users: { users, hotelGroups } } = yield select();

    try {
      const data = buildReassignTask(userId, ids, users, groups, dueDate);
      yield put(OutboundActions.taskReassign(uuid, data));

    } catch (error) {
      console.log(error);
    }
  }

  function * watchReassignTaskFlow(state) {
    yield throttle(3000, UpdatesTypes.TASK_REASSIGN, reassignTaskFlow);
  }

  function * convertTask({ task, update, tapTs }) {
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

  const convertTaskFlow = offlineable('convertTaskFlow', function * convertTaskFlow({ task, update, tapTs }) {
    yield call(convertTask, { task, update, tapTs });
    return true;
  });

  function * watchConvertTaskFlow(state) {
    yield throttle(3000, UpdatesTypes.TASK_CONVERT, convertTaskFlow);
  }

  const createNotificationFlow = offlineable('createNotificationFlow', function * createNotificationFlow({ user, message, room, photoUrl, photoId, photoPath, tapTs }) {
    const { auth: { userId }, updates: { photos }} = yield select();

    let image = null;
    if (photoUrl) {
      image = photoUrl;
    } else if (photoPath) {
      const uploadedPhoto = yield put(UpdatesActions.photoUpload({ path: photoPath, id: photoId }))
      const url = yield call(uploadPhoto, photoPath);
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

    const response = yield call(createTask, task, tapTs);
    return yield put(RoomsActions.tasksFetch());
  });

  function * watchCreateNotificationFlow(state) {
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
    watchRoomModelGuestLocator,
    watchRoomModelUnblock,
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
      updateRoomFlow,
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
      updateGlitch,
      updateTaskFlow,
      updateBatchTasksFlow,
      reassignTaskFlow,
      convertTask,
      convertTaskFlow,
      roomPlanning,
      roomPlanningFlow,
      createNotificationFlow
    }
  }
}
