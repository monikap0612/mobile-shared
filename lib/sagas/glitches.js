import { takeLatest, delay, take, takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import GlitchesTypes from '../constants/glitches';
import GlitchesActions from '../actions/glitches';

import request from '../utils/request'

export default function({ apiUrl }) {

  const GLITCHES_API = `${apiUrl}/glitches`;

  // Hotel Glitches
  function * fetchGlitches() {
    const { auth: { hotelId, token } } = yield select();

    return yield call(request, GLITCHES_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function * fetchGlitchesFlow() {
    try {
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchGlitchesFlow(state) {
    yield * takeLatest(GlitchesTypes.GLITCHES_FETCH, fetchGlitchesFlow);
  }

  // New Glitch
  function * submitNewGlitch(data) {
    const { auth: { hotelId, token, userId, user } } = yield select();
    data.creator_id = userId;

    return yield call(request, GLITCHES_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  function * submitNewGlitchFlow({ newGlitch }) {
    try {
      const response = yield call(submitNewGlitch, newGlitch);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchNewGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_NEW, submitNewGlitchFlow);
  }

  // Acknowledge Glitch
  function * acknowledgeGlitch(uuid) {
    const { auth: { hotelId, token, userId, user } } = yield select();

    return yield call(request, `${GLITCHES_API}/${uuid}/acknowledge`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId
      })
    });
  }

  function * acknowledgeGlitchFlow({ glitchId }) {
    const { auth: { hotelId, token, userId, user } } = yield select();
    console.log('acknowledgeGlitchFlow', glitchId)

    try {
      // yield put(GlitchesActions.glitchAcknowledgeOptimistic(glitchId, userId));
      const response = yield call(acknowledgeGlitch, glitchId);
      console.log(response)
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchAcknowledgeGlitchFlow() {
    yield * takeLatest(GlitchesTypes.GLITCH_ACKNOWLEDGE, acknowledgeGlitchFlow);
  }

  // Recategorize Glitch
  function * recategorizeGlitch(uuid, category, assignment) {
    const { auth: { hotelId, token, userId, user } } = yield select();

    return yield call(request, `${GLITCHES_API}/${uuid}/recategorize`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        category,
        assignment
      })
    });
  }

  function * recategorizeGlitchFlow({ glitchId, category, assignment}) {
    console.log(glitchId, category, assignment);
    try {
      const response = yield call(recategorizeGlitch, glitchId, category, assignment);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchRecategorizeGlitchFlow() {
    yield * takeLatest(GlitchesTypes.GLITCH_RECATEGORIZE, recategorizeGlitchFlow);
  }

  // Start Glitch
  function * startGlitch(uuid) {
    const { auth: { hotelId, token, userId, user } } = yield select();

    return yield call(request, `${GLITCHES_API}/${uuid}/start`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      })
    });
  }

  function * startGlitchFlow({ glitchId }) {

    try {
      const response = yield call(startGlitch, glitchId);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchStartGlitchFlow() {
    yield * takeLatest(GlitchesTypes.GLITCH_START, startGlitchFlow);
  }

  // Update Glitch
  function * submitUpdateGlitch(uuid, data) {
    const { auth: { hotelId, token, userId, user } } = yield select();
    data.user_id = userId
    console.log(data, uuid);

    return yield call(request, `${GLITCHES_API}/${uuid}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  function * submitUpdateGlitchFlow({ glitchId, updatedGlitch }) {
    try {
      yield call(submitUpdateGlitch, glitchId, updatedGlitch);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchUpdateGlitchFlow() {
    yield * takeLatest(GlitchesTypes.GLITCH_UPDATE, submitUpdateGlitchFlow);
  }

  // Handover Glitch
  function * submitHandoverGlitch(uuid, assignment) {
    const { auth: { hotelId, token, userId, user } } = yield select();

    return yield call(request, `${GLITCHES_API}/${uuid}/handover`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        handover_id: assignment
      })
    });
  }

  function * submitHandoverGlitchFlow({ uuid, assignment }) {
    try {
      yield call(submitHandoverGlitch, uuid, assignment);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchHandoverGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_HANDOVER, submitHandoverGlitchFlow);
  }

  // Email Glitch
  function * submitEmailGlitch(data) {
    const { auth: { hotelId, token, userId, user } } = yield select();
    const {
      uuid,
      address,
      subject,
      message
    } = data;

    console.log(address, subject, message);

    return yield call(request, `${GLITCHES_API}/${uuid}/email`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        subject,
        message,
        user_id: userId
      })
    });
  }

  function * submitEmailGlitchFlow({ emailGlitch }) {
    try {
      yield call(submitEmailGlitch, emailGlitch);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchEmailGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_EMAIL, submitEmailGlitchFlow);
  }

  // Close Glitch
  function * submitCloseGlitch(uuid, data) {
    const { auth: { hotelId, token, userId, user } } = yield select();
    data.user_id = userId
    data.is_completed = true;
    console.log(data);

    return yield call(request, `${GLITCHES_API}/${uuid}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  function * submitCloseGlitchFlow({ glitchId, closedGlitch }) {
    try {
      yield call(submitCloseGlitch, glitchId, closedGlitch);
      const data = yield call(fetchGlitches);
      yield put(GlitchesActions.glitchesSuccess(data));
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  function * watchCloseGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_CLOSE, submitCloseGlitchFlow);
  }

  return {
    watchGlitchesFlow,
    watchNewGlitchFlow,
    watchAcknowledgeGlitchFlow,
    watchRecategorizeGlitchFlow,
    watchStartGlitchFlow,
    watchUpdateGlitchFlow,
    watchHandoverGlitchFlow,
    watchEmailGlitchFlow,
    watchCloseGlitchFlow
  }
}
