'use strict';

exports.__esModule = true;
exports.roomsFetched = roomsFetched;

var _backend = require('../constants/backend');

var _backend2 = _interopRequireDefault(_backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function roomsFetched() {
  return {
    type: _backend2['default'].ROOMS_FETCHED
  };
}

exports['default'] = {
  roomsFetched: roomsFetched
};