/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';
import { styles as S } from './style';

import { Question } from '@Services/apis';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false, email: '', content: '' };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {

  }

  fetchData(params) {
    Question.createQuestion({ ...params, email: this.state.email, content: this.state.content })
      .then(res => {
        console.log('::::: Question :::::', res);
        if (res.status === 200) {
          this.showDialog();
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  handleChangeEmail = (e) => this.setState({ email: e })

  handleChangeContent = (e) => this.setState({ content: e })

  onSubmit = () => {
    this.fetchData();
  };

  render() {

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="문의하기"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
          <Appbar.Content
            color="rgba(0, 0, 0, 0.47)"
            title="등록"
            onPress={this.onSubmit}
            titleStyle={DefaultStyle._textHeaderRight}
          />
        </Appbars>
        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleBody}>
                유플로우에 궁금하신 점을 {'\n'}
                문의해 주세요.
              </Text>
            </View>
            <TextField
              labelTextField="이메일"
              placeholder='Please enter email'
              colorLabel="#000000"
              onChangeText={this.handleChangeEmail}
            />
            <TextField
              labelTextField="내용"
              colorLabel="#000000"
              numberOfLines={5}
              multiline={true}
              onChangeText={this.handleChangeContent}
            />
          </View>
        </ScrollView>
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Content>
            {/* <View style={DefaultStyle.imagePopup} /> */}
            <Image
              style={DefaultStyle.imagePopup}
              source={{
                uri: 'https://cdn.discordapp.com/attachments/782864362171400235/793758658881257482/illust-popup-113x.png',
              }}
            />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            문의 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              UFLOW 관리자가 입력하신 정보를 확인하기 위해 연락을 드릴
              예정입니다. 자세한 내용은 [마이페이지 `{'>'}` 내 창고]에서 확인해
              주세요.
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
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionScreen);
