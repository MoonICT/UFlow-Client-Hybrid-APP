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
import { Appbar, Card, Text, RadioButton } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import CardMypage from '@Components/organisms/CardMypage';
import TextField from '@Components/organisms/TextField';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Fontisto';
import card from '@Assets/images/card-img.png';

import { styles as S } from '../style';
import { styles as SS } from './style';

const data = [
  {
    title: '견적･계약 관리',
  },
  {
    title: '입･출고 관리',
  },
  {
    title: '창고조회',
  },
  {
    title: '창고등록',
  },
  {
    title: '창고등록5',
  },
  {
    title: '창고등록6',
  },
];
const dataStart = [
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD',
  },
];
const dataEnd = [
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD',
  },
  {
    label: 'YYYY.MM.DD2',
    value: 'YYYY.MM.DD2',
  },
];
const dataAll = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '2전체',
    value: '2전체',
  },
];

const dataInfo = [
  {
    type: '창고 주소',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '수탁 기간',
    value: '2020.10.26 - 2020.12.09',
  },
  {
    type: '진행 상태',
    value: '수탁 진행 중',
    highlight: true,
  },
  {
    type: '입출고료 합계',
    value: '0원',
  },
];
const dataCompletion = [
  {
    type: '창고 주소',
    value: '서울특별시 성동구 성수2가 3동 279-25',
  },
  {
    type: '수탁 기간',
    value: '2020.10.26 - 2020.12.09',
  },
  {
    type: '진행 상태',
    value: '수탁 완료',
    highlight: false,
  },
  {
    type: '입출고료 합계',
    value: '1,900,000원',
  },
];
class InOutManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};

    this.navigation = props.navigation;
  }
  render() {
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
            입･출고 관리
          </Text>
        </View>
        <Text style={SS.infoContent}>
          수탁 계약이 완료된 창고의 입고, 출고 내역을 확인해 주세요.
        </Text>

        <View style={S.filter}>
          <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
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
            styleProps={DefaultStyle._inputSearch}
            placeholder="검색어를 입력해 주세요."
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
          onPressHeader={() => this.navigation.navigate('DetailsManager')}
          headerTitle={'에이씨티앤코아물류'}
          data={dataInfo}
          borderRow={false}
          styleLeft={S.styleLeftTable}
          styleRight={S.styleRightTable}
          bgrImage={card}
          footer={
            <View
              style={[
                DefaultStyle._listBtn,
                { marginTop: 0, marginBottom: 0 },
              ]}>
              <TouchableOpacity
                style={[DefaultStyle._btnInline, DefaultStyle._btnLeft]}
                onPress={() => this.showConfirm()}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  입고요청
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  DefaultStyle._btnInline,
                  DefaultStyle._btnRight,
                  { backgroundColor: '#e64a19' },
                ]}
                onPress={() => console.log('출고 요청')}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  출고 요청
                </Text>
              </TouchableOpacity>
            </View>
          }
        />

        <CardMypage
          onPressHeader={() => this.navigation.navigate('DetailsManager')}
          headerTitle={'에이씨티앤코아물류3'}
          data={dataCompletion}
          borderRow={false}
          styleLeft={S.styleLeftTable}
          styleRight={S.styleRightTable}
          bgrImage={card}
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
    imageStore: state.registerWH.pimages,
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
)(InOutManager);
