/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import {
  Appbar,
  Button,
  Dialog,
  Paragraph,
} from 'react-native-paper';

import AppGrid from '@Components/organisms/AppGrid';
import MypageInfo from "./MypageInfo";
import MypageBusinessInfo from "./MypageBusinessInfo";
import SplashScreen from 'react-native-splash-screen';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import { styles as S } from '../style';

import { getUserInfo } from '@Services/apis/MyPage';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class Information extends Component {
  constructor (props) {
    super(props);
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
      firstQuery: '',
      visible: false,
      tabInfo: {
        id: 'tab1',
        title: getMsg(this.props.lang, 'ML0190', '기본 정보')
      },
      userInfo: {},
    };
    this.navigation = props.navigation;
    this.tabSelect = [
      {
        id: 'tab1',
        title: getMsg(this.props.lang, 'ML0190', '기본 정보')
      },
      {
        id: 'tab2',
        title: getMsg(this.props.lang, 'ML0191', '사업자 등록정보')
      },
    ]
  }

  /** when after render DOM */
  async componentDidMount () {
    console.log('::componentDidMount::');
    this.getInfoUser();
    // SplashScreen.hide();
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }


  async getInfoUser () {
    await getUserInfo().then((res) => {
      console.log('res', res.data)
      if (res.status === 200) {
        this.setState({ userInfo: res.data })
      }
    }).catch(error => {
      alert('getInfoUser error:' + error);
    });
  }

  handleClickTab = (tabName, index) => {
    this.setState({
      tabInfo: tabName
    });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render () {

    const { tabInfo } = this.state;

    return (
      <ScrollView style={S.container}>

        <HistoryBackActionBar
          title={getMsg(this.props.lang, 'ML0542', '내 정보 수정')}
          navigation={this.navigation}
        />

        <ScrollView>
          <View style={{ flex: 1 }}>
            <AppGrid data={tabSelect} title={tabInfo.title} titleProps={this.handleClickTab} />
          </View>
          {tabInfo.id === 'tab1' && <MypageInfo navigation={this.navigation} />}
          {tabInfo.id === 'tab2' && <MypageBusinessInfo />}
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
            {getMsg(this.props.lang, 'ML0245', '회원정보 수정 완료')}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              {getMsg(this.props.lang, 'ML0246', '회원정보가 수정되었습니다.')}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={this.hideDialog}>
              {getMsg(this.props.lang, 'ML0100', '확인')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </ScrollView>
    );
  }
}

export default Information;
