/**
 * 견적 계약 썸네일 카드
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, Card } from 'react-native-paper';

// Local Imports
import WVMsgService from '@Services/WebViewMessageService';
import { API_CLIENT_ADDRESS } from '@Constant';
import DefaultStyle from '@Styles/default';
import Progress from '@Components/organisms/Progress';
import { styles } from "@Screeens/Search/style";

// import { styles as S } from './style';

class WebviewMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      progress: 0,
    };
    this.webView = null;
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
    }
  }

  _WVSendMessage (msgObj) {
    const resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
    // console.log(':::: Send Message ::::', resultMsg);
  }

  render () {
    const { latitude, longitude } = this.props;
    const strMsgType = JSON.stringify(WVMsgService.types);
    const mapDefaultData = JSON.stringify({
      isToggleBtn: this.props.isToggleBtn,
      gps: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
      }
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
      mapData: ${mapDefaultData}
    };
   
    `;
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'red',
      }}>

        {latitude > 0 && longitude > 0 ?
          <>
            {/** 로딩 */}
            {this.state.progress < 1 &&
            <View style={styles.loadingWrap}>
              <View style={styles.loadingInner}>
                <Progress />
              </View>
            </View>}

            {/** 지도웹뷰 */}
            <WebView
              // source={{ uri: `http://localhost:13000/webview/map` }}
              source={{ uri: `${API_CLIENT_ADDRESS}/webview/map` }}
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
            />
          </>
          :
          <Text style={{ color: '#888' }}>
            등록된 좌표가 없습니다.
          </Text>
        }
      </View>
    );
  }
}

// Check Props Type.
WebviewMap.protoType = {};
export default WebviewMap;
