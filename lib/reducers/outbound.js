import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import moment from 'moment';
import { find, findIndex } from 'lodash/collection';
import { get, omit } from 'lodash/object';
import { isArray, isObject } from 'lodash/lang';

import OutboundTypes from '../constants/outbound';

const getInitialState = () => ({
  
})

const ACTION_HANDLERS = {
  [OutboundTypes.OUTBOUND_RESET]: (state) => {
    return getInitialState();
  },
  [OutboundTypes.OUTBOUND_TASK_CREATE]: (state) => {
    console.log('create task');
    return { ...state }
  },
  [OutboundTypes.OUTBOUND_TASK_CREATE_SUCCESS]: (state) => {
    console.log('create task success');
    return { ...state }
  },
}

export default createReducer(getInitialState(), ACTION_HANDLERS);
