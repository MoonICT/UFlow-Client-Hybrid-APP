/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, List, Searchbar } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Accordion from '@Components/organisms/Accordion';
import { styles as S } from './style';
import { LogisticsKnowledgeService } from '@Services/apis';

import { debounce } from 'lodash'

const tabDutyDvCode = [
  {
    id: '',
    title: '전체'
  },
  {
    id: 'WHRG',
    title: '창고등록'
  },
  {
    id: 'RTWH',
    title: '공유창고'
  },
  {
    id: 'WHSR',
    title: '창고조회'
  },
  {
    id: 'WHMC',
    title: '창고매칭'
  },
  {
    id: 'PRMM',
    title: '프리미엄'
  },
  {
    id: 'FFMT',
    title: '풀필먼트'
  },
  {
    id: 'CSSP',
    title: '고객지원'
  },
  {
    id: 'CNTR',
    title: '계약'
  },
  {
    id: 'MBSP',
    title: '회원가입'
  },
  {
    id: 'MANG',
    title: '관리자'
  },
  {
    id: 'SRVY',
    title: '설문'
  },
];

class LogisticsKnowledge extends Component {

  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      dutyDvCode: '',
      logisticsList: [],
      title:'전체'
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    this.fetchData()
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    // console.log('::componentDidUpdate::');
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    // console.log('//::componentWillUnmount::');
  }

  fetchData(params) {
    LogisticsKnowledgeService.getLogisticsList({ ...params, dutyDvCode: this.state.dutyDvCode })
      .then(res => {
        console.log('::::: Logistics List :::::', res);
        if (res.status === 200) {
          this.setState({
            logisticsList: res.data._embedded.lgsts,
          });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    SplashScreen.hide();
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {

    const { logisticsList, title } = this.state;
    // console.log('logisticsList -> ', logisticsList);

    const Divider = () => {
      return (
        <View style={S.divider}></View>
      )
    }

    const handleQueryChange = debounce((query) => {
      this.fetchData({ query: query })
    }, 200)

    const handleClickTab = (tabName, index) => {
      // console.log('tabName -> ', tabName);
      // console.log('index -> ', index);
      this.setState({ 
        dutyDvCode: tabDutyDvCode[index].id,
        title:tabName
      }, function () {
        this.fetchData()
      });
    }

    const items =
      logisticsList && logisticsList.length > 0 &&
      logisticsList.map((item, index) => {
        return (
          <View key={index}>
            <List.Accordion
              key={index}
              style={DefaultStyle._titleAccordion}
              title={item.qstnCountent}
              titleStyle={[DefaultStyle._contentAccordion, S.title]}
              id={`${index}`}>
              <List.Item
                numberOfLines={5}
                description={item.rplyContent}
                titleStyle={S.descript}
              />
            </List.Accordion>
            <Divider />
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
            title="물류지식 게시판"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={S.viewSearch}>
            <Searchbar
              inputStyle={S.searchInput}
              placeholder="검색하기"
              onChangeText={(query) => handleQueryChange(query)}
              value={this.state.firstQuery}
            />
          </View>
          <AppGrid data={tabDutyDvCode} title={title} titleProps={handleClickTab} />
          <Accordion type="group">{items}</Accordion>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LogisticsKnowledge;
