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
  TextInput,
} from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Text} from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';
import {SettlementManagementService} from '@Services/apis'
import Icon from 'react-native-vector-icons/Fontisto';
import {formatDateV1} from '@Utils/dateFormat';
import {styles as S} from '../style';

var searchTimerQuery;
export default class SettlementManagement extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      userType: 'OWNER',
      rows: [],
      filter: {
        query: '',
        contractType: 2100,
        rangeTime: '',
        startDate: new Date(),
        endDate: new Date()
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

  componentDidMount() {
    this.getAllData()
  }

  async getAllData() {
    let {startDate, endDate, query, contractType} = this.state.filter;

    let params = {
      startDate,
      endDate,
      query,
      rangeDate: '',
      type: this.state.userType,
      contractType
    };

    SettlementManagementService.getAll(params).then((res) => {
      if (res.data.msg !== 'success') {
        return
      }

      let newRows = res.data.data.content.map((item, index) => {
        return {
          id: item.id,
          warehouseName: item.warehouseName,
          dataRedwood: [
            {
              type: '정산 기간',
              value: `${item.cntrYmdFrom} - ${item.cntrYmdTo}`,
            },
            {
              type: '계약 유형',
              value: item.cntrDvCode.stdCodeName,
            },
            {
              type: '정산 합계 (VAT포함)',
              value: `${item.amount}원`,
            },
          ]
        }
      })


      this.setState({
        rows: newRows
      })
    })
  }


  onChangeTab(value) {
    console.log('onChangeTab', value);
    this.setState({
      userType: value
    }, () => {
      this.getAllData()
    })
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

  onChangeStart = (date) => {
    let {isOpenStart} = this.state
    let filter = {...this.state.filter}
    filter.startDate = date
    this.setState({
      filter: filter,
      isOpenStart: !isOpenStart
    }, () => {
      this.getAllData()
    })
  };

  onChangeEnd = (date) => {
    let {isOpenEnd} = this.state
    let filter = {...this.state.filter}
    filter.endDate = date
    this.setState({
      filter: filter,
      isOpenEnd: !isOpenEnd
    }, () => {
      this.getAllData()
    })
  };

  onChangeRangeDay = (event, selectedDate) => {
  };

  onChangeKeyWord = (e) => {

    if (searchTimerQuery) {
      clearTimeout(searchTimerQuery);
    }
    searchTimerQuery = setTimeout(async () => {
      this.setState({
        query: this.inputKeyWord.state.value
      }, () => {
        this.getAllData()
      })
    }, 500);
  }


  render() {
    const {userType, rows, isOpenStart, isOpenEnd, rangeDay, dataCard} = this.state
    let {startDate, endDate} = this.state.filter;
    return (
        <View style={DefaultStyle._cards}>

          <View style={DefaultStyle._tabBar}>
            <TouchableOpacity
                style={userType === 'OWNER' ? DefaultStyle._btnTabBar : null}
                onPress={() => this.onChangeTab('OWNER')}
            >
              <Text
                  style={
                    userType === 'OWNER'
                        ? DefaultStyle._textActiveTab
                        : DefaultStyle._textTabBar
                  }
              >
                요청 받은 견적･계약
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={userType === 'TENANT' ? DefaultStyle._btnTabBar : null}
                onPress={() => this.onChangeTab('TENANT')}
            >
              <Text
                  style={
                    userType === 'TENANT'
                        ? DefaultStyle._textActiveTab
                        : DefaultStyle._textTabBar
                  }>
                요청한 견적･계약
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
              <View style={[S.optionSelect, S.optionSelectLeft]}>

                <View style={{flex: 1}}>
                  <TouchableOpacity
                      onPress={() => this.showDateStart()}
                      style={DefaultStyle._btnDate}>
                    <Text style={[DefaultStyle._textDate, DefaultStyle.uiFilter]}>
                      {formatDateV1(startDate)}
                    </Text>
                    <Text
                        style={[
                          DefaultStyle._labelTextField
                        ]}>
                      시작일
                    </Text>
                    {
                      isOpenStart &&
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
              <Text style={S.hyphen}>-</Text>
              <View style={[S.optionSelect, S.optionSelectLeft]}>
                {/* <Select data={dataEnd} style={S.select} /> */}

                <View style={{flex: 1}}>
                  <TouchableOpacity
                      onPress={() => this.showDateEnd()}
                      style={DefaultStyle._btnDate}>
                    <Text style={DefaultStyle._textDate}>
                      {formatDateV1(endDate)}
                    </Text>
                    <Text
                        style={[
                          DefaultStyle._labelTextField,
                          {color: '#000000'},
                        ]}>
                      종료일
                    </Text>
                    {
                      isOpenEnd &&
                      // <DatePicker
                      //   mode={'date'}
                      //   show={isOpenEnd}
                      //   onChange={(e)=>this.onChangeEnd(e)}
                      //   value={endDate}
                      //   testID="dateTimePicker"
                      // />
                      <DateTimePickerModal
                          mode="date"
                          isVisible={isOpenEnd}
                          date={startDate ? startDate : new Date()}
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
              <View style={[S.optionSelect, S.optionSelectLeft]}>
                <Select data={rangeDay} style={S.select}/>
              </View>
            </View>
            <TextField
                styleProps={DefaultStyle._inputSearch}
                placeholder="창고명 검색"
                valueProps={text => console.log('text', text)}
                ref={el => this.inputKeyWord = el}
                onChange={this.onChangeKeyWord}
                rightComponent={
                  <Icon
                      name="search"
                      color="rgba(0, 0, 0, 0.54)"
                      size={17}
                      style={DefaultStyle._searchRightIcon}
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
                        type: userType
                      })}
                      headerTitle={'레드우드'}
                      data={item.dataRedwood}
                      borderBottom={true}
                      borderRow={false}
                      style={{padding: 0}}
                      bgrImage={false}
                      footer={
                        <View
                            style={[
                              DefaultStyle._listBtn,
                              {marginTop: 0, marginBottom: 0, padding: 16, paddingTop: 0},
                            ]}>
                          <TouchableOpacity
                              style={[DefaultStyle._btnOutline]}
                              onPress={() => {
                              }}>
                            <Text style={[DefaultStyle._textButton]}>거래명세서</Text>
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
