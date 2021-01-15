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
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';
import TextField from '@Components/organisms/TextField';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';

import { MyPage } from '@Services/apis';

class WithdrawalInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
      passWord: '',
    };

    this.navigation = props.navigation;
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

  cancelMembership(params) {
    let defaultParams = {
      password: this.state.passWord,
      ...params,
    };
    MyPage.cancelMembership(defaultParams)
      .then(res => {
        console.log('::::: cancelMembership :::::', res);
        if (res.status === 200) {
          this.showDialog()
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  onCancelMembership = (labelList) => {
    let labelString = labelList.toString();
    this.cancelMembership({ leaveReason: labelString });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    const { params } = this.props.route;
    return (
      <SafeAreaView style={S.container}>

        <HistoryBackActionBar
          title={'회원탈퇴'}
          navigation={this.navigation}
        />


        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <View style={[DefaultStyle._titleCard, { marginBottom: 24 }]}>
              <Text style={DefaultStyle._textTitleCard}>비밀번호 확인</Text>
            </View>
            <View style>
              <TextField
                labelTextField="비밀번호"
                colorLabel="#000000"
                textContentType="password"
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({ passWord: text });
                }}
              />
            </View>
            <TouchableOpacity
              style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
              onPress={() => this.onCancelMembership(params.arrLabel)}>
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
            회원탈퇴 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              회원탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.
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
