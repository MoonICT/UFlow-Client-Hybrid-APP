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
  Checkbox,
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
import { styles as S } from '../style';
import { styles as SS } from './style';
import Form from './form';
import FormTrusts from './formTrusts';
import { MyPage } from '@Services/apis';

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
              {
                // key: 0,
                typeCode: '0001',
                calUnitDvCode: 'CU01',
                calStdDvCode: 'CS01',
                // exclusiveArea: '',
                // exclusiveArea2: '',
                commonArea: '',
                // rentalArea: '',
                // rentalArea2: '',
                usblYmdFrom: '',
                usblYmdTo: '',
                splyAmount: '',
                mgmtChrg: '',
                remark: '',
              },
            ],
      trusts:
        props.dataInfo && props.dataInfo.trusts
          ? props.dataInfo.trusts
          : [
              {
                typeCode: '0001',
                calUnitDvCode: 'CU01',
                calStdDvCode: 'CS01',
                usblYmdFrom: '',
                usblYmdTo: '',
                splyAmount: '',
                usblValue: '',
                whinChrg: '',
                whoutChrg: '',
                psnChrg: '',
                mnfctChrg: '',
                dlvyChrg: '',
                shipChrg: '',
                remark: '',
              },
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
          typeCode: '0001',
          calUnitDvCode: 'CU01',
          calStdDvCode: 'CS01',
          usblYmdFrom: '',
          usblYmdTo: '',
          splyAmount: '',
          usblValue: '',
          whinChrg: '',
          whoutChrg: '',
          psnChrg: '',
          mnfctChrg: '',
          dlvyChrg: '',
          shipChrg: '',
          remark: '',
        })
      : listKeeps.push({
          // key: lengths,
          typeCode: '0001',
          calUnitDvCode: 'CU01',
          calStdDvCode: 'CS01',
          mgmtChrgDvCode: '0001',
          // exclusiveArea2: '',
          commonArea: '',
          usblValue: '',
          // rentalArea: '',
          // rentalArea2: '',
          usblYmdFrom: '',
          usblYmdTo: '',
          splyAmount: '',
          mgmtChrg: '',
          remark: '',
        });
    this.setState({ keeps: listKeeps, trusts: listTrusts });
  };
  _removeForm = valueTab => {
    let listKeeps = this.state.keeps;
    let listTrusts = this.state.trusts;
    let numberSlideKeep = this.state.numberSlide;
    let numberSlideTrusts = this.state.numberSlideTrusts;
    let filterKeep =
      listKeeps &&
      listKeeps.filter(item => item !== listKeeps[numberSlideKeep]);
    let filterTrust =
      listTrusts &&
      listTrusts.filter(item => item !== listTrusts[numberSlideTrusts]);
    console.log('filter', filterKeep);
    valueTab === 'trusts'
      ? this.setState({ trusts: filterTrust })
      : this.setState({ keeps: filterKeep });
    // console.log('valueTab :>> ', valueTab);
    // console.log('listKeeps', listKeeps);
  };
  onToggleSwitch = () =>
    this.setState({ cnsltPossYn: !this.state.cnsltPossYn });

  _renderItem = ({ item }) => {
    return (
      <Form
        managementFees={this.state.managementFees}
        valueTab={this.state.valueTab}
        number={this.state.numberSlide}
        key={item.key}
        formData={this.state.keeps[this.state.numberSlide]}
        valueForm={e => {
          let index = this.state.numberSlide;
          this.setState({
            ...(this.state.keeps[index] = e),
          });
          console.log('dataForm===>', e);
        }}
      />
    );
  };
  _renderItemTrusts = ({ item }) => {
    return (
      <FormTrusts
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
  render() {
    const { imageStore, route, dataInfo } = this.props;
    const {
      valueTab,
      numberSlide,
      numberSlideTrusts,
      keeps,
      trusts,
      isSubmit,
    } = this.state;
    console.log('dataInfo :>> ', dataInfo);
    let isSubmitUpdate = false;
    console.log('keeps', keeps);
    console.log('trusts', trusts);
    let filterArea = keeps && keeps.filter(item => item.cmnArea === '');
    let filterusblValue = keeps && keeps.filter(item => item.usblValue === '');
    let filtersplyAmount =
      keeps && keeps.filter(item => item.splyAmount === '');
    let filtermgmtChrg = keeps && keeps.filter(item => item.mgmtChrg === '');

    let filterusblValueTrust =
      trusts && trusts.filter(item => item.usblValue === '');
    let filtersplyAmountTrust =
      trusts && trusts.filter(item => item.splyAmount === '');
    let filterwhinChrgTrust =
      trusts && trusts.filter(item => item.whinChrg === '');
    let filterwhoutChrgTrust =
      trusts && trusts.filter(item => item.whoutChrg === '');
    let filterpsnChrgTrust =
      trusts && trusts.filter(item => item.psnChrg === '');
    let filtermnfctChrgTrust =
      trusts && trusts.filter(item => item.mnfctChrg === '');
    let filterdlvyChrgTrust =
      trusts && trusts.filter(item => item.dlvyChrg === '');
    let filtershipChrgTrust =
      trusts && trusts.filter(item => item.shipChrg === '');

    if (
      (filterArea.length === 0 &&
        filterusblValue.length === 0 &&
        filtersplyAmount.length === 0 &&
        filtermgmtChrg.length === 0) ||
      (filterusblValueTrust.length === 0 &&
        filtersplyAmountTrust.length === 0 &&
        filterwhinChrgTrust.length === 0 &&
        filterwhoutChrgTrust.length === 0 &&
        filterpsnChrgTrust.length === 0 &&
        filtermnfctChrgTrust.length === 0 &&
        filterdlvyChrgTrust.length === 0 &&
        filtershipChrgTrust.length === 0)
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
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={SS.tabBar}>
            <TouchableOpacity
              style={this.state.valueTab === 'keeps' ? SS.btnTabBar : null}
              onPress={() => this.setState({ valueTab: 'keeps' })}>
              <Text style={SS.textTabBar}>보관</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.valueTab === 'trusts' ? SS.btnTabBar : null}
              onPress={() => this.setState({ valueTab: 'trusts' })}>
              <Text style={SS.textTabBar}>수탁</Text>
            </TouchableOpacity>
          </View>
          <View style={DefaultStyle._cards}>
            <View style={[DefaultStyle._titleCard, { marginBottom: 12 }]}>
              <Text style={DefaultStyle._textTitleCard}>
                {route && route.params && route.params.type === 'ModifyWH'
                  ? '보관유형 상세정보'
                  : '임대유형 상세정보'}
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
              />
            )}
          </View>
          <View style={[DefaultStyle._bodyCard, DefaultStyle.footerRegister]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>
                가격 협의 가능<Text style={S.textNote}>*</Text>
              </Text>
              <View>
                <Switch
                  // thumbColor={color.primary.main}
                  value={this.state.cnsltPossYn}
                  onValueChange={this.onToggleSwitch}
                />
              </View>
            </View>
            <View style={SS.textsFooter}>
              <Text style={SS.textFooter}>
                가격 협의 가능 선택 시 임차인이 견적 요청
              </Text>
              <Text style={SS.textFooter}>할 때 가격 협의가 가능합니다.</Text>
            </View>
            <TouchableOpacity
              disabled={isSubmitUpdate === true ? false : true}
              onPress={() => {
                this.navigation.navigate('RegisterWH', {
                  completeInfo: true,
                });
                this.props.updateInfo({
                  cnsltPossYn: this.state.cnsltPossYn,
                  keeps: this.state.keeps,
                  trusts: this.state.trusts,
                });
              }}
              style={[
                DefaultStyle.btnSubmit,
                isSubmitUpdate === true ? DefaultStyle.activeBtnSubmit : null,
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  isSubmitUpdate === true
                    ? DefaultStyle.textActiveSubmit
                    : null,
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    await MyPage.getDetailCode('WHRG0012')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;

          let managementFees =
            data &&
            data.map((item, index) => {
              return {
                type: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ managementFees });
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

    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterInfo);
