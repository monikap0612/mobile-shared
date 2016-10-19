'use strict';

exports.__esModule = true;

exports['default'] = function () {
  function* routeBackFlow(_ref) {
    var nav = _ref.nav;

    var _ref2 = yield (0, _effects.select)();

    var roomId = _ref2.rooms.activeRoom;


    if (nav.sceneKey === 'inventoryLayout') {
      yield (0, _effects.put)(_updates2['default'].flushInventory({ roomId: roomId }));
    }
    _reactNativeRouterFlux.Actions.pop();
  }

  function* watchRouteBack() {
    yield* (0, _reduxSaga.takeLatest)(_routes2['default'].WILL_MOVE_BACK, routeBackFlow);
  }

  return {
    watchRouteBack: watchRouteBack
  };
};

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactNativeRouterFlux = require('react-native-router-flux');

var _routes = require('../constants/routes');

var _routes2 = _interopRequireDefault(_routes);

var _updates = require('../actions/updates');

var _updates2 = _interopRequireDefault(_updates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }