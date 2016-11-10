'use strict';

exports.__esModule = true;
exports.resetRoomsFilters = resetRoomsFilters;
exports.updateSearchRooms = updateSearchRooms;
exports.updateActiveFloor = updateActiveFloor;
exports.updateActiveSection = updateActiveSection;
exports.setActiveRooms = setActiveRooms;

var _filters = require('../constants/filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function resetRoomsFilters() {
  return {
    type: _filters2['default'].RESET_ROOM_FILTERS
  };
}

function updateSearchRooms(_ref) {
  var searchQuery = _ref.searchQuery;

  return {
    type: _filters2['default'].UPDATE_SEARCH_ROOMS,
    searchQuery: searchQuery
  };
}

function updateActiveFloor(_ref2) {
  var activeFloor = _ref2.activeFloor;

  return {
    type: _filters2['default'].UPDATE_ACTIVE_FLOOR,
    activeFloor: activeFloor
  };
}

function updateActiveSection(_ref3) {
  var activeSection = _ref3.activeSection;

  return {
    type: _filters2['default'].UPDATE_ACTIVE_SECTION,
    activeSection: activeSection
  };
}

function setActiveRooms(_ref4) {
  var activeRooms = _ref4.activeRooms;

  return {
    type: _filters2['default'].SET_ACTIVE_ROOMS,
    activeRooms: activeRooms
  };
}

exports['default'] = {
  resetRoomsFilters: resetRoomsFilters,
  updateSearchRooms: updateSearchRooms,
  updateActiveFloor: updateActiveFloor,
  updateActiveSection: updateActiveSection,
  setActiveRooms: setActiveRooms
};