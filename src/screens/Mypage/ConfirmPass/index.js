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

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
class WithdrawalInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
    };

    this.navigation = props.navigation;
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    // const { imageStore } = this.props;
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
              onPress={() => this.showDialog()}>
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
