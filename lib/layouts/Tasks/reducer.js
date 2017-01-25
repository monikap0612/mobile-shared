import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Types from './constants';

export const INITIAL_STATE = Immutable({
  tab: 0,
});

const ACTION_HANDLERS = {
  [Types.SET_ACTIVE_TAB]: (state, { tab }) => {
    return state.set('tab', tab);
  },
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
