import { createSelector } from 'reselect';

import { usersMapped } from 'rc-mobile-base/lib/selectors/users';

import { users } from './dummy';

export const usersSelector = createSelector(
  [usersMapped],
  () => users
)
