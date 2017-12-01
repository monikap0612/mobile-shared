import isEmpty from 'lodash/isEmpty';

const loggerMiddleware = logger => store => next => action => {
  const { type, ...params } = action

  logger.group()

  const start = Date.now();
  const result = next({type, ...params})
  const end = Date.now();

  logger.info({reduxAction: type})
  if (!isEmpty(params)) {
    logger.info(params)
  }
  logger.info({reduxActionTime: (end - start).toFixed(2)})

  logger.groupEnd()


  return result
}

export default loggerMiddleware
