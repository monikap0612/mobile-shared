import { AsyncStorage } from 'react-native';
import immutableTransform from './utils/immutable-transform';
import { offlineTransform } from './offline/utils';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: AsyncStorage,
    transforms: [immutableTransform, offlineTransform],
    blacklist: ['overlay', 'backend', 'form', 'filters', 'layouts', 'modal']
  }
};

export default REDUX_PERSIST;
