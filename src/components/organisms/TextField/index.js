/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Styles from './style';

export default class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: true,
      isNotifi: false,
    };
  }
  onChangeText(e) {
    console.log('e', e);
    this.setState({
      value: e,
    });
  }
  onFocusChange(e) {
    this.setState({ isFocused: true });
  }

  onBlurChange(e) {
    this.setState({ isFocused: false });
    if (this.state.value === '') {
      this.setState({ isNotifi: true });
    } else {
      this.setState({ isNotifi: false });
    }
  }
  render() {
    const {
      labelTextField,
      textRight,
      rightComponent,
      colorLabel,
    } = this.props;

    return (
      <View style={Styles.textField}>
        {labelTextField ? (
          <Text
            style={[
              DefaultStyle._labelTextField,
              colorLabel ? { color: colorLabel } : null,
            ]}>
            {labelTextField}
          </Text>
        ) : null}

        <TextInput
          onFocus={() => this.onFocusChange()}
          onBlur={() => this.onBlurChange()}
          style={DefaultStyle._inputTextField}
          onChangeText={text => this.onChangeText(text)}
          value={this.state && this.state.value}
          {...this.props}
        />
        {rightComponent ? (
          rightComponent
        ) : (
          <Text style={DefaultStyle._rightTextField}>{textRight}</Text>
        )}
      </View>
    );
  }
}