/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Bgr from '@Assets/images/bgr-consulting.png';
// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import TextField from '@Components/organisms/TextField';
import RequestType from './RequestType';
import ExtraService from './ExtraService';
import AttachDocument from './AttachDocument';
import ActionCreator from '@Actions';
import { styles as S } from './style';
class Consulting extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      step: 0,
      inputStep1: '',
    };
  }
  handleNavigation = () => {};
  render() {
    const { step } = this.state;
    return (
      <View style={S.container}>
        <View>
          <Image source={Bgr} style={S.bgrImage} />
        </View>
        <Appbars customStyle={{ borderBottomColor: '#d7d7d7' }}>
          <Appbar.Action
            icon="arrow-left"
            color="white"
            onPress={() => this.handleNavigation()}
          />
          <Appbar.Content
            title="물류컨설팅"
            titleStyle={DefaultStyle.headerTitleWhite}
          />
        </Appbars>
        {/* step 0 */}
        {step === 1 && (
          <View style={S.contentCenter}>
            <Text style={S.styleH3}>물류 컨설팅</Text>
            <Text style={S.styleTextNomarl}>
              유플로우 물류창고에 임대 관심이 있으시면{'\n'}시작 버튼을
              눌러주세요.
            </Text>
            <Button
              mode="contained"
              style={[S.styleButton, { width: 175, margin: 'auto' }]}
              onPress={() => this.setState({ step: 1 })}>
              <Text style={[S.textButton, { width: 175 }]}>
                물류 컨설팅 시작하기
              </Text>
            </Button>
          </View>
        )}
        {/* step 1 */}
        {step === 0 && (
          <View style={S.contentAlignLeft}>
            <Text style={S.styleTextTitleNomarl}>
              1. 안녕하세요. 이름이 어떻게 되시나요?
            </Text>
            <TextInput
              placeholderTextColor="#979797"
              style={S.inputNomarl}
              placeholder="이름을 입력해 주세요"
              onChangeText={e => this.setState({ inputStep1: e })}
            />
            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => alert('a')}>
              <Text style={[S.textButton, { width: 175 }]}>확인</Text>
            </Button>
          </View>
        )}

        {step !== 6 && (
          <View style={S.contentProgress}>
            <View>
              <Text style={S.valueProgress}>
                {`${step === 0 ? '' : step}0%`}
              </Text>
              <View style={S.lineDefault}>
                <View style={[S.lineMove, { width: `${1}0%` }]} />
              </View>
            </View>
            <View style={S.boxBottom}>
              <Icon.Button
                size={20}
                backgroundColor="transparent"
                style={[S.itemNavigation, { marginRight: 4 }]}
                name="chevron-up"
              />
              <Icon.Button
                size={20}
                backgroundColor="transparent"
                style={S.itemNavigation}
                name="chevron-down"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
  /** when after render DOM */
  async componentDidMount() {
    console.log('inputStep1',inputStep1)
  }
}
/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Consulting);
