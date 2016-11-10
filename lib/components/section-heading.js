'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SectionHeading = function SectionHeading(_ref) {
  var heading = _ref.heading,
      style = _ref.style,
      children = _ref.children;

  return _react2['default'].createElement(
    _reactNative.View,
    { style: [styles.container, style] },
    _react2['default'].createElement(
      _reactNative.Text,
      { style: styles.text },
      ('' + (children || heading || '')).toUpperCase()
    )
  );
};

var styles = _reactNative.StyleSheet.create({
  container: {
    marginBottom: 4,
    // borderBottomWidth: 1,
    // borderBottomColor: '#C2C2C2',
    borderStyle: 'solid',
    paddingBottom: 1
  },
  text: {
    fontWeight: '700',
    color: '#888888',
    fontSize: 13
  }
});

exports['default'] = SectionHeading;