'use strict';

const { NativeModules, Platform, PushNotificationIOS } = require('react-native');
const Pusher = NativeModules.RNPusher ;

const nativePusher = function(options) {
  const { deviceId, pusherKey } = options;
  const onRegister = (deviceToken) => {
    Pusher.registerWithDeviceToken(deviceToken);
  };
  const onRegistrationError = (error) => {
    console.error(error);
  };

  return {
    register() {
      Pusher.pusherWithKey(pusherKey);
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addEventListener('register', onRegister);
        PushNotificationIOS.addEventListener('registrationError', onRegistrationError);

        PushNotificationIOS.requestPermissions();
      } else {
        Pusher.registerWithDeviceToken(deviceId);

        Pusher.requestPermissions(deviceId);
      }
    },

    unregister() {
      if (Platform.OS === 'ios') {
        PushNotificationIOS.removeEventListener('register', onRegister);
        PushNotificationIOS.removeEventListener('registrationError', onRegistrationError);
      }
    },

    subscribe(interest) {
      Pusher.subscribe(interest);
    },

    unsubscribe(interest) {
      Pusher.unsubscribe(interest);
    }
  };
}

module.exports = nativePusher;
