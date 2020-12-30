/**
 * Webview Footer Component
 *
 * @format
 * @flow strict-local
 * */
import React, {Component} from 'react';
import {Alert, BackHandler, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RNExitApp from 'react-native-exit-app';

export default class Footer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  // Webview go back.
  _WVGoBack() {
    console.log('::: WebView : Go _WVGoForward');
    this.props.webView.goBack();
  }

  // Webview go forward.
  _WVGoForward() {
    console.log('::: WebView : Go Forward');
    this.props.webView.goForward();
  }

  // Reload webview.
  _WVReload() {
    console.log('::: WebView : Reload');
    this.props.webView.reload();
  }

  // Webview go home.
  _WVGoHome() {
    console.log('::: WebView : Go Home : ', this.props.defaultURL);
    this.props.onChangeUrl();
  }

  // Android back button
  _handleBackButtonClick() {
    console.log('::: Android Click Back Button');
    // 웹뷰에서 뒤로가기가 더이상 존재하지 않을 때 앱 종료 알림 표시.(for Android)
    if (this.props.canGoBack) {
      this._WVGoBack();
    } else {
      Alert.alert('앱을 종료하시겠습니까?', '', [
        {
          text: '취소',
        },
        {
          text: '확인',
          onPress: () => {
            RNExitApp.exitApp();
          },
        },
      ]);
    }
    return true;
  }

  render() {
    // This is Sample, so change it if necessary.
    return (
      <View style={styles.WebViewFooter}>
        <TouchableOpacity style={styles.WebViewFooterBtnDefault} onPress={() => this._WVGoForward()}>
          <Text>{'⬅️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.WebViewFooterBtnDefault} onPress={() => this._WVGoForward()}>
          <Text>{'➡️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.WebViewFooterBtnDefault} onPress={() => this._WVGoHome()}>
          <Text>{' ⏹'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.WebViewFooterBtnDefault} onPress={() => this._WVReload()}>
          <Text>{'🔄'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 컴포넌트가 만들어지고 render가 호출된 이후에 호출.
  // 비동기 요청을 처리하는 부분.
  componentDidMount() {
    console.log('::componentDidMount::::Footer');
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonClick.bind(this));
    }
  }

  // 컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행되는 메소드다.
  // 컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용하다.
  componentWillUnmount() {
  //console.log('//::componentWillUnmount::');
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this._handleBackButtonClick.bind(this));
    }
  }
}

const styles = StyleSheet.create({
  WebViewFooter: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 65 : 55,
  },
  WebViewFooterBtnDefault: {
    backgroundColor: '#f5f5f6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
