/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { ContractUtils, StringUtils } from '@Services/utils';
// Local Imports
import TableInfo from '@Components/atoms/TableInfo';
import DefaultStyle from '@Styles/default';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { Contract, MyPage, Warehouse } from '@Services/apis';
import { Appbar, Button, Dialog, Text } from 'react-native-paper';

import TenantRq00Trust from './tenantRq00Trust';
import TenantRq00Keep from './tenantRq00Keep';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import TenantRs00Trust from './tenantRs00Trust';
import TenantRs00Keep from './tenantRs00Keep';

import OwnerRq00Trust from './ownerRq00Trust';
import OwnerRq00Keep from './ownerRq00Keep';
import OwnerRs00Keep from './ownerRs00Keep';
import OwnerRs00Trust from './ownerRs00Trust';

import imgType0001 from '@Assets/images/type-0001.png';
import imgType0002 from '@Assets/images/type-0002.png';
import imgType0003 from '@Assets/images/type-0003.png';
import imgType0004 from '@Assets/images/type-0004.png';
import imgType9100 from '@Assets/images/type-9100.png';
import { styles as S } from "../style";

class Quotation extends Component {

  constructor (props) {

    super(props);
    this.webView = null;
    this.state = {
      isConfirmRequest: false,
      imgType: null
    };

    this.navigation = props.navigation;
  }

  coverTime = value => {
    let time = new Date();
    time.setTime(value);
    let changeTime = time.toLocaleDateString();
    return changeTime;
  };

  onClickContractTrust = () => {
    this.setState({
      visibleContractTrust: !this.state.visibleContractTrust
    })
  }

  onClickContractKeep = () => {
    this.setState({
      visibleContractKeep: !this.state.visibleContractKeep
    })
  }

  /**
   * 견적서 URL
   * */
  getOzEstimateUrl = () => {
    let resultEstm = this.props.route.params.typeWH === 'KEEP' ? this.state.estmtKeepGroups : this.state.estmtTrustGroups
    const { warehouseRegNo, rentUserNo } = this.props.route.params;
    let occrYmd = ''
    if (resultEstm && resultEstm.length > 0) {
      let lastRound = resultEstm[resultEstm.length - 1];
      let resEstimate = lastRound[lastRound.length - 1];
      if (resEstimate.estmtDvCd === 'RS00') {
        occrYmd = resEstimate.occrYmd;
      }
    }
    if (warehouseRegNo && rentUserNo && occrYmd) {
      // Progress
      this.props.setProgress({ is: true, })
      Contract.ozEstimateUrl({
        warehRegNo: warehouseRegNo,
        rentUserNo: rentUserNo,
        occrYmd: occrYmd,
      }).then(res => {
        console.log('oz result : ', res)
        if (res && res.url) {
          Linking.openURL(res.url);
        }
        // Progress
        setTimeout(() => {
          this.props.setProgress({ is: false });
        }, 300);
      }).catch(error => {
        console.log(error);
        this.props.setProgress({ is: false });
      });
    } else {
      alert('확인 가능한 견적서가 없습니다.');
    }
  };


  render () {
    // const { imageStore } = this.props;
    const { route } = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    // console.log('routeQutation', route);


    const { dataApi } = this.state;
    if (dataApi)
      console.log(dataApi, '# dataApi #');


    let dataKeep = dataApi &&
      typeWH === 'KEEP' && ContractUtils.keepTableDatas(1, {/**한국어 기본**/ }, {
        /*창고명*/
        warehouseName: dataApi.warehouse.warehouse,
        /*창고주*/
        ownerName: dataApi.warehouse.owner,
        /*창고주*/
        rentUser: dataApi.rentUserName,
        /*위치*/
        address: dataApi.warehouse.address,
        /*계약유형*/
        type: '임대',
        /*창고유형*/
        keepType: dataApi.whrgMgmtKeep.typeCode.stdDetailCodeName,
        /*전용면적*/
        prvtArea: dataApi.whrgMgmtKeep.usblValue ? StringUtils.displayAreaUnit(dataApi.whrgMgmtKeep.usblValue) : "-",
        /*임대 가능기간*/
        usblYmd: StringUtils.dateStr(dataApi.whrgMgmtKeep.usblYmdFrom) + '~' + StringUtils.dateStr(dataApi.whrgMgmtKeep.usblYmdTo),
        /*임대단가*/
        splyAmount: StringUtils.moneyConvert(dataApi.whrgMgmtKeep.splyAmount),
        /*관리단가*/
        mgmtChrg: StringUtils.moneyConvert(dataApi.whrgMgmtKeep.mgmtChrg),
      });
    let dataTrust = dataApi &&
      typeWH === 'TRUST' && ContractUtils.trustTableDatas(1, {/**한국어 기본**/ }, {
        /*창고명*/
        warehouseName: dataApi.warehouse.warehouse,
        /*창고주*/
        ownerName: dataApi.warehouse.owner,
        /*위치*/
        address: dataApi.warehouse.address,
        /*계약유형*/
        type: '수탁',
        /*창고유형*/
        keepType: dataApi.whrgMgmtTrust.typeCode.stdDetailCodeName,
        /*정산단위*/
        calUnitDvCode: dataApi.whrgMgmtTrust.calUnitDvCode.stdDetailCodeName,
        /*산정기준*/
        calStdDvCode: dataApi.whrgMgmtTrust.calStdDvCode.stdDetailCodeName,
        /*수탁 가능기간*/
        usblYmd: StringUtils.dateStr(dataApi.whrgMgmtTrust.usblYmdFrom) + '~' + StringUtils.dateStr(dataApi.whrgMgmtTrust.usblYmdTo),
        /*수탁 가용수량*/
        usblValue: dataApi.whrgMgmtTrust.usblValue ? StringUtils.numberComma(dataApi.whrgMgmtTrust.usblValue) + ' ' + (dataApi.whrgMgmtTrust.calUnitDvCode.stdDetailCodeName) : '-',
        /*보관단가*/
        splyAmount: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.splyAmount),
        /*가공단가*/
        // mnfctChrg: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.mnfctChrg),
        /*인건단가*/
        // psnChrg: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.psnChrg),
        /*입고단가*/
        whinChrg: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.whinChrg),
        /*출고단가*/
        whoutChrg: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.whoutChrg),
        /*택배단가*/
        // dlvyChrg: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.dlvyChrg),
        /*운송단가*/
        // shipChrg: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.shipChrg),
      });

    return (
      <SafeAreaView style={DefaultStyle._container}>
        {/* <Appbars>
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
        </Appbars> */}

        <HistoryBackActionBar
            title={'견적･계약 관리'}
            navigation={this.navigation}
          />
        <ScrollView style={[DefaultStyle.backgroundGray]}>

          <View style={[DefaultStyle.backgroundWhiteDF2, { paddingBottom: 180 }]}>
            <View style={[DefaultStyle._cards, DefaultStyle.backgroundWhiteDF2]}>

              {/** HEADER **/}
              <View style={[DefaultStyle._titleCard, DefaultStyle._titleStatus]}>
                <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>

                <Text
                  style={[
                    DefaultStyle._statusProcessing,
                    // status === 'RS00'
                    //   ? { backgroundColor: 'rgba(0, 0, 0, 0.54)' }
                    //   : '',
                  ]}>
                  {ContractUtils.coverStatus(status).processing}
                </Text>
              </View>
              {/** END:HEADER **/}

              {/** WAREHOUSE INFO **/}
              <View style={DefaultStyle._card}>
                {/*<Text>{this.state.imgType}</Text>*/}
                <View style={DefaultStyle._headerCard}>
                  {this.state.imgType &&
                  <Image source={this.state.imgType} style={DefaultStyle._avatarHeader} />
                  }
                </View>
                <View
                  // style={DefaultStyle._bodyCard}
                >
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={typeWH === 'KEEP' ? dataKeep : dataTrust} />
                  </View>
                </View>
              </View>
              {/** END:WAREHOUSE INFO **/}
            </View>

            {/** GRAY SPACE **/}
            <View style={[DefaultStyle.backgroundGray, { height: 10 }]}><>{/**Gray Space**/}</>
            </View>
            {/** END:GRAY SPACE **/}

            {/** REQ/RES INFO **/}
            {/*<RequestView data={dataApi} typeWH={typeWH && typeWH} />*/}
            {/** END:REQ/RES INFO **/}


            {/** REQ/RES ACTION **/}

            {/* ====== STATUS DEBUG ====== */}
            {/*<Text>{type}</Text>*/}
            {/*<Text>{typeWH}</Text>*/}
            {/*<Text>{status}</Text>*/}
            {/*<Text>{this.state.groupOrders}</Text>*/}
            {/* ====== END:STATUS DEBUG ====== */}
            {(type === 'TENANT' && status === 'RQ00' && typeWH === 'TRUST')
            && this.state.groupOrders && this.state.calUnitDvCodes && this.state.calStdDvCodes &&
            <TenantRq00Trust
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtTrustGroups={this.state.estmtTrustGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}

            />
            }
            {(type === 'TENANT' && status === 'RQ00' && typeWH === 'KEEP')
            && this.state.groupOrders && this.state.calUnitDvCodes && this.state.calStdDvCodes &&
            <TenantRq00Keep
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtKeepGroups={this.state.estmtKeepGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
            />
            }

            {(type === 'TENANT' && status === 'RS00' && typeWH === 'TRUST')
            && this.state.groupOrders && this.state.calUnitDvCodes && this.state.calStdDvCodes &&
            <TenantRs00Trust
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtTrustGroups={this.state.estmtTrustGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
              onClickContract={this.onClickContractTrust}
            />
            }
            {(type === 'TENANT' && status === 'RS00' && typeWH === 'KEEP')
            && this.state.groupOrders && this.state.calUnitDvCodes && this.state.calStdDvCodes &&
            <TenantRs00Keep
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtKeepGroups={this.state.estmtKeepGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
              onClickContract={this.onClickContractKeep}
            />
            }

            {(type === 'OWNER' && status === 'RQ00' && typeWH === 'TRUST')
            && this.state.groupOrders && this.state.calUnitDvCodes && this.state.calStdDvCodes &&
            <OwnerRq00Trust
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtTrustGroups={this.state.estmtTrustGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
            />
            }
            {(type === 'OWNER' && status === 'RQ00' && typeWH === 'KEEP')
            && this.state.groupOrders && this.state.calUnitDvCodes && this.state.calStdDvCodes &&
            <OwnerRq00Keep
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtKeepGroups={this.state.estmtKeepGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
            />
            }

            {/** 엑션 없음 **/}
            {(type === 'OWNER' && status === 'RS00' && typeWH === 'TRUST') &&
            <OwnerRs00Trust
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtTrustGroups={this.state.estmtTrustGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
            />
            }

            {/** 엑션 없음 **/}
            {(type === 'OWNER' && status === 'RS00' && typeWH === 'KEEP') &&
            <OwnerRs00Keep
              navigation={this.props.navigation}
              warehouseRegNo={warehouseRegNo}
              warehSeq={warehSeq}
              rentUserNo={rentUserNo}
              type={type}
              typeWH={typeWH}
              status={status}
              data={dataApi}
              calUnitDvCodes={this.state.calUnitDvCodes}
              calStdDvCodes={this.state.calStdDvCodes}
              estmtKeepGroups={this.state.estmtKeepGroups}
              groupOrders={this.state.groupOrders}
              groupOrderIndex={this.state.groupOrders ? this.state.groupOrders.length - 1 : 0}
            />
            }

            {/** 견적서 버튼 */}
            {type === 'TENANT' && status === 'RS00' &&
            <View style={[DefaultStyle._cards, DefaultStyle.backgroundWhiteDF2, { backgroundColor: '#fff' }]}>
              <TouchableOpacity
                style={[
                  DefaultStyle.btnSubmit,
                  DefaultStyle.activeBtnSubmit,
                  S.btnMess,
                ]}
                onPress={() => this.getOzEstimateUrl()}>
                <Text
                  style={[
                    DefaultStyle.textSubmit,
                    DefaultStyle.textActiveSubmit,
                    { paddingLeft: 10 },
                  ]}>
                  견적서 확인
                </Text>
              </TouchableOpacity>
            </View>}

            {/** <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
             {route.params.status === 'notAnswerd' ? (
              <Fragment>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>tenantRq00
                    {type === 'OWNER' ? (
                      <TouchableOpacity
                        onPress={() => {
                          // this.props.dataAction(this.state);
                          this.navigation.navigate('ResponseQuotation', {
                            typeWH,
                          });
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
                    {type === 'OWNER'
                      ? '아직 응답하지 않았습니다.'
                      : '  창고주가 보내주신 견적 요청서를 확인하고 있습니다. 견적 응답이 올 때까지 잠시만 기다려 주세요.'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    console.log('견적 재요청 :>> ');
                    this.navigation.navigate('StorageAgreement', { type });
                  }}
                  style={[
                    type === 'OWNER'
                      ? DefaultStyle._btnInline
                      : DefaultStyle._btnOutline,
                  ]}
                  // disabled={this.state.checked ? false : true}
                >
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      type === 'OWNER' ? DefaultStyle._textInline : null,
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
             */}
            {/** END:REQ/RES ACTION **/}
          </View>

        </ScrollView>
        {/** 수탁 계약협의 요청 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visibleContractTrust}
          onDismiss={() => {
            this.setState({ visibleContractTrust: false });
          }}>
          <Dialog.Title style={DefaultStyle._titleDialog}>
            수탁 계약협의 요청
          </Dialog.Title>
          <Dialog.Content>
            <Text>견적 금액을 확정하고 계약을 요청하시겠습니까?</Text>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => this.setState({ visibleContractTrust: false })}>
              아니오
            </Button>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {

                Contract.createTrust({
                  idWarehouse: warehouseRegNo,
                  mgmtTrustSeq: warehSeq,
                  rentUserNo: rentUserNo
                }).then((res) => {
                  if (res.status === 200) {
                    this.setState({
                      completeContract: true
                    });
                    alert('계약 요청이 완료되었습니다.');
                    // TODO 마이페이지 부모 refresh!!
                    this.navigation.goBack();
                  } else {
                    alert('계약 요청이 실패하였습니다.\n다시 시도해보세요.');
                    this.navigation.goBack();
                  }
                });
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 임대 계약협의 요청 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visibleContractKeep}
          onDismiss={() => {
            this.setState({ visibleContractKeep: false });
          }}>
          <Dialog.Title style={DefaultStyle._titleDialog}>
            임대 계약협의 요청
          </Dialog.Title>
          <Dialog.Content>
            <Text>견적 금액을 확정하고 계약을 요청하시겠습니까?</Text>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => this.setState({ visibleContractKeep: false })}>
              아니오
            </Button>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {

                Contract.createKeep({
                  idWarehouse: warehouseRegNo,
                  mgmtKeepSeq: warehSeq,
                  rentUserNo: rentUserNo
                }).then((res) => {
                  if (res.status === 200) {
                    this.setState({
                      completeContract: true
                    });
                    alert('계약 요청이 완료되었습니다.');
                    // TODO 마이페이지 부모 refresh!!
                    // this.navigation.goBack();
                    this.props.navigation.push('Mypage', {
                      title: '견적･계약 관리',
                      tab: 'Mypage_cntr',
                      prevView: 'PrevView',
                    })
                  } else {
                    alert('계약 요청이 실패하였습니다.\n다시 시도해보세요.');
                    // this.navigation.goBack();
                    this.props.navigation.push('Mypage', {
                      title: '견적･계약 관리',
                      prevView: 'PrevView',
                    })
                  }
                });
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {

    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let rentUserNo = this.props.route.params.rentUserNo;
    let type = this.props.route.params.type;
    let typeWH = this.props.route.params.typeWH;

    let urlOwner = `${type.toLocaleLowerCase()}/${warehouseRegNo}/${typeWH.toLocaleLowerCase()}/${warehSeq}/${rentUserNo}`;
    let urlTenant = `${type.toLocaleLowerCase()}/${warehouseRegNo}/${typeWH.toLocaleLowerCase()}/${warehSeq}`;

    let urlPropsOwner = `${type.toLocaleLowerCase()}/warehouse/${warehouseRegNo}/${typeWH.toLocaleLowerCase()}/${warehSeq}/${rentUserNo}`;
    let urlPropsTenant = `${type.toLocaleLowerCase()}/warehouse/${warehouseRegNo}/${typeWH.toLocaleLowerCase()}/${warehSeq}`;

    console.log('urlTenant', urlTenant);

    MyPage.getDetailCodes('WHRG0014').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calStdDvCodes: res.data._embedded.detailCodes
        });
      }
    }).catch(error => {
      alert('WHRG0014:' + error);
    });

    MyPage.getDetailCodes('WHRG0013').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calUnitDvCodes: res.data._embedded.detailCodes
        });
      }
    }).catch(error => {
      alert('WHRG0014:' + error);
    });

    // TODO 뭐지? ?????
    const res = await Warehouse.quotation(
      this.props.route.params.type === 'OWNER' ? urlOwner : urlTenant,
    )

    const status = res.status;

    if (status === 200) {
      this.setState({
        dataApi: res.data,
        estmtTrustGroups: res.data.estmtTrustGroups ? res.data.estmtTrustGroups : [],
        estmtKeepGroups: res.data.estmtKeepGroups ? res.data.estmtKeepGroups : [],
        groupOrders: res.data.orders ? res.data.orders : [],
        urlProps:
          this.props.route.params.type === 'OWNER'
            ? urlPropsOwner
            : urlPropsTenant,
      });
      // this.props.quotationData(res.data);
    }
    ;
    const { dataApi } = this.state;
    if (this.props.route.params.mode) {
      switch (this.props.route.params.mode) {
        case 'RE':
          /** 임차인 견적 재요청 바로보내기 **/
          // console.log(this.props.route.params.typeWH, 'this.props.route.params.typeWH');
          /** Go To 견적 재요청 **/

          if (dataApi)
            this.navigation.navigate('RequestQuotation', {
              data: dataApi,
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
              type,
            });
          break;
        case 'RS':
          /** 창고주 응답하기 바로보내기 **/
          // console.log(this.props.route.params.typeWH, 'this.props.route.params.typeWH');
          // console.log(this.state.estmtKeepGroups, 'this.state.estmtKeepGroups');
          // console.log(this.state.estmtTrustGroups, 'this.state.estmtTrustGroups');
          // console.log(this.state.groupOrders, 'this.state.groupOrders');
          // console.log({
          //   typeWH,
          //   warehouseRegNo,
          //   warehSeq,
          //   rentUserNo,
          //   status,
          //   type,
          // }, 'body');
          if (this.props.route.params.typeWH === 'KEEP' && this.state.estmtKeepGroups && this.state.groupOrders) {
            const estmtKeepGroups = this.state.estmtKeepGroups;
            const index = this.state.groupOrders ? this.state.groupOrders.length - 1 : 0;
            let lastRequestData = {};
            if (estmtKeepGroups && estmtKeepGroups.length > 0) {
              lastRequestData = estmtKeepGroups[index][estmtKeepGroups[index].length - 1];
            }
            /** GO TO 견적응답하기 **/
            this.navigation.navigate('ResponseQuotation', {
              lastRequestData,
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
              type,
            });
            console.log(lastRequestData, 'KEEP lastRequestData');
          } else if (this.props.route.params.typeWH === 'TRUST' && this.state.estmtTrustGroups && this.state.groupOrders) {
            const estmtTrustGroups = this.state.estmtTrustGroups;
            const index = this.state.groupOrders ? this.state.groupOrders.length - 1 : 0;
            let lastRequestData = {};
            if (estmtTrustGroups && estmtTrustGroups.length > 0) {
              lastRequestData = estmtTrustGroups[index][estmtTrustGroups[index].length - 1];
            }
            /** GO TO 견적응답하기 **/
            this.navigation.navigate('ResponseQuotation', {
              lastRequestData,
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
              type,
            });
            console.log(lastRequestData, 'TRUST lastRequestData');
          }

          break;
        case 'CT':
          /** 견적 신청 얼럿 **/
          if (this.props.route.params.typeWH === 'KEEP') {
            this.setState({ visibleContractKeep: true });
          } else if (this.props.route.params.typeWH === 'TRUST') {
            this.setState({ visibleContractTrust: true });
          }
          break;
      }
    }


    if (typeWH.toLocaleLowerCase() === 'trust') {

      if (dataApi && dataApi.whrgMgmtTrust && dataApi.whrgMgmtTrust.typeCode) {
        switch (String(dataApi.whrgMgmtTrust.typeCode.stdDetailCode)) {
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
    } else if (typeWH.toLocaleLowerCase() === 'keep') {
      if (dataApi && dataApi.whrgMgmtKeep && dataApi.whrgMgmtKeep.typeCode) {

        switch (String(dataApi.whrgMgmtKeep.typeCode.stdDetailCode)) {
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

  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    // if (this.state.isOpen && prevProps.whFilter !== this.props.whFilter) {
    //   this.requestWhList(false);
    // }

    if (prevState.isConfirmRequest !== this.state.isConfirmRequest) {
      let warehSeq = this.props.route.params.warehSeq;
      let warehouseRegNo = this.props.route.params.warehouseRegNo;
      let rentUserNo = this.props.route.params.rentUserNo;
      let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
      let typeWH =
        this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
      let data =
        this.props.route.params.typeWH === 'TRUST'
          ? { warehouseRegNo, mgmtTrustSeq: warehSeq }
          : { warehouseRegNo, mgmtKeepSeq: warehSeq };
      Warehouse.requestContract({ typeWH, data })
        .then(res => {
          const status = res.status;
          console.log('res', res);
          if (status === 200) {
            // this.setState({
            //   dataApi: res.data,
            // });
            this.navigation.navigate('RequestContract', {
              type,
              warehouseRegNo,
              warehSeq,
              typeWH,
              rentUserNo,
            });
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }

  }

  componentWillUnmount () {
    console.log('Component WILL UNMOUNT!');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    quotationData: action => {
      dispatch(ActionCreator.quotationData(action));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotation);
