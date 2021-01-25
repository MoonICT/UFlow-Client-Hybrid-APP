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
var searchTimerQuery;
export default class AppComponentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View>
        <Text style={DefaultStyle.titleDf}>AppComponent</Text>
        <Text style={DefaultStyle.titleDf}>Search</Text>
        <AppComponent
          value={this.state.text}
          onChangeText={text => {
            if (searchTimerQuery) {
              clearTimeout(searchTimerQuery);
            }
            searchTimerQuery = setTimeout(async () => {
              this.setState({text})
            }, 500);
          }}
          label="Label Name"
          placeholder="Enter placeholder"
        />
      </View>
    );
  }
}
