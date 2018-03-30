import { get } from 'lodash';

export const updateOptions = [
  { value: 'open', translation: 'base.lost-found-review.index.open' },

  { value: 'emailed', translation: 'base.lost-found-review.index.emailed' },
  { value: 'phoned', translation: 'base.lost-found-review.index.phoned' },
  { value: 'pending', translation: 'base.lost-found-review.index.pending' },
  { value: 'waiting', translation: 'base.lost-found-review.index.waiting' },

  { value: 'mailed', translation: 'base.lost-found-review.index.mailed' },
  { value: 'hand-delivered', translation: 'base.lost-found-review.index.hand-delivered' },

  { value: 'expired', translation: 'base.lost-found-review.index.expired' },
  { value: 'refused', translation: 'base.lost-found-review.index.refused' },
  { value: 'delete', translation: 'base.lost-found-review.index.delete' },
]

const updateOptionsMap = updateOptions.reduce((pv, i) => {
  pv[i.value] = i.translation;
  return pv;
}, {});

export const updateOptionsLookup = (value) => get(updateOptionsMap, value, "");