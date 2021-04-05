/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 14:57:42
 * @modify date 2020-11-24 19:22:01
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, Dimensions, Platform, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { Modalize } from 'react-native-modalize';
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";
// Local Imports
import DefaultStyle from '../../styles/default';
import { styles as S } from './style';
import ActionCreator from '@Actions';
import { Menu } from '@Services/apis';
import VersionCheckService from '@Services/VersionCheckService';

//---> Components
import Popup from '@Components/organisms/Popup';
import Loading from '@Components/atoms/Loading';
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { LANG_STATUS_KEY } from '@Constant';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { WebView } from "react-native-webview";
import { styles } from "@Screeens/Search/style";

const channelIOImage = require('@Assets/images/channel.png');

const status = getStatusBarHeight(true);

class Global extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.sheetRef = React.createRef();
  }

  render () {
    const { children, progress } = this.props;
    let height = Math.round(Dimensions.get('window').height);
    if (Platform.OS === 'ios') {
      const naviHeight = 48;
      if (isIphoneX()) {
        height =
          Dimensions.get('window').height -
          status -
          getBottomSpace()
      } else {
        height =
          Dimensions.get('window').height - status;
      }
    }
    return (
      <SafeAreaView style={[DefaultStyle.container, S.container]}>
        <View style={[DefaultStyle.container, S.container, { position: 'relative', }]}>
          <Popup />
          {children}

          {progress.type === 'CIRCLE' && <Loading loading={progress.is} />}

          {progress.type === 'BAR' && progress.is &&
          <View style={[S.progressBarWrap]}>
            <Progress.Bar indeterminate={true}
                          indeterminateAnimationDuration={700}
                          color={'#ff6d00'}
                          borderRadius={0}
                          borderWidth={0}
                          width={null}
                          style={[S.progressBar]} /></View>}


          {/** Channel IO Button */}
          <TouchableOpacity style={{
            position: "absolute",
            bottom: 64,
            right: 16,
            // backgroundColor: 'red',
          }}
                            onPress={() => {
                              this.sheetRef.current.open()
                            }}>
            <Image source={channelIOImage} style={{ width: 54, height: 54 }}></Image>
          </TouchableOpacity>
          {/** Channel IO Body */}
          <Modalize
            ref={this.sheetRef}
            handlePosition={'inside'}
            modalHeight={height}
            panGestureEnabled={false}
            disableScrollIfPossible={false}
            scrollViewProps={{ scrollEnabled: false }}
            modalStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            handleStyle={{ backgroundColor: 'white', }}
            HeaderComponent={
              <View style={{
                width: '100%',
                justifyContent: 'center',
                height: 48,
                paddingHorizontal: 8,
                borderBottomWidth: 1,
                borderColor: '#d7d7d7',
              }}>
                <TouchableOpacity onPress={() => {
                  console.log('close')
                  this.sheetRef.current.close()
                }}>
                  <Icon style={{
                    fontSize: 24,
                    textAlign: 'right'
                  }} name={'close'} />
                </TouchableOpacity>
              </View>
            }
          >
            {/** 지도웹뷰 */}
            <WebView
              source={{ uri: `https://ej6wz.channel.io/?pluginKey=783c5bf5-4917-4339-9d39-74eb176bb85b` }}
              style={{
                flex: 1,
                height: Platform.OS === 'ios' ? height - 48 : height - 74,
              }}
              ref={webView => (this.webView = webView)}
              originWhitelist={['*']}
              useWebKit={true}
              // onLoad={event => this._WVOnLoad(event)}
              // onLoadProgress={({ nativeEvent }) =>{}}
              // onMessage={event => this._WVOnMessage(event)}
              // injectedJavaScript={injectJSCode} // for Android
              // injectedJavaScriptBeforeContentLoaded={injectJSCode.toString()} // for iOS
            />
          </Modalize>
        </View>
      </SafeAreaView>
    );
  }

  async componentDidMount () {
    // 번역 로드.
    const langData = await AsyncStorage.getItem(LANG_STATUS_KEY);
    if (!langData) {
      AsyncStorage.setItem(LANG_STATUS_KEY, 'ko-KR');
    }
    const data = await Menu.localization({ language: langData ? langData : 'ko-KR', });
    let resultObj = {}
    if (data && data.length > 0) {
      data.map(item => {
        Object.assign(resultObj, item);
      });
    }
    console.log('Lang ::: ', resultObj)
    this.props.setLangData(resultObj);

    /** App Version Check (배포시 활성.) */
    // await VersionCheckService.init();

    SplashScreen.hide();
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps :', state);
  return {
    progress: state.global.progress,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    setLangData: status => {
      dispatch(ActionCreator.setLangData(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Global);
