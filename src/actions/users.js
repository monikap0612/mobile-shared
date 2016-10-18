import UsersTypes from '../constants/users'

export function usersFetch() {
  return {
    type: UsersTypes.USERS_FETCH
  }
}

export function usersSuccess({ users }) {
  return {
    type: UsersTypes.USERS_SUCCESS,
    users
  }
}

export default {
  usersFetch,
  usersSuccess
}
