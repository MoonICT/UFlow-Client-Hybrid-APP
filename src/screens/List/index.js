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
import {View} from 'react-native';
import {List} from 'react-native-paper';
import Lists from '@Components/organisms/List';

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
        <Lists title={'Nested List Items'} listItems={data} />
      </View>
    );
  }
}
