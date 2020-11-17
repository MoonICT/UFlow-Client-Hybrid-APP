/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
// import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
// import DefaultStyle from '@Styles/default';

class Tables extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {children} = this.props;
    return <DataTable {...this.props}>{children}</DataTable>;
  }
}

export default Tables;
