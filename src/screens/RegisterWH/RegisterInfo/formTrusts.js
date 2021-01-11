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
import DatePicker from '@Components/organisms/DatePicker';

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
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';

class FormTrusts extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      title: 'Profile Photo',
      confirm: false,
      value: 1,
      from: props.formData.usblYmdFrom
        ? new Date(props.formData.usblYmdFrom)
        : new Date(),
      showFrom: false,
      to: props.formData.usblYmdTo
        ? new Date(props.formData.usblYmdTo)
        : new Date(),
      showTo: false,
      dataForm: [
        {
          // id: 0,
          typeCode: '',
          calUnitDvCode: '',
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

  onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.from;
    this.setState({ from: currentDate, showFrom: false });
    let d = new Date(selectedDate).getTime();
    let dataF = this.props.formData;
    dataF.usblYmdFrom = d;
    this.props.valueForm && this.props.valueForm(dataF);
    // this.setState({ usblYmdFrom: d });
  };
  showDatepicker = () => {
    this.setState({ showFrom: true });
  };

  showDatepickerTo = () => {
    this.setState({ showTo: true });
  };
  onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.to;
    this.setState({ to: currentDate, showTo: false });
    let d = new Date(selectedDate).getTime();
    let dataF = this.props.formData;
    dataF.usblYmdTo = d;
    this.props.valueForm && this.props.valueForm(dataF);
  };

  componentWillReceiveProps(newProps) {
    let newUsblYmdFrom = newProps.formData.usblYmdFrom;
    let newUsblYmdTo = newProps.formData.usblYmdTo;
    if (newProps.formData && newUsblYmdFrom !== undefined) {
      this.setState({ from: new Date(newProps.formData.usblYmdFrom) });
    }
    if (newProps.formData && newUsblYmdTo !== undefined) {
      this.setState({ to: new Date(newProps.formData.usblYmdTo) });
    }
  }
  render() {
    const {
      data,
      valueTab,
      number,
      valueForm,
      formData,
      typeCodes,
      calUnitDvCodes,
      calStdDvCodes,
    } = this.props;
    const { from, showFrom, to, showTo, mode } = this.state;
console.log('formDataTrust :>> ', formData);
    let defaultTypeCodeT =
      formData &&
      typeCodes &&
      typeCodes.find(item => item.value === formData.typeCode);
    let defaultcalUnit =
      formData &&
      calUnitDvCodes &&
      calUnitDvCodes.find(item => item.value === formData.calUnitDvCode);
    let defaultcalStd =
      formData &&
      calStdDvCodes &&
      calStdDvCodes.find(item => item.value === formData.calStdDvCode);
    return (
      <Card style={S.cards}>
        <View style>
          <Select
            data={typeCodes}
            labelSelected="보관유형"
            dataDefault={defaultTypeCodeT !== undefined ? defaultTypeCodeT : ''}
            selectedValue={formData.typeCode}
            valueProps={e => {
              let dataF = formData;
              dataF.typeCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={calUnitDvCodes}
            labelSelected="정산단위"
            dataDefault={defaultcalUnit !== undefined ? defaultcalUnit : ''}
            selectedValue={formData.calUnitDvCode}
            valueProps={e => {
              // this.setState({ calUnitDvCode: e })
              let dataF = formData;
              dataF.calUnitDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={calStdDvCodes}
            labelSelected="산정기준"
            dataDefault={defaultcalStd !== undefined ? defaultcalStd : ''}
            selectedValue={formData.calStdDvCode}
            valueProps={e => {
              // this.setState({ calculationStandard: e });
              let dataF = formData;
              dataF.calStdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="가용수량"
            defaultValue={
              formData.usblValue ? numberToStd(formData.usblValue) : ''
            }
            valueProps={e => {
              this.setState({ usblValue: e });
              let dataF = formData;
              dataF.usblValue = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />

          <View style={{ flex: 1, marginBottom: 18 }}>
            <TouchableOpacity
              onPress={this.showDatepicker}
              style={DefaultStyle._btnDate}>
              <Text style={DefaultStyle._textDate}>
                {from.toLocaleDateString()}
              </Text>
              <Text
                style={[DefaultStyle._labelTextField, { color: '#000000' }]}>
                수탁 기간
              </Text>
              <DatePicker
                mode={mode}
                show={showFrom}
                onChange={this.onChangeFrom}
                value={from}
                testID="dateTimePicker"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginBottom: 18 }}>
            <TouchableOpacity
              onPress={this.showDatepickerTo}
              style={DefaultStyle._btnDate}>
              <Text style={DefaultStyle._textDate}>
                {to.toLocaleDateString()}
              </Text>
              <Text
                style={[DefaultStyle._labelTextField, { color: '#000000' }]}>
                수탁 기간
              </Text>
              <DatePicker
                mode={mode}
                show={showTo}
                onChange={this.onChangeTo}
                value={to}
                testID="dateTimePickerTo"
              />
            </TouchableOpacity>
          </View>

          <TextField
            labelTextField="보관단가"
            textRight="개"
            value={formData.splyAmount}
            defaultValue={
              formData.splyAmount ? numberToStd(formData.splyAmount) : ''
            }
            valueProps={e => {
              this.setState({ splyAmount: e });
              let dataF = formData;
              dataF.splyAmount = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="입고단가"
            textRight="원"
            defaultValue={
              formData.whinChrg ? numberToStd(formData.whinChrg) : ''
            }
            value={formData.whinChrg}
            valueProps={e => {
              this.setState({ whinChrg: e });
              let dataF = formData;
              dataF.whinChrg = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="출고단가"
            textRight="원"
            defaultValue={
              formData.whinChrg ? numberToStd(formData.whinChrg) : ''
            }
            value={formData.whinChrg}
            valueProps={e => {
              this.setState({ whoutChrg: e });
              let dataF = formData;
              dataF.whinChrg = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="인건단가 (선택)"
            textRight="원"
            value={formData.psnChrg}
            defaultValue={formData.psnChrg ? numberToStd(formData.psnChrg) : ''}
            valueProps={e => {
              this.setState({ psnChrg: e });
              let dataF = formData;
              dataF.psnChrg = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="가공단가 (선택)"
            value={formData.mnfctChrg}
            textRight="원"
            defaultValue={
              formData.mnfctChrg ? numberToStd(formData.mnfctChrg) : ''
            }
            valueProps={e => {
              this.setState({ mnfctChrg: e });
              let dataF = formData;
              dataF.mnfctChrg = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="택배단가 (선택)"
            textRight="원"
            defaultValue={
              formData.dlvyChrg ? numberToStd(formData.dlvyChrg) : ''
            }
            value={formData.dlvyChrg}
            valueProps={e => {
              this.setState({ dlvyChrg: e });
              let dataF = formData;
              dataF.dlvyChrg = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="운송단가 (선택)"
            textRight="원"
            value={formData.shipChrg}
            defaultValue={
              formData.shipChrg ? numberToStd(formData.shipChrg) : ''
            }
            valueProps={e => {
              this.setState({ shipChrg: e });
              let dataF = formData;
              dataF.shipChrg = stdToNumber(e);
              valueForm && valueForm(dataF);
            }}
          />

          <TextField
            labelTextField="비고"
            value={formData.remark}
            defaultValue={formData.remark ? numberToStd(formData.remark) : ''}
            valueProps={e => {
              this.setState({ remark: e });
              let dataF = formData;
              dataF.remark = e;
              valueForm && valueForm(dataF);
            }}
          />
        </View>
      </Card>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    if (this.props.formData) {
      this.setState({ formData: this.props.formData });
    }
    SplashScreen.hide();
  }

}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormTrusts);
