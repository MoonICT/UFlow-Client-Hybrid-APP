/**
 *  Local Notification Service
 *  앱 자체적으로 푸쉬알림을 표시한다.(원경 푸쉬 제외)
 *  2020.09.03 Deokin
 *
 *  참고 : https://github.com/zo0r/react-native-push-notification
 *  참고 : https://github.com/react-native-community/push-notification-ios
 *  참고 : https://www.youtube.com/watch?v=z6DEJXYQpP4
 * @format
 * @flow strict-local
 * */
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class LocalNotificationService {

  /**
   * Starting Point : Register FCM Container
   * */
  constructor(onNotification, onRegister) {
    this.channelId = '';
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        console.log('::::: PushNotification : on register');
        if (typeof onRegister === 'function') {
          onRegister(token);
        }
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('::::: PushNotification : on notification');
        if (typeof onNotification === 'function') {
          onNotification(notification);
        }
      },
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: (err) => {
        console.log('::::: PushNotification : on error');
        console.log(err);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: Platform.OS === 'ios',
    });

    // NotificationHandler.attachRegister(onRegister);
    // NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log(channels);
    });
  }

  /**
   * Create notification
   * @param {String} channelId
   * @param {String} channelName
   * @param {String} channelDescription
   * */
  createOrUpdateChannel(channelId, channelName, channelDescription) {
    this.channelId = channelId;
    PushNotification.createChannel({
        channelId: channelId, // (required)
        channelName: channelName, // (required)
        channelDescription: `${channelDescription}: ${Date.now()}`, // (optional) default: undefined.
        // soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        // importance: 4, // (optional) default: 4. Int value of the Android notification importance
        // vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) => console.log('InitialNotication:', notification));
  }

  /**
   * Create notification options
   * @param {String} id
   * @param {String} title
   * @param {String} message
   * @param {Object} data
   * */
  _createNotificationOption(id, title, message, data, category) {
    return {
      /* Android Only Properties */
      // ticker: "My Notification Ticker", // (optional)
      // showWhen: true, // (optional) default: true
      // autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      // subText: "This is a subText", // (optional) default: none
      // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      // color: "red", // (optional) default: system default
      // vibrate: true, // (optional) default: true
      // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      // tag: "some_tag", // (optional) add tag to message
      // group: "group", // (optional) add group to message
      // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      // ongoing: false, // (optional) set whether this is an "ongoing" notification
      // priority: "high", // (optional) set notification priority, default: high
      // visibility: "private", // (optional) set notification visibility, default: private
      // importance: "high", // (optional) set notification importance, default: high
      // ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
      // shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      channelId: this.channelId, // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      // onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

      // when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      // usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      // timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      // messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

      actions: '["확인"]', // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: category, // (optional) default: empty string

      /* iOS and Android properties */
      id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: title, // (optional)
      message: message, // (required)
      userInfo: data, // (optional) default: {} (using null throws a JSON value '<null>' error)
      // playSound: false, // (optional) default: true
      // soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    };
  }

  /**
   * Create notification options for iOS
   * @param {String} id
   * @param {String} title
   * @param {String} message
   * @param {Object} data
   * */
  _createNotificationOptionIOS(id, title, message, data, category) {
    return {
      alertBody: message,// The message displayed in the notification alert,
      // alertAction: '', // The "action" displayed beneath an actionable notification. Defaults to "view". Note that Apple no longer shows this in iOS 10 +
      alertTitle: title, // The text displayed as the title of the notification alert.
      // soundName: '', // The sound played when the notification is fired (optional).
      // isSilent: '', // If true, the notification will appear without sound (optional).
      category: category, // The category of this notification, required for actionable notifications (optional).
      userInfo: data, // An object containing additional notification data (optional).
      // applicationIconBadgeNumber: '', // The number to display as the app's icon badge. The default value of this property is 0, which means that no badge is displayed (optional).
    };
  }

  /**
   * Push notification
   * @param {String} id
   * @param {String} title
   * @param {String} message
   * @param {Object} data
   * */
  pushNotification({id, title, message, data, category} = {}) {
    PushNotification.localNotification(this._createNotificationOption(id, title, message, data, category));
  }

  /**
   * Push notification
   * @param {String} id
   * @param {String} title
   * @param {String} message
   * @param {Object} data
   * @param {Object} date
   * */
  scheduleNotification({id, title, message, data, date, category} = {}) {
    PushNotification.localNotificationSchedule(Object.assign({
      date: date, // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    }, this._createNotificationOption(id, title, message, data, category)));
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotification(idNotification) {
    PushNotification.cancelLocalNotifications({id: '' + idNotification});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
}
