/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import ProductCard from '@Components/organisms/ProductCard';

import ActionCreator from '@Actions';
import cardBG from '@Assets/images/card-img.png';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Question extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    const { imageStore, workComplete } = this.props;
    const dataSelect = [
      {
        label: '문의유형',
        value: '문의유형',
      },
      {
        label: '문의유형2',
        value: '문의유형2',
      },
    ];
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
            onPress={() => {
              this.showDialog();
            }}
            titleStyle={DefaultStyle.rightTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>
                유플로우에 궁금하신 점을 {'\n'}
                문의해 주세요.
                <Text style={DefaultStyle.childTextTitle}>문의해 주세요.</Text>
              </Text>
            </View>
            <Select data={dataSelect} />
            <TextField
              labelTextField="이메일"
              defaultValue="haharu@aartkorea.com"
              colorLabel="#000000"
            />
            <TextField
              labelTextField="내용"
              colorLabel="#000000"
              numberOfLines={5}
              multiline={true}
            />
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
)(Question);
