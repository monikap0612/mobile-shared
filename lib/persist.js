import { AsyncStorage, Platform } from 'react-native';
import FilesystemStorage from 'redux-persist-filesystem-storage'
import immutableTransform from './utils/immutable-transform';
import { offlineTransform } from './offline/utils';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '5',
  storeConfig: {
    storage: Platform.OS === 'ios' ? AsyncStorage : FilesystemStorage,
    debounce: 3000,
    transforms: [immutableTransform, offlineTransform],
    // transforms: [offlineTransform],
    blacklist: ['overlay', 'form', 'filters', 'layouts', 'modal', 'appGlobal', 'network', 'roomUpdates', 'planningUpdates', 'tasksLayout', 'differences']
  }
};

export default REDUX_PERSIST;
