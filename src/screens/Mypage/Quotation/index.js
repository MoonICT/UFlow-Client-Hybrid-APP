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
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import warehouse1 from '@Assets/images/warehouse-1.png';
import { Warehouse } from '@Services/apis';

import { styles as S } from '../style';
import RequestView from './requestView';

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};

    this.navigation = props.navigation;
  }
  coverStatus = value => {
    switch (value) {
      case 'RQ00':
        // code block
        return { processing: '견적 요청', data: [] };
      case 'RS00':
        // code block
        return {
          data: [],
          processing: '견적 응답',
        };

      case '1100':
        // code block
        return {
          data: [],
          processing: '계약 요청',
        };
      case '4100':
        // code block
        return {
          data: [],
          processing: '계약 진행',
        };
      case '5100':
        // code block
        return {
          data: [],
          processing: '계약 완료',
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
    const { route } = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    console.log('routeQutation', route);

    const { dataApi } = this.state;
    console.log('dataApiQuatation', dataApi);
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
          type: '선택 창고 유형',
          // value: this.coverStatus(status).processing,
          value: '임대 요청',
          highlight: true,
        },
        {
          type: '보관유형',
          value: dataApi.whrgMgmtKeep.typeCode.stdDetailCodeName,
        },
        {
          type: '정산단위',
          value: dataApi.whrgMgmtKeep.calUnitDvCode.stdDetailCodeName,
        },
        {
          type: '산정기준',
          value: dataApi.whrgMgmtKeep.calStdDvCode.stdDetailCodeName,
        },
        {
          type: '가용면적',
          value: dataApi.whrgMgmtKeep.usblValue,
        },
        {
          type: '임대 가능 기간',
          value: this.coverTime(dataApi.whrgMgmtKeep.usblYmdFrom),
        },
        {
          type: '보관단가',
          value: dataApi.whrgMgmtKeep.splyAmount,
        },
        {
          type: '관리단가',
          value: dataApi.whrgMgmtKeep.mgmtChrg,
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
          type: '선택 창고 유형',
          // value: this.coverStatus(status).processing,
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
          value: this.coverTime(dataApi.whrgMgmtTrust.usblYmdFrom),
        },
        {
          type: '수탁 가용 수량',
          value: dataApi.whrgMgmtTrust.usblValue,
        },
        {
          type: '보관단가',
          value: dataApi.whrgMgmtTrust.splyAmount,
        },
        {
          type: '입고단가',
          value: dataApi.whrgMgmtTrust.whinChrg,
        },
        {
          type: '출고단가',
          value: dataApi.whrgMgmtTrust.whoutChrg,
        },
        {
          type: '인건단가',
          value: dataApi.whrgMgmtTrust.psnChrg,
        },
        {
          type: '가용면적',
          value: dataApi.whrgMgmtTrust.mnfctChrg,
        },
        {
          type: '택배단가',
          value: dataApi.whrgMgmtTrust.dlvyChrg,
        },
        {
          type: '운송단가',
          value: dataApi.whrgMgmtTrust.shipChrg,
        },
      ];

    return (
      <SafeAreaView style={DefaultStyle._container}>
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

              {type === 'OWNER' ? (
                <Text
                  style={[
                    DefaultStyle._statusProcessing,
                    status === 'RS00'
                      ? { backgroundColor: 'rgba(0, 0, 0, 0.54)' }
                      : '',
                  ]}>
                  {this.coverStatus(status).processing}
                </Text>
              ) : null}
              {/**
                <Text
                  style={[
                    DefaultStyle._statusProcessing,
                    DefaultStyle._statusSuccess,
                  ]}>
                  계약 완료
                </Text>
                 */}
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                <Image source={warehouse1} style={DefaultStyle._avatarHeader} />
              </View>
              <View
              // style={DefaultStyle._bodyCard}
              >
                <View style={DefaultStyle._infoTable}>
                  <TableInfo data={typeWH === 'KEEP' ? dataKeep : dataTrust} />
                </View>
              </View>
            </View>
          </View>

          {
            // typeWH === 'KEEP' ? viewRequest : viewRequestTrust
          }
          <RequestView data={dataApi} typeWH={typeWH && typeWH} />
          {// type === 'OWNER' &&
          status === 'RQ00' ? (
            <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
              <View style={DefaultStyle._card}>
                <View style={DefaultStyle._headerCard}>
                  <Text style={DefaultStyle._headerCardTitle}>
                    견적 응답 정보
                  </Text>
                </View>
                <Text style={S.noticeWaitting}>
                  {type === 'OWNER' ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.navigation.navigate('ResponseQuotation', {
                          typeWH,
                          warehouseRegNo,
                          warehSeq,
                          rentUserNo,
                          status,
                          type,
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
                  ) : (
                    '창고주가 보내주신 견적 요청서를 확인하고 있습니다. 견적 응답이 올 때까지 잠시만 기다려 주세요.'
                  )}
                </Text>
              </View>
              {type === 'TENANT' ? (
                <TouchableOpacity
                  onPress={() => {
                    // this.props.dataAction(this.state);
                    this.navigation.navigate('ResponseQuotation', {
                      typeWH,
                      warehouseRegNo,
                      warehSeq,
                      rentUserNo,
                      status,
                      type,
                    });
                  }}
                  style={[
                    type === 'OWNER'
                      ? DefaultStyle._btnInline
                      : DefaultStyle._btnOutline,
                  ]}
                  // disabled={this.state.checked ? false : true}
                >
                  <Text style={[DefaultStyle._textButton]}>견적 재요청</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
          {
            //BUTTON RESQUEST QUATATION AND CONTRACT REQUIREMENTS
            type === 'TENANT' && status === 'RS00' ? (
            <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
              <View style={DefaultStyle._listBtn}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
                  onPress={() => {
                    this.navigation.navigate('ResponseQuotation', {
                      typeWH,
                      warehouseRegNo,
                      warehSeq,
                      rentUserNo,
                      status,
                      type,
                    });
                  }}
                  >
                  <Text style={DefaultStyle._textButton}>견적 재요청</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
                  onPress={() => this.navigation.navigate('ConfirmPass')}>
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      DefaultStyle._textInline,
                    ]}>
                    계약 요청
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {/** <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            {route.params.status === 'notAnswerd' ? (
              <Fragment>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>
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
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let rentUserNo = this.props.route.params.rentUserNo;
    let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
    let typeWH = this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
    let url =
      type +
      '/' +
      warehouseRegNo +
      '/' +
      typeWH +
      '/' +
      warehSeq +
      '/' +
      rentUserNo;
    let urlTenant = type + '/' + warehouseRegNo + '/' + typeWH + '/' + warehSeq;

    let urlProps =
      type +
      '/warehouse/' +
      warehouseRegNo +
      '/' +
      typeWH +
      '/' +
      warehSeq +
      '/' +
      rentUserNo;

    let urlPropsTenant =
      type + '/warehouse/' + warehouseRegNo + '/' + typeWH + '/' + warehSeq;
    console.log('urlTenant', urlTenant);
    await Warehouse.quotation(
      this.props.route.params.type === 'OWNER' ? url : urlTenant,
    )
      .then(res => {
        const status = res.status;
        console.log('res', res);
        if (status === 200) {
          this.setState({
            dataApi: res.data,
            urlProps:
              this.props.route.params.type === 'OWNER'
                ? urlProps
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
    console.log('::componentDidUpdate::');
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
