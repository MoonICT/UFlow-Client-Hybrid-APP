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
import { Card, Text, Button, IconButton } from 'react-native-paper';
import DatePicker from '@Components/organisms/DatePicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
      from:
        props.formData.usblYmdFrom && props.formData.usblYmdFrom !== null
          ? new Date(props.formData.usblYmdFrom)
          : new Date(),
      showFrom: false,
      to:
        props.formData.usblYmdTo && props.formData.usblYmdTo !== null
          ? new Date(props.formData.usblYmdTo)
          : new Date(),
      showTo: false,
      dataForm: [
        {
          // id: 0,
          typeCode: '',
          calUnitDvCode: '',
          calStdDvCode: '',
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

  onChangeFrom = selectedDate => {
    const currentDate = selectedDate || this.state.from;
    this.setState({ from: currentDate, showFrom: false });
    let d = selectedDate
      ? new Date(selectedDate).getTime()
      : new Date().getTime();
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
  onChangeTo = selectedDate => {
    const currentDate = selectedDate || this.state.to;
    this.setState({ to: currentDate, showTo: false });
    let d = selectedDate
      ? new Date(selectedDate).getTime()
      : new Date().getTime();
    let dataF = this.props.formData;
    dataF.usblYmdTo = d;
    this.props.valueForm && this.props.valueForm(dataF);
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log('newProps :>> ', newProps);
    let formData = newProps.formData;
    let newUsblYmdFrom = formData.usblYmdFrom;
    let newUsblYmdTo = formData.usblYmdTo;
    if (
      formData &&
      newUsblYmdFrom !== undefined &&
      newUsblYmdFrom !== null &&
      newUsblYmdFrom !== ''
    ) {
      this.setState({ from: new Date(formData.usblYmdFrom) });
    } else if (newUsblYmdFrom === null) {
      this.setState({ from: 'YYYY-MM-DD' });
    } else {
      this.setState({ from: new Date() });
    }
    if (
      formData &&
      newUsblYmdTo !== undefined &&
      newUsblYmdTo !== null &&
      newUsblYmdTo !== ''
    ) {
      this.setState({ to: new Date(formData.usblYmdTo) });
    } else if (newUsblYmdTo === null) {
      this.setState({ to: 'YYYY-MM-DD' });
    } else {
      this.setState({ from: new Date() });
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
    const {
      from,
      showFrom,
      to,
      showTo,
      mode,
      usblValue,
      splyAmount,
      whinChrg,
      whoutChrg,
      psnChrg,
      mnfctChrg,
      dlvyChrg,
      shipChrg,
    } = this.state;

    let timeCheck = false;
    console.log('usblValue :>> ', usblValue);
    console.log('formDataTrust :>> ', formData);

    if (
      typeof from !== 'string' &&
      typeof to !== 'string' &&
      to.toLocaleDateString() >= from.toLocaleDateString() &&
      from.toLocaleDateString() >= new Date().toLocaleDateString()
    ) {
      timeCheck = true;
    }
    
    //check validate
    let checkUsblValue = false;
    let checkSplyAmount = false;
    let checkWhinChrg = false;
    let checkWhoutChrg = false;
    if (
      usblValue === undefined ||
      (usblValue !== undefined && usblValue.length > 0)
    ) {
      checkUsblValue = true;
    }
    if (
      splyAmount === undefined ||
      (splyAmount !== undefined && splyAmount.length > 0)
    ) {
      checkSplyAmount = true;
    }
    if (
      whinChrg === undefined ||
      (whinChrg !== undefined && whinChrg.length > 0)
    ) {
      checkWhinChrg = true;
    }
    if (
      whoutChrg  === undefined ||
      (whoutChrg !== undefined && whoutChrg.length > 0)
    ) {
      checkWhoutChrg = true;
    }
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
            // valueSelected={defaultTypeCodeT !== undefined ? defaultTypeCodeT.label : ''}
            dataDefault={defaultTypeCodeT !== undefined ? defaultTypeCodeT : ''}
            // selectedValue={formData.typeCode}
            valueProps={e => {
              let dataF = formData;
              dataF.typeCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={calUnitDvCodes}
            labelSelected="정산단위"
            valueSelected={
              defaultcalUnit !== undefined ? defaultcalUnit.label : ''
            }
            dataDefault={defaultcalUnit !== undefined ? defaultcalUnit : ''}
            // selectedValue={formData.calUnitDvCode}
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
            valueSelected={
              defaultcalStd !== undefined ? defaultcalStd.label : ''
            }
            dataDefault={defaultcalStd !== undefined ? defaultcalStd : ''}
            // selectedValue={formData.calStdDvCode}
            valueProps={e => {
              let dataF = formData;
              dataF.calStdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="가용수량"
            placeholder="0"
            keyboardType="numeric"
            isRequired={true}
            defaultValue={
              formData.usblValue ? numberToStd(formData.usblValue) : ''
            }
            value={usblValue}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ usblValue: text });
              let dataF = formData;
              dataF.usblValue = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
            textError={
              checkUsblValue === true ? null : '정보를 입력해주세요.'
            }
          />

          <View style={{ flex: 1, marginBottom: 18 }}>
            <TouchableOpacity
              onPress={this.showDatepicker}
              style={[
                DefaultStyle._btnDate,
                timeCheck === false ? DefaultStyle._errorText : '',
              ]}>
              <Text style={DefaultStyle._textDate}>
                {typeof from === 'string' ? from : from.toLocaleDateString()}
              </Text>
              <Text
                style={[DefaultStyle._labelTextField, { color: '#000000' }]}>
                수탁 기간
              </Text>
              <DateTimePickerModal
                mode="date"
                isVisible={showFrom}
                date={from ? from : new Date()}
                onConfirm={date => this.onChangeFrom(date)}
                onCancel={() => {
                  this.setState({
                    showFrom: false,
                  });
                }}
                // show={showFrom}
                // onChange={this.onChangeFrom}
                // value={from}
                // testID="dateTimePicker"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginBottom: 18 }}>
            <TouchableOpacity
              onPress={this.showDatepickerTo}
              style={[
                DefaultStyle._btnDate,
                timeCheck === false ? DefaultStyle._errorText : '',
              ]}>
              <Text style={DefaultStyle._textDate}>
                {typeof to === 'string' ? to : to.toLocaleDateString()}
              </Text>
              <Text
                style={[DefaultStyle._labelTextField, { color: '#000000' }]}>
                수탁 기간
              </Text>
              <DateTimePickerModal
                mode="date"
                isVisible={showTo}
                date={to ? to : new Date()}
                onConfirm={date => this.onChangeTo(date)}
                onCancel={() => {
                  this.setState({
                    showFrom: false,
                  });
                }}
                // onChange={this.onChangeTo}
                // value={to}
                // testID="dateTimePickerTo"
              />
            </TouchableOpacity>
          </View>

          <TextField
            labelTextField="보관단가"
            placeholder="0"
            isRequired={true}
            textError={
              checkSplyAmount === true
                ? null
                : '정보를 입력해주세요.'
            }
            textRight="원"
            keyboardType="numeric"
            value={splyAmount}
            defaultValue={
              formData.splyAmount ? numberToStd(formData.splyAmount) : ''
            }
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ splyAmount: text });
              let dataF = formData;
              dataF.splyAmount = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="입고단가"
            placeholder="0"
            textError={
              checkWhinChrg === true
                ? null
                : '정보를 입력해주세요.'
            }
            isRequired={true}
            keyboardType="numeric"
            textRight="원"
            defaultValue={
              formData.whinChrg ? numberToStd(formData.whinChrg) : ''
            }
            value={whinChrg}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ whinChrg: text });
              let dataF = formData;
              dataF.whinChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="출고단가"
            isRequired={true}
            placeholder="0"    
            textError={
              checkWhoutChrg === true
                ? null
                : '정보를 입력해주세요.'
            }
            keyboardType="numeric"
            textRight="원"
            defaultValue={
              formData.whoutChrg ? numberToStd(formData.whoutChrg) : ''
            }
            value={whoutChrg}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ whoutChrg: text });
              let dataF = formData;
              dataF.whoutChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
          {/**
          <TextField
            labelTextField="인건단가 (선택)"
            placeholder="0"
            keyboardType="numeric"
            textRight="원"
            value={psnChrg}
            defaultValue={formData.psnChrg ? numberToStd(formData.psnChrg) : ''}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ psnChrg: text });
              let dataF = formData;
              dataF.psnChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="가공단가 (선택)"
            value={mnfctChrg}
            placeholder="0"
            keyboardType="numeric"
            textRight="원"
            defaultValue={
              formData.mnfctChrg ? numberToStd(formData.mnfctChrg) : ''
            }
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ mnfctChrg: text });
              let dataF = formData;
              dataF.mnfctChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="택배단가 (선택)"
            placeholder="0"
            keyboardType="numeric"
            textRight="원"
            defaultValue={
              formData.dlvyChrg ? numberToStd(formData.dlvyChrg) : ''
            }
            value={dlvyChrg}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ dlvyChrg: text });
              let dataF = formData;
              dataF.dlvyChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="운송단가 (선택)"
            placeholder="0"
            keyboardType="numeric"
            textRight="원"
            value={shipChrg}
            defaultValue={
              formData.shipChrg ? numberToStd(formData.shipChrg) : ''
            }
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ shipChrg: text });
              let dataF = formData;
              dataF.shipChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
          />
 */}
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
