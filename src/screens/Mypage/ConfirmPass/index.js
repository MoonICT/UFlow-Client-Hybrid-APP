/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Card, Text, RadioButton, Checkbox } from 'react-native-paper';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../../components/organisms/AppBar';
import ActionCreator from '../../../actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
class WithdrawalInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      firstQuery: '',
    };

    this.navigation = props.navigation;
  }
  render() {
    // const { imageStore } = this.props;
    const {
      checkService,
      checkVisit,
      checkFunction,
      checkContent,
    } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="회원탈퇴"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>비밀번호 확인</Text>
            </View>
            <View style>
              <TextField
                labelTextField="비밀번호"
                colorLabel="#000000"
                textContentType="password"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
              onPress={() => console.log('취소하기')}>
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  DefaultStyle.textActiveSubmit,
                ]}>
                취소하기
              </Text>
            </TouchableOpacity>
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
    // count: state.home.count,
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithdrawalInformation);
