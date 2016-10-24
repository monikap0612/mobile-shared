'use strict';

exports.__esModule = true;

var _immutableTransform = require('./utils/immutable-transform');

var _immutableTransform2 = _interopRequireDefault(_immutableTransform);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: _reactNative.AsyncStorage,
    transforms: [_immutableTransform2['default']],
    blacklist: ['overlay', 'backend']
  }
};

exports['default'] = REDUX_PERSIST;