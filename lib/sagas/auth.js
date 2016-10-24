'use strict';

exports.__esModule = true;
exports.logoutFlow = logoutFlow;
exports.watchLogout = watchLogout;
exports.submitHotelLogin = submitHotelLogin;
exports.submitHotelFlow = submitHotelFlow;
exports.watchHotelFlow = watchHotelFlow;
exports.submitUserLogin = submitUserLogin;
exports.submitUserFlow = submitUserFlow;
exports.watchUserFlow = watchUserFlow;
exports.fetchHotel = fetchHotel;
exports.fetchHotelFlow = fetchHotelFlow;
exports.watchFetchHotelFlow = watchFetchHotelFlow;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _auth = require('../constants/auth');

var _auth2 = _interopRequireDefault(_auth);

var _auth3 = require('../actions/auth');

var _auth4 = _interopRequireDefault(_auth3);

var _rooms = require('../actions/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _assets = require('../actions/assets');

var _assets2 = _interopRequireDefault(_assets);

var _glitches = require('../actions/glitches');

var _glitches2 = _interopRequireDefault(_glitches);

var _updates = require('../actions/updates');

var _updates2 = _interopRequireDefault(_updates);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import {
//   hotelRequest,
//   hotelSuccess,
//   hotelFailure
// } from '../actions/auth';

var MOBILE_USERS_API = _api2['default'] + '/mobile_users';
var AUTH_API = _api2['default'] + '/session';
var USER_API = _api2['default'] + '/users';
var HOTEL_API = _api2['default'] + '/hotel';

// Logout
function* logoutFlow(_ref) {
  var hotel = _ref.hotel;

  try {
    yield (0, _effects.put)(_auth4['default'].hotelReset());
    yield (0, _effects.put)(_rooms2['default'].resetRooms());
    yield (0, _effects.put)(_assets2['default'].resetAssets());
    // yield put(GlitchesActions.resetGlitches());
    yield (0, _effects.put)(_updates2['default'].resetUpdates());
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchLogout() {
  yield* (0, _reduxSaga.takeLatest)(_auth2['default'].LOGOUT, logoutFlow);
}

// HOTEL SUBMISSION
function* submitHotelLogin(hotel) {
  var url = MOBILE_USERS_API + '?hotelUsername=' + hotel.toLowerCase() + '&userType=room_runner';
  return yield (0, _effects.call)(_request2['default'], url, { method: 'GET' });
}

function* submitHotelFlow(_ref2) {
  var hotel = _ref2.hotel;

  try {
    var data = yield (0, _effects.call)(submitHotelLogin, hotel);
    yield (0, _effects.put)(_auth4['default'].hotelSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchHotelFlow() {
  yield* (0, _reduxSaga.takeEvery)(_auth2['default'].HOTEL_REQUEST, submitHotelFlow);
}

// USER SUBMISSION
function* submitUserLogin(_ref3) {
  var hotelUsername = _ref3.hotelUsername;
  var username = _ref3.username;
  var password = _ref3.password;

  console.log(hotelUsername, username, password);

  return yield (0, _effects.call)(_request2['default'], AUTH_API, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hotel: hotelUsername.toLowerCase(),
      username: username.toLowerCase(),
      password: password
    })
  });
}

function* submitUserFlow(_ref4) {
  var hotelUsername = _ref4.hotelUsername;
  var username = _ref4.username;
  var password = _ref4.password;

  // console.log(hotelUsername, username, password);
  try {
    var data = yield (0, _effects.call)(submitUserLogin, { hotelUsername: hotelUsername, username: username, password: password });
    yield (0, _effects.put)(_auth4['default'].userSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchUserFlow() {
  yield* (0, _reduxSaga.takeEvery)(_auth2['default'].USER_REQUEST, submitUserFlow);
}

// HOTEL FETCH

function* fetchHotel() {
  var _ref5 = yield (0, _effects.select)();

  var _ref5$auth = _ref5.auth;
  var hotelId = _ref5$auth.hotelId;
  var token = _ref5$auth.token;


  return yield (0, _effects.call)(_request2['default'], HOTEL_API + '/' + hotelId, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

function* fetchHotelFlow() {
  try {
    var data = yield (0, _effects.call)(fetchHotel, null);
    yield (0, _effects.put)(_auth4['default'].hotelFetchSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchFetchHotelFlow() {
  yield* (0, _reduxSaga.takeEvery)(_auth2['default'].HOTEL_FETCH, fetchHotelFlow);
}