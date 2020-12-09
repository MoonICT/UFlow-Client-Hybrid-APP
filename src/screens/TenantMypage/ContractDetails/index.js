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
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Entypo';

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
    value: '1200평',
  },
  {
    type: '보관 가능기간',
    value: '2020.10.10 - 2021.10.10',
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

const dataInfo = [
  {
    type: '계약서 등록일시',
    value: '2020.11.11',
  },
  {
    type: '보험계약 가입 여부',
  },
  {
    type: '첨부 서류',
    value: '사업자등록증(사본).pdf',
  },
];
class ContractDetails extends Component {
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

    const footerBtn =
      route.params && route.params.type === 'TrustRequest' ? (
        <Fragment>
          <TouchableOpacity
            style={[
              DefaultStyle.btnSubmit,
              DefaultStyle.activeBtnSubmit,
              S.btnMess,
            ]}
            onPress={() => this.navigation.navigate('Chatting')}>
            <Icon name="chat" size={20} color="#fff" />
            <Text
              style={[
                DefaultStyle.textSubmit,
                DefaultStyle.textActiveSubmit,
                { paddingLeft: 10 },
              ]}>
              채팅 바로가기
            </Text>
          </TouchableOpacity>
          <View
            style={[DefaultStyle._listBtn, { marginTop: 12, marginBottom: 8 }]}>
            <TouchableOpacity
              style={[
                DefaultStyle._btnOutline,
                DefaultStyle._btnLeft,
                { borderColor: '#000000' },
              ]}
              onPress={() => console.log('계약 요청 취소')}>
              <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                계약 요청 취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[DefaultStyle._btnOutline, DefaultStyle._btnRight]}
              onPress={() => this.navigation.navigate('StorageAgreement')}>
              <Text style={[DefaultStyle._textButton]}>계약서 작성</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      ) : (
        <View
          style={[DefaultStyle._listBtn, { marginTop: 12, marginBottom: 8 }]}>
          <TouchableOpacity
            style={[
              DefaultStyle._btnOutline,
              DefaultStyle._btnLeft,
              { borderColor: '#000000' },
            ]}
            onPress={() => console.log('계약 요청 취소')}>
            <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
              계약 요청 취소
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[DefaultStyle._btnInline, DefaultStyle._btnRight, S.btnMess]}
            onPress={() => this.navigation.navigate('Chatting')}>
            <Icon name="chat" size={20} color="#fff" />
            <Text
              style={[
                DefaultStyle.textSubmit,
                DefaultStyle.textActiveSubmit,
                { paddingLeft: 10 },
              ]}>
              채팅 바로가기
            </Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="계약 조건"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <View style={[DefaultStyle._titleCard, DefaultStyle._titleStatus]}>
              <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>
              {route.params && route.params.statusContact === 'Processing' ? (
                <Text style={DefaultStyle._statusProcessing}>계약 진행 중</Text>
              ) : (
                <Text style={[DefaultStyle._statusProcessing, DefaultStyle._statusSuccess]}>계약 완료</Text>
              )}
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCardTitle}>
                <View style={S.avatarHeader} />
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo data={dataEstimate} />
              </View>
            </View>
            <View style={DefaultStyle._footerCards}>
              <Text style={SS.amount}>예상 견적 금액</Text>
              <Text style={SS.total}>577,000원</Text>
            </View>

            <CardMypage
              onPressHeader={() => {}}
              headerTitle={'계약 정보'}
              data={dataInfo}
              borderRow={false}
              styleLeft={S.styleLeftTable}
              styleRight={S.styleRightTable}
              bgrImage={false}
            />
            {footerBtn}
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
)(ContractDetails);
