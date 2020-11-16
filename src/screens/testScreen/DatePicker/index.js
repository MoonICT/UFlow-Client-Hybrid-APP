/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
import {ScrollView, View, Button, Text} from 'react-native';
import DatePicker from '@Components/organisms/DatePicker';
import DefaultStyle from '@Styles/default';

class DatePickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {mode: '', date: new Date(), showProps: false};
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({date: currentDate, showProps: true});
  };
  showDatepicker = () => {
    // showMode('date');
    this.setState({mode: 'date', showProps: true});
  };
  showTimepicker = () => {
    // showMode('time');
    this.setState({mode: 'time', showProps: true});
  };
  render() {
    return (
      <ScrollView style={DefaultStyle.container}>
        <Text style={DefaultStyle.titleDf}>DatePicker</Text>
        <View>
          <Button onPress={this.showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={this.showTimepicker} title="Show time picker!" />
        </View>
        <DatePicker
          mode={this.state.mode}
          show={this.state.showProps}
          onChange={this.onChange}
          value={this.state.date}
        />
      </ScrollView>
    );
  }
}

export default DatePickerScreen;
