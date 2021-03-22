/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, IconButton } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import WebviewMap from '@Components/organisms/WebviewMap';
import ActionCreator from '@Actions';
import mapImg from '@Assets/images/mapImg.png';
import { styles as S } from '../style';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { styles as SS } from './style';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class RegisterInfo extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = { isSwitchOn: false };

    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  render () {
    const { latitude, longitude } = this.props.route.params
    return (
      <SafeAreaView style={[S.container, { flex: 1 }]}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 위치"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}

        <HistoryBackActionBar
            title={getMsg(this.props.lang, 'ML0221', '창고 위치')}
            navigation={this.navigation}
          />
        <View style={{
          flex: 1,
        }}>
          {latitude > 0 && longitude > 0 &&
          <WebviewMap latitude={latitude}
                      longitude={longitude}
                      isToggleBtn={true} />}
          {/*<Text style={SS.textLocation}>*/}
          {/*인천광역시 중구 서해대로94번길 100*/}
          {/*</Text>*/}
        </View>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterInfo);
