/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Searchbar } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import DatePicker from '@Components/organisms/DatePicker';
// import DatePicker from '@react-native-community/datetimepicker';
import Select from '@Components/organisms/Select';
import AppGrid from '@Components/organisms/AppGrid';
import { getAllInquiry } from '@Services/apis/InquiryAPI';
import { debounce } from 'lodash';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { log } from 'react-native-reanimated';

const selectOptions = [
  {
    label: '창고주 ',
    value: '창고주 ',
  },
  {
    label: '임차인 ',
    value: '임차인 ',
  },
];

const tabInquiry = [
  {
    id: 'TENANT',
    typeQuestion: 'GENERAL',
    title: '전체문의',
  },
  {
    id: 'OWNER',
    typeQuestion: 'WAREHOUSE',
    title: '창고문의',
  },
];

class Inquiry extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      showFrom: false,
      mode: 'date',
      from: '',
      to: '',
      showTo: false,
      inquiryCode: 'TENANT',
      userType: 'TENANT',
      typeQuestion: 'GENERAL',
      listQuestion: [],
      query:'',
      titleActive:'전체문의'
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    this.getAllData();
    // SplashScreen.hide();
  }

  // /** when update state or props */
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('::componentDidUpdate::');
  // }

  // /** when exits screen */
  // componentWillUnmount() {
  //   //console.log('//::componentWillUnmount::');
  // }

  // /** listener when change props */
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  async getAllData() {
    let { userType, typeQuestion, from, to, query } = this.state;
    const startDate = from ? this.formatDate(from) : '';
    const endDate = to ? this.formatDate(to) : '';
    let defaultParams = {
      userType,
      typeQuestion,
      startDate,
      endDate,
      query
    };

    console.log('defaultParams', defaultParams);

    await getAllInquiry(defaultParams).then(res => {
      console.log('data', res.data._embedded);
      this.setState({ listQuestion: res.data._embedded && res.data._embedded.questions });
    }).catch(error => {
      alert('Inquiry getAllInquiry error:' + error);
    });
  }

  handleClickTab = (tabName, index) => {
    this.setState(
      {
        inquiryCode: tabInquiry[index].id,
        userType: tabInquiry[index].id,
        typeQuestion: tabInquiry[index].typeQuestion,
        titleActive: tabName
      },
      () => {
        this.getAllData();
      },
    );
  };

  showDatepicker = () => {
    this.setState({ showFrom: true });
  };
  formatDate(date, string = true) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (string) {
      return [year, month, day].join('-') + ' ' + '10:00:00';
    } else {
      return [year, month, day].join('.');
    }
  }
  onChangeFrom = (event, selectedDate) => {
    const startDate = selectedDate || this.state.from;
    let dateObjStart = new Date(startDate);
    let dateObjEnd = new Date(this.state.to);
    let timeStartConvert = this.formatDate(dateObjStart);
    let timeEndConvert = this.formatDate(dateObjEnd);
    this.setState({ from: startDate, showFrom: false }, () => {
      this.getAllData();
    });
  };

  showDatepickerTo = () => {
    this.setState({ showTo: true });
  };

  onChangeTo = (event, selectedDate) => {
    const endDate = selectedDate || this.state.to;
    let dateObjEnd = new Date(endDate);
    let dateObjStart = new Date(this.state.from);
    let timeStartConvert = this.formatDate(dateObjStart);
    let timeEndConvert = this.formatDate(dateObjEnd);
    this.setState({ to: endDate, showTo: false }, () => {
      this.getAllData();
    });
  };

  // onChangeFrom = (value) =>{
  // this.setState({ from: value })
  // console.log('from',this.state.from);
  // }
  // onChangeTo = (value) => {
  //   this.setState({ to: value })
  // console.log('to',this.state.to);
  // }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  handleQueryChange = (query) => {
    this.setState({ query: query}, () => {
      this.getAllData();
    });
  };

  render() {
    const {
      from,
      showFrom,
      mode,
      to,
      showTo,
      firstQuery,
      inquiryCode,
      userType,
      listQuestion,
      titleActive
    } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="문의내역"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <AppGrid data={tabInquiry} title={titleActive} titleProps={this.handleClickTab} />
          </View>
          <View style={S.filter}>
            <Searchbar
              inputStyle={[DefaultStyle._search, S.search]}
              placeholder="검색하기"
              onChangeText={query => this.handleQueryChange(query)}
              value={firstQuery}
            />
            <View
              style={[
                S.row,
                { justifyContent: 'center', marginBottom: 18, marginTop: 18 },
              ]}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={this.showDatepicker}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                    {from ? from.toLocaleDateString() : 'YYYY-MM-DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000' },
                    ]}>
                    수탁 기간
                  </Text>
                  <DatePicker
                    mode={mode}
                    show={showFrom}
                    onChange={this.onChangeFrom}
                    // onChange={e => console.log(e)}

                    value={from ? from : (new Date())}
                    testID="dateTimePicker"
                  />
                </TouchableOpacity>
              </View>
              <Text style={S.hyphen}> - </Text>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={this.showDatepickerTo}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                  {to ? to.toLocaleDateString() : 'YYYY-MM-DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000' },
                    ]}>
                    보관 기간
                  </Text>
                  <DatePicker
                    mode={mode}
                    show={showTo}
                    onChange={this.onChangeTo}
                    value={to ? to :  (new Date())}
                    testID="dateTimePickerTo"
                  />
                </TouchableOpacity>
              </View>
              {inquiryCode === 'OWNER' && (
                <View style={({ flex: 1 }, [S.optionSelect, S.selectLong])}>
                  <Select
                    data={selectOptions}
                    style={S.select}
                    valueProps={e => {
                      this.setState({ userType: e }, () => {
                        this.getAllData();
                      });
                      // console.log("userType", userType)
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          {/* GENERAL TAB */}
          {listQuestion && inquiryCode === 'TENANT' && (
            <View>
              {listQuestion && listQuestion.length > 0 && listQuestion.map((item, index) => {
                let dateTime = new Date(item.date);
                let dateStr = this.formatDate(dateTime, false);
                let _item = { ...item, userType: userType };
                {
                  /* console.log('_item  ', _item); */
                }
                return (
                  <TouchableOpacity
                    key={index}
                    style={DefaultStyle.btnItem}
                    // onPress={() => {
                    //   if ((item.complete === true) && (userType === 'TENANT')) {
                    //     this.navigation.navigate('DetailInquiry', { inquiryDetails: item, type: 'OWNER' })
                    //   }
                    // }}
                    onPress={() => {
                      if (item.complete === true) {
                        this.navigation.navigate('DetailInquiry', {
                          inquiryDetails: _item,
                        });
                      }
                    }}
                    // onPress={() => {
                    //   if ((item.complete === true && userType === 'OWNER') || (item.complete === true && userType === 'TENANT')) {
                    //    (this.navigation.navigate('DetailInquiry', { inquiryDetails: _item }))
                    //   }
                    // }}
                  >
                    <View style={DefaultStyle.leftItem}>
                      <Text>123123</Text>
                      {item.complete === false ? (
                        <Text style={[S.status]}>답변 대기 중123</Text>
                      ) : (
                        <Text style={[S.status, S.statusComplete]}>
                          답변 완료
                        </Text>
                      )}
                      {/* <Text style={[S.status, S.statusComplete]}>답변 완료</Text> */}
                      <Text style={DefaultStyle.titleItem}>{item.content}</Text>
                      <Text style={DefaultStyle.contentItem}>{dateStr}</Text>
                    </View>
                    {item.complete === true && (
                      <View style={DefaultStyle.rightItem}>
                        <Icon
                          name="arrow-forward-ios"
                          size={12}
                          color="rgba(0, 0, 0, 0.54)"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* WAREHOUSE TAB */}
          {listQuestion && inquiryCode === 'OWNER' && (
            <View>
              {listQuestion && listQuestion.length > 0 && listQuestion.map((item, index) => {
                let dateTime = new Date(item.date);
                {
                  /* let dateStr = dateTime.getFullYear() + '.' + dateTime.getMonth() + '.' + dateTime.getDate(); */
                }
                let dateStr = this.formatDate(dateTime, false);
                let _item = { ...item, userType: userType };
                console.log('_item  ', _item);
                return (
                  <TouchableOpacity
                    key={index}
                    style={DefaultStyle.btnItem}
                    // onPress={() =>
                    //   this.navigation.navigate('DetailInquiry', { inquiryDetails: item, type: 'OWNER' })
                    // }
                    // onPress={() => this.navigation.navigate('DetailInquiry', { inquiryDetails: _item })}
                    onPress={() => {
                      if (
                        (item.complete === true && userType === 'OWNER') ||
                        (item.complete === true && userType === 'TENANT') ||
                        (item.complete === false && userType === 'OWNER')
                      ) {
                        this.navigation.navigate('DetailInquiry', {
                          inquiryDetails: _item,
                        });
                      }
                    }}>
                    <View style={DefaultStyle.leftItem}>
                      {item.complete === false ? (
                        <Text style={[S.status]}>답변 대기 중</Text>
                      ) : (
                        <Text style={[S.status, S.statusComplete]}>
                          답변 완료
                        </Text>
                      )}
                      {/* <Text style={[S.status, S.statusComplete]}>답변 완료</Text> */}
                      <Text style={DefaultStyle.titleItem}>{item.content}</Text>
                      <Text style={DefaultStyle.contentItem}>{dateStr}</Text>
                    </View>
                    {userType === 'OWNER' && (
                      <View style={DefaultStyle.rightItem}>
                        <Icon
                          name="arrow-forward-ios"
                          size={12}
                          color="rgba(0, 0, 0, 0.54)"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Inquiry;
