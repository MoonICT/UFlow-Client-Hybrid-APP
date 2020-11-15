/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DefaultStyle from '@Styles/default';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(1598051730000), mode: 'date', show: false};
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    this.setState({date: currentDate, show: true});
    console.log('currentDate',currentDate)
  };

  // showMode = currentMode => {
  //   // this.setState({mode: currentMode, show: true});
  //   console.log('aaa',currentMode)
  // };

  showDatepicker = () => {
    // showMode('date');
    this.setState({mode: 'date', show: true});
  };
  showTimepicker = () => {
    // showMode('time');
    this.setState({mode: 'time', show: true});

  };
  render() {
    const {children} = this.props;

    return (
      <View>
        <View>
          <Button onPress={this.showDatepicker} title="Show date picker!" />
        </View>
        <View>
          
          <Button onPress={this.showTimepicker} title="Show time picker!" />
        </View>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
      </View>
    );
  }
}

export default DatePicker;
