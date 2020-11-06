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
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {DefaultTheme, ProgressBar, Colors} from 'react-native-paper';
// Local Imports
import LocalNotificationService from '../../services/LocalNotificationService';
import DefaultStyle from '../../styles/default';
import Styles from './style';

export default class Progress extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <ProgressBar theme={theme} progress={0.6} color={Colors.red800} />
      </SafeAreaView>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
