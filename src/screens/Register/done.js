/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:48
 * @modify date 2020-11-24 19:27:10
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { TextInput, Appbar, Checkbox, Text, Button } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from './style';
//---> Assets

class DoneRegister extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      name: '',
    };
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
    let { name } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.BackAction
            onPress={() => this.navigation.navigate('Login')}
          />
          <Appbar.Content
            title="회원가입"
            color="rgba(0, 0, 0, 0.76)"
            style={S.appBarTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[S.content, S.contentDone]}>
            <View style={[S.doneImage]} />
            <Text style={[S.fontMedium, S.fontS16]}>
              회원가입이 완료되었습니다.
            </Text>
            <Text style={[S.contentDoneNoti, S.fontRegular, S.fontS14]}>
              {'5초 뒤 자동으로 \n' + '메인 화면으로 이동합니다.'}
            </Text>
            <Button
              mode="contained"
              style={[
                DefaultStyle.containerBTN,
                S.loginBtn,
                DefaultStyle._primary,
              ]}
              color="red"
              onPress={() => {
                this.navigation.push('Login');
              }}>
              메인으로
            </Button>
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
    count: state.home.count,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    countUp: diff => {
      dispatch(ActionCreator.countUp(diff));
    },
    countDown: diff => {
      dispatch(ActionCreator.countDown(diff));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DoneRegister);
