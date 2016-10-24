'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var apiUrl = _ref.apiUrl;

  var ROOMS_API = apiUrl + '/rooms';
  var FLOORS_API = apiUrl + '/floors';
  var ROOM_STATUSES_API = apiUrl + '/room_statuses';
  var ROOM_HOUSEKEEPINGS_API = apiUrl + '/room_housekeepings';
  var PLANNINGS_API = apiUrl + '/attendant_plannings';
  var PLANNINGS_NIGHT_API = apiUrl + '/attendant_planning_nights';
  var PLANNINGS_RUNNER_API = apiUrl + '/runner_plannings';
  var CALENDAR_API = apiUrl + '/calendar';
  var ROOM_NOTES_API = apiUrl + '/room_notes';
  var CATALOGS_API = apiUrl + '/catalog_by_hotel';
  var TASKS_API = apiUrl + '/tasks';

  // Hotel Rooms
  function* fetchRooms() {
    var _ref2 = yield (0, _effects.select)();

    var _ref2$auth = _ref2.auth;
    var hotelId = _ref2$auth.hotelId;
    var token = _ref2$auth.token;


    return yield (0, _effects.call)(_request2['default'], ROOMS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchRoomsFlow() {
    try {
      var data = yield (0, _effects.call)(fetchRooms);
      yield (0, _effects.put)(_rooms4['default'].roomsSuccess(data));
      yield (0, _effects.put)(_backend2['default'].roomsFetched());
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchRoomsFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOMS_FETCH, fetchRoomsFlow);
  }

  // Hotel Floors
  function* fetchFloors() {
    var _ref3 = yield (0, _effects.select)();

    var _ref3$auth = _ref3.auth;
    var hotelId = _ref3$auth.hotelId;
    var token = _ref3$auth.token;


    return yield (0, _effects.call)(_request2['default'], FLOORS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchFloorsFlow() {
    try {
      var data = yield (0, _effects.call)(fetchFloors);
      yield (0, _effects.put)(_rooms4['default'].floorsSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchFloorsFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].FLOORS_FETCH, fetchFloorsFlow);
  }

  // Hotel Room Status
  function* fetchRoomStatuses() {
    var _ref4 = yield (0, _effects.select)();

    var _ref4$auth = _ref4.auth;
    var hotelId = _ref4$auth.hotelId;
    var token = _ref4$auth.token;


    return yield (0, _effects.call)(_request2['default'], ROOM_STATUSES_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchRoomStatusesFlow() {
    try {
      var data = yield (0, _effects.call)(fetchRoomStatuses);
      yield (0, _effects.put)(_rooms4['default'].roomStatusesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchRoomStatusesFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOM_STATUSES_FETCH, fetchRoomStatusesFlow);
  }

  // Hotel Room Housekeepings
  function* fetchRoomHousekeepings() {
    var _ref5 = yield (0, _effects.select)();

    var _ref5$auth = _ref5.auth;
    var hotelId = _ref5$auth.hotelId;
    var token = _ref5$auth.token;


    return yield (0, _effects.call)(_request2['default'], ROOM_HOUSEKEEPINGS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchRoomHousekeepingsFlow() {
    try {
      var data = yield (0, _effects.call)(fetchRoomHousekeepings);
      yield (0, _effects.put)(_rooms4['default'].roomHousekeepingsSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchRoomHousekeepingsFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOM_HOUSEKEEPINGS_FETCH, fetchRoomHousekeepingsFlow);
  }

  // Hotel Plannings
  function* fetchPlannings() {
    var _ref6 = yield (0, _effects.select)();

    var _ref6$auth = _ref6.auth;
    var hotelId = _ref6$auth.hotelId;
    var token = _ref6$auth.token;


    return yield (0, _effects.call)(_request2['default'], PLANNINGS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchPlanningsFlow() {
    try {
      var data = yield (0, _effects.call)(fetchPlannings);
      yield (0, _effects.put)(_rooms4['default'].planningsSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchPlanningsFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].PLANNINGS_FETCH, fetchPlanningsFlow);
  }

  // Hotel Plannings Night
  function* fetchPlanningsNight() {
    var _ref7 = yield (0, _effects.select)();

    var _ref7$auth = _ref7.auth;
    var hotelId = _ref7$auth.hotelId;
    var token = _ref7$auth.token;


    return yield (0, _effects.call)(_request2['default'], PLANNINGS_NIGHT_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchPlanningsNightFlow() {
    try {
      var data = yield (0, _effects.call)(fetchPlanningsNight);
      yield (0, _effects.put)(_rooms4['default'].planningsNightSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchPlanningsNightFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].PLANNINGS_NIGHT_FETCH, fetchPlanningsNightFlow);
  }

  // Hotel Plannings Runner
  function* fetchPlanningsRunner() {
    var _ref8 = yield (0, _effects.select)();

    var _ref8$auth = _ref8.auth;
    var hotelId = _ref8$auth.hotelId;
    var token = _ref8$auth.token;


    return yield (0, _effects.call)(_request2['default'], PLANNINGS_RUNNER_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchPlanningsRunnerFlow() {
    try {
      var data = yield (0, _effects.call)(fetchPlanningsRunner);
      yield (0, _effects.put)(_rooms4['default'].planningsRunnerSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchPlanningsRunnerFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].PLANNINGS_RUNNER_FETCH, fetchPlanningsRunnerFlow);
  }

  // Hotel Calender
  function* fetchCalendar() {
    var _ref9 = yield (0, _effects.select)();

    var _ref9$auth = _ref9.auth;
    var hotelId = _ref9$auth.hotelId;
    var token = _ref9$auth.token;


    return yield (0, _effects.call)(_request2['default'], CALENDAR_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchCalendarFlow() {
    try {
      var data = yield (0, _effects.call)(fetchCalendar);
      yield (0, _effects.put)(_rooms4['default'].calendarSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchCalendarFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].CALENDAR_FETCH, fetchCalendarFlow);
  }

  // Hotel Room Notes
  function* fetchRoomNotes() {
    var _ref10 = yield (0, _effects.select)();

    var _ref10$auth = _ref10.auth;
    var hotelId = _ref10$auth.hotelId;
    var token = _ref10$auth.token;


    return yield (0, _effects.call)(_request2['default'], ROOM_NOTES_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchRoomNotesFlow() {
    try {
      var data = yield (0, _effects.call)(fetchRoomNotes);
      yield (0, _effects.put)(_rooms4['default'].roomNotesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchRoomNotesFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOM_NOTES_FETCH, fetchRoomNotesFlow);
  }

  // Hotel Catalogs
  function* fetchCatalogs() {
    var _ref11 = yield (0, _effects.select)();

    var _ref11$auth = _ref11.auth;
    var hotelId = _ref11$auth.hotelId;
    var token = _ref11$auth.token;


    return yield (0, _effects.call)(_request2['default'], CATALOGS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchCatalogsFlow() {
    try {
      var data = yield (0, _effects.call)(fetchCatalogs);
      yield (0, _effects.put)(_rooms4['default'].catalogsSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchCatalogsFlow(state) {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].CATALOGS_FETCH, fetchCatalogsFlow);
  }

  // Hotel Tasks
  function* fetchTasks() {
    var _ref12 = yield (0, _effects.select)();

    var _ref12$auth = _ref12.auth;
    var hotelId = _ref12$auth.hotelId;
    var token = _ref12$auth.token;


    return yield (0, _effects.call)(_request2['default'], TASKS_API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  function* fetchTasksFlow() {
    try {
      var data = yield (0, _effects.call)(fetchTasks);
      yield (0, _effects.put)(_rooms4['default'].tasksSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {}
  }

  function* watchTasksFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].TASKS_FETCH, fetchTasksFlow);
  }

  return {
    watchRoomsFlow: watchRoomsFlow,
    watchFloorsFlow: watchFloorsFlow,
    watchRoomStatusesFlow: watchRoomStatusesFlow,
    watchRoomHousekeepingsFlow: watchRoomHousekeepingsFlow,
    watchPlanningsFlow: watchPlanningsFlow,
    watchPlanningsNightFlow: watchPlanningsNightFlow,
    watchPlanningsRunnerFlow: watchPlanningsRunnerFlow,
    watchCalendarFlow: watchCalendarFlow,
    watchRoomNotesFlow: watchRoomNotesFlow,
    watchCatalogsFlow: watchCatalogsFlow,
    watchTasksFlow: watchTasksFlow
  };
};

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _rooms = require('../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _rooms3 = require('../actions/rooms');

var _rooms4 = _interopRequireDefault(_rooms3);

var _backend = require('../actions/backend');

var _backend2 = _interopRequireDefault(_backend);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }