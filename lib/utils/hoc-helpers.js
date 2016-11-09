'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.injectStyles = injectStyles;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function injectStyles(WrappedComponent) {
  var _class, _temp;

  var defaultStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _temp = _class = function (_Component) {
    _inherits(WrappedWithStyles, _Component);

    function WrappedWithStyles() {
      _classCallCheck(this, WrappedWithStyles);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WrappedWithStyles.prototype.render = function render() {
      var _props = this.props,
          style = _props.style,
          otherProps = _objectWithoutProperties(_props, ['style']);

      var mergedStyles = {};
      var overrides = style || {};
      Object.keys(defaultStyles).forEach(function (key) {
        if (overrides[key]) {
          mergedStyles[key] = _reactNative.StyleSheet.flatten([defaultStyles[key], overrides[key]]);
        } else {
          mergedStyles[key] = defaultStyles[key];
        }
      });

      return _react2['default'].createElement(WrappedComponent, _extends({}, otherProps, { style: mergedStyles }));
    };

    return WrappedWithStyles;
  }(_react.Component), _class.displayName = 'injectStyles(' + _getDisplayName(WrappedComponent) + ')', _temp;
}

function _getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}