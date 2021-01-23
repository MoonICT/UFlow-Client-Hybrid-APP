/**
 * @create
 * @modify chonglye chang
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import {SafeAreaView, View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import FilterButton from '@Components/atoms/FilterButton';
import DefaultStyle from '@Styles/default';
import { moneyUnit , dateStr, toStdCd } from '@Utils/StringUtils';
import TableInfo from '@Components/atoms/TableInfo';
import { SettlementManagementService, Calculate } from '@Services/apis'
import Moment from 'moment';

import { styles as S } from '../style';
import { styles as SS } from './style';

export default class DetailsSettlement extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    let id = props.route.params.id
    let type = props.route.params.type
    let urlTransaction = props.route.params.urlTransaction
    this.state = {
      id,
      type,
      urlTransaction,
      warehouseName: '',
      toggleFee: true,
      toggleCosts: false,
      feeState: [],
      filter: {
        startDate: new Date(),
        endDate: new Date()
      },
      dataInfo: [],
      viewProgress: [],
      dataCost: [],
      headerDetailResBody: null,
      dataTotal: [],
      dataFeeRate: [],
      dataFee: [],
      cntrTypeCode: null,
    };

    this.navigation = props.navigation;
  }

  componentDidMount() {
    this.getAllData()
  }
  async getAllData () {
    let {startDate, endDate}= this.state.filter;
    let {type, id} = this.state
    let params = {
      startDate,
      endDate,
      type,
      id
    };

    let cntrTypeCode = {}
    SettlementManagementService.getDetail(params).then((res) => {
      console.log('data', res.data.data);
      if(res.data.msg !== 'success') {
        return
      }
      let calMgmtMResBody = res.data.data.calMgmtMResBody
      cntrTypeCode = calMgmtMResBody.cntrTypeCode
      let settlementHeaderResBody = res.data.data.settlementHeaderResBody
      let headerDetailResBody = res.data.data.headerDetailResBody
      let headerDetail1ResBody = res.data.data.headerDetail1ResBody

      console.log(headerDetailResBody, 'headerDetailResBody');

      let date = ''
      if (headerDetail1ResBody) {
        date = headerDetail1ResBody.cntrYmdFrom ? Moment(headerDetail1ResBody.cntrYmdFrom).format('yyyy년 MM월') : ''
      } else if (headerDetailResBody) {
        date = headerDetailResBody.cntrYmdFrom ? Moment(headerDetailResBody.cntrYmdFrom).format('yyyy년 MM월') : ''
      }



      this.setState({
        warehouseName: settlementHeaderResBody ? settlementHeaderResBody.warehouse + ' 정산관리' : '정산관리'
      })
      let dataInfo = [
        {
          type: '창고명',
          value: settlementHeaderResBody.warehouse,
        },
        {
          type: '창고주',
          value: settlementHeaderResBody.owner,
        },
        {
          type: '계약유형',
          value: calMgmtMResBody.cntrTypeCode ? calMgmtMResBody.cntrTypeCode.stdDetailCodeName : '',
        },
        // {
        //   type: '기간',
        //   value: `${headerDetail1ResBody ? headerDetail1ResBody.cntrYmdFrom : ''} ~ ${headerDetail1ResBody ? headerDetail1ResBody.cntrYmdTo : ''}`,
        // },
        {
          type: '정산년월',
          value: `${date}`,
        },
        {
          type: '담당자 전화번호',
          value: settlementHeaderResBody.phone,
        },
        {
          type: '담당자 이메일',
          value: settlementHeaderResBody.email,
        }
      ]

      let total = 0;
      if(res.data.data.amount && res.data.data.vat) {
        total = res.data.data.amount + res.data.data.vat
      }
      let dataTotal = [
        {
          type: '공급가액',
          value: res.data.data.calMgmtMResBody ? moneyUnit(res.data.data.amount) : '0 원',
        },
        {
          type: '부가세',
          value: res.data.data.vat ? moneyUnit(res.data.data.vat) : '0 원',
        },
        {
          type: '합계금액',
          value: total ? moneyUnit(total) : '0 원',
        }
      ]

      let dataFeeRate = [
        {
          type: '요율',
          value: res.data.data?.calMgmtMResBody?.rate  ?  res.data.data?.calMgmtMResBody?.rate + '%' : '',
        },
        {
          type: '수수료	',
          value: res.data.data?.calMgmtMResBody.fee ?? '',
        },
        {
          type: '적용금액',
          value: res.data.data?.calMgmtMResBody?.fee ?? ''
        }
      ]

      let detail1Subtotal = 0;
      let dataFee = res.data.data.calMgmtDetail1ResBodyList.map((item, index) => {
        detail1Subtotal = detail1Subtotal + item.amount;

        return {
          title: item.occr,
          value: [
            {
              type: '일시',
              value: item.occr
            },
             // 량
            {
              type: '입고량',
              value: item.whinQty || '0'
            },
            {
              type: '출고량',
              value: item.whoutQty || '0'
            },
            {
              type: '재고량',
              value: item.stckQty || '0'
            },
              // 단가
            {
              type: '입고단가',
              value: item.whinChrg ? moneyUnit(item.whinChrg) : '0 원'
            },
            {
              type: '출고단가',
              value: item.whoutChrg ? moneyUnit(item.whoutChrg) : '0 원'
            },
            {
              type: '재고단가',
              value: item.stckChrg ? moneyUnit(item.stckChrg) : '0 원'
            },
              // 비
            {
              type: '입고비',
              value: item.whinUprice ? moneyUnit(item.whinUprice) : '0 원'
            },
            {
              type: '출고비',
              value: item.whoutUprice ? moneyUnit(item.whoutUprice) : '0 원'
            },
            {
              type: '재고비',
              value: item.stckUprice ? moneyUnit(item.stckUprice) : '0 원'
            },
            {
              type: '합계',
              value: item.amount ? moneyUnit(item.amount) : '0 원'
            },
            {
              type: '비고',
              value: item.remark || '-'
            }
          ]
        }
      })

      let inOutSubtotal = [
        {
          type: '소계',
          value: moneyUnit(detail1Subtotal)
        }
      ]

      let countTotal = 0
      res.data.data.calMgmtDetailResBodyList.forEach((item, index) => {
        countTotal += item.amount
      })

      let dataCost = res.data.data.calMgmtDetailResBodyList.map((item, index) => {
        return {
          title: item.typeDvCode.stdDetailCodeName,
          value: [
            {
              type: '구분',
              value: item.typeDvCode ? item.typeDvCode.stdDetailCodeName : '-'
            },
            {
              type: '비용',
              value: item.amount ? moneyUnit(item.amount) : '0 원'
            },
            {
              type: '비고',
              value: item.remark || '-'
            }
          ]
        }
      })

      let keepSubtotal = [
        {
          type: '소계',
          value: countTotal ? moneyUnit(countTotal) : '0 원'
        }
      ]

      this.setState({
        dataInfo, inOutSubtotal, headerDetailResBody, dataCost, dataTotal, dataFee, keepSubtotal, cntrTypeCode, dataFeeRate
      })
    }).catch(error => {
      alert('SettlementManagementService.getDetail error:' + error);
    });

  }

  _toggle = index => {
    let FeeState = this.state.feeState;

    let findIndex = FeeState.findIndex(el => el.id === index);
    findIndex !== -1
      ? (FeeState[findIndex].toggle = !FeeState[findIndex].toggle)
      : FeeState.push({ toggle: true, id: index });
    this.setState({
      feeData: FeeState,
    });
  };


  render() {
    const {dataFeeRate, feeState, toggleFee, toggleCosts, inOutSubtotal, dataInfo, dataTotal, dataFee , dataCost , keepSubtotal} = this.state;

    const viewFee =
      dataFee &&
      dataFee.map((item, index) => {
        let findIndex = this.state.feeState.findIndex(el => el.id === index);
        return (
          <View key={index}>
            <FilterButton
              label={item.title}
              onPress={() => this._toggle(index)}
              isToggle={findIndex !== -1 ? feeState[findIndex].toggle : false}
              style={SS.toggle}
              styleLabel={SS.textToggle}
            />

            {feeState[findIndex] &&
            item.value &&
            feeState[findIndex].toggle === true ? (
              <TableInfo borderBottom={true} data={item.value} />
            ) : null}
          </View>
        );
      });

    const viewCost =
      dataCost &&
      dataCost.map((item, index) => {
        let findIndex = this.state.feeState.findIndex(el => el.id === index);
        return (
          <View key={index}>
            {item.valueTitle ? (
              <View style={SS.noteToggle}>
                <Text style={SS.textNote}>{item.title}</Text>
                <Text
                  style={[
                    SS.textNote,
                    { marginLeft: 'auto', marginRight: 'auto' },
                  ]}>
                  {item.valueTitle}
                </Text>
              </View>
            ) : (
              <FilterButton
                label={item.title}
                onPress={() => this._toggle(index)}
                isToggle={findIndex !== -1 ? feeState[findIndex].toggle : false}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
            )}

            {feeState[findIndex] &&
            item.value &&
            feeState[findIndex].toggle === true ? (
              <TableInfo borderBottom={true} data={item.value} />
            ) : null}
          </View>
        );
      });

    return (
      <SafeAreaView style={S.container}>

          <HistoryBackActionBar
            title={this.state.warehouseName}
            navigation={this.navigation}
          />

        <ScrollView>
          <View style={[DefaultStyle._cards, {marginTop: 10 , marginBottom: 120}]}>
            <View style={DefaultStyle._titleCard}>
              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  S.textTitleTenant,
                  { paddingBottom: 0 },
                ]}>
                정산 상세 내역
              </Text>
            </View>

            <View style={[DefaultStyle._card, {marginTop:0}]}>
              <View
                style={[
                  DefaultStyle._headerCardTitle,
                  DefaultStyle._borderBottom,
                ]}>
                <Text
                  style={[
                    DefaultStyle._textTitleCard,
                    S.textTitleTenant,
                    { paddingBottom: 20,paddingTop: 20,paddingLeft: 16 },
                  ]}>
                  계약정보
                </Text>
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo
                  data={dataInfo}
                  borderRow={false}
                  borderBottom={true}
                />
              </View>

              <View style={[DefaultStyle._footerCards, { padding: 16 }]}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline]}
                  onPress={() => {
                  Calculate.getOzUrl({calKey: this.state.id}).then(res => {
                    Linking.canOpenURL(res).then(supported => {
                      if (supported) {
                        Linking.openURL(res);
                      } else {
                        console.log("Don't know how to open URI: " + res);
                      }}).catch(error => {
                        alert('canOpenURL error:' + error);
                      });
                  })

                }}>
                  <Text style={[DefaultStyle._textButton]}>거래명세서</Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.cntrTypeCode && this.state.cntrTypeCode.stdDetailCode === '2100' &&
            <View style={SS.fee}>
              <FilterButton
                  label="입･출고비"
                  onPress={() => this.setState({toggleFee: !toggleFee})}
                  isToggle={toggleFee}
                  style={SS.toggle}
                  styleLabel={SS.textToggle}
              />

              {toggleFee ? (
                  <Fragment>
                    {viewFee}
                  </Fragment>
              ) : null}
              <TableInfo
                  data={inOutSubtotal}
                  style={{borderBottomWidth: 1, borderTopWidth: 0}}
              />
            </View>
            }



            {/* {
              headerDetailResBody && */}
              <View style={SS.fee}>
                <FilterButton
                  label="보관 및 추가비용"
                  onPress={() => this.setState({ toggleCosts: !toggleCosts })}
                  isToggle={!toggleCosts}
                  style={SS.toggle}
                  styleLabel={SS.textToggle}
                />

                <TableInfo
                  data={keepSubtotal}
                  style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                />

                {toggleCosts === true &&
                  <Fragment>
                    {viewCost}
                  </Fragment>
                }
              </View>
            {/* } */}

            <View style={DefaultStyle._card}>
              <View
                style={[
                  DefaultStyle._headerCardTitle,
                  DefaultStyle._borderBottom,
                ]}>
                <Text
                  style={[
                    DefaultStyle._textTitleCard,
                    S.textTitleTenant,
                    { paddingBottom: 20,paddingTop: 20,paddingLeft: 16 },
                  ]}>
                  정산 합계
                </Text>
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo
                  data={dataTotal}
                  borderRow={false}
                  borderBottom={true}
                />
              </View>
            </View>
            <View style={DefaultStyle._card}>
              <View
                style={[
                  DefaultStyle._headerCardTitle,
                  DefaultStyle._borderBottom,
                ]}>
                <Text
                  style={[
                    DefaultStyle._textTitleCard,
                    S.textTitleTenant,
                    { paddingBottom: 20,paddingTop: 20,paddingLeft: 16 },
                  ]}>
                  요율 및 수수료
                </Text>
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo
                  data={dataFeeRate}
                  borderRow={false}
                  borderBottom={true}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
