import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

import { REHYDRATE } from 'redux-persist/constants'

export const INITIAL_STATE = Immutable({
  isRehydrated: false
})

const ACTION_HANDLERS = {
  [REHYDRATE]: (state) => {
    return state.set('isRehydrated', true)
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
