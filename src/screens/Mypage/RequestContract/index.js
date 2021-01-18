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
import ContractInformation from './ContractInformation';
import { styles as S } from '../style';

import imgType0001 from '@Assets/images/type-0001.png';
import imgType0002 from '@Assets/images/type-0002.png';
import imgType0003 from '@Assets/images/type-0003.png';
import imgType0004 from '@Assets/images/type-0004.png';
import imgType9100 from '@Assets/images/type-9100.png';

import { Warehouse, MyPageEstmtCntr, Contract } from '@Services/apis';

class RequestContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailContract: '', // 계약 기본 정보.
      detailEstimate: '', // 계약 기본 정보

      keepTrustContract: '', // keep|trust
      keepTrustEstimate: '', // keep|trust

      warehouseInfoData: '', // 창고정보 1100전
      warehouseInfo: '', // 창고정보 1100전

      dataKeep: [],
      dataTrust: [],

      contractLink: '',
      imgType: null,
      contract: null,
    };
    this.navigation = props.navigation;
  }

  render() {
    let warehSeq = this.props.route.params.warehSeq;
    let thumbnail = this.props.route.params.thumbnail;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let type = this.props.route.params.type.toLowerCase(); // owner | tenant
    let contractType = this.props.route.params.typeWH.toLowerCase(); // keep | trust
    let rentUserNo = this.props.route.params.rentUserNo;
    const status = this.props.route.params.status;
    console.log('thumbnail=>>>', thumbnail);
    const {
      dataTrust,
      dataKeep,
      detailEstimate,
      keepTrustContract,
      warehouseInfo,
    } = this.state;
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => {
              this.props.route.params.onRefresh('견적･계약 관리');
              this.navigation.goBack();
            }}
          />
          <Appbar.Content
            title="견적･계약 관리"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <View>

          <ScrollView  nestedScrollEnabled = {true}>
            <View style={[DefaultStyle._body, { paddingBottom: 300 }]}>
              {/** HEADER **/}
              <View style={[DefaultStyle._titleBody, DefaultStyle._titleStatus]}>
                <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>
                <Text
                  style={[
                    DefaultStyle._statusProcessing,
                    status === '5100' ? { backgroundColor: '#4caf50' } : '',
                  ]}>
                  {ContractUtils.coverStatus(status) &&
                    ContractUtils.coverStatus(status).processingTrust &&
                    contractType === 'trust'
                    ? ContractUtils.coverStatus(status).processingTrust
                    : ContractUtils.coverStatus(status).processing}
                </Text>
              </View>
              {/** END:HEADER **/}

              {/** WAREHOUSE INFO 청고 정보 **/}
              {/*{status === '1100' && (*/}
                {/*<View style={DefaultStyle._card}>*/}
                  {/*<View style={DefaultStyle._headerCard}>*/}
                    {/*{this.state.imgType && (*/}
                      {/*<Image*/}
                        {/*source={this.state.imgType}*/}
                        {/*style={DefaultStyle._avatarHeader}*/}
                      {/*/>*/}
                    {/*)}*/}
                  {/*</View>*/}
                  {/*<View>*/}
                    {/*<View style={DefaultStyle._infoTable}>*/}
                      {/*{contractType === 'keep' && warehouseInfo.dataKeep && (*/}
                        {/*<TableInfo data={warehouseInfo.dataKeep} />*/}
                      {/*)}*/}
                      {/*{contractType === 'trust' && warehouseInfo.dataTrust && (*/}
                        {/*<TableInfo data={warehouseInfo.dataTrust} />*/}
                      {/*)}*/}
                    {/*</View>*/}
                  {/*</View>*/}
                {/*</View>*/}
              {/*)}*/}
              {/** END:ESTIMATE INFO **/}

              {/** CONTRACT INFO **/}
              <View style={DefaultStyle._card}>
                {(status === '2100' ||
                  status === '4100' ||
                  status === '5100') && (
                    <View style={DefaultStyle._headerCard}>
                      {this.state.imgType && (
                        <Image
                          source={this.state.imgType}
                          style={DefaultStyle._avatarHeader}
                        />
                      )}
                    </View>
                  )}
                <View>
                  <View style={DefaultStyle._infoTable}>
                    {contractType === 'keep' && dataKeep ? (
                      <TableInfo data={dataKeep} />
                    ) : (
                        <TableInfo data={dataTrust} />
                      )}
                  </View>
                </View>
              </View>
              {/** END:CONTRACT INFO **/}

              {/*{contractType === 'keep' ? (*/}
              {/*<View style={[DefaultStyle._body, DefaultStyle._margin0]}>*/}
              {/*<View style={DefaultStyle._footerCards}>*/}
              {/*<Text style={S.amount}>예상 견적 금액</Text>*/}
              {/*<Text style={S.total}>*/}
              {/*{(keepTrustContract) ?*/}
              {/*StringUtils.moneyConvert(Number(keepTrustContract.splyAmount) + Number(keepTrustContract.mgmtChrg)) : '-'}*/}
              {/*</Text>*/}
              {/*</View>*/}
              {/*</View>*/}
              {/*) : null}*/}
              {keepTrustContract ? (
                <ContractInformation
                  navigation={this.navigation}
                  route={this.props.route}
                  detailEstimate={detailEstimate} // 계약 기본 정보
                  keepTrustContract={keepTrustContract} // keep|trust
                  type={type}
                  contractType={contractType}
                  status={status}
                  rentUserNo={rentUserNo}
                  warehSeq={warehSeq}
                  thumbnail={thumbnail}
                />
              ) : (
                  <></>
                )}
            </View>
          </ScrollView>
        </View>
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
      })
        .then(async res => {
          let resultData = res;
          this.setState({
            detailContract: resultData,
            warehouseInfoData: {
              warehouse: resultData.warehouse,
              whrgMgmtTrust: resultData.whrgMgmtTrust,
              whrgMgmtKeep: resultData.whrgMgmtKeep,
            },
          });

          console.log(resultData, 'resultData');

          if (contractType === 'trust') {
            if (resultData.cntrTrusts && resultData.cntrTrusts.length > 0) {
              this.setState({
                contract: resultData.cntrTrusts[0],
              });
            }
          } else if (contractType === 'keep') {
            if (resultData.cntrKeeps && resultData.cntrKeeps.length > 0) {
              this.setState({
                contract: resultData.cntrKeeps[0],
              });
            }
          }

          // 견적 완료, 계약 진행 중일 때.
          let estmtData = resultData.estmtKeeps || resultData.estmtTrusts;
          await Contract.getContractKeep({
            type: 'owner',
            contractType: contractType,
            idWarehouse: warehouseRegNo,
            rentUserNo: estmtData[estmtData.length - 1].rentUserNo,
            cntrYmdFrom: moment(estmtData[estmtData.length - 1].from).format(
              'YYYYMMDD',
            ),
          }).then(res => {
            let resultEstmtData = {
              warehouse: resultData.warehouse,
              [contractType === 'keep' ? 'estmtKeeps' : 'estmtTrusts']: res,
            };

            // console.debug('[3] 견적 완료, 계약 진행 중일 때.1 : ', res);
            this.setState({
              detailEstimate: resultEstmtData,
              keepTrustContract: res, // keep|trust
              keepTrustEstimate:
                contractType === 'keep' ? res.whrgMgmtKeep : res.whrgMgmtTrust, // keep|trust
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
      })
        .then(async res => {
          let resultData = res;
          this.setState({
            detailContract: resultData,
            warehouseInfoData: {
              warehouse: resultData.warehouse,
              whrgMgmtTrust: resultData.whrgMgmtTrust,
              whrgMgmtKeep: resultData.whrgMgmtKeep,
            },
          });

          console.log(resultData, 'resultData');

          if (contractType === 'trust') {
            if (resultData.cntrTrusts && resultData.cntrTrusts.length > 0) {
              this.setState({
                contract: resultData.cntrTrusts[0],
              });
              console.log(resultData.cntrTrusts, 'cntrTrusts');
            }
          } else if (contractType === 'keep') {
            if (resultData.cntrKeeps && resultData.cntrKeeps.length > 0) {
              this.setState({
                contract: resultData.cntrKeeps[0],
              });
              console.log(resultData.cntrKeeps, 'cntrKeeps');
            }
          }

          // 견적 완료, 계약 진행 중일 때.
          let estmtData = resultData.estmtKeeps || resultData.estmtTrusts;
          await Contract.getContractKeep({
            type: 'tenant',
            contractType: contractType,
            idWarehouse: warehouseRegNo,
            rentUserNo: estmtData[estmtData.length - 1].rentUserNo,
            cntrYmdFrom: moment(estmtData[estmtData.length - 1].from).format(
              'YYYYMMDD',
            ),
          }).then(res => {
            console.log(res, 'res111');
            let resultEstmtData = {
              warehouse: resultData.warehouse,
              [contractType === 'keep' ? 'estmtKeeps' : 'estmtTrusts']: res,
            };

            // console.debug('[3] 견적 완료, 계약 진행 중일 때.1 :  ', resultEstmtData)
            this.setState({
              detailEstimate: resultEstmtData,
              keepTrustContract: res, // keep|trust
              keepTrustEstimate:
                contractType === 'keep' ? res.whrgMgmtKeep : res.whrgMgmtTrust, // keep|trust
            });
          });
        })
        .catch(async err => {
          if (err.response) {
            if (err.response.status >= 400 && err.response.status < 500) {
              const errData = err.response.data;
              console.log('::: Error Code :', errData.code);
              console.log('::: Error Message :', errData.message);
              alert(errData.message);
              // alert(errData.message)
            } else {
              const errData = err.response.data;
              console.log('::: Error Code :', errData.code);
              alert('서버에러:' + errData.message + '\n관리자에 문의하세요.');
            }
          }
        });
    }

    const status = this.props.route.params.status;
    const {
      detailEstimate,
      keepTrustContract,
      keepTrustEstimate,
      warehouseInfoData,
    } = this.state;

    console.log(warehouseInfoData, 'kdjf;kdsajflks;ajflkas;');

    this.setState({
      warehouseInfo: {
        dataKeep: warehouseInfoData.whrgMgmtKeep
          ? ContractUtils.keepTableDatas(
            1,
            {
              /**한국어 기본**/
            },
            {
              /*창고명*/
              warehouseName: warehouseInfoData.warehouse.warehouse,
              /*창고주*/
              ownerName: warehouseInfoData.warehouse.owner,
              /*위치*/
              address: warehouseInfoData.warehouse.address,
              /*계약유형*/
              type: '임대(보관)',
              /*보관유형*/
              keepType:
                warehouseInfoData.whrgMgmtKeep.typeCode.stdDetailCodeName,
              /*전용면적*/
              prvtArea: warehouseInfoData.warehouse.prvtArea
                ? StringUtils.displayAreaUnit(
                  warehouseInfoData.warehouse.prvtArea,
                )
                : '0 ㎡',
              /*임대 가능기간*/
              usblYmd:
                StringUtils.dateStr(
                  warehouseInfoData.whrgMgmtKeep.usblYmdFrom,
                ) +
                '~' +
                StringUtils.dateStr(warehouseInfoData.whrgMgmtKeep.usblYmdTo),
              /*보관단가*/
              splyAmount: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtKeep.splyAmount,
              ),
              /*관리단가*/
              mgmtChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtKeep.mgmtChrg,
              ),
            },
          )
          : '',
        dataTrust: warehouseInfoData.whrgMgmtTrust
          ? ContractUtils.trustTableDatas(
            1,
            {
              /**한국어 기본**/
            },
            {
              /*창고명*/
              warehouseName: warehouseInfoData.warehouse.warehouse,
              /*창고주*/
              ownerName: warehouseInfoData.warehouse.owner,
              /*위치*/
              address: warehouseInfoData.warehouse.address,
              /*계약유형*/
              type: '수탁',
              /*보관유형*/
              keepType:
                warehouseInfoData.whrgMgmtTrust.typeCode.stdDetailCodeName,
              /*정산단위*/
              calUnitDvCode:
                warehouseInfoData.whrgMgmtTrust.calUnitDvCode
                  .stdDetailCodeName,
              /*산정기준*/
              calStdDvCode:
                warehouseInfoData.whrgMgmtTrust.calStdDvCode
                  .stdDetailCodeName,
              /*수탁 가능기간*/
              usblYmd:
                StringUtils.dateStr(
                  warehouseInfoData.whrgMgmtTrust.usblYmdFrom,
                ) +
                '~' +
                StringUtils.dateStr(
                  warehouseInfoData.whrgMgmtTrust.usblYmdTo,
                ),
              /*수탁 가용수량*/
              usblValue: warehouseInfoData.whrgMgmtTrust.usblValue
                ? StringUtils.numberComma(
                  warehouseInfoData.whrgMgmtTrust.usblValue,
                ) +
                ' ' +
                warehouseInfoData.whrgMgmtTrust.calUnitDvCode
                  .stdDetailCodeName
                : '-',
              /*보관단가*/
              splyAmount: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.splyAmount,
              ),
              /*가공단가*/
              mnfctChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.mnfctChrg,
              ),
              /*인건단가*/
              psnChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.psnChrg,
              ),
              /*입고단가*/
              whinChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.whinChrg,
              ),
              /*출고단가*/
              whoutChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.whoutChrg,
              ),
              /*택배단가*/
              dlvyChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.dlvyChrg,
              ),
              /*운송단가*/
              shipChrg: StringUtils.moneyConvert(
                warehouseInfoData.whrgMgmtTrust.shipChrg,
              ),
            },
          )
          : '',
      },
    });

    if (status === '1100' || status === '2100' || status === '4100') {
      if (detailEstimate && keepTrustContract && contractType === 'keep') {
        this.setState({
          dataKeep: ContractUtils.keepTableDatas(
            2,
            {
              /**한국어 기본**/
              prvtAreaLabel: '공용면적',
              usblYmdLabel: '임대 계약기간',
            },
            {
              /*창고명*/
              warehouseName: detailEstimate
                ? detailEstimate.warehouse.warehouse
                : '-',
              /*창고주*/
              ownerName: detailEstimate ? detailEstimate.warehouse.owner : '-',
              /*위치*/
              address: detailEstimate ? detailEstimate.warehouse.address : '-',
              /*계약유형*/
              type: '임대(보관)',
              /*보관유형*/
              keepType: keepTrustEstimate.typeCode.stdDetailCodeName,
              /*공용면적*/
              prvtArea: keepTrustEstimate.cmnArea
                ? StringUtils.displayAreaUnit(keepTrustEstimate.cmnArea)
                : '-',
              /*임대 가능기간*/
              // usblYmd: StringUtils.dateStr(keepTrustEstimate.usblYmdFrom) + '~' + StringUtils.dateStr(keepTrustEstimate.usblYmdTo),
              usblYmd:
                StringUtils.dateStr(keepTrustContract.id.cntrYmdFrom) +
                '~' +
                StringUtils.dateStr(keepTrustContract.cntrYmdTo),
              /*보관단가*/
              splyAmount: StringUtils.moneyConvert(
                keepTrustContract.splyAmount,
              ),
              /*관리단가*/
              mgmtChrg: StringUtils.moneyConvert(keepTrustContract.mgmtChrg),
            },
          ),
        });
      }

      if (detailEstimate && keepTrustContract && contractType === 'trust') {
        this.setState({
          dataTrust: ContractUtils.trustTableDatas(
            2,
            {
              /**한국어 기본**/
              usblYmdLabel: '수탁 계약일자',
            },
            {
              /*창고명*/
              warehouseName: detailEstimate
                ? detailEstimate.warehouse.warehouse
                : '-',
              /*창고주*/
              ownerName: detailEstimate ? detailEstimate.warehouse.owner : '-',
              /*위치*/
              address: detailEstimate ? detailEstimate.warehouse.address : '-',
              /*계약유형*/
              type: '수탁',
              /*보관유형*/
              keepType: keepTrustContract.typeCode.stdDetailCodeName,
              /*수탁 가용일자*/
              // usblYmd: StringUtils.dateStr(keepTrustEstimate.usblYmdFrom) + '~' + StringUtils.dateStr(keepTrustEstimate.usblYmdTo),
              usblYmd:
                StringUtils.dateStr(keepTrustContract.id.cntrYmdFrom) +
                '~' +
                StringUtils.dateStr(keepTrustContract.cntrYmdTo),
              /*수탁 가용수량*/
              usblValue: keepTrustContract.cntrValue
                ? StringUtils.numberComma(keepTrustContract.cntrValue) +
                ' ' +
                keepTrustContract.calUnitDvCode.stdDetailCodeName
                : '-',
              /*보관단가*/
              splyAmount: StringUtils.moneyConvert(
                keepTrustContract.splyAmount,
              ),
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
            },
          ),
        });
      }
    }
    if (status === '5100') {
      if (detailEstimate && keepTrustContract && contractType === 'keep') {
        this.setState({
          dataKeep: ContractUtils.keepTableDatas(
            2,
            {
              /**한국어 기본**/
              prvtAreaLabel: '공용면적',
              usblYmdLabel: '임대 계약기간',
              splyAmountLabel: '보관비',
              mgmtChrgLabel: '관리비',
            },
            {
              /*창고명*/
              warehouseName: detailEstimate
                ? detailEstimate.warehouse.warehouse
                : '-',
              /*창고주*/
              ownerName: detailEstimate ? detailEstimate.warehouse.owner : '-',
              /*위치*/
              address: detailEstimate ? detailEstimate.warehouse.address : '-',
              /*계약유형*/
              type: '임대(보관)',
              /*보관유형*/
              keepType: keepTrustEstimate.typeCode.stdDetailCodeName,
              /*공용면적*/
              prvtArea: keepTrustEstimate.cmnArea
                ? StringUtils.displayAreaUnit(keepTrustEstimate.cmnArea)
                : '0 ㎡',
              /*임대 가능기간*/
              usblYmd:
                StringUtils.dateStr(keepTrustContract.id.cntrYmdFrom) +
                '~' +
                StringUtils.dateStr(keepTrustContract.cntrYmdTo),
              /*보관단가*/
              splyAmount: StringUtils.moneyConvert(
                keepTrustContract.splyAmount,
              ),
              /*관리단가*/
              mgmtChrg: StringUtils.moneyConvert(keepTrustContract.mgmtChrg),
            },
          ),
        });
      }

      if (detailEstimate && keepTrustContract && contractType === 'trust') {
        this.setState({
          dataTrust: ContractUtils.trustTableDatas(
            2,
            {
              /**한국어 기본**/
              usblYmdLabel: '수탁 계약기간',
              splyAmountLabel: '보관비',
              mnfctChrgLabel: '가공비',
              psnChrgLabel: '인건비',
              whinChrgLabel: '입고비',
              whoutChrgLabel: '출고비',
              dlvyChrgLabel: '택배비',
              shipChrgLabel: '운송비',
            },
            {
              /*창고명*/
              warehouseName: detailEstimate
                ? detailEstimate.warehouse.warehouse
                : '-',
              /*창고주*/
              ownerName: detailEstimate ? detailEstimate.warehouse.owner : '-',
              /*위치*/
              address: detailEstimate ? detailEstimate.warehouse.address : '-',
              /*계약유형*/
              type: '수탁',
              /*보관유형*/
              keepType: keepTrustContract.typeCode.stdDetailCodeName,
              /*수탁 가용일자*/
              usblYmd:
                StringUtils.dateStr(keepTrustContract.id.cntrYmdFrom) +
                '~' +
                StringUtils.dateStr(keepTrustContract.cntrYmdTo),
              /*수탁 가용수량*/
              usblValue: keepTrustContract.cntrValue
                ? StringUtils.moneyConvert(keepTrustContract.cntrValue) +
                ' ' +
                keepTrustContract.calUnitDvCode.stdDetailCodeName
                : '-',
              /*보관단가*/
              splyAmount: StringUtils.moneyConvert(
                keepTrustContract.splyAmount,
              ),
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
            },
          ),
        });
      }
    }

    if (keepTrustEstimate && keepTrustEstimate.typeCode) {
      switch (keepTrustEstimate.typeCode) {
        case '0001':
          this.setState({
            imgType: imgType0001,
          });
          break;
        case '0002':
          this.setState({
            imgType: imgType0002,
          });
          break;
        case '0003':
          this.setState({
            imgType: imgType0003,
          });
          break;
        case '0004':
          this.setState({
            imgType: imgType0004,
          });
          break;
        default:
          this.setState({
            imgType: imgType9100,
          });
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
