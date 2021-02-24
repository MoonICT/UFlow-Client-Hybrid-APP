/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 14:57:42
 * @modify date 2020-11-24 19:22:01
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import * as Progress from 'react-native-progress';

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
import SplashScreen from "react-native-splash-screen";

class Global extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { children, progress } = this.props;

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
