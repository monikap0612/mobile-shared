'use strict';

exports.__esModule = true;
exports.UserLogin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _FontAwesome = require('react-native-vector-icons/FontAwesome');

var _FontAwesome2 = _interopRequireDefault(_FontAwesome);

var _reduxForm = require('redux-form');

var _logo = require('../../images/logo.png');

var _logo2 = _interopRequireDefault(_logo);

var _colors = require('../../styles/colors');

var _positioning = require('../../styles/positioning');

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _UserSelect = require('./UserSelect');

var _UserSelect2 = _interopRequireDefault(_UserSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var renderUser = function renderUser(user, index) {
  return _react2['default'].createElement(_reduxForm.Field, { name: 'username', key: index, user: user, component: _UserSelect2['default'] });
};

var UserLogin = exports.UserLogin = function UserLogin(_ref) {
  var hotel = _ref.hotel;
  var handleSubmit = _ref.handleSubmit;
  var submitUserLogin = _ref.submitUserLogin;
  var hotelReset = _ref.hotelReset;
  return _react2['default'].createElement(
    _reactNative.View,
    { style: _styles2['default'].container },
    _react2['default'].createElement(
      _reactNative.View,
      { style: _styles2['default'].hotelNameContainer },
      _react2['default'].createElement(_reactNative.Image, { source: { uri: hotel.image }, style: _styles2['default'].logoImage }),
      _react2['default'].createElement(
        _reactNative.View,
        { style: _styles2['default'].backButtonContainer },
        _react2['default'].createElement(
          _FontAwesome2['default'].Button,
          _extends({
            name: 'arrow-left',
            size: 16,
            onPress: hotelReset
          }, _colors.blue300.bg),
          'Hotel'
        )
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: _styles2['default'].infoContainer },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: _styles2['default'].text },
        hotel.name
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: _styles2['default'].usersContainer },
      hotel.users && hotel.users.map(renderUser)
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: _styles2['default'].inputs },
      _react2['default'].createElement(
        _reactNative.View,
        { style: [_styles2['default'].inputContainer, _positioning.margin.b15] },
        _react2['default'].createElement(_reduxForm.Field, {
          name: 'username',
          style: _styles2['default'].inputField,
          placeholder: 'Username',
          underlineColorAndroid: _colors.transparent.color,
          placeholderTextColor: _colors.opacityWhite.p60.color,
          component: _TextField2['default']
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: _styles2['default'].inputContainer },
        _react2['default'].createElement(_reduxForm.Field, {
          name: 'password',
          secureTextEntry: true,
          style: _styles2['default'].inputField,
          placeholder: 'Password',
          underlineColorAndroid: _colors.transparent.color,
          placeholderTextColor: _colors.opacityWhite.p60.color,
          component: _TextField2['default']
        })
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: _styles2['default'].btnContainer },
      _react2['default'].createElement(_FontAwesome2['default'].Button, {
        name: 'paper-plane',
        activeOpacity: 8,
        padding: 5,
        size: 32,
        backgroundColor: _colors.transparent.color,
        onPress: handleSubmit(submitUserLogin)
      })
    )
  );
};

exports['default'] = (0, _reduxForm.reduxForm)({
  form: 'userLogin'
})(UserLogin);