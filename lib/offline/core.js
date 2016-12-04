import { last, initial } from 'lodash/array';
import { call, put } from 'redux-saga/effects';

import { enqueue } from './actions';

export const checker = (err) => {
  if (err.status >= 500 || err.status === 404 || err.status === 'Network request failed') {
    return true;
  }
  return false;
}

export const offlineSagaEnchancer = (offlineChecker) => (saga) => {
  return function * (...args) {
    const offlineMeta = last(args);
    const clearArgs = initial(args);
    let response;

    try {
      if (offlineMeta && offlineMeta.queued) {
        response = yield call(saga, ...clearArgs);
      } else {
        response = yield call(saga, ...args);
      }

      return response;
    } catch (err) {
      if (offlineChecker(err)) {
        if (!offlineMeta || !offlineMeta.queued) {
          yield put(enqueue(saga.name, args))
        }
      } else {
        throw err;
      }
    }
  }
}

export const offlineable = offlineSagaEnchancer(checker)

export default offlineable
