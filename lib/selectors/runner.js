import {
  computedHotelRooms,
  computedAvailableFloors,
  computedAllFloors
} from './rooms';
import { createSelector } from 'reselect';

import { flow, map, flatten, filter } from 'lodash/fp';
export const getGuestRoomsByFloor = (hotelFloorsWithRooms) => {
  if (!hotelFloorsWithRooms || !hotelFloorsWithRooms.length) {
    return [];
  }

  hotelFloorsWithRooms.forEach(room => console.log(room.roomCategory))

  return flow(
    map('rooms'),
    flatten,
    filter(room => !room.roomCategory.isPublic
                && !room.roomCategory.isPrivate
                && !room.roomCategory.isOutside
    ),
    filter(room => room.guestStatus === 'stay'
                || room.guestStatus === 'arr'
                || room.guestStatus === 'da'
    )
  )(hotelFloorsWithRooms)
}

export const computedGuestRoomsByFloor = createSelector(
  [computedAllFloors],
  getGuestRoomsByFloor
)
