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
import AppGrid from '@Components/organisms/AppGrid';
import DefaultStyle from '@Styles/default';

export default class AccordionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: 'true'};
  }

  render() {
    const data = [
      {
        title: 'TOP10',
        content: '* 중앙 탭 클릭 부터는 중앙 정렬 (ref. 배달의민족)',
      },
      {
        title: '회원가입',
        content: '회원가입',
      },
      {
        title: '창고조회',
        content: '창고조회',
      },
      {
        title: '창고등록',
        content: '창고등록',
      },
      {
        title: '창고등록5',
        content: '창고등록5',
      },
      {
        title: '창고등록6',
        content: '창고등록6',
      },
    ];
    return (
      <View>
        <Text style={DefaultStyle.titleDf}>AppGrid</Text>
        <AppGrid data={data} />
      </View>
    );
  }
}
