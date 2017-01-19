import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';

import { usersMapped } from 'rc-mobile-base/lib/selectors/users';
import { roomsSelector } from 'rc-mobile-base/lib/selectors/rooms';

import { users, rooms } from './dummy';

export const usersSelector = createSelector(
  [usersMapped],
  () => users
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
