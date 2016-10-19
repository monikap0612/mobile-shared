'use strict';

exports.__esModule = true;
exports.routeWillBack = routeWillBack;

var _routes = require('../constants/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function routeWillBack(nav) {
  return {
    type: _routes2['default'].WILL_MOVE_BACK,
    nav: nav
  };
}

exports['default'] = {
  routeWillBack: routeWillBack
};