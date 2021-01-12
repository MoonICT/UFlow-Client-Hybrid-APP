/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text } from 'react-native-paper';
import moment from 'moment';
import { StringUtils, ContractUtils } from '@Services/utils';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TableInfo from '@Components/atoms/TableInfo';
import warehouse1 from '@Assets/images/warehouse-1.png';
import ContractInformation from './ContractInformation';
import { styles as S } from '../style';
import {
  Warehouse,
  MyPageEstmtCntr,
  Contract,
} from '@Services/apis';

class RequestContract extends Component {
  constructor (props) {
    super(props);
    this.state = {
      detailContract: '', // 계약 기본 정보.
      detailEstimate: '', // 계약 기본 정보

      keepTrustContract: '', // keep|trust
      keepTrustEstimate: '', // keep|trust

      dataKeep: [],
      dataTrust: [],

      contractLink: '',
    };
    this.navigation = props.navigation;
  }

  render () {
    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let type = this.props.route.params.type.toLowerCase(); // owner | tenant
    let contractType = this.props.route.params.typeWH.toLowerCase(); // keep | trust
    let rentUserNo = this.props.route.params.rentUserNo;
    const status = this.props.route.params.status;

    const { dataTrust, dataKeep, detailEstimate, keepTrustContract } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="견적･계약 관리"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={DefaultStyle._body}>
            <View style={[DefaultStyle._titleBody, DefaultStyle._titleStatus]}>
              <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>
              <Text
                style={[
                  DefaultStyle._statusProcessing,
                  status === '5100' ? { backgroundColor: '#4caf50' } : '',
                ]}>
                {ContractUtils.coverStatus(status) && ContractUtils.coverStatus(status).processingTrust &&
                contractType === 'trust'
                  ? ContractUtils.coverStatus(status).processingTrust
                  : ContractUtils.coverStatus(status).processing}
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                {/** TODO Bug2-1 보관 상태에 따라 이미지 변경 */}
                <Image source={warehouse1} style={DefaultStyle._avatarHeader} />
              </View>
              <View>
                <View style={DefaultStyle._infoTable}>
                  {(contractType === 'keep' && dataKeep) ?
                    <TableInfo data={dataKeep} /> :
                    <TableInfo data={dataTrust} />}
                </View>
              </View>
            </View>
            {contractType === 'keep' ? (
              <View style={[DefaultStyle._body, DefaultStyle._margin0]}>
                <View style={DefaultStyle._footerCards}>
                  <Text style={S.amount}>예상 견적 금액</Text>
                  <Text style={S.total}>
                    {(keepTrustContract) ?
                      StringUtils.moneyConvert(Number(keepTrustContract.splyAmount) + Number(keepTrustContract.mgmtChrg)) : '-'}
                  </Text>
                </View>
              </View>
            ) : null}

            {keepTrustContract ?
              <ContractInformation
                navigation={this.navigation}
                detailEstimate={detailEstimate} // 계약 기본 정보
                keepTrustContract={keepTrustContract} // keep|trust
                type={type}
                contractType={contractType}
                status={status}
                rentUserNo={rentUserNo}
                warehSeq={warehSeq}
              /> : <></>}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let type = this.props.route.params.type.toLowerCase(); // owner | tenant
    let contractType = this.props.route.params.typeWH.toLowerCase(); // keep | trust
    let rentUserNo = this.props.route.params.rentUserNo;

    if (type === 'owner') {
      /**
       * 마이페이지 견적보관 상세정보 (창고주 전용)
       * */
      await MyPageEstmtCntr.getDetailEstmtCntrOwner({
        warehouseRegNo: warehouseRegNo,
        contractType: contractType,
        warehSeq: warehSeq,
        rentUserNo: rentUserNo,
      }).then(async (res) => {
        let resultData = res;
        this.setState({ detailContract: resultData });

        // 견적 완료, 계약 진행 중일 때.
        let estmtData = resultData.estmtKeeps || resultData.estmtTrusts;
        await Contract.getContractKeep({
          type: 'owner',
          contractType: contractType,
          idWarehouse: warehouseRegNo,
          rentUserNo: estmtData[estmtData.length - 1].rentUserNo,
          cntrYmdFrom: moment(estmtData[estmtData.length - 1].from).format('YYYYMMDD',),
        }).then(res => {
          let resultEstmtData = {
            warehouse: resultData.warehouse,
            [contractType === 'keep' ? 'estmtKeeps' : 'estmtTrusts']: res,
          };

          // console.debug('[3] 견적 완료, 계약 진행 중일 때.1 : ', res);
          this.setState({
            detailEstimate: resultEstmtData,
            keepTrustContract: res, // keep|trust
            keepTrustEstimate: contractType === 'keep' ? res.whrgMgmtKeep : res.whrgMgmtTrust, // keep|trust
          });
        });
      })
        .catch(err => {
          console.log(err);
        });
    } else if (type === 'tenant') {
      /**
       * [estimate-4] 마이페이지 견적보관 상세정보 (임차인 전용)
       */
      await MyPageEstmtCntr.getDetailEstmtCntrTenant({
        warehouseRegNo: warehouseRegNo,
        contractType: contractType,
        warehSeq: warehSeq,
      }).then(async (res) => {
        let resultData = res
        this.setState({ detailContract: resultData })

        // 견적 완료, 계약 진행 중일 때.
        let estmtData = resultData.estmtKeeps || resultData.estmtTrusts
        await Contract.getContractKeep({
          type: 'tenant',
          contractType: contractType,
          idWarehouse: warehouseRegNo,
          rentUserNo: estmtData[estmtData.length - 1].rentUserNo,
          cntrYmdFrom: moment(estmtData[estmtData.length - 1].from).format('YYYYMMDD'),
        }).then(res => {
          let resultEstmtData = {
            warehouse: resultData.warehouse,
            [contractType === 'keep' ? 'estmtKeeps' : 'estmtTrusts']: res,
          };

          // console.debug('[3] 견적 완료, 계약 진행 중일 때.1 :  ', resultEstmtData)
          this.setState({
            detailEstimate: resultEstmtData,
            keepTrustContract: res, // keep|trust
            keepTrustEstimate: contractType === 'keep' ? res.whrgMgmtKeep : res.whrgMgmtTrust, // keep|trust
          });
        });
      });
    }

    const { detailEstimate, keepTrustContract, keepTrustEstimate } = this.state;

    // console.log('check 1', detailEstimate)
    // console.log('check 2', keepTrustContract)
    // console.log('check 3', keepTrustEstimate)
    // console.log('check 4', contractType)
    if (detailEstimate && keepTrustContract && contractType === 'keep') {

      this.setState({
        dataKeep: [
          {
            type: '창고명',
            value: detailEstimate ? detailEstimate.warehouse.warehouse : '-',
          },
          {
            type: '창고주',
            value: detailEstimate ? detailEstimate.warehouse.owner : '-',
          },
          {
            type: '위치',
            value: detailEstimate ? detailEstimate.warehouse.address : '-',
          },
          {
            type: '계약유형',
            value: '임대(보관)',
            highlight: true,
          },
          {
            type: '보관유형',
            value: keepTrustEstimate.typeCode.stdDetailCodeName,
          },
          {
            type: '전용면적',
            value: detailEstimate.warehouse.prvtArea ? detailEstimate.warehouse.prvtArea.toLocaleString() + " ㎡" : "-",
          },
          {
            type: '임대 가능 기간',
            value: StringUtils.dateStr(keepTrustContract.id.cntrYmdFrom) + '~' + StringUtils.dateStr(keepTrustContract.cntrYmdTo),
          },
          {
            type: '보관단가',
            value: StringUtils.moneyConvert(keepTrustContract.splyAmount),
          },
          {
            type: '관리단가',
            value: StringUtils.moneyConvert(keepTrustContract.mgmtChrg),
          },
        ],
      });
    }

    if (detailEstimate && keepTrustContract && contractType === 'trust') {
      this.setState({
        dataTrust: [
          {
            type: '창고명',
            value: detailEstimate ? detailEstimate.warehouse.warehouse : '',
          },
          {
            type: '창고주',
            value: detailEstimate ? detailEstimate.warehouse.owner : '',
          },
          {
            type: '위치',
            value: detailEstimate ? detailEstimate.warehouse.address : '',
          },
          {
            type: '계약유형',
            value: '수탁',
            highlight: true,
          },
          {
            type: '가용수량',
            value: keepTrustContract.cntrValue ? keepTrustContract.cntrValue : '0',
          },
          {
            type: '수탁 가능 기간',
            value: StringUtils.dateStr(keepTrustContract.id.cntrYmdFrom) + '~' + StringUtils.dateStr(keepTrustContract.cntrYmdTo),
          },
          {
            type: '보관단가',
            value: StringUtils.moneyConvert(keepTrustContract.splyAmount),
          },
          {
            type: '가공단가',
            value: StringUtils.moneyConvert(keepTrustContract.mnfctChrg),
          },
          {
            type: '인건단가',
            value: StringUtils.moneyConvert(keepTrustContract.psnChrg),
          },
          {
            type: '입고단가',
            value: StringUtils.moneyConvert(keepTrustContract.whinChrg),
          },
          {
            type: '출고단가',
            value: StringUtils.moneyConvert(keepTrustContract.whoutChrg),
          },
          {
            type: '택배단가',
            value: StringUtils.moneyConvert(keepTrustContract.dlvyChrg),
          },
          {
            type: '운송단가',
            value: StringUtils.moneyConvert(keepTrustContract.shipChrg),
          },
        ],
      });
    }

  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestContract);
