'use strict';

exports.__esModule = true;
exports.computedPopupTasks = exports.computedCatalogByActiveRoom = exports.computedAvailableFloors = exports.computedActiveRoom = exports.computedHotelRoomsIndex = exports.computedHotelRooms = exports.computedUserTasks = exports.computedIsNightPlanned = exports.computedIsRunnerPlanned = exports.computedIsPlanned = exports.computedIndexNightPlanning = exports.computedIndexRunnerPlanning = exports.computedIndexPlanning = exports.computedGroupTasks = exports.computedGroupNotes = exports.computedGroupCalendar = exports.computedIndexRoomHousekeepings = exports.computedIndexRoomStatuses = exports.computedIndexFloors = exports.getIsPlanned = exports.getGroupTasks = exports.getGroupNotes = exports.getIndexPlanning = exports.getGroupCalendar = exports.getIndexRoomHousekeepings = exports.getIndexRoomStatuses = exports.getIndexFloors = exports.roomsUpdatesSelector = exports.activeRoomSelector = exports.tasksSelector = exports.catalogSelector = exports.roomNotesSelector = exports.planningsRunnerSelector = exports.planningsNightSelector = exports.planningsSelector = exports.calendarSelector = exports.roomHousekeepingsSelector = exports.roomStatusesSelector = exports.floorsSelector = exports.roomsSelector = exports.userIdSelector = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reselect = require('reselect');

var _collection = require('lodash/collection');

var _array = require('lodash/array');

var _object = require('lodash/object');

var _lang = require('lodash/lang');

var _fp = require('lodash/fp');

var _calendar = require('../utils/calendar');

var _sorting = require('../utils/sorting');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var userIdSelector = exports.userIdSelector = function userIdSelector(state) {
  return state.auth.userId;
};
var roomsSelector = exports.roomsSelector = function roomsSelector(state) {
  return state.rooms.hotelRooms;
};
var floorsSelector = exports.floorsSelector = function floorsSelector(state) {
  return state.rooms.hotelFloors;
};
var roomStatusesSelector = exports.roomStatusesSelector = function roomStatusesSelector(state) {
  return state.rooms.hotelRoomStatuses;
};
var roomHousekeepingsSelector = exports.roomHousekeepingsSelector = function roomHousekeepingsSelector(state) {
  return state.rooms.hotelRoomHousekeepings;
};
var calendarSelector = exports.calendarSelector = function calendarSelector(state) {
  return state.rooms.hotelCalendar;
};
var planningsSelector = exports.planningsSelector = function planningsSelector(state) {
  return state.rooms.hotelPlannings;
};
var planningsNightSelector = exports.planningsNightSelector = function planningsNightSelector(state) {
  return state.rooms.hotelPlanningsNight;
};
var planningsRunnerSelector = exports.planningsRunnerSelector = function planningsRunnerSelector(state) {
  return state.rooms.hotelPlanningsRunner;
};
var roomNotesSelector = exports.roomNotesSelector = function roomNotesSelector(state) {
  return state.rooms.hotelRoomNotes;
};
var catalogSelector = exports.catalogSelector = function catalogSelector(state) {
  return state.rooms.hotelCatalogs;
};
var tasksSelector = exports.tasksSelector = function tasksSelector(state) {
  return state.rooms.hotelTasks;
};
var activeRoomSelector = exports.activeRoomSelector = function activeRoomSelector(state) {
  return state.rooms.activeRoom;
};
var roomsUpdatesSelector = exports.roomsUpdatesSelector = function roomsUpdatesSelector(state) {
  return state.updates.rooms;
};

var getIndexFloors = exports.getIndexFloors = function getIndexFloors(hotelFloors) {
  return (0, _collection.keyBy)(hotelFloors || [], '_id');
};
var getIndexRoomStatuses = exports.getIndexRoomStatuses = function getIndexRoomStatuses(hotelRoomStatuses) {
  return (0, _collection.keyBy)(hotelRoomStatuses || [], '_id');
};
var getIndexRoomHousekeepings = exports.getIndexRoomHousekeepings = function getIndexRoomHousekeepings(hotelRoomHousekeepings) {
  return (0, _collection.keyBy)(hotelRoomHousekeepings || [], '_id');
};
var getGroupCalendar = exports.getGroupCalendar = function getGroupCalendar(hotelCalendar) {
  return (0, _collection.groupBy)(hotelCalendar || [], 'room_id');
};
var getIndexPlanning = exports.getIndexPlanning = function getIndexPlanning(hotelPlannings) {
  return (0, _collection.keyBy)(hotelPlannings || [], 'room_id');
};
var getGroupNotes = exports.getGroupNotes = function getGroupNotes(hotelRoomNotes) {
  return (0, _collection.keyBy)(hotelRoomNotes || [], 'room_id');
};
var getGroupTasks = exports.getGroupTasks = function getGroupTasks(hotelTasks) {
  return (0, _collection.groupBy)(hotelTasks, 'meta.room_id');
};
var getIsPlanned = exports.getIsPlanned = function getIsPlanned(hotelPlannings) {
  return (0, _collection.filter)(hotelPlannings, function (p) {
    return (0, _object.get)(p, 'planning_user_id.length', 0) > 0;
  }).length > 0;
};

var getUserTasks = function getUserTasks(hotelTasks, userId) {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  return (0, _collection.filter)(hotelTasks, function (task) {
    if ((0, _object.get)(task, 'is_completed') || (0, _object.get)(task, 'is_cancelled')) {
      return false;
    }

    // return includes(get(task, 'assigned.user_ids'), userId)
    //   || get(task, 'assigned.isPlannedRunner');

    return (0, _collection.includes)((0, _object.get)(task, 'assigned.user_ids'), userId);
  });
};

var getComputedRooms = function getComputedRooms(hotelRooms, indexFloors, indexRoomStatuses, indexRoomHousekeepings, groupedCalendar, indexPlanning, groupedNotes, groupedTasks, isPlanned) {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  return (0, _fp.flow)((0, _fp.map)(hotelRooms, function (room) {
    var roomId = (0, _object.get)(room, '_id');
    var roomPlanning = (0, _object.get)(indexPlannings, roomId, {});

    // if (isPlanned && get(roomPlanning, 'planning_user_id') !== userId) {
    //   return null;
    // }

    var floorId = (0, _object.get)(room, 'floor');
    var roomStatusId = (0, _object.get)(room, 'roomStatus');
    var roomHousekeepingId = (0, _object.get)(room, 'roomHousekeeping');

    var roomCalendar = (0, _object.get)(groupedCalendar, roomId, []);
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
  }), (0, _fp.filter)(function (room) {
    return !!room;
  }), (0, _fp.sortBy)('name'))(hotelRooms);
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
    var stats = {
      da: (0, _collection.filter)(rooms, { 'guestStatus': 'da' }).length,
      arr: (0, _collection.filter)(rooms, { 'guestStatus': 'arr' }).length,
      dep: (0, _collection.filter)(rooms, { 'guestStatus': 'dep' }).length,
      stay: (0, _collection.filter)(rooms, { 'guestStatus': 'stay' }).length
    };
    stats.vac = rooms.length - stats.da - stats.arr - stats.dep - stats.stay;

    return {
      floor: floor,
      rooms: rooms,
      floorTasks: floorTasks,
      sorting: (0, _sorting.floorsSorting)(number, sortValue),
      stats: stats
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

var getPopupTasks = function getPopupTasks(hotelTasks, userId) {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  return (0, _collection.filter)(hotelTasks, function (task) {
    return !(0, _object.get)(task, 'is_claimed') && !(0, _collection.includes)((0, _object.get)(task, 'assigned.rejected_ids', []), userId);
  });
};

var computedIndexFloors = exports.computedIndexFloors = (0, _reselect.createSelector)([floorsSelector], getIndexFloors);
var computedIndexRoomStatuses = exports.computedIndexRoomStatuses = (0, _reselect.createSelector)([roomStatusesSelector], getIndexRoomStatuses);
var computedIndexRoomHousekeepings = exports.computedIndexRoomHousekeepings = (0, _reselect.createSelector)([roomHousekeepingsSelector], getIndexRoomHousekeepings);
var computedGroupCalendar = exports.computedGroupCalendar = (0, _reselect.createSelector)([calendarSelector], getGroupCalendar);
var computedGroupNotes = exports.computedGroupNotes = (0, _reselect.createSelector)([roomNotesSelector], getGroupNotes);
var computedGroupTasks = exports.computedGroupTasks = (0, _reselect.createSelector)([tasksSelector], getGroupTasks);

var computedIndexPlanning = exports.computedIndexPlanning = (0, _reselect.createSelector)([planningsSelector], getIndexPlanning);
var computedIndexRunnerPlanning = exports.computedIndexRunnerPlanning = (0, _reselect.createSelector)([planningsRunnerSelector], getIndexPlanning);
var computedIndexNightPlanning = exports.computedIndexNightPlanning = (0, _reselect.createSelector)([planningsNightSelector], getIndexPlanning);

var computedIsPlanned = exports.computedIsPlanned = (0, _reselect.createSelector)([planningsSelector], getIsPlanned);
var computedIsRunnerPlanned = exports.computedIsRunnerPlanned = (0, _reselect.createSelector)([planningsRunnerSelector], getIsPlanned);
var computedIsNightPlanned = exports.computedIsNightPlanned = (0, _reselect.createSelector)([planningsNightSelector], getIsPlanned);

var computedUserTasks = exports.computedUserTasks = (0, _reselect.createSelector)([tasksSelector, userIdSelector], getUserTasks);

var computedHotelRooms = exports.computedHotelRooms = (0, _reselect.createSelector)([roomsSelector, computedIndexFloors, computedIndexRoomStatuses, computedIndexRoomHousekeepings, computedGroupCalendar, computedIndexPlanning, computedGroupNotes, computedGroupTasks, roomsUpdatesSelector, userIdSelector], getComputedRooms);

var computedHotelRoomsIndex = exports.computedHotelRoomsIndex = (0, _reselect.createSelector)([computedHotelRooms], getComputedRoomsIndex);

var computedActiveRoom = exports.computedActiveRoom = (0, _reselect.createSelector)([computedHotelRoomsIndex, activeRoomSelector], getActiveRoom);

var computedAvailableFloors = exports.computedAvailableFloors = (0, _reselect.createSelector)([computedHotelRooms, floorsSelector], getAvailableFloors);

var computedCatalogByActiveRoom = exports.computedCatalogByActiveRoom = (0, _reselect.createSelector)([catalogSelector, activeRoomSelector], getCatalogByActiveRoom);

var computedPopupTasks = exports.computedPopupTasks = (0, _reselect.createSelector)([computedUserTasks, userIdSelector], getPopupTasks);