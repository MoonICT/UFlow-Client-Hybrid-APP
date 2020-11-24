/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:48
 * @modify date 2020-11-24 15:40:05
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
import Appbars from '../../components/organisms/AppBar';
import ActionCreator from '../../actions';
import { styles as S } from './style';
//---> Assets

class Register extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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

  render() {
    const { name, email, password, confirmPassword, isRemember } = this.state;

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
          <View style={S.content}>
            <Text style={[S.titleLogin, S.fontMedium]}>
              {'회원가입을 위해\n' + '아래 정보를 적어주세요.'}
            </Text>
            <View style={S.formLogin}>
              <TextInput
                label="이름"
                mode="outlined"
                value={name}
                type="text"
                maxLength={20}
                style={[DefaultStyle.inputs]}
                onChangeText={text => this.setState({ email: text })}
              />
              <TextInput
                label="이메일"
                mode="outlined"
                value={email}
                type="text"
                maxLength={20}
                style={[DefaultStyle.inputs, S.inputPass]}
                onChangeText={text => this.setState({ password: text })}
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
              <TextInput
                label="비밀번호 확인"
                mode="outlined"
                value={confirmPassword}
                type="text"
                secureTextEntry={true}
                maxLength={20}
                style={[DefaultStyle.inputs, S.inputPass]}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
          </View>
          {/**Terms */}
          <View style={S.terms}>
            <Text style={[S.termsText, S.fontMedium]}>유의사항</Text>
            <View style={[S.termsList]}>
              <View>
                <Checkbox.Item status="checked" label="Item" />
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
                this.navigation.navigate('Home');
              }}>
              확인
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
)(Register);
