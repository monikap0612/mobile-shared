'use strict';

exports.__esModule = true;
exports.Login = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Hotel = require('./Hotel');

var _Hotel2 = _interopRequireDefault(_Hotel);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Login = exports.Login = function Login(_ref) {
  var isActiveHotel = _ref.isActiveHotel;

  var others = _objectWithoutProperties(_ref, ['isActiveHotel']);

  return isActiveHotel ? _react2['default'].createElement(_User2['default'], others) : _react2['default'].createElement(_Hotel2['default'], others);
};

exports['default'] = Login;