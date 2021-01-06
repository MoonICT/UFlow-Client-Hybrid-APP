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
import Select from '@Components/organisms/Select';
import AppGrid from '@Components/organisms/AppGrid';
import { getAllInquiry } from '@Services/apis/InquiryAPI';
import { debounce } from 'lodash'

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
    title: '전체문의'
  },
  {
    id: 'OWNER',
    typeQuestion: 'WAREHOUSE',
    title: '창고문의'
  },
]

class Inquiry extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      showFrom: false,
      mode: 'date',
      from: new Date(),
      to: new Date(),
      showTo: false,
      inquiryCode: '',
      userType: 'TENANT',
      typeQuestion: 'GENERAL',
      listQuestion: [],
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    this.getAllData();
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  async getAllData(params) {
    let { userType, typeQuestion } = this.state;

    let defaultParams = {
      userType,
      typeQuestion,
      ...params
    }

    await getAllInquiry(defaultParams).then((res) => {
      console.log('res', res)
      if (res.status === 200) {
        this.setState({ listQuestion: res.data._embedded.questions })
      }
    })
  }

  handleClickTab = (tabName, index) => {
    this.setState({ inquiryCode: tabInquiry[index].id, userType: tabInquiry[index].id, typeQuestion: tabInquiry[index].typeQuestion }, () => {
      this.getAllData()
    });
  }

  showDatepicker = () => {
    this.setState({ showFrom: true });
  };

  onChangeFrom = (event, selectedDate) => {
    const startDate = selectedDate || this.state.from;
    let dateObj = new Date(startDate);
    let dateStr = dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDate() + '-' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
    this.setState({ from: startDate, showFrom: false }, () => {
      this.getAllData({ startDate: dateStr })
    });
  };

  showDatepickerTo = () => {
    this.setState({ showTo: true });
  };

  onChangeTo = (event, selectedDate) => {
    const endDate = selectedDate || this.state.to;
    let dateObj = new Date(endDate);
    let dateStr = dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDate() + '-' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
    this.setState({ to: endDate, showTo: false }, () => {
      this.getAllData({ endDate: dateStr })
    });
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {

    const { from, showFrom, mode, to, showTo, firstQuery, inquiryCode, listQuestion } = this.state;

    const handleQueryChange = debounce((query) => {
      this.getAllData({ query: query })
    }, 200)

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
            <AppGrid data={tabInquiry} titleProps={this.handleClickTab} />
          </View>
          <View style={S.filter}>
            <Searchbar
              inputStyle={[DefaultStyle._search, S.search]}
              placeholder="검색하기"
              onChangeText={(query) => handleQueryChange(query)}
              value={firstQuery}
            />
            <View style={[
              S.row,
              { justifyContent: 'center', marginBottom: 18, marginTop: 18 },
            ]}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={this.showDatepicker}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                    {from.toLocaleDateString()}
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
                    value={from}
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
                    {to.toLocaleDateString()}
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
                    value={to}
                    testID="dateTimePickerTo"
                  />
                </TouchableOpacity>
              </View>
              {inquiryCode === 'OWNER' && (
                <View style={{ flex: 1 }, [S.optionSelect, S.selectLong]}>
                  <Select
                    data={selectOptions}
                    style={S.select}
                  />
                </View>
              )}
            </View>
          </View>
          {inquiryCode === 'OWNER' ?
            <View>
              {listQuestion && listQuestion.length > 0 && listQuestion.map((item, index) => {
                let dateTime = new Date(item.date);
                let dateStr = dateTime.getFullYear() + '.' + dateTime.getMonth() + '.' + dateTime.getDate();
                return (
                  <TouchableOpacity
                    style={DefaultStyle.btnItem}
                    onPress={() =>
                      this.navigation.navigate('DetailInquiry', { inquiryDetails: item})
                    }>
                    <View style={DefaultStyle.leftItem}>
                      {item.complete === false ?
                        <Text style={[S.status]}>답변 대기 중</Text>
                        :
                        <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
                      }
                      {/* <Text style={[S.status, S.statusComplete]}>답변 완료</Text> */}
                      <Text style={DefaultStyle.titleItem}>
                        {item.content}
                      </Text>
                      <Text style={DefaultStyle.contentItem}>{dateStr}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
            :
            <View>
              {listQuestion && listQuestion.length > 0 && listQuestion.map((item, index) => {
                let dateTime = new Date(item.date);
                let dateStr = dateTime.getFullYear() + '.' + dateTime.getMonth() + '.' + dateTime.getDate();
                return (
                  <TouchableOpacity
                    key={index}
                    style={DefaultStyle.btnItem}
                    onPress={() =>
                      this.navigation.navigate('DetailInquiry', { inquiryDetails: item, type: 'TENANT' })
                    }>
                    <View style={DefaultStyle.leftItem}>
                      {item.complete === false ?
                        <Text style={[S.status]}>답변 대기 중</Text>
                        :
                        <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
                      }
                      {/* <Text style={[S.status, S.statusComplete]}>답변 완료</Text> */}
                      <Text style={DefaultStyle.titleItem}>
                        {item.content}
                      </Text>
                      <Text style={DefaultStyle.contentItem}>{dateStr}</Text>
                    </View>
                    <View style={DefaultStyle.rightItem}>
                      <Icon
                        name="arrow-forward-ios"
                        size={12}
                        color="rgba(0, 0, 0, 0.54)"
                      />
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Inquiry;
