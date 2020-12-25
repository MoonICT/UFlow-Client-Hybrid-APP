/**
 * @author [Life]
 * @desc [description]
 * */
import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DefaultStyle from '@Styles/default';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show } = this.props;
    return (
      <View>
        {show === true && (
          <DateTimePicker is24Hour={true} display="default" {...this.props} />
        )}
      </View>
    );
  }
}

export default DatePicker;
