import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, groupBy, map, find, filter, sortBy, includes } from 'lodash/collection';
import { uniq, flatten } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { isEmpty } from 'lodash/lang';
import { map as fpMap, uniq as fpUniq, fpUniqWith, flow, sortBy as fpSortBy } from 'lodash/fp';

import { calculateGuest, calculateGuestCode } from '../utils/calendar';
import { roomsSorting, floorsSorting } from '../utils/sorting';

const userIdSelector = state => state.auth.userId;
const roomsSelector = state => state.rooms.hotelRooms;
const floorsSelector = state => state.rooms.hotelFloors;
const roomStatusesSelector = state => state.rooms.hotelRoomStatuses;
const roomHousekeepingsSelector = state => state.rooms.hotelRoomHousekeepings;
const calendarSelector = state => state.rooms.hotelCalendar;
// const planningsSelector = state => state.rooms.hotelPlannings;
const planningsSelector = state => state.rooms.hotelPlanningsRunner;
const roomNotesSelector = state => state.rooms.hotelRoomNotes;
const catalogSelector = state => state.rooms.hotelCatalogs;
const tasksSelector = state => state.rooms.hotelTasks;
const activeRoomSelector = state => state.rooms.activeRoom;
const roomsUpdatesSelector = state => state.updates.rooms;

const getUserTasks = (hotelTasks, userId) => {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  return filter(hotelTasks, task => {
    if (get(task, 'is_completed') || get(task, 'is_cancelled')) {
      return false;
    }

    // return includes(get(task, 'assigned.user_ids'), userId)
    //   || get(task, 'assigned.isPlannedRunner');

    return includes(get(task, 'assigned.user_ids'), userId);
  });
}

const getComputedRooms = (hotelRooms, hotelFloors, hotelRoomStatuses, hotelRoomHousekeepings, hotelCalendar, hotelPlannings, hotelRoomNotes, hotelTasks, roomsUpdates, userId) => {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  const indexFloors = keyBy(hotelFloors, '_id');
  const indexRoomStatuses = keyBy(hotelRoomStatuses, '_id');
  const indexRoomHousekeepings = keyBy(hotelRoomHousekeepings, '_id');
  const groupedCalendar = groupBy(hotelCalendar, 'room_id');
  const indexedPlannings = keyBy(hotelPlannings, 'room_id');
  const groupedNotes = groupBy(hotelRoomNotes, 'room_id');
  const groupedTasks = groupBy(hotelTasks, 'meta.room_id');
  const isPlanned = filter(hotelPlannings, p => get(p, 'planning_user_id.length', 0) > 0).length > 0;

  const computedHotelRooms = map(hotelRooms, room => {
    const roomId = get(room, '_id');
    const floorId = get(room, 'floor');
    const roomStatusId = get(room, 'roomStatus');
    const roomHousekeepingId = get(room, 'roomHousekeeping');

    const roomCalendar = get(groupedCalendar, roomId, []);
    const roomPlanning = get(indexedPlannings, roomId, {});
    if (isPlanned && get(roomPlanning, 'planning_user_id') !== userId) {
      return null;
    }

    const roomNotes = get(groupedNotes, roomId, []);
    const roomTasks = get(groupedTasks, roomId, []);
    const guests = roomCalendar && !isEmpty(roomCalendar) && calculateGuest(roomCalendar) || null;
		const guestStatus = get(roomPlanning, 'guest_status') || calculateGuestCode(roomCalendar, guests);

    return extend({}, room, {
      floor: get(indexFloors, floorId, {}),
      roomStatus: get(indexRoomStatuses, roomStatusId, {}),
      roomHousekeeping: get(indexRoomHousekeepings, roomHousekeepingId, {}),
      roomPlanning,
      roomCalendar,
      roomNotes,
      roomTasks,
      guests,
      guestStatus,
      update: get(roomsUpdates, roomId, null)
    });
  }).filter(x => !!x);

  return sortBy(computedHotelRooms, 'name');
}

const getComputedRoomsIndex = (hotelRooms) => {
  return keyBy(hotelRooms, '_id');
}

const getAvailableFloors = (hotelRooms, hotelFloors) => {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  const indexFloors = keyBy(hotelFloors, '_id');

  return flow(
    fpMap('floor._id'),
    fpUniq,
    fpMap(floorId => {
      const floor = get(indexFloors, floorId);
      const { number, sortValue } = floor;
      const rooms = filter(hotelRooms, { floor: {_id : floorId }});
      const floorTasks = flatten(map(rooms, 'roomTasks'));
      const stats = {
        da: filter(rooms, { 'guestStatus': 'da' }).length,
        arr: filter(rooms, { 'guestStatus': 'arr' }).length,
        dep: filter(rooms, { 'guestStatus': 'dep' }).length,
        stay: filter(rooms, { 'guestStatus': 'stay' }).length
      }
      stats.vac = rooms.length - stats.da - stats.arr - stats.dep - stats.stay;

      return {
        floor,
        rooms,
        floorTasks,
        sorting: floorsSorting(number, sortValue),
        stats
      }
    }),
    fpSortBy('sorting')
  )(hotelRooms);
}

const getActiveRoom = (hotelRoomsIndex, activeRoom) => {
  return get(hotelRoomsIndex, activeRoom, null);
}

const getCatalogByActiveRoom = (hotelCatalog, activeRoom) => {
  if (!hotelCatalog || !hotelCatalog.length) {
    return [];
  }

  return filter(hotelCatalog, { roomId: activeRoom });
}

const getPopupTasks = (hotelTasks, userId) => {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  return filter(hotelTasks, task => !get(task, 'is_claimed') && !includes(get(task, 'assigned.rejected_ids', []), userId));
}

export const computedUserTasks = createSelector(
  [tasksSelector, userIdSelector],
  getUserTasks
);

export const computedHotelRooms = createSelector(
  [roomsSelector, floorsSelector, roomStatusesSelector, roomHousekeepingsSelector, calendarSelector, planningsSelector, roomNotesSelector, computedUserTasks, roomsUpdatesSelector, userIdSelector],
  getComputedRooms
);

export const computedHotelRoomsIndex = createSelector(
  [computedHotelRooms],
  getComputedRoomsIndex
)

export const computedActiveRoom = createSelector(
  [computedHotelRoomsIndex, activeRoomSelector],
  getActiveRoom
);

export const computedAvailableFloors = createSelector(
  [computedHotelRooms, floorsSelector],
  getAvailableFloors
);

export const computedCatalogByActiveRoom = createSelector(
  [catalogSelector, activeRoomSelector],
  getCatalogByActiveRoom
);

export const computedPopupTasks = createSelector(
  [computedUserTasks, userIdSelector],
  getPopupTasks
)
