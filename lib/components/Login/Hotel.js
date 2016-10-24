'use strict';

exports.__esModule = true;
exports.HotelLogin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _FontAwesome = require('react-native-vector-icons/FontAwesome');

var _FontAwesome2 = _interopRequireDefault(_FontAwesome);

var _reduxForm = require('redux-form');

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _splashSm = require('../../images/splash-sm.png');

var _splashSm2 = _interopRequireDefault(_splashSm);

var _colors = require('../../styles/colors');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HotelLogin = exports.HotelLogin = function HotelLogin(_ref) {
  var submitHotelLogin = _ref.submitHotelLogin;
  var handleSubmit = _ref.handleSubmit;
  var appName = _ref.appName;
  return _react2['default'].createElement(
    _reactNative.View,
    { style: _styles2['default'].container },
    _react2['default'].createElement(
      _reactNative.View,
      { style: _styles2['default'].hotelContainer },
      _react2['default'].createElement(
        _reactNative.View,
        { style: _styles2['default'].logoContainer },
        _react2['default'].createElement(_reactNative.Image, { source: _splashSm2['default'], style: _styles2['default'].logoImage })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: _styles2['default'].hotelInfoContainer },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: [_styles2['default'].text, _styles2['default'].header] },
          'RoomChecking: ',
          appName
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: [_styles2['default'].text, _styles2['default'].subheader] },
          'Please enter in your hotel'
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: _styles2['default'].hotelInputContainer },
        _react2['default'].createElement(_reduxForm.Field, {
          style: _styles2['default'].hotelInput,
          underlineColorAndroid: _colors.transparent.color,
          placeholderTextColor: _colors.opacityWhite.p60.color,
          placeholder: 'Hotel Name',
          name: 'hotel',
          component: _TextField2['default']
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: _styles2['default'].hotelBtnContainer },
        _react2['default'].createElement(_FontAwesome2['default'].Button, {
          name: 'paper-plane',
          size: 32,
          backgroundColor: _colors.transparent.color,
          onPress: handleSubmit(submitHotelLogin)
        })
      )
    )
  );
};

exports['default'] = (0, _reduxForm.reduxForm)({
  form: 'hotelLogin'
})(HotelLogin);