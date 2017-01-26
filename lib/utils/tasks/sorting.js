import { sort } from 'rc-mobile-base/lib/utils/immutable';
import { PRIORITY, NORMAL, UNASSIGNED } from './categories';

export const categoryPredicate = (a, b) => {
  const aSection = a.category;
  const bSection = b.category;

  if (aSection === PRIORITY && bSection === PRIORITY) {
    return 0
  }
  if (aSection === PRIORITY && bSection === NORMAL) {
    return -1
  }
  if (aSection === PRIORITY && bSection === UNASSIGNED) {
    return -1
  }
  if (aSection === NORMAL && bSection === NORMAL) {
    return 0
  }
  if (aSection === NORMAL && bSection === PRIORITY) {
    return 1
  }
  if (aSection === NORMAL && bSection === UNASSIGNED) {
    return -1
  }
  if (aSection === UNASSIGNED && bSection === UNASSIGNED) {
    return 0
  }
  if (aSection === UNASSIGNED && bSection === PRIORITY) {
    return 1
  }
  if (aSection === UNASSIGNED && bSection === NORMAL) {
    return 1
  }
}

export const datePredicate = (a, b) => {
  const aDate = a.due_date ? new Date(a.due_date) : null;
  const bDate = b.due_date ? new Date(b.due_date) : null;

  if (!aDate && bDate) {
    return 1
  }
  if (aDate && !bDate) {
    return -1
  }
  if (!aDate && !bDate) {
    return 0
  }

  return bDate - aDate;
}

export const byCategory = sort(categoryPredicate)
export const byDate = sort(datePredicate)

export default {
  categoryPredicate,
  datePredicate,
  byCategory,
  byDate
}
