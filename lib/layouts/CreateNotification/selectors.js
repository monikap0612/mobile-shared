import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';
import { sortBy } from 'lodash/collection';

import { sort } from '../../utils/immutable';
import { floorsSorting, roomsSorting } from '../../utils/sorting';

import { usersMapped, sortedGroups } from '../../selectors/users';
import { allHotelRooms } from 'rc-mobile-base/lib/selectors/rooms';

const quickSelects = [
  { name: 'Planned Attendant', value: 'planned', type: 'quick' },
  { name: 'Maintenance Team (All)', value: 'maintenance', type: 'quick' },
  { name: 'Runners (All)', value: 'runners', type: 'quick' },
  { name: 'Inspectors (All)', value: 'inspectors', type: 'quick' },
]

export const userSelects = createSelector(
  [usersMapped],
  (users) => users.map(user => ({
    ...user,
    image: user.thumbnail || user.image || null,
    name: user.fullName,
    value: user._id,
    type: 'people'
  }))
)

export const groupSelects = createSelector(
  [sortedGroups],
  (groups) => groups.map(group => ({
    ...group,
    name: group.name,
    value: group._id,
    type: 'groups',
    isGroup: true
  }))
)

export const usersSelector = createSelector(
  [userSelects, groupSelects],
  (users, groups) => quickSelects.concat(users).concat(groups)
)

const createNotificationForm = getFormValues('createNotificationForm')

const roomsByFloor = (a, b) => {
  const aFloorSorting = floorsSorting(a.floor.number, a.floor.sortValue)
  const bFloorSorting = floorsSorting(b.floor.number, b.floor.sortValue)
  const aSorting = roomsSorting(a.name, a.sortValue)
  const bSorting = roomsSorting(b.name, b.sortValue)

  if (aFloorSorting > bFloorSorting) {
    return 1
  }

  if (aFloorSorting < bFloorSorting) {
    return -1
  }

  if (aFloorSorting === bFloorSorting) {
    if (aSorting > bSorting) {
      return 1
    }
    if (aSorting < bSorting) {
      return -1
    }
    if (aSorting === bSorting) {
      return 0
    }
  }
}

const sortRooms = sort(roomsByFloor)

const sortedRooms = createSelector(
  [allHotelRooms],
  (rooms) => sortRooms(rooms)
)

export const locationsSelector = createSelector(
  [sortedRooms, createNotificationForm],
  (rooms, form) => {
    if (!form || !form.locations) {
      return rooms
    }
    const selected = form.locations.map(location => location._id)
    return rooms.map(room => ({
      ...room,
      isSelected: selected.includes(room._id)
    }))
  }
)
