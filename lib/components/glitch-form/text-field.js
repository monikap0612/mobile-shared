'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextField = function TextField(props) {
  var style = props.style,
      _props$input = props.input,
      value = _props$input.value,
      onChange = _props$input.onChange,
      _onBlur = _props$input.onBlur,
      _props$meta = props.meta,
      error = _props$meta.error,
      touched = _props$meta.touched,
      otherProps = _objectWithoutProperties(props, ['style', 'input', 'meta']);

  return _react2['default'].createElement(_reactNative.TextInput, _extends({
    style: style,
    underlineColorAndroid: 'transparent',
    onChangeText: function onChangeText(text) {
      return onChange(text);
    },
    onBlur: function onBlur(text) {
      return _onBlur(text);
    },
    value: value,
    selectTextOnFocus: true
  }, otherProps));
};

var styles = _reactNative.StyleSheet.create({
  input: {}
});

exports['default'] = TextField;