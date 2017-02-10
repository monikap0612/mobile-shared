import { AsyncStorage } from 'react-native';
import immutableTransform from './utils/immutable-transform';
import { offlineTransform } from './offline/utils';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: AsyncStorage,
    transforms: [offlineTransform],
    blacklist: ['overlay', 'backend', 'form', 'filters', 'layouts', 'modal', 'appGlobal', 'network', 'roomUpdates', 'planningUpdates', 'tasksLayout']
  }
};

export default REDUX_PERSIST;
