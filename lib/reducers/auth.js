'use strict';

exports.__esModule = true;
exports.INITIAL_STATE = undefined;

var _ACTION_HANDLERS;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

var _auth = require('../constants/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2['default'])({
  isActiveHotel: false,
  hotelUsername: null,
  hotelName: null,
  hotelImage: null,
  hotelUsers: [],
  user: null,
  hotel: null,
  groups: [],
  userId: null,
  hotelId: null,
  token: null,
  error: null
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _ACTION_HANDLERS[_auth2['default'].HOTEL_REQUEST] = function (state, _ref) {
  var hotel = _ref.hotel;

  return state.set('hotelUsername', hotel);
}, _ACTION_HANDLERS[_auth2['default'].HOTEL_SUCCESS] = function (state, _ref2) {
  var name = _ref2.name;
  var images = _ref2.images;
  var users = _ref2.users;

  return state.set('isActiveHotel', true).set('hotelName', name).set('hotelImage', images).set('hotelUsers', users);
}, _ACTION_HANDLERS[_auth2['default'].HOTEL_FAILURE] = function (state) {
  return state;
}, _ACTION_HANDLERS[_auth2['default'].USER_SUCCESS] = function (state, _ref3) {
  var token = _ref3.token;
  var hotel = _ref3.hotel;
  var user = _ref3.user;
  var groups = _ref3.groups;
  var userId = user._id;
  var hotelId = hotel._id;


  console.log(token, hotel, user, groups, userId, hotelId);

  return state.set('token', token).set('hotel', hotel).set('user', user).set('userId', userId).set('hotelId', hotelId).set('groups', groups);
}, _ACTION_HANDLERS[_auth2['default'].USER_FAILURE] = function (state) {
  return state;
}, _ACTION_HANDLERS[_auth2['default'].HOTEL_FETCH_SUCCESS] = function (state, _ref4) {
  var hotel = _ref4.hotel;

  return state.set('hotel', hotel);
}, _ACTION_HANDLERS[_auth2['default'].HOTEL_RESET] = function (state) {
  return INITIAL_STATE;
}, _ACTION_HANDLERS);

exports['default'] = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);