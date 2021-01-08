/**
 * Webview Screen
 *
 * @format
 * @flow strict-local
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { Appbar, Text } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

// Local Imports
import WVMsgService from '@Services/WebViewMessageService';
import DefaultStyle from '@Styles/default';
import { styles } from './style';
import Appbars from '@Components/organisms/AppBar';
import SearchOverlay from '@Components/organisms/SearchOverlay';
import SearchSwipePanel from '@Components/organisms/SearchSwipePanel';
import SearchFilter from '@Components/organisms/SearchFilter';
import SearchFilterPanel from '@Components/organisms/SearchFilterPanel';
import ActionCreator from '@Actions';

class Search extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    // Webview initialize options.
    this.option = {
      // TODO if Android Test : $ adb reverse tcp:13000 tcp:13000
      defaultURL: 'http://www.uflow.voltpage.net/webview/search',
      // defaultURL: 'http://localhost:13000/webview/search',
    };
    this.state = {
      url: this.option.defaultURL,
      progress: 0,
      searchQuery: '',
    };
    // Ref
    this.refSearchFilter = React.createRef();
  }

  /**************************
   * START : Webview Event.
   * */

  // When the WebView has finished loading.
  async _WVOnLoad (e) {
    console.log('::: Web View Loaded ::: ');
  }

  // When the webview calls window.postMessage.
  async _WVOnMessage (e) {
    // console.log(':::: onReceiveWebViewMessage');
    let msgData = WVMsgService.parseMessageData(e);
    switch (msgData.type) {
      case 'CONSOLE_LOG':
        console.log(msgData)
        break;
      case 'MESSAGE_TYPE_TEST':
        break;
    }
  }

  _WVSendMessage (msgObj) {
    // console.log(':::: Send Message');
    let resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
  }

  /**
   * END : Webview Event.
   ***************************/
  // 컴포넌트 랜더링.
  render () {
    const strMsgType = JSON.stringify(WVMsgService.types);
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
    window.ReactNativeTypes = ${strMsgType};
    `;
    return (
      <SafeAreaView style={[styles.container]}>
        {/** Header */}
        <Appbars style={styles.appBar}>
          <Appbar.Action icon="magnify" color="rgba(0, 0, 0, 0.54)" />
          <Appbar.Content
            title="지역명이나 창고명을 검색하세요."
            color="rgba(0, 0, 0, 0.47)"
            onPress={() =>
              !this.props.isFilterToggle && this.props.searchToggle(true)
            }
            titleStyle={styles.headerTitle}
            style={[DefaultStyle.headerTitle, styles.headerContainer]}
          />
        </Appbars>

        {/** 검색 펄터 버튼 목록 */}
        {/* TODO 필터 선택시 표현 하기. */}
        <SearchFilter ref={this.refSearchFilter} />

        {/** 지역/주소 검색하기 패널. */}
        {this.props.isSearchToggle && <SearchOverlay />}

        {/** 필터 패널. */}
        <SearchFilterPanel
          onClosed={() => {
            console.log('필터 취소됨.');
            this.refSearchFilter.current._onClickFilter();
          }}
        />

        {/** TODO Test */}
        <View
          style={{
            flex: 1,
          }}>
          {/** Webview */}
          <WebView
            // Loading URL
            source={{ uri: this.state.url }}
            // Webview style
            style={styles.WebViewStyle}
            // Attaching a ref to a DOM component
            ref={webView => (this.webView = webView)}
            // If the user taps to navigate to a new page but the new page is not in this safelist,
            // the URL will be handled by the OS. The default safelistlisted origins are "http://" and "https://".
            originWhitelist={['*']}
            // Want to show the view or not
            useWebKit={true}
            onLoad={event => this._WVOnLoad(event)}
            onLoadStart={() => this.setState({ isLoading: true })}
            onLoadEnd={() => this.setState({ isLoading: false })}
            onLoadProgress={({ nativeEvent }) =>
              this.setState({ progress: nativeEvent.progress })
            }
            onMessage={event => this._WVOnMessage(event)}
            // Inject javascript code in webview
            injectedJavaScript={injectJSCode} // for Android
            injectedJavaScriptBeforeContentLoaded={injectJSCode.toString()} // for iOS
          />

          {/** Swipe Panel : 창고 리스트 */}
          <SearchSwipePanel navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    );
  }

  // 컴포넌트가 만들어지고 render가 호출된 이후에 호출.
  // 비동기 요청을 처리하는 부분.
  componentDidMount () {
    console.log('::componentDidMount::');
    /** Complete Initialize. */
    SplashScreen.hide();
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate () {
    console.log('::componentDidUpdate::');
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps :', state);
  // TODO 스토어의 필터 데이터가 변경 될때마다 호출.

  return {
    isSearchToggle: state.search.isSearchToggle,
    isFilterToggle: state.search.isFilterToggle,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    searchToggle: status => {
      dispatch(ActionCreator.searchToggle(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
