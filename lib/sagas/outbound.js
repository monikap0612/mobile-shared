import { delay, take } from 'redux-saga';
import { takeLatest, throttle, put, call, select, fork } from 'redux-saga/effects';
import RNFetchBlob from 'react-native-fetch-blob';
import { get, keys, has, extend } from 'lodash/object';
import { filter, includes, find } from 'lodash/collection';
import moment from 'moment';
import digestAssignment from '../utils/digest-assignment';

import OutboundTypes from '../constants/outbound';
import OutboundActions from '../actions/outbound';
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
import { roomUpdate as ruHash } from '../utils/hashes';
import { offlineable } from '../offline';

export default function({ apiUrl }) {

  // function * taskCreateSuccessFlow(response) {
  //   debugger;
  //   const { uuid: task_id, creator_id: userId, meta } = task;
  //   console.log('success');

  //   if (get(meta, 'isGlitch')) {
  //     const glitchId = get(meta, 'glitchId');
  //     yield put(OutboundActions.updateGlitch({ task_id, user_id, glitchId }));
  //   }

  //   yield put(UpdatesActions.taskSendingSuccess());
  // }
  
  // function * watchTaskCreateSuccessFlow() {
  //   yield takeLatest(OutboundTypes.OUTBOUND_TASK_CREATE_SUCCESS, taskCreateSuccessFlow);
  // }

  // function * tasksCreateSuccessFlow({ task }) {
  //   yield put(UpdatesActions.taskSendingSuccess());
  // }

  // function * watchTasksCreateSuccessFlow() {
  //   yield takeLatest(OutboundTypes.OUTBOUND_TASKS_CREATE_SUCCESS, tasksCreateSuccessFlow);
  // }
  
  const watchers = {
    // watchTaskCreateSuccessFlow,
    // watchTasksCreateSuccessFlow
  };

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      // taskCreateSuccessFlow,
      // tasksCreateSuccessFlow
    }
  }
}