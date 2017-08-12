import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Types from './constants';

// const initial = {
//   isOnline: false
// };
// const INITIAL_STATE = Immutable(initial);

const getInitialState = () => ({
  isOnline: false
})

const ACTION_HANDLERS = {
  [Types.NETWORK_STATUS]: (state, { isOnline }) => {
    // return state.set('isOnline', isOnline);
    return {
      isOnline
    }
  }
}

export default createReducer(getInitialState(), ACTION_HANDLERS);
