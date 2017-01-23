import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import RoomsTypes from '../constants/rooms';

export const INITIAL_STATE = Immutable({
});

const ACTION_HANDLERS = {
  [RoomsTypes.PLANNINGS_UPDATES]: (state, { updates }) => {
    if (!updates) {
      return state;
    }
    return state.merge(updates);
  },
  [RoomsTypes.PLANNINGS_UPDATE_READ]: (state, { updateId }) => {
    return state.without(updateId);
  },
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
