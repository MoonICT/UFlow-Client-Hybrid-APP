/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
// Local Imports
import DefaultStyle from '../../styles/default';
import Styles from './style';

export default class SnackBarScreen extends Component {
  constructor() {
    super();

    this.state = { visible: false };
  }

  onToggleSnackBar = () => this.setState({ visible: !this.state.visible });

  onDismissSnackBar = () => this.setState({ visible: false });
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Button onPress={this.onToggleSnackBar}>{this.state.visible ? 'Hide' : 'Show'}</Button>
        <Snackbar
          style={DefaultStyle.snackbar}
          visible={this.state.visible}
          onDismiss={this.onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },

          }}>
          Hey there! I'm a Snackbar.
      </Snackbar>
      </SafeAreaView>
    );
  }
}

