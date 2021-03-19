// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Paragraph, Appbar, Dialog, Text, Button } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';
import Appbars from '@Components/organisms/AppBar';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import TextField from '@Components/organisms/TextField';
import DialogScreen from '@Components/organisms/Dialog';
import illust3 from '@Assets/images/illust3.png';
import illust13 from '@Assets/images/illust13.png';
import Loading from '@Components/atoms/Loading';
import { FindPassword } from '@Services/apis';

// Local Imports
import DefaultStyle from '../../styles/default';
import ActionCreator from '@Actions';
import { styles as S } from './style';
import {styles as SS} from "../Mypage/RequestQuotation/style";
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      email: '',
      newPass: '',
      confirmNewPass: '',
      visible: false,
      visiblePass: false,
      isConfirmPass: false,
      isConfirmEmail: false,
      loading: false,
      isSubmit: false
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
  //console.log('//::componentWillUnmount::');
  }
  showDialog = () => this.setState({ visible: true });
  hideDialog = () => this.setState({ visible: false });
  showConfirmPass = () => this.setState({ visiblePass: true });
  hideConfirmPass = () => this.setState({ visiblePass: false });

  sendEmail = () => {
    const { showPopup } = this.props;
    const {email} = this.state;

    if (this.state.isSubmit) return;
    this.setState({ loading: true });
    FindPassword.sendEmail({ email: email })
      .then(res => {
        this.setState({ loading: false, isSubmit: true });
        this.showDialog()
      })
      .catch(error => {
        this.setState({ loading: false });
        showPopup({ title: 'UFLOW', content: error.response.data.message, type: 'confirm' });
        // alert(error.response.data.message);
      });
  }
  render() {
    const {
      email,
      isConfirmEmail,
      newPass,
      confirmNewPass,
      visible,
      visiblePass,
    } = this.state;
    return (
      <SafeAreaView style={DefaultStyle._container}>

        {/*<Appbars>*/}
        {/*  <Appbar.Action*/}
        {/*    icon="arrow-left"*/}
        {/*    color="black"*/}
        {/*    onPress={() => this.navigation.goBack()}*/}
        {/*  />*/}
        {/*  <Appbar.Content*/}
        {/*    title={*/}
        {/*      isConfirmEmail === false ? '비밀번호 찾기' : '비밀번호 재설정'*/}
        {/*    }*/}
        {/*    color="black"*/}
        {/*    fontSize="16"*/}
        {/*    titleStyle={DefaultStyle.headerTitle}*/}
        {/*  />*/}
        {/*</Appbars>*/}
        <HistoryBackActionBar
          title={isConfirmEmail === false ? getMsg(this.props.lang, 'ML0004', '비밀번호 찾기') : getMsg(this.props.lang, 'ML0027', '비밀번호 재설정')}
          navigation={this.navigation}
        />

        <ScrollView>
          {isConfirmEmail === false ? (
            <Fragment>
              <Image style={DefaultStyle._imageDialog} source={illust13} />
              <View style={S.body}>
                <Text
                  style={[DefaultStyle._textTitleCard, { marginBottom: 18 }]}>
                  {getMsg(this.props.lang, 'ML0048', '이메일 주소를 입력해 주세요.')}
                </Text>
                <TextField
                  labelTextField="이메일"
                  colorLabel="#000000"
                  styleProps={{ borderColor: '#d7d7d7' }}
                  valueProps={e => this.setState({ email: e })}
                />
                <TouchableOpacity
                  disabled={this.state.isSubmit}
                  style={[DefaultStyle._btnInline, this.state.isSubmit ? SS.btnDisabled : null]}
                  onPress={() => {
                    email !== '' ? this.sendEmail() : null;
                  }}>
                  <Text style={[DefaultStyle._textButton, S.textConfirm]}>
                    {getMsg(this.props.lang, 'ML0100', '확인')}
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          ) : (
            <View style={[S.body, { marginTop: 24 }]}>
              <Text style={[DefaultStyle._textTitleCard, { marginBottom: 18 }]}>
                {getMsg(this.props.lang, 'ML0028', '인증이 완료되었습니다.')}{'\n'}
                {getMsg(this.props.lang, 'ML0029', '새로운 비밀번호를 설정해 주세요.')}
              </Text>
              <TextField
                labelTextField={getMsg(this.props.lang, 'ML0014', '비밀번호')}
                colorLabel="#000000"
                styleProps={{ borderColor: '#d7d7d7' }}
                textContentType="password"
                secureTextEntry={true}
                valueProps={e => this.setState({ newPass: e })}
              />
              <TextField
                labelTextField={getMsg(this.props.lang, 'ML0015', '비밀번호 확인')}
                colorLabel="#000000"
                styleProps={{ borderColor: '#d7d7d7' }}
                textContentType="password"
                secureTextEntry={true}
                valueProps={e => this.setState({ confirmNewPass: e })}
              />
              <TouchableOpacity
                style={[DefaultStyle._btnInline]}
                ref={(ref)=>this.submit = ref}
                onPress={() => {
                  newPass !== '' && confirmNewPass !== ''
                    ? this.showConfirmPass()
                    : null;
                }}>
                <Text style={[DefaultStyle._textButton, S.textConfirm]}>
                  {getMsg(this.props.lang, 'ML0100', '확인')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Popup Confirm Email*/}
        <DialogScreen />
        <Dialog
          style={DefaultStyle.popup}
          visible={visible}
          onDismiss={this.hideDialog}>
          <Dialog.Content>
            <Image style={DefaultStyle._imageDialog} source={illust13} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            {getMsg(this.props.lang, 'ML0030', '이메일 전송 완료')}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              {getMsg(this.props.lang, 'ML0031', '입력하신 이메일로 비밀번호 재설정 메일을 발송했습니다.')}
              {getMsg(this.props.lang, 'ML0032', '이메일을 확인해 주세요.')}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {
                this.hideDialog();
                // this.setState({ isConfirmEmail: true });
              }}>
              {getMsg(this.props.lang, 'ML0001', '확인')}
            </Button>
          </Dialog.Actions>
        </Dialog>
        {/* Popup Confirm Password*/}
        <Dialog
          style={DefaultStyle.popup}
          visible={visiblePass}
          onDismiss={this.hideConfirmPass}>
          <Dialog.Content>
            <Image style={DefaultStyle._imageDialog} source={illust3} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            {getMsg(this.props.lang, 'ML0033', '비밀번호 재설정 완료')}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              {getMsg(this.props.lang, 'ML0034', '비밀번호 재설정을 완료했습니다.')}{'\n'}
              {getMsg(this.props.lang, 'ML0035', '변경하신 비밀번호로 다시 로그인을 진행해 주세요.')}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {
                this.hideConfirmPass();
                this.setState({ isConfirmEmail: true });
              }}>
              {getMsg(this.props.lang, 'ML0001', '확인')}
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Loading loading={this.state.loading} />
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
    count: state.home.count,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    countUp: diff => {
      dispatch(ActionCreator.countUp(diff));
    },
    countDown: diff => {
      dispatch(ActionCreator.countDown(diff));
    },
    showPopup: data => {
      dispatch(
        ActionCreator.show({
          title: data?.title || '',
          content:
            data?.content ||
            '',
          type: data?.type || ''
        }),
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPass);
