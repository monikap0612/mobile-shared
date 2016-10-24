'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactRedux = require('react-redux');

var _auth = require('../../actions/auth');

var _auth2 = _interopRequireDefault(_auth);

var _Login = require('../../components/Login');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Login.prototype.render = function render() {
    var _props = this.props;
    var isActiveHotel = _props.isActiveHotel;
    var hotelName = _props.hotelName;
    var hotelImage = _props.hotelImage;
    var hotelUsers = _props.hotelUsers;
    var hotelUsername = _props.hotelUsername;
    var submitUserLogin = _props.submitUserLogin;
    var submitHotelLogin = _props.submitHotelLogin;
    var hotelReset = _props.hotelReset;
    var appName = _props.appName;

    var hotel = {
      name: hotelName,
      image: hotelImage,
      users: hotelUsers
    };
    var loginFormProps = {
      isActiveHotel: isActiveHotel,
      hotel: hotel,
      submitUserLogin: submitUserLogin(hotelUsername),
      submitHotelLogin: submitHotelLogin,
      hotelReset: hotelReset,
      appName: appName
    };
    return _react2['default'].createElement(_Login2['default'], loginFormProps);
  };

  return Login;
}(_react.Component);

var mapPropsToState = function mapPropsToState(state) {
  return _extends({}, state.auth);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitHotelLogin: function submitHotelLogin(_ref) {
      var hotel = _ref.hotel;
      return dispatch(_auth2['default'].hotelRequest(hotel));
    },
    submitUserLogin: function submitUserLogin(hotelUsername) {
      return function (creds) {
        return dispatch(_auth2['default'].userRequest(_extends({ hotelUsername: hotelUsername }, creds)));
      };
    },
    hotelReset: function hotelReset() {
      return dispatch(_auth2['default'].hotelReset());
    },
    dispatch: dispatch
  };
};

exports['default'] = (0, _reactRedux.connect)(mapPropsToState, mapDispatchToProps)(Login);