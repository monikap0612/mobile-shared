import { createSelector } from 'reselect'
import { keyBy } from 'lodash/collection'

const usersSelector = state => state.users.users

const getIndexedUsers = (hotelUsers) => {
  if (!hotelUsers || !hotelUsers.length) {
    return {}
  }

  return keyBy(hotelUsers, '_id')
}

export const computedIndexedUsers = createSelector(
  [ usersSelector ],
  getIndexedUsers
)
