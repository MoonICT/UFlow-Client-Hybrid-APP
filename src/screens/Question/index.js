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
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';
import Loading from '@Components/atoms/Loading';
import { styles as S } from './style';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

import { Question } from '@Services/apis';

const windowHeight = Dimensions.get('window').height;

class QuestionScreen extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
      loading: false,
      email: '',
      content: '',
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount () {
  }

  fetchData (params) {
    this.setState({ loading: true });
    Question.createQuestion({
      ...params,
      email: this.state.email,
      content: this.state.content,
    })
      .then(res => {
        console.log('::::: Question :::::', res);
        this.setState({ loading: false });
        if (res.status === 200) {
          this.showDialog();
        }
      })
      .catch(err => {
        console.log('err', err);
        this.setState({ loading: false });
      });
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  handleChangeEmail = value => {
    this.setState({ email: value })
  };

  handleChangeContent = value => {
    this.setState({ content: value });
  }

  onSubmit = () => {
    if (this.state.email.length > 0 && this.state.content.length > 0) {
      this.fetchData();
    } else {
      return;
    }
  };

  render () {
    // const windowHeight = Dimensions.get('window').height;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View>
          <Appbars>
            <Appbar.Action
              icon="arrow-left"
              color="black"
              onPress={() => this.navigation.goBack()}
            />
            <Appbar.Content
              title={getMsg(this.props.lang, 'ML0167', '문의하기')}
              color="black"
              fontSize="12"
              style={DefaultStyle.headerTitle}
            />
            <Appbar.Content
              color="#ff6d00"
              title={getMsg(this.props.lang, 'ML0429', '등록')}
              style={S.headerButon}
              onPress={this.onSubmit}
              titleStyle={DefaultStyle._textHeaderRight}
            />
          </Appbars>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <ScrollView>
              <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
                <View style={DefaultStyle._titleCard}>
                  <Text style={DefaultStyle._textTitleBody}>
                    {getMsg(this.props.lang, 'ML0430', '유플로우에 궁금하신 점을\n문의해 주세요.')}
                  </Text>
                </View>
                <TextField
                  labelTextField={getMsg(this.props.lang, 'ML0013', '이메일')}
                  placeholder=""
                  colorLabel="#000000"
                  onChangeText={this.handleChangeEmail}
                />
                <TextField
                  labelTextField={getMsg(this.props.lang, 'ML0432', '내용')}
                  placeholder={getMsg(this.props.lang, 'ML0431', '문의하실 내용을 입력해 주세요.')}
                  colorLabel="#000000"
                  numberOfLines={15}
                  multiline={true}
                  style={DefaultStyle._textAreaStyle}
                  onChangeText={this.handleChangeContent}
                />
              </View>
            </ScrollView>
            <Dialog
              style={DefaultStyle.popup}
              visible={this.state.visible}
              onDismiss={() => {
                this.hideDialog()
                this.navigation.goBack()
              }}>
              <Dialog.Content>
                {/* <View style={DefaultStyle.imagePopup} /> */}
                <Image
                  style={DefaultStyle.imagePopup}
                  source={{
                    uri:
                      'https://cdn.discordapp.com/attachments/782864362171400235/793758658881257482/illust-popup-113x.png',
                  }}
                />
              </Dialog.Content>
              <Dialog.Title
                style={[DefaultStyle._titleDialog, S.titleQuestion]}>
                {getMsg(this.props.lang, 'ML0433', '문의 완료')}
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph
                  style={[DefaultStyle.contentDialog, S.contentQuestion]}>
                  {getMsg(this.props.lang, 'ML0434', 'UFLOW 관리자가 입력하신 정보를 확인하기 위해 연락을 드릴 예정입니다. 자세한 내용은 [마이페이지 > 내 창고]에서 확인해 주세요.')}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions style={DefaultStyle._buttonPopup}>
                <Button
                  style={DefaultStyle._buttonElement}
                  onPress={() => {
                    this.hideDialog()
                    this.navigation.goBack()
                  }}>
                  {getMsg(this.props.lang, 'ML0100', '확인')}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </View>
        </TouchableWithoutFeedback>
        <Loading loading={this.state.loading} />
      </KeyboardAvoidingView>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionScreen);
