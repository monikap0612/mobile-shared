'use strict';

exports.__esModule = true;
exports.UserSelect = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var missingImage = 'https://www.filepicker.io/api/file/Ptnbq1eDRfeQ3m4LTFnJ';

var UserSelect = exports.UserSelect = function UserSelect(_ref) {
  var user = _ref.user;
  var onChange = _ref.input.onChange;
  return _react2['default'].createElement(
    _reactNative.TouchableOpacity,
    { key: user.username, onPress: function onPress() {
        return onChange(user.username);
      } },
    _react2['default'].createElement(_reactNative.Image, { source: { uri: user.image || missingImage }, style: _styles2['default'].userImage })
  );
};

exports['default'] = UserSelect;