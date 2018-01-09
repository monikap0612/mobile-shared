import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';

const taskLocationsForm = getFormValues('taskLocations')

export const selectedLocation = createSelector(
  [taskLocationsForm],
  (form) => {
    if (!form) {
      return null
    }
    return form.locations[0]
  }
)
