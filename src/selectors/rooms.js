import { createSelector } from 'reselect'
import { keyBy, groupBy, map, filter, sortBy } from 'lodash/collection'
import { flatten } from 'lodash/array'
import { get, extend } from 'lodash/object'
import { isEmpty } from 'lodash/lang'
import { map as fpMap, uniq as fpUniq, flow, sortBy as fpSortBy } from 'lodash/fp'

import { calculateGuest, calculateGuestCode } from '../utils/calendar'
import { floorsSorting } from '../utils/sorting'

const roomsSelector = state => state.rooms.hotelRooms
const floorsSelector = state => state.rooms.hotelFloors
const roomStatusesSelector = state => state.rooms.hotelRoomStatuses
const roomHousekeepingsSelector = state => state.rooms.hotelRoomHousekeepings
const calendarSelector = state => state.rooms.hotelCalendar
const planningsSelector = state => state.rooms.hotelPlannings
const roomNotesSelector = state => state.rooms.hotelRoomNotes
const catalogSelector = state => state.rooms.hotelCatalogs
const tasksSelector = state => state.rooms.hotelTasks
const activeRoomSelector = state => state.rooms.activeRoom
const roomsUpdatesSelector = state => state.updates.rooms

const getComputedRooms = (hotelRooms, hotelFloors, hotelRoomStatuses, hotelRoomHousekeepings, hotelCalendar, hotelPlannings, hotelRoomNotes, hotelTasks, roomsUpdates) => {
  if (!hotelRooms || !hotelRooms.length) {
    return []
  }

  const indexFloors = keyBy(hotelFloors, '_id')
  const indexRoomStatuses = keyBy(hotelRoomStatuses, '_id')
  const indexRoomHousekeepings = keyBy(hotelRoomHousekeepings, '_id')
  const groupedCalendar = groupBy(hotelCalendar, 'room_id')
  const indexedPlannings = keyBy(hotelPlannings, 'room_id')
  const groupedNotes = groupBy(hotelRoomNotes, 'room_id')
  const groupedTasks = groupBy(hotelTasks, 'meta.room_id')

  const computedHotelRooms = map(hotelRooms, room => {
    const roomId = get(room, '_id')
    const floorId = get(room, 'floor')
    const roomStatusId = get(room, 'roomStatus')
    const roomHousekeepingId = get(room, 'roomHousekeeping')

    const roomCalendar = get(groupedCalendar, roomId, [])
    const roomPlanning = get(indexedPlannings, roomId, {})
    const roomNotes = get(groupedNotes, roomId, [])
    const roomTasks = get(groupedTasks, roomId, [])
    const guests = roomCalendar && !isEmpty(roomCalendar) && calculateGuest(roomCalendar) || null
    const guestStatus = get(roomPlanning, 'guest_status') || calculateGuestCode(roomCalendar, guests)

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
    })
  })

  return sortBy(computedHotelRooms, 'name')
}

const getComputedRoomsIndex = (hotelRooms) => {
  return keyBy(hotelRooms, '_id')
}

const getAvailableFloors = (hotelRooms, hotelFloors) => {
  if (!hotelRooms || !hotelRooms.length) {
    return []
  }

  const indexFloors = keyBy(hotelFloors, '_id')

  return flow(
    fpMap('floor._id'),
    fpUniq,
    fpMap(floorId => {
      const floor = get(indexFloors, floorId)
      const { number, sortValue } = floor
      const rooms = filter(hotelRooms, { floor: { _id : floorId } })
      const floorTasks = flatten(map(rooms, 'roomTasks'))

      return {
        floor,
        rooms,
        floorTasks,
        sorting: floorsSorting(number, sortValue)
      }
    }),
    fpSortBy('sorting')
  )(hotelRooms)
}

const getActiveRoom = (hotelRoomsIndex, activeRoom) => {
  return get(hotelRoomsIndex, activeRoom, null)
}

const getCatalogByActiveRoom = (hotelCatalog, activeRoom) => {
  if (!hotelCatalog || !hotelCatalog.length) {
    return []
  }

  return filter(hotelCatalog, { roomId: activeRoom })
}

export const computedHotelRooms = createSelector(
  [ roomsSelector, floorsSelector, roomStatusesSelector, roomHousekeepingsSelector, calendarSelector, planningsSelector, roomNotesSelector, tasksSelector, roomsUpdatesSelector ],
  getComputedRooms
)

export const computedHotelRoomsIndex = createSelector(
  [ computedHotelRooms ],
  getComputedRoomsIndex
)

export const computedActiveRoom = createSelector(
  [ computedHotelRoomsIndex, activeRoomSelector ],
  getActiveRoom
)

export const computedAvailableFloors = createSelector(
  [ computedHotelRooms, floorsSelector ],
  getAvailableFloors
)

export const computedCatalogByActiveRoom = createSelector(
  [ catalogSelector, activeRoomSelector ],
  getCatalogByActiveRoom
)
