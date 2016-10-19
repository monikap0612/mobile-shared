import { takeLatest, takeEvery } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

import GlitchesTypes from '../constants/glitches'
import GlitchesActions from '../actions/glitches'

import request from '../utils/request'

export default function({ apiUrl }) {
  const GLITCHES_API = `${apiUrl}/glitches`

  // Hotel Glitches
  function * fetchGlitches() {
    const { auth: { token } } = yield select()

    return yield call(request, GLITCHES_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  function * fetchGlitchesFlow() {
    try {
      const data = yield call(fetchGlitches)
      yield put(GlitchesActions.glitchesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchGlitchesFlow() {
    yield * takeLatest(GlitchesTypes.GLITCHES_FETCH, fetchGlitchesFlow)
  }

  // New Glitch
  function * submitNewGlitch(data) {
    const { auth: { token, userId, user } } = yield select()
    const {
      glitchRoomId: room_id,
      glitchRoomName: room_name,
      glitchGuestName: name,
      glitchGuestEmail: email,
      glitchCategory: category,
      glitchDescription: description,
      glitchAction: action,
      glitchFollowup: followup,
      glitchCost: cost
    } = data

    return yield call(request, GLITCHES_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id, room_name, guest_info: { name, email }, category,
        description, action, followup, cost, creator_id: userId,
        responsible_id: userId, responsible_first_name: user.first_name,
        responsible_last_name: user.last_name
      })
    })
  }

  function * submitNewGlitchFlow({ newGlitch }) {
    try {
      yield call(submitNewGlitch, newGlitch)
      const data = yield call(fetchGlitches)
      yield put(GlitchesActions.glitchesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchNewGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_NEW, submitNewGlitchFlow)
  }

  // Update Glitch
  function * submitUpdateGlitch(data) {
    const { auth: { token, userId } } = yield select()
    const {
      uuid,
      glitchCategory: category,
      glitchDescription: description,
      glitchAction: action,
      glitchFollowup: followup,
      glitchCost: cost
    } = data

    return yield call(request, `${GLITCHES_API}/${uuid}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category,
        description,
        action,
        followup,
        cost,
        user_id: userId
      })
    })
  }

  function * submitUpdateGlitchFlow({ updatedGlitch }) {
    try {
      yield call(submitUpdateGlitch, updatedGlitch)
      const data = yield call(fetchGlitches)
      yield put(GlitchesActions.glitchesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchUpdateGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_UPDATE, submitUpdateGlitchFlow)
  }

  // Handover Glitch
  function * submitHandoverGlitch(data) {
    const { auth: { token, userId } } = yield select()
    const {
      uuid,
      handover_id
    } = data

    console.log(uuid, handover_id)

    return yield call(request, `${GLITCHES_API}/${uuid}/handover`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        handover_id,
        user_id: userId
      })
    })
  }

  function * submitHandoverGlitchFlow({ handoverGlitch }) {
    try {
      yield call(submitHandoverGlitch, handoverGlitch)
      const data = yield call(fetchGlitches)
      yield put(GlitchesActions.glitchesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchHandoverGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_HANDOVER, submitHandoverGlitchFlow)
  }

  // Email Glitch
  function * submitEmailGlitch(data) {
    const { auth: { token, userId } } = yield select()
    const {
      uuid,
      address,
      subject,
      message
    } = data

    console.log(address, subject, message)

    return yield call(request, `${GLITCHES_API}/${uuid}/email`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address,
        subject,
        message,
        user_id: userId
      })
    })
  }

  function * submitEmailGlitchFlow({ emailGlitch }) {
    try {
      yield call(submitEmailGlitch, emailGlitch)
      const data = yield call(fetchGlitches)
      yield put(GlitchesActions.glitchesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchEmailGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_EMAIL, submitEmailGlitchFlow)
  }

  // Close Glitch
  function * submitCloseGlitch(data) {
    const { auth: { token, userId } } = yield select()
    const {
      uuid,
      glitchCategory: category,
      glitchDescription: description,
      glitchAction: action,
      glitchFollowup: followup,
      glitchCost: cost
    } = data

    return yield call(request, `${GLITCHES_API}/${uuid}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category,
        description,
        action,
        followup,
        cost,
        is_completed: true,
        user_id: userId
      })
    })
  }

  function * submitCloseGlitchFlow({ closedGlitch }) {
    try {
      yield call(submitCloseGlitch, closedGlitch)
      const data = yield call(fetchGlitches)
      yield put(GlitchesActions.glitchesSuccess(data))
    } catch (e) {
      console.log(e)
    }
  }

  function * watchCloseGlitchFlow() {
    yield * takeEvery(GlitchesTypes.GLITCH_CLOSE, submitCloseGlitchFlow)
  }

  return {
    watchCloseGlitchFlow,
    watchEmailGlitchFlow,
    watchHandoverGlitchFlow,
    watchUpdateGlitchFlow,
    watchNewGlitchFlow,
    watchGlitchesFlow
  }
}
