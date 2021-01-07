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
import { Warehouse } from '@Services/apis';

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
  submit = () => {
    Warehouse.registerWH(this.props.dataWH)
      .then(res => {
        console.log('::::: API Sign in :::::', res);
        const status = res.status;
        if (status === 200) {
          this.navigation.navigate('Home');
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  render() {
    const { imageStore, workComplete, route, dataWH } = this.props;
    let completeMoreInfo = route.params && route.params.completeMoreInfo;
    let completeInfo = route.params && route.params.completeInfo;
    let completeFloor = route.params && route.params.completeFloor;
    let completeIntro = route.params && route.params.completeIntro;
    console.log('dataWHAll', dataWH);
    console.log('routeWH', route);
    let isSubmitUpdate = false;

    if (
      imageStore.length > 2 &&
      completeMoreInfo === true &&
      completeInfo === true &&
      completeFloor === true &&
      completeIntro === true
    ) {
      isSubmitUpdate = true;
    }
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
        {/** Close AppBar */}

        {/******* Content *******/}
        <ScrollView>
          <View>
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
                this.navigation.navigate('RegisterIntro', {
                  type: route && route.params && route.params.type,
                })
              }>
              <Text style={S.textLeftBtn}>창고 소개</Text>
              <View style={S.rightBtn}>
                {(route && route.params && route.params.type === 'ModifyWH') ||
                (dataWH && dataWH.name) ? (
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
                this.navigation.navigate('RegisterInfo', {
                  type: route && route.params && route.params.type,
                })
              }>
              <Text style={S.textLeftBtn}>
                {route && route.params && route.params.type === 'ModifyWH'
                  ? '창고 정보 수정'
                  : '창고 정보'}
              </Text>
              <View style={S.rightBtn}>
                {(route && route.params && route.params.type === 'ModifyWH') ||
                (dataWH && dataWH.keeps) ? (
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
                this.navigation.navigate('RegisterMoreIntro', {
                  type: route && route.params && route.params.type,
                })
              }>
              <Text style={S.textLeftBtn}>부가 정보</Text>
              <View style={S.rightBtn}>
                {(route && route.params && route.params.type === 'ModifyWH') ||
                (dataWH && dataWH.siteArea) ? (
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
                this.navigation.navigate('RegisterInfoFloor', {
                  type: route && route.params && route.params.type,
                })
              }>
              <Text style={S.textLeftBtn}>층별 상세 정보</Text>
              <View style={S.rightBtn}>
                {(route && route.params && route.params.type === 'ModifyWH') ||
                (dataWH && dataWH.floors) ? (
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
            {
              // <TouchableOpacity
              //   style={S.btnTypeRegister}
              //   onPress={() =>
              //     this.navigation.navigate('RegisterContractConditions', {
              //       type: route && route.params && route.params.type,
              //     })
              //   }>
              //   <Text style={S.textLeftBtn}>계약 조건</Text>
              //   <View style={S.rightBtn}>
              //     {workComplete === undefined ? (
              //       <Text style={S.textRightBtn}>입력하세요</Text>
              //     ) : (
              //       <Text style={S.completeText}>작업완료</Text>
              //     )}
              //     <Icon
              //       name="arrow-forward-ios"
              //       size={12}
              //       color="rgba(0, 0, 0, 0.54)"
              //     />
              //   </View>
              // </TouchableOpacity>
            }
          </View>
        </ScrollView>
        <View style={DefaultStyle.footerRegister}>
          <TouchableOpacity
            disabled={isSubmitUpdate === true ? false : true}
            style={[
              DefaultStyle.btnSubmit,
              isSubmitUpdate === true ? DefaultStyle.activeBtnSubmit : null,
            ]}
            onPress={() => {
              // this.showDialog();
              this.submit();
            }}>
            <Text
              style={[
                DefaultStyle.textSubmit,
                isSubmitUpdate === true ? DefaultStyle.textActiveSubmit : null,
              ]}>
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
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
    dataWH: state.registerWH,
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
