import AuthTypes from '../constants/auth';

export function hotelRequest(hotel) {
  return {
    type: AuthTypes.HOTEL_REQUEST,
    hotel
  }
}

export function hotelSuccess({ name, images, users }) {
  return {
    type: AuthTypes.HOTEL_SUCCESS,
    name,
    images,
    users
  }
}

export function hotelFailure({ error }) {
  return {
    type: AuthTypes.HOTEL_FAILURE,
    error
  }
}

export function userRequest({ hotelUsername, username, password }) {
  return {
    type: AuthTypes.USER_REQUEST,
    hotelUsername,
    username,
    password
  }
}

export function userSuccess({ token, user, hotel, groups, config }) {
  return {
    type: AuthTypes.USER_SUCCESS,
    token,
    user,
    hotel,
    groups,
    config
  }
}

export function userFailure(error) {
  // console.log(error);
}

export function hotelFetch() {
  return {
    type: AuthTypes.HOTEL_FETCH
  }
}

export function hotelFetchSuccess({ hotel }) {
  return {
    type: AuthTypes.HOTEL_FETCH_SUCCESS,
    hotel
  }
}

export function hotelReset() {
  return {
    type: AuthTypes.HOTEL_RESET
  }
}

export function userReset() {
  return {
    type: AuthTypes.USER_RESET
  }
}

export function logout() {
  return {
    type: AuthTypes.LOGOUT
  }
}

export function toggleDuty(isOnDuty) {
  return {
    type: AuthTypes.TOGGLE_DUTY,
    isOnDuty
  }
}

export default {
  hotelRequest,
  hotelSuccess,
  hotelFailure,
  userRequest,
  userSuccess,
  userFailure,
  hotelFetch,
  hotelFetchSuccess,
  hotelReset,
  userReset,
  logout,
  toggleDuty,
}
