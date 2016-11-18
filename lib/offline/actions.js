import Types from './constants';
import { ts } from './helpers';

export const enqueue = (saga, args) => ({
  type: Types.ENQUEUE,
  ts: ts(),
  saga,
  args
})

export const dequeue = (saga) => ({
  type: Types.DEQUEUE,
  ...saga,
})

export const start = () => ({
  type: Types.START,
})

export const stop = () => ({
  type: Types.STOP,
})

export const nextAttempt = (currentAttempt) => ({
  type: Types.NEXT_ATTEMPT,
  currentAttempt
})

export const currentRunning = (currentRunning) => ({
  type: Types.CURRENT_RUNNING,
  currentRunning
})

export const clear = () => ({
  type: Types.CLEAR,
})

export default {
  enqueue,
  dequeue,
  start,
  stop,
  nextAttempt,
  currentRunning,
  clear
}
