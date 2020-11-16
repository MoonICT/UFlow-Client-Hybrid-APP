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
import {View, Text} from 'react-native';
import Lists from '@Components/organisms/List';
import DefaultStyle from '@Styles/default';

export default class AccordionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: 'true'};
  }

  render() {
    const data = [
      {
        titleList: 'Uncontrolled Accordion',
        icon: 'mail',
      },
      {
        titleList: 'Controlled Accordion',
        icon: 'picture',
      },
    ];
    return (
      <View>
        <Text style={DefaultStyle.titleDf}>List</Text>
        <Lists title={'Nested List Items'} listItems={data} />
      </View>
    );
  }
}
