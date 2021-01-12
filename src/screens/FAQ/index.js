/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, List, Searchbar } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Accordion from '@Components/organisms/Accordion';
import { styles as S } from './style';
import { FAQ } from '@Services/apis';

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

class RegisterWH extends Component {

  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      dutyDvCode: '',
      faqList: [],
      title:'전체'
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    this.fetchData()
  }

  fetchData(params) {
    const { dutyDvCode } = this.state;

    FAQ.getFAQList({ ...params, dutyDvCode: dutyDvCode })
      .then(res => {
        console.log('::::: FAQ List :::::', res);
        if (res.status === 200) {
          this.setState({
            faqList: res.data._embedded && res.data._embedded.faqs,
          });
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
    SplashScreen.hide();
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    const { faqList, title } = this.state;
    console.log('faqList -> ', faqList);

    const Divider = () => {
      return (
        <View style={S.divider}></View>
      )
    }

    const handleQueryChange = (query) => {
      this.fetchData({ query: query })
    }

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
      faqList && faqList.length > 0 &&
      faqList.map((item, index) => {
        return (
          <View>
            <List.Accordion
              key={index}
              style={DefaultStyle._titleAccordion}
              title={item.qstnCountent}
              titleStyle={[DefaultStyle._contentAccordion, S.title]}
              id={`${index}`}>
              <List.Item
                style={[DefaultStyle.bgMuted]}
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
      <ScrollView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="자주 묻는 질문"
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
              // onChangeText={query => {
              //   this.setState({ firstQuery: query });
              // }}
              onChangeText={(query) => handleQueryChange(query)}
              value={this.state.firstQuery}
            />
          </View>
          <AppGrid data={tabDutyDvCode} title={title} titleProps={handleClickTab} />
          <Accordion type="group">{items}</Accordion>
        </ScrollView>
      </ScrollView>
    );
  }


}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterWH);
