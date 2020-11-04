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
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// Local Imports
import LocalNotificationService from '../../services/LocalNotificationService';
import DefaultStyle from '../../styles/default';
import Styles from './style';

export default class TextFeild extends Component {
  constructor(props) {
    super(props);
    this.countNotification = 0;
    this.state = {
      // value: '',
    };
    // this.idChannel = 'test-channel';
    // this.localNotify = new LocalNotificationService(this._onLocalNotification);
    // this.localNotify.createOrUpdateChannel(
    //   this.idChannel,
    //   'Test Channel',
    //   'This is a channel for testing.',
    // );
  }
  onChangeText(e) {
    console.log('e', e);
    this.setState({
      value: e,
    });
  }
  render() {
    console.log('value', this.state);

    return (
      <SafeAreaView
        style={[
          DefaultStyle.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Filled</Text>
          <View style={Styles.textField}>
            <TextInput
              defaultValue={'default'}
              style={[
                DefaultStyle._fillInput,
                DefaultStyle._fillDefaultInput,
                Styles.input,
              ]}
              onChangeText={text => this.onChangeText(text)}
              value={this.state && this.state.value}
            />
            <Text style={[DefaultStyle._notifiInput]}>notification</Text>
          </View>
          <View style={Styles.textField}>
            <Text style={[DefaultStyle._labelInput, Styles.label]}>Label</Text>
            <TextInput
              defaultValue={'active'}
              style={[
                DefaultStyle._fillInput,
                DefaultStyle._fillValueInput,
                DefaultStyle._fillActiveInput,
              ]}
              onChangeText={text => this.onChangeText(text)}
              value={this.state && this.state.value}
            />
            <Text style={[DefaultStyle._notifiInput]}>notification</Text>
          </View>
          <View style={Styles.textField}>
            <Text style={[DefaultStyle._hasValueLabelInput, Styles.label]}>
              Label
            </Text>
            <TextInput
              defaultValue={'Has value'}
              style={[
                DefaultStyle._fillInput,
                DefaultStyle._fillValueInput,
                Styles.inputActive,
              ]}
              onChangeText={text => this.onChangeText(text)}
              value={this.state && this.state.value}
            />
            <Text style={[DefaultStyle._notifiInput]}>notification</Text>
          </View>
          <View style={Styles.textField}>
            <TextInput
              editable={false}
              defaultValue={'Disabled'}
              style={[DefaultStyle._fillInput, Styles.input]}
              onChangeText={text => this.onChangeText(text)}
              value={this.state && this.state.value}
            />
            <Text style={[DefaultStyle._notifiInput]}>notification</Text>
          </View>
          <View style={Styles.textField}>
            <Text style={[DefaultStyle._hasValueLabelInput, Styles.label]}>
              Label
            </Text>
            <TextInput
              defaultValue={'Error'}
              style={[
                DefaultStyle._fillInput,
                DefaultStyle._fillValueInput,
                Styles.inputActive,
              ]}
              onChangeText={text => this.onChangeText(text)}
              value={this.state && this.state.value}
            />
            <Text style={[DefaultStyle._notifiInput]}>notification</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
