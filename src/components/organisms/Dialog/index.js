/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Styles from './style';

export default class DialogScreen extends Component {
  constructor() {
    super();

    this.state = { visible: false };
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });
  render() {
    const { visible } = this.props;
    return (
      <View>
        <Portal>
          <Dialog
            visible={visible ? visible : this.state.visible}
            onDismiss={this.hideDialog}>
            <Dialog.Title style={DefaultStyle._titleDialog}>
              Alert Title
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is Alert dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions style={DefaultStyle._buttonPopup}>
              <Button
                style={DefaultStyle._buttonElement}
                onPress={this.hideDialog}>
                Cancel
              </Button>
              <Button
                style={DefaultStyle._buttonElement}
                onPress={this.hideDialog}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
