/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SpeedDial from '@Components/organisms/SpeedDial';
import DefaultStyle from '@Styles/default';

export default class AccordionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: 'true'};
  }

  render() {
    const data = [
      {icon: 'plus', onPress: () => console.log('Pressed add')},
      {
        icon: 'star',
        label: 'Star',
        onPress: () => console.log('Pressed star'),
      },
      {
        icon: 'email',
        label: 'Email',
        onPress: () => console.log('Pressed email'),
      },
      {
        icon: 'bell',
        label: 'Remind',
        onPress: () => console.log('Pressed notifications'),
      },
    ];
    return (
      <View style={{height: 500}}>
        <Text style={DefaultStyle.titleDf}>SpeedDial</Text>
        <SpeedDial actions={data} />
      </View>
    );
  }
}
