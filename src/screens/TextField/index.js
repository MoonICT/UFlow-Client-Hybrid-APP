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
  ScrollView,
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

export default class TextField extends Component {
  constructor(props) {
    super(props);
    this.countNotification = 0;
    this.state = {
      // value: '',
      isFocused: false,
      isNotifi: false,
    };
  }
  onChangeText(e) {
    this.setState({
      value: e,
    });
  }

  onFocusChange(e) {
    this.setState({isFocused: true});
  }

  onBlurChange(e) {
    this.setState({isFocused: false});
    if (this.state.value === '') {
      this.setState({isNotifi: true});
    } else {
      this.setState({isNotifi: false});
    }
  }
  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={[
            DefaultStyle.container,
            DefaultStyle.row,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={Styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Filled</Text>
            <Text>Template</Text>
            <View style={Styles.textField}>
              {this.state.isFocused === true ? (
                <Text
                  style={[
                    DefaultStyle._labelInput,
                    DefaultStyle._activeLabelInput,
                  ]}>
                  Label
                </Text>
              ) : null}

              <TextInput
                onFocus={() => this.onFocusChange()}
                onBlur={() => this.onBlurChange()}
                defaultValue={
                  this.state.isFocused === true ? 'Active' : 'Default'
                }
                style={[
                  DefaultStyle._fillInput,
                  this.state.isFocused === true
                    ? [DefaultStyle._fillValueInput, DefaultStyle._activeInput]
                    : null,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              {this.state.isNotifi === true ? (
                <Text
                  style={[
                    DefaultStyle._notifiInput,
                    DefaultStyle._errorNotifiInput,
                  ]}>
                  notification
                </Text>
              ) : null}
            </View>

            <View style={Styles.textField}>
              <TextInput
                defaultValue={'default'}
                style={[DefaultStyle._fillInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <Text
                style={[
                  DefaultStyle._labelInput,
                  DefaultStyle._activeLabelInput,
                ]}>
                Label
              </Text>
              <TextInput
                defaultValue={'active'}
                style={[
                  DefaultStyle._fillInput,
                  DefaultStyle._fillValueInput,
                  DefaultStyle._activeInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <Text style={[DefaultStyle._labelInput]}>Label</Text>
              <TextInput
                defaultValue={'Has value'}
                style={[DefaultStyle._fillInput, DefaultStyle._fillValueInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <TextInput
                editable={false}
                defaultValue={'Disabled'}
                style={[DefaultStyle._fillInput, DefaultStyle._disableInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <TextInput
                defaultValue={'Empty Error'}
                style={[DefaultStyle._fillInput, DefaultStyle._errorInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text
                style={[
                  DefaultStyle._notifiInput,
                  DefaultStyle._errorNotifiInput,
                ]}>
                notification
              </Text>
            </View>
            <View style={Styles.textField}>
              <Text
                style={[
                  DefaultStyle._labelInput,
                  DefaultStyle._errorLabelInput,
                ]}>
                Label
              </Text>
              <TextInput
                defaultValue={'Error'}
                style={[
                  DefaultStyle._fillInput,
                  DefaultStyle._fillValueInput,
                  DefaultStyle._errorInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text
                style={[
                  DefaultStyle._notifiInput,
                  DefaultStyle._errorNotifiInput,
                ]}>
                notification
              </Text>
            </View>
          </View>

          <View style={Styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Line</Text>
            <Text>Template</Text>
            <View style={Styles.textField}>
              {this.state.isFocused === true ? (
                <Text
                  style={[
                    DefaultStyle._labelInput,
                    DefaultStyle._activeLabelInput,
                  ]}>
                  Label
                </Text>
              ) : null}

              <TextInput
                onFocus={() => this.onFocusChange()}
                onBlur={() => this.onBlurChange()}
                defaultValue={
                  this.state.isFocused === true ? 'Active' : 'Default'
                }
                style={[
                  DefaultStyle._lineInput,
                  this.state.isFocused === true
                    ? [
                        DefaultStyle._outLineValueInput,
                        DefaultStyle._activeInput,
                      ]
                    : null,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              {this.state.isNotifi === true ? (
                <Text
                  style={[
                    DefaultStyle._notifiInput,
                    DefaultStyle._errorNotifiInput,
                  ]}>
                  notification
                </Text>
              ) : null}
            </View>

            <View style={Styles.textField}>
              <TextInput
                defaultValue={'default'}
                style={[DefaultStyle._lineInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <Text
                style={[
                  DefaultStyle._labelInput,
                  DefaultStyle._activeLabelInput,
                ]}>
                Label
              </Text>
              <TextInput
                defaultValue={'active'}
                style={[
                  DefaultStyle._lineInput,
                  DefaultStyle._fillValueInput,
                  DefaultStyle._activeInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <Text style={[DefaultStyle._labelInput]}>Label</Text>
              <TextInput
                defaultValue={'Has value'}
                style={[DefaultStyle._lineInput, DefaultStyle._fillValueInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                }}
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <TextInput
                editable={false}
                defaultValue={'Disabled'}
                style={[
                  DefaultStyle._lineInput,
                  DefaultStyle._outLineDisableInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <TextInput
                defaultValue={'Empty Error'}
                style={[DefaultStyle._lineInput, DefaultStyle._errorInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text
                style={[
                  DefaultStyle._notifiInput,
                  DefaultStyle._errorNotifiInput,
                ]}>
                notification
              </Text>
            </View>
            <View style={Styles.textField}>
              <Text
                style={[
                  DefaultStyle._labelInput,
                  DefaultStyle._errorLabelInput,
                ]}>
                Label
              </Text>
              <TextInput
                defaultValue={'Error'}
                style={[
                  DefaultStyle._lineInput,
                  DefaultStyle._fillValueInput,
                  DefaultStyle._errorInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text
                style={[
                  DefaultStyle._notifiInput,
                  DefaultStyle._errorNotifiInput,
                ]}>
                notification
              </Text>
            </View>
          </View>

          <View style={Styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Outline</Text>
            <Text>Template</Text>
            <View style={Styles.textField}>
              {this.state.isFocused === true ? (
                <Text
                  style={[
                    DefaultStyle._labelInput,
                    DefaultStyle._activeLabelInput,
                  ]}>
                  Label
                </Text>
              ) : null}

              <TextInput
                onFocus={() => this.onFocusChange()}
                onBlur={() => this.onBlurChange()}
                defaultValue={
                  this.state.isFocused === true ? 'Active' : 'Default'
                }
                style={[
                  DefaultStyle._outLineInput,
                  this.state.isFocused === true
                    ? [
                        DefaultStyle._outLineValueInput,
                        DefaultStyle._activeInput,
                      ]
                    : null,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              {this.state.isNotifi === true ? (
                <Text
                  style={[
                    DefaultStyle._notifiInput,
                    DefaultStyle._errorNotifiInput,
                  ]}>
                  notification
                </Text>
              ) : null}
            </View>

            <View style={Styles.textField}>
              <TextInput
                defaultValue={'default'}
                style={[DefaultStyle._outLineInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <Text
                style={[
                  DefaultStyle._labelInput,
                  DefaultStyle._activeLabelInput,
                ]}>
                Label
              </Text>
              <TextInput
                defaultValue={'active'}
                style={[
                  DefaultStyle._outLineInput,
                  DefaultStyle._fillValueInput,
                  DefaultStyle._activeInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <Text style={[DefaultStyle._labelInput]}>Label</Text>
              <TextInput
                defaultValue={'Has value'}
                style={[
                  DefaultStyle._outLineInput,
                  DefaultStyle._fillValueInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <TextInput
                editable={false}
                defaultValue={'Disabled'}
                style={[
                  DefaultStyle._outLineInput,
                  DefaultStyle._disableInput,
                  DefaultStyle._outLineDisableInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text style={[DefaultStyle._notifiInput]}>notification</Text>
            </View>
            <View style={Styles.textField}>
              <TextInput
                defaultValue={'Empty Error'}
                style={[DefaultStyle._outLineInput, DefaultStyle._errorInput]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text
                style={[
                  DefaultStyle._notifiInput,
                  DefaultStyle._errorNotifiInput,
                ]}>
                notification
              </Text>
            </View>
            <View style={Styles.textField}>
              <Text
                style={[
                  DefaultStyle._labelInput,
                  DefaultStyle._errorLabelInput,
                ]}>
                Label
              </Text>
              <TextInput
                defaultValue={'Error'}
                style={[
                  DefaultStyle._outLineInput,
                  DefaultStyle._fillValueInput,
                  DefaultStyle._errorInput,
                ]}
                onChangeText={text => {
                  this.onChangeText(text)
                } }
                value={this.state && this.state.value}
              />
              <Text
                style={[
                  DefaultStyle._notifiInput,
                  DefaultStyle._errorNotifiInput,
                ]}>
                notification
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
