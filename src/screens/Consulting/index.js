/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Checkbox } from 'react-native-paper';

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

const data = [
  {
    title: '의뢰자 정보',
  },
  {
    title: '의뢰 유형',
  },
  {
    title: '부가 서비스',
  },
  {
    title: '첨부 자료',
  },
];

class Consulting extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
      visibleConfirm: false,
      title: '의뢰자 정보',
      isValue: 0,
      checkAll: false,
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

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  render() {
    const { imageStore, workComplete } = this.props;
    const { title, isValue, checkAll, checkService, checkPrivacy } = this.state;

    let viewComponent = (
      <Fragment>
        <TextField
          labelTextField="이름"
          colorLabel="#000000"
          styleProps={{ borderColor: '#d7d7d7' }}
          valueProps={e => this.setState({ name: e })}
          defaultValue="하혜정"
        />
        <TextField
          labelTextField="전화번호"
          colorLabel="#000000"
          styleProps={{ borderColor: '#d7d7d7' }}
          valueProps={e => this.setState({ phone: e })}
          defaultValue="01012345678"
        />
        <TextField
          labelTextField="이메일"
          colorLabel="#000000"
          styleProps={{ borderColor: '#d7d7d7' }}
          valueProps={e => this.setState({ email: e })}
          defaultValue="haharu@aartkorea.com"
        />
        <TextField
          labelTextField="이름"
          colorLabel="#000000"
          styleProps={{ borderColor: '#d7d7d7' }}
          valueProps={e => this.setState({ companyName: e })}
          defaultValue="에이아트"
        />
      </Fragment>
    );
    switch (title) {
      case '의뢰 유형':
        viewComponent = <RequestType navigation={this.navigation} />;
        break;
      case '부가 서비스':
        viewComponent = <ExtraService navigation={this.navigation} />;
        break;
      case '첨부 자료':
        viewComponent = <AttachDocument navigation={this.navigation} />;
        break;
      default:
      // code block
    }

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="간이진단 무료컨설팅"
            color="black"
            fontSize="12"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <AppGrid
            data={data}
            value={isValue}
            dataTitle={data[isValue]}
            titleProps={(e, index) => {
              this.setState({ title: e, isValue: index });
              // console.log('title :>> ', title, index);
            }}
          />
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>
                의뢰자 정보를 입력해 주세요.{'\n'}
                (타이틀 최대 2줄 입력 가능)
              </Text>
            </View>
            {viewComponent}
          </View>
          {title === '첨부 자료' ? (
            <View style={S.footer}>
              <Text style={[DefaultStyle._textTitleCard, S.textTitleFooter]}>
                서비스 이용약관
              </Text>
              <View style={S.checks}>
                <View style={S.checkItem}>
                  <Checkbox
                    status={checkAll ? 'checked' : 'unchecked'}
                    onPress={() => {
                      this.setState({
                        checkAll: !checkAll,
                        checkService: !checkAll,
                        checkPrivacy: !checkAll,
                      });
                    }}
                  />
                  <Text style={S.textCheck}>전체 동의</Text>
                </View>
                <View style={[S.checkItem, S.checkChildren]}>
                  <Checkbox
                    status={checkService ? 'checked' : 'unchecked'}
                    onPress={() => {
                      this.setState({ checkService: !checkService });
                    }}
                  />
                  <Text style={S.textCheck}>서비스 이용약관 (필수)</Text>
                </View>
                <View style={[S.checkItem, S.checkChildren]}>
                  <Checkbox
                    status={checkPrivacy ? 'checked' : 'unchecked'}
                    onPress={() => {
                      this.setState({ checkPrivacy: !checkPrivacy });
                    }}
                  />
                  <Text style={S.textCheck}>개인정보 취급방침 (필수)</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[DefaultStyle._btnInline, S.btnFooter]}
                onPress={() => {}}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  제출하기
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ padding: 16 }}>
              <TouchableOpacity
                style={[DefaultStyle._btnInline, S.btnFooter]}
                onPress={() => {
                  this.setState({ isValue: isValue + 1 });
                }}>
                <Text
                  style={[
                    DefaultStyle._textButton,
                    DefaultStyle._textInline,
                    S.textBtnFooter,
                  ]}>
                  다음
                </Text>
              </TouchableOpacity>
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
