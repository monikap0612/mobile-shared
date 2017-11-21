import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import wifi from 'react-native-android-wifi';

import Types from './types';
import Actions from './actions';

export default function(options = {}) {
  const powerFlow = function * ({ payload }) {
    try {
      const value = payload.on
      yield wifi.setEnabled(value);
      yield put(Actions.powerSuccess(value))
    } catch (e) {
      console.log('WIFI power error', e)
      yield put(Actions.powerFailure(e))
    }
  }

  const watchPower = function * () {
    yield takeLatest(Types.POWER, powerFlow);
  }

  const root = function * () {
    yield fork(watchPower);
 }

  return {
    root,
    watchers: {
      watchPower,
    },
    sagas: {
      powerFlow,
    }
  };
}
