'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;


  var GLITCHES_API = apiUrl + '/glitches';

  // Hotel Glitches
  function* fetchGlitches() {
    var _ref2 = yield (0, _effects.select)(),
        _ref2$auth = _ref2.auth,
        hotelId = _ref2$auth.hotelId,
        token = _ref2$auth.token;

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
    var _ref3 = yield (0, _effects.select)(),
        _ref3$auth = _ref3.auth,
        hotelId = _ref3$auth.hotelId,
        token = _ref3$auth.token,
        userId = _ref3$auth.userId,
        user = _ref3$auth.user;

    data.creator_id = userId;
    data.responsible_id = userId;
    data.responsible_first_name = user.first_name;
    data.responsible_last_name = user.last_name;

    return yield (0, _effects.call)(_request2['default'], GLITCHES_API, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  function* submitNewGlitchFlow(_ref4) {
    var newGlitch = _ref4.newGlitch;

    console.log(newGlitch);

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
    var _ref5 = yield (0, _effects.select)(),
        _ref5$auth = _ref5.auth,
        hotelId = _ref5$auth.hotelId,
        token = _ref5$auth.token,
        userId = _ref5$auth.userId,
        user = _ref5$auth.user,
        uuid = _ref5.glitches.activeGlitch;

    data.user_id = userId;
    console.log(uuid, data);

    return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
  function* submitHandoverGlitch(handover_id) {
    var _ref7 = yield (0, _effects.select)(),
        _ref7$auth = _ref7.auth,
        hotelId = _ref7$auth.hotelId,
        token = _ref7$auth.token,
        userId = _ref7$auth.userId,
        user = _ref7$auth.user,
        uuid = _ref7.glitches.activeGlitch;

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
    var _ref9 = yield (0, _effects.select)(),
        _ref9$auth = _ref9.auth,
        hotelId = _ref9$auth.hotelId,
        token = _ref9$auth.token,
        userId = _ref9$auth.userId,
        user = _ref9$auth.user;

    var uuid = data.uuid,
        address = data.address,
        subject = data.subject,
        message = data.message;


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

  // Task Glitch
  function* submitTaskGlitch(taskUUID) {
    var _ref11 = yield (0, _effects.select)(),
        _ref11$auth = _ref11.auth,
        hotelId = _ref11$auth.hotelId,
        token = _ref11$auth.token,
        userId = _ref11$auth.userId,
        user = _ref11$auth.user,
        uuid = _ref11.glitches.activeGlitch;

    var data = {
      task_id: taskUUID,
      user_id: userId
    };
    console.log(data);

    return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid + '/task', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  function* submitGlitchTaskFlow(_ref12) {
    var taskUUID = _ref12.taskUUID;

    console.log(taskUUID);
    try {
      yield (0, _effects.call)(submitTaskGlitch, taskUUID);
      var data = yield (0, _effects.call)(fetchGlitches);
      yield (0, _effects.put)(_glitches4['default'].glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchGlitchTaskFlow() {
    yield* (0, _reduxSaga.takeEvery)(_glitches2['default'].GLITCH_TASK, submitGlitchTaskFlow);
  }

  // Close Glitch
  function* submitCloseGlitch(data) {
    var _ref13 = yield (0, _effects.select)(),
        _ref13$auth = _ref13.auth,
        hotelId = _ref13$auth.hotelId,
        token = _ref13$auth.token,
        userId = _ref13$auth.userId,
        user = _ref13$auth.user,
        uuid = _ref13.glitches.activeGlitch;

    data.user_id = userId;
    data.is_completed = true;

    return yield (0, _effects.call)(_request2['default'], GLITCHES_API + '/' + uuid, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  function* submitCloseGlitchFlow(_ref14) {
    var closedGlitch = _ref14.closedGlitch;

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
    watchGlitchTaskFlow: watchGlitchTaskFlow,
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