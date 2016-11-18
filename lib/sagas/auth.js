import { takeEvery, delay, take, takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import AuthTypes from '../constants/auth';
import AuthActions from '../actions/auth';
import RoomsActions from '../actions/rooms';
import AssetsActions from '../actions/assets';
import GlitchesActions from '../actions/glitches';
import UpdateActions from '../actions/updates';

import request from '../utils/request';

export default function({ apiUrl, userType }) { 
  const MOBILE_USERS_API = `${apiUrl}/mobile_users`;
  const AUTH_API = `${apiUrl}/session`;
  const USER_API = `${apiUrl}/users`;
  const HOTEL_API = `${apiUrl}/hotel`;

  // Logout
  function * logoutFlow({ hotel }) {
    try {
      yield put(AuthActions.hotelReset());
      yield put(RoomsActions.resetRooms());
      yield put(AssetsActions.resetAssets());
      // yield put(GlitchesActions.resetGlitches());
      yield put(UpdateActions.resetUpdates());
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchLogout() {
    yield * takeLatest(AuthTypes.LOGOUT, logoutFlow);
  }

  // HOTEL SUBMISSION
  function * submitHotelLogin(hotel) {
    const url = `${MOBILE_USERS_API}?hotelUsername=${hotel.toLowerCase()}&userType=${userType}`;
    return yield call(request, url, { method: 'GET' });
  }

  function * submitHotelFlow({ hotel }) {
    try {
      const data = yield call(submitHotelLogin, hotel);
      yield put(AuthActions.hotelSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchHotelFlow() {
    yield * takeEvery(AuthTypes.HOTEL_REQUEST, submitHotelFlow);
  }

  // USER SUBMISSION
  function * submitUserLogin({ hotelUsername, username, password }) {
    console.log(hotelUsername, username, password);

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
    // console.log(hotelUsername, username, password);
    try {
      const data = yield call(submitUserLogin, { hotelUsername, username, password });
      yield put(AuthActions.userSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchUserFlow() {
    yield * takeEvery(AuthTypes.USER_REQUEST, submitUserFlow)
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
      console.log(e);
    } finally {

    }
  }

  function * watchFetchHotelFlow() {
    yield * takeEvery(AuthTypes.HOTEL_FETCH, fetchHotelFlow)
  }

  return {
    watchLogout,
    watchHotelFlow,
    watchUserFlow,
    watchFetchHotelFlow
  }
}

