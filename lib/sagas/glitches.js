'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;


  var GLITCHES_API = apiUrl + '/glitches';

  // Hotel Glitches
  function* fetchGlitches() {
    var _ref2 = yield (0, _effects.select)();

    var _ref2$auth = _ref2.auth;
    var hotelId = _ref2$auth.hotelId;
    var token = _ref2$auth.token;


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
    var _ref3 = yield (0, _effects.select)();

    var _ref3$auth = _ref3.auth;
    var hotelId = _ref3$auth.hotelId;
    var token = _ref3$auth.token;
    var userId = _ref3$auth.userId;
    var user = _ref3$auth.user;
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

  function* submitNewGlitchFlow(_ref4) {
    var newGlitch = _ref4.newGlitch;

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
    var _ref5 = yield (0, _effects.select)();

    var _ref5$auth = _ref5.auth;
    var hotelId = _ref5$auth.hotelId;
    var token = _ref5$auth.token;
    var userId = _ref5$auth.userId;
    var user = _ref5$auth.user;
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

  function* submitUpdateGlitchFlow(_ref6) {
    var updatedGlitch = _ref6.updatedGlitch;

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
    var _ref7 = yield (0, _effects.select)();

    var _ref7$auth = _ref7.auth;
    var hotelId = _ref7$auth.hotelId;
    var token = _ref7$auth.token;
    var userId = _ref7$auth.userId;
    var user = _ref7$auth.user;
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

  function* submitHandoverGlitchFlow(_ref8) {
    var handoverGlitch = _ref8.handoverGlitch;

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
    var _ref9 = yield (0, _effects.select)();

    var _ref9$auth = _ref9.auth;
    var hotelId = _ref9$auth.hotelId;
    var token = _ref9$auth.token;
    var userId = _ref9$auth.userId;
    var user = _ref9$auth.user;
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

  function* submitEmailGlitchFlow(_ref10) {
    var emailGlitch = _ref10.emailGlitch;

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
    var _ref11 = yield (0, _effects.select)();

    var _ref11$auth = _ref11.auth;
    var hotelId = _ref11$auth.hotelId;
    var token = _ref11$auth.token;
    var userId = _ref11$auth.userId;
    var user = _ref11$auth.user;
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

  function* submitCloseGlitchFlow(_ref12) {
    var closedGlitch = _ref12.closedGlitch;

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

  return {
    watchGlitchesFlow: watchGlitchesFlow,
    watchNewGlitchFlow: watchNewGlitchFlow,
    watchUpdateGlitchFlow: watchUpdateGlitchFlow,
    watchHandoverGlitchFlow: watchHandoverGlitchFlow,
    watchEmailGlitchFlow: watchEmailGlitchFlow,
    watchCloseGlitchFlow: watchCloseGlitchFlow
  };
};

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _glitches = require('../constants/glitches');

var _glitches2 = _interopRequireDefault(_glitches);

var _glitches3 = require('../actions/glitches');

var _glitches4 = _interopRequireDefault(_glitches3);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }