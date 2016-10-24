'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require('react-native');

var _styles = require('../../styles');

exports['default'] = _reactNative.StyleSheet.create({
  container: _extends({}, _styles.blue500.bg, _styles.flex1),
  hotelNameContainer: _extends({}, _styles.lCenterCenter, _styles.white.bg, _styles.padding.b15, {
    height: 240
  }),
  logoImage: {
    height: 120,
    width: 250
  },
  infoContainer: _extends({}, _styles.lCenterCenter, _styles.padding.t15, _styles.opacityWhite.p30.bg),
  text: _extends({}, _styles.white.text, _styles.margin.b10, {
    fontSize: 18,
    fontWeight: "500"
  }),
  header: _extends({}, _styles.margin.b10, {
    fontSize: 20,
    fontWeight: '400'
  }),
  subheader: {
    fontSize: 17
  },
  inputContainer: _extends({}, _styles.opacityWhite.p30.bg, {
    borderRadius: 5
  }),
  inputField: _extends({}, _styles.padding.x15, _styles.white.text, {
    width: 280,
    height: 40
  }),
  btnContainer: _extends({}, _styles.flex1, _styles.lStartCenter, _styles.padding.t20, {
    flexDirection: 'column'
  }),
  usersContainer: _extends({}, _styles.padding.a10, _styles.margin.b10, {
    flexDirection: 'row'
  }),
  userImage: _extends({}, _styles.margin.x5, {
    height: 48,
    width: 48,
    borderRadius: 24
  }),
  backButtonContainer: _extends({}, _styles.opacityWhite.p20.bg, _styles.positioning.t10, _styles.positioning.l10, {
    position: 'absolute',
    zIndex: 10
  }),
  inputs: _extends({}, _styles.padding.a20, _styles.blue300.bg),

  logoContainer: _extends({}, _styles.lEndCenter, _styles.white.bg, _styles.padding.b15, {
    height: 180
  }),
  hotelInput: _extends({}, _styles.padding.x15, _styles.white.text, {
    width: 280,
    height: 40,
    fontFamily: 'Courier'
  }),
  hotelContainer: _extends({}, _styles.flex1, {
    alignItems: 'stretch'
  }),
  hotelInfoContainer: _extends({}, _styles.lStartCenter, _styles.padding.t30, _styles.padding.b40),
  hotelInputContainer: _extends({}, _styles.lCenterCenter, _styles.margin.a20, _styles.opacityWhite.p30.bg, {
    borderRadius: 5
  }),
  hotelBtnContainer: _extends({}, _styles.flex1, _styles.lStartCenter)
});