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
import DefaultStyle from '../../styles/default';
import DatePicker from './DatePicker';
import Table from './Table';
import Switch from './Switch';
import Accordion from './Accordion';
import AppBar from './AppBar';
import Breadcrumb from './Breadcrumb';
import Dialog from './Dialog';
import List from './List';
import Pagination from './Pagination';
import Progress from './Progress';
import SnackBar from './SnackBar';
import SpeedDial from './SpeedDial';
import ToggleButton from './ToggleButton';
import AppGrid from './AppGrid';
import AppComponent from './AppComponent';

export default class AccordionScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={DefaultStyle.container}>
        <DatePicker />
        <Table />
        <Switch />
        <Accordion />
        <AppBar />
        <Breadcrumb />
        <Dialog />
        <List />
        <Pagination />
        <Progress />
        <SnackBar />
        <SpeedDial />
        <ToggleButton />
        <AppGrid />
        <AppComponent />
      </ScrollView>
    );
  }
}
