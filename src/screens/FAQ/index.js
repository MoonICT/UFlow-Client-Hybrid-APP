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
import Appbars from '../../components/organisms/AppBar';

import ProductCard from '@Components/organisms/ProductCard';
import AppGrid from '@Components/organisms/AppGrid';
import Accordion from '@Components/organisms/Accordion';

import ActionCreator from '../../actions';
import cardBG from '@Assets/images/card-img.png';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dataList = [
  {
    title: '간편결제(계좌이쳬)로 결제하면 현금영수증을 발급할 수 있나요?',
    content:
      '카카오페이(계좌이체), 네이버페이(계좌이체), 토스(계좌이체)로 결제 시,결제가 완료된 주문 건에 대하여 발급되며, 영업일 기준 최대 1일 정도 소요됩니다.• 경로 : 주문내역 > 간편결제(계좌이체) 주문 선택 > ‘현금 영수증 보기’ 클릭',
  },
  {
    title: '결제 취소는 어떻게 하나요?',
    content: '결제 취소는 어떻게 하나요?',
  },
];
const data = [
  {
    title: 'TOP10',
    // content: dataList,
  },
  {
    title: '회원가입',
  },
  {
    title: '창고조회',
  },
  {
    title: '창고등록',
  },
  {
    title: '창고등록5',
  },
  {
    title: '창고등록6',
  },
];

class RegisterWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { active: 0, checked: true, checked2: false, activeIndex: 0 };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  _renderProductItem = ({ item }) => {
    return <ProductCard data={{ ...item, img: cardBG }} />;
  };
  render() {
    const { imageStore, workComplete } = this.props;
    const items =
      dataList &&
      dataList.map((item, index) => {
        return (
          <List.Accordion
            key={index}
            style={DefaultStyle._titleAccordion}
            title={item.title}
            titleStyle={[DefaultStyle._contentAccordion,S.title]}
            id={`${index}`}>
            <List.Item
              numberOfLines={5}
              description={item.content}
              titleStyle={S.descript}
            />
          </List.Accordion>
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
            title="공지사항"
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
              onChangeText={query => {
                this.setState({ firstQuery: query });
              }}
              value={this.state.firstQuery}
            />
          </View>
          <AppGrid data={data} />
          <Accordion type="group">{items}</Accordion>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.imageData,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterWH);
