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
import Select from '@Components/organisms/Select';
import { styles as S } from './style';

import { Emergency } from '@Services/apis';
const windowHeight = Dimensions.get('window').height;
var searchTimerQuery;
class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: true,
      dataEvs: [],
      email: '',
      isEmail: false,
      isContent: false,
      content: '',
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  componentDidMount() {
    Emergency.GetEvs()
      .then(res => {
        if (res && res.length > 0) {
          let dataConvert = res.map(item => {
            return {
              value: item.value,
              code: item.code,
              label: item.value,
              name: item.name,
            };
          });
          this.setState({
            dataEvs: dataConvert,
          });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => {
    this.setState({ visible: false });
    this.navigation.goBack();
  };

  handleChangeEmail = value => this.setState({ email: value });

  handleChangeContent = value => {
    if (searchTimerQuery) {
      clearTimeout(searchTimerQuery);
    }
    searchTimerQuery = setTimeout(async () => {
      this.setState({ content: value });
    }, 500);
    
  } 

  onSubmit = async () => {
    const { email, content } = this.state;
    this.setState({
      isEmail: email === '' ? true : false,
      isContent: content === '' ? true : false,
    });
    if (email === '' || content === '') return;
    await Emergency.SendEvs({
      email,
      content,
    })
      .then(res => {
        console.log('res submit', res);
        this.hideDialog;
        this.navigation.goBack();
      })
      .catch(err => {
        console.log('err submit', err);
      });
  };
  onCancel = () => {
    this.hideDialog;
    this.navigation.goBack();
  };
  valueProps = value => {
    this.setState({ email: value });
  };
  render() {
    const { dataEvs, email, content, isContent, isEmail } = this.state;
    console.log('email', email);
    console.log('content', content);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Dialog
              style={DefaultStyle.popup}
              visible={this.state.visible}
              onDismiss={this.hideDialog}>
              <Dialog.Title
                style={[DefaultStyle._titleDialog, S.titleQuestion]}>
                긴급차량 지원
              </Dialog.Title>
              <Dialog.Content>
                <View
                  style={[
                    DefaultStyle._cards,
                    DefaultStyle._border0,
                    { paddingLeft: 0, paddingRight: 0 },
                  ]}>
                  <Select
                    required={isEmail}
                    valueSelected={email}
                    data={dataEvs}
                    labelSelected="이메일"
                    valueProps={this.valueProps}
                  />
                  <TextField
                    borderColor={isContent ? 'red' : '#cccccc'}
                    labelTextField="문의 내용"
                    colorLabel="#000000"
                    placeholder="문의하실 내용을 입랙해 주세요."
                    numberOfLines={5}
                    paddingTop={0}
                    multiline={true}
                    onChangeText={this.handleChangeContent}
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions style={DefaultStyle._buttonPopup}>
                <Button
                  style={[DefaultStyle._buttonElement]}
                  onPress={this.onCancel}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.54)' }}>취소</Text>
                </Button>
                <Button
                  style={DefaultStyle._buttonElement}
                  onPress={this.onSubmit}>
                  확인
                </Button>
              </Dialog.Actions>
            </Dialog>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
