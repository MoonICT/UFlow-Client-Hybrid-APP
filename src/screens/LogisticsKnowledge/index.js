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
import HTML from 'react-native-render-html';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Accordion from '@Components/organisms/Accordion';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { styles as S } from './style';
import { LogisticsKnowledgeService } from '@Services/apis';
import { debounce } from 'lodash';

// const tabDutyDvCode = [
//   {
//     id: '',
//     title: '전체'
//   },
//   {
//     id: 'WHRG',
//     title: '창고등록'
//   },
//   {
//     id: 'RTWH',
//     title: '공유창고'
//   },
//   {
//     id: 'WHSR',
//     title: '창고조회'
//   },
//   {
//     id: 'WHMC',
//     title: '창고매칭'
//   },
//   {
//     id: 'PRMM',
//     title: '프리미엄'
//   },
//   {
//     id: 'FFMT',
//     title: '풀필먼트'
//   },
//   {
//     id: 'CSSP',
//     title: '고객지원'
//   },
//   {
//     id: 'CNTR',
//     title: '계약'
//   },
//   {
//     id: 'MBSP',
//     title: '회원가입'
//   },
//   {
//     id: 'MANG',
//     title: '관리자'
//   },
//   {
//     id: 'SRVY',
//     title: '설문'
//   },
// ];

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
      title: 'All',
      listCategory: [],
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    this.fetchData();
    this.getListCategory();
  }

  /** when update state or props */
  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('::componentDidUpdate::');
  // }

  /** listener when change props */
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  /** when exits screen */
  // componentWillUnmount() {
  //   // console.log('//::componentWillUnmount::');
  // }

  getListCategory() {
    console.log('res=>>');
    LogisticsKnowledgeService.getNameCate('CSSP0002')
      .then(res => {
        console.log('res=>>');
        let dataArray = res._embedded.detailCodes.map(item => {
          return {
            remark1: item.remark1,
            stdCode: item.stdCode,
            stdCodeName: item.stdCodeName,
            stdDetailCode: item.stdDetailCode,
            title: item.stdDetailCodeName,
            value1: item.value1,
          };
        });
        this.setState({
          listCategory: [
            {
              title: 'All',
              stdDetailCode: '',
            },
            ...dataArray,
          ],
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  fetchData(params) {
    const { dutyDvCode } = this.state;
    LogisticsKnowledgeService.getLogisticsList({
      ...params,
      dutyDvCode: dutyDvCode,
    })
      .then(res => {
        console.log('::::: Logistics List :::::', res);
        if (res.status === 200) {
          this.setState({
            logisticsList: res.data._embedded && res.data._embedded.lgsts,
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
    const { logisticsList, title, listCategory } = this.state;
    // console.log('logisticsList -> ', logisticsList);

    const Divider = () => {
      return <View style={S.divider} />;
    };

    const handleQueryChange = debounce(query => {
      this.fetchData({ query: query });

    }, 200);

    const handleClickTab = (tabName, index) => {
      // console.log('tabName -> ', tabName);
      // console.log('index -> ', index);
      this.setState(
        {
          dutyDvCode: listCategory[index].stdDetailCode,
          title: tabName,
        },
        function() {
          this.fetchData();
        },
      );
    };

    const items =
      logisticsList &&
      logisticsList.length > 0 &&
      logisticsList.map((item, index) => {
        return (
          <View key={index}>
            <List.Accordion
              key={index}
              style={DefaultStyle._titleAccordion}
              title={item.qstnCountent}
              titleStyle={[DefaultStyle._contentAccordion, S.title]}
              id={`${index}`}>
              <View style={[DefaultStyle.bgMuted, S.descript]}>
                <HTML
                  tagsStyles={{ p: { marginBottom: 0, marginTop: 0 } }}
                  source={{ html: item.rplyContent ? item.rplyContent : '' }}
                />
              </View>
            </List.Accordion>
            <Divider />
          </View>
        );
      });

    return (
      <SafeAreaView style={S.container}>
        {/* <Appbars>
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
        </Appbars> */}

        <HistoryBackActionBar
            title={'물류지식 게시판'}
            navigation={this.navigation}
          />
        <ScrollView>
          <View style={S.viewSearch}>
            <Searchbar
              inputStyle={S.searchInput}
              placeholder="검색하기"
              onChangeText={query => handleQueryChange(query)}
              value={this.state.firstQuery}
            />
          </View>
          <AppGrid
            data={listCategory}
            title={title}
            titleProps={handleClickTab}
          />
          <Accordion type="group">{items}</Accordion>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LogisticsKnowledge;
