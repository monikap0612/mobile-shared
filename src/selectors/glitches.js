import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { keyBy, map, find, filter } from 'lodash/collection';
import { uniq } from 'lodash/array';
import { get, extend } from 'lodash/object';
import { map as fpMap, uniq as fpUniq, fpUniqWith, compose, flow } from 'lodash/fp';

const glitchesSelector = state => state.glitches.hotelGlitches;
const activeGlitchSelector = state => state.glitches.activeGlitch;

const getActiveGlitch = (hotelGlitches, activeGlitch) => {
  if (!hotelGlitches || !hotelGlitches.length) {
    return null;
  }

  return find(hotelGlitches, { uuid: activeGlitch });
}

export const computedActiveGlitch = createSelector(
  [glitchesSelector, activeGlitchSelector],
  getActiveGlitch
);
