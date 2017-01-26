import { get } from 'lodash/object';
import { isEmpty } from 'lodash/lang';
import { some, includes } from 'lodash/collection';
import moment from 'moment';

export function isHidden(task, userId) {
  if (get(task, 'is_hidden', false)) {
    return true;
  }

  const rejectedIds = get(task, 'assigned.rejected_ids', []);
  return some(rejectedIds, userId);
};

export function isTaken(task, userId) {
  if (get(task, 'responsible_id', '') && get(task, 'responsible_id', '').length && get(task, 'responsible_id', '') !== userId) {
    return true;
  }

  if (get(task, 'assigned.user_ids.length') && !includes(get(task, 'assigned.user_ids'), userId)) {
    return true;
  }
}

export function isAssigned(task, userId) {
  if (get(task, 'responsible_id', '') === userId) {
    return true;
  }

  const userIds = get(task, 'assigned.user_ids', []);
  const users = get(task, 'assigned.users', []);

  if (get(task, 'assigned.user_ids') && includes(userIds, userId)) {
    return true;
  }
  if (get(task, 'assigned.users') && includes(users, userId)) {
    return true;
  }

  return false;
};

export function isUnassigned(task, userId) {
	const assignedUsers = get(task, 'assigned.users', []);
	const assignedUserIds = get(task, 'assigned.user_ids', []);

  if (assignedUsers && isEmpty(assignedUsers)) {
		return true;
	}
	if (assignedUserIds && isEmpty(assignedUserIds)) {
		return true;
	}

	return false;
};

export function isMaintenance(task, userId) {
  return get(task, 'meta.isMaintenance', false);
};

export function isSent(task, userId) {
  return get(task, 'creator_id') === userId;
};

export function isClosed(task) {
  return get(task, 'is_completed');
};

export function isRemoved(task) {
  return get(task, 'is_cancelled') || (get(task, 'is_completed') && moment(get(task, 'due_date')).isBefore(moment(), 'day'));
};

export function isPriority(task, userId) {
  return (get(task, 'is_priority') && isAssigned(task, userId));
};

export function isRefused(task, userId) {
	const userIds = get(task, 'assigned.rejected_ids', []);
  if (includes(userIds, userId)) {
    return true;
  }
}

export const _checkTask = (task, userId) => {
  if (isRemoved(task) || isHidden(task, userId) || isClosed(task) || isTaken(task, userId) || isRefused(task, userId)) {
    return false
  }
  return true;
}

export const checkPriority = (task, userId) => {
  if (_checkTask(task, userId) && isPriority(task, userId)) {
    return true
  }
  return false
}

export const checkNormal = (task, userId) => {
  if (_checkTask(task, userId) && !isPriority(task, userId) && isAssigned(task, userId)) {
    return true
  }
  return false
}

export const checkUnassigned = (task, userId) => {
  if (_checkTask(task, userId) && !isPriority(task, userId) && !isAssigned(task, userId) && isUnassigned(task, userId)) {
    return true
  }
  return false
}

const filterBy = (predicate) => (tasks, userId) => tasks.filter(task => predicate(task, userId))

export const closed = filterBy(isClosed)
export const sent = filterBy(isSent)
export const maintenance = filterBy(isMaintenance)

export default {
  // predicates
  checkUnassigned,
  checkNormal,
  checkPriority,
  isMaintenance,
  isUnassigned,
  isAssigned,
  isPriority,
  isRefused,
  isTaken,
  isClosed,
  isHidden,
  isRemoved,
  // functions
  closed,
  sent,
  maintenance
}
