import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import UsersTypes from '../constants/users';
import UsersActions from '../actions/users';

import request from '../utils/request';

export default function({ apiUrl }) {
  const USERS_API = `${apiUrl}/users`;
  const GROUPS_API = `${apiUrl}/groups`;

  // Hotel Users
  function * fetchUsers() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, USERS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchUsersFlow() {
    try {
      const data = yield call(fetchUsers);
      yield put(UsersActions.usersSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchUsersFlow(state) {
    yield * takeLatest(UsersTypes.USERS_FETCH, fetchUsersFlow);
  }

  // Hotel Groups
  function * fetchGroups() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, GROUPS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchGroupsFlow() {
    try {
      const data = yield call(fetchGroups);
      yield put(UsersActions.groupsSuccess(data))
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchGroupsFlow(state) {
    yield * takeLatest(UsersTypes.GROUPS_FETCH, fetchGroupsFlow);
  }

  return {
    watchGroupsFlow,
    watchUsersFlow
  }
}
