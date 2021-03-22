/**
 * 정산 관리
 * @create
 * @modify chonglye chang
 * @desc [description]
 */

// Global Imports
import React, {Component, Fragment} from 'react';
import {styles as S} from '../style';

import Moment from 'moment';
import {dateStr, toStdCd} from '@Utils/StringUtils';
import { money } from '@Services/utils/StringUtils';
import Select from '@Components/organisms/SelectFilter';
import {
  Linking,
  View,
  TouchableOpacity
} from 'react-native';
import {Text} from 'react-native-paper';
import AsyncStorage from "@react-native-community/async-storage";

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';
import {SettlementManagementService, Calculate} from '@Services/apis'
import Icon from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MY_PAGE_TAB_STATUS_KEY } from '@Constant';

var searchTimerQuery;

export default class SettlementManagement extends Component {

  constructor(props) {
    super(props);

    this.webView = null;

    this.state = {
      valueTab: 'OWNER',
      rangeDate: '',
      rows: [],
      filter: {
        query: '',
        contractType: '',
        rangeTime: '',
        startDate: '',
        endDate: ''
      },
      rangeDay: [
        {
          value: '', label: '전체'
        },
        {
          value: '7', label: '7일'
        },
        {
          value: '15', label: '15일'
        },
        {
          value: '30', label: '1개월'
        },
        {
          value: '90', label: '3개월'
        },
        {
          value: '180', label: '6개월'
        },
        {
          value: '365', label: '1년'
        }
      ]
    };

    this.navigation = props.navigation;
  }

  async componentDidMount() {
    console.log("::: 정산 관리 페이지 :::");
    const tabStatus = await AsyncStorage.getItem(MY_PAGE_TAB_STATUS_KEY);
    this.setState(
      {
        valueTab: tabStatus && tabStatus === 'TENANT' ? 'TENANT' : 'OWNER',
      },
      () => {
        this.getAllData();
      },
    );
  }

  async getAllData() {
    let {startDate, endDate, query, contractType, rangeDate} = this.state.filter;
    let {valueTab} = this.state
    let params = {
      startDate: startDate,
      endDate: endDate,
      query,
      rangeDate: rangeDate,
      type: valueTab,
      contractType
    };

    SettlementManagementService.getAll(params).then((res) => {
      console.debug(params, '정산데이터 Params');
      console.debug(res, '정산데이터');
      if (res.data.msg !== 'success') {
        return
      }

      let newRows = res.data.data.content.map((item, index) => {
          return {
            id: item.id,
            warehouseName: item.warehouseName,
            urlTransaction: item.urlTransaction,
            dataRedwood: [
              {
                type: '정산년월',
                value: `${item.cntrYmdFrom ? Moment(item.cntrYmdFrom).format('yyyy.MM') : '-'}`,
              },
              {
                type: '계약 유형',
                value: item.cntrTypeCode ? item.cntrTypeCode.stdDetailCodeName : '',
              },
              {
                type: '정산 합계\n(VAT포함)',
                value: `${(item.amount && item.vat) ? money(item.amount + item.vat) : ''}`,
              },
            ]
          }
        },
        (error) => {
          console.log(error);
        })

      this.setState({
        rows: newRows
      })
    }).catch(error => {
      alert('SettlementManagementService:' + error);
    });
  }


  onChangeTab(value) {
    console.log("onChangeTab", value);

    this.setState({
      valueTab: value
    }, () => {
      this.getAllData()
    })
    AsyncStorage.setItem(MY_PAGE_TAB_STATUS_KEY, value);
  }

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


  onChangeStart = (selectedDate) => {
    let {isOpenStart} = this.state

    let filter = {...this.state.filter}
    filter.startDate = selectedDate
    this.setState({
      filter: filter,
      isOpenStart: !isOpenStart
    }, () => {
      this.getAllData()
    })
  }

  onChangeEnd = (selectedDate) => {
    let {isOpenEnd} = this.state

    let filter = {...this.state.filter}
    filter.endDate = selectedDate
    this.setState({
      filter: filter,
      isOpenEnd: !isOpenEnd
    }, () => {
      this.getAllData()
    })

  };

  onChangeRangeDay = (value) => {
    console.log('onChangeRangeDay', value)
    let filter = {...this.state.filter}
    if (value) {

      const start = Moment().subtract(value, 'days').format('YYYY-MM-DD');
      const end = Moment().format('YYYY-MM-DD');

      filter.startDate = start
      filter.endDate = end
    } else {
      filter.startDate = null
      filter.endDate = null
    }
    this.setState({
      filter: filter
    }, () => {
      this.getAllData()
    })
  };

  onChangeKeyWord = () => {

    if (searchTimerQuery) {
      clearTimeout(searchTimerQuery);
    }
    searchTimerQuery = setTimeout(async () => {
      let filter = {...this.state.filter}
      filter.query = this.inputKeyWord.state.value
      this.setState({
        filter
      }, () => {
        this.getAllData()
      })
    }, 500);
  }

  render() {
    const {valueTab, rows, isOpenStart, isOpenEnd, rangeDay, dataCard} = this.state
    let {startDate, endDate} = this.state.filter;
    return (
      <View style={[DefaultStyle._cards, {marginBottom: 180}]}>

        <View style={DefaultStyle._tabBar}>
          <TouchableOpacity
            style={valueTab === 'OWNER' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.onChangeTab('OWNER')}
          >
            <Text
              style={
                valueTab === 'OWNER'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }
            >
              요청 받은 견적･계약 (창고주)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={valueTab === 'TENANT' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.onChangeTab('TENANT')}
          >
            <Text
              style={
                valueTab === 'TENANT'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청한 견적･계약 (임차인)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={DefaultStyle._titleCard}>
          <Text
            style={[
              DefaultStyle._textTitleCard,
              S.textTitleTenant,
              {paddingBottom: 0},
            ]}>
            정산 관리
          </Text>
        </View>

        <View style={S.filter}>
          <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
            <View style={[S.optionSelect, S.optionSelectLeft, {marginBottom: 25, height: 36}]}>

              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => this.showDateStart()}
                  style={DefaultStyle._btnDateFilter}>
                  <Text style={[DefaultStyle._textDate, {fontSize: 12, paddingTop: 5, textAlign: 'center'}]}>
                    {dateStr(startDate) || 'YYYY-MM-DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      {color: '#000000', fontSize: 12},
                    ]}>
                    시작일
                  </Text>
                  {
                    isOpenStart &&
                    //   <DatePicker
                    //   mode={'date'}
                    //   show={isOpenStart}
                    //   onChange={(e) =>this.onChangeStart(e)}
                    //   value={startDate || new Date()}
                    //   testID="dateTimePicker"
                    // />
                    <DateTimePickerModal
                      mode="date"
                      isVisible={isOpenStart}
                      date={startDate ? startDate : new Date()}
                      onConfirm={(date) => this.onChangeStart(date)}
                      onCancel={() => {
                        this.setState({
                          isOpenStart: false
                        });
                      }}
                    />
                  }
                </TouchableOpacity>
              </View>


            </View>
            <Text style={[S.hyphen, {height: 36, lineHeight: 36}]}>-</Text>
            <View style={[S.optionSelect, S.optionSelectLeft, {height: 36}]}>

              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => this.showDateEnd()}
                  style={DefaultStyle._btnDateFilter}>
                  <Text style={[DefaultStyle._textDate, {fontSize: 12, paddingTop: 5, textAlign: 'center'}]}>
                    {dateStr(endDate) || 'YYYY-MM-DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      {color: '#000000', fontSize: 12},
                    ]}>
                    종료일
                  </Text>
                  {
                    isOpenEnd &&
                    // <DatePicker
                    //   mode={'date'}
                    //   show={isOpenEnd}
                    //   onChange={(e)=>this.onChangeEnd(e)}
                    //   value={endDate || new Date()}
                    //   testID="dateTimePicker"
                    // />
                    <DateTimePickerModal
                      mode="date"
                      isVisible={isOpenEnd}
                      date={endDate ? endDate : new Date()}
                      onConfirm={(date) => this.onChangeEnd(date)}
                      onCancel={() => {
                        this.setState({
                          isOpenEnd: false
                        });
                      }}
                    />
                  }

                </TouchableOpacity>
              </View>


            </View>
            <View style={[S.optionSelect, S.optionSelectLeft, {height: 36}]}>
              <Select data={rangeDay}
                      valueProps={this.onChangeRangeDay}
                      style={[S.select, {height: 36}]}
              />
            </View>
          </View>
          <TextField
            styleProps={[DefaultStyle._inputSearch, {paddingRight: 50}]}
            placeholder="검색어를 입력해 주세요."
            ref={el => this.inputKeyWord = el}
            onChange={this.onChangeKeyWord}
            rightComponent={
              <Icon
                name="search"
                color="rgba(0, 0, 0, 0.54)"
                size={17}
                style={DefaultStyle._searchRightIcon}
                onPress={() => this.onChangeKeyWord()}
              />
            }
          />
        </View>
        {
          rows.map((item, index) => {

            return (
              <CardMypage
                key={index}
                onPressHeader={() => this.navigation.navigate('DetailsSettlement', {
                  id: item.id,
                  type: valueTab,
                  urlTransaction: item.urlTransaction
                })}
                headerTitle={item.warehouseName}
                data={item.dataRedwood}
                borderBottom={true}
                borderRow={false}
                style={{padding: 0}}
                bgrImage={false}
                footer={
                  <View
                    style={[
                      DefaultStyle._listBtn,
                      {marginTop: 17, marginBottom: 0, padding: 16, paddingTop: 0},
                    ]}>
                    <TouchableOpacity
                      style={[DefaultStyle._btnOutline]}
                      onPress={() => {
                        Calculate.getOzUrl({calKey: item.id}).then(res => {
                          Linking.canOpenURL(res).then(supported => {
                            if (supported) {
                              Linking.openURL(res);
                            } else {
                              console.log("Don't know how to open URI: " + res);
                            }
                          })
                        }).catch(error => {
                          alert('getOzUrl:' + error);
                        });

                      }}>
                      <Text style={[DefaultStyle._textButton]}> 거래명세서</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            )
          })
        }

      </View>
    );
  }
}
