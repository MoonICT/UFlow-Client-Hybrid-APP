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
  FlatList,
} from 'react-native';
import {DataTable} from 'react-native-paper';
// Local Imports
import LocalNotificationService from '../../services/LocalNotificationService';
import DefaultStyle from '../../styles/default';
import Styles from './style';

const DATA = [
  {
    id: '1',
    title: '1',
  },
  {
    id: '2',
    title: '2',
  },
  {
    id: '3',
    title: '3',
  },
];
const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[Styles.item, style]}>
    <Text style={Styles.title}>{item.title}</Text>
  </TouchableOpacity>
);
export default class Pagination extends Component {
  constructor() {
    super();

    this.state = {
      selectedId: null,
    };
  }
  renderItem = ({item}) => {
    const backgroundColor =
      item.id === this.state.selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
        item={item}
        onPress={() => this.setState({selectedId: item.id})}
        style={{backgroundColor}}
      />
    );
  };
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <FlatList
          horizontal={true}
          // style={Styles.row}
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          extraData={this.state.selectedId}
        />
      </SafeAreaView>
    );
  }
}
