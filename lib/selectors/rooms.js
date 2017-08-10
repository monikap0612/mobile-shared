import Immutable from 'seamless-immutable';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { keyBy, groupBy, map, find, filter, sortBy, includes, each } from 'lodash/collection';
import { uniq, flatten } from 'lodash/array';
import { get, extend, values, mapKeys, keys, assign, merge, pick } from 'lodash/object';
import { isEmpty, clone, isEqual } from 'lodash/lang';
import { map as fpMap, uniq as fpUniq, fpUniqWith, flow, sortBy as fpSortBy, filter as fpFilter } from 'lodash/fp';
import moment from 'moment';

import { calculateGuest, calculateGuestCode } from '../utils/calendar';
import { roomsSorting, floorsSorting } from '../utils/sorting';
import makeProfile from '../utils/make-profile';

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

export const userSelector = state => state.auth.user;
export const userIdSelector = state => state.auth.userId;
export const roomsSelector = state => state.rooms.hotelRooms;
export const floorsSelector = state => state.rooms.hotelFloors;
export const roomStatusesSelector = state => state.rooms.hotelRoomStatuses;
export const roomHousekeepingsSelector = state => state.rooms.hotelRoomHousekeepings;
export const roomCategoriesSelector = state => state.rooms.hotelRoomCategories;
export const calendarSelector = state => state.rooms.hotelCalendar;
export const planningsSelector = state => state.rooms.hotelPlannings || [];
export const planningsNightSelector = state => state.rooms.hotelPlanningsNight;
export const planningsRunnerSelector = state => state.rooms.hotelPlanningsRunner;
export const selectPlanningsUpdates = state => state.planningUpdates.items;
export const selectRoomsUpdates = state => state.roomUpdates.items;
export const usersSelector = state => state.users.users;
export const roomNotesSelector = state => state.rooms.hotelRoomNotes;
export const catalogSelector = state => state.rooms.hotelCatalogs;
export const tasksSelector = state => state.rooms.hotelTasks;
export const historySelector = state => state.rooms.hotelHistory;
export const activeRoomSelector = state => state.rooms.activeRoom;
export const roomsUpdatesSelector = state => state.updates.rooms;
export const filtersSelector = state => state.filters;

export const userPlannings = createSelector(
  [userSelector, planningsSelector, planningsRunnerSelector],
  (user, plannings, runnerPlannings) => {
    const { _id: userId } = user;
    
    if (user.isAttendant) {
      return plannings.filter(p => p.planning_user_id == userId);
    } else if (user.isRoomRunner) {
      return runnerPlannings.filter(p => p.planning_user_id == userId);
    }

    return [];
  }
)

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
export const getIndexReservations = (hotelCalendar) => {
  const groupCalendar = groupBy(hotelCalendar || [], 'room_id');
  const data = map(groupCalendar, roomCalendar => {
    const guests = calculateGuest(roomCalendar);
    const guestStatus = calculateGuestCode(roomCalendar, guests);

    return { roomCalendar, guests, guestStatus };
  });

  return keyBy(data, arr => get(arr, ['roomCalendar', 0, 'room_id']))
}

export const getUserTasks = (hotelTasks, userId) => {
  if (!hotelTasks || !hotelTasks.length) {
    return [];
  }

  // console.time('getUserTasks')

  const filtered = filter(hotelTasks, task => {
    if (get(task, 'is_completed') || get(task, 'is_cancelled')) {
      return false;
    }

    if (!get(task, 'is_claimed') && includes(get(task, 'assigned.user_ids'), userId)) {
      return true;
    }

    return get(task, 'responsible_id') === userId;
  });

  // console.timeEnd('getUserTasks')
  return filtered;
}

export const getMutableRooms = (
  hotelRooms
) => map(hotelRooms, room => ({ ...room }))

export const getBasicRooms = (
  hotelRooms,
  indexFloors,
  indexRoomStatuses,
  indexRoomHousekeepings,
  indexRoomCategories,
  groupedCalendar,
  indexPlanning,
) => {
  if (!hotelRooms || !hotelRooms.length || isEmpty(indexFloors)) {
    return [];
  }

  return map(hotelRooms, room => {
    const roomId = get(room, '_id');
    const roomPlanning = get(indexPlanning, roomId, {});

    const floorId = get(room, 'floor');
    const roomStatusId = get(room, 'roomStatus');
    const roomHousekeepingId = get(room, 'roomHousekeeping');
    const roomCalendar = get(groupedCalendar, roomId, []);
    const guests = roomCalendar && !isEmpty(roomCalendar) && calculateGuest(roomCalendar) || null;
    const guestStatus = get(roomPlanning, 'guest_status') || calculateGuestCode(roomCalendar, guests);
    
    return assign(room, {
      floor: get(indexFloors, floorId, {}),
      roomStatus: get(indexRoomStatuses, roomStatusId, {}),
      roomHousekeeping: get(indexRoomHousekeepings, roomHousekeepingId, {}),
      roomPlanning,
      roomCalendar,
      guests,
      guestStatus
    });
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
  if (!hotelRooms || !hotelRooms.length || isEmpty(indexFloors)) {
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
    const roomCredits = get(roomPlanning, 'credits') || get(room, 'overwriteCredits') || get(roomCategory, 'credts') || 1;
    const sortValue = get(room, 'sortValue') || roomsSorting(get(room, 'name'));

    return {
      ...room,
      floor: get(indexFloors, floorId, {}),
      roomStatus: get(indexRoomStatuses, roomStatusId, {}),
      roomHousekeeping: get(indexRoomHousekeepings, roomHousekeepingId, {}),
      roomPlanning,
      roomCalendar,
      roomNotes,
      roomTasks,
      guests,
      guestStatus,
      roomCredits,
      sortValue,
      update: get(roomsUpdates, roomId, null)
    }

    // return extend({}, room, {
    //   floor: get(indexFloors, floorId, {}),
    //   roomStatus: get(indexRoomStatuses, roomStatusId, {}),
    //   roomHousekeeping: get(indexRoomHousekeepings, roomHousekeepingId, {}),
    //   roomPlanning,
    //   roomCalendar,
    //   roomNotes,
    //   roomTasks,
    //   guests,
    //   guestStatus,
    //   roomCredits,
    //   sortValue,
    //   update: get(roomsUpdates, roomId, null)
    // });
  }).filter(room => room);

  return sortBy(mappedRooms, 'sortValue');
}

export const getComputedRooms = (
  hotelRooms,
  indexFloors,
  indexRoomStatuses,
  indexRoomHousekeepings,
  indexRoomCategories,
  indexReservations,
  indexPlanning,
  groupedNotes,
  groupedTasks,
  isPlanned,
  roomsUpdates,
  userId
) => {
  if (!hotelRooms || !hotelRooms.length || isEmpty(indexFloors)) {
    return [];
  }

  // console.time('getComputedRooms')
  // console.log(hotelRooms);

  // const newRooms = [];
  // each(hotelRooms, room => { newRooms.push({ ...room }) })
  // return newRooms;

  // const mappedRooms = map(hotelRooms, room => {
  //   const roomId = get(room, '_id');
  //   const roomPlanning = get(indexPlanning, roomId, {});

  //   if (isPlanned && get(roomPlanning, 'planning_user_id') !== userId) {
  //     return null;
  //   }
    
  //   const {
  //     floor: floorId,
  //     roomStatus: roomStatusId,
  //     roomHousekeeping: roomHousekeepingId,
  //     roomCategory: roomCategoryId
  //   } = room;
    
  //   const roomCategory = get(indexRoomCategories, roomCategoryId, {});
  //   const roomCalendar = get(indexReservations, [roomId, 'roomCalendar'], []);
  //   const roomNotes = get(groupedNotes, roomId, []);
  //   const roomTasks = get(groupedTasks, roomId, []);
  //   const guests = get(indexReservations, [roomId, 'guests'], null);
  //   const guestStatus = get(roomPlanning, 'guest_status') || get(indexReservations, [roomId, 'guestStatus'], null);
  //   const roomCredits = get(roomPlanning, 'credits') || get(room, 'overwriteCredits') || get(roomCategory, 'credts') || 1;
  //   const sortValue = get(room, 'sortValue') || roomsSorting(get(room, 'name'));
    
  //   return {
  //     ...room,
  //     floor: get(indexFloors, floorId, {}),
  //     roomStatus: get(indexRoomStatuses, roomStatusId, {}),
  //     roomHousekeeping: get(indexRoomHousekeepings, roomHousekeepingId, {}),
  //     roomCategory,
  //     roomPlanning,
  //     roomCalendar,
  //     roomNotes,
  //     roomTasks,
  //     guests,
  //     guestStatus,
  //     roomCredits,
  //     sortValue,
  //     update: get(roomsUpdates, roomId, null)
  //   }
  // }).filter(Boolean)

  let mappedRooms = [];
  
  each(hotelRooms, room => {
    const roomId = get(room, '_id');
    const roomPlanning = get(indexPlanning, roomId, {});

    if (isPlanned && get(roomPlanning, 'planning_user_id') !== userId) {
      return;
    }
    
    const {
      floor: floorId,
      roomStatus: roomStatusId,
      roomHousekeeping: roomHousekeepingId,
      roomCategory: roomCategoryId
    } = room;
    
    room.floor = get(indexFloors, floorId, {});
    room.roomStatus = get(indexRoomStatuses, roomStatusId, {});
    room.roomHousekeeping = get(indexRoomHousekeepings, roomHousekeepingId, {});
    room.roomCategory = get(indexRoomCategories, roomCategoryId, {});
    room.roomCalendar = get(indexReservations, [roomId, 'roomCalendar'], []);
    room.roomNotes = get(groupedNotes, roomId, []);
    room.roomTasks = get(groupedTasks, roomId, []);
    room.guests = get(indexReservations, [roomId, 'guests'], null);
    room.guestStatus = get(roomPlanning, 'guest_status') || get(indexReservations, [roomId, 'guestStatus'], null);
    room.roomCredits = get(roomPlanning, 'credits') || get(room, 'overwriteCredits') || get(room.roomCategory, 'credts') || 1;
    room.sortValue = get(room, 'sortValue') || roomsSorting(get(room, 'name'));
    room.update = get(roomsUpdates, roomId, null);
    
    mappedRooms.push(room);
  })
  // console.log(mappedRooms);

  const sorted = sortBy(mappedRooms, 'sortValue');
  // console.log(mappedRooms);
  // const sorted = map(hotelRooms, room => {
  //   const roomId = get(room, '_id');
  //   return room.merge({});
  // });
  // console.timeEnd('getComputedRooms')
  return sorted;
}

export const getComputedRoomsIndex = (hotelRooms) => keyBy(hotelRooms, '_id')

export const getAvailableFloors = (hotelRooms, indexFloors) => {
  if (!hotelRooms || !hotelRooms.length || isEmpty(indexFloors)) {
    return [];
  }

  // console.time('getAvailableFloors')
  const usedFloors = groupBy(hotelRooms, 'floor._id');
  const usedFloorIds = keys(usedFloors);
  const mapped = map(usedFloorIds, (floorId) => {
    const floor = get(indexFloors, floorId);
    if (!get(floor, 'number')) {
      return null;
    }

    const { number, sortValue } = floor;
    const rooms = usedFloors[floorId];
    const floorTasks = flatten(map(rooms, 'roomTasks'));
    const stats = rooms.reduce((pv, room) => {
      const guestStatus = get(room, 'guestStatus') || 'vac';
      pv[guestStatus] = pv[guestStatus] + 1;
      return pv;
    }, { da: 0, arr: 0, dep: 0, stay: 0, vac: 0 });
    const sorting = floorsSorting(number, sortValue);

    return {
      _id: floorId,
      floor,
      rooms,
      floorTasks,
      sorting,
      stats
    }
  }).filter(Boolean);

  const sorted = sortBy(mapped, 'sorting');
  // console.timeEnd('getAvailableFloors')
  return sorted;
}

export const getActiveRoom = (hotelRooms, activeRoom) => {
  if (!hotelRooms || !hotelRooms.length) {
    return null;
  }

  return find(hotelRooms, { _id: activeRoom }) || null;
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

  // console.time('filtered rooms');

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

  // console.timeEnd('filtered rooms');
  return filtered;
}

export const computedIndexFloors = createDeepEqualSelector([floorsSelector], getIndexFloors);
export const computedIndexRoomStatuses = createDeepEqualSelector([roomStatusesSelector], getIndexRoomStatuses);
export const computedIndexRoomHousekeepings = createDeepEqualSelector([roomHousekeepingsSelector], getIndexRoomHousekeepings);
export const computedIndexRoomCategories = createDeepEqualSelector([roomCategoriesSelector], getIndexRoomCategories);
export const computedGroupCalendar = createDeepEqualSelector([calendarSelector], getGroupCalendar);
export const computedIndexUsers = createDeepEqualSelector([usersSelector], getIndexUsers);
export const computedGroupNotes = createDeepEqualSelector([roomNotesSelector, computedIndexUsers], getGroupNotes);
export const computedGroupHistory = createDeepEqualSelector([historySelector], getGroupHistory);
export const computedIndexReservations = createDeepEqualSelector([calendarSelector], getIndexReservations);

export const computedTasks = createDeepEqualSelector(
  [tasksSelector, computedIndexUsers],
  makeProfile(getTasks, 'getTasks')
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

export const computedGroupTasks = createDeepEqualSelector([computedTasks], getGroupTasks);

export const computedIndexPlanning = createDeepEqualSelector([planningsSelector], getIndexPlanning);
export const computedIndexRunnerPlanning = createDeepEqualSelector([planningsRunnerSelector], getIndexPlanning);
export const computedIndexNightPlanning = createDeepEqualSelector([planningsNightSelector], getIndexPlanning);

export const computedIsPlanned = createDeepEqualSelector([planningsSelector], getIsPlanned);
export const computedIsRunnerPlanned = createDeepEqualSelector([planningsRunnerSelector], getIsPlanned);
export const computedIsNightPlanned = createDeepEqualSelector([planningsNightSelector], getIsPlanned);

export const computedMutableRooms = createSelector(
  [roomsSelector],
  makeProfile(getMutableRooms, 'getMutableRooms')
  // getMutableRooms
)

export const computedHotelRooms = createSelector(
  [
    roomsSelector,
    computedIndexFloors,
    computedIndexRoomStatuses,
    computedIndexRoomHousekeepings,
    computedIndexRoomCategories,
    computedIndexReservations,
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
    computedIndexRoomCategories,
    computedIndexReservations,
    computedIndexPlanning,
    computedGroupNotes,
    computedGroupTasks,
    () => false,
    roomsUpdatesSelector,
    userIdSelector,
    computedIndexUsers
  ],
  getComputedRooms
);

export const basicHotelRooms = createSelector(
  [
    roomsSelector,
    computedIndexFloors,
    computedIndexRoomStatuses,
    computedIndexRoomHousekeepings,
    computedIndexRoomCategories,
    computedIndexReservations,
    computedIndexPlanning
  ],
  getBasicRooms
)

export const hotelRoomsIndex = createSelector(
  [roomsSelector],
  (rooms) => keyBy(rooms, '_id')
);

export const computedHotelRoomsIndex = createSelector(
  [computedHotelRooms],
  makeProfile(getComputedRoomsIndex, 'getComputedRoomsIndex')
)

export const allHotelRoomsIndex = createSelector(
  [allHotelRooms],
  makeProfile(getComputedRoomsIndex, 'getComputedRoomsIndex')
)

export const basicHotelRoomsIndex = createSelector(
  [basicHotelRooms],
  makeProfile(getComputedRoomsIndex, 'getComputedRoomsIndex')
)

export const computedActiveRoom = createSelector(
  [computedHotelRooms, activeRoomSelector],
  makeProfile(getActiveRoom, 'getActiveRoom')
);


export const getRoomById = (id) => createSelector(
  [allHotelRoomsIndex],
  (hotelRoomsIndex) => {
    return get(hotelRoomsIndex, id, null)
  }
);

export const computedAvailableFloors = createSelector(
  [computedHotelRooms, computedIndexFloors],
  makeProfile(getAvailableFloors, 'getAvailableFloors')
);

export const computedAllFloors = createSelector(
  [allHotelRooms, computedIndexFloors],
  makeProfile(getAvailableFloors, 'getAvailableFloors')
)

export const computedCatalogByActiveRoom = createSelector(
  [catalogSelector, activeRoomSelector],
  makeProfile(getCatalogByActiveRoom, 'getCatalogByActiveRoom')
);

export const getCatalogByRoomId = (id) => createSelector(
  [catalogSelector],
  (hotelCatalog) => {
    if (!hotelCatalog || !hotelCatalog.length) {
      return [];
    }

    return filter(hotelCatalog, { roomId: id });
  }
);

export const planningsForUser = createSelector(
  [planningsSelector, userIdSelector],
  (plannings, userId) => plannings.filter(p => p.planning_user_id === userId)
)

export const attendantRooms = createSelector(
  [planningsForUser, roomsSelector],
  (plannings, rooms) => {
    if (!plannings.length) {
      return []
    }
    return plannings.map(p => rooms.find(room => room._id === p.room_id)).filter(r => !!r)
  }
)

export const planningsUpdatesSelector = createSelector(
  [selectPlanningsUpdates],
  (updates) => {
    const plannings = values(updates)
    return plannings.filter(p => !p.alertWasRead)
  }
)

export const roomMessageUpdatesSelector = createSelector(
  [selectRoomsUpdates],
  (updates) => {
    const rooms = values(updates)
    return rooms.filter(p => !p.alertWasRead)
  }
)
