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
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import DefaultStyle from '../../styles/default';

const data = [
  {icon: 'archive', title: 'archive'},
  {icon: 'mail', title: 'mail'},
  {icon: 'label', title: 'label'},
  {icon: 'delete', title: 'delete'},
];
export default class AppBar extends Component {
  constructor(props) {
    super(props);
    this.countNotification = 0;
    this.state = {isActive: 'archive'};
  }
  _handleMore = () => console.log('Shown more');
  _handlePress = title => {
    this.setState({isActive: title});
  };
  render() {
    console.log('this.state.isActive :>> ', this.state.isActive);
    const itemBar =
      data &&
      data.map((item, index) => {
        return (
          <View
            style={[
              DefaultStyle._itemBar,
              this.state.isActive === item.title
                ? DefaultStyle._itemBarActive
                : '',
            ]}
            key={index}>
            <Appbar.Action
              icon={item.icon}
              onPress={() => {
                console.log('Pressed', item.title);
                this._handlePress(item.title);
              }}
            />
            <Text>{item.title}</Text>
          </View>
        );
      });
    return (
      <ScrollView>
        <Text>simple app bar</Text>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content
            style={DefaultStyle._contentApp}
            titleStyle={DefaultStyle._leftTitle}
            title="Title"
            subtitle={'Subtitle'}
          />
          <Appbar.Content
            titleStyle={{...DefaultStyle._rightTitle}}
            title={'Right'}
          />
        </Appbar.Header>

        <Text> app bar with menu</Text>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Title" subtitle={'Subtitle'} />
          <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
        </Appbar.Header>

        <Text>Tab bar</Text>
        <Appbar style={DefaultStyle.tabBar}>{itemBar}</Appbar>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
