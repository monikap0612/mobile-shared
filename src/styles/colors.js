/* COLORS */
import { range } from 'lodash/util';
import { flatMap } from 'lodash/collection';

const _opacityStep = 10;
const steps = range(1, 11).map(i => i / _opacityStep)

const buildColor = (color) => ({
  color,
  text: {
    color
  },
  bg: {
    backgroundColor: color
  }
})

const _opacity = (color, opacity) => `rgba(${color}, ${opacity})`
const buildOpacity = (color) =>
  flatMap(steps, step => ({ [`p${step * 100}`]: buildColor(_opacity(color, step)) }))
  .reduce((acc, n) => ({ ...acc, ...n }), {})

export const opacityWhite = buildOpacity('255, 255, 255')
export const opacityBlack = buildOpacity('0, 0, 0')

export const transparent = buildColor('transparent')

export const white = buildColor('#FFF')
export const black = buildColor('#000')

export const blue100 = buildColor('#BEE5FD')
export const blue200 = buildColor('#83CEFB')
export const blue300 = buildColor('#5EB9F5')
export const blue500 = buildColor('#35A6F2')

export const blue = buildColor('#198CFF');
export const lightblue = buildColor('#52C0F9');
export const darkblue = buildColor('#416486');

export const red = buildColor('#C93C46');

export const green = buildColor('#3CC86B');

export const lightgray = buildColor('#E6E6E6');
export const darkgray = buildColor('#9A9A9A');
