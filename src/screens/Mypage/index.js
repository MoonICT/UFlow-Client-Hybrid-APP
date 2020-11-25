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
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Checkbox, Appbar, Paragraph, Text, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';
import Dialogs from '@Components/organisms/Dialog';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';

import ActionCreator from '../../actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dataSelect = [
  {
    label: '1년',
    value: '1년',
  },
  {
    label: '2년',
    value: '2년',
  },
];
class RegisterWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });
  render() {
    const { imageStore, workComplete } = this.props;
    const { checkAll, checkSMS, checkMail } = this.state;
    console.log('this.state', this.state);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="내 정보 수정"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>거래조건</Text>
            </View>
            <View style>
              <TextField
                labelTextField="이름"
                placeholder="하혜정"
                colorLabel="#000000"
              />
              <TextField
                labelTextField="이메일"
                placeholder="haharu@aartkorea.com"
                colorLabel="#000000"
              />
              <TextField labelTextField="현재 비밀번호" colorLabel="#000000" />
              <TextField labelTextField="새 비밀번호" colorLabel="#000000" />
              <TextField
                labelTextField="새 비밀번호 확인"
                colorLabel="#000000"
              />
            </View>
            <View style={S.checks}>
              <View style={S.checkItem}>
                <Checkbox
                  status={checkAll ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checkAll: !checkAll,
                      checkSMS: !checkAll,
                      checkMail: !checkAll,
                    });
                  }}
                />
                <Text style={S.textCheck}>마케팅 수신 동의</Text>
              </View>
              <View style={[S.checkItem, S.checkChildren]}>
                <Checkbox
                  status={checkSMS ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkSMS: !checkSMS });
                  }}
                />
                <Text style={S.textCheck}>SMS</Text>
              </View>
              <View style={[S.checkItem, S.checkChildren]}>
                <Checkbox
                  status={checkMail ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkMail: !checkMail });
                  }}
                />
                <Text style={S.textCheck}>이메일</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.imageData,
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
)(RegisterWH);
