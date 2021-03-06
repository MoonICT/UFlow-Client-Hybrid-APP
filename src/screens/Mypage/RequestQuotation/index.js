/**
 * 임차인 견적 요청하기
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component, Fragment} from 'react';
import {View, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Text, Appbar, Dialog, Paragraph, Button} from 'react-native-paper';
import {StringUtils, DeepLogs} from '@Services/utils';
import ReqeustQTrust from './reqeustQTrust';
import ReqeustQKeep from './requestQKeep';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Local Imports
import Appbars from '@Components/organisms/AppBar';
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import ActionCreator from '@Actions';
import {styles as S} from '../style';
import {styles as SS} from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from '@Components/organisms/DatePicker';
import {Warehouse} from '@Services/apis';

class RequestQuotation extends Component {
  constructor(props) {
    super(props);

    console.log(props, '======props======');
    console.log(props.route.params, '======props.datadata======');
    console.log(props.route.params.data, '======props.datadata.data======');
    // console.log(props.route.params.data, '======props.route.params.data======');
    // console.log(props.route.params.data.whrgMgmtTrust, '======whrgMgmtTrust======');
    // console.log(props.route.params.data.whrgMgmtKeep, '======whrgMgmtKeep======');

    if (props.route.params.data && props.route.params.data.whrgMgmtTrust) {
      let whrgMgmtTrust = null;
      if (props.route.params.data && props.route.params.data.whrgMgmtTrust) {
        whrgMgmtTrust = props.route.params.data.whrgMgmtTrust;
        console.log(whrgMgmtTrust, 'whrgMgmtTrust');
        console.log(whrgMgmtTrust && whrgMgmtTrust.psnChrg ? whrgMgmtTrust.psnChrg : 0, 'psnChrg');
      }

      this.state = {
        rntlValue: whrgMgmtTrust && whrgMgmtTrust.usblValue ? whrgMgmtTrust.usblValue : 0,
        splyAmount: whrgMgmtTrust && whrgMgmtTrust.splyAmount ? whrgMgmtTrust.splyAmount : 0,
        mgmtChrg: whrgMgmtTrust && whrgMgmtTrust.mgmtChrg ? whrgMgmtTrust.mgmtChrg : 0,
        whinChrg: whrgMgmtTrust && whrgMgmtTrust.whinChrg ? whrgMgmtTrust.whinChrg : 0,
        whoutChrg: whrgMgmtTrust && whrgMgmtTrust.whoutChrg ? whrgMgmtTrust.whoutChrg : 0,
        psnChrg: whrgMgmtTrust && whrgMgmtTrust.psnChrg ? whrgMgmtTrust.psnChrg : 0,
        mnfctChrg: whrgMgmtTrust && whrgMgmtTrust.mnfctChrg ? whrgMgmtTrust.mnfctChrg : 0,
        dlvyChrg: whrgMgmtTrust && whrgMgmtTrust.dlvyChrg ? whrgMgmtTrust.dlvyChrg : 0,
        shipChrg: whrgMgmtTrust && whrgMgmtTrust.shipChrg ? whrgMgmtTrust.shipChrg : 0,
        visible: false,
        mode: 'date',
        from: whrgMgmtTrust && whrgMgmtTrust.usblYmdFrom ? whrgMgmtTrust.usblYmdFrom : null,
        to: whrgMgmtTrust && whrgMgmtTrust.usblYmdTo ? whrgMgmtTrust.usblYmdTo : null,
        showFrom: false,
        showTo: false,
        isSubmit: false,
        remark: '',
      };

    } else if (props.route.params.data && props.route.params.data.whrgMgmtKeep) {
      let whrgMgmtKeep = null;
      if (props.route.params.data && props.route.params.data.whrgMgmtKeep) {
        whrgMgmtKeep = props.route.params.data.whrgMgmtKeep;
        console.log(whrgMgmtKeep, 'whrgMgmtKeep');
      }

      this.state = {
        rntlValue: whrgMgmtKeep && whrgMgmtKeep.usblValue ? whrgMgmtKeep.usblValue : 0,
        splyAmount: whrgMgmtKeep && whrgMgmtKeep.splyAmount ? whrgMgmtKeep.splyAmount : 0,
        mgmtChrg: whrgMgmtKeep && whrgMgmtKeep.mgmtChrg ? whrgMgmtKeep.mgmtChrg : 0,
        visible: false,
        mode: 'date',
        from: whrgMgmtKeep && whrgMgmtKeep.usblYmdFrom ? whrgMgmtKeep.usblYmdFrom : null,
        to: whrgMgmtKeep && whrgMgmtKeep.usblYmdTo ? whrgMgmtKeep.usblYmdTo : null,
        showFrom: false,
        showTo: false,
        isSubmit: false,
        remark: '',
      };
    }
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  togglePopupInfo = () => this.setState({visible: !this.state.visible});

  hidePopupInfo = () => this.setState({visible: false});

  showConfirm = () => this.setState({visibleConfirm: true});

  hideConfirm = () => this.setState({visibleConfirm: false});


  render() {
    const {route} = this.props;
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
    console.log('routeRequest :>> ', route);

    console.log(warehSeq,'warehSeq');

    return (
      <SafeAreaView style={S.container}>

        <HistoryBackActionBar
            title={'견적 요청하기'}
            navigation={this.navigation}
          />
        <ScrollView>

          <View style={[DefaultStyle._cards, SS.body, {paddingBottom: 450}]}>

            {/** HEADER **/}
            <View style={[DefaultStyle._titleCard, SS.title]}>

              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  {paddingBottom: 0, marginRight: 4},
                ]}>
                견적 요청 정보
              </Text>

              <TouchableOpacity
                style={{justifyContent: 'flex-start'}}
                onPress={() => {
                  this.togglePopupInfo();
                }}>
                <Icon name={'exclamationcircleo'} color={'#2196f3'} size={14}/>
              </TouchableOpacity>
            </View>
            {/** END:HEADER **/}

            {/*<Text>{typeWH}</Text>*/}

            {typeWH === 'TRUST' ? (
              <ReqeustQTrust
                navigation={this.navigation}
                warehouseRegNo={warehouseRegNo}
                warehSeq={warehSeq}
                from={from}
                to={to}
                rntlValue={rntlValue}
                splyAmount={splyAmount}
                whinChrg={whinChrg}
                whoutChrg={whoutChrg}
                psnChrg={psnChrg}
                mnfctChrg={mnfctChrg}
                dlvyChrg={dlvyChrg}
                shipChrg={shipChrg}
              />
            ) : (
              <ReqeustQKeep
                navigation={this.navigation}
                warehouseRegNo={warehouseRegNo}
                warehSeq={warehSeq}
                from={from}
                to={to}
                rntlValue={rntlValue}
                splyAmount={splyAmount}
                mgmtChrg={mgmtChrg}
              />
            )}
          </View>
        </ScrollView>
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.togglePopupInfo}>
          <Dialog.Content>

          </Dialog.Content>

          <Dialog.Content>
            <Text style={DefaultStyle._textDF2}>보관기간</Text>
            <Text style={[DefaultStyle._textDF, {marginBottom: 13}]}>
              -수탁가능기간 내에서 수탁기간을 선택해 주세요.
            </Text>
            {/*<Text style={DefaultStyle._textDF2}>응답면적</Text>*/}
            {/*<Text style={[DefaultStyle._textDF, {marginBottom: 20}]}>*/}
            {/*  /!*-응답 가능한 면적 내에서 답변을해 주세요.*!/*/}
            {/*</Text>*/}
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={this.togglePopupInfo}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::ResponseQuotation:componentDidMount::');


    console.log(this.props.data, '======props.data======');

    // DeepLogs.log(this.props.route.params , 'this.props ResponseQuotation : this.props.params')

    const warehouseRegNo = this.props.route.params.warehouseRegNo;
    if (!warehouseRegNo) {
      alert('창고 ID가 존재하지 않습니다. 잘못된 접근입니다.');
    }


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
    let urlTenant =
      type + '/warehouse/' + warehouseRegNo + '/' + typeWH + '/' + warehSeq;

    if (prevState.isSubmit !== this.state.isSubmit) {
      let dataState;
      this.props.route && this.props.route.params.typeWH === 'TRUST'
        ? (dataState = {
          warehouseRegNo: warehouseRegNo,
          seq: warehSeq,
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
          seq: warehSeq,
          from: Date.parse(this.state.from),
          to: Date.parse(this.state.to),
          rntlValue: parseInt(this.state.rntlValue),
          mgmtChrg: parseInt(this.state.mgmtChrg),
          splyAmount: parseInt(this.state.splyAmount),
          remark: this.state.remark,
        });
      Warehouse.responQuotation({
        type: this.props.route.params.type === 'OWNER' ? url : urlTenant,
        data: dataState,
      })
        .then(res => {
          // const status = res.status;
          console.log('resRespon', res);
          if (res.status === 200) {
            console.log('res', res);
            this.navigation.navigate('Quotation', {
              typeWH: this.props.route.params.typeWH,
              type: this.props.route.params.type,
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
          let message = err.response && err.response.data.message;
          this.props.showPopup({
            type: 'confirm',
            content: message,
          });
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
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestQuotation);
