import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import AuthTypes from '../constants/auth';

export const INITIAL_STATE = Immutable({
  isActiveHotel: false,
  hotelUsername: null,
  hotelName: null,
  hotelImage: null,
  hotelUsers: [],
  user: null,
  hotel: null,
  groups: [],
  userId: null,
  hotelId: null,
  token: null,
  error: null
});

const ACTION_HANDLERS = {
  [AuthTypes.HOTEL_REQUEST]: (state, { hotel }) => {
    return state
      .set('hotelUsername', hotel);
  },
  [AuthTypes.HOTEL_SUCCESS]: (state, {name, images, users}) => {
    return state
      .set('isActiveHotel', true)
      .set('hotelName', name)
      .set('hotelImage', images)
      .set('hotelUsers', users);
  },
  [AuthTypes.HOTEL_FAILURE]: (state) => {
    return state;
  },
  [AuthTypes.USER_SUCCESS]: (state, { token, hotel, user, groups}) => {
    const { _id: userId } = user;
    const { _id: hotelId } = hotel;

    console.log(token, hotel, user, groups, userId, hotelId);

    return state
      .set('token', token)
      .set('hotel', hotel)
      .set('user', user)
      .set('userId', userId)
      .set('hotelId', hotelId)
      .set('groups', groups);
  },
  [AuthTypes.USER_FAILURE]: (state) => {
    return state;
  },
  [AuthTypes.HOTEL_FETCH_SUCCESS]: (state, { hotel }) => {
    return state.set('hotel', hotel);
  },
  [AuthTypes.HOTEL_RESET]: (state) => {
    return INITIAL_STATE;
  }
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
