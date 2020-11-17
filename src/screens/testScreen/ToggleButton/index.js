/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import {ToggleButton} from 'react-native-paper';
import DefaultStyle from '@Styles/default';

export default class ToggleButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {valueBtn: 'left'};
  }
  render() {
    return (
      <ScrollView>
        <Text style={DefaultStyle.titleDf}>ToggleButton</Text>
        <ToggleButton.Row
          onValueChange={value => this.setState({valueBtn: value})}
          value={this.state.valueBtn}>
          <ToggleButton
            icon="format-align-left"
            value="left"
            style={[
              DefaultStyle._toggleButton,
              this.state.valueBtn === 'left'
                ? DefaultStyle._toggleBtnActive
                : '',
            ]}
          />
          <ToggleButton
            icon="format-align-center"
            value="center"
            style={[
              DefaultStyle._toggleButton,
              this.state.valueBtn === 'center'
                ? DefaultStyle._toggleBtnActive
                : '',
            ]}
          />
          <ToggleButton
            icon="format-align-right"
            value="right"
            style={[
              DefaultStyle._toggleButton,
              this.state.valueBtn === 'right'
                ? DefaultStyle._toggleBtnActive
                : '',
            ]}
          />
        </ToggleButton.Row>
      </ScrollView>
    );
  }
}
