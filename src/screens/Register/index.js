/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:48
 * @modify date 2021-01-08 10:35:18
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
import Loading from '@Components/atoms/Loading';
import DoneRegister from './done';
import TextField from '@Components/organisms/TextField';
//---> Assets
import { Account } from '@Services/apis';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

class Register extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      isRemember: false,
      termsAll: false,
      checkTerms: false,
      checkMarketing: false,
      isDone: false,
      serviceTerms: false,
      loading: false,
      terms: {
        privacy: false,
        location: false,
        financial: false,
        // requiredValid: false,
      },
      marketing: {
        sms: false,
        email: false,
        kakao: false,
      },
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
  handleOnClickSubmit = () => {
    this.setState({ loading: true });
    let signUpTemp = {};
    signUpTemp.email = this.state.email;
    signUpTemp.password = this.state.password;
    signUpTemp.fullName = this.state.fullName;
    signUpTemp.mobile = this.state.mobile;
    signUpTemp.serviceTerms = this.state.serviceTerms;
    signUpTemp.terms = this.state.terms;
    signUpTemp.marketing = this.state.marketing;

    // console.log("signUpTemp",signUpTemp);

    Account.signUp(signUpTemp)
      .then(res => {
        // console.log('::::: API Sign Up Ok :::::', res);
        this.setState({ loading: false });
        this.setState({ isDone: true });
        // go to the home after 5sec
        const access_token = res?.data?.access_token;
        AsyncStorage.setItem(TOKEN, access_token);
        this.props.loginAccount(true);
      })
      .catch(err => {
        // console.log('::::: API Sign Up Error :::::', err);
        this.setState({ loading: false });

        if (err?.response) {
          if (err?.response?.status >= 400 && err?.response?.status < 500) {
            // TODO Handle the alert message.
            const errData = err?.response?.data;
            // console.log('::: Error Code :', errData.code);
            // console.log('::: Error Message :', errData.message);
            // TODO Create dialog components
            alert(errData?.message);
          } else {
            // TODO Handle the alert "Please contact your administrator.".
            const errData = err?.response?.data;
            // console.log('::: Error Code :', errData.code);
            alert(errData?.message);
          }
        }
      });
  };

  onChangeEmail(e) {
    this.setState({ email: e });
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      this.setState({ errorEmail: false });
    } else {
      this.setState({ errorEmail: true });
    }
  }

  render() {
    let {
      fullName,
      email,
      password,
      confirmPassword,
      mobile,
      // isRemember,
      termsAll,
      serviceTerms,
      terms,
      marketing,
      checkMarketing,
      isDone,
      errorEmail,
    } = this.state;
    return (
      <>
        {isDone ? (
          <DoneRegister navigation={this.navigation} />
        ) : (
          <SafeAreaView style={S.container}>
            <Appbars>
              <Appbar.Action
                icon="arrow-left"
                color="black"
                onPress={() => this.navigation.navigate('Login')}
              />
              <Appbar.Content
                title="회원가입"
                color="black"
                style={S.appBarTitle}
              />
            </Appbars>
            <ScrollView style={DefaultStyle.backgroundWhiteDF2}>
              <View style={DefaultStyle._cards}>
                <Text style={DefaultStyle._textTitleBody}>
                  {'회원가입을 위해\n' + '아래 정보를 적어주세요.'}
                </Text>
                <View style={S.formLogin}>
                  <TextField
                    multiline={true}
                    labelTextField={'이름'}
                    colorLabel="#000000"
                    styleProps={{ borderColor: '#d7d7d7' }}
                    placeholder="이름"
                    onChangeText={text => this.setState({ fullName: text })}
                    value={fullName}
                    type="text"
                    mode="outlined"
                    maxLength={30}
                  />
                  <TextField
                    multiline={true}
                    labelTextField={'이메일'}
                    colorLabel="#000000"
                    styleProps={{ borderColor: '#d7d7d7' }}
                    placeholder="이메일"
                    onChangeText={text => {
                      // this.setState({ email: text });
                      this.onChangeEmail(text);
                    }}
                    value={email}
                    type="text"
                    mode="outlined"
                    maxLength={30}
                  />
                  {errorEmail === true ? (
                    <Text style={DefaultStyle._textErrorInput}>
                      잘못된 형식
                    </Text>
                  ) : null}
                  <TextField
                    labelTextField={'비밀번호'}
                    colorLabel="#000000"
                    styleProps={{ borderColor: '#d7d7d7' }}
                    placeholder="비밀번호"
                    onChangeText={text => this.setState({ password: text })}
                    value={password}
                    type="text"
                    mode="outlined"
                    maxLength={20}
                    textContentType="password"
                    secureTextEntry={true}
                  />
                  <TextField
                    labelTextField={'비밀번호 확인'}
                    colorLabel="#000000"
                    styleProps={{ borderColor: '#d7d7d7' }}
                    placeholder="비밀번호 확인"
                    onChangeText={text =>
                      this.setState({ confirmPassword: text })
                    }
                    value={confirmPassword}
                    type="text"
                    mode="outlined"
                    maxLength={20}
                    textContentType="password"
                    secureTextEntry={true}
                  />
                  {confirmPassword !== password ? (
                    <Text style={DefaultStyle._textErrorInput}>
                      비밀번호가 안 맞아요
                    </Text>
                  ) : null}
                  <TextField
                    labelTextField={'휴대폰번호'}
                    colorLabel="#000000"
                    styleProps={{ borderColor: '#d7d7d7' }}
                    placeholder="휴대폰번호"
                    onChangeText={text => {
                      this.setState({
                        mobile: text.replace(/[^0-9]/g, ''),
                      });
                      // this.validations(text);
                    }}
                    keyboardType="numeric"
                    value={mobile}
                    type="telephoneNumber"
                    mode="outlined"
                    maxLength={20}
                  />
                  {this.state.error === true ? 'abc' : null}
                </View>
              </View>
              {/**Terms */}
              <View
                style={[DefaultStyle._body, DefaultStyle.backgroundWhiteDF2]}>
                <Text style={DefaultStyle._textTitleBody}>유의사항</Text>
                <View style={[S.termsList]}>
                  {/** ----------Terms ------------*/}
                  <View style={S.itemTerm}>
                    <Checkbox
                      status={termsAll ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          termsAll: !termsAll,
                          checkMarketing: !termsAll,
                          serviceTerms: !termsAll,
                          terms: {
                            ...terms,
                            privacy: !termsAll,
                            location: !termsAll,
                            financial: !termsAll,
                          },
                          marketing: {
                            ...marketing,
                            kakao: !termsAll,
                            sms: !termsAll,
                            email: !termsAll,
                          },
                        });
                      }}
                    />
                    <Text style={[S.fontS14]}>전체 동의</Text>
                  </View>
                  {/** ----------Terms 1 ------------*/}
                  <View style={[S.itemTerm, S.itemTermMr]}>
                    <Checkbox
                      status={serviceTerms ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          serviceTerms: !serviceTerms,
                          termsAll:
                            !serviceTerms &&
                            checkMarketing &&
                            terms &&
                            marketing,
                        });
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
                      status={terms.privacy ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          terms: {
                            ...terms,
                            privacy: !terms.privacy,
                          },
                          termsAll:
                            serviceTerms &&
                            checkMarketing &&
                            !terms.privacy &&
                            marketing,
                        });
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
                      status={terms.location ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          terms: {
                            ...terms,
                            location: !terms.location,
                          },
                          termsAll:
                            serviceTerms &&
                            checkMarketing &&
                            !terms.location &&
                            marketing,
                        });
                      }}
                    />
                    <Text
                      style={[S.fontS14]}
                      onPress={() =>
                        this.navigation.navigate('Terms', { id: 2 })
                      }>
                      위치기반서비스 이용약관 (필수)
                    </Text>
                  </View>
                  {/** ----------Terms 4 ------------*/}
                  <View style={[S.itemTerm, S.itemTermMr]}>
                    <Checkbox
                      status={terms.financial ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          terms: {
                            ...terms,
                            financial: !terms.financial,
                          },
                          termsAll:
                            serviceTerms &&
                            checkMarketing &&
                            !terms.financial &&
                            marketing,
                        });
                      }}
                    />
                    <Text
                      style={[S.fontS14]}
                      onPress={() =>
                        this.navigation.navigate('Terms', { id: 2 })
                      }>
                      전자금융거래이용약관 사용 여부 (필수)
                    </Text>
                  </View>
                  {/** ----------Terms 5 ------------*/}
                  <View style={[S.itemTerm, S.itemTermMr]}>
                    <Checkbox
                      status={checkMarketing ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({
                          checkMarketing: !checkMarketing,
                          marketing: {
                            ...marketing,
                            kakao: !checkMarketing,
                            sms: !checkMarketing,
                            email: !checkMarketing,
                          },
                          termsAll:
                            serviceTerms && !checkMarketing && terms.financial,
                        });
                      }}
                    />
                    <Text
                      style={[S.fontS14]}
                      onPress={() =>
                        this.navigation.navigate('Terms', { id: 3 })
                      }>
                      마케팅 활용 수신동의 (선택)
                    </Text>
                  </View>
                  {/** ---------------Terms 5 child------------*/}
                  <View style={[S.itemTermCL, S.itemTermMr]}>
                    <View style={[S.itemTerm, S.itemTermMr]}>
                      <Checkbox
                        status={marketing.kakao ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({
                            marketing: {
                              ...marketing,
                              kakao: !marketing.kakao,
                            },
                            checkMarketing:
                              !marketing.kakao &&
                              marketing.sms &&
                              marketing.email,
                            termsAll:
                              serviceTerms &&
                              !checkMarketing &&
                              terms.financial,
                          });
                        }}
                      />
                      <Text style={[S.fontS14]}>카카오 알림</Text>
                    </View>

                    <View style={[S.itemTerm, S.itemTermMr]}>
                      <Checkbox
                        status={marketing.sms ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({
                            marketing: {
                              ...marketing,
                              sms: !marketing.sms,
                            },
                            checkMarketing:
                              marketing.kakao &&
                              !marketing.sms &&
                              marketing.email,
                            termsAll:
                              serviceTerms &&
                              !checkMarketing &&
                              terms.financial,
                          });
                        }}
                      />
                      <Text style={[S.fontS14]}>SMS</Text>
                    </View>

                    <View style={[S.itemTerm, S.itemTermMr]}>
                      <Checkbox
                        status={marketing.email ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({
                            marketing: {
                              ...marketing,
                              email: !marketing.email,
                            },
                            checkMarketing:
                              marketing.kakao &&
                              marketing.sms &&
                              !marketing.email,
                            termsAll:
                              serviceTerms &&
                              !checkMarketing &&
                              terms.financial,
                          });
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
                    termsAll
                      ? DefaultStyle._primary
                      : DefaultStyle._textDisabled,
                  ]}
                  color="red"
                  onPress={() => {
                    this.handleOnClickSubmit();
                  }}
                  disabled={!termsAll}>
                  확인
                </Button>
              </View>
            </ScrollView>
            <Loading loading={this.state.loading} />
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
