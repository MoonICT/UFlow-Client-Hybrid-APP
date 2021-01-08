/**
 * 정산 관리
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
import {formatDateV1, formatDateV2 } from '@Utils/dateFormat';
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
      rangeDate: '',
      rows: [],
      filter: {
        query: '',
        contractType: 2100,
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

  componentDidMount () {
    console.log("::: 정산 관리 페이지 :::");
    this.getAllData()
  }

  async getAllData () {
    let {startDate, endDate, query, contractType, rangeDate} = this.state.filter;
    let {valueTab} = this.state
    let params = {
      startDate: formatDateV2(startDate),
      endDate: formatDateV2(endDate),
      query,
      rangeDate: rangeDate,
      type: valueTab,
      contractType
    };

    // params {"contractType": 2100, "endDate": 2021-01-08T11:44:47.122Z, "query": "", "rangeDate": "", "startDate": 2021-01-08T11:44:47.122Z, "type": undefined}

    SettlementManagementService.getAll(params).then((res) => {
      console.debug(params, '정산데이터 Params');
      console.debug(res, '정산데이터');
      if (res.data.msg !== 'success') {
        return
      }

      let newRows = res.data.data.content.map((item, index) => {
        console.debug('item', item);
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
      },
          (error) => { console.log(error); })

      this.setState({
        rows: newRows
      })
    })
  }


  onChangeTab (value) {
    console.log("onChangeTab", value);

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

  onChangeRangeDay = (value) => {
    this.setState({
      rangeDay: value
    }, () => {
      this.getAllData()
    })
  };

  onChangeKeyWord = () => {
    if (searchTimerQuery) {
      clearTimeout(searchTimerQuery);
    }
    searchTimerQuery = setTimeout(async () => {
      let filter =  {...this.state.filter}
      filter.query = this.inputKeyWord.state.value
      this.setState({
        filter
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
              { paddingBottom: 0 },
            ]}>
            정산 관리
          </Text>
        </View>

        <View style={S.filter}>
          <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
            <View style={[S.optionSelect, S.optionSelectLeft , { marginBottom: 25}]}>
              {/* <Select data={dataStart} style={S.select} /> */}
              <View style={{ flex: 1}}>
                <TouchableOpacity
                  onPress={()=>this.showDateStart()}
                  style={DefaultStyle._btnDate}>
                  <Text style={[DefaultStyle._textDate]}>
                    {formatDateV1(startDate) || 'YYYY/MM/DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000' },
                    ]}>
                    수탁 기간1
                  </Text>
                  {
                    isOpenStart &&
                    <DatePicker
                    mode={'date'}
                    show={isOpenStart}
                    onChange={(e) =>this.onChangeStart(e)}
                    value={startDate || new Date()}
                    testID="dateTimePicker"
                  />
                  }
                </TouchableOpacity>
              </View>



            </View>
            <Text style={[S.hyphen, {height: 57, lineHeight: 57}]}>-</Text>
            <View style={[S.optionSelect, S.optionSelectLeft]}>
              {/* <Select data={dataEnd} style={S.select} /> */}

              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={()=>this.showDateEnd()}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                    {formatDateV1(endDate) || 'YYYY/MM/DD'}
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
                        value={endDate || new Date()}
                        testID="dateTimePicker"
                      />
                  }

                </TouchableOpacity>
              </View>


            </View>
            {/* <View style={[S.optionSelect, S.optionSelectLeft]}>
              <Select data={rangeDay} valueProps = {this.onChangeRangeDay} style={S.select}  />
            </View> */}
          </View>
          <TextField
            styleProps={[DefaultStyle._inputSearch, {paddingRight: 50}]}
            placeholder="창고명 검색"
            valueProps={text => console.log('text', text)}
            ref={el => this.inputKeyWord = el}
            // onChange={this.onChangeKeyWord}
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
                key = {index}
                onPressHeader={() => this.navigation.navigate('DetailsSettlement', {
                  id: item.id,
                  type: valueTab
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
                    <Text
                    onPress={() => this.navigation.navigate('DetailsSettlement', {
                      id: item.id
                    })}
                    style={[DefaultStyle._textButton]}>
                       거래명세서
                    </Text>
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
