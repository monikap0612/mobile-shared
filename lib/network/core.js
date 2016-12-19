import { NetInfo } from 'react-native';
import Actions from './actions';
import { Actions as OfflineActions } from '../offline';
import request from '../utils/request';
import { INTERVAL_TIME, PING_URL } from './config';

class Network {
  constructor(dispatch, options) {
    this.dispatch = dispatch;
  }

  status = ''

  _checkStatus = () => {
    const { status } = this;
    return request(PING_URL)
    .then(response => {
      if (status !== 'online') {
        this.status = 'online';
        this.dispatch(Actions.statusOnline());
        this.dispatch(OfflineActions.start());
      }
    })
    .catch(e => {
      if (status !== 'offline') {
        this.status = 'offline';
        this.dispatch(Actions.statusOffline());
      }
    });
  }

  activate() {
    console.log('network activated');
    this._checkStatus();

    this.timer = setInterval(() => {
      this._checkStatus();
    }, INTERVAL_TIME);
  }

  deactivate() {
    console.log('network deactivated');
    clearInterval(this.timer);
  }
}

export default Network;
