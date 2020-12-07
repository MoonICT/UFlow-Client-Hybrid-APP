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
  Card,
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
import ActionCreator from '../../../actions';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../style';
import { styles as SS } from './style';
// import Form from './form';
class RegisterMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checked: false,
      checkMedicine: false,
      checkDanger: false,
      checkBuilding: false,
      checkInventory: false,
      checkCompensation: false,
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

  render() {
    const { imageStore, route } = this.props;
    const {
      checked,
      checkMedicine,
      checkDanger,
      checkBuilding,
      checkInventory,
      checkCompensation,
    } = this.state;
    // console.log('this.state.value', this.state.value);
    const dataSelect = [
      {
        label: 'YYYY.MM.DD',
        value: 'YYYY.MM.DD',
      },
      {
        label: 'YYYY.MM.DD2',
        value: 'YYYY.MM.DD2',
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
            title={
              route && route.params && route.params.type === 'ModifyWH'
                ? '부가 정보 수정'
                : '부가 정보'
            }
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={S.containerRegister}>
          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>부가 정보</Text>
            </View>
            <View style>
              <Select
                data={dataSelect}
                labelSelected="준공일"
                colorLabel="#000000"
              />
              <TextField
                labelTextField="대지면적"
                textRight="평"
                defaultValue="0"
                colorLabel="#000000"
              />
              <TextField
                labelTextField="건축면적"
                textRight="평"
                defaultValue="0"
                colorLabel="#000000"
              />
              <TextField
                labelTextField="연면적"
                textRight="평"
                defaultValue="0"
                colorLabel="#000000"
              />
              <TextField
                labelTextField="전용면적"
                textRight="평"
                defaultValue="0"
                colorLabel="#000000"
              />
              <TextField
                labelTextField="공용면적"
                textRight="평"
                defaultValue="0"
                colorLabel="#000000"
              />
            </View>
          </View>

          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={[S.textTitleBody, S.textFooter]}>
                추가옵션<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <View style={S.options}>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checked: !checked });
                  }}
                />
                <Text style={S.labelCheck}>보세</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkMedicine ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkMedicine: !checkMedicine });
                  }}
                />
                <Text style={S.labelCheck}>의약품</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkDanger ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkDanger: !checkDanger });
                  }}
                />
                <Text style={S.labelCheck}>위험물</Text>
              </View>
            </View>
          </View>

          <View style={S.footerRegister}>
            <View style={[S.titleBody, S.titleFooter]}>
              <Text style={[S.textTitleBody, S.textFooter]}>
                가격 협의 가능<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <View style={[S.options, S.optionsFooter]}>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkBuilding ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkBuilding: !checkBuilding });
                  }}
                />
                <Text style={S.labelCheck}>건물보험</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkInventory ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkInventory: !checkInventory });
                  }}
                />
                <Text style={S.labelCheck}>재고보험</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkCompensation ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checkCompensation: !checkCompensation });
                  }}
                />
                <Text style={S.labelCheck}>영업배상보험</Text>
              </View>
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
)(RegisterMoreInfo);
