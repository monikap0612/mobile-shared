export * from './helpers'

import DrawerCreator from './drawer';
import ScenesCreator from './scenes';

export const Navigation = {
  create: (scenes, links, options = {}) => {
    console.log(scenes)
    const drawer = DrawerCreator(links, options.drawer)
    return ScenesCreator(drawer, scenes, options)
  }
}

export default Navigation
