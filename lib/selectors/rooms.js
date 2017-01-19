import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, groupBy, map, find, filter, sortBy, includes } from 'lodash/collection';
import { uniq, flatten } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { isEmpty } from 'lodash/lang';
import { map as fpMap, uniq as fpUniq, fpUniqWith, flow, sortBy as fpSortBy, filter as fpFilter } from 'lodash/fp';
import moment from 'moment';

import { calculateGuest, calculateGuestCode } from '../utils/calendar';
import { roomsSorting, floorsSorting } from '../utils/sorting';

export const userIdSelector = state => state.auth.userId;
export const roomsSelector = state => state.rooms.hotelRooms;
export const floorsSelector = state => state.rooms.hotelFloors;
export const roomStatusesSelector = state => state.rooms.hotelRoomStatuses;
export const roomHousekeepingsSelector = state => state.rooms.hotelRoomHousekeepings;
export const roomCategoriesSelector = state => state.rooms.hotelRoomCategories;
export const calendarSelector = state => state.rooms.hotelCalendar;
export const planningsSelector = state => state.rooms.hotelPlannings;
export const planningsNightSelector = state => state.rooms.hotelPlanningsNight;
export const planningsRunnerSelector = state => state.rooms.hotelPlanningsRunner;
export const usersSelector = state => state.users.users;
export const roomNotesSelector = state => state.rooms.hotelRoomNotes;
export const catalogSelector = state => state.rooms.hotelCatalogs;
export const tasksSelector = state => state.rooms.hotelTasks;
export const historySelector = state => state.rooms.hotelHistory;
export const activeRoomSelector = state => state.rooms.activeRoom;
export const roomsUpdatesSelector = state => state.updates.rooms;
export const filtersSelector = state => state.filters;

export const getIndexFloors = (hotelFloors) => keyBy(hotelFloors || [], '_id');
export const getIndexRoomStatuses = (hotelRoomStatuses) => keyBy(hotelRoomStatuses || [], '_id');
export const getIndexRoomHousekeepings = (hotelRoomHousekeepings) => keyBy(hotelRoomHousekeepings || [], '_id');
export const getIndexRoomCategories = (hotelRoomCategories) => keyBy(hotelRoomCategories || [], '_id');
export const getGroupCalendar = (hotelCalendar) => groupBy(hotelCalendar || [], 'room_id');
export const getIndexPlanning = (hotelPlannings) => keyBy(hotelPlannings || [], 'room_id');
export const getIndexUsers = (hotelUsers) => keyBy(hotelUsers || [], '_id');
export const getGroupHistory = (hotelHistory) => groupBy(hotelHistory || [], 'room_id');
export const getGroupNotes = (hotelRoomNotes, indexedHotelUsers) => {
  if (!hotelRoomNotes || !hotelRoomNotes.length) {
    return [];
  }
  const notesWithUsers = hotelRoomNotes.map(note => {
    return extend({}, note, { user: get(indexedHotelUsers, note.user_id) });
  })

  return groupBy(notesWithUsers || [], 'room_id');
}
export const getGroupTasks = (hotelTasks) => groupBy(hotelTasks, 'meta.room_id');
export const getIsPlanned = (hotelPlannings) => filter(hotelPlannings, p => get(p, 'planning_user_id.length', 0) > 0).length > 0;

export const getUserTasks = (hotelTasks, userId) => {
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

export const getAllRooms = (
  hotelRooms,
  indexFloors,
  indexRoomStatuses,
  indexRoomHousekeepings,
  groupedCalendar,
  indexPlanning,
  groupedNotes,
  groupedTasks,
  isPlanned,
  roomsUpdates,
  userId
) => {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  const mappedRooms = map(hotelRooms, room => {
    const roomId = get(room, '_id');
    const roomPlanning = get(indexPlanning, roomId, {});

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
  }).filter(room => room);

  return mappedRooms;
}

export const getComputedRooms = (
  hotelRooms,
  indexFloors,
  indexRoomStatuses,
  indexRoomHousekeepings,
  indexRoomCategories,
  groupedCalendar,
  indexPlanning,
  groupedNotes,
  groupedTasks,
  isPlanned,
  roomsUpdates,
  userId
) => {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  const mappedRooms = map(hotelRooms, room => {
    const roomId = get(room, '_id');
    const roomPlanning = get(indexPlanning, roomId, {});

    if (isPlanned && get(roomPlanning, 'planning_user_id') !== userId) {
      return null;
    }

    const floorId = get(room, 'floor');
    const roomStatusId = get(room, 'roomStatus');
    const roomHousekeepingId = get(room, 'roomHousekeeping');
    const roomCategoryId = get(room, 'roomCategory');

    const roomCalendar = get(groupedCalendar, roomId, []);
    const roomNotes = get(groupedNotes, roomId, []);
    const roomTasks = get(groupedTasks, roomId, []);
    const guests = roomCalendar && !isEmpty(roomCalendar) && calculateGuest(roomCalendar) || null;
    const guestStatus = get(roomPlanning, 'guest_status') || calculateGuestCode(roomCalendar, guests);

    return extend({}, room, {
      floor: get(indexFloors, floorId, {}),
      roomStatus: get(indexRoomStatuses, roomStatusId, {}),
      roomHousekeeping: get(indexRoomHousekeepings, roomHousekeepingId, {}),
      roomCategory: get(indexRoomCategories, roomCategoryId, {}),
      roomPlanning,
      roomCalendar,
      roomNotes,
      roomTasks,
      guests,
      guestStatus,
      update: get(roomsUpdates, roomId, null)
    });
  }).filter(room => room);

  return sortBy(mappedRooms, 'name');
}

export const getComputedRoomsIndex = (hotelRooms) => {
  return keyBy(hotelRooms, '_id');
}

export const getAvailableFloors = (hotelRooms, hotelFloors) => {
  if (!hotelRooms || !hotelRooms.length || !hotelFloors.length) {
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
        _id: floorId,
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

export const getActiveRoom = (hotelRoomsIndex, activeRoom) => {
  return get(hotelRoomsIndex, activeRoom, null);
}

export const getCatalogByActiveRoom = (hotelCatalog, activeRoom) => {
  if (!hotelCatalog || !hotelCatalog.length) {
    return [];
  }

  return filter(hotelCatalog, { roomId: activeRoom });
}

export const getTasks = (hotelTasks, indexUsers) => {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  return hotelTasks.map(task => {
    return extend({}, task, {
      creator: task.creator_id && get(indexUsers, task.creator_id),
      responsible: task.responsible_id && get(indexUsers, task.responsible_id),
    });
  })
}

export const getAllNotificationTasks = (hotelTasks) => {
  const today = moment().format('YYYY-MM-DD');
  return filter(hotelTasks, task => get(task, 'type') === 'notification' && today === get(task, 'due_date'));
}

export const getNotificationTasks = (hotelTasks, userId) => {
  const today = moment().format('YYYY-MM-DD');
  return filter(hotelTasks, task => get(task, 'type') === 'notification' && get(task, 'assigned.user_ids', []).includes(userId) && today === get(task, 'due_date'));
}

export const getPopupNotificationTasks = (notificationTasks) => {
  return filter(notificationTasks, n => !n.is_completed);
}

export const getOpenTasks = (hotelTasks, userId) => {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  return filter(hotelTasks, task => get(task, 'type') !== 'notification' && !get(task, 'is_completed') && !get(task, 'is_cancelled') && get(task, 'type') !== 'notification' && !get(task, 'is_rejected') && !includes(get(task, 'assigned.rejected_ids', []), userId));
}

export const getPopupTasks = (hotelTasks, userId) => {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  const today = moment().format('YYYY-MM-DD');

  return filter(hotelTasks, task => get(task, 'type') !== 'notification' && today === get(task, 'due_date') && !get(task, 'is_claimed') && !get(task, 'is_rejected') && !includes(get(task, 'assigned.rejected_ids', []), userId));
}

export const getFilteredRooms = (hotelRooms, filters) => {
  if (!hotelRooms || !hotelRooms.length) {
    return [];
  }

  if (!filters.isActiveFilter) {
    return hotelRooms;
  }

  let filtered = hotelRooms;
  if (filters.roomsSearchQuery) {
    const cleanQuery = filters.roomsSearchQuery.toLowerCase();
    filtered = filtered.filter(room => {
      const matchesGuest = get(room, 'roomCalendar', []).reduce((pv, entry) => {
        if (get(entry, 'guest_name', '').toLowerCase().includes(cleanQuery)) {
          pv = true;
        }
        return pv;
      }, false);

      return matchesGuest || room.name.toLowerCase().includes(cleanQuery);
    });
  }
  if (filters.activeFloor) {
    filtered = filtered.filter(room => {
      return room.floor._id === filters.activeFloor;
    });
  }
  if (filters.activeSection) {
    filtered = filtered.filter(room => {
      return room.section === filters.section;
    });
  }
  if (filters.activeRooms && filters.activeRooms.length) {
    filtered = filtered.filter(room => {
      return filters.activeRooms.includes(room._id);
    });
  }

  return filtered;
}

export const computedIndexFloors = createSelector([floorsSelector], getIndexFloors);
export const computedIndexRoomStatuses = createSelector([roomStatusesSelector], getIndexRoomStatuses);
export const computedIndexRoomHousekeepings = createSelector([roomHousekeepingsSelector], getIndexRoomHousekeepings);
export const computedIndexRoomCategories = createSelector([roomCategoriesSelector], getIndexRoomCategories);
export const computedGroupCalendar = createSelector([calendarSelector], getGroupCalendar);
export const computedIndexUsers = createSelector([usersSelector], getIndexUsers);
export const computedGroupNotes = createSelector([roomNotesSelector, computedIndexUsers], getGroupNotes);
export const computedGroupHistory = createSelector([historySelector], getGroupHistory);

export const computedTasks = createSelector(
  [tasksSelector, computedIndexUsers],
  getTasks
);

export const computedAllNotifications = createSelector(
  [computedTasks],
  getAllNotificationTasks
);

export const computedNotifications = createSelector(
  [computedTasks, userIdSelector],
  getNotificationTasks
);

export const computedPopupNotifications = createSelector(
  [computedNotifications],
  getPopupNotificationTasks
)

export const computedUserTasks = createSelector(
  [computedTasks, userIdSelector],
  getUserTasks
);

export const computedPopupTasks = createSelector(
  [computedUserTasks, userIdSelector],
  getPopupTasks
);

export const computedGroupTasks = createSelector([computedTasks], getGroupTasks);

export const computedIndexPlanning = createSelector([planningsSelector], getIndexPlanning);
export const computedIndexRunnerPlanning = createSelector([planningsRunnerSelector], getIndexPlanning);
export const computedIndexNightPlanning = createSelector([planningsNightSelector], getIndexPlanning);

export const computedIsPlanned = createSelector([planningsSelector], getIsPlanned);
export const computedIsRunnerPlanned = createSelector([planningsRunnerSelector], getIsPlanned);
export const computedIsNightPlanned = createSelector([planningsNightSelector], getIsPlanned);

export const computedHotelRooms = createSelector(
  [
    roomsSelector,
    computedIndexFloors,
    computedIndexRoomStatuses,
    computedIndexRoomHousekeepings,
    computedIndexRoomCategories,
    computedGroupCalendar,
    computedIndexPlanning,
    computedGroupNotes,
    computedGroupTasks,
    computedIsPlanned,
    roomsUpdatesSelector,
    userIdSelector
  ],
  getComputedRooms
);

export const allHotelRooms = createSelector(
  [
    roomsSelector,
    computedIndexFloors,
    computedIndexRoomStatuses,
    computedIndexRoomHousekeepings,
    computedGroupCalendar,
    computedIndexPlanning,
    computedGroupNotes,
    computedGroupTasks,
    computedIsPlanned,
    roomsUpdatesSelector,
    userIdSelector
  ],
  getAllRooms
);

export const hotelRoomsIndex = createSelector(
  [roomsSelector],
  (rooms) => keyBy(rooms, '_id')
);

export const computedHotelRoomsIndex = createSelector(
  [computedHotelRooms],
  getComputedRoomsIndex
)

export const allHotelRoomsIndex = createSelector(
  [allHotelRooms],
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
