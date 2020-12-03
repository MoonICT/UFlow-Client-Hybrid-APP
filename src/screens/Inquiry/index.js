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
import { Appbar, Text, Searchbar } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';
import Select from '@Components/organisms/Select';

import ProductCard from '@Components/organisms/ProductCard';

import ActionCreator from '../../actions';
import cardBG from '@Assets/images/card-img.png';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dataSelect = [
  {
    label: '시작일',
    value: '시작일',
  },
  {
    label: '시작일2',
    value: '시작일2',
  },
];
const dataSelect2 = [
  {
    label: '종료일',
    value: '종료일',
  },
  {
    label: '종료일2',
    value: '종료일2',
  },
];
const dataSelect3 = [
  {
    label: '1개월',
    value: '1개월',
  },
  {
    label: '1개월2',
    value: '1개월2',
  },
];
class Inquiry extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { firstQuery: '' };
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
    const { firstQuery } = this.state;
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
          <View style={S.filter}>
            <Searchbar
              inputStyle={[DefaultStyle._search, S.search]}
              placeholder="검색하기"
              onChangeText={query => {
                this.setState({ firstQuery: query });
              }}
              value={firstQuery}
            />
            <ScrollView style={S.listSelect} horizontal={true}>
              <View style={S.selectItem}>
                <Select style={S.select} data={dataSelect} />
              </View>
              <View style={S.selectItem}>
                <Select style={S.select} data={dataSelect2} />
              </View>
              <View style={S.selectItem}>
                <Select style={S.select} data={dataSelect3} />
              </View>
              <View style={S.selectItem}>
                <Select style={S.select} data={dataSelect} />
              </View>
              <View style={S.selectItem}>
                <Select style={S.select} data={dataSelect} />
              </View>
              <View style={S.selectItem}>
                <Select style={S.select} data={dataSelect} />
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={DefaultStyle.btnItem}
            onPress={() =>
              this.navigation.navigate('DetailInquiry', { status: 'waitting' })
            }>
            <View style={DefaultStyle.leftItem}>
              <Text style={S.status}>답변 대기 중</Text>
              <Text style={DefaultStyle.titleItem}>
                SKT 휴대폰 본인확인 서비스 중단 안내
              </Text>
              <Text style={DefaultStyle.contentItem}>2020.10.29</Text>
            </View>
            <View style={DefaultStyle.rightItem}>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={DefaultStyle.btnItem}
            onPress={() =>
              this.navigation.navigate('DetailInquiry', { status: 'complete' })
            }>
            <View style={DefaultStyle.leftItem}>
              <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
              <Text style={DefaultStyle.titleItem}>
                [문의유형] 안녕하세요. 문의 드릴 게 있습니다.
              </Text>
              <Text style={DefaultStyle.contentItem}>2020.10.29</Text>
            </View>
            <View style={DefaultStyle.rightItem}>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>
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
)(Inquiry);
