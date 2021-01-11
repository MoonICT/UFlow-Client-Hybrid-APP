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
import MypageInfo from "./MypageInfo";
import MypageBusinessInfo from "./MypageBusinessInfo";

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
      tabInfo: '기본 정보',
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
    }).catch(error => {
      alert('getInfoUser error:' + error);
    });
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {

    const { checkAll, checkSMS, checkMail, tabInfo, userInfo } = this.state;

    return (
      <ScrollView style={S.container}>
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
          {tabInfo === '기본 정보' && <MypageInfo />}
          {tabInfo === '사업자 등록 정보' && <MypageBusinessInfo />}
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
      </ScrollView>
    );
  }
}

export default Information;
