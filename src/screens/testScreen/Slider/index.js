/**
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, Slider, View, Text} from 'react-native';
// Local Imports
import {color} from '../../../themes/colors';
import DefaultStyle from '@Styles/default';
import Styles from './style';

export default class SliderScreen extends Component {
  constructor() {
    super();
    this.state = {value: 0};
  }

  onValueChange = e => this.setState({value: e});
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Text style={DefaultStyle.titleDf}>Slider</Text>
        <View>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={100}
            step={5}
            minimumTrackTintColor={color.primary.main}
            maximumTrackTintColor="#000000"
            thumbTintColor={color.primary.main}
            onValueChange={this.onValueChange}
          />
          <Text style={Styles.textValue}>{this.state.value}</Text>
        </View>

        <View>
          <Text>Disable</Text>

          <Slider
            disabled={true}
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={100}
            value={40}
            step={5}
            minimumTrackTintColor={color.primary.main}
            maximumTrackTintColor="#000000"
            thumbTintColor={color.primary.main}
          />
        </View>
      </SafeAreaView>
    );
  }
}
