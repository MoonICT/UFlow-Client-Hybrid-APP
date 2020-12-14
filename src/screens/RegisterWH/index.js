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
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Dialog, Appbar, Paragraph, Text, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import Dialogs from '@Components/organisms/Dialog';

import ActionCreator from '@Actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RegisterWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });
  render() {
    const { imageStore, workComplete, route } = this.props;
    console.log('this.state', this.state);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title={
              route && route.params && route.params.type === 'ModifyWH'
                ? '창고 정보 수정'
                : '창고 정보 등록'
            }
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <TouchableOpacity
            style={S.imageRegister}
            onPress={() => this.navigation.navigate('RegisterImage')}>
            {imageStore.length > 0 ? (
              <Fragment>
                <Text style={[DefaultStyle._titleWH, S.textRepresentative]}>
                  대표이미지
                </Text>
                <Image style={S.ImageUpload} source={imageStore[0]} />
              </Fragment>
            ) : (
              <Fragment>
                <Image source={ignore3} style={S.ImageStyle} />
                <Text style={S.textImage}>사진 추가</Text>
              </Fragment>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={S.btnTypeRegister}
            onPress={() =>
              this.navigation.navigate('RegisterInfo', {
                type: route && route.params && route.params.type,
              })
            }>
            <Text style={S.textLeftBtn}>
              {route && route.params && route.params.type === 'ModifyWH'
                ? '창고 정보 수정'
                : '사진 추가'}
            </Text>
            <View style={S.rightBtn}>
              {route && route.params && route.params.type === 'ModifyWH' ? (
                <Text style={S.completeText}>작업완료</Text>
              ) : (
                <Text style={S.textRightBtn}>입력하세요</Text>
              )}

              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.btnTypeRegister}
            onPress={() =>
              this.navigation.navigate('RegisterIntro', {
                type: route && route.params && route.params.type,
              })
            }>
            <Text style={S.textLeftBtn}>창고 소개</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.btnTypeRegister}
            onPress={() =>
              this.navigation.navigate('RegisterMoreIntro', {
                type: route && route.params && route.params.type,
              })
            }>
            <Text style={S.textLeftBtn}>부가 정보</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.btnTypeRegister}
            onPress={() =>
              this.navigation.navigate('RegisterInfoFloor', {
                type: route && route.params && route.params.type,
              })
            }>
            <Text style={S.textLeftBtn}>층별 상세 정보</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.btnTypeRegister}
            onPress={() =>
              this.navigation.navigate('RegisterContractConditions', {
                type: route && route.params && route.params.type,
              })
            }>
            <Text style={S.textLeftBtn}>계약 조건</Text>
            <View style={S.rightBtn}>
              {workComplete === undefined ? (
                <Text style={S.textRightBtn}>입력하세요</Text>
              ) : (
                <Text style={S.completeText}>작업완료</Text>
              )}

              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={DefaultStyle.footerRegister}>
          <TouchableOpacity
            style={[S.btnSubmit, S.activeBtnSubmit]}
            onPress={() => {
              this.showDialog();
            }}>
            <Text style={[S.textSubmit, S.textActiveSubmit]}>
              창고 등록하기
            </Text>
          </TouchableOpacity>
        </View>
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            창고 등록 완료
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
)(RegisterWH);
