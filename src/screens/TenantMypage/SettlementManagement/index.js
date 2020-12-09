/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';

import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Fontisto';

import { styles as S } from '../style';

const dataStart = [
  {
    label: '시작일',
    value: '시작일',
  },
];
const dataEnd = [
  {
    label: '종료일',
    value: '종료일',
  },
  {
    label: '종료일2',
    value: '종료일2',
  },
];
const dataAll = [
  {
    label: '계약 유형',
    value: '계약 유형',
  },
  {
    label: '2계약 유형',
    value: '2계약 유형',
  },
];

const dataRedwood = [
  {
    type: '정산 기간',
    value: '2020.11.10 - 2021.11.10',
  },
  {
    type: '계약 유형',
    value: '수탁,보관',
  },
  {
    type: '정산 합계 (VAT포함)',
    value: '592,000원',
  },
];
const dataDongwon = [
  {
    type: '정산 기간',
    value: '2020.11.10 - 2021.11.10',
  },
  {
    type: '계약 유형',
    value: '수탁,보관',
  },
  {
    type: '정산 합계 (VAT포함)',
    value: '1,592,000원',
  },
];

class SettlementManagement extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};

    this.navigation = props.navigation;
  }

  render() {
    // const { imageStore } = this.props;
    const { route } = this.props;
    return (
      <View style={DefaultStyle._cards}>
        <View style={DefaultStyle._titleCard}>
          <Text
            style={[
              DefaultStyle._textTitleCard,
              S.textTitleTenant,
              { paddingBottom: 0 },
            ]}>
            정산 관리
          </Text>
        </View>

        <View style={S.filter}>
          <View style={[S.options, { justifyContent: 'flex-start' }]}>
            <View style={[S.optionSelect, S.optionSelectLeft]}>
              <Select data={dataStart} style={S.select} />
            </View>
            <Text style={S.hyphen}>-</Text>
            <View style={[S.optionSelect, S.optionSelectLeft]}>
              <Select data={dataEnd} style={S.select} />
            </View>
            <View style={[S.optionSelect, S.optionSelectLeft]}>
              <Select data={dataAll} style={S.select} />
            </View>
          </View>
          <TextField
            styleProps={S.searchInput}
            placeholder="창고명 검색"
            valueProps={text => console.log('text', text)}
            rightComponent={
              <Icon
                name="search"
                color="rgba(0, 0, 0, 0.54)"
                size={17}
                style={DefaultStyle._searchRightIcon}
              />
            }
          />
        </View>

        <CardMypage
          onPressHeader={() => this.navigation.navigate('DetailsSettlement')}
          headerTitle={'레드우드'}
          data={dataRedwood}
          borderBottom={true}
          borderRow={false}
          style={{ padding: 0 }}
          bgrImage={false}
          footer={
            <View
              style={[
                DefaultStyle._listBtn,
                { marginTop: 0, marginBottom: 0, padding: 16, paddingTop: 0 },
              ]}>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline]}
                onPress={() => {}}>
                <Text style={[DefaultStyle._textButton]}>거래명세서</Text>
              </TouchableOpacity>
            </View>
          }
        />
        <CardMypage
          onPressHeader={() => this.navigation.navigate('DetailsSettlement')}
          headerTitle={'동원창고'}
          data={dataDongwon}
          borderBottom={true}
          borderRow={false}
          style={{ padding: 0 }}
          bgrImage={false}
          footer={
            <View
              style={[
                DefaultStyle._listBtn,
                { marginTop: 0, marginBottom: 0, padding: 16, paddingTop: 0 },
              ]}>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline]}
                onPress={() => {}}>
                <Text style={[DefaultStyle._textButton]}>거래명세서</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettlementManagement);
