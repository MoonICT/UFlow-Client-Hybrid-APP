/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Local Imports
import LocalNotificationService from '../../services/LocalNotificationService';
import DefaultStyle from '../../styles/default';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.countNotification = 0;
    this.idChannel = 'test-channel';
    this.localNotify = new LocalNotificationService(this._onLocalNotification);
    this.localNotify.createOrUpdateChannel(this.idChannel, 'Test Channel', 'This is a channel for testing.');
  }

  /**
   * [LocalNotificationService]
   * 로컬 알림 클릭 후 앱이 실행되면 실행.(FCM 포함)(for Test)
   * @param {Notification} notification
   * */
  _onLocalNotification(notification) {
    if (notification.data) {
      Alert.alert(notification.title, notification.message, [
        {
          text: '확인',
        },
      ]);
    }
  }

  /**
   * [LocalNotificationService]
   * 로컬 알림 생성( for Test)
   * */
  _createNotification(){
    this.countNotification++;
    this.localNotify.pushNotification({
      id: this.countNotification,
      title: 'Test',
      message: 'Test message',
      data: {},
      category: this.idChannel
    });
  }

  /**
   * [LocalNotificationService]
   * 로컬 스케줄 알림 생성( for Test)
   * */
  _createScheduleNotification() {
    this.countNotification++;
    this.localNotify.scheduleNotification({
      id: this.countNotification,
      title: 'Test Local Notification',
      message: 'This is a local notification for testing.',
      data: {},
      date: new Date(Date.now() + 5 * 1000), // in 10 secs
      category: this.idChannel,
    });
  }

  render() {
    return (
      <SafeAreaView
        style={[
          DefaultStyle.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{marginBottom: 20, fontSize: 20}}>Local Notification</Text>
        <TouchableOpacity onPress={() => this._createNotification()} style={{marginBottom: 12}}><Text>{'Create Local Notification'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this._createScheduleNotification()} style={{marginBottom: 12}}><Text>{'Create Local Notification(after 5 secs)'}</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }
}
