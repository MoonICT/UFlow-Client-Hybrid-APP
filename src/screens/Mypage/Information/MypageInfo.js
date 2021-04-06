/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import {
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';
import Loading from '@Components/atoms/Loading';
import Checkbox from '@Components/atoms/Checkbox';
import ActionCreator from '@Actions';
import { Account } from '@Services/apis';
import editInfo from '@Assets/images/editInfo.png';
import { styles as S } from '../style';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class MypageInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
      firstQuery: '',
      visible: false,
      tabInfo: '',
      userInfo: {},
      data: {},
      isOpenChangePass: false,
      loading: false,
      isAgreeSNS: {
        sms: false,
        email: false,
      },
      errText: '',
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount () {
    Account.getMe()
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data,
          isAgreeSNS: {
            sms: res.data.marketingRcp.sms,
            email: res.data.marketingRcp.email,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });

    // Warehouse.listAllBussinessInfo().then(res => {
    //   this.setState({
    //     listBussiness: res.data,
    //   });
    // }).catch(err => {
    //   console.log(err);
    // })

    // SplashScreen.hide();
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: this.props.tabData[index].title });
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  onSubmit = () => {
    const { data, isAgreeSNS } = this.state;
    if (!data.passwordOld) {
      alert(getMsg(this.props.lang, 'ML0552', '현재 비밀번호를 입력하세요.'));
      return;
    }
    this.setState({ loading: true });
    Account.editMyInfo({
      fullName: data.fullName,
      emailRcv: isAgreeSNS.email,
      smsRcv: isAgreeSNS.sms,
      passwordOld: data.passwordOld
    })
      .then(res => {
        this.setState({ loading: false });
        this.props.showPopup({
          type: 'confirm',
          title: getMsg(this.props.lang, 'ML0245', '회원정보 수정 완료'),
          content: getMsg(this.props.lang, 'ML0246', '회원정보가 수정되었습니다.'),
          image: editInfo,
          navigation: () => this.navigation.navigate('More')
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.response.data.message);
      });
  };

  _onChangePass = () => {
    const { data, isAgreeSNS } = this.state;
    if (!data.passwordOld) {
      alert(getMsg(this.props.lang, 'ML0552', '현재 비밀번호를 입력하세요.'));
      return;
    }
    if (!data.password) {
      alert(getMsg(this.props.lang, 'ML0553', '새 비밀번호를 입력하세요.'));
      return;
    }
    if (!data.ConfirmPassword) {
      alert(getMsg(this.props.lang, 'ML0553', '새 비밀번호를 입력하세요.'));
      return;
    }
    if (data.password !== data.ConfirmPassword) {
      alert(getMsg(this.props.lang, 'ML0554', '암호가 일치하지 않습니다'));
      return;
    }
    // Progress
    this.props.setProgress({ is: true, type: 'CIRCLE' });
    Account.editMyInfo({
      passwordOld: data.passwordOld,
      password: data.password,
    })
      .then(res => {
        this.setState({
          isOpenChangePass: false,
          data: {
            ...this.state.data,
            passwordOld: '',
            password: '',
            ConfirmPassword: '',
          },
          errText: '',
        });
        this.props.showPopup({
          type: 'confirm',
          title: getMsg(this.props.lang, 'ML0245', '회원정보 수정 완료'),
          content: getMsg(this.props.lang, 'ML0246', '회원정보가 수정되었습니다.'),
          image: editInfo,
        });

        // Progress
        setTimeout(() => {
          this.props.setProgress({ is: false });
        }, 300);
      })
      .catch(error => {
        this.setState({
          errText: error.response.data.message ? error.response.data.message : getMsg(this.props.lang, 'ML0555', '입력하신 정보가 맞지 않습니다.')
        });
        this.props.setProgress({ is: false });
      });
  };

  _onOpenChangePass = () => {
    let { isOpenChangePass } = this.state;
    this.setState({
      isOpenChangePass: !isOpenChangePass,
    });
  };

  _hideDialogChangePass = () => {
    this.setState({
      isOpenChangePass: false,
      data: {
        ...this.state.data,
        passwordOld: '',
        password: '',
        ConfirmPassword: '',
      },
      errText: '',
    });
  };

  render () {
    const {
      checkAll,
      checkSMS,
      checkMail,
      tabInfo,
      loading,
      data,
      isAgreeSNS,
      isOpenChangePass,
    } = this.state;

    return (
      <>
        <View style={[DefaultStyle._cards]}>
          <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
            {/* <Text style={DefaultStyle._textTitleBody}>거래조건</Text> */}
          </View>
          <View style>
            <TextField
              labelTextField={getMsg(this.props.lang, 'ML0012', '이름')}
              value={data.fullName ? data.fullName : ''}
              valueProps={e =>
                this.setState({
                  data: {
                    ...data,
                    fullName: e,
                  },
                })
              }
              colorLabel="#000000"
              maxLength={30}
            />
            <TextField
              labelTextField={getMsg(this.props.lang, 'ML0013', '이메일')}
              editable={false}
              selectTextOnFocus={false}
              value={data.email || ''}
              placeholder={getMsg(this.props.lang, 'ML0013', '이메일')}
              colorLabel="#000000"
              maxLength={200}
            />
            <TextField
              type={'password'}
              secureTextEntry={true}
              labelTextField={getMsg(this.props.lang, 'ML0556', '현재 비밀번호')}
              colorLabel="#000000"
              value={data.passwordOld ? data.passwordOld : ''}
              valueProps={e =>
                this.setState({
                  data: {
                    ...data,
                    passwordOld: e,
                  },
                })
              }
            />
            {/* <TextField
              type={'password'}
              secureTextEntry={true}
              value={data.password ? data.password : ''}
              valueProps={e =>
                this.setState({
                  data: {
                    ...data,
                    password: e,
                  },
                })
              }
              labelTextField="새 비밀번호"
              colorLabel="#000000"
            />
            <TextField
              type={'password'}
              secureTextEntry={true}
              value={data.ConfirmPassword ? data.ConfirmPassword : ''}
              valueProps={e =>
                this.setState({
                  data: {
                    ...data,
                    ConfirmPassword: e,
                  },
                })
              }
              labelTextField="새 비밀번호 확인"
              colorLabel="#000000"
            /> */}

            <Button
              onPress={this._onOpenChangePass}
              style={{
                borderColor: 'rgba(0, 0, 0, 0.1)',
                margin: 0,
                borderRadius: 0,
                width: '100%',
              }}>
              {getMsg(this.props.lang, 'ML0557', '비밀번호 변경')}
            </Button>
          </View>
          <View style={S.checks}>
            <View style={S.checkItem}>
              <Checkbox
                checked={!isAgreeSNS.email && !isAgreeSNS.sms}
                onPress={() => {
                  this.setState({
                    isAgreeSNS: {
                      sms: isAgreeSNS.email && isAgreeSNS.sms ? false : true,
                      email: isAgreeSNS.email && isAgreeSNS.sms ? false : true,
                    },
                  });
                }}
              />
              <Text style={S.textCheck}>{getMsg(this.props.lang, 'ML0558', '마케팅 수신 동의')}</Text>
            </View>
            <View style={[S.checkItem, S.checkChildren]}>
              <Checkbox
                checked={!isAgreeSNS.sms}
                onPress={() => {
                  this.setState({
                    isAgreeSNS: {
                      sms: !isAgreeSNS.sms,
                      email: isAgreeSNS.email,
                    },
                  });
                }}
              />
              <Text style={S.textCheck}>SMS</Text>
            </View>
            <View style={[S.checkItem, S.checkChildren]}>
              <Checkbox
                checked={!isAgreeSNS.email}
                onPress={() => {
                  this.setState({
                    isAgreeSNS: {
                      email: !isAgreeSNS.email,
                      sms: isAgreeSNS.sms,
                    },
                  });
                }}
              />
              <Text style={S.textCheck}>{getMsg(this.props.lang, 'ML0013', '이메일')}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={S._right}
            onPress={() => this.navigation.navigate('WithdrawalInformation')}>
            <Text style={DefaultStyle._textDF3}>{getMsg(this.props.lang, 'ML0541', '회원탈퇴')}</Text>
          </TouchableOpacity>
        </View>
        <View style={S.btn}>
          <Button
            mode="contained"
            style={[
              {
                width: '95%',
                margin: 12,
                borderRadius: 24,
                height: 40,
                marginBottom: 24,
              },
              DefaultStyle._primary,
            ]}
            color="red"
            onPress={this.onSubmit}>
            {getMsg(this.props.lang, 'ML0100', '확인')}
          </Button>
        </View>
        <Loading loading={loading} />

        <Portal>
          <Dialog
            style={DefaultStyle.popup}
            visible={isOpenChangePass}
            onDismiss={this._hideDialogChangePass}>
            <Dialog.Title style={[DefaultStyle._titleDialog, S.titleQuestion]}>
              {getMsg(this.props.lang, 'ML0557', '비밀번호 변경')}
            </Dialog.Title>
            <Dialog.Content style={{ marginTop: 10 }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View style={{ width: '100%' }}>
                  <TextField
                    type={'password'}
                    secureTextEntry={true}
                    labelTextField={getMsg(this.props.lang, 'ML0556', '현재 비밀번호')}
                    colorLabel="#000000"
                    value={data.passwordOld ? data.passwordOld : ''}
                    valueProps={e =>
                      this.setState({
                        data: {
                          ...data,
                          passwordOld: e,
                        },
                      })
                    }
                  />
                  <TextField
                    type={'password'}
                    secureTextEntry={true}
                    value={data.password ? data.password : ''}
                    valueProps={e =>
                      this.setState({
                        data: {
                          ...data,
                          password: e,
                        },
                      })
                    }
                    labelTextField={getMsg(this.props.lang, 'ML0559', '새 비밀번호')}
                    colorLabel="#000000"
                  />
                  <TextField
                    type={'password'}
                    secureTextEntry={true}
                    value={data.ConfirmPassword ? data.ConfirmPassword : ''}
                    valueProps={e =>
                      this.setState({
                        data: {
                          ...data,
                          ConfirmPassword: e,
                        },
                      })
                    }
                    labelTextField={getMsg(this.props.lang, 'ML0560', '새 비밀번호 확인')}
                    colorLabel="#000000"
                  />
                  {!!this.state.errText && <Text style={{ color: 'red', }}>{this.state.errText}</Text>}

                  <Dialog.Actions
                    style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      // style={[DefaultStyle._buttonElement]}
                      color={'rgba(0, 0, 0, 0.54)'}
                      onPress={this._hideDialogChangePass}>
                      {getMsg(this.props.lang, 'ML0101', '취소')}
                    </Button>
                    <Button
                      // style={[DefaultStyle._buttonElement]}
                      onPress={this._onChangePass}>
                      {getMsg(this.props.lang, 'ML0100', '확인')}
                    </Button>
                  </Dialog.Actions>
                </View>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    hidePopup: status => {
      dispatch(ActionCreator.hide(status));
    },
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MypageInfo);
