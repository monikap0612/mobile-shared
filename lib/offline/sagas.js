import { Alert } from 'react-native';
import { REHYDRATE } from 'redux-persist/constants';
import { call, put, select, fork, take, cancel } from 'redux-saga/effects';
import { delay, takeLatest, takeEvery } from 'redux-saga';
import { isEmpty } from 'lodash/lang';
import { logError } from '../utils/request';
import moment from 'moment';

import {
  offlineQueueSelector,
  nextOfflineQueueSelector,
  isRunningOfflineQueueSelector,
  sizeOfflineQueueSelector,
  currentRunningOfflineQueueSelector,
  delayOfflineQueueSelector,
  totalAttemptsOfflineQueueSelector,
} from './selectors';
import { dequeue, start, stop, currentRunning, nextAttempt } from './actions';
import Types from './constants';

export default function({ requireSaga, customTriggers }) {
  const watchTriggers = function * () {
    let triggers = [REHYDRATE, Types.ENQUEUE];
    if (!isEmpty(customTriggers)) {
      triggers = triggers.concat(customTriggers);
    }
    while(true) {
      const action = yield take(triggers);
      yield put(start());
    }
  }

  const watchQueue = function * () {
    while(true) {
      yield take(Types.START)
      const watcher = yield fork(runQueue);
      yield take(Types.STOP)
      yield cancel(watcher)
    }
  }

  const runQueue = function * () {
    const attempts = yield select(totalAttemptsOfflineQueueSelector);
    let queueSize = yield select(sizeOfflineQueueSelector);

    while (queueSize > 0) {
      const response = yield runQueueItem()

      if (!response) {
        for (let i = 1; i <= attempts; i++) {
          yield put(nextAttempt(i))
          const resp = yield runQueueItem()
          if (resp) {
            break;
          }
        }
        yield put(stop())
      }

      queueSize = yield select(sizeOfflineQueueSelector);
    }

    yield put(stop())
  }

  const runQueueItem = function * () {
    const nextItem = yield select(nextOfflineQueueSelector);
    const delayTime = yield select(delayOfflineQueueSelector);

    if (!nextItem) {
      yield put(stop())
    }

    const { saga, args, ts } = nextItem;
    yield put(currentRunning(nextItem))

    try {
      sagaFunc = requireSaga(saga);
    } catch(err) {
      console.log(`Function Not Found: ${saga}`, err)
      yield call(logError, saga, { args, ts, err });
      yield put(stop())
    }


    yield delay(delayTime);
    
    try {
      const response = yield call(sagaFunc, ...[...args, { queued: true }])
    } catch (error) {
      console.log(`Error with calling sagaFunc: ${saga}`, err)
      yield call(logError, saga, { args, ts, err });
    }

    if (response) {
      yield put(dequeue(nextItem));
    }

    return response;
  }

  const root = function * () {
    yield fork(watchQueue);
    yield fork(watchTriggers);
 }

  return {
    root,
    watchers: {
      watchQueue,
      watchTriggers,
    },
    sagas: {
      runQueue,
      runQueueItem,
    }
  };
}
