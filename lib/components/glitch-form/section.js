'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styles = require('rc-mobile-base/lib/styles');

var Colors = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Component) {
  _inherits(Section, _Component);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Section.prototype.render = function render() {
    return _react2['default'].createElement(
      _reactNative.View,
      { style: styles.container },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.title },
        this.props.title.toUpperCase()
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.content },
        this.props.children
      )
    );
  };

  return Section;
}(_react.Component);

var styles = _reactNative.StyleSheet.create({
  container: {
    marginBottom: 15
  },
  title: {
    color: Colors.greyDk.color,
    marginLeft: 12,
    marginBottom: 5
  },
  content: {
    backgroundColor: Colors.white.color,
    padding: 12
  }
});

exports['default'] = Section;