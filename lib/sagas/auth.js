import { delay, take } from 'redux-saga';
import { takeLatest, put, call, select, fork } from 'redux-saga/effects';
import { startAsyncValidation, stopAsyncValidation } from 'redux-form'

import AuthTypes from '../constants/auth';
import AuthActions from '../actions/auth';
import RoomsActions from '../actions/rooms';
import AssetsActions from '../actions/assets';
import GlitchesActions from '../actions/glitches';
import UpdateActions from '../actions/updates';
import DifferencesActions from '../actions/differences';
import BackendActions from '../actions/backend';
import { Actions as OfflineActions } from '../offline';

import request, { logError } from '../utils/request';
import { forkWatchers } from '../utils/sagas';

const HOTEL_ERROR_MESSAGE = "Unable to locate hotel users"
const USER_ERROR_MESSAGE = "Wrong username or password"

export default function({ apiUrl, userType }) {

  const MOBILE_USERS_API = `${apiUrl}/mobile_users`;
  const AUTH_API = `${apiUrl}/session`;
  const USER_API = `${apiUrl}/users`;
  const HOTEL_API = `${apiUrl}/hotel`;

  // Logout
  function * logoutFlow({ hotel }) {
    try {
      yield put(AuthActions.userReset());
      yield put(RoomsActions.resetRooms());
      yield put(AssetsActions.resetAssets());
      yield put(GlitchesActions.glitchesReset());
      yield put(UpdateActions.resetUpdates());
      yield put(DifferencesActions.resetDifferences());
      yield put(OfflineActions.clear());
      yield put(BackendActions.reset());

    } catch (e) {
      // console.log(e);
      yield call(logError, e, null, userType);
    } finally {

    }
  }

  function * watchLogout() {
    yield takeLatest(AuthTypes.LOGOUT, logoutFlow);
  }

  // HOTEL SUBMISSION
  function * submitHotelLogin(hotel) {
    const url = `${MOBILE_USERS_API}?hotelUsername=${hotel.toLowerCase()}&userType=${userType}`;
    return yield call(request, url, { method: 'GET' });
  }

  function * submitHotelFlow({ hotel }) {
    try {
      yield put(startAsyncValidation('hotelLogin'));
      const data = yield call(submitHotelLogin, hotel);
      yield put(AuthActions.hotelSuccess(data));
      yield put(stopAsyncValidation('hotelLogin', {}));
    } catch (e) {
      yield put(stopAsyncValidation('hotelLogin', {_error: HOTEL_ERROR_MESSAGE}));
    } finally {
    }
  }

  function * watchHotelFlow() {
    yield takeLatest(AuthTypes.HOTEL_REQUEST, submitHotelFlow);
  }

  // USER SUBMISSION
  function * submitUserLogin({ hotelUsername, username, password }) {
    // console.log(hotelUsername, username, password);

    return yield call(request, AUTH_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hotel: hotelUsername.toLowerCase(),
        username: username.toLowerCase(),
        password
      })
    });
  }

  function * submitUserFlow({ hotelUsername, username, password }) {
    try {
      yield put(startAsyncValidation('userLogin'));
      const data = yield call(submitUserLogin, { hotelUsername, username, password });
      // console.log(data);
      yield put(AuthActions.userSuccess(data));
      yield put(stopAsyncValidation('userLogin', {}));
    } catch (e) {
      yield put(stopAsyncValidation('userLogin', {_error: USER_ERROR_MESSAGE}));
    } finally {
    }
  }

  function * watchUserFlow() {
    yield takeLatest(AuthTypes.USER_REQUEST, submitUserFlow)
  }

  // HOTEL FETCH

  function * fetchHotel() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, `${HOTEL_API}/${hotelId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchHotelFlow() {
    try {
      const data = yield call(fetchHotel, null);
      yield put(AuthActions.hotelFetchSuccess(data));
    } catch (e) {
      // console.log(e);
    } finally {

    }
  }

  function * watchFetchHotelFlow() {
    yield takeLatest(AuthTypes.HOTEL_FETCH, fetchHotelFlow)
  }

  const watchers = {
    watchLogout,
    watchHotelFlow,
    watchUserFlow,
    watchFetchHotelFlow
  };

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      logoutFlow,
      submitHotelLogin,
      submitHotelFlow,
      submitUserLogin,
      submitUserFlow,
      fetchHotel,
      fetchHotelFlow,
    }
  }
}
