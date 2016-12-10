import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Types from './constants';

const initial = {
  isOnline: false
};
const INITIAL_STATE = Immutable(initial);

const ACTION_HANDLERS = {
  [Types.NETWORK_STATUS]: (state, { isOnline }) => {
    return state.set('isOnline', isOnline);
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
