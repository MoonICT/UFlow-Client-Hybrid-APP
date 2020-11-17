/**
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {DefaultTheme, ProgressBar, Colors} from 'react-native-paper';
// Local Imports
import Progress from '@Components/organisms/Progress';
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
        <View style={DefaultStyle._progress}>
          <Progress progress={0.3} width={200} />
          <Progress type="Pie" progress={0.4} size={50} />
          <Progress
            type="Circle"
            indeterminate={true}
            progress={0.3}
            size={200}
          />
        </View>
      </SafeAreaView>
    );
  }
}
