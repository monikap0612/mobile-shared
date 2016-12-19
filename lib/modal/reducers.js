import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import ModalTypes from './constants';

export const INITIAL_STATE = Immutable({
  modalContent: null,
  params: {}
});

const open = (state, { modalContent, params }) => state.set('modalContent', modalContent).set('params', params)
const close = (state) => state.set('modalContent', null).set('params', {})
const toggle = (state, props) => {
  const current = state.modalContent;
  if (!current) {
    return open(state, props);
  }

  return close(state);
}

const ACTION_HANDLERS = {
  [ModalTypes.OPEN_MODAL]: open,
  [ModalTypes.CLOSE_MODAL]: close,
  [ModalTypes.TOGGLE_MODAL]: toggle,
}

export const modalReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);

export default modalReducer
