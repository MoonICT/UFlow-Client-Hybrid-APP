/**
 * Webview Screen
 *
 * @format
 * @flow strict-local
 */

/**
 * TODO List
 * - 관리 패턴 생각해보기.
 * - 인풋 링크(브라우저 주소창).
 * - 뒤로가기, 앞으로가기 기능.
 * - 새로고침.
 * */
// Global Imports
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
  Linking,
  Alert,
  
} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import {WebView} from 'react-native-webview';
// import {ProgressView} from '@react-native-community/progress-view';
// import {ProgressBar} from '@react-native-community/progress-bar-android';
import {ProgressBar} from 'react-native-paper';

// Local Imports
import WVMsgService from '../../services/WebViewMessageService';
import WebViewCookieService from '../../services/WebViewCookieService';
import DefaultStyle from '../../styles/default';
import Header from './partials/Header';
import Footer from './partials/Footer';

const SESSION_COOKIE_NAME = 'GD5SESSID';

export default class Webview extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    // Webview initialize options.
    this.option = {
      defaultURL: 'https://gitlab.com/aartkorea',
      showHeader: true,
      showFooter: true,
    };
    this.state = {
      key: 0,
      url: this.option.defaultURL,
      canGoBack: false,
      progress: 0,
    };
  }

  /**************************
   * START : Webview Event.
   * */

  // When the WebView has finished loading.
  async _WVOnLoad(e) {
    // console.log('::: Web View Loaded ::: ');
    // 웹뷰가 로드되면 세션쿠키를 (로컬스토리지와)동기화 한다.
    await WebViewCookieService.syncCookie(SESSION_COOKIE_NAME, this.option.defaultURL, (isDone) => {
      if (isDone) {
        this.webView.reload();
      }
    });
  }

  // When the WebView loading starts or ends.
  _WVOnNavigationStateChange(e) {
    console.log('::: Web View Navigation State Change ::: ', e.url);
    this.setState({
      canGoBack: e.canGoBack,
    });
  }

  // Function that allows custom handling of any web view requests.
  // Return true from the function to continue loading the request and false to stop loading.
  _WVOnShouldStartLoadWithRequest(e) {
    // console.log('::: Web View OnShouldStartLoadWithRequest ::: ', e.url);
    let {url} = e;
    // 일반적인 웹 프로토콜의 경우 전처리 없이 처리.
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('about:blank')) {
      return true;
    }
    // 웹 프로토콜이 아닌 Indent 등과 같은 앱 실행 프로토콜인 경우 아래와 같이 처리.
    if (Platform.OS === 'android') {
      // for Android
      SendIntentAndroid.openChromeIntent(url).then(isOpened => {
        if (!isOpened) {
          Alert.alert('외부 앱 연결 실패', '앱 관리자에게 문의하세요.', [{text: '확인', style: 'cancel'}]);
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      // for iOS
      Linking.openURL(url).catch(err => {
        Alert.alert('외부 앱 연결 실패', '앱 관리자에게 문의하세요.', [{text: '확인', style: 'cancel'}]);
      });
    }
    return false;
  }

  // When the change header search url.
  _WVOnChangeURL(url) {
    // console.log('::: On change URL');
    this.setState({
      url: url,
    });
    this.setState({key: this.state.key + 1});
  }

  // When the webview calls window.postMessage.
  async _WVOnMessage(e) {
    // console.log(':::: onReceiveWebViewMessage');
    let msgData = WVMsgService.parseMessageData(e);
    switch (msgData.type) {
      /** Login Event */
      case WVMsgService.types.REQ_LOGIN_EVENT:
        console.log('::::: REQ_LOGIN_EVENT');
        // 웹에서 전달 받은 세션 쿠키를 스토리지에 저장.
        await WebViewCookieService.saveCookie(SESSION_COOKIE_NAME);
        // TODO FCM 토큰값과 유저 id를 서버로 전달.(http request service 구현해야함.)
        // this.axios.requestGet({
        //   url: '/api/v1/documents/types',
        // }).then(res => {
        //   console.log('응답 데이터', res.data);
        // });
        break;
      /** FCM Token */
      case WVMsgService.types.REQ_FCM_TOKEN:
        console.log('::::: REQ_FCM_TOKEN');
        // let fcmToken = await AsyncStorage.getItem('fcmToken');
        this._WVSendMessage({
          type: WVMsgService.types.RES_FCM_TOKEN,
          data: {token: this.fcm.token},
        });
        break;
      /** Console */
      case 'CONSOLE_LOG':
        console.log(`[${Platform.OS}][[[WEBVIEW CONSOLE LOG]]]`, msgData.data);
        break;
    }
  }

  _WVSendMessage() {
    console.log(':::: Send Message');
    let resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
  }

  /**
   * END : Webview Event.
   ***************************/

  // 컴포넌트 랜더링.
  render() {
    let WebViewHeader;
    let WebViewFooter;
    if (this.option.showHeader) {
      WebViewHeader = <Header defaultURL={this.state.url}
                              onChangeUrl={(data) => this._WVOnChangeURL(data.searchURL)} />;
    }
    if (this.option.showFooter) {
      WebViewFooter = <Footer defaultURL={this.option.defaultURL}
                              onChangeUrl={(url) => this._WVOnChangeURL(url ? url : this.option.defaultURL)}
                              webView={this.webView}
                              canGoBack={this.state.canGoBack} />;
    }

    let injectJSCode = `
    window.consoleLog = function(...args){
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "CONSOLE_LOG",
        data: arguments
      }))
    }
    window.ReactNativeEnv = {
      isNativeApp: true
    };
    `;
    return (
      <SafeAreaView style={DefaultStyle.container}>
        {/** Webview Header Component */}
        {WebViewHeader}
        {/** Webview Progress Bar */}
        <ProgressBar progress={this.state.progress}/>
        <WebView
          // url 변경 시 웹뷰를 다시 렌더(로드)하기위 사용. (reload() 함수는 현재 주소로 reload 되기 때문에 사용 안함.)
          key={this.state.key}
          // Loading URL
          source={{uri: this.state.url}}
          // Webview style
          style={styles.WebViewStyle}
          // Attaching a ref to a DOM component
          ref={webView => (this.webView = webView)}
          // If the user taps to navigate to a new page but the new page is not in this safelist,
          // the URL will be handled by the OS. The default safelistlisted origins are "http://" and "https://".
          originWhitelist={['*']}
          // Want to show the view or not
          useWebKit={true}
          // startInLoadingState={true}
          onLoad={event => this._WVOnLoad(event)}
          onLoadStart={() => this.setState({isLoading: true})}
          onLoadEnd={() => this.setState({isLoading: false})}
          onNavigationStateChange={event =>
            this._WVOnNavigationStateChange(event)
          }
          onShouldStartLoadWithRequest={event =>
            this._WVOnShouldStartLoadWithRequest(event)
          }
          onLoadProgress={({nativeEvent}) => this.setState(
            {progress: nativeEvent.progress},
          )}
          onMessage={event => this._WVOnMessage(event)}
          // Inject javascript code in webview
          injectedJavaScript={injectJSCode} // for Android
          injectedJavaScriptBeforeContentLoaded={injectJSCode.toString()} // for iOS
        />
        {/** Webview Footer Component */}
        {WebViewFooter}
      </SafeAreaView>
    );
  }

  // 컴포넌트가 만들어지고 render가 호출된 이후에 호출.
  // 비동기 요청을 처리하는 부분.
  componentDidMount() {
    console.log('::componentDidMount::');
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  WebViewHeader: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  WebViewHeaderInput: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#ddd',
    flex: 1,
  },
  WebViewFooter: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
