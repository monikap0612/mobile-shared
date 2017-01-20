import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';

import { usersMapped, sortedGroups } from '../../selectors/users';
import { roomsSelector } from 'rc-mobile-base/lib/selectors/rooms';

import { rooms } from './dummy';

const quickSelects = [
  { name: 'Planned Attendant', value: 'planned', type: 'quick' },
  { name: 'Maintenance Team (All)', value: 'maintenance', type: 'quick' },
  { name: 'Runners (All)', value: 'runners', type: 'quick' },
  { name: 'Inspectors (All)', value: 'inspectors', type: 'quick' },
]

export const userSelects = createSelector(
  [usersMapped],
  (users) => users.map(user => ({
    image: user.thumbnail || user.image || null,
    name: user.fullName,
    value: user._id,
    type: 'people'
  }))
)

export const groupSelects = createSelector(
  [sortedGroups],
  (groups) => groups.map(group => ({
    name: group.name,
    value: group._id,
    type: 'groups'
  }))
)

export const usersSelector = createSelector(
  [userSelects, groupSelects],
  (users, groups) => quickSelects.concat(users).concat(groups)
)

const createNotificationForm = getFormValues('createNotificationForm')
export const locationsSelector = createSelector(
  [roomsSelector, createNotificationForm],
  (_, form) => {
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
