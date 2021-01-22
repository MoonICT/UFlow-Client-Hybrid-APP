/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
  Portal
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

const tabSelect = [
  {
    id: 'tab1',
    title: '기본 정보'
  },
  {
    id: 'tab2',
    title: '사업자 등록 정보'
  },
]

class MypageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
      firstQuery: '',
      visible: false,
      tabInfo: '',
      userInfo: {},
      data:{},
      isOpenChangePass: false,
      loading:false,
      isAgreeSNS:{
        sms: false,
        email: false
      }
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {

    Account.getMe().then(res => {
      console.log(res)
      this.setState({
        data: res.data,
        isAgreeSNS:{
          sms: res.data.marketingRcp.sms,
          email: res.data.marketingRcp.email
        }
      })
    }).catch(err => {
      console.log(err);
    })

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
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  onSubmit = () => {
    const { data,isAgreeSNS } = this.state;

    this.setState({loading: true});
    Account.editMyInfo({
      fullName: data.fullName,
      emailRcv: isAgreeSNS.email,
      smsRcv: isAgreeSNS.sms
    }).then(res => {
      this.setState({loading: false});
      this.props.showPopup({
        type: 'confirm',
        title: '회원정보 수정 완료',
        content: '회원정보가 수정되었습니다.',
        image: editInfo
      });
    }).catch(error => {
      this.setState({loading: false});
      alert(error.response.data.message);
    })
  };

  _onChangePass = () => {
    const { data,isAgreeSNS } = this.state;
    if(!data.passwordOld ) {
      alert('현재 비밀번호를 입력하세요');
      return
    }
    if(!data.password ) {
      alert('새 비밀번호를 입력하세요');
      return
    }
    if(!data.ConfirmPassword) {
      alert('새 비밀번호를 입력하세요');
      return
    }
    if(data.password !== data.ConfirmPassword ) {
      alert('암호가 일치하지 않습니다');
      return
    }
    this.setState({loading: true});

    Account.editMyInfo({
      passwordOld: data.passwordOld,
      password: data.password
    }).then(res => {
      this.setState({loading: false, isOpenChangePass: false});
      this.props.showPopup({
        type: 'confirm',
        title: '회원정보 수정 완료',
        content: '회원정보가 수정되었습니다.',
        image: editInfo
      });
    }).catch(error => {
      this.setState({loading: false});
      alert(error.response.data.message);
    })
  }

  _onOpenChangePass = () => {
    let {isOpenChangePass} = this.state;
    this.setState({
      isOpenChangePass: !isOpenChangePass
    })
  }

  _hideDialogChangePass = () => {
    this.setState({
      isOpenChangePass: false
    })
  }

  render() {

    const { checkAll, checkSMS, checkMail, tabInfo, loading, data, isAgreeSNS, isOpenChangePass } = this.state;

    return (
      <>
        <View style={[DefaultStyle._cards]}>
          <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
            {/* <Text style={DefaultStyle._textTitleBody}>거래조건</Text> */}
          </View>
          <View style>
            <TextField
              labelTextField="이름"
              value={data.fullName ? data.fullName : ''}
              valueProps={e => this.setState({
                data:{
                  ...data,
                  fullName: e
                }})}
              colorLabel="#000000"
            />
            <TextField
              labelTextField="이메일"
              editable={false}
              selectTextOnFocus={false}
              value={data.email || 'haharu@aartkorea.com'}
              placeholder="haharu@aartkorea.com"
              colorLabel="#000000"
            />

            <Button
              onPress={this._onOpenChangePass}
              style={{
                borderColor: 'rgba(0, 0, 0, 0.1)',
                margin: 0,
                borderRadius: 0,
                width: '100%',
              }}>
              비밀번호 변경
            </Button>

            





          </View>
          <View style={S.checks}>
            <View style={S.checkItem}>
              <Checkbox
                checked={(!isAgreeSNS.email && !isAgreeSNS.sms)}
                onPress={() => {
                  this.setState({
                    isAgreeSNS:{
                      sms: isAgreeSNS.email && isAgreeSNS.sms ? false : true,
                      email: isAgreeSNS.email && isAgreeSNS.sms ? false : true,
                    }
                  })
                }}
              />
              <Text style={S.textCheck} >마케팅 수신 동의</Text>
            </View>
            <View style={[S.checkItem, S.checkChildren]}>
              <Checkbox
                checked={!isAgreeSNS.sms}
                onPress={() => {
                  this.setState({
                    isAgreeSNS:{
                      sms: !isAgreeSNS.sms,
                      email: isAgreeSNS.email
                    }
                  })
                }}
              />
              <Text style={S.textCheck}>SMS</Text>
            </View>
            <View style={[S.checkItem, S.checkChildren]}>
              <Checkbox
                checked={!isAgreeSNS.email}
                onPress={() => {
                  this.setState({
                    isAgreeSNS:{
                      email: !isAgreeSNS.email,
                      sms: isAgreeSNS.sms
                    }
                  })
                }}
              />
              <Text style={S.textCheck} >이메일</Text>
            </View>
          </View>
        </View>
        <View style={S.btn}>
          <Button
            mode="contained"
            style={[{ width: '95%', margin: 12, borderRadius: 24, height: 40, marginBottom: 24 }, DefaultStyle._primary,]}
            color="red"
            onPress={this.onSubmit}>
            확인
          </Button>
        </View>
        <Loading loading={loading}/>


        <Portal>
            <Dialog
              style={DefaultStyle._postCode}
              visible={isOpenChangePass}
              onDismiss={this._hideDialogChangePass}
              >
              <Dialog.Title style={[DefaultStyle._titleDialog, S.titleQuestion]}>
              비밀번호 변경
              </Dialog.Title>
              <Dialog.Content style={DefaultStyle._postCodeContent}>
                <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>

                  <View style={{width: '100%'}}>
                    <TextField
                      type={'password'}
                      secureTextEntry={true}
                      labelTextField="현재 비밀번호"
                      colorLabel="#000000"
                      value={data.passwordOld ? data.passwordOld : ''}
                      valueProps={e => this.setState({
                        data:{
                          ...data,
                          passwordOld: e
                      }})}
                    />
                    <TextField
                      type={'password'}
                      secureTextEntry={true}
                      value={data.password ? data.password : ''}
                      valueProps={e => this.setState({
                        data:{
                          ...data,
                          password: e
                      }})}
                      labelTextField="새 비밀번호" colorLabel="#000000" />
                    <TextField
                      type={'password'}
                      secureTextEntry={true}
                      value={data.ConfirmPassword ? data.ConfirmPassword : ''}
                      valueProps={e => this.setState({
                        data:{
                          ...data,
                          ConfirmPassword: e
                      }})}
                      labelTextField="새 비밀번호 확인"
                      colorLabel="#000000"
                    />


                    <Dialog.Actions style={{display: 'flex',justifyContent: 'center'}}>
                      <Button
                        // style={[DefaultStyle._buttonElement]}
                        color={'rgba(0, 0, 0, 0.54)'}
                        onPress={this._hideDialogChangePass}
                        >
                        취소
                      </Button>
                      <Button
                        // style={[DefaultStyle._buttonElement]}
                        onPress={this._onChangePass}>
                        확인
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
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MypageInfo);
