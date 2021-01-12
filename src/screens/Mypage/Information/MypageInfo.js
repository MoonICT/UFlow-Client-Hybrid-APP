/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {
  Checkbox,
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../style';

import { Account } from '@Services/apis';

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

    Account.editMyInfo({
      fullName: data.fullName,
      passwordOld: data.passwordOld,
      password: data.password,
      emailRcv: isAgreeSNS.email,
      smsRcv: isAgreeSNS.sms
    }).then(res => {
      console.log('editMyInfo', res);
    }).catch(err => {
      console.log(err);
    })
  };

  render() {

    const { checkAll, checkSMS, checkMail, tabInfo, userInfo, data, isAgreeSNS } = this.state;

    return (
      <>
        <View style={[DefaultStyle._cards]}>
          <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
            <Text style={DefaultStyle._textTitleBody}>거래조건</Text>
          </View>
          <View style>
            <TextField
              labelTextField="이름"
              placeholder="하혜정"
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
            <TextField
              type={'password'}
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
              value={data.password ? data.password : ''}
              valueProps={e => this.setState({
                data:{
                  ...data,
                  password: e
              }})}
              labelTextField="새 비밀번호" colorLabel="#000000" />
            <TextField
              type={'password'}
              value={data.ConfirmPassword ? data.ConfirmPassword : ''}
              valueProps={e => this.setState({
                data:{
                  ...data,
                  ConfirmPassword: e
              }})}
              labelTextField="새 비밀번호 확인"
              colorLabel="#000000"
            />
          </View>
          <View style={S.checks}>
            <View style={S.checkItem}>
              <Checkbox
                status={(isAgreeSNS.email && isAgreeSNS.sms) ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({
                    isAgreeSNS:{
                      sms: isAgreeSNS.email && isAgreeSNS.sms ? false : true,
                      email: isAgreeSNS.email && isAgreeSNS.sms ? false : true
                    }
                  })
                }}
              />
              <Text style={S.textCheck}>마케팅 수신 동의</Text>
            </View>
            <View style={[S.checkItem, S.checkChildren]}>
              <Checkbox
                status={isAgreeSNS.sms ? 'checked' : 'unchecked'}
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
                status={isAgreeSNS.email ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({
                    isAgreeSNS:{
                      email: !isAgreeSNS.email,
                      sms: isAgreeSNS.sms
                    }
                  })
                }}
              />
              <Text style={S.textCheck}>이메일</Text>
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
      </>
    );
  }
}

export default MypageInfo;
