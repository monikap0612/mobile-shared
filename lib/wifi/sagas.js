import { put, call, delay, takeLatest, select } from 'redux-saga/effects';
// import SystemSetting from 'react-native-system-setting'

import Types from './types';
import Actions from './actions';

const toggleWifi = async () => {
  return new Promise((resolve, reject) => {
    // SystemSetting.switchWifi(resolve);
  })
}

export default function(options = {}) {
  // const powerFlow = function * ({ payload }) {
  //   try {
  //     const value = payload.on
  //     yield wifi.setEnabled(value);
  //     yield put(Actions.powerSuccess(value))
  //   } catch (e) {
  //     console.log('WIFI power error', e)
  //     yield put(Actions.powerFailure(e))
  //   }
  // }

  // const watchPower = function * () {
  //   yield takeLatest(Types.POWER, powerFlow);
  // }

  const powerToggleFlow = function * () {
    const { wifi: { isRunning }} = yield select();

    if (isRunning) {
      return;
    }

    try {
      yield put(Actions.powerToggleRunning());
      // const isEnabled = yield call(SystemSetting.isWifiEnabled);
      // console.log('isEnabled', isEnabled);

      if (isEnabled) {
        // yield call(toggleWifi);
        yield put(Actions.powerSuccess(false));
        yield delay(10 * 1000);
        // yield call(toggleWifi);
        yield delay(10 * 1000);
        yield put(Actions.powerSuccess(true));
      } else {
        // yield call(toggleWifi);
        yield delay(10 * 1000);
        yield put(Actions.powerSuccess(true));
      }

      // const isFinalEnable = yield call(SystemSetting.isWifiEnabled);
      if (!isFinalEnable) {
        yield put(Actions.powerSuccess(false));
        throw("WIFI should be on but is not");
      }
      yield put(Actions.powerToggleFinished());
    
    } catch (error) {
      console.log('WIFI power error', error)
      yield put(Actions.powerFailure(error))
    }
  }

  const watchTogglePower = function * () {
    yield takeLatest(Types.TOGGLE_POWER, powerToggleFlow);
  }

  const root = function * () {
    // yield fork(watchPower);
    yield fork(watchTogglePower)
 }

  return {
    root,
    watchers: {
      // watchPower,
      watchTogglePower
    },
    sagas: {
      // powerFlow,
      powerToggleFlow
    }
  };
}
