import { NetInfo } from 'react-native';
import Actions from './actions';
import { Actions as OfflineActions } from '../offline';
import request from '../utils/request';
import { INTERVAL_TIME, OFFLINE_INTERVAL_TIME, PING_URL } from './config';

import { networkStatusChanged, scheduleRetry } from '@redux-offline/redux-offline/lib/actions';
import { powerToggle } from '../wifi/actions';

class Network {
  constructor(dispatch, options) {
    this.dispatch = dispatch;
    this.isActive = false;
  }

  status = ''
  offlineRetries = 0

  _checkStatus = () => {
    console.log('checking status')
    const { status } = this;
    const netInfo = {
      isConnectionExpensive: null,
    }
    return NetInfo.getConnectionInfo()
    .then(reach => {
      netInfo.reach = reach || null
      return request(PING_URL)
    })
    .then(response => {
      if (status !== 'online') {
        this.status = 'online';
        
        // if (status === '') {
        //   return this._runOnline();
        // }
        
        this.dispatch(Actions.statusOnline());
        this.dispatch(networkStatusChanged({
          online: true,
          netInfo,
        }));

        this.dispatch(OfflineActions.start());
        this.dispatch(scheduleRetry());
        this._runOnline();
      }
      this.offlineRetries = 0;
    })
    .catch(e => {
      // console.log(e);
      if (status !== 'offline') {
        this.status = 'offline';
        this.dispatch(networkStatusChanged({
          online: false,
          netInfo,
        }));
        this.dispatch(Actions.statusOffline());
        this._runOffline();
      }
      this.offlineRetries++;

      // if (this.offlineRetries > 0 && this.offlineRetries % 60 === 0) {
      //   this.dispatch(powerToggle());
      // }
    });
  }

  activate() {
    // console.log('network activated');
    this._checkStatus();
    NetInfo.addEventListener('connectionChange', this._checkStatus.bind(this));
  }

  _runOffline() {
    // console.log('offline protocol');
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      // console.log('offline check...', this.offlineRetries);
      this._checkStatus();
    }, OFFLINE_INTERVAL_TIME);
  }

  _runOnline() {
    // console.log('online protocol');
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      // console.log('online check...', this.offlineRetries);
      this._checkStatus();
    }, INTERVAL_TIME);
  }

  deactivate() {
    // console.log('network deactivated');
    clearInterval(this.timer);
    NetInfo.removeEventListener('connectionChange', this._checkStatus.bind(this));
  }
}

export default Network;
