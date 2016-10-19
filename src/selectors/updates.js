import { createSelector } from 'reselect'
import { get } from 'lodash/object'

const roomsSelector = state => state.updates.rooms
const activeRoomSelector = state => state.rooms.activeRoom

const getActiveRoomUpdate = (roomsUpdates, roomId) => {
  return roomsUpdates && get(roomsUpdates, roomId, null)
}

export const computedActiveRoomUpdate = createSelector(
  [ roomsSelector, activeRoomSelector ],
  getActiveRoomUpdate
)
