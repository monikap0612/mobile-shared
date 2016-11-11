import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { ActionConst } from 'react-native-router-flux';

import RoutesTypes from '../constants/routes';

export const INITIAL_STATE = Immutable({
  scene: null
});

const ACTION_HANDLERS = {
  [ActionConst.FOCUS]: (state, { scene }) => {
    console.log(scene);
    return state.set('scene', scene);
  }
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
