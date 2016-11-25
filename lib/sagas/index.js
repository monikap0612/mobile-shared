import auth from './auth'
import routes from './routes'
import rooms from './rooms'
import assets from './assets'
import users from './users'
import glitches from './glitches'
import updates from './updates'
import backend from './backend'

const sagas = {
  assets,
  auth,
  glitches,
  rooms,
  routes,
  updates,
  users,
  backend
}

export default sagas
