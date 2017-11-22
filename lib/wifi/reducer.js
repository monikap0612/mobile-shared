import { createReducer } from 'reduxsauce';

import Types from './types';

const getInitialState = () => ({
  on: true
})

const ACTION_HANDLERS = {
  [Types.POWER]: (state) => {
    return state
  },
  [Types.POWER_FAILURE]: (state) => {
    return state
  },
  [Types.NOT_SUPPORTED]: (state) => {
    return state
  },
  [Types.POWER_SUCCESS]: (state, { payload }) => {
    return {
      on: payload.on
    }
  },
}

export default createReducer(getInitialState(), ACTION_HANDLERS);
