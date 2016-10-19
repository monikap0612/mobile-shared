import { takeLatest  } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

import UsersTypes from '../constants/users'
import UsersActions from '../actions/users'

import request from '../utils/request'

export default function({ apiUrl }) {
  const USERS_API = `${apiUrl}/users`

  // Hotel Users
  function * fetchUsers() {
    const { auth: { token } } = yield select()

    return yield call(request, USERS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchUsersFlow() {
    try {
      const data = yield call(fetchUsers)
      yield put(UsersActions.usersSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchUsersFlow() {
    yield * takeLatest(UsersTypes.USERS_FETCH, fetchUsersFlow)
  }

  return {
    watchUsersFlow
  }
}
