/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '../../../actions';
import { styles as S } from '../style';
// import { styles as SS } from './style';
class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { isSwitchOn: false };

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

  render() {
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 위치"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={S.bodyView}>
            <Text style={DefaultStyle.titleItem}>
              SKT 휴대폰 본인확인 서비스 중단 안내
            </Text>
            <Text style={DefaultStyle.contentItem}>2020.10.29</Text>
            <View style={S.content}>
              <Text style={S.textContent}>
                안녕하세요. 유플로우입니다. 안정적인 서비스 제공을 위해 SKT
                휴대폰 본인인증, SKT 알뜰폰 본인인증 시스템 점검이 진행될
                예정입니다.
              </Text>
              <Text style={S.textContent}>
                점검이 진행되는 동안, 해당 결제 수단의 바로결제 서비스 이용이
                제한되니 결제 시 참고 부탁드립니다.
              </Text>
              <Text style={S.textContent}>
                • 점검일시 - 20년 10월 30일(금) 오전 3시 ~ 4시 30분 *점검 시간은
                상황에 따라 조기 종료되거나 연장될 수 있습니다.
              </Text>
              <Text style={S.textContent}>
                • 점검 중 사용이 제한되는 서비스 - SKT 휴대폰 본인인증, SKT
                알뜰폰 본인인증 서비스
              </Text>
              <Text style={S.textContent}>
                더 나은 서비스 제공을 위해 최선을 다하겠습니다. 감사합니다.
              </Text>
            </View>
          </View>
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
    // count: state.home.count,
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterInfo);
