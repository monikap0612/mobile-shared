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
  var CALENDAR_API = apiUrl + '/calendar';
  var ROOM_NOTES_API = apiUrl + '/room_notes';
  var CATALOGS_API = apiUrl + '/catalog_by_hotel';
  var TASKS_API = apiUrl + '/tasks';

  // Hotel Rooms
  function* fetchRooms() {
    var _ref2 = yield (0, _effects.select)();

    var token = _ref2.auth.token;


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
    } catch (e) {
      console.log(e);
    }
  }

  function* watchRoomsFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOMS_FETCH, fetchRoomsFlow);
  }

  // Hotel Floors
  function* fetchFloors() {
    var _ref3 = yield (0, _effects.select)();

    var token = _ref3.auth.token;


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
    }
  }

  function* watchFloorsFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].FLOORS_FETCH, fetchFloorsFlow);
  }

  // Hotel Room Status
  function* fetchRoomStatuses() {
    var _ref4 = yield (0, _effects.select)();

    var token = _ref4.auth.token;


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
    }
  }

  function* watchRoomStatusesFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOM_STATUSES_FETCH, fetchRoomStatusesFlow);
  }

  // Hotel Room Housekeepings
  function* fetchRoomHousekeepings() {
    var _ref5 = yield (0, _effects.select)();

    var token = _ref5.auth.token;


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
    }
  }

  function* watchRoomHousekeepingsFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOM_HOUSEKEEPINGS_FETCH, fetchRoomHousekeepingsFlow);
  }

  // Hotel Plannings
  function* fetchPlannings() {
    var _ref6 = yield (0, _effects.select)();

    var token = _ref6.auth.token;


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
    }
  }

  function* watchPlanningsFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].PLANNINGS_FETCH, fetchPlanningsFlow);
  }

  // Hotel Plannings Night
  function* fetchPlanningsNight() {
    var _ref7 = yield (0, _effects.select)();

    var token = _ref7.auth.token;


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
    }
  }

  function* watchPlanningsNightFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].PLANNINGS_NIGHT_FETCH, fetchPlanningsNightFlow);
  }

  // Hotel Calender
  function* fetchCalendar() {
    var _ref8 = yield (0, _effects.select)();

    var token = _ref8.auth.token;


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
    }
  }

  function* watchCalendarFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].CALENDAR_FETCH, fetchCalendarFlow);
  }

  // Hotel Room Notes
  function* fetchRoomNotes() {
    var _ref9 = yield (0, _effects.select)();

    var token = _ref9.auth.token;


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
    }
  }

  function* watchRoomNotesFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].ROOM_NOTES_FETCH, fetchRoomNotesFlow);
  }

  // Hotel Catalogs
  function* fetchCatalogs() {
    var _ref10 = yield (0, _effects.select)();

    var token = _ref10.auth.token;


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
    }
  }

  function* watchCatalogsFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].CATALOGS_FETCH, fetchCatalogsFlow);
  }

  // Hotel Tasks
  function* fetchTasks() {
    var _ref11 = yield (0, _effects.select)();

    var token = _ref11.auth.token;


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
    }
  }

  function* watchTasksFlow() {
    yield* (0, _reduxSaga.takeLatest)(_rooms2['default'].TASKS_FETCH, fetchTasksFlow);
  }

  return {
    watchTasksFlow: watchTasksFlow,
    watchCatalogsFlow: watchCatalogsFlow,
    watchRoomNotesFlow: watchRoomNotesFlow,
    watchCalendarFlow: watchCalendarFlow,
    watchPlanningsNightFlow: watchPlanningsNightFlow,
    watchPlanningsFlow: watchPlanningsFlow,
    watchRoomHousekeepingsFlow: watchRoomHousekeepingsFlow,
    watchRoomStatusesFlow: watchRoomStatusesFlow,
    watchFloorsFlow: watchFloorsFlow,
    watchRoomsFlow: watchRoomsFlow
  };
};

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _rooms = require('../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _rooms3 = require('../actions/rooms');

var _rooms4 = _interopRequireDefault(_rooms3);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }