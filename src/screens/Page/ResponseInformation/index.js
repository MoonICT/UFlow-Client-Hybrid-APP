/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text, Appbar } from 'react-native-paper';

// Local Imports
import Appbars from '@Components/organisms/AppBar';

import DefaultStyle from '@Styles/default';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';

import card from '@Assets/images/card-img.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/AntDesign';

const dataStoragePeriod = [
  {
    label: '2020.10.26',
    value: '2020.10.26',
  },
  {
    label: '2020.10.27',
    value: '2020.10.27',
  },
];
const dataStoragePeriod2 = [
  {
    label: '2021.10.30',
    value: '2021.10.30',
  },
  {
    label: '2021.10.30',
    value: '2021.10.30',
  },
  {
    label: '상태3',
    value: '상태3',
  },
];

const dataInfo = [
  {
    type: '요청자',
    value: 'abc123',
  },
  {
    type: '요청 창고 유형',
    value: '보관',
  },
  {
    type: '요청 견적 금액',
    value: '577,000원',
  },
  {
    type: '견적 요청일',
    value: '2020.10.26',
  },
  {
    type: '견적 상태',
    value: '견적 응답',
    highlight: false,
  },
];
const dataInfo2 = [
  {
    type: '창고 유형',
    value: '보관창고, 수탁창고',
  },
  {
    type: '견적 금액',
    value: '보관',
  },
  {
    type: '창고 주소',
    value: '577,000원',
  },
  {
    type: '견적 요청일',
    value: '2020.10.26',
  },
  {
    type: '견적 상태',
    value: '견적 응답',
    highlight: true,
  },
];
class ResponseInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      responseArea: '',
      storageCost: '',
      expenses: '',
      visible: false,
      requestConsignment: '',
      storageFee: '',
      shipPrice: '',
      laborCost: '',
      processingPrice: '',
      courierPrice: '',
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  togglePopupInfo = () => this.setState({ visible: !this.state.visible });

  hidePopupInfo = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  render() {
    const { route } = this.props;
    const typeWH = route && route.params && route.params.typeWH;
    const {
      storagePeriodStart,
      storagePeriodEnd,
      responseArea,
      storageCost,
      expenses,
      visible,
      requestConsignment,
      storageFee,
      shipPrice,
      laborCost,
      processingPrice,
      courierPrice,
    } = this.state;
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="견적 응답"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[DefaultStyle._cards, SS.body]}>
            <View style={[DefaultStyle._titleCard, SS.title]}>
              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  { paddingBottom: 0, marginRight: 4 },
                ]}>
                견적 응답 정보
              </Text>
              <TouchableOpacity
                style={{ justifyContent: 'flex-start' }}
                onPress={() => {
                  this.togglePopupInfo();
                }}>
                <Icon name={'exclamationcircleo'} color={'#2196f3'} size={14} />
              </TouchableOpacity>
              {visible === true ? (
                <View style={SS.popupInfo}>
                  <TouchableOpacity
                    style={SS.btnClose}
                    onPress={() => {
                      this.hidePopupInfo();
                    }}>
                    <Icon
                      name={'close'}
                      color={'rgba(0, 0, 0, 0.23)'}
                      size={14}
                    />
                  </TouchableOpacity>
                  <Text style={DefaultStyle._textDF2}>보관기간</Text>
                  <Text style={[DefaultStyle._textDF, { marginBottom: 13 }]}>
                    -보관 가능 기간 내에서 보관 기간을 선택해 주세요.
                  </Text>
                  <Text style={DefaultStyle._textDF2}>응답면적</Text>
                  <Text style={[DefaultStyle._textDF, { marginBottom: 20 }]}>
                    -응답 가능한 면적 내에서 답변을해 주세요.
                  </Text>
                </View>
              ) : null}
            </View>

            {typeWH === 'Trust' ? (
              <Fragment>
                <View style={[S.row, { justifyContent: 'center' }]}>
                  <View style={{ flex: 1 }}>
                    <Select
                      data={dataStoragePeriod}
                      colorLabel="#000000"
                      labelSelected="수탁 기간 "
                      style={SS.select}
                      valueProps={e => this.setState({ storagePeriodStart: e })}
                    />
                  </View>
                  <Text style={SS.hyphen}>-</Text>

                  <View style={{ flex: 1 }}>
                    <Select
                      data={dataStoragePeriod2}
                      style={SS.select}
                      valueProps={e => this.setState({ storagePeriodEnd: e })}
                    />
                  </View>
                </View>
                <TextField
                  colorLabel="#000000"
                  labelTextField="수탁 요청 사항"
                  valueProps={e => this.setState({ requestConsignment: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="보관비"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ storageFee: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="입고단가"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ expenses: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="출고단가"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ shipPrice: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="인건단가"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ laborCost: e })}
                />

                <TextField
                  colorLabel="#000000"
                  labelTextField="가공단가"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ processingPrice: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="택배단가 "
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ courierPrice: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="추가 요청 사항"
                  placeholder="내용입력"
                  numberOfLines={5}
                  multiline={true}
                  valueProps={e => this.setState({ additionalRequests: e })}
                />
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    // this.navigation.navigate('ResponseInformation');
                    console.log('submit :>> ');
                  }}
                  style={[
                    DefaultStyle._btnInline,
                    storagePeriodStart !== '' &&
                    storagePeriodEnd !== '' &&
                    requestConsignment !== '' &&
                    storageFee !== '' &&
                    shipPrice !== '' &&
                    laborCost !== '' &&
                    processingPrice !== '' &&
                    expenses !== ''
                      ? null
                      : SS.btnDisabled,
                  ]}
                  disabled={
                    storagePeriodStart !== '' &&
                    storagePeriodEnd !== '' &&
                    requestConsignment !== '' &&
                    storageFee !== '' &&
                    shipPrice !== '' &&
                    laborCost !== '' &&
                    processingPrice !== '' &&
                    expenses !== ''
                      ? false
                      : true
                  }>
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      SS.textSubmit,
                      storagePeriodStart !== '' &&
                      storagePeriodEnd !== '' &&
                      requestConsignment !== '' &&
                      storageFee !== '' &&
                      shipPrice !== '' &&
                      laborCost !== '' &&
                      processingPrice !== '' &&
                      expenses !== ''
                        ? null
                        : SS.textDisabled,
                    ]}>
                    확인
                  </Text>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <Fragment>
                <View style={[S.row, { justifyContent: 'center' }]}>
                  <View style={{ flex: 1 }}>
                    <Select
                      data={dataStoragePeriod}
                      colorLabel="#000000"
                      labelSelected="보관유형"
                      style={SS.select}
                      valueProps={e => this.setState({ storagePeriodStart: e })}
                    />
                  </View>
                  <Text style={SS.hyphen}>-</Text>

                  <View style={{ flex: 1 }}>
                    <Select
                      data={dataStoragePeriod2}
                      style={SS.select}
                      valueProps={e => this.setState({ storagePeriodEnd: e })}
                    />
                  </View>
                </View>
                <TextField
                  colorLabel="#000000"
                  labelTextField="응답 면적"
                  textRight="m2"
                  placeholder="0"
                  valueProps={e => this.setState({ responseArea: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="보관비 (평)"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ storageCost: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="관리비"
                  textRight="원"
                  placeholder="0"
                  valueProps={e => this.setState({ expenses: e })}
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="추가 요청 사항"
                  placeholder="내용입력"
                  numberOfLines={5}
                  multiline={true}
                  valueProps={e => this.setState({ additionalRequests: e })}
                />
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    // this.navigation.navigate('ResponseInformation');
                    console.log('submit :>> ');
                  }}
                  style={[
                    DefaultStyle._btnInline,
                    storagePeriodStart !== '' &&
                    storagePeriodEnd !== '' &&
                    responseArea !== '' &&
                    storageCost !== '' &&
                    expenses !== ''
                      ? null
                      : SS.btnDisabled,
                  ]}
                  disabled={
                    storagePeriodStart !== '' &&
                    storagePeriodEnd !== '' &&
                    responseArea !== '' &&
                    storageCost !== '' &&
                    expenses !== ''
                      ? false
                      : true
                  }>
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      SS.textSubmit,
                      storagePeriodStart !== '' &&
                      storagePeriodEnd !== '' &&
                      responseArea !== '' &&
                      storageCost !== '' &&
                      expenses !== ''
                        ? null
                        : SS.textDisabled,
                    ]}>
                    확인
                  </Text>
                </TouchableOpacity>
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
    imageStore: state.registerWH.imageData,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResponseInformation);
