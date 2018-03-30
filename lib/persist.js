import { AsyncStorage, Platform } from 'react-native';
import FilesystemStorage from 'redux-persist-filesystem-storage'
import { offlineTransform } from './offline/utils';

import { createTransform as createSchemasTransform } from './utils/redux-tools';

const schemasTransform = createSchemasTransform(['audit', 'audit_source', 'inspection', 'inspection_source'])

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '6',
  storeConfig: {
    storage: Platform.OS === 'ios' ? AsyncStorage : FilesystemStorage,
    debounce: Platform.OS === 'ios' ? 1000 : 5000,
    transforms: [offlineTransform, schemasTransform],
    blacklist: [
      'overlay',
      'form',
      'filters',
      'layouts',
      'modal',
      'appGlobal',
      'network',
      'roomUpdates',
      'planningUpdates',
      'tasksLayout',
      'differences',
      'outbound',
      'wifi'
    ]
  }
};

export default REDUX_PERSIST;
