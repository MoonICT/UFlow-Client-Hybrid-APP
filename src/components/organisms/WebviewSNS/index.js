/**
 * SNS 로그인(웹뷰)
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { appleAuth } from '@invertase/react-native-apple-authentication';

// Local Imports
import WVMsgService from '@Services/WebViewMessageService';
import Progress from '@Components/organisms/Progress';
import { styles } from "@Screeens/Search/style";
import AsyncStorage from "@react-native-community/async-storage";
import { LANG_STATUS_KEY } from '@Constant';
import { Account } from '@Services/apis';
import { TOKEN, API_CLIENT_ADDRESS } from '@Constant';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

// import { styles as S } from './style';

class WebviewMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      langStatus: '',
      progress: 0,
    };
    this.webView = null;
    this.navigation = props.navigation;
  }

  /**
   * 1. [후처리] 로그인 처리.
   * */
  async redirectLogin (data) {
    console.log('1. [후처리] 로그인 처리.', data.access_token)
    if (data.access_token) {
      await AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
      this.navigation.navigate('Home');
    } else {
      this.noSocialLogin(`${getMsg(this.props.lang, 'ACC0037', '소셜로그인을 실패하였습니다.')} ${getMsg(this.props.lang, 'CMN0003', '다시 시도해주세요.')}`)
    }

    this.props.handleCompleteLogin(data.access_token)
  }

  /**
   * 2. [후처리] 소셜정보 + 회원가입으로 보내기.
   * */
  redirectJoin (data) {
    let params = {
      socialEmail: data.email ? data.email : '',
      socialImage: data.image ? data.image : '',
      snsType: data.snsType ? data.snsType : '',
      socialName: data.name ? data.name : '',
      socialId: data.id
    }
    console.log('소셜정보 + 회원가입으로 보내기', params)
    this.props.handleRedirectJoin()
    this.navigation.navigate('Register', params)
  }

  /**
   * 3. [후처리] 소셜 로그인처리 불가.
   * */
  noSocialLogin (msg) {
    this.props.handleFailLogin(msg)
  }

  /**
   * 로그인 에러 처리.
   * */
  err409 (res) {
    const data = res.response.data;
    console.log(data, 'data');
    switch (data.message) {
      case 'LEAVED_ACCOUNT':
        console.log("탈퇴한 계정, SNS ID(고유키)로 연동된 계정이 존재하지 않고, SNS 정보와 동일한 이메일(계정)이 존재하지만 탈퇴한 계정이다. -> 로그인화면에서 로그인 실패사유 안내(팝업, 텍스트 등 으로)", data.message)
        this.noSocialLogin('이 이메일의 계정은 탈퇴한 계정입니다.');
        break;
      case 'NOT_MATCH_SNS':
        console.log("SNS ID(고유키) 불일치, SNS ID(고유키)로 연동된 계정이 존재하지 않고, SNS 정보와 동일한 이메일(계정)이 존재하지만 계졍에 등록된 SNS ID와 SNS 로그인한 SNS ID가 일치 하지 않는다. -> 로그인 화면 또는 비번찾기 화면 에서 로그인 실패 사유 안내(팝업, 텍스트 등 으로)", data.message)
        this.noSocialLogin('이 이메일의 계정은 이미 다른 카카오톡 계정과 연동되어 있습니다. 비밀번호 로그인 또는 비밀번호 찾기를 진행해주세요.');
        break;
      case 'NOT_EXISTED_ACCOUNT':
        if (!data.email) {
          alert('이메일이 존재하지 않습니다.');
          return;
        }
        console.log("존재하지 않는 계정입니다. SNS ID(고유키)로 연동된 계정이 존재하지 않고, SNS 정보와 동일한 이메일(계정)이 존재하지 않는다. -> 회원가입", data.message)
        console.log({
          socialEmail: data.email,
          socialImage: data.image ? data.image : '',
          snsType: data.snsType ? data.snsType : '',
          socialName: data.name ? data.name : '',
          socialId: data.id
        }, 'props')
        this.redirectJoin(data);
        break;
      case 'NOT_PROVIDED_EMAIL':
        console.log("제공되지 않은 이메일입니다. SNS ID(고유키)로 연동된 계정이 존재하지 않고, SNS 에서 이메일을 제공하지 않았다. -> 회원가입", data.message)
        console.log({
          socialEmail: data.email,
          socialImage: data.image ? data.image : '',
          snsType: data.snsType ? data.snsType : '',
          socialName: data.name ? data.name : '',
          socialId: data.id
        }, 'props')
        this.redirectJoin(data);
        break;
      case 'LINKED':
        console.log("이미 연동되어었음, SNS ID(고유키)로 연동되어 있는 계정이 있다. -> 로그인", data.message)
        this.redirectLogin(data);
        break;
    }
  }

  /**
   * 소셜 로그인 요청.(카카오/네이버/구글)
   * */
  reqSNSLogin (data) {
    console.log('request login : ', data)
    Account.getSNSInfo({
      code: data.code,
      redirectUri: data.redirectUri,
      provider: this.props.provider,
    }).then(data => {
      console.log("SNS 와 사용자계정 연동, SNS ID(고유키)로 연동된 계정이 존재하지 않고, SNS 정보와 동일한 이메일(계정)이 존재한다. -> SNS 연동후 로그인", data);
      if (!data.access_token) {
        this.noSocialLogin(`${getMsg(this.props.lang, 'ACC0037', '소셜로그인을 실패하였습니다.')} ${getMsg(this.props.lang, 'CMN0003', '다시 시도해주세요.')}`)
      }
      // 로그인 처리
      this.redirectLogin(data);
    }).catch(res => {
      console.log(res, 'err');
      if (res && res.response && res.response.status == 409 && res.response.data) {
        // 409 처리
        this.err409(res);
      } else {
        // 에러 메시지 처리
        console.log(res.response.data, "res.response")
        this.noSocialLogin(`${getMsg(this.props.lang, 'ACC0037', '소셜로그인을 실패하였습니다.')} ${getMsg(this.props.lang, 'CMN0003', '다시 시도해주세요.')}`)
      }
    });
  }

  /**
   * 소셜 로그인 요청.(애플)
   * */
  reqAppleLogin (data) {
    Account.getAppleInfo({
      code: data.authorizationCode,
      idToken: data.identityToken,
    }).then(data => {
      console.log("SNS 와 사용자계정 연동, SNS ID(고유키)로 연동된 계정이 존재하지 않고, SNS 정보와 동일한 이메일(계정)이 존재한다. -> SNS 연동후 로그인", data);
      if (!data.access_token) {
        this.noSocialLogin(`${getMsg(this.props.lang, 'ACC0037', '소셜로그인을 실패하였습니다.')} ${getMsg(this.props.lang, 'CMN0003', '다시 시도해주세요.')}`)
      }
      // 로그인 처리
      this.redirectLogin(data);
    }).catch(res => {
      console.log(res, 'err');
      if (res && res.response && res.response.status == 409 && res.response.data) {
        // 409 처리
        this.err409(res);
      } else {
        // 에러 메시지 처리
        console.log(res.response.data, "res.response")
        this.noSocialLogin(`${getMsg(this.props.lang, 'ACC0037', '소셜로그인을 실패하였습니다.')} ${getMsg(this.props.lang, 'CMN0003', '다시 시도해주세요.')}`)
      }
    });
  }

  /**
   * 애플 로그인.
   */
  async onAppleButtonPress () {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log('APPLE LOGIN ::: user is authenticated', appleAuthRequestResponse)
        this.reqAppleLogin(appleAuthRequestResponse)
      }
    } catch (error) {
      console.log('APPLE LOGIN ERROR :::', error);
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('APPLE LOGIN ::: canceled');
        this.props.handleFailLogin(getMsg(this.props.lang, 'ACC0038', '애플 로그인이 취소되었습니다.'))
        // alert('애플 로그인이 취소되었습니다.')
      } else {
        console.log('APPLE LOGIN ::: error');
        this.props.handleFailLogin(getMsg(this.props.lang, 'ACC0039', '애플 로그인을 실패했습니다.'))
        // alert('애플 로그인을 실패했습니다.')
      }
    }
  }

  // When the WebView has finished loading.
  async _WVOnLoad (e) {
    console.log('::: Web View Loaded ::: ');
  }

  // When the webview calls window.postMessage.
  async _WVOnMessage (e) {
    // console.log(':::: onReceiveWebViewMessage');
    let msgData = WVMsgService.parseMessageData(e);
    switch (msgData.type) {
      case WVMsgService.types.CONSOLE_LOG:
        console.log('[WEBVIEW]' + msgData.data)
        break;
      case WVMsgService.types.HANDLE_SNS_LOGIN:
        console.log('[WEBVIEW]' + msgData.data.code)
        console.log('[WEBVIEW]' + msgData.data.redirectUri)

        // 전체 로그인 후처리 후, 패널 닫기.
        this.reqSNSLogin(msgData.data)
        break;
    }
  }

  _WVSendMessage (msgObj) {
    const resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
    // console.log(':::: Send Message ::::', resultMsg);
  }

  render () {
    const {} = this.props;
    const strMsgType = JSON.stringify(WVMsgService.types);
    const snsDefaultData = JSON.stringify({
      provider: this.props.provider,
    })
    let injectJSCode = `
    window.consoleLog = function(...args){
    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "CONSOLE_LOG",
        data: JSON.stringify(arguments)
      }))
    }
    window.ReactNativeEnv = {
      isNativeApp: true,
      types: ${strMsgType},
      snsData: ${snsDefaultData}
    };
   
    `;
    return (
      <View style={{
        flex: 1,
        height: this.props.height,
        paddingBottom: 80,
      }}>
        <>
          {/** 로딩 */}
          {this.state.progress < 1 &&
          <View style={styles.loadingWrap}>
            <View style={styles.loadingInner}>
              <Progress />
            </View>
          </View>}

          {/** 로그인 웹뷰
           웹뷰 로그인만 해당 ( 애플은 해당 안됨 )
           */}
          {
            (this.props.provider === 'kakao' ||
              this.props.provider === 'naver' ||
              this.props.provider === 'google')
              ?
              <WebView
                // source={{ uri: `http://localhost:13000/webview/sns` }}
                source={{ uri: `${API_CLIENT_ADDRESS}/webview/sns` }}
                style={{
                  flex: 1,
                  height: '100%',
                }}
                ref={webView => (this.webView = webView)}
                originWhitelist={['*']}
                useWebKit={true}
                onLoad={event => this._WVOnLoad(event)}
                onLoadProgress={({ nativeEvent }) =>
                  this.setState({ progress: nativeEvent.progress })
                }
                onMessage={event => this._WVOnMessage(event)}
                injectedJavaScript={injectJSCode} // for Android
                injectedJavaScriptBeforeContentLoaded={injectJSCode.toString()} // for iOS
                // TODO 구글 보안상 특정 브라우저(웹뷰)
                userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
              /> : null
          }

        </>
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    // 언어 초기화
    const langData = await AsyncStorage.getItem(LANG_STATUS_KEY);
    this.setState({
      langStatus: langData ? langData : 'ko-KR',
    });

    // 애플 로그인일 경우.
    if (this.props.provider === 'apple') {
      this.onAppleButtonPress()
    }
  }
}

// Check Props Type.
WebviewMap.protoType = {};
export default WebviewMap;
