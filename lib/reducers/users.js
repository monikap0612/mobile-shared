import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import UsersTypes from '../constants/users';

// export const INITIAL_STATE = Immutable({
//   users: [],
//   hotelGroups: []
// });

const getInitialState = () => ({
  users: [],
  hotelGroups: []
});

const ACTION_HANDLERS = {
  [UsersTypes.USERS_SUCCESS]: (state, { users }) => {
    // return state
    //   .set('users', users);
    return {
      ...state,
      users: users.map(user => ({ ...user, _id: String(user._id) }))
    }
  },
  [UsersTypes.GROUPS_SUCCESS]: (state, { groups }) => {
    // return state
    //   .set('hotelGroups', groups);
    return {
      ...state,
      hotelGroups: groups
    }
  }
}

export default createReducer(getInitialState(), ACTION_HANDLERS);