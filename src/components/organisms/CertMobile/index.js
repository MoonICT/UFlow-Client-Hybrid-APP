/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View , TouchableOpacity} from 'react-native';
import TextField from '@Components/organisms/TextField';
import {Text} from 'react-native-paper';
import { WarehouseMobileAuth} from '@Services/apis';
import moment from 'moment';
// Local Imports
import DefaultStyle from '@Styles/default';

export default class CertMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      certCode: '',
      isSendCode: false,
      isCompleteCert: false,
      errorMsg:'',
      isTimeOver:false,
      timer: 180,
      duration : moment.duration(180 * 1000, 'milliseconds')
    };
  }

  //countdown overtime
  startTimer = () => {
    const {duration } = this.state;
    clearInterval(this.interval);
    this.setState({
      duration : moment.duration(180 * 1000, 'milliseconds')
    })
    this.interval = setInterval(()=>{
      duration.subtract(1000, "milliseconds");
      if(duration.asMilliseconds() !== 0){
        this.setState(()=> ({ timer: duration.asMilliseconds() }))
      }else{
        alert('인증번호 유효시간이 만료되었습니다.\n다시 시도하세요.')
        clearInterval(this.interval);
        this.setState({
          isTimeOver:true,
          isSendCode:false
        })
      }
    }
    , 1000 );
  }

  /**
   * 인증번호 요청.
   * */
  sendCert = () => {
    const { mobile } = this.props;

    this.setState({errorMsg:''})
    if (!mobile) {
      this.setState({errorMsg:'휴대폰번호를 입력하세요.'})
      return false
    }
    if (!/^\d{2,3}\d{3,4}\d{4}$/.test(mobile)) {
      this.setState({errorMsg:'전화번호 형식이 아닙니다.'})
      return false
    }
    WarehouseMobileAuth.certMobile({ mobile: mobile }).then(res => {
      // TODO Change to dialog ui.
      alert('인증번호가 발송되었습니다.')
      
      this.setState({
        isSendCode: true,
        isTimeOver: false,
        isCompleteCert: false
      })
      this.startTimer()

    }).catch(err => {
      this.setState({
        isSendCode:false
      });

      alert('서버에러:' + err.message)
    })
  }

  /**
   * 인증번호 확인.
   * */
  confirmCert = () => {
    const { mobile,onComplete } = this.props;
    const { certCode } = this.state;

    this.setState({errorMsg:''})
    if (!certCode) {
      this.setState({errorMsg:'인증번호를 입력하세요.'})
      return false
    }
    WarehouseMobileAuth.certMobileConfirm({
      code: certCode,
      mobile: mobile
    }).then(res => {
      if (res.data.code === 'RESULT_SUCCESS') {
        // TODO Change to dialog ui.
        alert('인증이 완료되었습니다.');
        this.setState({isCompleteCert:true})
        if (onComplete && typeof onComplete === 'function') {
          onComplete()
        }
      }
    }).catch(err => {
      if (err.response.status >= 400 && err.response.status < 500) {
        // TODO Change to dialog ui.
        alert('만료되었거나 유효하지 않은 인증번호입니다.\n다시 확인해주세요.')
      } else {n
        alert('서버에러:' + err.respose.message)
      }
    })
  }

  render() {
    const { isTimeOver, isSendCode,timer,isCompleteCert } = this.state;

    return (
      !isCompleteCert ?
      <View style={[DefaultStyle._listBtn, DefaultStyle.d_flex]}>
        <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
          <TextField
            colorLabel="#000000"
            placeholder="인증번호를 입력하세요."
            valueProps={(e) => {
              this.setState({
                certCode: e
              })
            }}
            />
        </View>

        {isSendCode && !isTimeOver ?
          <TouchableOpacity
          style={[DefaultStyle._btnOutlineMuted, DefaultStyle.mb_20, DefaultStyle.w_50]}
          onPress={() => this.confirmCert()}>
          <Text
            style={[
              DefaultStyle._textButton,
              DefaultStyle._colorMuted
            ]}>
            {'인증번호 발송'}
            {isSendCode ?
            <Text style={[DefaultStyle._textErrorInput]}>({moment(timer).format('mm:ss')})</Text>
            :
            <Text></Text>
        }
          </Text>
        </TouchableOpacity>
        : <Text></Text>
        }

        <TouchableOpacity
          style={[DefaultStyle._btnOutlineMuted, DefaultStyle.mb_20, DefaultStyle.w_50]}
          onPress={() => this.sendCert()}>
          <Text
            style={[
              DefaultStyle._textButton,
              DefaultStyle._colorMuted
            ]}>
            {isTimeOver || isSendCode ? '재발송' : '인증번호 확인'}
          </Text>
        </TouchableOpacity>
      </View>
      :
      <View></View>
      );
  }
}
