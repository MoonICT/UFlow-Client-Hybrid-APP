/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
// import { styles as SS } from './style';
class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { isSwitchOn: false };

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

  render() {
    const { params } = this.props.route;
    console.log('params', params.status);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
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
        </Appbars>
        <ScrollView>
          {params.status === 'waitting' ? (
            <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
              <Text style={S.status}>답변 대기 중</Text>
              <Text style={S.titleItem}>
                [문의유형] 안녕하세요. 문의 드릴 게 있습니다.
              </Text>
              <Text style={DefaultStyle.contentItem}>2020.10.29</Text>
              <View style={S.content}>
                <Text style={S.textContent}>
                  작성한 문의 내용이 노출됩니다.
                </Text>
              </View>
              <View style={S.answers}>
                <TextField
                  placeholder=" 답변 내용을 입력해 주세요."
                  colorLabel="#000000"
                  valueProps={e => console.log('e', e)}
                  numberOfLines={5}
                  multiline
                  textAlignVertical="top"
                />
                <TouchableOpacity
                  style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
                  onPress={() => {
                    // this.showDialog();
                  }}>
                  <Text
                    style={[
                      DefaultStyle.textSubmit,
                      DefaultStyle.textActiveSubmit,
                    ]}>
                    답변완료
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
              <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
              <Text style={S.titleItem}>
                [문의유형] 안녕하세요. 문의 드릴 게 있습니다.
              </Text>
              <Text style={DefaultStyle.contentItem}>2020.10.29</Text>
              <View style={S.content}>
                <Text style={S.textContent}>
                  작성한 문의 내용이 노출됩니다.
                </Text>
              </View>
              <View style={[S.answers, S.answerContents]}>
                <Text style={S.textAnswers}>안녕하세요. 동원창고입니다.</Text>
                <Text style={[S.textAnswers, { marginBottom: 15 }]}>
                  문의에 대한 답변이 노출되는 부분입니다.
                </Text>
                <Text style={S.textAnswers}>감사합니다.</Text>
              </View>
            </View>
          )}
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
    imageStore: state.registerWH.pimages,
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
)(RegisterInfo);
