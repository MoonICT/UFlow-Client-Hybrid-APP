/**
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DefaultTheme, ProgressBar, Colors} from 'react-native-paper';
// Local Imports
import DefaultStyle from '@Styles/default';
import Styles from './style';

export default class ProgressScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Text style={DefaultStyle.titleDf}>Progress</Text>
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
