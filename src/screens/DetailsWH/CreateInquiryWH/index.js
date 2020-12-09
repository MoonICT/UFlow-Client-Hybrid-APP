/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Switch } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';

import ActionCreator from '@Actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
class CreateInquiryWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { isSwitchOn: false };
    this.navigation = props.navigation;
  }
  onToggleSwitch = () => this.setState({ isSwitchOn: !this.state.isSwitchOn });

  render() {
    const { imageStore } = this.props;
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 문의 작성"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
          <Appbar.Content
            color="rgba(0, 0, 0, 0.47)"
            title="등록"
            onPress={() => console.log('up :>> ')}
            titleStyle={DefaultStyle.rightTitle}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={SS.bodyCard}>
            <View style={SS.titleBody}>
              <Text style={SS.textTitleBody}>에이씨티앤코아물류</Text>
            </View>
            <TextField
              labelTextField="제목"
              defaultValue="제목을 입력해 주세요."
              colorLabel="#000000"
            />
            <TextField
              labelTextField="내용"
              defaultValue="문의하실 내용을 입랙해 주세요."
              colorLabel="#000000"
              numberOfLines={4}
            />
          </View>
          <View style={SS.bodyCard}>
            <View style={SS.titleBody}>
              <Text style={SS.textTitleBody}>비밀글 설정</Text>
              <View style={S.rightTitle}>
                <Switch
                  // thumbColor={color.primary.main}
                  value={this.state.isSwitchOn}
                  onValueChange={this.onToggleSwitch}
                />
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
    // count: state.home.count,
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
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
)(CreateInquiryWH);
