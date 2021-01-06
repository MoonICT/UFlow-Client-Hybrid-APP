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
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';
import { SettlementManagementService } from '@Services/apis'
import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Fontisto';
import {formatDateV1} from '@Utils/dateFormat';
import { styles as S } from '../style';
import DatePicker from '@react-native-community/datetimepicker';
const dataStart = [
  {
    label: '시작일',
    value: '시작일',
  },
];
const dataEnd = [
  {
    label: '종료일',
    value: '종료일',
  },
  {
    label: '종료일2',
    value: '종료일2',
  },
];
const dataAll = [
  {
    label: '계약 유형',
    value: '계약 유형',
  },
  {
    label: '2계약 유형',
    value: '2계약 유형',
  },
];


const dataDongwon = [
  {
    type: '정산 기간',
    value: '2020.11.10 - 2021.11.10',
  },
  {
    type: '계약 유형',
    value: '수탁,보관',
  },
  {
    type: '정산 합계 (VAT포함)',
    value: '1,592,000원',
  },
];
var searchTimerQuery;
export default class SettlementManagement extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      valueTab: 'OWNER',
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

  componentDidMount () {
    this.getAllData()
  }

  async getAllData () {
    let {startDate, endDate, query, contractType, valueTab} = this.state.filter;
    let params = {
      startDate,
      endDate,
      query,
      rangeDate: '',
      type: valueTab,
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


  onChangeTab (value) {
    this.setState({
      valueTab: value
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
        this.getAllData()
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
        this.getAllData()
      })
    }

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
    const {valueTab, rows,  isOpenStart, isOpenEnd, rangeDay, dataCard} = this.state
    let {startDate, endDate} = this.state.filter;
    return (
      <View style={DefaultStyle._cards}>

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
              요청 받은 견적･계약
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
              요청한 견적･계약
            </Text>
          </TouchableOpacity>
        </View>

        <View style={DefaultStyle._titleCard}>
          <Text
            style={[
              DefaultStyle._textTitleCard,
              S.textTitleTenant,
              { paddingBottom: 0 },
            ]}>
            정산 관리
          </Text>
        </View>

        <View style={S.filter}>
          <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
            <View style={[S.optionSelect, S.optionSelectLeft]}>
              {/* <Select data={dataStart} style={S.select} /> */}
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
              {/* <Select data={dataEnd} style={S.select} /> */}

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
            <View style={[S.optionSelect, S.optionSelectLeft]}>
              <Select data={rangeDay} style={S.select} />
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
                key = {index}
                onPressHeader={() => this.navigation.navigate('DetailsSettlement', {
                  id: item.id
                })}
                headerTitle={'레드우드'}
                data={item.dataRedwood}
                borderBottom={true}
                borderRow={false}
                style={{ padding: 0 }}
                bgrImage={false}
                footer={
                <View
                  style={[
                    DefaultStyle._listBtn,
                    { marginTop: 0, marginBottom: 0, padding: 16, paddingTop: 0 },
                  ]}>
                  <TouchableOpacity
                    style={[DefaultStyle._btnOutline]}
                    onPress={() => {}}>
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
