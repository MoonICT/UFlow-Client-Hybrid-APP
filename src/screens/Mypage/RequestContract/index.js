/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, View, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, Text} from 'react-native-paper';
import moment from 'moment';
import {StringUtils, ContractUtils} from '@Services/utils';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TableInfo from '@Components/atoms/TableInfo';
import ContractInformation from './ContractInformation';
import {styles as S} from '../style';

import imgType0001 from '@Assets/images/type-0001.png';
import imgType0002 from '@Assets/images/type-0002.png';
import imgType0003 from '@Assets/images/type-0003.png';
import imgType0004 from '@Assets/images/type-0004.png';
import imgType9100 from '@Assets/images/type-9100.png';

import {
  Warehouse,
  MediaFileContract,
  MyPageEstmtCntr,
  Contract,
} from '@Services/apis';

class RequestContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailContract: '', // 계약 기본 정보.
      detailEstimate: '', // 계약 기본 정보

      keepTrustContract: '', // keep|trust
      keepTrustEstimate: '', // keep|trust

      dataKeep: [],
      dataTrust: [],

      contractLink: '',
      imgType: null,
    };
    this.navigation = props.navigation;
  }

  /**
   * 보관/수탁 정보 추출.
   * */
  getContract = () => {
    if (this.state.detailEstimate) {
      if (this.state.detailEstimate.estmtKeeps) {
        return this.state.detailEstimate.estmtKeeps;
      }
      if (this.state.detailEstimate.estmtTrusts) {
        return this.state.detailEstimate.estmtTrusts;
      }
    }
  };

  /**
   *  보관/수탁 결정 견 정보 추출.
   * */
  getEstimate = (data) => {
    if (data) {
      if (data.estmtKeeps) {
        return data.estmtKeeps.whrgMgmtKeep;
      }
      if (data.estmtTrusts) {
        return data.estmtTrusts.whrgMgmtTrust;
      }
    }
  };

  render() {
    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let type = this.props.route.params.type.toLowerCase(); // owner | tenant
    let contractType = this.props.route.params.typeWH.toLowerCase(); // keep | trust
    let rentUserNo = this.props.route.params.rentUserNo;
    const status = this.props.route.params.status;

    const {dataTrust, dataKeep, detailEstimate, keepTrustContract} = this.state;

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
                  status === '5100' ? {backgroundColor: '#4caf50'} : '',
                ]}>
                {ContractUtils.coverStatus(status) && ContractUtils.coverStatus(status).processingTrust &&
                contractType === 'trust'
                  ? ContractUtils.coverStatus(status).processingTrust
                  : ContractUtils.coverStatus(status).processing}
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                {this.state.imgType &&
                  <Image source={this.state.imgType} style={DefaultStyle._avatarHeader}/>
                }
              </View>
              <View>
                <View style={DefaultStyle._infoTable}>
                  {(contractType === 'keep' && dataKeep) ?
                    <TableInfo data={dataKeep}/> :
                    <TableInfo data={dataTrust}/>}
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

                // detailContract={this.state.detailContract}
                // detailEstimate={keepTrustContract}

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
  async componentDidMount() {
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
        this.setState({detailContract: resultData});

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
        this.setState({detailContract: resultData})

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

    // TODO 밑에 확인
    let url = type + '/' + warehouseRegNo + '-' + warehSeq + '/' + contractType + '/' + rentUserNo;

    let urlTenant = type + '/' + warehouseRegNo + '-' + warehSeq + '/' + contractType;

    await Warehouse.quotation(
      this.props.route.params.type === 'OWNER' ? url : urlTenant,
    )
      .then(res => {
        if (res.status === 200) {
          console.log('계약 상세 데이터', res.data);
          this.setState(
            {
              dataApi: res.data,
            },
            () => {
            },
          );
          // this.props.quotationData(res.data);
        }
      })
      .catch(err => {
        console.log('errRequest', err);
      });
    const {detailEstimate, keepTrustContract, keepTrustEstimate} = this.state;

    if (detailEstimate && keepTrustContract && contractType === 'keep') {

      this.setState({
        dataKeep: ContractUtils.keepTableDatas(2, {
          /**한국어 기본**/
          prvtAreaLabel: '공용면적',
          usblYmdLabel: '임대가능기간',
        }, {
          /*창고명*/
          warehouseName: detailEstimate ? detailEstimate.warehouse.warehouse : '-',
          /*창고주*/
          ownerName: detailEstimate ? detailEstimate.warehouse.owner : '-',
          /*위치*/
          address: detailEstimate ? detailEstimate.warehouse.address : '-',
          /*계약유형*/
          type: '임대(보관)',
          /*보관유형*/
          keepType: keepTrustEstimate.typeCode.stdDetailCodeName,
          /*공용면적*/
          prvtArea: keepTrustEstimate.cmnArea ? keepTrustEstimate.cmnArea.toLocaleString() + " ㎡" : "0 ㎡",
          /*임대 가능기간*/
          usblYmd: StringUtils.dateStr(keepTrustEstimate.usblYmdFrom) + '~' + StringUtils.dateStr(keepTrustEstimate.usblYmdTo),
          /*보관단가*/
          splyAmount: StringUtils.moneyConvert(keepTrustContract.splyAmount),
          /*관리단가*/
          mgmtChrg: StringUtils.moneyConvert(keepTrustContract.mgmtChrg),
        }),
      });
    }

    if (detailEstimate && keepTrustContract && contractType === 'trust') {
      this.setState({
        dataTrust:
          ContractUtils.trustTableDatas(2, {
            /**한국어 기본**/
            usblYmdLabel: '수탁 가용일자'
          }, {
            /*창고명*/
            warehouseName: detailEstimate ? detailEstimate.warehouse.warehouse : '-',
            /*창고주*/
            ownerName: detailEstimate ? detailEstimate.warehouse.owner : '-',
            /*위치*/
            address: detailEstimate ? detailEstimate.warehouse.address : '-',
            /*계약유형*/
            type: '수탁',
            /*보관유형*/
            keepType: keepTrustContract.typeCode.stdDetailCodeName,
            /*수탁 가용일자*/
            usblYmd: StringUtils.dateStr(keepTrustEstimate.usblYmdFrom) + '~' + StringUtils.dateStr(keepTrustEstimate.usblYmdTo),
            /*수탁 가용수량*/
            usblValue: keepTrustContract.cntrValue ? keepTrustContract.cntrValue.toLocaleString() + ' ' + (keepTrustContract.calUnitDvCode.stdDetailCodeName) : '-',
            /*보관단가*/
            splyAmount: StringUtils.moneyConvert(keepTrustContract.splyAmount),
            /*가공단가*/
            mnfctChrg: StringUtils.moneyConvert(keepTrustContract.mnfctChrg),
            /*인건단가*/
            psnChrg: StringUtils.moneyConvert(keepTrustContract.psnChrg),
            /*입고단가*/
            whinChrg: StringUtils.moneyConvert(keepTrustContract.whinChrg),
            /*출고단가*/
            whoutChrg: StringUtils.moneyConvert(keepTrustContract.whoutChrg),
            /*택배단가*/
            dlvyChrg: StringUtils.moneyConvert(keepTrustContract.dlvyChrg),
            /*운송단가*/
            shipChrg: StringUtils.moneyConvert(keepTrustContract.shipChrg),
          }),
      });
    }

    if (keepTrustEstimate && keepTrustEstimate.typeCode) {
      switch (keepTrustEstimate.typeCode) {
        case "0001":
          this.setState({
            imgType: imgType0001
          })
          break;
        case "0002":
          this.setState({
            imgType: imgType0002
          })
          break;
        case "0003":
          this.setState({
            imgType: imgType0003
          })
          break;
        case "0004":
          this.setState({
            imgType: imgType0004
          })
          break;
        default:
          this.setState({
            imgType: imgType9100
          })
          break;
      }
    }
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
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestContract);
