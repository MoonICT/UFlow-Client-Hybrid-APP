/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
// import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {List} from 'react-native-paper';
// import DefaultStyle from '@Styles/default';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {type, children, title} = this.props;
    if (type === 'group') {
      return (
        <List.AccordionGroup title={title}>{children}</List.AccordionGroup>
      );
    }
    return <List.Section title={title}>{children}</List.Section>;
  }
}
