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
import Appbars from '../../../components/organisms/AppBar';
import ActionCreator from '../../../actions';
import Carousel from '@Components/organisms/Carousel';
import CarouselSnap from '@Components/organisms/CarouselSnap';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Form from './form';
class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { isSwitchOn: false, value: 1 };

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

  _addImage = () => console.log('_addImage');
  _removeImage = () => console.log('_removeImage');

  onToggleSwitch = () => this.setState({ isSwitchOn: !this.state.isSwitchOn });

  render() {
    const { imageStore, route } = this.props;
    const { value } = this.state;
    // console.log('this.state.value', this.state.value);
    console.log('route', route);
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
                : '창고 정보'
            }
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={S.containerRegister}>
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
          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>
                {route && route.params && route.params.type === 'ModifyWH'
                  ? '보관유형 상세정보'
                  : '임대유형 상세정보'}
                <Text style={S.textNote}>*</Text>
              </Text>
              <View style={S.rightTitle}>
                <TouchableOpacity
                  style={S.btnAdd}
                  onPress={() => console.log('add')}>
                  <Text style={S.textAdd}>추가</Text>
                </TouchableOpacity>
                <IconButton
                  style={S.btnIcon}
                  icon="delete"
                  color={'rgba(0, 0, 0, 0.54)'}
                  onPress={() => console.log('remove')}
                />
              </View>
            </View>
            <Form valueTab={value} />
          </View>
          <View style={S.footerRegister}>
            <View style={[S.titleBody, S.titleFooter]}>
              <Text style={[S.textTitleBody, S.textFooter]}>
                가격 협의 가능<Text style={S.textNote}>*</Text>
              </Text>
              <View style={S.rightTitle}>
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
                S.btnSubmit,
                imageStore.length > 2 ? S.activeBtnSubmit : null,
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  S.textSubmit,
                  imageStore.length > 2 ? S.textActiveSubmit : null,
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
