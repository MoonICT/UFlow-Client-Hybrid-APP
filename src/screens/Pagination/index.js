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
import {SafeAreaView} from 'react-native';
import {DataTable} from 'react-native-paper';
// Local Imports
import DefaultStyle from '../../styles/default';
import Styles from './style';
const itemsPerPage = 2;

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];

export default class PaginationScreen extends Component {
  constructor() {
    super();
    this.state = {
      pageValue: 1,
      numberPages: Math.floor(items.length / itemsPerPage),
    };
  }
  render() {
    const from = this.state.pageValue * itemsPerPage;
    const to = (this.state.pageValue + 1) * itemsPerPage;
    return (
      <SafeAreaView style={Styles.container}>
        <DataTable>
          <DataTable.Pagination
            style={DefaultStyle._pagination}
            page={this.state.pageValue}
            numberOfPages={this.state.numberPages}
            onPageChange={page => {
              console.log(page);
              this.setState({pageValue: page});
            }}
            label={`${from + 1}-${to} of ${items.length}`}
          />
        </DataTable>
      </SafeAreaView>
    );
  }
}
