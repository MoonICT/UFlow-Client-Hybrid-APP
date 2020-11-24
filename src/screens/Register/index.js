/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:48
 * @modify date 2020-11-24 17:47:28
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
import DoneRegister from './done';

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
      terms: false,
      terms1: false,
      terms2: false,
      terms3: false,
      terms31: false,
      terms32: false,
      terms33: false,
      isDone: false,
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
    let {
      name,
      email,
      password,
      confirmPassword,
      // isRemember,
      terms,
      terms1,
      terms2,
      terms3,
      terms31,
      terms32,
      terms33,
      isDone,
    } = this.state;

    if (terms3) {
      terms31 = true;
      terms32 = true;
      terms33 = true;
    } else {
      terms3 = false;
      if (terms31 && terms32 && terms33) {
        terms3 = true;
      } else {
        terms3 = false;
      }
    }

    if (terms1 && terms2 && terms3) {
      terms = true;
    } else {
      terms = terms;
    }

    return (
      <>
        {isDone ? (
          <DoneRegister navigation={this.navigation} />
        ) : (
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
                  {/** ----------Terms ------------*/}
                  <View style={S.itemTerm}>
                    <Checkbox
                      status={terms ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          terms: !terms,
                        });
                      }}
                    />
                    <Text style={[S.fontS14]}>전체 동의</Text>
                  </View>
                  {/** ----------Terms 1 ------------*/}
                  <View style={[S.itemTerm, S.itemTermMr]}>
                    <Checkbox
                      status={terms1 ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({ terms1: !terms1 });
                      }}
                    />
                    <Text
                      style={[S.fontS14]}
                      onPress={() =>
                        this.navigation.navigate('Terms', { id: 1 })
                      }>
                      서비스 이용약관 (필수)
                    </Text>
                  </View>
                  {/** ----------Terms 2 ------------*/}
                  <View style={[S.itemTerm, S.itemTermMr]}>
                    <Checkbox
                      status={terms2 ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({ terms2: !terms2 });
                      }}
                    />
                    <Text
                      style={[S.fontS14]}
                      onPress={() =>
                        this.navigation.navigate('Terms', { id: 2 })
                      }>
                      개인정보 수집 및 이용 동의 (필수)
                    </Text>
                  </View>
                  {/** ----------Terms 3 ------------*/}
                  <View style={[S.itemTerm, S.itemTermMr]}>
                    <Checkbox
                      status={terms3 ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          terms3: !terms3,
                          terms31: !terms31,
                          terms32: !terms32,
                          terms33: !terms33,
                        });
                      }}
                    />
                    <Text
                      style={[S.fontS14]}
                      onPress={() =>
                        this.navigation.navigate('Terms', { id: 3 })
                      }>
                      위치기반서비스 이용약관 (필수)
                    </Text>
                  </View>
                  {/** ---------------Terms 3 child------------*/}
                  <View style={[S.itemTermCL, S.itemTermMr]}>
                    <View style={[S.itemTerm, S.itemTermMr]}>
                      <Checkbox
                        status={terms31 ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({
                            terms31: !terms31,
                          });
                        }}
                      />
                      <Text style={[S.fontS14]}>알림</Text>
                    </View>

                    <View style={[S.itemTerm, S.itemTermMr]}>
                      <Checkbox
                        status={terms32 ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({ terms32: !terms32 });
                        }}
                      />
                      <Text style={[S.fontS14]}>SMS</Text>
                    </View>

                    <View style={[S.itemTerm, S.itemTermMr]}>
                      <Checkbox
                        status={terms33 ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({ terms33: !terms33 });
                        }}
                      />
                      <Text style={[S.fontS14]}>Email</Text>
                    </View>
                  </View>
                  {/**---------------------------------------------- */}
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
                    this.setState({ isDone: true });
                  }}>
                  확인
                </Button>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </>
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
