import { takeEvery, delay, take, takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import AuthTypes from '../constants/auth';
import AuthActions from '../actions/auth';
import RoomsActions from '../actions/rooms';
import AssetsActions from '../actions/assets';
import GlitchesActions from '../actions/glitches';
import UpdateActions from '../actions/updates';

import request from '../utils/request';
import API_URL from '../api';

// import {
//   hotelRequest,
//   hotelSuccess,
//   hotelFailure
// } from '../actions/auth';

const MOBILE_USERS_API = `${API_URL}/mobile_users`;
const AUTH_API = `${API_URL}/session`;
const USER_API = `${API_URL}/users`;
const HOTEL_API = `${API_URL}/hotel`;

// Logout
export function * logoutFlow({ hotel }) {
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

export function * watchLogout() {
  yield * takeLatest(AuthTypes.LOGOUT, logoutFlow);
}

// HOTEL SUBMISSION
export function * submitHotelLogin(hotel) {
  const url = `${MOBILE_USERS_API}?hotelUsername=${hotel.toLowerCase()}&userType=room_runner`;
  return yield call(request, url, { method: 'GET' });
}

export function * submitHotelFlow({ hotel }) {
  try {
    const data = yield call(submitHotelLogin, hotel);
    yield put(AuthActions.hotelSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchHotelFlow() {
  yield * takeEvery(AuthTypes.HOTEL_REQUEST, submitHotelFlow);
}

// USER SUBMISSION
export function * submitUserLogin({ hotelUsername, username, password }) {
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

export function * submitUserFlow({ hotelUsername, username, password }) {
  // console.log(hotelUsername, username, password);
  try {
    const data = yield call(submitUserLogin, { hotelUsername, username, password });
    yield put(AuthActions.userSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchUserFlow() {
  yield * takeEvery(AuthTypes.USER_REQUEST, submitUserFlow)
}

// HOTEL FETCH

export function * fetchHotel() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, `${HOTEL_API}/${hotelId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchHotelFlow() {
  try {
    const data = yield call(fetchHotel, null);
    yield put(AuthActions.hotelFetchSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchFetchHotelFlow() {
  yield * takeEvery(AuthTypes.HOTEL_FETCH, fetchHotelFlow)
}
