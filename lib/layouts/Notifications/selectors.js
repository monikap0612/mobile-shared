import { createSelector } from 'reselect';

import { tasksSelector } from '../../selectors/rooms';

import { tasks } from './dummy';

export const notifications = createSelector(
  [tasksSelector],
  () => tasks
)
