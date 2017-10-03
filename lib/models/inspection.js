import { put, call } from 'redux-saga/effects';
import { Resource } from 'rc-react-shared/utils';
import { authRequest } from 'rc-mobile-base/lib/utils/request';
import omit from 'lodash/omit';

import apiUrl from '../api';

const API_URL = `${apiUrl}/inspections`

const normalizeOne = (inspection) => {
  let result = inspection
  const kind = inspection.question_kind

  result = {
    ...result,
    submitTasks: result.submit_tasks ? JSON.parse(result.submit_tasks) : {}
  }

  if (kind === 'trueFalse') {
    return {
      ...result,
      answer: Boolean(Number(inspection.answer))
    }
  }
  if (kind === 'range') {
    return {
      ...result,
      answer: Number(inspection.answer)
    }
  }
  if (kind === 'multiTrueFalse') {
    return {
      ...result,
      answer: JSON.parse(inspection.answer)
    }
  }
  return result
}

const serializeOne = (inspection, options = {}) => {
  let result = inspection
  const kind = inspection.question_kind

  result = {
    ...result,
    submit_tasks: JSON.stringify(result.submitTasks),
  }

  if (kind === 'multiTrueFalse') {
    result = {
      ...inspection,
      answer: JSON.stringify(inspection.answer)
    }
  }
  if (options.skipId) {
    return omit(result, 'id', 'submitTasks')
  }
  return omit(result, 'submitTasks')
}

class Inspection extends Resource {
  name = 'inspection'

  onLoad = function * () {
    try {
      const response = yield call(authRequest, API_URL);
      return yield put(this.actions.load.success(this.normalize(response.inspections)));
    } catch (error) {
      return yield put(this.actions.load.failure(error));
    }
  }.bind(this)

  onInsertAll = function * ({ payload }) {
    try {
      const data = payload

      const response = yield call(authRequest, `${API_URL}/bulk_create`, {
        method: 'POST',
        body: JSON.stringify({
          inspections: data.map(inspection => serializeOne(inspection, { skipId: true }))
        })
      });
      const result = yield put(this.actions.insertAll.success(this.normalize(response.inspections)));
      return result
    } catch (error) {
      return yield put(this.actions.insertAll.failure(error));
    }
  }.bind(this)

  onUpdateAll = function * ({ payload }) {
    try {
      const data = payload

      const response = yield call(authRequest, `${API_URL}/bulk_update`, {
        method: 'PUT',
        body: JSON.stringify({
          inspections: data.map(serializeOne)
        })
      });
      const result = yield put(this.actions.updateAll.success(this.normalize(response.inspections)));
      return result
    } catch (error) {
      return yield put(this.actions.updateAll.failure(error));
    }
  }.bind(this)

  onUpdate = function * ({ payload }) {
    try {
      const data = payload

      const response = yield call(authRequest, `${API_URL}/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          inspection: serializeOne(data)
        })
      });
      const result = yield put(this.actions.update.success(response.inspection));
      return result
    } catch (error) {
      return yield put(this.actions.update.failure(error));
    }
  }.bind(this)

  onInsert = function * ({ payload }) {
    try {
      const data = payload

      const response = yield call(authRequest, `${API_URL}`, {
        method: 'POST',
        body: JSON.stringify({
          inspection: serializeOne(data, { skipId: true })
        })
      });
      const result = yield put(this.actions.insert.success(response.inspection));
      return result
    } catch (error) {
      return yield put(this.actions.insert.failure(error));
    }
  }.bind(this)
}

const inspection = new Inspection({name: 'inspection'});

inspection.normalizeOne = normalizeOne
inspection.serializeOne = serializeOne

export default inspection;
