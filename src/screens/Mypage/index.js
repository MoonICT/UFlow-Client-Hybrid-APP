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
import {
  Checkbox,
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';
import Dialogs from '@Components/organisms/Dialog';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';

import ActionCreator from '../../actions';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';


class MyPage extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
      firstQuery: '',
      visible: false,
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
    const { checkAll, checkSMS, checkMail, firstQuery } = this.state;
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
        <ScrollView style={DefaultStyle.backgroundGray}>
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
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>회사 정보</Text>
            </View>
            <View style>
              <TextField labelTextField="회사명" colorLabel="#000000" />
              <TextField labelTextField="담당자명" colorLabel="#000000" />
              <View style={S.multiTextField}>
                <TextField
                  styleProps={{ marginRight: 8 }}
                  labelTextField="직함"
                  colorLabel="#000000"
                />
                <TextField
                  styleProps={{ marginLeft: 8 }}
                  labelTextField="부서명"
                  colorLabel="#000000"
                />
              </View>

              <TextField
                labelTextField="담당자 전화번호"
                colorLabel="#000000"
              />
              <TextField labelTextField="담당자 이메일" colorLabel="#000000" />
            </View>
          </View>

          <View style={[DefaultStyle._cards, S.cardFooter]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>위치</Text>
            </View>
            <View style>
              <Searchbar
                inputStyle={S.search}
                style={{ marginBottom: 24 }}
                placeholder="예)번동10-1, 강북구 번동"
                onChangeText={query => {
                  this.setState({ firstQuery: query });
                }}
                value={firstQuery}
              />
              <TextField
                placeholder="인천광역시 중구 서해대로94번길 100"
                colorLabel="#000000"
              />

              <TextField
                defaultValue="에이씨티앤코아물류"
                colorLabel="#000000"
                valueProps={e => console.log('e', e)}
              />
              <TouchableOpacity
                style={S.btnFooter}
                onPress={() => this.navigation.navigate('WithdrawalInformation')}>
                <Text style={S.textBtnFooter}>회원탈퇴</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
              onPress={() => this.showDialog()}>
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  DefaultStyle.textActiveSubmit,
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            회원정보 수정 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              회원정보가 수정되었습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={this.hideDialog}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>
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
)(MyPage);
