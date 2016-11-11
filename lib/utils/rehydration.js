import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

import persist from '../persist';

const updateReducers = (store) => {
  const reducerVersion = persist.reducerVersion;
  const config = persist.storeConfig;

  persistStore(store, config);
  // persistStore(store, config, () => {
  //   // Start a fresh store
  //   persistStore(store, config)
  // }).purgeAll();

  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      persistStore(store, config, () => {
        // Start a fresh store
        persistStore(store, config)
      }).purgeAll();

      AsyncStorage.setItem('reducerVersion', reducerVersion)
    }
  })
  .catch(e => {
    AsyncStorage.setItem('reducerVersion', reducerVersion);
  });
}

export default { updateReducers };
