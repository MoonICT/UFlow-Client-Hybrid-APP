/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  TextInput,
  Appbar,
  Text,
  Switch,
  IconButton,
} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Carousel from '@Components/organisms/Carousel';
import CarouselSnap from '@Components/organisms/CarouselSnap';
import illust10 from '@Assets/images/illust10.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Form from './form';
import FormTrusts from './formTrusts';
import { MyPage, Warehouse } from '@Services/apis';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      isSubmit: false,
      cnsltPossYn:
        props.dataInfo && props.dataInfo.cnsltPossYn
          ? props.dataInfo.cnsltPossYn
          : false,
      valueTab: 'keeps',
      // listForm: dataForm,
      numberSlide: 0,
      numberSlideTrusts: 0,
      keeps:
        props.dataInfo && props.dataInfo.keeps
          ? props.dataInfo.keeps
          : [
              // {
              //   typeCode: '',
              //   calUnitDvCode: '',
              //   calStdDvCode: '',
              //   mgmtChrgDvCode: '',
              //   // exclusiveArea2: '',
              //   commonArea: '',
              //   usblValue: '',
              //   // rentalArea: '',
              //   // rentalArea2: '',
              //   usblYmdFrom: '',
              //   usblYmdTo: '',
              //   splyAmount: '',
              //   mgmtChrg: '',
              //   remark: '',
              // },
            ],
      trusts:
        props.dataInfo && props.dataInfo.trusts
          ? props.dataInfo.trusts
          : [
              // {
              //   typeCode: '',
              //   calUnitDvCode: '',
              //   calStdDvCode: '',
              //   usblYmdFrom: '',
              //   usblYmdTo: '',
              //   splyAmount: '',
              //   usblValue: '',
              //   whinChrg: '',
              //   whoutChrg: '',
              //   psnChrg: '',
              //   mnfctChrg: '',
              //   dlvyChrg: '',
              //   shipChrg: '',
              //   remark: '',
              // },
            ],
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

  _addForm = valueTab => {
    let lengths =
      valueTab === 'trusts'
        ? this.state.trusts.length
        : this.state.keeps.length;
    let listKeeps = this.state.keeps;
    let listTrusts = this.state.trusts;
    valueTab === 'trusts'
      ? listTrusts.push({
          // key: lengths,
          // typeCode: '',
          calUnitDvCode: this.state.calUnitDvCodeTrusts[0]?.value,
          calStdDvCode:
            this.state.calStdDvCodeTrusts &&
            this.state.calStdDvCodeTrusts[0]?.value,
          usblYmdFrom: new Date().getTime(),
          usblYmdTo: new Date().getTime(),
          // splyAmount: '',
          // usblValue: '',
          // whinChrg: '',
          // whoutChrg: '',
          // psnChrg: '',
          // mnfctChrg: '',
          // dlvyChrg: '',
          // shipChrg: '',
          // remark: '',
        })
      : listKeeps.push({
          typeCode: this.state.typeCodes[0]?.value,
          calUnitDvCode: this.state.calUnitDvCodeKeeps[1]?.value,
          calStdDvCode: this.state.calStdDvCodeKeeps[0]?.value,
          mgmtChrgDvCodes:
            this.state.mgmtChrgDvCodesKeep &&
            this.state.mgmtChrgDvCodesKeep[0]?.value,
          // commonArea: '',
          // usblValue: '',
          usblYmdFrom: new Date().getTime(),
          usblYmdTo: new Date().getTime(),
          // splyAmount: '',
          // mgmtChrg: '',
          // remark: '',
        });
    this.setState({
      keeps: listKeeps,
      trusts: listTrusts,
    });
    setTimeout(() => {
      if (valueTab === 'keeps') {
        this.goToSlider(listKeeps.length - 1);
        this.setState({ numberSlide: listKeeps.length - 1 });
      } else if (valueTab === 'trusts') {
        this.goToSlider(listTrusts.length - 1);
        this.setState({ numberSlideTrusts: listTrusts.length - 1 });
      }
    }, 500);
  };
  _removeForm = valueTab => {
    let listKeeps = this.state.keeps;
    let listTrusts = this.state.trusts;
    let numberSlideKeep = this.state.numberSlide;
    let slideKeepStart =
      this.state.numberSlide > 0 ? this.state.numberSlide - 1 : 0;
    let slideTrustStart =
      this.state.numberSlideTrusts > 0 ? this.state.numberSlideTrusts - 1 : 0;
    let numberSlideTrusts = this.state.numberSlideTrusts;
    let filterKeep =
      listKeeps &&
      listKeeps.filter(item => item !== listKeeps[numberSlideKeep]);
    let filterTrust =
      listTrusts &&
      listTrusts.filter(item => item !== listTrusts[numberSlideTrusts]);

    setTimeout(() => {
      if (valueTab === 'keeps') {
        this.goToSlider(slideKeepStart);
        this.setState({
          keeps: filterKeep,
          numberSlide: slideKeepStart,
        });
      } else if (valueTab === 'trusts') {
        this.goToSlider(slideTrustStart);
        this.setState({
          trusts: filterTrust,
          numberSlideTrusts: slideTrustStart,
        });
      }
    }, 500);
  };
  onToggleSwitch = () =>
    this.setState({ cnsltPossYn: !this.state.cnsltPossYn });
  _renderPagination;
  _renderItem = ({ item }) => {
    let dataKeep = this.state.keeps;
    return (
      <Form
        mgmtChrgDvCodes={this.state.mgmtChrgDvCodesKeep}
        typeCodes={this.state.typeCodes}
        calUnitDvCodes={this.state.calUnitDvCodeKeeps}
        calStdDvCodes={this.state.calStdDvCodeKeeps}
        valueTab={this.state.valueTab}
        number={this.state.numberSlide}
        key={item.key}
        formData={dataKeep[this.state.numberSlide]}
        dataKeep={dataKeep}
        valueForm={e => {
          let index = this.state.numberSlide;
          this.setState({
            ...(this.state.keeps[index] = e),
          });
          // console.log('dataForm===>', e);
        }}
      />
    );
  };
  _renderItemTrusts = ({ item }) => {
    return (
      <FormTrusts
        typeCodes={this.state.typeCodes}
        calUnitDvCodes={this.state.calUnitDvCodeTrusts}
        calStdDvCodes={this.state.calStdDvCodeTrusts}
        valueTab={this.state.valueTab}
        number={this.state.numberSlideTrusts}
        key={item.key}
        formData={this.state.trusts[this.state.numberSlideTrusts]}
        valueForm={e => {
          let index = this.state.numberSlideTrusts;
          this.setState({
            ...(this.state.trusts[index] = e),
          });
        }}
      />
    );
  };
  goToSlider = index => {
    // console.log(index, 'goToSlider');
    if (this.slider) this.slider.goTo(index);
  };

  render() {
    const { imageStore, route, dataInfo } = this.props;
    const {
      valueTab,
      keeps,
      trusts,
    } = this.state;
    // console.log('dataInfo :>> ', dataInfo);
    // console.log('keeps ====:>> ', keeps);

    // TODO 확인버튼은 수탁과 보관의 모든것의 필수값이 입력된 경우만 true
    let isSubmitUpdate = false;
    // console.log('keeps', keeps);
    // console.log('numberSlide', numberSlide);
    // let filterArea = keeps && keeps.filter(item => item.cmnArea === '');
    let filterusblValue = keeps && keeps.filter(item => item.usblValue === '');
    let filtersplyAmount =
      keeps &&
      keeps.filter(
        item => item.splyAmount === '' || item.splyAmount === undefined,
      );
    let filtermgmtChrg =
      keeps &&
      keeps.filter(item => item.mgmtChrg === '' || item.mgmtChrg === undefined);

    let filterusblValueTrust =
      trusts &&
      trusts.filter(
        item => item.usblValue === '' || item.usblValue === undefined,
      );
    let filtersplyAmountTrust =
      trusts &&
      trusts.filter(
        item => item.splyAmount === '' || item.splyAmount === undefined,
      );
    let filterwhinChrgTrust =
      trusts &&
      trusts.filter(
        item => item.whinChrg === '' || item.whinChrg === undefined,
      );
    let filterwhoutChrgTrust =
      trusts &&
      trusts.filter(
        item => item.whoutChrg === '' || item.whoutChrg === undefined,
      );
    // let filterpsnChrgTrust =
    //   trusts && trusts.filter(item => item.psnChrg === '');
    // let filtermnfctChrgTrust =
    //   trusts && trusts.filter(item => item.mnfctChrg === '');
    // let filterdlvyChrgTrust =
    //   trusts && trusts.filter(item => item.dlvyChrg === '');
    // let filtershipChrgTrust =
    //   trusts && trusts.filter(item => item.shipChrg === '');
    if (
      // filterArea.length === 0 &&
      // filterusblValue.length === 0 &&
      (keeps.length > 0 &&
        filtersplyAmount.length === 0 &&
        filtermgmtChrg.length === 0) ||
      (trusts.length > 0 &&
        filterusblValueTrust.length === 0 &&
        filtersplyAmountTrust.length === 0 &&
        filterwhinChrgTrust.length === 0 &&
        filterwhoutChrgTrust.length === 0)
    ) {
      isSubmitUpdate = true;
    }

    console.log('isSubmitUpdate', isSubmitUpdate);
    return (
      <SafeAreaView style={DefaultStyle._container}>
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
                : '창고 정보'
            }
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={[DefaultStyle.backgroundGray]}>
          <View style={{ backgroundColor: '#ffffff', paddingBottom: 100 }}>
            <View style={SS.tabBar}>
              <TouchableOpacity
                style={this.state.valueTab === 'keeps' ? SS.btnTabBar : null}
                onPress={() => this.setState({ valueTab: 'keeps' })}>
                <Text style={SS.textTabBar}>임대</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={this.state.valueTab === 'trusts' ? SS.btnTabBar : null}
                onPress={() => this.setState({ valueTab: 'trusts' })}>
                <Text style={SS.textTabBar}>수탁</Text>
              </TouchableOpacity>
            </View>
            <View style={DefaultStyle._cards}>
              <View
                style={[
                  DefaultStyle._titleCard,
                  {
                    marginBottom:
                      valueTab === 'keeps' && (!keeps || keeps.length === 0)
                        ? 60
                        : valueTab === 'trusts' &&
                          (!trusts || trusts.length === 0)
                        ? 60
                        : 16,
                  },
                ]}>
                <Text style={DefaultStyle._textTitleCard}>
                  {route && route.params && route.params.type === 'ModifyWH'
                    ? `임대유형 상세정보`
                    : `임대유형 상세정보`}
                  {valueTab === 'keeps' && this.state.keeps.length > 0 && (
                    <Text style={{ color: '#777777' }}>
                      {' '}
                      ({this.state.numberSlide + 1}/{this.state.keeps.length})
                    </Text>
                  )}
                  {valueTab === 'trusts' && this.state.trusts.length > 0 && (
                    <Text style={{ color: '#777777' }}>
                      {' '}
                      ({this.state.numberSlideTrusts + 1}/
                      {this.state.trusts.length})
                    </Text>
                  )}
                  <Text style={S.textNote}>*</Text>
                </Text>
                <View style={DefaultStyle._titleBody}>
                  <TouchableOpacity
                    style={S.btnAdd}
                    onPress={() => this._addForm(valueTab)}>
                    <Text style={DefaultStyle._textButton}>추가</Text>
                  </TouchableOpacity>
                  <IconButton
                    icon="delete"
                    color={'rgba(0, 0, 0, 0.54)'}
                    onPress={() => this._removeForm(valueTab)}
                  />
                </View>
              </View>
              {valueTab === 'keeps' ? (
                <Carousel
                  // style={styles.carousel}
                  custom={{
                    data: keeps,
                    renderPagination: this._renderPagination,
                    renderItem: this._renderItem,
                    showNextButton: false,
                    showDoneButton: false,
                    onSlideChange: e => {
                      this.setState({ numberSlide: e });
                    },
                    dotStyle: {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      width: 8,
                      height: 8,
                      marginTop: 100,
                    },
                    activeDotStyle: {
                      backgroundColor: 'rgba(0, 0, 0, 0.54)',
                      width: 8,
                      height: 8,
                      marginTop: 100,
                    },
                  }}
                  ref={ref => (this.slider = ref)}
                />
              ) : (
                <Carousel
                  // style={styles.carousel}
                  custom={{
                    data: trusts,
                    renderItem: this._renderItemTrusts,
                    showNextButton: false,
                    showDoneButton: false,
                    onSlideChange: e => {
                      this.setState({ numberSlideTrusts: e });
                    },
                    dotStyle: {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      width: 8,
                      height: 8,
                      marginTop: 100,
                    },
                    activeDotStyle: {
                      backgroundColor: 'rgba(0, 0, 0, 0.54)',
                      width: 8,
                      height: 8,
                      marginTop: 100,
                    },
                  }}
                  ref={ref => (this.slider = ref)}
                />
              )}
            </View>
            <View style={[DefaultStyle._bodyCard, DefaultStyle.footerRegister]}>
              {/*<View style={DefaultStyle._titleCard}>*/}
              {/*<Text style={DefaultStyle._textTitleCard}>*/}
              {/*가격 협의 가능<Text style={S.textNote}>*</Text>*/}
              {/*</Text>*/}
              {/*<View>*/}
              {/*<Switch*/}
              {/*// thumbColor={color.primary.main}*/}
              {/*value={this.state.cnsltPossYn}*/}
              {/*onValueChange={this.onToggleSwitch}*/}
              {/*/>*/}
              {/*</View>*/}
              {/*</View>*/}
              {/*<View style={SS.textsFooter}>*/}
              {/*<Text style={SS.textFooter}>*/}
              {/*가격 협의 가능 선택 시 임차인이 견적 요청*/}
              {/*</Text>*/}
              {/*<Text style={SS.textFooter}>할 때 가격 협의가 가능합니다.</Text>*/}
              {/*</View>*/}

              {
                // ((valueTab === 'keeps' && (keeps && keeps.length > 0)) ||
                // (valueTab === 'trusts' && (trusts && trusts.length > 0))) &&
                <TouchableOpacity
                  // disabled={isSubmitUpdate === true ? false : true}
                  onPress={() =>
                    isSubmitUpdate === true
                      ? (this.navigation.navigate('RegisterWH', {
                          completeInfo: true,
                        }),
                        this.props.updateInfo({
                          cnsltPossYn: this.state.cnsltPossYn,
                          keeps: this.state.keeps,
                          trusts: this.state.trusts,
                        }),
                        AsyncStorage.setItem(
                          'DATAKEEP',
                          JSON.stringify(this.state.keeps),
                          // JSON.stringify(this.state.trusts),
                          // JSON.stringify(this.state.cnsltPossYn)
                        ),
                        AsyncStorage.setItem(
                          'DATATRUST',
                          JSON.stringify(this.state.trusts),
                        ))
                      : this.props.showPopup({
                          type: 'confirm',
                          content: '필수정보를 입력해야 합니다.',
                          image: illust10,
                        })
                  }
                  style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
                  // disabled={imageStore.length > 2 ? false : true}
                >
                  <Text
                    style={[
                      DefaultStyle.textSubmit,
                      DefaultStyle.textActiveSubmit,
                    ]}>
                    확인
                  </Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    let getDataKeep = await AsyncStorage.getItem('DATAKEEP');
    let getDataTrust = await AsyncStorage.getItem('DATATRUST');
    let parseDataKeep = JSON.parse(getDataKeep);
    let parseDataTrust = JSON.parse(getDataTrust);
    let type = this.props.route.params && this.props.route.params.typeEdit;
    if (type === 'Edit') {
      this.props.updateInfo({ keeps: parseDataKeep,trusts: parseDataTrust });
    } else {
      AsyncStorage.removeItem('DATAKEEP');
      AsyncStorage.removeItem('DATATRUST');
    }
    await MyPage.getDetailCodes('WHRG0001')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;
          let typeCodes =
            data &&
            data.map((item, index) => {
              return {
                label: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ typeCodes });
        }
      })
      .catch(err => {
        console.log('errINFO', err);
      });

    // await MyPage.getDetailCodes('WHRG0013')
    //   .then(res => {
    //     if (res.status === 200) {
    //       let data = res.data._embedded.detailCodes;
    //       let calUnitDvCodes =
    //         data &&
    //         data.map((item, index) => {
    //           return {
    //             label: item.stdDetailCodeName,
    //             value: item.stdDetailCode,
    //           };
    //         });
    //       this.setState({ calUnitDvCodes });
    //     }
    //   })
    //   .catch(err => {
    //     console.log('errCalUnitDvCode', err);
    //   });

    await Warehouse.listCalUnitDvCodeKeep()
      .then(res => {
        let data = res._embedded.detailCodes;
        let calUnitDvCodes =
          data &&
          data.map((item, index) => {
            return {
              label: item.stdDetailCodeName,
              value: item.stdDetailCode,
            };
          });
        console.log(calUnitDvCodes, 'calUnitDvCodes Keep');
        this.setState({ calUnitDvCodeKeeps: calUnitDvCodes });
      })
      .catch(err => {
        console.log('errCalUnitDvCode', err);
      });

    await Warehouse.listCalUnitDvCodeTrust()
      .then(res => {
        let data = res._embedded.detailCodes;
        let calUnitDvCodes =
          data &&
          data.map((item, index) => {
            return {
              label: item.stdDetailCodeName,
              value: item.stdDetailCode,
            };
          });
        console.log(calUnitDvCodes, 'calUnitDvCodes Trust');
        this.setState({ calUnitDvCodeTrusts: calUnitDvCodes });
      })
      .catch(err => {
        console.log('errCalUnitDvCode', err);
      });

    // await MyPage.getDetailCodes('WHRG0014')
    //   .then(res => {
    //     if (res.status === 200) {
    //       let data = res.data._embedded.detailCodes;
    //       let calStdDvCodes =
    //         data &&
    //         data.map((item, index) => {
    //           return {
    //             label: item.stdDetailCodeName,
    //             value: item.stdDetailCode,
    //           };
    //         });
    //       this.setState({ calStdDvCodes });
    //     }
    //   })
    //   .catch(err => {
    //     console.log('errCalStdDvCode', err);
    //   });

    await Warehouse.listCalStdDvCodeKeep()
      .then(res => {
        let data = res._embedded.detailCodes;
        let calStdDvCodes =
          data &&
          data.map((item, index) => {
            console.log(item, 'items');
            return {
              label: item.stdDetailCodeName,
              value: item.stdDetailCode,
            };
          });
        console.log(calStdDvCodes, 'calStdDvCodes Keep');
        this.setState({ calStdDvCodeKeeps: calStdDvCodes });
      })
      .catch(err => {
        console.log('errCalUnitDvCode', err);
      });
    await Warehouse.listCalStdDvCodeTrust()
      .then(res => {
        let data = res._embedded.detailCodes;
        let calStdDvCodes =
          data &&
          data.map((item, index) => {
            return {
              label: item.stdDetailCodeName,
              value: item.stdDetailCode,
            };
          });
        console.log(calStdDvCodes, 'calStdDvCodes Trust');
        this.setState({ calStdDvCodeTrusts: calStdDvCodes });
      })
      .catch(err => {
        console.log('errCalUnitDvCode', err);
      });
    await MyPage.getDetailCodes('WHRG0012')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;
          let mgmtChrgDvCodesData =
            data &&
            data.map((item, index) => {
              return {
                label: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ mgmtChrgDvCodesKeep: mgmtChrgDvCodesData });
        }
      })
      .catch(err => {
        console.log('errINFO', err);
      });
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    // console.log('::prevState::', prevState);
    // console.log('::state::', this.state);
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
    dataInfo: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },

    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterInfo);
