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

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};

    this.navigation = props.navigation;
  }
  render() {
    // const { imageStore } = this.props;
    const { route } = this.props;
    const dataEstimate = route && route.params && route.params.dataEstimate;
    const dataRequest = route && route.params && route.params.dataRequest;
    const dataReply = route && route.params && route.params.dataReply;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    console.log('route3333', route);
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
            <View style={[DefaultStyle._titleCard, DefaultStyle._titleStatus]}>
              <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>
              {route.params &&
              route.params.statusRequestQuote === 'Processing' ? (
                <Text style={DefaultStyle._statusProcessing}>계약 진행 중</Text>
              ) : type === 'ProprietorMypage' ? (
                <Text
                  style={[
                    DefaultStyle._statusProcessing,
                    { backgroundColor: 'rgba(0, 0, 0, 0.54)' },
                  ]}>
                  응답 완료
                </Text>
              ) : (
                <Text
                  style={[
                    DefaultStyle._statusProcessing,
                    DefaultStyle._statusSuccess,
                  ]}>
                  계약 완료
                </Text>
              )}
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
                    {type === 'ProprietorMypage' ? (
                      <TouchableOpacity
                        onPress={() => {
                          // this.props.dataAction(this.state);
                          this.navigation.navigate('ResponseInformation',{typeWH});
                        }}
                        style={[
                          DefaultStyle._btnOutline,
                          { flex: 0, marginRight: 16 },
                        ]}
                        // disabled={this.state.checked ? false : true}
                      >
                        <Text style={DefaultStyle._textButton}>
                          견적 응답하기
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <Text style={S.noticeWaitting}>
                    {type === 'ProprietorMypage'
                      ? '아직 응답하지 않았습니다.'
                      : '  창고주가 보내주신 견적 요청서를 확인하고 있습니다. 견적 응답이 올 때까지 잠시만 기다려 주세요.'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    console.log('견적 재요청 :>> ');
                  }}
                  style={[
                    type === 'ProprietorMypage'
                      ? DefaultStyle._btnInline
                      : DefaultStyle._btnOutline,
                  ]}
                  // disabled={this.state.checked ? false : true}
                >
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      type === 'ProprietorMypage'
                        ? DefaultStyle._textInline
                        : null,
                    ]}>
                    견적 재요청
                  </Text>
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
)(Quotation);
