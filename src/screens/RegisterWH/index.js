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
import ActionCreator from '@Actions';
import illust10 from '@Assets/images/illust10.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Warehouse } from '@Services/apis';

class RegisterWH extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;

    this.doubleSubmitFlag = false;
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  doubleSubmitCheck = () => {
    if (this.doubleSubmitFlag) {
      return this.doubleSubmitFlag;
    } else {
      this.doubleSubmitFlag = true;
      return false;
    }
  };

  submit = () => {
    if (this.doubleSubmitCheck()) return;

    let type = this.props.route.params && this.props.route.params.type;
    let warehouseRegNo =
      this.props.route.params && this.props.route.params.warehouseRegNo;
    // Progress
    this.props.setProgress({ is: true, type: 'CIRCLE' });
    if (type === 'ModifyWH') {
      console.log('수정 데이터 ::: ', this.props.dataWH)
      Warehouse.updateWH({ data: this.props.dataWH, url: warehouseRegNo })
        .then(res => {
          const status = res.status;
          if (status === 200) {
            // this.navigation.navigate('Home');
            this.props.showPopup({
              type: 'confirm',
              title: '수정 완료',
              content: '창고정보 수정을 완료했습니다.',
              image: illust10,
              navigation: () => {
                if (this.props.route.params && this.props.route.params.doRefresh) {
                  this.props.route.params.doRefresh()
                }
                this.navigation.navigate('Mypage', {
                  title: '내 창고',
                  prevView: 'PrevView',
                })
              }
            });

            this.doubleSubmitFlag = false;
          }

          // Progress
          setTimeout(() => {
            this.props.setProgress({ is: false });
          }, 300);
        })
        .catch(err => {
          // alert('Update err', err);
          console.log('err', err.response);
          this.props.setProgress({ is: false });
        });
    } else {

      const { dataWH } = this.props;

      if (!dataWH) {
        alert('창고등록 정보값이 없습니다.');
      }

      Warehouse.registerWH(this.props.dataWH)
        .then(res => {
          const status = res.status;

          if (status === 200) {
            console.log('res :>> ', res);
            console.log('this.props.dataWH :>> ', this.props.dataWH);
            // this.navigation.navigate('Home');
            this.props.showPopup({
              type: 'confirm',
              title: '창고 등록 완료',
              content:
                ' UFLOW 관리자가 입력하신 정보를 확인하기 위해 연락을 드릴 예정입니다. 자세한 내용은 [마이페이지 > 내 창고]에서 확인해주세요',
              image: illust10,
              navigation: () =>
                this.navigation.navigate('Mypage', {
                  title: '내 창고',
                  prevView: 'PrevView',
                }),
            });
            this.doubleSubmitFlag = false;
            // this.navigation.navigate('Mypage', {
            //   title: '내 창고',
            // });
          }

          // Progress
          setTimeout(() => {
            this.props.setProgress({ is: false });
          }, 300);
        })
        .catch(err => {
          // alert('Register err', err);
          console.log('err', err);
          this.props.setProgress({ is: false });
        });
    }
  };

  render () {
    const { imageStore, workComplete, route, dataWH } = this.props;
    let completeMoreInfo = route.params && route.params.completeMoreInfo;
    let completeInfo = route.params && route.params.completeInfo;
    let completeFloor = route.params && route.params.completeFloor;
    let completeIntro = route.params && route.params.completeIntro;
    console.log('dataWHAll', dataWH);
    console.log('imageStore', imageStore);
    let isSubmitUpdate = false;

    if (
      dataWH.name !== '' &&
      dataWH.description !== '' &&
      route &&
      route.params &&
      route.params.type === 'ModifyWH'
    ) {
      completeIntro = true;
    }
    if (dataWH.name !== '' && dataWH.description !== '') {
      completeMoreInfo = true;
    }
    if (
      // imageStore.length > 0 &&
    // completeMoreInfo === true &&
    // completeInfo === true &&
    // completeFloor === true &&
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
          <View style={[]}>
            <TouchableOpacity
              style={S.imageRegister}
              onPress={() => this.navigation.navigate('RegisterImage')}>
              {imageStore && imageStore.length > 0 ? (
                <Fragment>
                  <Text style={[DefaultStyle._titleWH, S.textRepresentative]}>
                    대표이미지
                  </Text>
                  <Image
                    style={S.ImageUpload}
                    source={{ uri: imageStore[0].url }}
                  />
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
                {//   (route && route.params && route.params.type === 'ModifyWH') ||
                  // (dataWH && dataWH.name)
                  completeIntro === true ? (
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
              <Text style={S.textLeftBtn}>추가 정보</Text>
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
              {route && route.params && route.params.type === 'ModifyWH'
                ? '창고 수정하기'
                : '창고 등록하기'}
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
  async componentDidMount () {
    let warehouseRegNo =
      this.props.route.params && this.props.route.params.warehouseRegNo;
    let entrpNo = this.props.route.params && this.props.route.params.entrpNo;
    this.props.removeData();
    this.props.updateInfo({ entrpNo });
    console.log('warehouseRegNo :>> ', warehouseRegNo);
    if (warehouseRegNo) {
      await Warehouse.detailWH(warehouseRegNo)
        .then(res => {
          console.log('resDetailWH', res);
          if (res.status === 200) {
            let dataWH = res.data;
            let entrpNo = dataWH.relativeEntrp && dataWH.relativeEntrp.entrpNo;
            let floors =
              dataWH.floors.length > 0
                ? dataWH.floors.map((item, index) => {
                  item.seq = dataWH.floors[index].id.seq;
                  item.flrDvCode =
                    dataWH.floors[index].flrDvCode &&
                    dataWH.floors[index].flrDvCode.stdDetailCode;
                  item.aprchMthdDvCode =
                    dataWH.floors[index].aprchMthdDvCode &&
                    dataWH.floors[index].aprchMthdDvCode.stdDetailCode;
                  return item;
                })
                : [];
            let keeps =
              dataWH.keeps.length > 0
                ? dataWH.keeps.map((item, index) => {
                  item.seq = dataWH.keeps[index].id.seq;
                  item.typeCode =
                    dataWH.keeps[index].typeCode &&
                    dataWH.keeps[index].typeCode.stdDetailCode;
                  item.calUnitDvCode =
                    dataWH.keeps[index].calUnitDvCode &&
                    dataWH.keeps[index].calUnitDvCode.stdDetailCode;
                  item.calStdDvCode =
                    dataWH.keeps[index].calStdDvCode &&
                    dataWH.keeps[index].calStdDvCode.stdDetailCode;
                  item.mgmtChrgDvCode =
                    dataWH.keeps[index].mgmtChrgDvCode &&
                    dataWH.keeps[index].mgmtChrgDvCode.stdDetailCode;
                  return item;
                })
                : [];
            let trusts =
              dataWH.trusts.length > 0
                ? dataWH.trusts.map((item, index) => {
                  item.seq = dataWH.trusts[index].id.seq;
                  item.typeCode =
                    dataWH.trusts[index].typeCode &&
                    dataWH.trusts[index].typeCode.stdDetailCode;
                  item.calUnitDvCode =
                    dataWH.trusts[index].calUnitDvCode &&
                    dataWH.trusts[index].calUnitDvCode.stdDetailCode;
                  item.calStdDvCode =
                    dataWH.trusts[index].calStdDvCode &&
                    dataWH.trusts[index].calStdDvCode.stdDetailCode;
                  return item;
                })
                : [];
            let insrDvCodes =
              dataWH.insrDvCodes.length > 0
                ? dataWH.insrDvCodes.map((item, index) => {
                  item = dataWH.insrDvCodes[index].stdDetailCode
                    ? dataWH.insrDvCodes[index].stdDetailCode
                    : '';
                  return item;
                })
                : [];
            let addOptDvCodes =
              dataWH.addOptDvCodes.length > 0
                ? dataWH.addOptDvCodes.map((item, index) => {
                  item = dataWH.addOptDvCodes[index].stdDetailCode
                    ? dataWH.addOptDvCodes[index].stdDetailCode
                    : '';
                  return item;
                })
                : [];
            // this.setState({ dataWH });

            this.props.updateInfo({
              // ...dataWH,
              id: dataWH.id,
              name: dataWH.name,
              description: dataWH.description,
              telNo: dataWH.telNo,
              address: dataWH.address,
              roadAddr: dataWH.roadAddr,
              gps: dataWH.gps,
              cmpltYmd: dataWH.cmpltYmd,
              bldgArea: dataWH.bldgArea,
              siteArea: dataWH.siteArea,
              totalArea: dataWH.totalArea,
              prvtArea: dataWH.prvtArea,
              cmnArea: dataWH.cmnArea,
              addOptDvCodes,
              insrDvCodes,
              cnsltPossYn: dataWH.cnsltPossYn,
              sttsDbCode: dataWH.sttsDbCode,
              vrfctFailReason: dataWH.vrfctFailReason,
              pnImages: dataWH.pnImages,
              whImages: dataWH.whImages,
              thImages: dataWH.thImages,
              floors,
              keeps,
              trusts,
              entrpNo,
            });
          }
        })
        .catch(err => {
          console.log('errRegisterWH', err);
        });
    }

    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.whImages,
    workComplete: state.registerWH.workComplete,
    dataWH: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
    },
    removeData: action => {
      dispatch(ActionCreator.removeData(action));
    },
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterWH);
