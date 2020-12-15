/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 17:12:03
 * @modify date 2020-11-24 19:30:27
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { TextInput, Appbar, Checkbox, Text, Button } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from './style';
import { Account } from '@Services/apis';
// import Cookie from 'js-cookie';
// import getConfig from 'next/config';

//---> Assets
const Logo = require('@Assets/images/logo.png');
// const {
//   publicRuntimeConfig: {
//     env: { ACCESS_TOKEN_NAME },
//   },
// } = getConfig();
class Login extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      email: '',
      password: '',
      isRemember: false,
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

  handleOnClickLogin = data => {
    console.log(data);
    // setValues({ ...values, data });
    // Sign in
    Account.signIn({
      email: data.email,
      password: data.password,
    })
      .then(res => {
        console.log('::::: API Sign in :::::', res);
        // Cookie.set(ACCESS_TOKEN_NAME, res.access_token, { expires: 180 });
        // window.location.href = '/';
      })
      .catch(err => {
        console.log(err);
        // TODO change dialog
        alert('이메일과 비밀번호를 확인해주세요.');
      });
  };
  render() {
    const { email, password, isRemember } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="close"
            color="black"
            onPress={() => console.log('hello')}
          />
        </Appbars>
        <ScrollView>
          {/* <Text style={[S.titleLogin, DefaultStyle._warning]}>UFLOW</Text> */}
          <Image source={Logo} alt="logo" style={[S.titleLogin]} />
          <View style={S.formLogin}>
            <TextInput
              label="이메일"
              mode="outlined"
              value={email}
              type="number"
              maxLength={20}
              style={[DefaultStyle.inputs]}
              onChangeText={text => this.setState({ email: text })}
            />
            <TextInput
              label="비밀번호"
              mode="outlined"
              value={password}
              type="text"
              secureTextEntry={true}
              maxLength={20}
              style={[DefaultStyle.inputs, S.inputPass]}
              onChangeText={text => this.setState({ password: text })}
            />
            <View style={S.plusFormLogin}>
              <View style={S.rememberLogin}>
                <Checkbox
                  status={isRemember ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ isRemember: !isRemember });
                  }}
                />
                <Text style={[S.fontS14]}>자동 로그인</Text>
              </View>
              <View style={S.ortherLink}>
                <Text
                  style={[S.fontS14]}
                  onPress={() => this.navigation.navigate('ForgotID')}>
                  아이디 찾기
                </Text>
                <Text style={S.rectangle}>|</Text>
                <Text
                  style={[S.fontS14]}
                  onPress={() => this.navigation.navigate('FindPassWord')}>
                  비밀번호 찾기
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              style={[
                DefaultStyle.containerBTN,
                S.loginBtn,
                DefaultStyle._primary,
              ]}
              color="red"
              onPress={() => {
                // this.navigation.navigate('Home');
                this.handleOnClickLogin({email:'chonglye@aartkorea.com',password:'aart1234!'});
              }}>
              확인
            </Button>
            <View style={[S.plusFormLogin, S.forgot]}>
              <Text style={[S.ask, S.fontS14]}>유플로우가 처음이신가요?</Text>
              <Text
                style={[S.mrL10, S.fontS14]}
                onPress={() => {
                  this.navigation.navigate('Register');
                }}>
                회원가입
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
)(Login);
