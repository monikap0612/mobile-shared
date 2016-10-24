import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import GlitchesTypes from '../constants/glitches';

export const INITIAL_STATE = Immutable({
  activeGlitch: null,
  hotelGlitches: [],
});

const ACTION_HANDLERS = {
  [GlitchesTypes.GLITCHES_RESET]: (state) => {
    return INITIAL_STATE;
  },
  [GlitchesTypes.GLITCHES_SUCCESS]: (state, { glitches }) => {
    return state.set('hotelGlitches', glitches);
  },
  [GlitchesTypes.GLITCH_ACTIVATE]: (state, { glitchId }) => {
    return state.set('activeGlitch', glitchId);
  },
  [GlitchesTypes.GLITCH_DEACTIVATE]: (state) => {
    return state.set('activeGlitch', null);
  },
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
