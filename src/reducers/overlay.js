import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import OverlayTypes from '../constants/overlay';

export const INITIAL_STATE = Immutable({
  isVisible: false,
  icon: 'Wave',
  message: '',
  color: '#FFFFFF'
});

const ACTION_HANDLERS = {
  [OverlayTypes.SHOW_OVERLAY]: (state, { icon, message, color }) => {
    return state
      .set('isVisible', true)
      .set('icon', icon)
      .set('message', message)
      .set('color', color);
  },
  [OverlayTypes.HIDE_OVERLAY]: (state) => {
    return INITIAL_STATE;
  }
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
