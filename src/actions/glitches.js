import GlitchesTypes from '../constants/glitches';

export function glitchesReset() {
  return {
    type: GlitchesTypes.GLITCHES_RESET
  }
}

export function glitchesFetch() {
  return {
    type: GlitchesTypes.GLITCHES_FETCH
  }
}

export function glitchesSuccess({ glitches }) {
  return {
    type: GlitchesTypes.GLITCHES_SUCCESS,
    glitches
  }
}

export function glitchActivate(glitchId) {
  return {
    type: GlitchesTypes.GLITCH_ACTIVATE,
    glitchId
  }
}

export function glitchDeactivate() {
  return {
    type: GlitchesTypes.GLITCH_DEACTIVATE
  }
}

export function glitchSubmit(newGlitch) {
  return {
    type: GlitchesTypes.GLITCH_NEW,
    newGlitch
  }
}

export function glitchUpdate(updatedGlitch) {
  return {
    type: GlitchesTypes.GLITCH_UPDATE,
    updatedGlitch
  }
}

export function glitchHandover(handoverGlitch) {
  return {
    type: GlitchesTypes.GLITCH_HANDOVER,
    handoverGlitch
  }
}

export function glitchEmail(emailGlitch) {
  return {
    type: GlitchesTypes.GLITCH_EMAIL,
    emailGlitch
  }
}

export function glitchTask(taskUUID) {
  console.log(taskUUID);
  return {
    type: GlitchesTypes.GLITCH_TASK,
    taskUUID
  }
}

export function glitchClose(closedGlitch) {
  return {
    type: GlitchesTypes.GLITCH_CLOSE,
    closedGlitch
  }
}

export default {
  glitchesReset,
  glitchesFetch,
  glitchesSuccess,
  glitchActivate,
  glitchDeactivate,
  glitchSubmit,
  glitchUpdate,
  glitchHandover,
  glitchEmail,
  glitchTask,
  glitchClose
}
