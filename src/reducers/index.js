import { combineReducers } from 'redux';

import rehydration from './rehydration';
import auth from './auth';
import overlay from './overlay';
import routes from './routes';
import rooms from './rooms';
import assets from './assets';
import users from './users';
import updates from './updates';
import glitches from './glitches';
// import backend from './backend';

export default combineReducers({
  rehydration,
  auth,
  overlay,
  routes,
  rooms,
  assets,
  users,
  updates,
  glitches,
  // backend
});
