import isEmpty from 'lodash/isEmpty';
import present from 'present';

const loggerMiddleware = logger => (config = {}) => store => next => action => {
  const { type, ...params } = action
  const whitelist = config.whitelist || []

  const start = present();
  const result = next({type, ...params})
  const end = present();

  logger.group((log) => {
    log('info', {reduxAction: type})
    if (!isEmpty(params) && whitelist.includes(type)) {
      log('info', params)
    }
    log('info', {reduxActionTime: (end - start).toFixed(2)})
  })

  return result
}

export default loggerMiddleware
