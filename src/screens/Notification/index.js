/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component, useRef } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

// Local Imports
import Select from '@Components/organisms/Select';
import WarehouseRegistration from './warehouseRegistration';
import WarehouseUse from './warehouseUse';
import ContractMode from './contractMode';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

//Data Footer
const data = [
  {
    titleList: getMsg(this.props.lang, 'ML0066', '창고 등록'),
    listItem: [
      { titleItem: getMsg(this.props.lang, 'ML0462', '공급사 등록') },
      { titleItem: getMsg(this.props.lang, 'ML0463', '수요사 등록') },
      { titleItem: getMsg(this.props.lang, 'ML0464', '회원 조회') },
      { titleItem: getMsg(this.props.lang, 'ML0465', '기본 조회') },
    ],
  },
  {
    titleList: getMsg(this.props.lang, 'ML0466', '창고 찾기'),
  },
  {
    titleList: getMsg(this.props.lang, 'ML0467', '이용 방법'),
  },
  {
    titleList: getMsg(this.props.lang, 'ML0468', '고객센터'),
  },
  {
    titleList: getMsg(this.props.lang, 'ML0469', '패밀리사이트'),
  },
];
const navitationTitle1 = [
  {
    label: getMsg(this.props.lang, 'ML0066', '창고 등록'),
    value: getMsg(this.props.lang, 'ML0066', '창고 등록'),
  },
  {
    label: getMsg(this.props.lang, 'ML0067', '창고 이용'),
    value: getMsg(this.props.lang, 'ML0067', '창고 이용'),
  },
  {
    label: getMsg(this.props.lang, 'ML0068', '계약 방식'),
    value: getMsg(this.props.lang, 'ML0068', '계약 방식'),
  },
];
const navitationTitle2 = [
  {
    label: getMsg(this.props.lang, 'ML0067', '창고 이용'),
    value: getMsg(this.props.lang, 'ML0067', '창고 이용'),
  },
  {
    label: getMsg(this.props.lang, 'ML0066', '창고 등록'),
    value: getMsg(this.props.lang, 'ML0066', '창고 등록'),
  },
  {
    label: getMsg(this.props.lang, 'ML0068', '계약 방식'),
    value: getMsg(this.props.lang, 'ML0068', '계약 방식'),
  },
];
const navitationTitle3 = [
  {
    label: getMsg(this.props.lang, 'ML0068', '계약 방식'),
    value: getMsg(this.props.lang, 'ML0068', '계약 방식'),
  },
  {
    label: getMsg(this.props.lang, 'ML0066', '창고 등록'),
    value: getMsg(this.props.lang, 'ML0066', '창고 등록'),
  },
  {
    label: getMsg(this.props.lang, 'ML0067', '창고 이용'),
    value: getMsg(this.props.lang, 'ML0067', '창고 이용'),
  },
];
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getMsg(this.props.lang, 'ML0066', '창고 등록'),
    };
    this.navigation = props.navigation;
  }
  _valueProps = e => {
    this.setState({ page: e });
    console.log('e', e);
  };
  render() {
    const { page } = this.state;
    console.log('page', page);
    return (
      <>
        {page === getMsg(this.props.lang, 'ML0066', '창고 등록') && (
          <WarehouseRegistration
            nav={this.props.navigation}
            navitationTitle={
              <Select
                data={navitationTitle2}
                valueSelected={page}
                valueProps={e => {
                  this.setState({ page: e });
                }}
              />
            }
          />
        )}
        {page === getMsg(this.props.lang, 'ML0067', '창고 이용') && (
          <WarehouseUse
            nav={this.props.navigation}
            navitationTitle={
              <Select
                data={navitationTitle2}
                valueSelected={page}
                valueProps={e => {
                  this.setState({ page: e });
                }}
              />
            }
          />
        )}
        {page === getMsg(this.props.lang, 'ML0068', '계약 방식') && (
          <ContractMode
            nav={this.props.navigation}
            navitationTitle={
              <Select
                valueSelected={page}
                data={navitationTitle3}
                valueProps={e => {
                  this.setState({ page: e });
                }}
              />
            }
          />
        )}
      </>
    );
  }
}
