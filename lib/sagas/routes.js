'use strict';

exports.__esModule = true;

exports['default'] = function () {
  function* routeBackFlow(_ref) {
    var nav = _ref.nav;

    var _ref2 = yield (0, _effects.select)();

    var _ref2$auth = _ref2.auth;
    var hotelId = _ref2$auth.hotelId;
    var token = _ref2$auth.token;
    var scene = _ref2.routes.scene;
    var _ref2$rooms = _ref2.rooms;
    var roomId = _ref2$rooms.activeRoom;
    var hotelRooms = _ref2$rooms.hotelRooms;


    if (nav.sceneKey === "inventoryLayout") {
      yield (0, _effects.put)(_updates2['default'].flushInventory({ roomId: roomId }));
    }

    if (nav.sceneKey === "cleanLayout") {
      var room = (0, _collection.find)(hotelRooms, { _id: roomId });
      if (room && (0, _object.get)(room, 'attendantStatus') === 'cleaning') {
        return yield (0, _effects.put)(_overlay2['default'].overlayShow({ icon: 'Pulse', color: '#C93C46', message: 'Cannot leave room while cleaning' }));
      }
    }

    _reactNativeRouterFlux.Actions.pop();
  }

  function* watchRouteBack(state) {
    yield* (0, _reduxSaga.takeLatest)(_routes2['default'].WILL_MOVE_BACK, routeBackFlow);
  }

  return {
    watchRouteBack: watchRouteBack
  };
};

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactNativeRouterFlux = require('react-native-router-flux');

var _collection = require('lodash/collection');

var _object = require('lodash/object');

var _routes = require('../constants/routes');

var _routes2 = _interopRequireDefault(_routes);

var _routes3 = require('../actions/routes');

var _routes4 = _interopRequireDefault(_routes3);

var _updates = require('../actions/updates');

var _updates2 = _interopRequireDefault(_updates);

var _overlay = require('../actions/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }