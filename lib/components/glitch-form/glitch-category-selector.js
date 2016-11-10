'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styles = require('rc-mobile-base/lib/styles');

var Colors = _interopRequireWildcard(_styles);

var _FontAwesome = require('react-native-vector-icons/FontAwesome');

var _FontAwesome2 = _interopRequireDefault(_FontAwesome);

var _Entypo = require('react-native-vector-icons/Entypo');

var _Entypo2 = _interopRequireDefault(_Entypo);

var _ui = require('@shoutem/ui');

var _platform = require('rc-mobile-base/lib/utils/platform');

var _reactNativeImmersive = require('react-native-immersive');

var _reactNativeImmersive2 = _interopRequireDefault(_reactNativeImmersive);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var glitchCategories = {
  'Front Office': {
    glitches: ['Room allocation', 'Accuracy of invoice', 'Attitude of Staff', 'Luggage issue', 'Arrival Experience', 'Departure Experience', 'Other'],
    icon: 'building-o'
  },
  'Housekeeping': {
    glitches: ['Spa treatments', 'Condition of room cleanliness', 'Attitude of Staff', 'Condition of bathroom cleanliness', 'Condition of pool cleanliness', 'Laundry Dry Cleaning', 'Noise level', 'Other'],
    icon: 'bed'
  },
  'F&B': {
    glitches: ['Quality of the Food', 'Timeliness of service', 'Attitude of Staff', 'Accuracy of order', 'Meeting Rooms', 'Value for money', 'Other'],
    icon: 'cutlery'
  },
  'General': {
    glitches: ['Rate your Stay', 'Social Media Responce', 'Attitude of Staff', 'Overall Experience', 'Security', 'Schadensmeldung Vorfall', 'Other'],
    icon: 'list-alt'
  },
  'Reservations': {
    glitches: ['Accuracy of Reservation', 'Other'],
    icon: 'bell-o'
  },
  'Technik / IT': {
    glitches: ['Condition of furniture ', 'Technical defect', 'TV', 'Internet', 'Other'],
    icon: 'laptop'
  }
};

var GlitchCategorySelector = function (_Component) {
  _inherits(GlitchCategorySelector, _Component);

  function GlitchCategorySelector(props) {
    _classCallCheck(this, GlitchCategorySelector);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._closeModal = function () {
      _this.setState({
        isModalOpen: false,
        selectedCategory: null
      });
    };

    _this._handleModalOnShow = function () {
      if ((0, _platform.isAndroid)()) {
        _reactNativeImmersive2['default'].on();
      }
    };

    _this._handleModalOnRequestClose = function () {
      if ((0, _platform.isAndroid)()) {
        _reactNativeImmersive2['default'].on();
      }
    };

    _this._unsetGlitchCategory = function () {
      _this.setState({ selectedCategory: null });
    };

    _this._setGlitchCategory = function (category) {
      _this.setState({ selectedCategory: category });
    };

    _this._makeSelection = function (value) {
      var onChange = _this.props.input.onChange;

      onChange(value);
      _this._closeModal();
    };

    _this._getModalContent = function () {
      var selectedCategory = _this.state.selectedCategory;


      if (!selectedCategory) {
        return _this._getCategorySelectionContent();
      } else {
        return _this._getGlitchSelectionContent(selectedCategory);
      }
    };

    _this._getCategorySelectionContent = function () {
      return _react2['default'].createElement(
        _reactNative.View,
        { style: styles.modalContentContainer },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.titleBar },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.titleBarTitleContainer },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.titleBarTitle },
              'SELECT GLITCH CATEGORY'
            )
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.titleBarIconRightContainer },
            _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              { onPress: _this._closeModal },
              _react2['default'].createElement(_Entypo2['default'], { name: 'cross', size: 30, style: styles.titleBarIcon })
            )
          )
        ),
        _react2['default'].createElement(
          _reactNative.ScrollView,
          null,
          Object.keys(glitchCategories).map(function (category, idx) {
            var iconName = glitchCategories[category].icon;
            return _react2['default'].createElement(CategoryRow, { category: category, iconName: iconName, onPress: _this._setGlitchCategory, key: idx });
          })
        )
      );
    };

    _this._getGlitchSelectionContent = function () {
      var selectedCategory = _this.state.selectedCategory;

      var iconName = glitchCategories[selectedCategory].icon;
      var glitches = glitchCategories[selectedCategory].glitches;
      var onChange = _this.props.input.onChange;


      return _react2['default'].createElement(
        _reactNative.View,
        { style: styles.modalContentContainer },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.titleBar },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.titleBarIconLeftContainer },
            _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              { onPress: _this._unsetGlitchCategory },
              _react2['default'].createElement(_FontAwesome2['default'], { name: 'angle-left', size: 24, style: styles.titleBarIcon })
            )
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.titleBarTitleContainer },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.titleBarTitle },
              'SELECT GLITCH'
            )
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.categoryHeader },
          _react2['default'].createElement(_FontAwesome2['default'], { name: iconName, size: 40, style: styles.categoryHeaderIcon }),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.categoryHeaderText },
            selectedCategory.toUpperCase()
          )
        ),
        _react2['default'].createElement(
          _reactNative.ScrollView,
          null,
          glitches.map(function (glitch, idx) {
            var value = selectedCategory.toUpperCase() + ' - ' + glitch.toUpperCase();
            return _react2['default'].createElement(GlitchRow, { category: selectedCategory, glitch: glitch, key: idx, onPress: function onPress() {
                return _this._makeSelection(value);
              } });
          })
        )
      );
    };

    _this._handleInputPress = function () {
      _this.setState({ isModalOpen: true });
    };

    _this.state = {
      isModalOpen: false,
      selectedCategory: null
    };
    return _this;
  }

  GlitchCategorySelector.prototype.render = function render() {
    var _props = this.props,
        _props$input = _props.input,
        value = _props$input.value,
        onChange = _props$input.onChange,
        otherProps = _objectWithoutProperties(_props, ['input']);

    return _react2['default'].createElement(
      _reactNative.View,
      null,
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { onPress: this._handleInputPress, style: styles.dropdownButton },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.dropdownButtonText },
          value ? value : 'Select Category'
        ),
        _react2['default'].createElement(_ui.Icon, { name: 'down-arrow' })
      ),
      _react2['default'].createElement(
        _reactNative.Modal,
        {
          visible: this.state.isModalOpen,
          animationType: "slide",
          onShow: this._handleModalOnShow,
          onRequestClose: this._handleModalOnRequestClose },
        this._getModalContent()
      )
    );
  };

  return GlitchCategorySelector;
}(_react.Component);

var CategoryRow = function CategoryRow(_ref) {
  var category = _ref.category,
      iconName = _ref.iconName,
      _onPress = _ref.onPress;

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.categoryRowOuterContainer },
    _react2['default'].createElement(
      _reactNative.TouchableOpacity,
      { onPress: function onPress() {
          return _onPress(category);
        } },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.categoryRowInnerContainer },
        _react2['default'].createElement(_FontAwesome2['default'], { name: iconName, size: 36 }),
        _react2['default'].createElement(
          _reactNative.Text,
          null,
          category.toUpperCase()
        )
      )
    )
  );
};

var GlitchRow = function GlitchRow(_ref2) {
  var category = _ref2.category,
      glitch = _ref2.glitch,
      onPress = _ref2.onPress;

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.glitchRowOuterContainer },
    _react2['default'].createElement(
      _reactNative.TouchableOpacity,
      { onPress: onPress },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.categoryRowInnerContainer },
        _react2['default'].createElement(
          _reactNative.Text,
          null,
          glitch.toUpperCase()
        )
      )
    )
  );
};

var styles = _reactNative.StyleSheet.create({
  modalContentContainer: {
    flex: 1
  },
  dropdownButton: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownButtonText: {
    marginRight: 5,
    fontWeight: 'bold'
  },
  titleBar: {
    backgroundColor: Colors.blue.color,
    height: 54
  },
  titleBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54
  },
  titleBarTitle: {
    color: Colors.white.color,
    fontSize: 18
  },
  titleBarIconRightContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    zIndex: 9999,
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    paddingRight: 15,
    paddingTop: 5
  },
  titleBarIconLeftContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    zIndex: 9999,
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    paddingLeft: 15
  },
  titleBarIcon: {
    color: Colors.white.color
  },
  categoryRowOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLt.color
  },
  categoryRowInnerContainer: {
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center'
  },
  categoryHeader: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: Colors.blueLt.color
  },
  categoryHeaderIcon: {
    color: Colors.white.color,
    marginBottom: 10
  },
  categoryHeaderText: {
    color: Colors.white.color,
    fontWeight: 'bold',
    fontSize: 20
  },
  glitchRowOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLt.color
  },
  glitchRowInnerContainer: {
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center'
  }
});

exports['default'] = GlitchCategorySelector;