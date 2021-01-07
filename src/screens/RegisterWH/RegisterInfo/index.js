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

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
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
          // exclusiveArea: '',
          // exclusiveArea2: '',
          commonArea: '',
          // commonArea2: '',
          // rentalArea: '',
          // rentalArea2: '',
          usblYmdFrom: '',
          usblYmdTo: '',
          splyAmount: '',
          mgmtChrg: '',
          remark: '',
        })
      : listKeeps.push({
          // key: lengths,
          typeCode: '0001',
          calUnitDvCode: 'CU01',
          calStdDvCode: 'CS01',
          // exclusiveArea: '',
          // exclusiveArea2: '',
          commonArea: '',
          // commonArea2: '',
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
    console.log('valueTab :>> ', valueTab);
    console.log('listKeeps', listKeeps);
  };
  onToggleSwitch = () =>
    this.setState({ cnsltPossYn: !this.state.cnsltPossYn });

  _renderItem = ({ item }) => {
    return (
      <Form
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
    const { valueTab, listForm, keeps, trusts } = this.state;
    // console.log('this.state.value', this.state.value);
    // console.log('keeps', keeps);
    // console.log('trusts', trusts);
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
              onPress={() => {
                this.navigation.navigate('RegisterWH');
                this.props.updateInfo({
                  cnsltPossYn: this.state.cnsltPossYn,
                  keeps: this.state.keeps,
                  trusts: this.state.trusts,
                });
              }}
              style={[
                DefaultStyle.btnSubmit,
                imageStore.length > 2 ? DefaultStyle.activeBtnSubmit : null,
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  imageStore.length > 2 ? DefaultStyle.textActiveSubmit : null,
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
