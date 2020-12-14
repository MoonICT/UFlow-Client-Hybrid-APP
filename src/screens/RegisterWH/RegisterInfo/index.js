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

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      isSwitchOn: false,
      value: 1,
      // listForm: dataForm,
      numberSlide: 0,
      formData: [
        {
          key: 0,
          storageType: '',
          settlementUnit: '',
          calculationStandard: '',
          exclusiveArea: '',
          exclusiveArea2: '',
          commonArea: '',
          commonArea2: '',
          rentalArea: '',
          rentalArea2: '',
          storagePeriod: '',
          storageUnitPrice: '',
          managementUnitCost: '',
          managementUnitCost2: '',
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
    console.log('::componentWillUnmount::');
  }

  _addForm = () => {
    let lengths = this.state.formData.length;
    let list = this.state.formData;
    list.push({
      key: lengths,
      storageType: '',
      settlementUnit: '',
      calculationStandard: '',
      exclusiveArea: '',
      exclusiveArea2: '',
      commonArea: '',
      commonArea2: '',
      rentalArea: '',
      rentalArea2: '',
      storagePeriod: '',
      storageUnitPrice: '',
      managementUnitCost: '',
      managementUnitCost2: '',
      remark: '',
    });
    this.setState({ formData: list });
  };
  _removeForm = () => console.log('_removeImage');

  onToggleSwitch = () => this.setState({ isSwitchOn: !this.state.isSwitchOn });

  _renderItem = ({ item }) => {
    return (
      <Form
        valueTab={this.state.value}
        number={this.state.numberSlide}
        key={item.key}
        formData={this.state.formData[this.state.numberSlide]}
        valueForm={e => {
          let index = this.state.formData.findIndex(
            el => el.key === this.state.numberSlide,
          );
          this.setState({
            ...(this.state.formData[index] = e),
          });
        }}
      />
    );
  };
  render() {
    const { imageStore, route } = this.props;
    const { value, listForm, numberSlide, formData } = this.state;
    // console.log('this.state.value', this.state.value);
    console.log('formData', this.state.formData);

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
              style={this.state.value === 1 ? SS.btnTabBar : null}
              onPress={() => this.setState({ value: 1 })}>
              <Text style={SS.textTabBar}>보관</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.value === 2 ? SS.btnTabBar : null}
              onPress={() => this.setState({ value: 2 })}>
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
                  onPress={() => this._addForm()}>
                  <Text style={DefaultStyle._textButton}>추가</Text>
                </TouchableOpacity>
                <IconButton
                  icon="delete"
                  color={'rgba(0, 0, 0, 0.54)'}
                  onPress={() => this._removeForm()}
                />
              </View>
            </View>
            <Carousel
              // style={styles.carousel}
              custom={{
                data: formData,
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
          </View>
          <View style={[DefaultStyle._bodyCard, DefaultStyle.footerRegister]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>
                가격 협의 가능<Text style={S.textNote}>*</Text>
              </Text>
              <View>
                <Switch
                  // thumbColor={color.primary.main}
                  value={this.state.isSwitchOn}
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
              onPress={() => this.navigation.navigate('RegisterWH')}
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
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
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
