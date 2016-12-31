import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const tokenSelector = createSelector(
  [authSelector],
  (auth) => auth.token
);

export const hotelIdSelector = createSelector(
  [authSelector],
  (auth) => auth.hotelId
);

export const userIdSelector = createSelector(
  [authSelector],
  (auth) => auth.userId
);

export const userSelector = createSelector(
  [authSelector],
  (auth) => auth.user
);
