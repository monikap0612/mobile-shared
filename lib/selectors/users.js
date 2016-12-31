import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, map, find, filter } from 'lodash/collection';
import { uniq } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { map as fpMap, uniq as fpUniq, fpUniqWith, compose, flow } from 'lodash/fp';

export const usersSelector = state => state.users.users;

export const usersMapped = createSelector(
  [usersSelector],
  (users) => users.map(user => ({
    ...user,
    fullName: `${user.first_name} ${user.last_name}`
  }))
)

const getIndexedUsers = (hotelUsers) => {
  if (!hotelUsers || !hotelUsers.length) {
    return {};
  }

  return keyBy(hotelUsers, '_id');
}

const getAttendantusers = (hotelUsers) => {
  if (!hotelUsers || !hotelUsers.length) {
    return [];
  }

  return hotelUsers.filter(user => user.isAttendant);
}

export const computedIndexedUsers = createSelector(
  [usersMapped],
  getIndexedUsers
);

export const computedAttendantUsers = createSelector(
  [usersMapped],
  getAttendantusers
)

export const computedIndexedAttendants = createSelector(
  [computedAttendantUsers],
  getIndexedUsers
)
