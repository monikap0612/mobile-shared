'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoExpandingTextField = function (_React$Component) {
  _inherits(AutoExpandingTextField, _React$Component);

  function AutoExpandingTextField(props) {
    _classCallCheck(this, AutoExpandingTextField);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._handleContentSizeChange = function (event) {
      var minHeight = _this.props.minHeight;

      var height = event.nativeEvent.contentSize.height;

      if (minHeight && height < minHeight) {
        height = minHeight;
      }
      _this.setState({ height: height });
    };

    _this.state = {
      height: _this.props.minHeight
    };
    return _this;
  }

  AutoExpandingTextField.prototype.render = function render() {
    var _props = this.props,
        style = _props.style,
        _props$input = _props.input,
        value = _props$input.value,
        onChange = _props$input.onChange,
        _onBlur = _props$input.onBlur,
        _props$meta = _props.meta,
        error = _props$meta.error,
        touched = _props$meta.touched,
        minHeight = _props.minHeight,
        otherProps = _objectWithoutProperties(_props, ['style', 'input', 'meta', 'minHeight']);

    return _react2['default'].createElement(_reactNative.TextInput, _extends({
      multiline: true,
      underlineColorAndroid: 'transparent',
      onChangeText: function onChangeText(text) {
        return onChange(text);
      },
      onBlur: function onBlur(event) {
        return _onBlur(event);
      },
      value: value,
      onContentSizeChange: this._handleContentSizeChange,
      style: [styles.input, style, { height: this.state.height }]
    }, otherProps));
  };

  return AutoExpandingTextField;
}(_react2['default'].Component);

AutoExpandingTextField.defaultProps = {
  minHeight: 0
};


var styles = _reactNative.StyleSheet.create({
  input: {
    textAlignVertical: 'top'
  }
});

exports['default'] = AutoExpandingTextField;