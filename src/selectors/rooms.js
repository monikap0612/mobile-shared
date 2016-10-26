import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, groupBy, map, find, filter, sortBy, includes } from 'lodash/collection';
import { uniq, flatten } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { isEmpty } from 'lodash/lang';
import { map as fpMap, uniq as fpUniq, fpUniqWith, flow, sortBy as fpSortBy, filter as fpFilter } from 'lodash/fp';

import { calculateGuest, calculateGuestCode } from '../utils/calendar';
import { roomsSorting, floorsSorting } from '../utils/sorting';

export const userIdSelector = state => state.auth.userId;
export const roomsSelector = state => state.rooms.hotelRooms;
export const floorsSelector = state => state.rooms.hotelFloors;
export const roomStatusesSelector = state => state.rooms.hotelRoomStatuses;
export const roomHousekeepingsSelector = state => state.rooms.hotelRoomHousekeepings;
export const calendarSelector = state => state.rooms.hotelCalendar;
export const planningsSelector = state => state.rooms.hotelPlannings;
export const planningsNightSelector = state => state.rooms.hotelPlanningsNight;
export const planningsRunnerSelector = state => state.rooms.hotelPlanningsRunner;
export const roomNotesSelector = state => state.rooms.hotelRoomNotes;
export const catalogSelector = state => state.rooms.hotelCatalogs;
export const tasksSelector = state => state.rooms.hotelTasks;
export const activeRoomSelector = state => state.rooms.activeRoom;
export const roomsUpdatesSelector = state => state.updates.rooms;

export const getIndexFloors = (hotelFloors) => keyBy(hotelFloors || [], '_id');
export const getIndexRoomStatuses = (hotelRoomStatuses) => keyBy(hotelRoomStatuses || [], '_id');
export const getIndexRoomHousekeepings = (hotelRoomHousekeepings) => keyBy(hotelRoomHousekeepings || [], '_id');
export const getGroupCalendar = (hotelCalendar) => groupBy(hotelCalendar || [], 'room_id');
export const getIndexPlanning = (hotelPlannings) => keyBy(hotelPlannings || [], 'room_id');
export const getGroupNotes = (hotelRoomNotes) => keyBy(hotelRoomNotes || [], 'room_id');
export const getGroupTasks = (hotelTasks) => groupBy(hotelTasks, 'meta.room_id');
export const getIsPlanned = (hotelPlannings) => filter(hotelPlannings, p => get(p, 'planning_user_id.length', 0) > 0).length > 0;

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

const getComputedRooms = (
  hotelRooms,
  indexFloors,
  indexRoomStatuses,
  indexRoomHousekeepings,
  groupedCalendar,
  indexPlanning,
  groupedNotes,
  groupedTasks,
  isPlanned
) => {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  return flow(
    fpMap(hotelRooms, room => {
      const roomId = get(room, '_id');
      const roomPlanning = get(indexPlannings, roomId, {});

      // if (isPlanned && get(roomPlanning, 'planning_user_id') !== userId) {
      //   return null;
      // }

      const floorId = get(room, 'floor');
      const roomStatusId = get(room, 'roomStatus');
      const roomHousekeepingId = get(room, 'roomHousekeeping');

      const roomCalendar = get(groupedCalendar, roomId, []);
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
    }),
    fpFilter(room => !!room),
    fpSortBy('name')
  )(hotelRooms);
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

export const computedIndexFloors = createSelector([floorsSelector], getIndexFloors);
export const computedIndexRoomStatuses = createSelector([roomStatusesSelector], getIndexRoomStatuses);
export const computedIndexRoomHousekeepings = createSelector([roomHousekeepingsSelector], getIndexRoomHousekeepings);
export const computedGroupCalendar = createSelector([calendarSelector], getGroupCalendar);
export const computedGroupNotes = createSelector([roomNotesSelector], getGroupNotes);
export const computedGroupTasks = createSelector([tasksSelector], getGroupTasks);

export const computedIndexPlanning = createSelector([planningsSelector], getIndexPlanning);
export const computedIndexRunnerPlanning = createSelector([planningsRunnerSelector], getIndexPlanning);
export const computedIndexNightPlanning = createSelector([planningsNightSelector], getIndexPlanning);

export const computedIsPlanned = createSelector([planningsSelector], getIsPlanned);
export const computedIsRunnerPlanned = createSelector([planningsRunnerSelector], getIsPlanned);
export const computedIsNightPlanned = createSelector([planningsNightSelector], getIsPlanned);

export const computedUserTasks = createSelector(
  [tasksSelector, userIdSelector],
  getUserTasks
);

export const computedHotelRooms = createSelector(
  [
    roomsSelector,
    computedIndexFloors,
    computedIndexRoomStatuses,
    computedIndexRoomHousekeepings,
    computedGroupCalendar,
    computedIndexPlanning,
    computedGroupNotes,
    computedGroupTasks,
    roomsUpdatesSelector,
    userIdSelector
  ],
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
