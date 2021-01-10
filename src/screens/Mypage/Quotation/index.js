/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, Text} from 'react-native-paper';

// Local Imports
import TableInfo from '@Components/atoms/TableInfo';
import DefaultStyle from '@Styles/default';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import warehouse1 from '@Assets/images/warehouse-1.png';
import {Warehouse, MyPage} from '@Services/apis';

import {styles as S} from '../style';
import RequestView from './requestView';

import TenantRq00Trust from './tenantRq00Trust';
import TenantRq00Keep from './tenantRq00Keep';
import TenantRs00Trust from './tenantRs00Trust';
import TenantRs00Keep from './tenantRs00Keep';

import OwnerRq00Trust from './ownerRq00Trust';
import OwnerRq00Keep from './ownerRq00Keep';
import OwnerRs00Trust from './ownerRs00Trust';
import OwnerRs00Keep from './ownerRs00Keep';

import {StringUtils} from '@Services/utils';

class Quotation extends Component {

  constructor(props) {

    super(props);
    this.webView = null;
    this.state = {
      isConfirmRequest: false,
    };

    this.navigation = props.navigation;
  }

  coverStatus = value => {
    switch (value) {

      case 'RQ00':
        // code block
        return {
          processing: '견적요청',
          data: []
        };

      case 'RS00':
        // code block
        return {
          data: [],
          processing: '견적응답',
        };

      case '1100':
        // code block
        return {
          data: [],
          processing: '계약협의',
        };


      case '2100':
        // code block
        return {
          data: [],
          processing: '계약요청대기',
        };

      case '4100':
        // code block
        return {
          data: [],
          processing: '계약중',
        };

      case '5100':
        // code block
        return {
          data: [],
          processing: '계약완료',
        };

      // code block
    }
  };

  coverTime = value => {
    let time = new Date();
    time.setTime(value);
    let changeTime = time.toLocaleDateString();
    return changeTime;
  };


  render() {
    // const { imageStore } = this.props;
    const {route} = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    // console.log('routeQutation', route);

    const {dataApi} = this.state;
    console.log(typeWH, 'typeWH');
    console.log(dataApi, 'dataApi');
    let dataKeep = dataApi &&
      typeWH === 'KEEP' && [
        {
          type: '창고명',
          value: dataApi.warehouse.warehouse,
        },
        {
          type: '창고주',
          value: dataApi.warehouse.owner,
        },
        {
          type: '위치',
          value: dataApi.warehouse.address,
        },
        {
          type: '계약유형',
          value: '임대(보관)',
          highlight: true,
        },
        {
          type: '보관유형',
          value: dataApi.whrgMgmtKeep.typeCode.stdDetailCodeName,
        },
        {
          type: '전용면적',
          value: dataApi.warehouse.prvtArea ? dataApi.warehouse.prvtArea.toLocaleString() + " ㎡" : "0 ㎡",
        },
        // {
        //   type: '정산단위',
        //   value: dataApi.whrgMgmtKeep.calUnitDvCode.stdDetailCodeName,
        // },
        // {
        //   type: '산정기준',
        //   value: dataApi.whrgMgmtKeep.calStdDvCode.stdDetailCodeName,
        // },
        // {
        //   type: '가용면적',
        //   value: StringUtils.moneyConvert(dataApi.whrgMgmtKeep.usblValue),
        // },
        {
          type: '임대 가능 기간',
          value: StringUtils.dateStr(dataApi.whrgMgmtKeep.usblYmdFrom) + '~' + StringUtils.dateStr(dataApi.whrgMgmtKeep.usblYmdTo),
        },
        {
          type: '보관단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtKeep.splyAmount),
        },
        {
          type: '관리단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtKeep.mgmtChrg),
        },
      ];
    let dataTrust = dataApi &&
      typeWH === 'TRUST' && [
        {
          type: '창고명',
          value: dataApi.warehouse.warehouse,
        },
        {
          type: '창고주',
          value: dataApi.warehouse.owner,
        },
        {
          type: '위치',
          value: dataApi.warehouse.address,
        },
        {
          type: '계약유형',
          value: '수탁',
          highlight: true,
        },
        {
          type: '보관유형',
          value: dataApi.whrgMgmtTrust.typeCode.stdDetailCodeName,
        },
        {
          type: '정산단위',
          value: dataApi.whrgMgmtTrust.calUnitDvCode.stdDetailCodeName,
        },
        {
          type: '산정기준',
          value: dataApi.whrgMgmtTrust.calStdDvCode.stdDetailCodeName,
        },
        {
          type: '수탁 가능 기간',
          value: StringUtils.dateStr(dataApi.whrgMgmtTrust.usblYmdFrom) + '~' + StringUtils.dateStr(dataApi.whrgMgmtTrust.usblYmdTo),
        },
        {
          type: '수탁 가용수량',
          value: dataApi.whrgMgmtTrust.usblValue ? dataApi.whrgMgmtTrust.usblValue.toLocaleString() + ' ' + (dataApi.whrgMgmtTrust.calUnitDvCode.stdDetailCodeName) : '-'
        },
        {
          type: '보관단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.splyAmount),
        },
        {
          type: '가공단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.mnfctChrg),
        },
        {
          type: '인건단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.psnChrg),
        },
        {
          type: '입고단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.whinChrg),
        },
        {
          type: '출고단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.whoutChrg),
        },
        {
          type: '택배단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.dlvyChrg),
        },
        {
          type: '운송단가',
          value: StringUtils.moneyConvert(dataApi.whrgMgmtTrust.shipChrg),
        },
      ];

    console.log(this.state.calUnitDvCodes, 'this.state.calUnitDvCodes');

    return (
      <SafeAreaView style={DefaultStyle._container}>
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
        <ScrollView style={[DefaultStyle.backgroundGray]}>

          <View style={[DefaultStyle.backgroundWhiteDF2, {paddingBottom: 180}]}>
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
                  {this.coverStatus(status).processing}
                </Text>
              </View>
              {/** END:HEADER **/}

              {/** WAREHOUSE INFO **/}
              <View style={DefaultStyle._card}>
                <View style={DefaultStyle._headerCard}>
                  <Image source={warehouse1} style={DefaultStyle._avatarHeader}/>
                </View>
                <View
                  // style={DefaultStyle._bodyCard}
                >
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={typeWH === 'KEEP' ? dataKeep : dataTrust}/>
                  </View>
                </View>
              </View>
              {/** END:WAREHOUSE INFO **/}
            </View>

            {/** GRAY SPACE **/}
            <View style={[DefaultStyle.backgroundGray, {height: 10}]}><>{/**Gray Space**/}</>
            </View>
            {/** END:GRAY SPACE **/}

            {/** REQ/RES INFO **/}
            {/*<RequestView data={dataApi} typeWH={typeWH && typeWH} />*/}
            {/** END:REQ/RES INFO **/}


            {/** REQ/RES ACTION **/}

            {/* ====== STATUS DEBUG ====== */}
            <Text>{type}</Text>
            <Text>{typeWH}</Text>
            <Text>{status}</Text>
            {/* ====== END:STATUS DEBUG ====== */}

            {(type === 'TENANT' && status === 'RQ00' && typeWH === 'TRUST') &&
            <TenantRq00Trust warehouseRegNo={warehouseRegNo}
                             warehSeq={warehSeq}
                             rentUserNo={rentUserNo}
                             type={type}
                             typeWH={typeWH}
                             status={status}
                             data={dataApi}
                             calUnitDvCodes={this.state.calUnitDvCodes}
                             calStdDvCodes={this.state.calStdDvCodes}
            />
            }
            {(type === 'TENANT' && status === 'RQ00' && typeWH === 'KEEP') &&
            <TenantRq00Keep warehouseRegNo={warehouseRegNo}
                            warehSeq={warehSeq}
                            rentUserNo={rentUserNo}
                            type={type}
                            typeWH={typeWH}
                            status={status}
                            data={dataApi}
                            calUnitDvCodes={this.state.calUnitDvCodes}
                            calStdDvCodes={this.state.calStdDvCodes}
            />
            }


            {(type === 'TENANT' && status === 'RS00' && typeWH === 'TRUST') &&
            <TenantRs00Trust warehouseRegNo={warehouseRegNo}
                             warehSeq={warehSeq}
                             rentUserNo={rentUserNo}
                             type={type}
                             typeWH={typeWH}
                             status={status}
                             data={dataApi}
                             calUnitDvCodes={this.state.calUnitDvCodes}
                             calStdDvCodes={this.state.calStdDvCodes}
            />
            }
            {(type === 'TENANT' && status === 'RS00' && typeWH === 'KEEP') &&
            <TenantRs00Keep warehouseRegNo={warehouseRegNo}
                            warehSeq={warehSeq}
                            rentUserNo={rentUserNo}
                            type={type}
                            typeWH={typeWH}
                            status={status}
                            data={dataApi}
                            calUnitDvCodes={this.state.calUnitDvCodes}
                            calStdDvCodes={this.state.calStdDvCodes}
            />
            }


            {(type === 'OWNER' && status === 'RQ00' && typeWH === 'TRUST') &&
            <OwnerRq00Trust warehouseRegNo={warehouseRegNo}
                            warehSeq={warehSeq}
                            rentUserNo={rentUserNo}
                            type={type}
                            typeWH={typeWH}
                            status={status}
                            data={dataApi}
                            calUnitDvCodes={this.state.calUnitDvCodes}
                            calStdDvCodes={this.state.calStdDvCodes}
            />
            }
            {(type === 'OWNER' && status === 'RQ00' && typeWH === 'KEEP') &&
            <OwnerRq00Keep warehouseRegNo={warehouseRegNo}
                           warehSeq={warehSeq}
                           rentUserNo={rentUserNo}
                           type={type}
                           typeWH={typeWH}
                           status={status}
                           data={dataApi}
                           calUnitDvCodes={this.state.calUnitDvCodes}
                           calStdDvCodes={this.state.calStdDvCodes}
            />
            }


            {(type === 'OWNER' && status === 'RS00' && typeWH === 'TRUST') &&
            <OwnerRs00Trust warehouseRegNo={warehouseRegNo}
                            warehSeq={warehSeq}
                            rentUserNo={rentUserNo}
                            type={type}
                            typeWH={typeWH}
                            status={status}
                            data={dataApi}
                            calUnitDvCodes={this.state.calUnitDvCodes}
                            calStdDvCodes={this.state.calStdDvCodes}
            />
            }
            {(type === 'OWNER' && status === 'RS00' && typeWH === 'KEEP') &&
            <OwnerRs00Keep warehouseRegNo={warehouseRegNo}
                           warehSeq={warehSeq}
                           rentUserNo={rentUserNo}
                           type={type}
                           typeWH={typeWH}
                           status={status}
                           data={dataApi}
                           calUnitDvCodes={this.state.calUnitDvCodes}
                           calStdDvCodes={this.state.calStdDvCodes}
            />
            }

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
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {

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
    });

    MyPage.getDetailCodes('WHRG0013').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calUnitDvCodes: res.data._embedded.detailCodes
        });
      }
    });

    // TODO 뭐지? ?????
    await Warehouse.quotation(
      this.props.route.params.type === 'OWNER' ? urlOwner : urlTenant,
    )
      .then(res => {
        const status = res.status;
        console.log('res', res);
        if (status === 200) {
          this.setState({
            dataApi: res.data,
            urlProps:
              this.props.route.params.type === 'OWNER'
                ? urlPropsOwner
                : urlPropsTenant,
          });
          // this.props.quotationData(res.data);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    // SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isConfirmRequest !== this.state.isConfirmRequest) {
      let warehSeq = this.props.route.params.warehSeq;
      let warehouseRegNo = this.props.route.params.warehouseRegNo;
      let rentUserNo = this.props.route.params.rentUserNo;
      let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
      let typeWH =
        this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
      let data =
        this.props.route.params.typeWH === 'TRUST'
          ? {warehouseRegNo, mgmtTrustSeq: warehSeq}
          : {warehouseRegNo, mgmtKeepSeq: warehSeq};
      Warehouse.requestContract({typeWH, data})
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

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    quotationData: action => {
      dispatch(ActionCreator.quotationData(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotation);
