import { delay, take } from 'redux-saga';
import { takeLatest, throttle, put, call, select, fork } from 'redux-saga/effects';
import { get, keys, has, extend } from 'lodash/object';
import { filter, includes, find } from 'lodash/collection';
import { isNumber } from 'lodash/lang';
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
  // const IMAGE_UPLOAD_API = 'https://upload.roomchecking.com/image-upload';
  const IMAGE_UPLOAD_API = 'https://www.filestackapi.com/api/store/S3?key=AwMlkjOdcTp2fmqSd0KPDz';
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
        yield put(OutboundActions.logOther(room, user, status));
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

  // Room Mobile Housekeeping
  function * mobileHousekeepingFlow({ roomId, roomHousekeeping, attendantStatus }) {
    try {
      yield put(RoomsActions.updateRoomOptimistic({ roomId, field: 'roomHousekeeping', value: roomHousekeeping }));
      yield put(RoomsActions.updateRoomOptimistic({ roomId, field: 'attendantStatus', value: attendantStatus }));
      // const response = yield call(attendantInspect, { roomId, roomHousekeeping, attendantStatus });
      yield put(OutboundActions.roomAttendantInspect(roomId, roomHousekeeping, attendantStatus));
      // const room = response.room;
      
      // return yield put(RoomsActions.updateRoom(room))
    } catch (error) {
      
    }
  }
  
  function * watchMobileHousekeepingFlow(state) {
    yield takeLatest(UpdatesTypes.ROOM_MOBILE_INSPECT, mobileHousekeepingFlow);
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
    const hash = moment().unix();
    if (isNumber(oldHash) && oldHash + 3 >= hash) {
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
  const roomPlanning = offlineable('roomPlanning', function * roomPlanning({ room, user, options }) {
    const { auth: { userId }, rooms: { hotelPlannings }} = yield select();
    const { _id: roomId, roomCredits, roomPlanning: planning } = room;

    const isPlanned = !!find(hotelPlannings, { room_id: roomId, is_optimistic: false });
    const endpoint = isPlanned ? `${PLANNING_API}/${roomId}` : PLANNING_API;
    const method = isPlanned ? 'PUT' : 'POST';
    let data;

    if (isPlanned) {
      data = _.extend({}, planning, {
        user_id: user && user._id || null,
        credits: roomCredits,
        room_id: roomId
      })
    } else {
      data = {
        user_id: user && user._id || null,
        room_id: roomId,
        creator_id: userId,
        credits: roomCredits || 1,
        is_priority: 0
      }
    }

    if (options) {
      data = extend({}, data, options);
    }

    // console.log(method, data);

    return yield call(authRequest, endpoint, {
      method,
      body: JSON.stringify(data)
    });
  })

  function * roomPlanningFlow({ room, user, options }) {
    const { _id: roomId, isChangeSheets } = room;
    
    if (options && options.guest_status && options.guest_status === "" && isChangeSheets) {
      yield call(updateRoomModelFlow, { roomId, field: 'isChangeSheets', value: false });
      return;
    } else if (options && options.guest_status && options.guest_status === "weekly") {
      yield call(updateRoomModelFlow, { roomId, field: 'isChangeSheets', value: true });
      return;
    }
    
    const response = yield call(roomPlanning, { room, user, options });
    yield put(RoomsActions.planningsUpdateOptmistic({ roomId, user, options }));
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
      formData.append('fileUpload', {
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

  function * addLostItemFlow({ desc, roomId, photoId }) {
    const userId = yield select(userIdSelector);
    const { lostFound } = yield select();

    if (photoId) {
      yield put(OutboundActions.uploadLFPhoto(lostFound.photoPath, photoId, desc, roomId));
    } else {
      yield call(submitLostItemFlow, { desc, roomId, image: null });
    }
  }

  function * watchAddLostItem() {
    yield throttle(3000, UpdatesTypes.LOST_ITEM_ADD, addLostItemFlow);
  }

  function * addLostItemPhotoFlow({ payload, meta }) {
    try {
      const { desc, roomId, photoId } = meta;
      yield put(UpdatesActions.photoRemove(photoId));
      yield call(submitLostItemFlow, { desc, roomId, image: payload });
    } catch (error) {
      console.log(error)
    }
  }

  function * watchLostItemPhotoFlow() {
    yield takeLatest(UpdatesTypes.LOST_ITEM_APPLY_PHOTO, addLostItemPhotoFlow);
  }

  function * submitLostItemFlow({ desc, roomId, image }) {
    try {
      yield put(OutboundActions.submitLostItem(desc, roomId, image));
      yield put(UpdatesActions.lostItemAddSuccess(null));
    } catch (error) {
      console.log(error)
    }
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
  function * createTaskFlow({ data }) {
    const { auth: { hotelId, token, userId, hotel }, updates: { photos }, users: { users, hotelGroups } } = yield select();
    let image = get(data, 'asset.image', null);
    let task;
    let isPhotoUpload = false;
    
    try {
      yield put(UpdatesActions.taskSending());
    } catch (error) {
      
    }

    try {
      if (get(data, 'photoId') && get(photos, [get(data, 'photoId'), 'url'])) {
        image = get(photos, [get(data, 'photoId'), 'url']);
      }
  
      task = buildTask(data, userId, image, users, hotelGroups);
    } catch (error) {
      console.log(error)
      return;
    }

    if (get(data, 'photoId') && !get(photos, [get(data, 'photoId'), 'url'])) {
      const photoId = get(data, 'photoId');
      const path = get(photos, [photoId, 'path']);

      if (path) {
        // image = yield call(uploadPhoto, path);
        yield put(OutboundActions.uploadTaskPhoto(path, task));
        isPhotoUpload = true;
      }
    }

    if (!isPhotoUpload) {
      yield call(createTaskSubmitFlow, { task });
    }

    yield delay(1000);
    yield put(UpdatesActions.taskSendingSuccess());
  }

  function * watchCreateTaskFlow() {
    yield throttle(3000, UpdatesTypes.TASK_CREATE, createTaskFlow);
  }

  function * createTaskBatchFlow({ data }) {
    const { auth: { hotelId, token, userId, hotel }, updates: { photos }, users: { users, hotelGroups } } = yield select();
    let image = get(data, 'asset.image', null);
    let task;
    let isPhotoUpload = false;
    
    try {
      yield put(UpdatesActions.taskSending());
    } catch (error) {
      
    }

    try {
      if (get(data, 'photoId') && get(photos, [get(data, 'photoId'), 'url'])) {
        image = get(photos, [get(data, 'photoId'), 'url']);
      }
  
      task = buildTask(data, userId, image, users, hotelGroups);
    } catch (error) {
      console.log(error)
      return;
    }

    if (get(data, 'photoId') && !get(photos, [get(data, 'photoId'), 'url'])) {
      const photoId = get(data, 'photoId');
      const path = get(photos, [photoId, 'path']);

      if (path) {
        // image = yield call(uploadPhoto, path);
        yield put(OutboundActions.uploadTaskPhoto(path, task));
        isPhotoUpload = true;
      }
    }

    if (!isPhotoUpload) {
      yield call(createTaskSubmitFlow, { task });
    }

    yield delay(1000);
    yield put(UpdatesActions.taskSendingSuccess());
  }

  function * watchCreateTaskBatchFlow() {
    yield throttle(3000, UpdatesTypes.TASK_CREATE_BATCH, createTaskBatchFlow);
  }

  function * createTaskApplyPhotoFlow({ meta, payload }) {
    const { task } = meta;
    task.meta.image = payload;
    yield call(createTaskSubmitFlow, { task });
  }

  function * watchCreateTaskApplyPhotoFlow() {
    yield takeLatest(UpdatesTypes.TASK_CREATE_APPLY_PHOTO, createTaskApplyPhotoFlow);
  }

  function * createTaskSubmitFlow({ task }) {
    try {
      if (has(task, 'locations')) {
        yield put(OutboundActions.tasksCreate(task));
      } else {
        yield put(OutboundActions.taskCreate(task));
      }

      if (get(task, 'meta.isGlitch')) {
        const { uuid: task_id, creator_id: userId, meta: { glitchId }} = task;
        yield put(OutboundActions.updateGlitch({ task_id, user_id, glitchId }));
      }
    
    } catch (error) {
      console.log(error)
    }
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
      const data = buildReassignTask(userId, ids, users, hotelGroups, dueDate);
      yield put(OutboundActions.taskReassign(uuid, data));

    } catch (error) {
      console.log(error);
    }
  }

  function * watchReassignTaskFlow(state) {
    yield throttle(3000, UpdatesTypes.TASK_REASSIGN, reassignTaskFlow);
  }

  function * convertTaskFlow({ task, update }) {
    const { auth: { hotelId, token, userId, hotel }, users: { users, hotelGroups } } = yield select();
    
    try {
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

      yield put(OutboundActions.taskConvert(uuid, data));

    } catch (error) {
      console.log(error);
    }
  }

  function * watchConvertTaskFlow(state) {
    yield throttle(3000, UpdatesTypes.TASK_CONVERT, convertTaskFlow);
  }

  function * createNotificationFlow({ user, message, room, photoUrl, photoId, photoPath, tapTs }) {
    const { auth: { userId }, updates: { photos }} = yield select();
    let image = null;
    let task;

    try {
      task = {
        creator_id: userId,
        task: message,
        type: 'notification',
        meta: {
          room_id: room && room._id || null,
          location: room && room.name || null
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
    } catch (error) {
      console.log(error);
    }

    try {
      if (photoPath) {
        yield put(OutboundActions.uploadNotificationPhoto(photoPath, task));
      } else {
        if (photoUrl) {
          image = photoUrl;
        } else if (photoId && get(photos, [photoId, 'url'])) {
          image = get(photos, [photoId, 'url']);
        }
        task.meta.image = image;

        console.log('bybebyeby')
        yield call(submitCreateNotificationFlow, task);

      }
    } catch (error) {
      console.log(error)
    }
  }

  function * watchCreateNotificationFlow(state) {
    yield throttle(3000, UpdatesTypes.NOTIFICATION_CREATE, createNotificationFlow);
  }

  function * createNotificationApplyPhotoFlow({ meta, payload }) {
    const { task } = meta;
    task.meta.image = payload;
    yield call(submitCreateNotificationFlow, task);
  }

  function * watchNotificationTaskApplyPhotoFlow() {
    yield takeLatest(UpdatesTypes.NOTIFICATION_CREATE_APPLY_PHOTO, createNotificationApplyPhotoFlow);
  }

  function * submitCreateNotificationFlow(task) {
    yield put(OutboundActions.notificationCreate(task));
  }

  function * roomMessageAddFlow({ roomId, message }) {
    try {
      console.log('roomMessageAddFlow', roomId, message)
      yield put(OutboundActions.messageAdd(roomId, message));
    } catch (error) {
      console.log(error);
    }
  }
  
  function * watchRoomMessageAddFlow() {
    yield throttle(3000, UpdatesTypes.ROOM_MESSAGE_ADD, roomMessageAddFlow);
  }

  function * roomMessageRemoveFlow({ roomId, messageIds }) {
    try {
      console.log('roomMessageRemoveFlow', roomId)
      yield put(OutboundActions.messageRemove(roomId, messageIds));
    } catch (error) {
      console.log(error);
    }
  }

  function * watchRoomMessageRemoveFlow() {
    yield throttle(3000, UpdatesTypes.ROOM_MESSAGE_REMOVE, roomMessageRemoveFlow);
  }

  function * roomMessageUpdateFlow({ roomId, messageIds, message }) {
    try {
      console.log('roomMessageUpdateFlow')
      yield put(OutboundActions.messageUpdate(roomId, messageIds, message));
    } catch (error) {
      console.log(error);
    }
  }

  function * watchRoomMessageUpdateFlow() {
    yield throttle(3000, UpdatesTypes.ROOM_MESSAGE_UPDATE, roomMessageUpdateFlow);
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
    watchMobileHousekeepingFlow,
    watchRoomModelRestock,
    watchRoomModelTurndown,
    watchCreateRoomNote,
    watchRemoveRoomNote,
    watchUploadPhoto,
    watchAddLostItem,
    watchLostItemPhotoFlow,
    watchSubmitInventoryWithdrawal,
    watchSubmitInventoryRestock,
    watchCreateTaskFlow,
    watchCreateTaskBatchFlow,
    watchUpdateTaskFlow,
    watchUpdateBatchTasksFlow,
    watchReassignTaskFlow,
    watchConvertTaskFlow,
    watchRoomPlanningFlow,
    watchCreateNotificationFlow,
    watchNotificationTaskApplyPhotoFlow,
    watchCreateTaskApplyPhotoFlow,
    watchRoomMessageAddFlow,
    watchRoomMessageRemoveFlow,
    watchRoomMessageUpdateFlow,
  };

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      createRoomNoteFlow,
      createRoomNote,
      updateRoomFlow,
      mobileHousekeepingFlow,
      resetRoomFlow,
      updateRoomModelFlow,
      removeRoomNote,
      removeRoomNoteFlow,
      uploadPhoto,
      uploadPhotoFlow,
      addLostItemFlow,
      addLostItemPhotoFlow,
      submitLostItemFlow,
      submitInventoryWithdrawl,
      submitInventoryWithdrawlFlow,
      submitInventoryRestock,
      submitInventoryRestockFlow,
      createTaskFlow,
      createTaskBatchFlow,
      updateTaskFlow,
      updateBatchTasksFlow,
      reassignTaskFlow,
      convertTaskFlow,
      roomPlanning,
      roomPlanningFlow,
      createNotificationFlow,
      createTaskSubmitFlow,
      createTaskApplyPhotoFlow,
      submitCreateNotificationFlow,
      roomMessageAddFlow,
      roomMessageRemoveFlow,
      roomMessageUpdateFlow,
    }
  }
}
