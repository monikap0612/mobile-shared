import { NetInfo } from 'react-native';
import Actions from './actions';
import { Actions as OfflineActions } from '../offline';
import request from '../utils/request';
import { INTERVAL_TIME, OFFLINE_INTERVAL_TIME, PING_URL } from './config';

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
        this._runOnline();
      }
    })
    .catch(e => {
      if (status !== 'offline') {
        this.status = 'offline';
        this.dispatch(Actions.statusOffline());
        this._runOffline();
      }
    });
  }

  activate() {
    // console.log('network activated');
    this._checkStatus();
    NetInfo.addEventListener('change', this._checkStatus.bind(this));
  }

  _runOffline() {
    console.log('offline protocol');
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      console.log('offline check...')
      this._checkStatus();
    }, OFFLINE_INTERVAL_TIME);
  }

  _runOnline() {
    console.log('online protocol');
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      console.log('online check...')
      this._checkStatus();
    }, INTERVAL_TIME);
  }

  deactivate() {
    // console.log('network deactivated');
    clearInterval(this.timer);
    NetInfo.removeEventListener('change', this._checkStatus.bind(this));
  }
}

export default Network;
