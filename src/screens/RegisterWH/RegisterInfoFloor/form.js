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
import { toSquareMeter, toPyeong } from '@Services/utils/unit';
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';

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
    //console.log('//::componentWillUnmount::');
  }

  onChangeText = () => console.log('_addImage');
  _removeImage = () => console.log('_removeImage');

  render() {
    const { data, formData, valueForm } = this.props;
    console.log('formData :>> ', formData);
    const {
      flrAreaValue2,
      parkAreaValue2,
      opcAreaValue2,
      prvtAreaValue2,
      cmnAreaValue2,
    } = this.state;
    const dataSelect = [
      {
        label: '1층',
        value: 'F1',
      },
      {
        label: '2층',
        value: 'F2',
      },
      {
        label: '3층',
        value: 'F3',
      },
      {
        label: '지하1층',
        value: 'B1',
      },
    ];
    const settlement = [
      {
        label: '도크',
        value: '0001',
      },
      {
        label: '컨테이너',
        value: '0002',
      },
      {
        label: '화물EV,',
        value: '0003',
      },
      {
        label: '수직반송기',
        value: '0004',
      }
    ];
    let dataDefault =
      dataSelect &&
      dataSelect.find(item => item.value === formData.flrDvCode);
    let dataDefaultAprchMthdDvCode =
      formData &&
      settlement.find(item => item.value === formData.aprchMthdDvCode);
    return (
      <Card style={S.cards}>
        <View style>
          <Select
            data={dataSelect}
            dataDefault={dataDefault}
            selectedValue={formData.flrDvCode}
            labelSelected="층 수"
            valueProps={e => {
              let dataF = formData;
              dataF.flrDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />

          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="층면적"
                textRight="m2"
                defaultValue={
                  formData.flrArea ? numberToStd(formData.flrArea) : '0'
                }
                colorLabel="#000000"
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  let value = parseInt(text);
                  let valueCover = toPyeong(value);
                  this.setState({
                    flrAreaValue2: valueCover,
                  });
                  let dataF = formData;
                  dataF.flrArea = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={flrAreaValue2 === '' ? '0' : formData.flrArea}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="층면적"
                textRight="평"
                defaultValue={
                  formData.flrArea
                    ? numberToStd(toPyeong(formData.flrArea))
                    : '0'
                }
                colorLabel="#000000"
                valueProps={e => {
                  let value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ flrAreaValue2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.flrArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.flrArea === '' ? '0' : flrAreaValue2}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="주차면적"
                defaultValue={
                  formData.parkArea ? numberToStd(formData.parkArea) : '0'
                }
                textRight="m2"
                colorLabel="#000000"
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  const value = parseInt(text);

                  let valueCover = toPyeong(value);
                  this.setState({
                    parkAreaValue2: valueCover,
                  });
                  let dataF = formData;
                  dataF.parkArea = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={flrAreaValue2 === '' ? '0' : formData.parkArea}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="주차면적"
                defaultValue={
                  formData.parkArea
                    ? numberToStd(toPyeong(formData.parkArea))
                    : '0'
                }
                textRight="평"
                colorLabel="#000000"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ parkAreaValue2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.parkArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.parkArea === '' ? '0' : parkAreaValue2}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="사무실면적"
                defaultValue={
                  formData.opcArea ? numberToStd(formData.opcArea) : '0'
                }
                textRight="m2"
                colorLabel="#000000"
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  const value = parseInt(text);
                  let valueCover = toPyeong(value);
                  this.setState({
                    opcAreaValue2: valueCover,
                  });
                  let dataF = formData;
                  dataF.opcArea = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={opcAreaValue2 === '' ? '0' : formData.opcArea}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="사무실면적"
                defaultValue={
                  formData.opcArea
                    ? numberToStd(toPyeong(formData.opcArea))
                    : '0'
                }
                textRight="평"
                colorLabel="#000000"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ opcAreaValue2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.opcArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.opcArea === '' ? '0' : opcAreaValue2}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="전용면적"
                defaultValue={
                  formData.prvtArea ? numberToStd(formData.prvtArea) : '0'
                }
                textRight="m2"
                colorLabel="#000000"
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  const value = parseInt(text);
                  let valueCover = toPyeong(value);
                  this.setState({
                    prvtAreaValue2: valueCover,
                  });
                  let dataF = formData;
                  dataF.prvtArea = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={prvtAreaValue2 === '' ? '0' : formData.prvtArea}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="전용면적"
                defaultValue={
                  formData.prvtArea
                    ? numberToStd(toPyeong(formData.prvtArea))
                    : '0'
                }
                textRight="평"
                colorLabel="#000000"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ prvtAreaValue2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.prvtArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.prvtArea === '' ? '0' : prvtAreaValue2}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="공용면적"
                defaultValue={
                  formData.cmnArea ? numberToStd(formData.cmnArea) : '0'
                }
                textRight="m2"
                colorLabel="#000000"
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  let value = parseInt(text);
                  let valueCover = toPyeong(value);
                  this.setState({
                    cmnAreaValue2: valueCover,
                  });
                  let dataF = formData;
                  dataF.cmnArea = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={cmnAreaValue2 === '' ? '0' : formData.cmnArea}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="공용면적"
                defaultValue={
                  formData.cmnArea
                    ? numberToStd(toPyeong(formData.cmnArea))
                    : '0'
                }
                textRight="평"
                colorLabel="#000000"
                valueProps={e => {
                  let value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ cmnAreaValue2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.cmnArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.cmnArea === '' ? '0' : cmnAreaValue2}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TextField
            labelTextField="층고"
            defaultValue={formData.flrHi ? numberToStd(formData.flrHi) : ''}
            value={formData.flrHi}
            colorLabel="#000000"
            valueProps={e => {
              let dataF = formData;
              dataF.flrHi = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="유효고"
            defaultValue={formData.efctvHi ? numberToStd(formData.efctvHi) : ''}
            value={formData.efctvHi}
            colorLabel="#000000"
            valueProps={e => {
              let dataF = formData;
              dataF.efctvHi = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          {/* <TextField
            labelTextField="접안방식"
            // defaultValue={formData.aprchMthdDvCode ? numberToStd(formData.aprchMthdDvCode) : ''}
            value={formData.aprchMthdDvCode}
            colorLabel="#000000"
            valueProps={e => {
              let dataF = formData;
              dataF.aprchMthdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          /> */}
          <Select
            data={settlement}
            dataDefault={dataDefaultAprchMthdDvCode !== undefined ? dataDefaultAprchMthdDvCode : ''}
            selectedValue={formData.aprchMthdDvCode}
            labelSelected="접안방식"
            valueProps={e => {
              let dataF = formData;
              dataF.aprchMthdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="도크 수"
            defaultValue={formData.dockQty ? numberToStd(formData.dockQty) : ''}
            colorLabel="#000000"
            value={formData.dockQty}
            valueProps={e => {
              let dataF = formData;
              dataF.dockQty = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
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
    imageStore: state.registerWH.pimages,
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
