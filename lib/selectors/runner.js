import {
  computedHotelRooms,
  computedAvailableFloors
} from './rooms';
import { createSelector } from 'reselect';

import { flow, map, flatten, filter } from 'lodash/fp';
export const getGuestRoomsByFloor = (hotelFloorsWithRooms) => {
  if (!hotelFloorsWithRooms || !hotelFloorsWithRooms.length) {
    return [];
  }

  return flow(
    map('rooms'),
    flatten,
    filter(room => !room.roomCategory.isPublic
                && !room.roomCategory.isPrivate
                && !room.roomCategory.isOutside
    )
  )(hotelFloorsWithRooms)
}

export const computedGuestRoomsByFloor = createSelector(
  [computedAvailableFloors],
  getGuestRoomsByFloor
)
