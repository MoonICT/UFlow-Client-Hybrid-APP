/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {
  Checkbox,
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
} from 'react-native-paper';

import AppGrid from '@Components/organisms/AppGrid';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../style';

import { getUserInfo } from '@Services/apis/MyPage';

const tabSelect = [
  {
    id: 'tab1',
    title: '기본 정보'
  },
  {
    id: 'tab2',
    title: '사업자 등록 정보'
  },
]

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
      firstQuery: '',
      visible: false,
      tabInfo: '',
      userInfo: {},
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    this.getInfoUser();
    SplashScreen.hide();
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  async getInfoUser() {
    await getUserInfo().then((res) => {
      console.log('res', res.data)
      if (res.status === 200) {
        this.setState({ userInfo: res.data})
      }
    })
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {

    const { checkAll, checkSMS, checkMail, tabInfo, userInfo } = this.state;

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
        <ScrollView>
          <View style={{ flex: 1 }}>
            <AppGrid data={tabSelect} titleProps={this.handleClickTab} />
          </View>
          {tabInfo === '사업자 등록 정보' ?
            <View>
              <Text>Tab 2</Text>
            </View>
            :
            <View style={[DefaultStyle._cards]}>
              <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
                <Text style={DefaultStyle._textTitleBody}>거래조건</Text>
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
          }
          <View style={S.btn}>
            <Button
              mode="contained"
              style={[{ width: '95%', margin: 12, borderRadius: 24, height: 40, marginBottom: 24 }, DefaultStyle._primary,]}
              color="red"
              onPress={() => {
                this.navigation.navigate('Home');
              }}>
              확인
            </Button>
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
}

export default Information;
