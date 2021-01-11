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

  render() {
    const { data, valueTab, number, valueForm, formData } = this.props;
    const { from, showFrom, to, showTo, mode } = this.state;
    const dataSelect = [
      {
        label: '냉동',
        value: '0001',
      },
      {
        label: '냉장',
        value: '0002',
      },
      {
        label: '상온',
        value: '0003',
      },
      {
        label: '위험물',
        value: '0004',
      },
      {
        label: '기타',
        value: '9100',
      },
    ];

    const settlement = [
      {
        label: '제곱미터(㎡)',
        value: 'CU01',
      },
      {
        label: '평',
        value: 'CU02',
      },
      {
        label: '파렛트',
        value: 'CU03',
      },
      {
        label: '중량',
        value: 'CU04',
      },
      {
        label: 'BOX',
        value: 'CU05',
      },
      {
        label: 'PCS',
        value: 'CU06',
      },
      {
        label: 'CBM',
        value: 'CU07',
      },
      {
        label: '명수',
        value: 'CU08',
      },
      {
        label: '건수',
        value: 'CU09',
      },
      {
        label: '횟수',
        value: 'CU010',
      },
      {
        label: '일수',
        value: 'CU011',
      },
      {
        label: '월수',
        value: 'CU011',
      },
    ];

    const calculation = [
      {
        label: '회',
        value: 'CS01',
      },
      {
        label: '건',
        value: 'CS02',
      },
      {
        label: '일',
        value: 'CS03',
      },
      {
        label: '월',
        value: 'CS04',
      },
      {
        label: '분기',
        value: 'CS05',
      },
      {
        label: '반기',
        value: 'CS06',
      },
      {
        label: '연',
        value: 'CS07',
      },
    ];

    // let commonA = parseInt(commonAreaState) * 2;
    // console.log('commonAreaState2 :>> ', commonAreaState2);

    let defaultTypeCode =
      dataSelect && dataSelect.find(item => item.value === formData.typeCode);
    let defaultcalUnit =
      settlement &&
      settlement.find(item => item.value === formData.calUnitDvCode);
    let defaultcalStd =
    calculation &&
    calculation.find(item => item.value === formData.calUnitDvCode);
    // let defaulcmgmtChrg =
    //   managementFees &&
    //   managementFees.find(item => item.value === formData.mgmtChrgDvCode);
    return (
      <Card style={S.cards}>
        <View style>
          <Select
            data={dataSelect}
            labelSelected="보관유형"
            dataDefault={defaultTypeCode}
            selectedValue={formData.typeCode}
            valueProps={e => {
              let dataF = formData;
              dataF.typeCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={settlement}
            labelSelected="정산단위"
            dataDefault={defaultcalUnit}
            selectedValue={formData.calUnitDvCode}
            valueProps={e => {
              // this.setState({ calUnitDvCode: e })
              let dataF = formData;
              dataF.calUnitDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={calculation}
            labelSelected="산정기준"
            defaultValue={defaultcalStd}
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

          {/**    <View style={DefaultStyle._listElement}>
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
          </View>  */}
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
              formData.whoutChrg ? numberToStd(formData.whoutChrg) : ''
            }
            value={formData.whoutChrg}
            valueProps={e => {
              this.setState({ whoutChrg: e });
              let dataF = formData;
              dataF.whoutChrg = stdToNumber(e);
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
)(FormTrusts);
