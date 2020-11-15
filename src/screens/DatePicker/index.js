/**
 * @author [Life]
 * @desc [description]
 * */
import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import DatePicker from '@Components/organisms/DatePicker';
// import DefaultStyle from '@Styles/default';

class DatePickerScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children } = this.props;
    return <DatePicker />
  }
}

export default DatePickerScreen;
