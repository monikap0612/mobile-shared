import isEmpty from 'lodash/isEmpty';

const loggerMiddleware = logger => (config = {}) => store => next => action => {
  const { type, ...params } = action
  const whitelist = config.whitelist || []

  logger.group()

  const start = Date.now();
  const result = next({type, ...params})
  const end = Date.now();

  logger.info({reduxAction: type})
  if (!isEmpty(params) && whitelist.includes(type)) {
    logger.info(params)
  }
  logger.info({reduxActionTime: (end - start).toFixed(2)})

  logger.groupEnd()


  return result
}

export default loggerMiddleware
