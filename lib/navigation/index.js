export * from './helpers'

import DrawerCreator from './drawer';
import ScenesCreator from './scenes';

export const Navigation = {
  create: (scenes, links, options = {}) => {
    const drawer = DrawerCreator(links)
    return ScenesCreator(drawer, scenes, options)
  }
}

export default Navigation
