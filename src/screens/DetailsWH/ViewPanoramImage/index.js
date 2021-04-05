import React from 'react';
import {
  StyleSheet,
  View,
  processColor,
  Dimensions,
  ScrollView,
} from 'react-native';
import Appbars from '@Components/organisms/AppBar';

import { Appbar, Text, Button } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import { WebView } from 'react-native-webview';
import Progress from '@Components/organisms/Progress';
import WVMsgService from '@Services/WebViewMessageService';

import { API_CLIENT_ADDRESS } from '@Constant';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class RadarChartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.navigation = props.navigation;
    this.option = {
      // TODO if Android Test : $ adb reverse tcp:13000 tcp:13000
      defaultURL: `${API_CLIENT_ADDRESS}/webview/panorama`,
      // defaultURL: 'http://localhost:13000/webview/panorama'
    };
    this.state = {
      progress: 0,
    };
  }
  async componentDidMount() {
  }

  // When the webview calls window.postMessage.
  async _WVOnMessage (e) {
    // console.log(':::: onReceiveWebViewMessage');
    let msgData = WVMsgService.parseMessageData(e);
    switch (msgData.type) {
      case WVMsgService.types.CONSOLE_LOG:
        console.log('[WEBVIEW]' + msgData.data);
        break;
    }
  }

  _WVSendMessage(msgObj) {
    const resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
    // console.log('resultMsgssss :>> ', resultMsg);
    // console.log(':::: Send Message ::::', resultMsg);
  }
  render() {
    const { image } = this.props.route.params;
    const strImage = JSON.stringify(image);
    const strMsgType = JSON.stringify(this.state.data);

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
      image: ${strImage},
    };
    `;
    return (
      <View style={{ flex: 1 }}>
        <Appbars
          customStyle={{
            borderBottomColor: '#d7d7d7',
            backgroundColor: 'white',
          }}>
          <Appbar.Action
            icon="arrow-left"
            // color="white"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="파노라마 이미지 보기"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        <View style={styles.container}>
          <View>
            {this.state.progress < 1 && (
              <View style={styles.loadingWrap}>
                <View style={styles.loadingInner}>
                  <Progress />
                </View>
              </View>
            )}

            <WebView
              // Loading URL
              source={{
                uri:
                  `${this.option.defaultURL}`,
              }}
              // Webview style
              style={styles.WebViewStyle}
              // Attaching a ref to a DOM component
              ref={webView => (this.webView = webView)}
              // If the user taps to navigate to a new page but the new page is not in this safelist,
              // the URL will be handled by the OS. The default safelistlisted origins are "http://" and "https://".
              originWhitelist={['*']}
              // Want to show the view or not
              useWebKit={true}
              // onLoad={event => this._WVOnLoad(event)}
              onLoadStart={() => this.setState({ isLoading: true })}
              onLoadEnd={() => this.setState({ isLoading: false })}
              onLoadProgress={({ nativeEvent }) =>
                this.setState({ progress: nativeEvent.progress })
              }
              onMessage={event => this._WVOnMessage(event)}
              // Inject javascript code in webview
              injectedJavaScript={injectJSCode} // for Android
              injectedJavaScriptBeforeContentLoaded={injectJSCode.toString()} // for iOS
              javaScriptEnabledAndroid={true}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 100,
    minHeight: windowHeight,
    position: 'relative',
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    width: windowWidth,
  },
  loadingWrap: {
    position: 'absolute',
    zIndex: 99999999,
    // backgroundColor: '#f1f1f1',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  loadingInner: {
    width: '100%',
    height: 40,
  },
});

export default RadarChartScreen;
