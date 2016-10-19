'use strict';

exports.__esModule = true;

var _reactNative = require('react-native');

var _reduxPersist = require('redux-persist');

var _persist = require('../persist');

var _persist2 = _interopRequireDefault(_persist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var updateReducers = function updateReducers(store) {
  var reducerVersion = _persist2['default'].reducerVersion;
  var config = _persist2['default'].storeConfig;

  (0, _reduxPersist.persistStore)(store, config);

  _reactNative.AsyncStorage.getItem('reducerVersion').then(function (localVersion) {
    if (localVersion !== reducerVersion) {
      (0, _reduxPersist.persistStore)(store, config, function () {
        // Start a fresh store
        (0, _reduxPersist.persistStore)(store, config);
      }).purgeAll();

      _reactNative.AsyncStorage.setItem('reducerVersion', reducerVersion);
    }
  })['catch'](function () {
    _reactNative.AsyncStorage.setItem('reducerVersion', reducerVersion);
  });
};

exports['default'] = { updateReducers: updateReducers };