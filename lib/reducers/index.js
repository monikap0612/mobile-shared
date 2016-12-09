import rehydration from './rehydration';
import auth from './auth';
import overlay from './overlay';
import routes from './routes';
import rooms from './rooms';
import assets from './assets';
import users from './users';
import updates from './updates';
import glitches from './glitches';
import filters from './filters';
import backend from './backend';

import { modalReducer } from '../modal';
import { reducer as networkReducer } from '../network';

export default {
  rehydration,
  auth,
  overlay,
  routes,
  rooms,
  assets,
  users,
  updates,
  glitches,
  backend,
  filters,
  modal: modalReducer,
  network: networkReducer
};
