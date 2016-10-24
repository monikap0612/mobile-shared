import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import UsersTypes from '../constants/users';
import UsersActions from '../actions/users';

import request from '../utils/request';
import API_URL from '../api';

const USERS_API = `${API_URL}/users`;
const GROUPS_API = `${API_URL}/groups`;

// Hotel Users
export function * fetchUsers() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, USERS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchUsersFlow() {
  try {
    const data = yield call(fetchUsers);
    yield put(UsersActions.usersSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchUsersFlow(state) {
  yield * takeLatest(UsersTypes.USERS_FETCH, fetchUsersFlow);
}

// Hotel Groups
export function * fetchGroups() {
  const { auth: { hotelId, token } } = yield select();

  return yield call(request, GROUPS_API, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function * fetchGroupsFlow() {
  try {
    const data = yield call(fetchGroups);
    yield put(UsersActions.groupsSuccess(data))
  } catch (e) {
    console.log(e);
  } finally {

  }
}

export function * watchGroupsFlow(state) {
  yield * takeLatest(UsersTypes.GROUPS_FETCH, fetchGroupsFlow);
}
