import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, map, find, filter } from 'lodash/collection';
import { uniq } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { map as fpMap, uniq as fpUniq, fpUniqWith, compose, flow } from 'lodash/fp';

const usersSelector = state => state.users.users;

const getIndexedUsers = (hotelUsers) => {
  if (!hotelUsers || !hotelUsers.length) {
    return {};
  }

  return keyBy(hotelUsers, '_id');
}

const getAttendantUsers = (hotelUsers) => {
  if (!hotelUsers || !hotelUsers.length) {
    return [];
  }

  return hotelUsers.filter(user => user.isAttendant);
}

const getRunnerUsers = (hotelUsers) => {
  if (!hotelUsers || !hotelUsers.length) {
    return [];
  }

  return hotelUsers.filter(user => user.isRoomRunner);
}

export const computedIndexedUsers = createSelector(
  [usersSelector],
  getIndexedUsers
);

export const computedAttendantUsers = createSelector(
  [usersSelector],
  getAttendantUsers
)

export const computedIndexedAttendants = createSelector(
  [computedAttendantUsers],
  getIndexedUsers
)

export const computedRunnerUsers = createSelector(
  [usersSelector],
  getRunnerUsers
)

export const computedIndexedRunners = createSelector(
  [computedRunnerUsers],
  getIndexedUsers
)
