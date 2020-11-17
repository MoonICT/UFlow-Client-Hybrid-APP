/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FooterPage from '@Components/organisms/Footer';

import DefaultStyle from '@Styles/default';

export default class FooterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const data = [
      {
        titleList: '창고 등록',
        listItem: [
          {titleItem: '공급사 등록'},
          {titleItem: '수요사 등록'},
          {titleItem: '회원 조회'},
          {titleItem: '기본 조회'},
        ],
      },
      {
        titleList: '창고 찾기',
      },
      {
        titleList: '이용 방법',
      },
      {
        titleList: '고객센터',
      },
      {
        titleList: '패밀리사이트',
      },
    ];
    return (
      <View>
        <Text style={DefaultStyle.titleDf}>Footer</Text>
        <FooterPage data={data} />
      </View>
    );
  }
}
