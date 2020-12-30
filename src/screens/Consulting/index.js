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
import { Appbar, Text, Button } from 'react-native-paper';
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
      stepProgress: 0,
      condionNext: false,
      condionPrev: false,
      optionStep2: '',
      optionStep3: '',
      inputStep5: '',
    };
    this.navigation = props.navigation;
  }
  // handle option step 2
  handleOptionStep2 = e => {
    this.setState({
      optionStep2: e,
      stepProgress: e !== '' ? 4 : 2,
      condionNext: e !== '' ? true : false,
    });
  };
  // handle option step 3
  handleOptionStep3 = e => {
    this.setState({
      optionStep3: e,
      stepProgress: e !== '' ? 6 : 4,
      condionNext: e !== '' ? true : false,
    });
  };
  // navigation topbar
  handleNavigation = () => {
    const { step } = this.state;
    console.log('step', step);
    if (step > 0) {
      this.setState({ step: step - 1 });
    } else {
      this.navigation.goBack();
    }
  };
  // prev step
  handleNavigationPrev = () => {
    const { step, stepProgress, inputStep1 } = this.state;
    if (step !== 0) {
      this.setState({ step: step - 1 });
      this.setState({ condionNext: true });
    } else {
      this.setState({ step: 0 });
    }
  };
  // next step
  handleNavigationNext = () => {
    this.setState({ condionNext: false, condionPrev: true });
    const {
      step,
      condionNext,
      optionStep2,
      stepProgress,
      optionStep3,
    } = this.state;

    optionStep2 !== '' &&
      this.setState({
        condionNext: stepProgress < 5 ? true : false,
        stepProgress: stepProgress < 5 ? 4 : 2,
      });
    optionStep3 !== '' &&
      this.setState({
        condionNext: stepProgress < 7 ? true : false,
        stepProgress: stepProgress < 7 ? 6 : 4,
      });
    if (!condionNext) return;
    this.setState({ step: step + 1 });
  };
  // onchange input step 1
  onChangeInputStep1 = e => {
    this.setState({ inputStep1: e });
    if (e !== '') {
      this.setState({
        condionNext: true,
        stepProgress: 2,
      });
    } else {
      this.setState({
        stepProgress: 0,
        condionNext: false,
      });
    }
  };
  // onchange input step 5
  onChangeInputStep5 = e => {
    this.setState({ inputStep5: e });
    if (e !== '') {
      this.setState({
        condionNext: true,
        stepProgress: 10,
      });
    }
  };
  render() {
    const {
      step,
      stepProgress,
      inputStep1,
      condionPrev,
      condionNext,
      optionStep2,
      optionStep3,
      inputStep5,
    } = this.state;
    // console.log('step', step);
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
        {step === 0 && (
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
        {step === 1 && (
          <View style={S.contentAlignLeft}>
            <Text style={S.styleTextTitleNomarl}>
              1. 안녕하세요. 이름이 어떻게 되시나요?
            </Text>
            <TextInput
              placeholderTextColor="#979797"
              style={S.inputNomarl}
              value={inputStep1}
              placeholder="이름을 입력해 주세요"
              onChangeText={e => this.onChangeInputStep1(e)}
            />
            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => alert('a')}>
              <Text style={[S.textButton, { width: 175 }]}>확인</Text>
            </Button>
          </View>
        )}

        {/* step 2 */}
        {step === 2 && (
          <RequestType
            checked={optionStep2}
            optionStep2={this.handleOptionStep2}
          />
        )}

        {/* step 3 */}
        {step === 3 && (
          <ExtraService
            checked={optionStep3}
            optionStep3={this.handleOptionStep3}
          />
        )}
        {/* step 4 */}
        {step === 4 && <AttachDocument />}
        {/* step 5 */}
        {step === 5 && (
          <View style={S.contentAlignLeft}>
            <Text style={[S.styleTextTitleNomarl]}>
              5. 전화번호를 알려주시면, 유플로우 담당자가 최대한 빨리
              연락드리겠습니다.
            </Text>
            <TextInput
              placeholderTextColor="#979797"
              style={S.inputNomarl}
              value={inputStep5}
              placeholder="전화번호를 입력해 주세요"
              onChangeText={e => this.onChangeInputStep5(e)}
            />
            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => alert('a')}>
              <Text style={[S.textButton, { width: 175 }]}>확인</Text>
            </Button>
          </View>
        )}
        {/* step 6 */}
        {step === 6 && (
          <View style={S.contentCenter}>
            <Text style={[S.styleTextTitleNomarl,{textAlign:'center'}]}>
              문의가 등록되었습니다.{'\n'}감사합니다.
            </Text>
            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => alert('a')}>
              <Text style={[S.textButton, { width: 175 }]}>처음으로 돌아가기</Text>
            </Button>
          </View>
        )}
        {step !== 6 && step !== 0 && (
          <View style={S.contentProgress}>
            <View>
              <Text style={S.valueProgress}>
                {`${stepProgress === 0 ? '' : stepProgress}0%`}
              </Text>
              <View style={S.lineDefault}>
                <View style={[S.lineMove, { width: `${stepProgress}0%` }]} />
              </View>
            </View>
            <View style={S.boxBottom}>
              <View pointerEvents={condionPrev ? 'auto' : 'none'}>
                <Icon.Button
                  size={20}
                  onPress={this.handleNavigationPrev}
                  backgroundColor="transparent"
                  color={condionPrev ? 'white' : 'rgba(215, 215, 215, 0.5)'}
                  style={
                    condionPrev
                      ? [S.itemNavigation, { marginRight: 4 }]
                      : [S.itemNavigationNone, { marginRight: 4 }]
                  }
                  name="chevron-down"
                />
              </View>
              <View pointerEvents={condionNext ? 'auto' : 'none'}>
                <Icon.Button
                  size={20}
                  color={condionNext ? 'white' : 'rgba(215, 215, 215, 0.5)'}
                  backgroundColor="transparent"
                  style={condionNext ? S.itemNavigation : S.itemNavigationNone}
                  onPress={this.handleNavigationNext}
                  name="chevron-up"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
  /** when after render DOM */
  async componentDidMount() {
    console.log('inputStep1', inputStep1);
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
