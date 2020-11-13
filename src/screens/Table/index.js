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
import {DataTable} from 'react-native-paper';
import Tables from '@Components/organisms/Table';
import DefaultStyle from '../../styles/default';
export default class AccordionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: 'true'};
  }
  handlePress = e => {
    this.setState({expanded: !this.state.expanded});
  };
  accordionPress = e => {
    console.log('e :>> ', e);
  };
  render() {
    return (
      <ScrollView style={{padding: 24}}>
        <Tables style={DefaultStyle._table}>
          <DataTable.Header style={DefaultStyle._headerTable}>
            <DataTable.Title>Dessert</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={DefaultStyle._tableRow}>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row
            style={[DefaultStyle._tableRow, DefaultStyle._borderTableRow]}>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>
        </Tables>
      </ScrollView>
    );
  }
}
