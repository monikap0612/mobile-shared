import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { findIndex } from 'lodash/array';
import { get } from 'lodash/object';

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
  [GlitchesTypes.GLITCH_ACKNOWLEDGE_OPTIMISTIC]: (state, { glitchId, userId }) => {
    const glitchIndex = findIndex(state.hotelGlitches, { uuid: glitchId });
    const glitch = state.hotelGlitches[glitchIndex];

    return state.setIn(['hotelGlitches', glitchIndex, 'assignment'], {
      id: get(glitch, 'assignment.id'),
      user_ids: get(glitch, 'assignment.user_ids', []),
      acknowledged: [userId,]
    });
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
