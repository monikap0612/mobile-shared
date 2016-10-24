'use strict';

exports.__esModule = true;
exports.hotelRequest = hotelRequest;
exports.hotelSuccess = hotelSuccess;
exports.hotelFailure = hotelFailure;
exports.userRequest = userRequest;
exports.userSuccess = userSuccess;
exports.userFailure = userFailure;
exports.hotelFetch = hotelFetch;
exports.hotelFetchSuccess = hotelFetchSuccess;
exports.hotelReset = hotelReset;
exports.logout = logout;

var _auth = require('../constants/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function hotelRequest(hotel) {
  return {
    type: _auth2['default'].HOTEL_REQUEST,
    hotel: hotel
  };
}

function hotelSuccess(_ref) {
  var name = _ref.name;
  var images = _ref.images;
  var users = _ref.users;

  return {
    type: _auth2['default'].HOTEL_SUCCESS,
    name: name,
    images: images,
    users: users
  };
}

function hotelFailure(_ref2) {
  var error = _ref2.error;

  return {
    type: _auth2['default'].HOTEL_FAILURE,
    error: error
  };
}

function userRequest(_ref3) {
  var hotelUsername = _ref3.hotelUsername;
  var username = _ref3.username;
  var password = _ref3.password;

  return {
    type: _auth2['default'].USER_REQUEST,
    hotelUsername: hotelUsername,
    username: username,
    password: password
  };
}

function userSuccess(_ref4) {
  var token = _ref4.token;
  var user = _ref4.user;
  var hotel = _ref4.hotel;
  var groups = _ref4.groups;

  return {
    type: _auth2['default'].USER_SUCCESS,
    token: token,
    user: user,
    hotel: hotel,
    groups: groups
  };
}

function userFailure(error) {
  console.log(error);
}

function hotelFetch() {
  return {
    type: _auth2['default'].HOTEL_FETCH
  };
}

function hotelFetchSuccess(_ref5) {
  var hotel = _ref5.hotel;

  return {
    type: _auth2['default'].HOTEL_FETCH_SUCCESS,
    hotel: hotel
  };
}

function hotelReset() {
  return {
    type: _auth2['default'].HOTEL_RESET
  };
}

function logout() {
  return {
    type: _auth2['default'].LOGOUT
  };
}

exports['default'] = {
  hotelRequest: hotelRequest,
  hotelSuccess: hotelSuccess,
  hotelFailure: hotelFailure,
  userRequest: userRequest,
  userSuccess: userSuccess,
  userFailure: userFailure,
  hotelFetch: hotelFetch,
  hotelFetchSuccess: hotelFetchSuccess,
  hotelReset: hotelReset,
  logout: logout
};