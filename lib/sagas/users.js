import { takeLatest, delay, take } from 'redux-saga';
import { put, call, select, fork } from 'redux-saga/effects';

import UsersTypes from '../constants/users';
import UsersActions from '../actions/users';

import request, { authRequest } from '../utils/request';
import { forkWatchers } from '../utils/sagas';

export default function({ apiUrl }) {
  const USERS_API = `${apiUrl}/users`;
  const GROUPS_API = `${apiUrl}/groups`;

  // Hotel Users
  function * fetchUsers() {
    return yield call(authRequest, USERS_API);
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
    return yield call(authRequest, GROUPS_API);
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

  const watchers = {
    watchGroupsFlow,
    watchUsersFlow
  };

  const root = forkWatchers(watchers);

  return {
    root,
    watchers,
    sagas: {
      fetchUsers,
      fetchUsersFlow,
      fetchGroups,
      fetchGroupsFlow,
    }
  }
}
