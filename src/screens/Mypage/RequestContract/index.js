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
  MediaFileContract,
  MyPageEstmtCntr,
  Contract,
} from '@Services/apis';

class RequestContract extends Component {
  constructor (props) {
    super(props);
    this.state = {
      detailContract: '', // 계약 기본 정보.
      detailEstimate: '', // 견적 완료 계약 정보.

      dataKeep: [],
      dataTrust: [],

      contractLink: '',
      dataApi: null,
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

  render () {
    const { route } = this.props;
    const warehSeq = route && route.params && route.params.warehSeq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;

    const { dataTrust, dataKeep } = this.state;

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
                typeWH === 'TRUST'
                  ? ContractUtils.coverStatus(status).processingTrust
                  : ContractUtils.coverStatus(status).processing}
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                {/** TODO Bug2-1 보관 상태에 따라 이미지 변경 */ }
                <Image source={warehouse1} style={DefaultStyle._avatarHeader} />
              </View>
              <View>
                <View style={DefaultStyle._infoTable}>
                  {(typeWH === 'KEEP' && dataKeep) ?
                    <TableInfo data={dataKeep} /> :
                    <TableInfo data={dataTrust} />}
                </View>
              </View>
            </View>
            {typeWH === 'KEEP' ? (
              <View style={[DefaultStyle._body, DefaultStyle._margin0]}>
                <View style={DefaultStyle._footerCards}>
                  <Text style={S.amount}>예상 견적 금액</Text>
                  <Text style={S.total}>
                    {(this.getContract()) ?
                      StringUtils.moneyConvert(Number(this.getContract().splyAmount) + Number(this.getContract().mgmtChrg)) : '-'}
                  </Text>
                </View>
              </View>
            ) : null}

            {this.getContract() &&
            <ContractInformation
              navigation={this.navigation}
              detailContract={this.state.detailContract}
              detailEstimate={this.getContract()}
              type={type}
              contractType={typeWH}
              status={status}
              rentUserNo={rentUserNo}
              warehSeq={warehSeq}
            />}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
    let contractType =
      this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
    let rentUserNo = this.props.route.params.rentUserNo;

    // TODO no use
    let typeWH = this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
    let rentUserID = this.props.route?.params?.rentUserID;
    let rentUserDate = moment(this.props.route.params.regUserDate).format(
      'YYYYMMDD',
    );

    if (type === 'owner') {
      /**
       * 마이페이지 견적보관 상세정보 (창고주 전용)
       * */
      await MyPageEstmtCntr.getDetailEstmtCntrOwner({
        warehouseRegNo: warehouseRegNo,
        contractType: contractType,
        warehSeq: warehSeq,
        rentUserNo: rentUserNo,
      })
        .then(res => {
          let resultData = res;
          this.setState({ detailContract: resultData });

          // 견적 완료, 계약 진행 중일 때.
          let estmtData = resultData.estmtKeeps || resultData.estmtTrusts;
          Contract.getContractKeep({
            type: 'owner',
            contractType: contractType,
            idWarehouse: warehouseRegNo,
            rentUserNo: estmtData[estmtData.length - 1].rentUserNo,
            cntrYmdFrom: moment(estmtData[estmtData.length - 1].from).format('YYYYMMDD',),
          }).then(res => {
            let resultEstmtData = {
              warehouse: resultData.warehouse,
              [contractType === 'KEEP' ? 'estmtKeeps' : 'estmtTrusts']: res,
            };
            console.debug(
              '[3] 견적 완료, 계약 진행 중일 때. : ',
              resultEstmtData,
            );
            this.setState({ detailEstimate: resultEstmtData });
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
            [contractType === 'KEEP' ? 'estmtKeeps' : 'estmtTrusts']: res,
          };
          console.debug('[3] 견적 완료, 계약 진행 중일 때. :  ', resultEstmtData)
          this.setState({ detailEstimate: resultEstmtData });
        });
      });
    }

    // TODO 밑에 확인
    let url = type + '/' + warehouseRegNo + '-' + warehSeq + '/' + typeWH + '/' + rentUserNo;

    let urlTenant = type + '/' + warehouseRegNo + '-' + warehSeq + '/' + typeWH;

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

    const { dataApi, detailEstimate } = this.state;


    if (dataApi && detailEstimate && this.getContract() && typeWH === 'keep') {

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
            type: '보관유형11',
            value: this.getContract().typeCode.stdDetailCodeName,
          },
          // {
          //   type: '전용면적',
          //   value: detailEstimate.warehouse.prvtArea ? detailEstimate.warehouse.prvtArea.toLocaleString() + " ㎡" : "0 ㎡",
          // },
          // {
          //   type: '임대 가능 기간',
          //   value: StringUtils.dateStr(this.getContract().id.cntrYmdFrom) + '~' + StringUtils.dateStr(this.getContract().cntrYmdFrom),
          // },
          // {
          //   type: '보관단가',
          //   value: StringUtils.moneyConvert(this.getContract().splyAmount),
          // },
          // {
          //   type: '관리단가',
          //   value: StringUtils.moneyConvert(this.getContract().mgmtChrg),
          // },
        ],
      });
    }

    if (detailEstimate && this.getContract() && typeWH === 'trust') {
      console.log(':::::TRUST DATA')
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
            value: this.getContract().cntrValue ? this.getContract().cntrValue : '0',
          },
          {
            type: '수탁 가능 기간',
            value: StringUtils.dateStr(this.getContract().id.cntrYmdFrom) + '~' + StringUtils.dateStr(this.getContract().cntrYmdTo),
          },
          {
            type: '보관단가',
            value: StringUtils.moneyConvert(this.getContract().splyAmount),
          },
          {
            type: '가공단가',
            value: StringUtils.moneyConvert(this.getContract().mnfctChrg),
          },
          {
            type: '인건단가',
            value: StringUtils.moneyConvert(this.getContract().psnChrg),
          },
          {
            type: '입고단가',
            value: StringUtils.moneyConvert(this.getContract().whinChrg),
          },
          {
            type: '출고단가',
            value: StringUtils.moneyConvert(this.getContract().whoutChrg),
          },
          {
            type: '택배단가',
            value: StringUtils.moneyConvert(this.getContract().dlvyChrg),
          },
          {
            type: '운송단가',
            value: StringUtils.moneyConvert(this.getContract().shipChrg),
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
