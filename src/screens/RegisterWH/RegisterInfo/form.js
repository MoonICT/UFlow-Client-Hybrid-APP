/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Card, Text } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// Local Imports
import DefaultStyle from '@Styles/default';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
import DatePicker from '@Components/organisms/DatePicker';
import { toSquareMeter, toPyeong } from '@Services/utils/unit';
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class FormInfo extends Component {
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
          mgmtChrgDvCode: '',
          exclusiveArea2: '',
          cmnArea: '',
          usblValue: '',
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
    // console.log('newProps :>> ', newProps);
    let selectedValue = newProps.selectedValue;
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
    }
    this.setState({ selectedValue: selectedValue });
  }
  render() {
    
    const {
      data,
      valueTab,
      number,
      valueForm,
      formData,
      dataKeep,
      typeCodes,
      mgmtChrgDvCodes,
      calUnitDvCodes,
      calStdDvCodes,
    } = this.props;
    const {
      splyAmount,
      mgmtChrg,
      commonAreaState2,
      usblValueState2,
      remark,
      usblYmdFrom,
      usblYmdTo,
      from,
      showFrom,
      to,
      showTo,
      mode,
    } = this.state;
    // console.log('formDataKeep :>> ', formData);
    let timeCheck = false;
    if (
      typeof from !== 'string' &&
      typeof to !== 'string' &&
      to.toLocaleDateString() >= from.toLocaleDateString() &&
      from.toLocaleDateString() >= new Date().toLocaleDateString()
    ) {
      timeCheck = true;
    }

    let checkSplyAmount = false;
    let checkMgmtChrg = false;

    if (
      splyAmount === undefined ||
      (splyAmount !== undefined && splyAmount.length > 0)
    ) {
      checkSplyAmount = true;
    }
    if (
      mgmtChrg === undefined ||
      (mgmtChrg !== undefined && mgmtChrg.length > 0)
    ) {
      checkMgmtChrg = true;
    }

    let defaultTypeCode =
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
    let defaulcmgmtChrg =
      formData &&
      mgmtChrgDvCodes &&
      mgmtChrgDvCodes.find(item => item.value === formData.mgmtChrgDvCode);
      
    return (
      <Card style={S.cards}>
        <View style>
          <Select
            data={typeCodes}
            valueSelected={
              defaultTypeCode !== undefined ? defaultTypeCode.label : ''
            }
            dataDefault={defaultTypeCode !== undefined ? defaultTypeCode : ''}
            valueProps={e => {
              // let index = dataForm.findIndex(el => el.id === number);
              // this.setState({
              //   ...(dataForm[index].typeCode = e),
              // });
              let dataF = formData;
              dataF.typeCode = e;
              valueForm && valueForm(dataF);
            }}
            // selectedValue={formData.typeCode}
            labelSelected={getMsg(this.props.lang, 'ML0495', '창고유형')}
          />
          <Select
            data={calUnitDvCodes}
            valueSelected={
              defaultcalUnit !== undefined ? defaultcalUnit.label : ''
            }
            dataDefault={defaultcalUnit !== undefined ? defaultcalUnit : ''}
            selectedValue={formData.calUnitDvCode}
            labelSelected={getMsg(this.props.lang, 'ML0139', '정산단위')}
            valueProps={e => {
              let dataF = formData;
              dataF.calUnitDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />

          <Select
            data={calStdDvCodes}
            // selectedValue={formData.calStdDvCode}
            valueSelected={
              defaultcalStd !== undefined ? defaultcalStd.label : ''
            }
            dataDefault={defaultcalStd !== undefined ? defaultcalStd : ''}
            labelSelected={getMsg(this.props.lang, 'ML0140', '산정기준')}
            valueProps={e => {
              let dataF = formData;
              dataF.calStdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />

          <Select
            data={mgmtChrgDvCodes && mgmtChrgDvCodes}
            // selectedValue={formData.mgmtChrgDvCode}
            valueSelected={
              defaulcmgmtChrg !== undefined ? defaulcmgmtChrg.label : ''
            }
            dataDefault={defaulcmgmtChrg !== undefined ? defaulcmgmtChrg : ''}
            labelSelected={getMsg(this.props.lang, 'ML0141', '관리비구분')}
            valueProps={e => {
              let dataF = formData;
              dataF.mgmtChrgDvCode = e;
              valueForm && valueForm(dataF);
              console.log("dataF ::: " , dataF);
            }}
          />
{/**
          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="공용면적"
                defaultValue={
                  formData.cmnArea
                    ? numberToStd(toPyeong(formData.cmnArea))
                    : ''
                }
                textRight="평"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ commonAreaState2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.cmnArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.cmnArea === '' ? '' : commonAreaState2}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="공용면적"
                defaultValue={
                  formData.cmnArea ? numberToStd(formData.cmnArea) : ''
                }
                textRight="m2"
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  let value = parseInt(text);
                  let valueCover = toPyeong(value);
                  this.setState({
                    commonAreaState2: valueCover,
                  });
                  let dataF = formData;
                  dataF.cmnArea = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={commonAreaState2 === '' ? '' : formData.cmnArea}
              />
            </View>
          </View>
  */}
          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField={getMsg(this.props.lang, 'ML0140', '가용수치')}
                textRight={getMsg(this.props.lang, 'ML0487', '평')}
                isRequired={true}
                maxLength={7}
                defaultValue={
                  formData.usblValue
                    ? numberToStd(toPyeong(formData.usblValue))
                    : ''
                }
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ usblValueState2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.usblValue = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.usblValue === '' ? '' : usblValueState2}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField={getMsg(this.props.lang, 'ML0140', '가용수치')}
                isRequired={true}
                textRight="m2"
                maxLength={7}
                defaultValue={
                  formData.usblValue ? numberToStd(formData.usblValue) : ''
                }
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  let value = parseInt(text);
                  let valueCover = toPyeong(value);
                  this.setState({
                    usblValueState2: valueCover,
                  });
                  let dataF = formData;
                  dataF.usblValue = stdToNumber(text);
                  valueForm && valueForm(dataF);
                }}
                value={usblValueState2 === '' ? '' : formData.usblValue}
                keyboardType="numeric"
              />
            </View>
          </View>

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
                {getMsg(this.props.lang, 'ML0496', '임대 시작일')}
              </Text>
              {/*<DatePicker*/}
              {/*  mode={mode}*/}
              {/*  show={showFrom}*/}
              {/*  onChange={this.onChangeFrom}*/}
              {/*  value={from}*/}
              {/*  testID="dateTimePicker"*/}
              {/*/>*/}
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
                {getMsg(this.props.lang, 'ML0497', '임대 종료일')}
              </Text>
              {/*<DatePicker*/}
              {/*  mode={mode}*/}
              {/*  show={showTo}*/}
              {/*  onChange={this.onChangeTo}*/}
              {/*  value={to}*/}
              {/*  testID="dateTimePickerTo"*/}
              {/*/>*/}
              <DateTimePickerModal
                mode="date"
                isVisible={showTo}
                date={to ? to : new Date()}
                onConfirm={date => this.onChangeTo(date)}
                onCancel={() => {
                  this.setState({
                    showTo: false,
                  });
                }}
              />
            </TouchableOpacity>
          </View>

          <TextField
            labelTextField={getMsg(this.props.lang, 'ML0144', '임대단가')}
            value={splyAmount}
            defaultValue={
              formData.splyAmount ? numberToStd(formData.splyAmount) : ''
            }
            textRight={getMsg(this.props.lang, 'ML0498', '원')}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ splyAmount: text });
              let dataF = formData;
              dataF.splyAmount = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
            isRequired={true}
            maxLength={7}
            keyboardType="numeric"
            textError={checkSplyAmount === true ? null : getMsg(this.props.lang, 'ML0226', '정보를 입력해주세요.')}
          />
          <TextField
            labelTextField={getMsg(this.props.lang, 'ML0145', '관리단가')}
            value={mgmtChrg}
            defaultValue={
              formData.mgmtChrg ? numberToStd(formData.mgmtChrg) : ''
            }
            textRight={getMsg(this.props.lang, 'ML0498', '원')}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              console.log('text :>> ', text);
              this.setState({ mgmtChrg: text });
              let dataF = formData;
              dataF.mgmtChrg = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
            isRequired={true}
            maxLength={7}
            keyboardType="numeric"
            textError={checkMgmtChrg === true ? null : getMsg(this.props.lang, 'ML0226', '정보를 입력해주세요.')}
          />

          <TextField
            labelTextField={getMsg(this.props.lang, 'ML0146', '비고')}
            defaultValue={formData.remark ? formData.remark : ''}
            value={formData.remark}
            maxLength={1000}
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
    // let formData = this.props.formData;
    // let newUsblYmdFrom = formData.usblYmdFrom;
    // let newUsblYmdTo = formData.usblYmdTo;
    // if (
    //   formData &&
    //   newUsblYmdFrom !== undefined &&
    //   newUsblYmdFrom !== null &&
    //   newUsblYmdFrom !== ''
    // ) {
    //   this.setState({ from: new Date(formData.usblYmdFrom) });
    // } else if (newUsblYmdFrom === null) {
    //   this.setState({ from: 'YYYY-MM-DD' });
    // }
    // if (
    //   formData &&
    //   newUsblYmdTo !== undefined &&
    //   newUsblYmdTo !== null &&
    //   newUsblYmdTo !== ''
    // ) {
    //   this.setState({ to: new Date(formData.usblYmdTo) });
    // }
    SplashScreen.hide();
  }

  /** when update state or props */
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('::prevPropsFormKeep::',prevState);
  //   console.log('::propsFormKeep::',this.state);
  // }
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
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormInfo);
