import Types from './constants';

const status = (isOnline) => () => ({
  type: Types.NETWORK_STATUS,
  isOnline
})

export const statusOnline = status(true)
export const statusOffline = status(false)

export default {
  statusOnline,
  statusOffline
}
