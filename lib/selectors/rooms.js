'use strict';

exports.__esModule = true;
exports.computedCatalogByActiveRoom = exports.computedAvailableFloors = exports.computedActiveRoom = exports.computedHotelRoomsIndex = exports.computedHotelRooms = undefined;

var _reselect = require('reselect');

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');

var _lang = require('lodash/lang');

var _fp = require('lodash/fp');

var _calendar = require('../utils/calendar');

var _sorting = require('../utils/sorting');

var roomsSelector = function roomsSelector(state) {
  return state.rooms.hotelRooms;
};
var floorsSelector = function floorsSelector(state) {
  return state.rooms.hotelFloors;
};
var roomStatusesSelector = function roomStatusesSelector(state) {
  return state.rooms.hotelRoomStatuses;
};
var roomHousekeepingsSelector = function roomHousekeepingsSelector(state) {
  return state.rooms.hotelRoomHousekeepings;
};
var calendarSelector = function calendarSelector(state) {
  return state.rooms.hotelCalendar;
};
var planningsSelector = function planningsSelector(state) {
  return state.rooms.hotelPlannings;
};
var roomNotesSelector = function roomNotesSelector(state) {
  return state.rooms.hotelRoomNotes;
};
var catalogSelector = function catalogSelector(state) {
  return state.rooms.hotelCatalogs;
};
var tasksSelector = function tasksSelector(state) {
  return state.rooms.hotelTasks;
};
var activeRoomSelector = function activeRoomSelector(state) {
  return state.rooms.activeRoom;
};
var roomsUpdatesSelector = function roomsUpdatesSelector(state) {
  return state.updates.rooms;
};

var getComputedRooms = function getComputedRooms(hotelRooms, hotelFloors, hotelRoomStatuses, hotelRoomHousekeepings, hotelCalendar, hotelPlannings, hotelRoomNotes, hotelTasks, roomsUpdates) {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  var indexFloors = (0, _collection.keyBy)(hotelFloors, '_id');
  var indexRoomStatuses = (0, _collection.keyBy)(hotelRoomStatuses, '_id');
  var indexRoomHousekeepings = (0, _collection.keyBy)(hotelRoomHousekeepings, '_id');
  var groupedCalendar = (0, _collection.groupBy)(hotelCalendar, 'room_id');
  var indexedPlannings = (0, _collection.keyBy)(hotelPlannings, 'room_id');
  var groupedNotes = (0, _collection.groupBy)(hotelRoomNotes, 'room_id');
  var groupedTasks = (0, _collection.groupBy)(hotelTasks, 'meta.room_id');

  var computedHotelRooms = (0, _collection.map)(hotelRooms, function (room) {
    var roomId = (0, _object.get)(room, '_id');
    var floorId = (0, _object.get)(room, 'floor');
    var roomStatusId = (0, _object.get)(room, 'roomStatus');
    var roomHousekeepingId = (0, _object.get)(room, 'roomHousekeeping');

    var roomCalendar = (0, _object.get)(groupedCalendar, roomId, []);
    var roomPlanning = (0, _object.get)(indexedPlannings, roomId, {});
    var roomNotes = (0, _object.get)(groupedNotes, roomId, []);
    var roomTasks = (0, _object.get)(groupedTasks, roomId, []);
    var guests = roomCalendar && !(0, _lang.isEmpty)(roomCalendar) && (0, _calendar.calculateGuest)(roomCalendar) || null;
    var guestStatus = (0, _object.get)(roomPlanning, 'guest_status') || (0, _calendar.calculateGuestCode)(roomCalendar, guests);

    return (0, _object.extend)({}, room, {
      floor: (0, _object.get)(indexFloors, floorId, {}),
      roomStatus: (0, _object.get)(indexRoomStatuses, roomStatusId, {}),
      roomHousekeeping: (0, _object.get)(indexRoomHousekeepings, roomHousekeepingId, {}),
      roomPlanning: roomPlanning,
      roomCalendar: roomCalendar,
      roomNotes: roomNotes,
      roomTasks: roomTasks,
      guests: guests,
      guestStatus: guestStatus,
      update: (0, _object.get)(roomsUpdates, roomId, null)
    });
  });

  return (0, _collection.sortBy)(computedHotelRooms, 'name');
};

var getComputedRoomsIndex = function getComputedRoomsIndex(hotelRooms) {
  return (0, _collection.keyBy)(hotelRooms, '_id');
};

var getAvailableFloors = function getAvailableFloors(hotelRooms, hotelFloors) {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  var indexFloors = (0, _collection.keyBy)(hotelFloors, '_id');

  return (0, _fp.flow)((0, _fp.map)('floor._id'), _fp.uniq, (0, _fp.map)(function (floorId) {
    var floor = (0, _object.get)(indexFloors, floorId);
    var number = floor.number;
    var sortValue = floor.sortValue;

    var rooms = (0, _collection.filter)(hotelRooms, { floor: { _id: floorId } });
    var floorTasks = (0, _array.flatten)((0, _collection.map)(rooms, 'roomTasks'));

    return {
      floor: floor,
      rooms: rooms,
      floorTasks: floorTasks,
      sorting: (0, _sorting.floorsSorting)(number, sortValue)
    };
  }), (0, _fp.sortBy)('sorting'))(hotelRooms);
};

var getActiveRoom = function getActiveRoom(hotelRoomsIndex, activeRoom) {
  return (0, _object.get)(hotelRoomsIndex, activeRoom, null);
};

var getCatalogByActiveRoom = function getCatalogByActiveRoom(hotelCatalog, activeRoom) {
  if (!hotelCatalog || !hotelCatalog.length) {
    return [];
  }

  return (0, _collection.filter)(hotelCatalog, { roomId: activeRoom });
};

var computedHotelRooms = exports.computedHotelRooms = (0, _reselect.createSelector)([roomsSelector, floorsSelector, roomStatusesSelector, roomHousekeepingsSelector, calendarSelector, planningsSelector, roomNotesSelector, tasksSelector, roomsUpdatesSelector], getComputedRooms);

var computedHotelRoomsIndex = exports.computedHotelRoomsIndex = (0, _reselect.createSelector)([computedHotelRooms], getComputedRoomsIndex);

var computedActiveRoom = exports.computedActiveRoom = (0, _reselect.createSelector)([computedHotelRoomsIndex, activeRoomSelector], getActiveRoom);

var computedAvailableFloors = exports.computedAvailableFloors = (0, _reselect.createSelector)([computedHotelRooms, floorsSelector], getAvailableFloors);

var computedCatalogByActiveRoom = exports.computedCatalogByActiveRoom = (0, _reselect.createSelector)([catalogSelector, activeRoomSelector], getCatalogByActiveRoom);