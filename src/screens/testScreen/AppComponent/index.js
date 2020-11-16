/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AppComponent from '@Components/organisms/AppComponent';
import DefaultStyle from '@Styles/default';

export default class AppComponentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: 'true'};
  }

  render() {
    return (
      <View>
        <Text style={DefaultStyle.titleDf}>AppComponent</Text>
        <Text style={DefaultStyle.titleDf}>Search</Text>
        <AppComponent label="Label Name" placeholder="Enter placeholder" />
      </View>
    );
  }
}
