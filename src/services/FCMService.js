/**
 *  Firebase Cloud Messaging
 *  2020.08.12 Deokin
 *
 *  참고 : https://rnfirebase.io/messaging/usage
 * @format
 * @flow strict-local
 * */
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';

class FCMService {
  constructor () {
    this.token = '';
    // 사용자가 푸시 알림 권한을 허용했는지 체크.
    this._checkApplicationPermission();
    // Register all listener for notification
    this._createNotificationListeners();
  }

  /**
   * Starting Point : Register FCM Container
   * @param {Function} onMessageForeground - foreground 상태에서 메세지 수신 시 콜백.
   * */
  // async init(onMessageForeground) {
  //   // 사용자가 푸시 알림 권한을 허용했는지 체크.
  //   await this._checkApplicationPermission();
  //   // Register all listener for notification
  //   await this._createNotificationListeners();
  // };

  /**
   * @private
   * 사용자의 권한요청 알림창을 트리거 한다.
   * */
  async _requestUserPermission () {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      return enabled;
    } catch (e) {
      console.debug('알림 권한요청 거절');
    }
  }

  /**
   * @private
   * 사용자가 알림을 허용했는지 확인한다.
   * */
  async _checkApplicationPermission () {
    // const enabled = await messaging().hasPermission();
    const enabled = await this._requestUserPermission();
    // console.log('사용자 권한 : ', enabled);
    // 권한 요청이 성공하면 디바이스 토큰을 가져온다.
    if (enabled) {
      await this._getToken();
    }
  }

  // Add the token to the data store
  /**
   * @private
   * Add the token to the data store
   * @param {String} token
   * */
  async _saveTokenToDatabase (token) {
    await AsyncStorage.setItem('fcmToken', token);
  }

  /**
   * @private
   * 디비아스 토큰을 가져옴.
   * */
  async _getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      // Get device token
      await messaging().getToken().then(async token => {
        await this._saveTokenToDatabase(token);
      });
      // Listen to whether the token changes
      await messaging().onTokenRefresh(async token => {
        await this._saveTokenToDatabase(token);
      });
    }
    this.token = fcmToken;
    // console.log('::::: FCM Device Token | ' + Platform.OS + ' :::::', fcmToken);
  }

  /**
   * @private
   * Regist listener for Notification.
   * */
  async _createNotificationListeners () {

    // Foreground 상태일때 메시지 수신.
    messaging().onMessage(async remoteMessage => {
      console.log('+++ Message handled in the foreground!', remoteMessage);
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
        {
          text: '닫기',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            // TODO 확인 클릭 시 원하는 동작.(ex. 딥링크 처리, 스크린 이동 등.)
          },
        },
      ]);
    });

    // Background & Quit 상태일 때 메시지 수신.
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('+++ Message handled in the background!', remoteMessage);
    });

    // Background 상태일 때 앱이 열린경우.(알림을 탭헀을 때.)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('+++ Notification caused app to open from background state:', remoteMessage.notification);
      // TODO 확인 클릭 시 원하는 동작.(ex. 딥링크 처리, 스크린 이동 등.)
    });

    // Quite 상태일 때 앱이 열린경우.(알림을 탭했을 때.)
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('+++ Notification caused app to open from quit state:', remoteMessage.notification);
        // TODO 확인 클릭 시 원하는 동작.(ex. 딥링크 처리, 스크린 이동 등.)
      }
    });
  }
}

export default FCMService;
