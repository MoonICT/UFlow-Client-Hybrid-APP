/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 17:12:03
 * @modify date 2021-01-06 17:00:51
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
import { AuthContext } from '@Store/context';

//Contants
import { TOKEN } from '@Constant';

import AsyncStorage from '@react-native-community/async-storage';
//---> Assets
const Logo = require('@Assets/images/logo.png');
class Login extends Component {
  static contextType = AuthContext;

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
    //console.log('//::componentWillUnmount::');
  }

  /** Login Handle */
  async handleOnClickLogin(data) {
    const { showPopup } = this.props;
    const { login } = this.context;

    /** Config test */
    data.email = 'tenant1@test.com';
    data.password = 'wotkd123';

    if (data.email === '' || data.password === '') {
      showPopup({ title: 'UFLOW', content: '충분한 정보를 입력하십시오 !' });
    }

    // Sign in
    let loginData = await Account.signIn({
      email: data.email,
      password: data.password,
    });

    // console.log('loginData==>', loginData);

    if (loginData.status === 200) {
      const access_token = loginData.data.access_token;
      console.log('access_token==>', access_token);
      AsyncStorage.setItem(TOKEN, access_token);
      login();
    }
    // } else {
    //   showPopup({ title: 'UFLOW', content: '잘못된 로그인 정보 !' });
    // }
  }

  render() {
    const { email, password, isRemember } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="close"
            color="black"
            onPress={() => this.navigation.navigate('Home')}
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
              maxLength={30}
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
                {/* <Text
                  style={[S.fontS14]}
                  onPress={() => {
                    this.navigation.navigate('FindID');
                  }}>
                  아이디 찾기
                </Text> */}
                {/* <Text style={S.rectangle}>|</Text> */}
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
                this.handleOnClickLogin({
                  email,
                  password,
                });
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
    isPopup: state.popup.show,
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
    loginAccount: action => {
      dispatch(ActionCreator.loginAccount(action));
    },
    showPopup: data => {
      dispatch(
        ActionCreator.show({
          title: data?.title || '문의 완료',
          content:
            data?.content ||
            '답변 내용은 [마이페이지 > 문의내역[ 혹은 등록하신 이메일에서 확인해 주세요.',
        }),
      );
    },
    hidePopup: status => {
      dispatch(ActionCreator.hide(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
