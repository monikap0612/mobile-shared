import { put, call } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { Resource } from 'rc-react-shared/utils';
import { authRequest } from 'rc-mobile-base/lib/utils/request';

import { computedAssetsIndex } from '../selectors/assets';

import apiUrl from '../api';

const API_URL = `${apiUrl}/inspection_sources`

class InspectionSource extends Resource {
  id = '_id'
  name = 'inspection_source'

  onLoad = function * () {
    try {
      const response = yield call(authRequest, API_URL);
      return yield put(this.actions.load.success(this.normalize(response.inspection_sources)));
    } catch (error) {
      return yield put(this.actions.load.failure(error));
    }
  }.bind(this)

  all = () => {
    const all = this.selectors.all()
    return createSelector(
      [all, computedAssetsIndex],
      (inspections, assets) => {
        return inspections.map(i => ({
          ...i,
          hotAnswers: i.hot_answers.map(a => {
            const asset = assets[a.assetId]
            return {
              ...a,
              asset,
              action: asset && asset.customActions && asset.customActions.find(action => action.id === a.actionId),
            }
          })
        }))
      }
    )
  }
}

export default new InspectionSource({ name: 'inspection_source', id: '_id' })
