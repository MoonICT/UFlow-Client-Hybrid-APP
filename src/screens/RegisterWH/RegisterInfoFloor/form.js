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
  TextInput,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Card, Checkbox, Text, Button, IconButton } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';

import ActionCreator from '@Actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

class FormInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { title: 'Profile Photo', confirm: false, value: 1 };
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

  onChangeText = () => console.log('_addImage');
  _removeImage = () => console.log('_removeImage');

  render() {
    const { data } = this.props;
    const dataSelect = [
      {
        label: '1층',
        value: '1층',
      },
      {
        label: '2층',
        value: '2층',
      },
    ];
    return (
      <Card style={S.cards}>
        <View style>
          <Select data={dataSelect} labelSelected="층 수" />

          <TextField
            labelTextField="창고면적"
            textRight="m2"
            defaultValue="0"
            colorLabel="#000000"
          />
          <TextField
            labelTextField="사무실면적"
            textRight="m2"
            defaultValue="0"
            colorLabel="#000000"
          />
          <TextField
            labelTextField="주차장면적"
            textRight="m2"
            defaultValue="0"
            colorLabel="#000000"
          />
          <TextField
            labelTextField="공용면적"
            textRight="m2"
            defaultValue="0"
            colorLabel="#000000"
          />
          <TextField
            labelTextField="유효고"
            defaultValue="0"
            colorLabel="#000000"
          />
          <TextField labelTextField="접안방식" colorLabel="#000000" />
          <TextField
            labelTextField="도크 수"
            defaultValue="0"
            colorLabel="#000000"
          />
        </View>
      </Card>
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
)(FormInfo);
