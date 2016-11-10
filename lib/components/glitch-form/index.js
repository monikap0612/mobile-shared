'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reduxForm = require('redux-form');

var _ui = require('@shoutem/ui');

var _section = require('./section');

var _section2 = _interopRequireDefault(_section);

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _glitchCategorySelector = require('./glitch-category-selector');

var _glitchCategorySelector2 = _interopRequireDefault(_glitchCategorySelector);

var _autoExpandingTextField = require('./auto-expanding-text-field');

var _autoExpandingTextField2 = _interopRequireDefault(_autoExpandingTextField);

var _styles = require('rc-mobile-base/lib/styles');

var Colors = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlitchForm = function (_Component) {
  _inherits(GlitchForm, _Component);

  function GlitchForm() {
    _classCallCheck(this, GlitchForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  GlitchForm.prototype.render = function render() {
    var handleSubmit = this.props.handleSubmit;


    return _react2['default'].createElement(
      _reactNative.View,
      null,
      _react2['default'].createElement(
        _section2['default'],
        { title: 'GUEST INFORMATION' },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.row },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.label },
            'ROOM'
          ),
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'room_name',
            placeholder: 'Enter Room Number',
            placeholderTextColor: Colors.greyLt.color,
            component: _textField2['default'],
            maxLength: 10,
            style: styles.rowInput
          })
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.row },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.label },
            'NAME'
          ),
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'guest_info.name',
            placeholder: 'Enter Guest Name',
            placeholderTextColor: Colors.greyLt.color,
            component: _textField2['default'],
            style: styles.rowInput
          })
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.row },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.label },
            'VIP'
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.input },
            'Premiere Club'
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.row },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.label },
            'EMAIL'
          ),
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'guest_info.email',
            placeholder: 'Enter Guest Email',
            placeholderTextColor: Colors.greyLt.color,
            component: _textField2['default'],
            style: styles.rowInput
          })
        )
      ),
      _react2['default'].createElement(
        _section2['default'],
        { title: 'SELECT GLITCH CATEGORY' },
        _react2['default'].createElement(_reduxForm.Field, {
          name: 'category',
          placeholder: 'Select a Glitch Category...',
          placeholderTextColor: Colors.greyLt.color,
          component: _glitchCategorySelector2['default']
        })
      ),
      _react2['default'].createElement(
        _section2['default'],
        { title: 'GLITCH INFORMATION' },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.inputHeader },
          'INCIDENT DESCRIPTION'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.textAreaContainer },
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'description',
            placeholder: 'Insert Description...',
            placeholderTextColor: Colors.greyLt.color,
            component: _autoExpandingTextField2['default'],
            minHeight: 50,
            style: styles.textArea
          })
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.inputHeader },
          'ACTIONS TO RESOLVE'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.textAreaContainer },
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'action',
            placeholder: 'Insert Description...',
            placeholderTextColor: Colors.greyLt.color,
            component: _autoExpandingTextField2['default'],
            minHeight: 50,
            style: styles.textArea
          })
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.inputHeader },
          'FOLLOW UP WITH GUEST'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.textAreaContainer },
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'followup',
            placeholder: 'Insert Follow Up Instructions...',
            placeholderTextColor: Colors.greyLt.color,
            component: _autoExpandingTextField2['default'],
            minHeight: 50,
            style: styles.textArea
          })
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.inputHeader },
          'COMPENSATION COST'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.compensationCostContainer },
          _react2['default'].createElement(_reduxForm.Field, {
            name: 'cost',
            placeholder: '100',
            placeholderTextColor: Colors.greyLt.color,
            component: _textField2['default'],
            maxLength: 5,
            style: styles.compensationCostInput
          }),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.currency },
            'USD'
          )
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.submitButtonContainer },
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          { style: styles.submitButton, onPress: handleSubmit },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.submitButtonText },
            'SUBMIT NEW GLITCH'
          )
        )
      )
    );
  };

  return GlitchForm;
}(_react.Component);

var styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  label: {
    width: 80,
    fontWeight: 'bold'
  },
  rowInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.greyLt.color,
    borderRadius: 4,
    paddingVertical: 0,
    fontSize: 16,
    paddingLeft: 10,
    height: 45
  },
  inputHeader: {
    marginBottom: 5,
    color: 'black'
  },
  textAreaContainer: {
    borderWidth: 1,
    padding: 8,
    borderColor: Colors.greyLt.color,
    borderRadius: 4,
    marginBottom: 30
  },
  textArea: {
    fontSize: 16
  },
  compensationCostContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  compensationCostInput: {
    fontSize: 16,
    height: 40,
    paddingRight: 10,
    textAlign: 'right',
    borderWidth: 1,
    width: 100,
    marginRight: 7,
    borderColor: Colors.greyLt.color,
    borderRadius: 4,
    paddingVertical: 0
  },
  currency: {},
  submitButtonContainer: {
    padding: 15
  },
  submitButton: {
    backgroundColor: Colors.green.color,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center'
  },
  submitButtonText: {
    color: Colors.white.color,
    fontWeight: 'bold',
    fontSize: 18
  }
});

GlitchForm = (0, _reduxForm.reduxForm)()(GlitchForm);

exports['default'] = GlitchForm;