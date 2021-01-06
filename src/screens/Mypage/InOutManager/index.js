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
import { Appbar, Card, Text, RadioButton } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import CardMypage from '@Components/organisms/CardMypage';
import TextField from '@Components/organisms/TextField';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Fontisto';
import card from '@Assets/images/card-img.png';
import { InOutManagerService } from '@Services/apis'
import { styles as S } from '../style';
import { styles as SS } from './style';
import DatePicker from '@react-native-community/datetimepicker';
import {formatDateV1} from '@Utils/dateFormat';
import {SIGNED_CONTRACT} from '@Constant/enumCode'
var searchTimerQuery;
export default class InOutManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      dataCard : [],
      valueTab: 'OWNER',
      filter: {
        query: '',
        contractType: 2100,
        rangeTime: '',
        startDate: new Date(),
        endDate: new Date()
      },
      isOpenStart: false,
      isOpenEnd: false,
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


    /** when after render DOM */
    componentDidMount() {
      this.getAllData()
    }


  async getAllData(){
    let { filter, valueTab } = this.state;
    let {startDate, endDate, query, contractType} = filter;
    let params = {
      startDate,
      endDate,
      query,
      rangeDate: '',
      type: valueTab,
      contractType
    };
    await InOutManagerService.getAll(params).then((res) => {
      let newData = res.data.data.content.map((item) => {
        return {
          image: card,
          statusCode: item.cntrDvCode,
          rentWarehNo: item.rentWarehNo,
          status: item.status,
          name: item.name,
          labelList: [
            {
              type: '창고 주소',
              value: item.rentWarehNo || '',
            },
            {
              type: '수탁 기간',
              value: `${formatDateV1(item.cntrYmdForm)} - ${formatDateV1(item.cntrYmdTo)}`,
            },
            {
              type: '진행 상태',
              value: '수탁 진행 중',
              highlight:  item.cntrDvCode == SIGNED_CONTRACT.code ? true : false,
            },
            {
              type: '입출고료 합계',
              value: item.totalWhrg,
            }
          ]
        }
      })

      this.setState({
        dataCard: newData
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
    const { valueTab, isOpenStart, isOpenEnd, rangeDay, dataCard } = this.state;
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
            입･출고 관리
          </Text>
        </View>
        <Text style={SS.infoContent}>
          수탁 계약이 완료된 창고의 입고, 출고 내역을 확인해 주세요.
        </Text>

        <View style={S.filter}>
          <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>

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
            <View style={[S.optionSelect, S.optionSelectLeft, {height: 57}]}>
              <Select data={rangeDay} style={S.select} onChange = {this.onChangeRangeDay}/>
            </View>
          </View>
          <TextField
            styleProps={DefaultStyle._inputSearch}
            placeholder="검색어를 입력해 주세요."
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
          dataCard.length > 0 && dataCard.map((item, index) => {
            return (
              <CardMypage
                  key={index}
                  onPressHeader={() => this.navigation.navigate('DetailsManager',{
                    rentWarehNo: item.rentWarehNo,
                    type: valueTab
                  })}
                  headerTitle={item.name}
                  data={item.labelList}
                  borderRow={false}
                  styleLeft={S.styleLeftTable}
                  styleRight={S.styleRightTable}
                  bgrImage={item.image}
                  footer={
                    <View
                      style={[
                        DefaultStyle._listBtn,
                        { marginTop: 0, marginBottom: 0 },
                      ]}>
                      <TouchableOpacity
                        style={[DefaultStyle._btnInline, DefaultStyle._btnLeft]}
                        onPress={() => this.showConfirm()}>
                        <Text
                          style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                          입고요청
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          DefaultStyle._btnInline,
                          DefaultStyle._btnRight,
                          { backgroundColor: '#e64a19' },
                        ]}
                        onPress={() => console.log('출고 요청')}>
                        <Text
                          style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                          출고 요청
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                />
            )
          })
        }

        

        {/* <CardMypage
          onPressHeader={() => this.navigation.navigate('DetailsManager')}
          headerTitle={'에이씨티앤코아물류3'}
          data={dataCompletion}
          borderRow={false}
          styleLeft={S.styleLeftTable}
          styleRight={S.styleRightTable}
          bgrImage={card}
        /> */}
      </View>
    );
  }



}
