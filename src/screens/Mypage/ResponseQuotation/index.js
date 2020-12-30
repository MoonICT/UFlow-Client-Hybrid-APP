/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text, Appbar } from 'react-native-paper';

// Local Imports
import Appbars from '@Components/organisms/AppBar';

import DefaultStyle from '@Styles/default';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';
import ResponseTrust from './trust';

import card from '@Assets/images/card-img.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from '@Components/organisms/DatePicker';
import { Warehouse } from '@Services/apis';

class ResponseQuotation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      rntlValue: '',
      splyAmount: '',
      mgmtChrg: '',
      whinChrg: '',
      whoutChrg: '',
      psnChrg: '',
      mnfctChrg: '',
      dlvyChrg: '',
      shipChrg: '',
      visible: false,
      mode: 'date',
      from: new Date(),
      showFrom: false,
      to: new Date(),
      showTo: false,
      isSubmit: false,
      remark: '',
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
  showDatepicker = () => {
    this.setState({ showFrom: true });
  };

  onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.from;
    this.setState({ from: currentDate, showFrom: false });
  };
  showDatepickerTo = () => {
    this.setState({ showTo: true });
  };

  onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.to;
    this.setState({ to: currentDate, showTo: false });
  };
  render() {
    const { route } = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    const seq = route && route.params && route.params.seq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    const {
      from,
      to,
      rntlValue,
      splyAmount,
      mgmtChrg,
      visible,
      whinChrg,
      whoutChrg,
      psnChrg,
      mnfctChrg,
      dlvyChrg,
      shipChrg,
      showFrom,
      mode,
      showTo,
      isSubmit,
    } = this.state;
    console.log('routeRespon', route);
    console.log('this.state', this.state);
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

            {typeWH === 'TRUST' ? (
              <Fragment>
                <View
                  style={[
                    S.row,
                    { justifyContent: 'center', marginBottom: 18 },
                  ]}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={this.showDatepicker}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {from.toLocaleDateString()}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        수탁 기간
                      </Text>
                      <DatePicker
                        mode={mode}
                        show={showFrom}
                        onChange={this.onChangeFrom}
                        value={from}
                        testID="dateTimePicker"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={SS.hyphen}>-</Text>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={this.showDatepickerTo}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {to.toLocaleDateString()}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        수탁 기간
                      </Text>
                      <DatePicker
                        mode={mode}
                        show={showTo}
                        onChange={this.onChangeTo}
                        value={to}
                        testID="dateTimePickerTo"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TextField
                  colorLabel="#000000"
                  labelTextField="수탁 요청 사항"
                  keyboardType="numeric"
                  value={rntlValue}
                  onChangeText={e =>
                    this.setState({ rntlValue: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="보관비"
                  textRight="원"
                  keyboardType="numeric"
                  value={splyAmount}
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ splyAmount: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="입고단가"
                  textRight="원"
                  keyboardType="numeric"
                  value={whinChrg}
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ whinChrg: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="출고단가"
                  textRight="원"
                  keyboardType="numeric"
                  value={whoutChrg}
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ whoutChrg: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="인건단가"
                  keyboardType="numeric"
                  value={psnChrg}
                  textRight="원"
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ psnChrg: e.replace(/[^0-9]/g, '') })
                  }
                />

                <TextField
                  colorLabel="#000000"
                  labelTextField="가공단가"
                  textRight="원"
                  keyboardType="numeric"
                  value={mnfctChrg}
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ mnfctChrg: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="택배단가 "
                  textRight="원"
                  keyboardType="numeric"
                  value={dlvyChrg}
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ dlvyChrg: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="운송단가"
                  textRight="원"
                  keyboardType="numeric"
                  value={shipChrg}
                  placeholder="0"
                  onChangeText={e =>
                    this.setState({ shipChrg: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="추가 요청 사항"
                  placeholder="내용입력"
                  numberOfLines={5}
                  textAlignVertical="top"
                  multiline={true}
                  valueProps={e => this.setState({ remark: e })}
                />
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    // this.navigation.navigate('ResponseQuotation');
                    console.log('submit :>> ');
                  }}
                  style={[
                    DefaultStyle._btnInline,
                    from !== '' &&
                    to !== '' &&
                    rntlValue !== '' &&
                    splyAmount !== '' &&
                    whinChrg !== '' &&
                    whoutChrg !== '' &&
                    psnChrg !== '' &&
                    mnfctChrg !== '' &&
                    dlvyChrg !== '' &&
                    shipChrg !== ''
                      ? null
                      : SS.btnDisabled,
                  ]}
                  disabled={
                    from !== '' &&
                    to !== '' &&
                    rntlValue !== '' &&
                    splyAmount !== '' &&
                    whinChrg !== '' &&
                    whoutChrg !== '' &&
                    psnChrg !== '' &&
                    mnfctChrg !== '' &&
                    dlvyChrg !== '' &&
                    shipChrg !== ''
                      ? false
                      : true
                  }>
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      SS.textSubmit,
                      from !== '' &&
                      to !== '' &&
                      rntlValue !== '' &&
                      splyAmount !== '' &&
                      whinChrg !== '' &&
                      whoutChrg !== '' &&
                      psnChrg !== '' &&
                      mnfctChrg !== '' &&
                      dlvyChrg !== '' &&
                      shipChrg !== ''
                        ? null
                        : SS.textDisabled,
                    ]}>
                    확인
                  </Text>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <Fragment>
                <View
                  style={[
                    S.row,
                    { justifyContent: 'center', marginBottom: 18 },
                  ]}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={this.showDatepicker}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {from.toLocaleDateString()}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        보관 기간
                      </Text>
                      <DatePicker
                        mode={mode}
                        show={showFrom}
                        onChange={this.onChangeFrom}
                        value={from}
                        testID="dateTimePicker"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={SS.hyphen}>-</Text>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={this.showDatepickerTo}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {to.toLocaleDateString()}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        보관 기간
                      </Text>
                      <DatePicker
                        mode={mode}
                        show={showTo}
                        onChange={this.onChangeTo}
                        value={to}
                        testID="dateTimePickerTo"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TextField
                  colorLabel="#000000"
                  labelTextField="응답 면적"
                  textRight="m2"
                  keyboardType="numeric"
                  value={rntlValue}
                  placeholder="0"
                  valueProps={e =>
                    this.setState({ rntlValue: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="보관비 (평)"
                  textRight="원"
                  placeholder="0"
                  keyboardType="numeric"
                  value={splyAmount}
                  valueProps={e =>
                    this.setState({ splyAmount: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="관리비"
                  textRight="원"
                  placeholder="0"
                  keyboardType="numeric"
                  value={mgmtChrg}
                  valueProps={e =>
                    this.setState({ mgmtChrg: e.replace(/[^0-9]/g, '') })
                  }
                />
                <TextField
                  colorLabel="#000000"
                  labelTextField="추가 요청 사항"
                  placeholder="내용입력"
                  numberOfLines={5}
                  multiline={true}
                  textAlignVertical="top"
                  valueProps={e => this.setState({ remark: e })}
                />
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    // this.navigation.navigate('ResponseQuotation');
                    // console.log('submit :>> ');
                    this.setState({ isSubmit: true });
                  }}
                  style={[
                    DefaultStyle._btnInline,
                    from !== '' &&
                    to !== '' &&
                    rntlValue !== '' &&
                    splyAmount !== '' &&
                    mgmtChrg !== ''
                      ? null
                      : SS.btnDisabled,
                  ]}
                  disabled={
                    from !== '' &&
                    to !== '' &&
                    rntlValue !== '' &&
                    splyAmount !== '' &&
                    mgmtChrg !== ''
                      ? false
                      : true
                  }>
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      SS.textSubmit,
                      from !== '' &&
                      to !== '' &&
                      rntlValue !== '' &&
                      splyAmount !== '' &&
                      mgmtChrg !== ''
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
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('nextState', nextState);
  }
  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
    let warehouseRegNo =
      this.props.route && this.props.route.params.warehouseRegNo;
    let warehSeq = this.props.route && this.props.route.params.warehSeq;
    let rentUserNo = this.props.route && this.props.route.params.rentUserNo;
    const status = this.props.route && this.props.route.params.status;

    let type =
      this.props.route && this.props.route.params.type === 'OWNER'
        ? 'owner'
        : 'tenant';
    let typeWH =
      this.props.route && this.props.route.params.typeWH === 'TRUST'
        ? 'trust'
        : 'keep';
    let url =
      type +
      '/warehouse/' +
      warehouseRegNo +
      '/' +
      typeWH +
      '/' +
      warehSeq +
      '/' +
      rentUserNo;

    if (prevState.isSubmit !== this.state.isSubmit) {
      let dataState;
      this.props.route && this.props.route.params.typeWH === 'TRUST'
        ? (dataState = {
            warehouseRegNo: warehouseRegNo,
            seq: this.props.route && this.props.route.params.seq,
            from: Date.parse(this.state.from),
            to: Date.parse(this.state.to),
            rntlValue: parseInt(this.state.rntlValue),
            splyAmount: parseInt(this.state.splyAmount),
            whinChrg: parseInt(this.state.whinChrg),
            whoutChrg: parseInt(this.state.whoutChrg),
            psnChrg: parseInt(this.state.psnChrg),
            mnfctChrg: parseInt(this.state.mnfctChrg),
            dlvyChrg: parseInt(this.state.dlvyChrg),
            shipChrg: parseInt(this.state.shipChrg),
            remark: this.state.remark,
          })
        : (dataState = {
            warehouseRegNo: warehouseRegNo,
            seq: this.props.route && this.props.route.params.seq,
            from: Date.parse(this.state.from),
            to: Date.parse(this.state.to),
            rntlValue: parseInt(this.state.rntlValue),
            mgmtChrg: parseInt(this.state.mgmtChrg),
            splyAmount: parseInt(this.state.splyAmount),
            remark: this.state.remark,
          });
      Warehouse.responQuotation({
        type: url,
        data: dataState,
      })
        .then(res => {
          // const status = res.status;
          if (res.status === 200) {
            console.log('res', res);
            this.navigation.navigate('Quotation', {
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
            });
            // this.setState({ dataApi: res.data.data.content });
            // this.props.contractData({ dataApi: res.data.data.content });
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
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
)(ResponseQuotation);
