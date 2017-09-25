import { put, call } from 'redux-saga/effects';
import { Resource } from 'rc-react-shared/utils';
import { authRequest } from 'rc-mobile-base/lib/utils/request';

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
}

export default new InspectionSource()
