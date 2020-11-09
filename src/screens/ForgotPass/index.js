/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 14:05:49
 * @modify date 2020-11-09 14:10:17
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {TextInput, Appbar, Checkbox, Text, Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
import ActionCreator from '../../actions';
import {styles as S} from './style';

class ForgotPass extends Component {
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

  render() {
    const {email, password, isRemember} = this.state;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        <Appbar.Header style={DefaultStyle.header}>
          <Appbar.Action
            icon="close"
            color="white"
            onPress={() => console.log('hello')}
          />
        </Appbar.Header>
        <ScrollView>
          <Text style={[S.titleLogin, DefaultStyle._warning]}>UFLOW</Text>
          <View style={S.formLogin}>
            <TextInput
              label="이메일"
              mode="outlined"
              value={email}
              type="number"
              maxLength={20}
              style={[S.inputs]}
              onChangeText={text => this.setState({email: text})}
            />
            <TextInput
              label="비밀번호"
              mode="outlined"
              value={password}
              type="text"
              secureTextEntry={true}
              maxLength={20}
              style={[S.inputs, S.inputPass]}
              onChangeText={text => this.setState({password: text})}
            />
            <View style={S.plusFormLogin}>
              <View style={S.rememberLogin}>
                <Checkbox
                  status={isRemember ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({isRemember: !isRemember});
                  }}
                />
                <Text>자동 로그인</Text>
              </View>
              <View style={S.ortherLink}>
                <Text>아이디 찾기</Text>
                <Text style={S.rectangle}>|</Text>
                <Text>비밀번호 찾기</Text>
              </View>
            </View>
            <Button
              mode="contained"
              style={[DefaultStyle.containerBTN, S.loginBtn]}
              onPress={() => {
                this.navigation.navigate('Home');
              }}>
              확인
            </Button>
            <View style={[S.plusFormLogin, S.forgot]}>
              <Text>유플로우가 처음이신가요?</Text>
              <Text style={S.mrL10}>회원가입</Text>
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
)(ForgotPass);
