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

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '../../../actions';
import { styles as S } from '../style';
import { styles as SS } from './style';

const dataEstimate = [
  {
    type: '창고명',
    value: '에이씨티앤코아물류',
  },
  {
    type: '창고주',
    value: '(주)에이씨티앤코아물류',
  },
  {
    type: '위치',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '선택 창고 유형',
    value: '수탁 요청',
    highlight: true,
  },
  {
    type: '보관유형',
    value: '상온',
  },
  {
    type: '정산단위',
    value: '파렛트',
  },
  {
    type: '산정기준',
    value: '회',
  },
  {
    type: '가용면적',
    value: '12,000평',
    note: '(실면적+공용면적)',
  },

  {
    type: '수탁 가능기간',
    value: '2020.10.10 - 2021.10.10)',
  },
  {
    type: '보관료',
    value: '입고비(5,000원)',
  },
  {
    type: '관리비',
    value:
      '입고비(5,000원), 출고비( 5,000원), 인건비(1,000원), 가공비(1,000원), 택배비(1,000원), 운송비(1,000원)',
  },
];

const dataRequest = [
  {
    type: '요청 일시',
    value: '2020.10.26',
  },
  {
    type: '요청 보관기간',
    value: '2020.11.10 - 2021.01.10',
  },
  {
    type: '정산단위',
    value: '파렛트',
  },
  {
    type: '산정기준',
    value: '회',
  },
  {
    type: '요청 입고비',
    value: '1,000평',
  },
  {
    type: '정산단요청 출고비위',
    value: '19,000원',
  },
  {
    type: '요청 인건비',
    value: '일반관리비(7,000원)',
  },
  {
    type: '요청 가공비',
  },
  {
    type: '요청 택배비',
    value: '일반관리비(7,000원)',
  },
  {
    type: '요청 운송비',
  },
  {
    type: '제품 종류',
  },
  {
    type: '제품 높이',
  },
  {
    type: '추가 요청 사항',
  },
];

const dataReply = [
  {
    type: '요청 일시',
    value: '2020.10.26',
  },
  {
    type: '요청 보관기간',
    value: '2020.11.10 - 2021.01.10',
  },
  {
    type: '정산단위',
    value: '회',
  },
  {
    type: '산정기준',
    value: '파렛트',
  },
  {
    type: '입고비',
  },
  {
    type: '출고비',
    value: ' 20,000원',
  },
  {
    type: '인건비',
    value: '일반관리비(7,000원)',
  },
  {
    type: '가공비',
  },
  {
    type: '택배비',
    value: '일반관리비(7,000원)',
  },
  {
    type: '운송비',
  },
  {
    type: '제품 종류',
  },
  {
    type: '제품 높이',
  },
  {
    type: '추가 요청 사항',
  },
];
class QuotationTrust extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      system: 'UF 시스템',
      term: '1년',
      settlement: '',
      deadline: '',
      escrow: 'UF 에스크로',
    };

    this.navigation = props.navigation;
  }
  render() {
    // const { imageStore } = this.props;
    const { route } = this.props;
    console.log('route', route);
    const dataSelect = [
      {
        label: '2020.10.26 (1차)',
        value: '2020.10.26 (1차)',
      },
      {
        label: '2020.10.26 (1차)2',
        value: '2020.10.26 (1차)2',
      },
    ];
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="마이페이지"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCardTitle}>
                <View style={S.avatarHeader} />
              </View>
              <View
              // style={DefaultStyle._bodyCard}
              >
                <View style={DefaultStyle._infoTable}>
                  <TableInfo data={dataEstimate} />
                </View>
              </View>
            </View>
          </View>

          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <View style={[DefaultStyle._titleCard, SS.titleCustom]}>
              <Text style={DefaultStyle._textTitleCard}>견적 요청 정보</Text>
              <View style={DefaultStyle.rightTitleHeader}>
                <Select data={dataSelect} style={SS.optionSelect} />
              </View>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._infoTable}>
                <TableInfo data={dataRequest} />
              </View>
            </View>
            <View style={DefaultStyle._footerCards}>
              <Text style={SS.amount}>예상 견적 금액</Text>
              <Text style={SS.total}>577,000원</Text>
            </View>
          </View>

          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            {route.params.status === 'notAnswerd' ? (
              <Fragment>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>
                  </View>
                  <Text style={S.noticeWaitting}>
                    창고주가 보내주신 견적 요청서를 확인하고 있습니다. 견적
                    응답이 올 때까지 잠시만 기다려 주세요.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.navigation.navigate('RegisterWH');
                    // this.props.dataAction(this.state);
                  }}
                  style={S.btnConfirm}
                  disabled={this.state.checked ? false : true}>
                  <Text style={S.textConfirm}>견적 재요청</Text>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <Fragment>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>
                  </View>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataReply} />
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={SS.amount}>예상 견적 금액</Text>
                  <Text style={SS.total}>605,000원</Text>
                </View>

                <View style={DefaultStyle._listBtn}>
                  <TouchableOpacity
                    style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
                    onPress={() => console.log('취소하기')}>
                    <Text style={DefaultStyle._textButton}>취소하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
                    onPress={() => this.navigation.navigate('ConfirmPass')}>
                    <Text
                      style={[
                        DefaultStyle._textButton,
                        DefaultStyle._textInline,
                      ]}>
                      탈퇴하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
)(QuotationTrust);
