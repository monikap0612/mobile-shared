import UsersTypes from '../constants/users';

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

export function groupsFetch() {
  return {
    type: UsersTypes.GROUPS_FETCH
  }
}

export function groupsSuccess({ groups }) {
  return {
    type: UsersTypes.GROUPS_SUCCESS,
    groups
  }
}

export default {
  usersFetch,
  usersSuccess,
  groupsFetch,
  groupsSuccess
}
