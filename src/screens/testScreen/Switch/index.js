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
import {SafeAreaView, Slider, View, Text} from 'react-native';
import {Switch} from 'react-native-paper';
// Local Imports
import {color} from '@Themes/colors';
import DefaultStyle from '@Styles/default';
import Styles from './style';

export default class SwitchScreen extends Component {
  constructor() {
    super();

    this.state = {isSwitchOn: false};
  }

  onToggleSwitch = () => this.setState({isSwitchOn: !this.state.isSwitchOn});
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Text>default</Text>
        <View style={Styles.row}>
          <Switch
            thumbColor={color.primary.main}
            value={this.state.isSwitchOn}
            onValueChange={this.onToggleSwitch}
          />
          <Text style={DefaultStyle._labelSwitch}>On</Text>
        </View>

        <Text>disable</Text>
        <View style={Styles.row}>
          <Switch
            disabled={true}
            value={this.state.isSwitchOn}
            onValueChange={this.onToggleSwitch}
          />
          <Text style={DefaultStyle._labelSwitch}>On</Text>
        </View>
      </SafeAreaView>
    );
  }
}
