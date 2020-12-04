/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
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

import ActionCreator from '../../../actions';
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
    const { data, valueTab } = this.props;
    const dataSelect = [
      {
        label: '상온',
        value: '상온',
      },
      {
        label: '상온2',
        value: '상온2',
      },
    ];

    const settlement = [
      {
        label: '제곱미터(m²)',
        value: '제곱미터(m²)',
      },
      {
        label: '제곱미터(m²)2',
        value: '제곱미터(m²)2',
      },
    ];
    const calculation = [
      {
        label: '일(Day)',
        value: '일(Day)',
      },
      {
        label: '일(Day)2',
        value: '일(Day)2',
      },
    ];
    const time = [
      {
        label: '회',
        value: '회',
      },
      {
        label: '회2',
        value: '회2',
      },
    ];
    const storage = [
      {
        label: '2020.10.10 - 2021.10.10',
        value: '2020.10.10 - 2021.10.10',
      },
      {
        label: '2020.10.10 - 2021.10.10 2',
        value: '2020.10.10 - 2021.10.10 2',
      },
    ];

    const costs = [
      {
        label: '일반관리비',
        value: '일반관리비',
      },
      {
        label: '일반관리비 2',
        value: '일반관리비 2',
      },
    ];
    return (
      <Fragment>
        {valueTab === 1 ? (
          <Card style={S.cards}>
            <View style>
              <Select data={dataSelect} labelSelected="보관유형" />
              <Select data={settlement} labelSelected="정산단위" />
              <Select data={calculation} labelSelected="산정기준" />
              <View style={DefaultStyle._listElement}>
                <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  <TextField
                    labelTextField="전용면적"
                    textRight="평"
                    valueProps={e => console.log('e', e)}
                  />
                </View>
                <View style={DefaultStyle._element}>
                  <TextField
                    labelTextField="전용면적"
                    defaultValue="1200"
                    textRight="m2"
                  />
                </View>
              </View>
              <View style={DefaultStyle._listElement}>
                <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  <TextField labelTextField="공용면적" textRight="평" />
                </View>
                <View style={DefaultStyle._element}>
                  <TextField
                    labelTextField="공용면적"
                    defaultValue="1200"
                    textRight="m2"
                  />
                </View>
              </View>
              <View style={DefaultStyle._listElement}>
                <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  <TextField labelTextField="임대면적" textRight="평" />
                </View>
                <View style={DefaultStyle._element}>
                  <TextField
                    labelTextField="임대면적"
                    defaultValue="1200"
                    textRight="m2"
                  />
                </View>
              </View>
              <Select data={storage} labelSelected="보관 가능 기간" />
              <TextField
                labelTextField="보관단가"
                textRight="원"
                defaultValue="1000"
              />
              <View style={DefaultStyle._listElement}>
                <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  <Select data={costs} labelSelected="관리단가" />
                </View>
                <View style={DefaultStyle._element}>
                  <TextField defaultValue="1000" textRight="원" />
                </View>
              </View>
              <TextField labelTextField="비고" />
            </View>
          </Card>
        ) : (
          <Card style={S.cards}>
            <View style>
              <Select data={dataSelect} labelSelected="보관유형" />
              <Select data={settlement} labelSelected="정산단위" />
              <Select data={time} labelSelected="산정기준" />
              <View style={DefaultStyle._listElement}>
                <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  <TextField
                    labelTextField="전용면적"
                    textRight="평"
                    valueProps={e => console.log('e', e)}
                  />
                </View>
                <IconButton
                  style={{ marginBottom: 15 }}
                  size={25}
                  icon="plus-circle-outline"
                  color={'rgba(0, 0, 0, 0.54)'}
                  onPress={() => console.log('add')}
                />
              </View>

              <TextField
                labelTextField="입고비"
                textRight="원"
                defaultValue="5000"
              />
              <TextField
                labelTextField="출고비"
                textRight="원"
                defaultValue="5000"
              />
              <TextField labelTextField="인건비" textRight="원" />
              <TextField labelTextField="비고" />
            </View>
          </Card>
        )}
      </Fragment>
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
