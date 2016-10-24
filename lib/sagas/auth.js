'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;
  var userType = _ref.userType;

  var MOBILE_USERS_API = apiUrl + '/mobile_users';
  var AUTH_API = apiUrl + '/session';
  var USER_API = apiUrl + '/users';
  var HOTEL_API = apiUrl + '/hotel';

  // Logout
  function* logoutFlow(_ref2) {
    var hotel = _ref2.hotel;

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
    var url = MOBILE_USERS_API + '?hotelUsername=' + hotel.toLowerCase() + '&userType=' + userType;
    return yield (0, _effects.call)(_request2['default'], url, { method: 'GET' });
  }

  function* submitHotelFlow(_ref3) {
    var hotel = _ref3.hotel;

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
  function* submitUserLogin(_ref4) {
    var hotelUsername = _ref4.hotelUsername;
    var username = _ref4.username;
    var password = _ref4.password;

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

  function* submitUserFlow(_ref5) {
    var hotelUsername = _ref5.hotelUsername;
    var username = _ref5.username;
    var password = _ref5.password;

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
    var _ref6 = yield (0, _effects.select)();

    var _ref6$auth = _ref6.auth;
    var hotelId = _ref6$auth.hotelId;
    var token = _ref6$auth.token;


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

  return {
    watchLogout: watchLogout,
    watchHotelFlow: watchHotelFlow,
    watchUserFlow: watchUserFlow,
    watchFetchHotelFlow: watchFetchHotelFlow
  };
};

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }