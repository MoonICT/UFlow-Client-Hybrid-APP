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
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';

import ProductCard from '@Components/organisms/ProductCard';

import ActionCreator from '../../actions';
import cardBG from '@Assets/images/card-img.png';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          <TouchableOpacity
            style={DefaultStyle.btnItem}
            onPress={() => this.navigation.navigate('DetailAnnoucement')}>
            <View style={DefaultStyle.leftItem}>
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
            onPress={() => this.navigation.navigate('DetailAnnoucement')}>
            <View style={DefaultStyle.leftItem}>
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
