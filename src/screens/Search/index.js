/**
 * Webview Screen
 *
 * @format
 * @flow strict-local
 */

/**
 * [Event Flow]
 *
 * [1] RN => Web
 * 1. (필터:필터변경)필터가 변경 되었을 때, 지도 마커 갱신 (DONE)
 * 2. (필터:필터변경)중심 좌표를 변경 해야할 때, 지도 갱신(검색 결과 클릭 시)
 *
 * [2] Web => RN
 * 1. (지도:별도함수)마커를 클릭했을 때, 상세로 이동.
 * 2. (지도:필터변경)중심좌표가 변경 되었을 때(사용자 액션), 리스트 변경.
 * */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { Appbar, Text } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { debounce } from 'lodash';

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
import { Warehouse, WhrgSearch } from '@Services/apis';
import Progress from '@Components/organisms/Progress';

class Search extends Component {
  constructor(props) {
    super(props);
    let { params } = this.props?.route;
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
      searchQuery:params && params.searchQuery ? params.searchQuery : '',
    };
    // Ref
    this.refSearchFilter = React.createRef();
    this.navigation = props.navigation;

    // this.searchQuery = params && params.searchQuery ? params.searchQuery : '';

    props.searchToggle(params && params.searchQuery ? true : !props.isSearchToggle);
  }

  UNSAFE_componentWillMount() {
    if (this.searchQuery !== this.state.searchQuery) {
      this._onChangeSearchQuery(this.state.searchQuery);
    }
  }

  /**
   * Debounce Utils
   * */
  setDebounce = debounce(callback => {
    callback();
  }, 500);

  /**************************
   * START : Webview Event.
   * */

  // When the WebView has finished loading.
  async _WVOnLoad(e) {
    console.log('::: Web View Loaded ::: ');
  }

  // When the webview calls window.postMessage.
  async _WVOnMessage(e) {
    // console.log(':::: onReceiveWebViewMessage');
    let msgData = WVMsgService.parseMessageData(e);
    switch (msgData.type) {
      case WVMsgService.types.CONSOLE_LOG:
        console.log('[WEBVIEW]' + msgData.data);
        break;
      case WVMsgService.types.CHANGE_MAP_CENTER_POSITION:
        // console.log('[RN] CHANGE_MAP_CENTER_POSITION 수신', msgData.data)
        this.props.setSearchFilter({
          latitude: msgData.data.latitude ? Number(msgData.data.latitude) : '',
          longitude: msgData.data.longitude
            ? Number(msgData.data.longitude)
            : '',
          distance: msgData.data.distance ? Number(msgData.data.distance) : 10,
        });
        break;
      case WVMsgService.types.GO_WH_DETAIL:
        // console.log('[RN] GO_WH_DETAIL 수신', msgData.data)
        this.navigation.navigate('DetailsWH', { id: msgData.data });
        break;
    }
  }

  _WVSendMessage(msgObj) {
    const resultMsg = JSON.stringify(msgObj);
    this.webView.postMessage(resultMsg);
    // console.log(':::: Send Message ::::', resultMsg);
  }

  /**
   * 주소/창고 검색 결과 클릭 핸들러.
   * 웹뷰로 좌표 전달.
   * */
  handleSelectResult = result => {
    this._WVSendMessage({
      type: WVMsgService.types.CHANGE_SEARCH_CENTER_POSITION,
      data: result,
    });
  };

  /**
   * END : Webview Event.
   ***************************/
  // 컴포넌트 랜더링.
  render() {
    const strMsgType = JSON.stringify(WVMsgService.types);
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
    };
    `;

    const {searchQuery} = this.state;

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
        <SearchFilter ref={this.refSearchFilter} />

        {/** 지역/주소 검색하기 패널. */}
        {/** 검색 결과 클릭 시 좌표 이동하기. */}
        {(this.props.isSearchToggle) && (
          <SearchOverlay
            query={searchQuery}
            onSelect={result => this.handleSelectResult(result)}
          />
        )}

        {/** 필터 패널. */}
        <SearchFilterPanel
          onClosed={() => {
            this.refSearchFilter.current._onClickFilter();
          }}
        />

        {/* 테스트 용도 */}
        {/*<TouchableOpacity onPress={()=>this.navigation.navigate('DetailsWH', { id: 'RG20210103255' })}><Text>Reload</Text></TouchableOpacity>*/}

        {/** 웹뷰 지도. */}
        <View
          style={{
            flex: 1,
          }}>
          {this.state.progress < 1 && (
            <View style={styles.loadingWrap}>
              <View style={styles.loadingInner}>
                <Progress />
              </View>
            </View>
          )}

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
  async componentDidMount() {
    // console.log('::componentDidMount::search main');
    /** Complete Initialize. */
    SplashScreen.hide();

    // 필터 코드값.
    const listGdsTypeCode = await Warehouse.listGdsTypeCode(); // 보관유형
    const listCalUnitDvCode = await Warehouse.listCalUnitDvCode(); // 정산단위
    const listCalStdDvCode = await Warehouse.listCalStdDvCode(); // 산정기준
    const listFlrDvCode = await Warehouse.listFlrDvCode(); // 층수
    const listAprchMthdDvCode = await Warehouse.listAprchMthdDvCode(); // 접안방식
    const listInsrDvCode = await Warehouse.listInsrDvCode(); // 보험 가입
    const listCmpltTypes = await WhrgSearch.getCmpltTypes(); // 준공 연차

    this.props.setSearchFilterCode({
      listGdsTypeCode:
        listGdsTypeCode && listGdsTypeCode._embedded
          ? listGdsTypeCode._embedded.detailCodes
          : [], // 보관유형
      listCalUnitDvCode:
        listCalUnitDvCode && listCalUnitDvCode._embedded
          ? listCalUnitDvCode._embedded.detailCodes
          : [], // 정산단위
      listCalStdDvCode:
        listCalStdDvCode && listCalStdDvCode._embedded
          ? listCalStdDvCode._embedded.detailCodes
          : [], // 산정기준
      listFlrDvCode:
        listFlrDvCode && listFlrDvCode._embedded
          ? listFlrDvCode._embedded.detailCodes
          : [], // 층수
      listAprchMthdDvCode:
        listAprchMthdDvCode && listAprchMthdDvCode._embedded
          ? listAprchMthdDvCode._embedded.detailCodes
          : [], // 접안방식
      listInsrDvCode:
        listInsrDvCode && listInsrDvCode._embedded
          ? listInsrDvCode._embedded.detailCodes
          : [], // 보험 가입
      listCmpltTypes:
        listCmpltTypes && listCmpltTypes._embedded
          ? listCmpltTypes._embedded.hashMaps
          : [], // 준공연차
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.route?.params?.searchQuery !== prevState.searchQuery) {
      return { searchQuery: nextProps?.route?.params?.searchQuery };
    }
    return null;
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate(prevProps, prevState) {
    // console.log('::componentDidUpdate::');
    if (prevProps.whFilter !== this.props.whFilter) {
      this.setDebounce(() => {
        // 필터 갱신 될때마다 지도 동기화.
        this._WVSendMessage({
          type: WVMsgService.types.CHANGE_SEARCH_FILTER,
          data: this.props.whFilter,
        });
        // console.log('::::: 필터 변경에 의 지도 갱신 시점 :::::', this.props.whFilter);
      });
    }

    if (prevProps.searchQuery !== this.props?.route?.params?.searchQuery) {
      if (this.props?.route?.params?.searchQuery !== '') {
        // console.log('Hello');
        this.searchQuery = this.props?.route?.params?.searchQuery;
      }
    }
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps :', state);
  return {
    isSearchToggle: state.search.isSearchToggle,
    isFilterToggle: state.search.isFilterToggle,
    whFilter: state.search.whFilter,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps(dispatch) {
  return {
    searchToggle: status => {
      dispatch(ActionCreator.searchToggle(status));
    },
    setSearchFilterCode: status => {
      dispatch(ActionCreator.setSearchFilterCode(status));
    },
    setSearchFilter: status => {
      dispatch(ActionCreator.setSearchFilter(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
