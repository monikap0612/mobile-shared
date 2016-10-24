'use strict';

exports.__esModule = true;
exports.fetchGlitches = fetchGlitches;
exports.fetchGlitchesFlow = fetchGlitchesFlow;
exports.watchGlitchesFlow = watchGlitchesFlow;
exports.submitNewGlitch = submitNewGlitch;
exports.submitNewGlitchFlow = submitNewGlitchFlow;
exports.watchNewGlitchFlow = watchNewGlitchFlow;
exports.submitUpdateGlitch = submitUpdateGlitch;
exports.submitUpdateGlitchFlow = submitUpdateGlitchFlow;
exports.watchUpdateGlitchFlow = watchUpdateGlitchFlow;
exports.submitHandoverGlitch = submitHandoverGlitch;
exports.submitHandoverGlitchFlow = submitHandoverGlitchFlow;
exports.watchHandoverGlitchFlow = watchHandoverGlitchFlow;
exports.submitEmailGlitch = submitEmailGlitch;
exports.submitEmailGlitchFlow = submitEmailGlitchFlow;
exports.watchEmailGlitchFlow = watchEmailGlitchFlow;
exports.submitCloseGlitch = submitCloseGlitch;
exports.submitCloseGlitchFlow = submitCloseGlitchFlow;
exports.watchCloseGlitchFlow = watchCloseGlitchFlow;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _glitches = require('../constants/glitches');

var _glitches2 = _interopRequireDefault(_glitches);

var _glitches3 = require('../actions/glitches');

var _glitches4 = _interopRequireDefault(_glitches3);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GLITCHES_API = _api2['default'] + '/glitches';

// Hotel Glitches
function* fetchGlitches() {
  var _ref = yield (0, _effects.select)();

  var _ref$auth = _ref.auth;
  var hotelId = _ref$auth.hotelId;
  var token = _ref$auth.token;


  return yield (0, _effects.call)(_request2['default'], GLITCHES_API, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

function* fetchGlitchesFlow() {
  try {
    var data = yield (0, _effects.call)(fetchGlitches);
    yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchGlitchesFlow(state) {
  yield* (0, _reduxSaga.takeLatest)(_glitches2['default'].GLITCHES_FETCH, fetchGlitchesFlow);
}

// New Glitch
function* submitNewGlitch(data) {
  var _ref2 = yield (0, _effects.select)();

  var _ref2$auth = _ref2.auth;
  var hotelId = _ref2$auth.hotelId;
  var token = _ref2$auth.token;
  var userId = _ref2$auth.userId;
  var user = _ref2$auth.user;
  var room_id = data.glitchRoomId;
  var room_name = data.glitchRoomName;
  var name = data.glitchGuestName;
  var email = data.glitchGuestEmail;
  var category = data.glitchCategory;
  var description = data.glitchDescription;
  var action = data.glitchAction;
  var followup = data.glitchFollowup;
  var cost = data.glitchCost;


  return yield (0, _effects.call)(_request2['default'], GLITCHES_API, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      room_id: room_id, room_name: room_name, guest_info: { name: name, email: email }, category: category,
      description: description, action: action, followup: followup, cost: cost, creator_id: userId,
      responsible_id: userId, responsible_first_name: user.first_name,
      responsible_last_name: user.last_name
    })
  });
}

function* submitNewGlitchFlow(_ref3) {
  var newGlitch = _ref3.newGlitch;

  try {
    var response = yield (0, _effects.call)(submitNewGlitch, newGlitch);
    var data = yield (0, _effects.call)(fetchGlitches);
    yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchNewGlitchFlow() {
  yield* (0, _reduxSaga.takeEvery)(_glitches2['default'].GLITCH_NEW, submitNewGlitchFlow);
}

// Update Glitch
function* submitUpdateGlitch(data) {
  var _ref4 = yield (0, _effects.select)();

  var _ref4$auth = _ref4.auth;
  var hotelId = _ref4$auth.hotelId;
  var token = _ref4$auth.token;
  var userId = _ref4$auth.userId;
  var user = _ref4$auth.user;
  var uuid = data.uuid;
  var category = data.glitchCategory;
  var description = data.glitchDescription;
  var action = data.glitchAction;
  var followup = data.glitchFollowup;
  var cost = data.glitchCost;


  return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      category: category,
      description: description,
      action: action,
      followup: followup,
      cost: cost,
      user_id: userId
    })
  });
}

function* submitUpdateGlitchFlow(_ref5) {
  var updatedGlitch = _ref5.updatedGlitch;

  try {
    yield (0, _effects.call)(submitUpdateGlitch, updatedGlitch);
    var data = yield (0, _effects.call)(fetchGlitches);
    yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchUpdateGlitchFlow() {
  yield* (0, _reduxSaga.takeEvery)(_glitches2['default'].GLITCH_UPDATE, submitUpdateGlitchFlow);
}

// Handover Glitch
function* submitHandoverGlitch(data) {
  var _ref6 = yield (0, _effects.select)();

  var _ref6$auth = _ref6.auth;
  var hotelId = _ref6$auth.hotelId;
  var token = _ref6$auth.token;
  var userId = _ref6$auth.userId;
  var user = _ref6$auth.user;
  var uuid = data.uuid;
  var handover_id = data.handover_id;


  console.log(uuid, handover_id);

  return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid + '/handover', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      handover_id: handover_id,
      user_id: userId
    })
  });
}

function* submitHandoverGlitchFlow(_ref7) {
  var handoverGlitch = _ref7.handoverGlitch;

  try {
    yield (0, _effects.call)(submitHandoverGlitch, handoverGlitch);
    var data = yield (0, _effects.call)(fetchGlitches);
    yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchHandoverGlitchFlow() {
  yield* (0, _reduxSaga.takeEvery)(_glitches2['default'].GLITCH_HANDOVER, submitHandoverGlitchFlow);
}

// Email Glitch
function* submitEmailGlitch(data) {
  var _ref8 = yield (0, _effects.select)();

  var _ref8$auth = _ref8.auth;
  var hotelId = _ref8$auth.hotelId;
  var token = _ref8$auth.token;
  var userId = _ref8$auth.userId;
  var user = _ref8$auth.user;
  var uuid = data.uuid;
  var address = data.address;
  var subject = data.subject;
  var message = data.message;


  console.log(address, subject, message);

  return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid + '/email', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: address,
      subject: subject,
      message: message,
      user_id: userId
    })
  });
}

function* submitEmailGlitchFlow(_ref9) {
  var emailGlitch = _ref9.emailGlitch;

  try {
    yield (0, _effects.call)(submitEmailGlitch, emailGlitch);
    var data = yield (0, _effects.call)(fetchGlitches);
    yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchEmailGlitchFlow() {
  yield* (0, _reduxSaga.takeEvery)(_glitches2['default'].GLITCH_EMAIL, submitEmailGlitchFlow);
}

// Close Glitch
function* submitCloseGlitch(data) {
  var _ref10 = yield (0, _effects.select)();

  var _ref10$auth = _ref10.auth;
  var hotelId = _ref10$auth.hotelId;
  var token = _ref10$auth.token;
  var userId = _ref10$auth.userId;
  var user = _ref10$auth.user;
  var uuid = data.uuid;
  var category = data.glitchCategory;
  var description = data.glitchDescription;
  var action = data.glitchAction;
  var followup = data.glitchFollowup;
  var cost = data.glitchCost;


  return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      category: category,
      description: description,
      action: action,
      followup: followup,
      cost: cost,
      is_completed: true,
      user_id: userId
    })
  });
}

function* submitCloseGlitchFlow(_ref11) {
  var closedGlitch = _ref11.closedGlitch;

  try {
    yield (0, _effects.call)(submitCloseGlitch, closedGlitch);
    var data = yield (0, _effects.call)(fetchGlitches);
    yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
  } catch (e) {
    console.log(e);
  } finally {}
}

function* watchCloseGlitchFlow() {
  yield* (0, _reduxSaga.takeEvery)(_glitches2['default'].GLITCH_CLOSE, submitCloseGlitchFlow);
}