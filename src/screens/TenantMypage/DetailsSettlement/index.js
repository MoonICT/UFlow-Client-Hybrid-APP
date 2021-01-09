/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
import Select from '@Components/organisms/Select';
import FilterButton from '@Components/atoms/FilterButton';
import DatePicker from '@react-native-community/datetimepicker';
import {formatDateV1} from '@Utils/dateFormat';
// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import { SettlementManagementService } from '@Services/apis'
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';

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
      toggleFee: true,
      toggleCosts: true,
      feeState: [],
      isOpenStart: false,
      isOpenEnd: false,
      toggleTotal: true,
      filter: {
        startDate: new Date(),
        endDate: new Date()
      },
      dataInfo: [],
      viewProgress: [],
      viewProgressCost: [],
      dataCost: [],
      headerDetailResBody: null,
      dataTotal: [],
      dataFee: []
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
    SettlementManagementService.getDetail(params).then((res) => {
      if(res.data.msg !== 'success') {
        return
      }
      let settlementHeaderResBody = res.data.data.settlementHeaderResBody
      let headerDetailResBody = res.data.data.headerDetailResBody
      let headerDetail1ResBody = res.data.data.headerDetail1ResBody
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
          type: '기간',
          value: `${headerDetail1ResBody.cntrYmdFrom} - ${headerDetail1ResBody.cntrYmdTo}`,
        },
        {
          type: '담당자',
          value: '홍길동',
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
      console.log('res', res)
      let viewProgress = [
        {
          type: '정산기간',
          value: `${headerDetail1ResBody.cntrYmdFrom} - ${headerDetail1ResBody.cntrYmdTo}`
        },
        {
          type: '정산단위',
          value: headerDetail1ResBody.calUnitDvCode.stdDetailCodeName
        },
        {
          type: '가용수치',
          value: headerDetail1ResBody.usblValue
        },
        {
          type: '입고단가',
          value: headerDetail1ResBody.whinChrg
        },
        {
          type: '출고단가',
          value: headerDetail1ResBody.whoutChrg
        },
        {
          type: '재고단가 (보관비)',
          value: headerDetail1ResBody.splyAmount
        }
      ]

      let viewProgressCost = [
        // {
        //   type: '정산기간',
        //   value: '200',
        // },
        // {
        //   type: '정산단위',
        //   value: '200',
        // },
        // {
        //   type: '전용면적',
        //   value: '400',
        // },
        // {
        //   type: '보관단가',
        //   value: '200,000',
        // },
        // {
        //   type: '관리단가',
        //   value: '200,000',
        // }


        {
          type: '구분',
          value: '200,000',
        },
        {
          type: '보관비',
          value: '200,000',
        },
        {
          type: '관리비',
          value: '200,000',
        },
      ]




      let vat = res.data.data.vat || 10
      let dataTotal = [
        {
          type: '공급가액',
          value: res.data.data.amount,
        },
        {
          type: '부가세',
          value: vat,
        },
        {
          type: '합계금액',
          value: res.data.data.amount + vat,
        }
      ]
      let dataFee = res.data.data.calMgmtDetail1ResBodyList.map((item, index) => {
        return {
          title: item.occr,
          value: [
            // {
            //   type: '구분',
            //   value: '보관단가'
            // },
            {
              type: '일시',
              value: item.occr
            },
            {
              type: '입고량',
              value: item.whinQty || ''
            },
            {
              type: '출고량',
              value: item.whoutQty || '0'
            },
            {
              type: '재고량',
              value: item.stckQty || '0'
            },
            {
              type: '입고비',
              value: item.whinUprice || '0'
            },
            {
              type: '출고비',
              value: item.whoutUprice || '0'
            },
            {
              type: '재고비',
              value: item.stckUprice || '0'
            },
            {
              type: '합계',
              value: item.amount || ''
            },
            {
              type: '비고',
              value: item.remark || ''
            }
          ]
        }
      })
      let countTotal = 0
      res.data.data.calMgmtDetailResBodyList.forEach((item, index) => {
        countTotal += item.vat
      })
      let dataCost = res.data.data.calMgmtDetailResBodyList.map((item, index) => {
        return {
          title: item.typeDvCode.stdDetailCodeName,
          value: [
            {
              type: '구분',
              value: item.typeDvCode.stdDetailCodeName
            },
            {
              type: '비용',
              value: item.amount || 0
            },
            {
              type: '비고',
              value: item.remark || ''
            }
          ]
        }
      })

      

      dataCost.unshift({
          title: '합계',
          value: [
            {
              type: '총 합계',
              value: countTotal
            }
          ]
      })





      this.setState({
        dataInfo, viewProgress, headerDetailResBody, dataCost, dataTotal, dataFee, viewProgressCost
      })
    })


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




  showDateStart = () => {
    let {isOpenStart} = this.state
    this.setState({
      isOpenStart: !isOpenStart
    })
  }

  showDateEnd = () => {
    let {isOpenEnd} = this.state
    this.setState({
      isOpenEnd: !isOpenEnd
    })
  }


  onChangeStart = (event, selectedDate) => {
    let {isOpenStart} = this.state
    if(event.type == 'dismissed') {
      this.setState({
        isOpenStart: !isOpenStart
      })
    } else {
      let filter =  {...this.state.filter}
      filter.startDate = event.nativeEvent.timestamp
      this.setState({
        filter: filter,
        isOpenStart: !isOpenStart
      }, () => {
        // this.getAllData()
      })
    }
  }

  onChangeEnd = (event, selectedDate) => {
    let {isOpenEnd} = this.state
    if(event.type == 'dismissed') {
      this.setState({
        isOpenEnd: !isOpenEnd
      })
    } else {
      let filter =  {...this.state.filter}
      filter.endDate = event.nativeEvent.timestamp
      this.setState({
        filter: filter,
        isOpenEnd: !isOpenEnd
      },() => {
        // this.getAllData()
      })
    }

  };

  renderbang2(data) {

  }


  render() {
    const { feeState, toggleFee, toggleCosts, isOpenStart, isOpenEnd, toggleTotal, viewProgress, dataInfo, dataTotal, dataFee , dataCost, viewProgressCost} = this.state;
    let {startDate, endDate} = this.state.filter;

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
        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
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
                    { paddingBottom: 0 },
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
              {/* <View style={[DefaultStyle._footerCards, { padding: 16 }]}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline]}
                  onPress={() => {}}>
                  <Text style={[DefaultStyle._textButton]}>거래명세서</Text>
                </TouchableOpacity>
              </View> */}
            </View>

            {/* <View style={S.filter}>
              <View style={[S.options, { justifyContent: 'flex-start' }]}>
                <View style={[S.optionSelect, S.optionSelectLeft]}>

                  <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={()=>this.showDateStart()}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                    {formatDateV1(startDate)}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000' },
                    ]}>
                    수탁 기간
                  </Text>
                  {
                    isOpenStart && 
                    <DatePicker
                    mode={'date'}
                    show={isOpenStart}
                    onChange={(e) =>this.onChangeStart(e)}
                    value={startDate}
                    testID="dateTimePicker"
                  />
                  }
                </TouchableOpacity>
              </View>

                </View>
                <Text style={S.hyphen}>-</Text>
                <View style={[S.optionSelect, S.optionSelectLeft]}>

                  <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={()=>this.showDateEnd()}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                    {formatDateV1(endDate)}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000' },
                    ]}>
                    수탁 기간
                  </Text>
                  {
                    isOpenEnd && 
                      <DatePicker
                        mode={'date'}
                        show={isOpenEnd}
                        onChange={(e)=>this.onChangeEnd(e)}
                        value={endDate}
                        testID="dateTimePicker"
                      />
                  }

                </TouchableOpacity>
              </View>


                </View>
              </View>
            </View> */}

            <View style={SS.fee}>
              <FilterButton
                label="입･출고비"
                onPress={() => this.setState({ toggleFee: !toggleFee })}
                isToggle={toggleFee}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
              {toggleFee === false ? (
                <Fragment>
                  <TableInfo
                    data={viewProgress}
                    style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                  />
                  {viewFee}
                </Fragment>
              ) : null}
            </View>

           


            {/* {
              headerDetailResBody && */}
              <View style={SS.fee}>
                <FilterButton
                  label="보관 및 추가비용"
                  onPress={() => this.setState({ toggleCosts: !toggleCosts })}
                  isToggle={toggleCosts}
                  style={SS.toggle}
                  styleLabel={SS.textToggle}
                />
                {toggleCosts === true ? (
                  <Fragment>
                    <TableInfo
                      data={[]}
                      style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                    />
                    {viewCost}
                  </Fragment>
                ) : null}
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
                    { paddingBottom: 0 },
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
