import React from 'react';
import {
  StyleSheet,
  View,
  processColor,
  Dimensions,
  ScrollView,
} from 'react-native';
import update from 'immutability-helper';
import Appbars from '@Components/organisms/AppBar';

import { Appbar, Text, Button } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import { RadarChart } from 'react-native-charts-wrapper';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { ConsultingApi, Warehouse, WhrgSearch } from '@Services/apis';
import { styles as S } from './style';
import { WebView } from 'react-native-webview';
import Progress from '@Components/organisms/Progress';
import { API_CLIENT_ADDRESS } from '@Constant';
import WVMsgService from '@Services/WebViewMessageService';
import { connect } from 'react-redux';
import ActionCreator from '@Actions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class RadarChartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.navigation = props.navigation;
    this.option = {
      // TODO if Android Test : $ adb reverse tcp:13000 tcp:13000
      defaultURL: `${API_CLIENT_ADDRESS}/webview/search`,
      // defaultURL: 'http://localhost:13000/webview/search'
    };
    this.state = {
      url: this.option.defaultURL,
      progress: 0,
      data: {},
      legend: {
        // enabled: true,
        textSize: 200,
        // form: 'CIRCLE',
        // wordWrapEnabled: true,
      },
    };
  }
  async componentDidMount() {
    let resultAdvisory = await ConsultingApi.result({
      email: 'test@logisall.com',
    });

    console.log('resultAdvisory', resultAdvisory);

    let _label = resultAdvisory.data.labels;
    let _dataSets = resultAdvisory.data.datasets;
    let __dataSets1 = await _dataSets[0].data.map(item => {
      return item;
    });
    let __dataSets2 = await _dataSets[1].data.map(item => {
      return item;
    });
    // console.log('__dataSets1', __dataSets1);
    // console.log('__dataSets2', __dataSets2);
    // let datas = [...__dataSets1,...__dataSets2];
    if (resultAdvisory) {
      let dataSend = _dataSets.map((el, index) => {
        return {
          data: el.data,
          backgroundColor:
            index === 0 ? 'rgba(117,117,117,0.2)' : 'rgba(255, 109, 0, 0.2)',
          borderColor:
            index === 0 ? 'rgba(117,117,117,1)' : 'rgba(255,109,0,1)',
        };
      });
      console.log('dataSendssssssssss', dataSend);

      // console.log('__dataSets1', __dataSets1);
      // console.log('__dataSets2', __dataSets2);
      // console.log('datas', datas);
      // const dataFake = [{value:8},{value:6},{value:9},{value:6}];
      // const dataFake = [{value:15},{value:15},{value:13},{value:12}];
      // await this.setState(
      //   update(this.state, {
      //     data: {
      //       $set: {
      //         dataSets: [
      //           {
      //             values: __dataSets1,
      //             // values: dataFake1,
      //             label: '',
      //             config: {
      //               color: processColor('black'),
      //               drawFilled: true,
      //               fillColor: processColor('#7a7a7a'),
      //               fillAlpha: 100,
      //               lineWidth: 1.5,
      //             },
      //           },
      //           {
      //             values: __dataSets2,
      //             // values: dataFake2,
      //             label: '',
      //             config: {
      //               color: processColor('#ff6d00'),
      //               drawFilled: true,
      //               fillColor: processColor('rgba(255, 109, 0, 0.2)'),
      //               fillAlpha: 50,
      //               lineWidth: 5,
      //             },
      //           },
      //         ],
      //       },
      //     },
      //     xAxis: {
      //       $set: {
      //         valueFormatter: _label,
      //       },
      //     },
      //   }),
      // );

      this._WVSendMessage({
        // type: WVMsgService.types.CHANGE_SEARCH_CENTER_POSITION,
        data: resultAdvisory.data,
      });
      this.setState({ data: resultAdvisory.data });
    }
    // else {
    //   this.setState({ data: 0 });
    // }
  }
  // When the WebView has finished loading.
  async _WVOnLoad(e) {
    console.log('::: Web View Loaded ::: ');
    console.log('e :>> ', e);
  }

  // When the webview calls window.postMessage.
  async _WVOnMessage(e) {
    console.log(':::: onReceiveWebViewMessage');
    console.log('e :>> ', e);
    let msgData = WVMsgService.parseMessageData(e);
    // switch (msgData.type) {
    //   case WVMsgService.types.CONSOLE_LOG:
    //     console.log('[WEBVIEW]' + msgData.data);
    //     break;
    //   case WVMsgService.types.CHANGE_MAP_CENTER_POSITION:
    //     console.log('[RN] CHANGE_MAP_CENTER_POSITION 수신', msgData.data);
    //     this.props.setSearchFilter({
    //       latitude: msgData.data.latitude ? Number(msgData.data.latitude) : '',
    //       longitude: msgData.data.longitude
    //         ? Number(msgData.data.longitude)
    //         : '',
    //       distance: msgData.data.distance ? Number(msgData.data.distance) : 10,
    //     });
    //     break;
    //   case WVMsgService.types.GO_WH_DETAIL:
    //     // console.log('[RN] GO_WH_DETAIL 수신', msgData.data)
    //     this.navigation.navigate('DetailsWH', { id: msgData.data });
    //     break;
    // }
  }

  _WVSendMessage(msgObj) {
    const resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
    // console.log('resultMsgssss :>> ', resultMsg);
    // console.log(':::: Send Message ::::', resultMsg);
  }
  render() {
    // console.log('dataTest', this.state.data);
    const strMsgType = JSON.stringify(this.state.data);

    let injectJSCode = `
    window.consoleLog = function(...args){
    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "message",
        data: ${strMsgType},
      }))
    }
    window.ReactNativeEnv = {
      isNativeApp: true,
      data: ${strMsgType},
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
            title="물류컨설팅"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        {/* <HistoryBackActionBar
          title={'물류컨설팅'}
          navigation={this.navigation}
        /> */}
        <ScrollView>
          <View style={styles.container}>
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
                  'http://192.168.1.106:13000/webview/advisory?email=test@logisall.com',
                // 'http://www.uflow.voltpage.net/premium/advisory/complete?email=test@logisall.com',
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
              javaScriptEnabledAndroid={true}
            />
            <View pointerEvents="none">
              {/**    <RadarChart
                style={styles.chart}
                data={this.state.data}
                xAxis={this.state.xAxis}
                yAxis={{ drawLabels: true }}
                chartDescription={{ text: '' }}
                legend={this.state.legend}
                drawWeb={true}
                // webLineWidth={5}
                // webLineWidthInner={5}
                // webAlpha={255}

                // webColor={processColor('red')}
                // webColorInner={processColor('green')}
                // skipWebLineCount={1}
                // onSelect={this.handleSelect.bind(this)}
                // onChange={event => console.log(event.nativeEvent)}
              /> */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                }}
              />
            </View>
            <Text style={{ fontSize: 20 }}>물류 컨성팅이 완료되었습니다.</Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 20 }}>
              컨설팅 결과 설명{'\n'}컨설팅 결과 설명
            </Text>

            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => this.navigation.replace('Home')}>
              <Text style={[S.textButton, { width: 175 }]}>
                메인페이지로 이동
              </Text>
            </Button>
          </View>
        </ScrollView>
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
    minHeight: windowHeight + 100,
  },
  chart: {
    flex: 1,
    maxHeight: 400,
    width: windowWidth - 80,
    alignItems: 'flex-start',
    marginTop: 50,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    width: windowWidth,
  },
});

export default RadarChartScreen;
