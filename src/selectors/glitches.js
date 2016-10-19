import { createSelector } from 'reselect'

const glitchesSelector = state => state.glitches.hotelGlitches
const activeGlitchSelector = state => state.glitches.activeGlitch

const getActiveGlitch = (hotelGlitches, activeGlitch) => {
  if (!hotelGlitches || !hotelGlitches.length) {
    return null
  }

  return find(hotelGlitches, { uuid: activeGlitch })
}

export const computedActiveGlitch = createSelector(
  [ glitchesSelector, activeGlitchSelector ],
  getActiveGlitch
)
