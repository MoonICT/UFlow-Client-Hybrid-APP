/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text } from 'react-native';
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
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class LogisticsKnowledge extends Component {
  constructor (props) {
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
  async componentDidMount () {
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

  getListCategory () {
    LogisticsKnowledgeService.getNameCate('CSSP0002')
      .then(res => {
        // console.log('res=>>', res._embedded.detailCodes);
        let dataArray = res._embedded.detailCodes.map(item => {
          return {
            // remark1: item.remark1,
            // stdCode: item.stdCode,
            // stdCodeName: item.stdCodeName,
            title: item.stdDetailCodeName,
            stdDetailCode: item.stdDetailCode,
            // value1: item.value1,
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

  fetchData (params) {
    const { dutyDvCode } = this.state;
    LogisticsKnowledgeService.getLogisticsList({
      ...params,
      dutyDvCode: dutyDvCode,
    })
      .then(res => {
        console.log('::::: Logistics List :::::', res.data._embedded);
        if (res.status === 200) {
          this.setState({
            logisticsList: res.data && res.data._embedded && res.data._embedded.lgsts ? res.data._embedded.lgsts : [],
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

  render () {
    const { logisticsList, title, listCategory } = this.state;
    // console.log('logisticsList -> ', logisticsList);

    const Divider = () => {
      return <View style={S.divider} />;
    };

    const handleQueryChange = debounce(query => {
      this.fetchData({ query: query });

    }, 200);

    const handleClickTab = (tabStatus, index) => {
      // console.log('tabName -> ', tabStatus);
      // console.log('index -> ', index);
      this.setState(
        {
          dutyDvCode: tabStatus.stdDetailCode,
          title: tabStatus.title,
        },
        function () {
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
          title={getMsg(this.props.lang, 'ML0448', '물류지식 게시판')}
          navigation={this.navigation}
        />
        <ScrollView>
          <View style={S.viewSearch}>
            <Searchbar
              inputStyle={S.searchInput}
              placeholder={getMsg(this.props.lang, 'ML0053', '검색하기')}
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
          {this.state.logisticsList.length === 0 &&
          <View style={{ padding: 16 }}>
            <Text style={{ textAlign: 'center', marginTop: 20, }}>
              {getMsg(this.props.lang, '', '등록 된 데이터가 없습니다.')}
            </Text>
          </View>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LogisticsKnowledge;
