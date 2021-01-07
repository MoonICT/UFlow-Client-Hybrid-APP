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

import ActionCreator from '@Actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import DatePicker from '@Components/organisms/DatePicker';
import { toSquareMeter } from '@Services/libs/unit';

class FormInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      title: 'Profile Photo',
      confirm: false,
      value: 1,
      from: new Date(),
      showFrom: false,
      to: new Date(),
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

    const managementFees = [
      {
        label: '일반관리비',
        value: '0001',
      },
      {
        label: '수도광열비',
        value: '0002',
      },
      {
        label: '기타',
        value: '9100',
      },
    ];
    // let commonA = parseInt(commonAreaState) * 2;
    // console.log('commonAreaState2 :>> ', commonAreaState2);
    let timeForm = new Date();
    timeForm.setTime(formData.usblYmdFrom);
    let timeTo = new Date();
    timeTo.setTime(formData.usblYmdTo);
    let timeFormCover = timeForm.toLocaleDateString();
    let timeToCover = timeTo.toLocaleDateString();

    return (
      <Card style={S.cards}>
        <View style>
          <Select
            data={dataSelect}
            valueProps={e => {
              // let index = dataForm.findIndex(el => el.id === number);
              // this.setState({
              //   ...(dataForm[index].typeCode = e),
              // });
              let dataF = formData;
              dataF.typeCode = e;
              valueForm && valueForm(dataF);
            }}
            selectedValue={formData.typeCode}
            labelSelected="보관유형"
          />
          <Select
            data={settlement}
            selectedValue={formData.calUnitDvCode}
            labelSelected="정산단위"
            valueProps={e => {
              // this.setState({ calUnitDvCode: e })
              let dataF = formData;
              dataF.calUnitDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={calculation}
            selectedValue={formData.calStdDvCode}
            labelSelected="산정기준"
            valueProps={e => {
              // this.setState({ calculationStandard: e });
              let dataF = formData;
              dataF.calStdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={managementFees}
            selectedValue={formData.mgmtChrgDvCode}
            labelSelected="관리비구분"
            valueProps={e => {
              // this.setState({ calculationStandard: e });
              let dataF = formData;
              dataF.mgmtChrgDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="공용면적"
                textRight="평"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  let test = toSquareMeter(value);
                  // console.log('testdddddddd', test);
                  const valueCover = (value * 3.305785).toFixed(0).toString();
                  this.setState({ commonAreaState2: valueCover });
                  let dataF = formData;
                  dataF.cmnArea = e.replace(/[^0-9]/g, '');
                  valueForm && valueForm(dataF);
                }}
                value={commonAreaState2 === '' ? '0' : formData.cmnArea}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="공용면적"
                defaultValue={''}
                textRight="m2"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  const valueCover = (value / 3.305785).toFixed(0).toString();
                  this.setState({
                    commonAreaState2: e.replace(/[^0-9]/g, ''),
                  });
                  // formData.cmnArea
                  let dataF = formData;
                  dataF.cmnArea = valueCover;
                  valueForm && valueForm(dataF);
                }}
                value={formData.cmnArea === '' ? '0' : commonAreaState2}
              />
            </View>
          </View>
          <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="가용수치"
                textRight="평"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  const valueCover = (value * 3.305785).toString();
                  this.setState({ usblValueState2: valueCover });
                  let dataF = formData;
                  dataF.usblValue = e.replace(/[^0-9]/g, '');
                  valueForm && valueForm(dataF);
                }}
                value={usblValueState2 === '' ? '0' : formData.usblValue}
                keyboardType="numeric"
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="가용수치"
                textRight="m2"
                valueProps={e => {
                  const value = parseInt(e.replace(/[^0-9]/g, ''));
                  const valueCover = (value / 3.305785).toString();
                  this.setState({
                    usblValueState2: e.replace(/[^0-9]/g, ''),
                  });
                  // formData.cmnArea
                  let dataF = formData;
                  dataF.usblValue = valueCover;
                  valueForm && valueForm(dataF);
                }}
                keyboardType="numeric"
                value={formData.usblValue === '' ? '0' : usblValueState2}
              />
            </View>
          </View>

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

          {
            // <TextField
            //   labelTextField="보관 가능 기간"
            //   placeholder="YYYY.MM.DD"
            //   // defaultValue={formData.usblYmdFrom}
            //   value={timeFormCover}
            //   valueProps={e => {
            //     // this.setState({ usblYmdFrom: e });
            //     let d = new Date(e).getTime();
            //     let dataF = formData;
            //     dataF.usblYmdFrom = d;
            //     valueForm && valueForm(dataF);
            //     this.setState({ usblYmdFrom: d });
            //   }}
            // />
          }
          <TextField
            labelTextField="보관단가"
            value={formData.splyAmount}
            textRight="원"
            valueProps={e => {
              this.setState({ splyAmount: e });
              let dataF = formData;
              dataF.splyAmount = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="관리단가"
            value={formData.mgmtChrg}
            textRight="원"
            valueProps={e => {
              this.setState({ mgmtChrg: e });
              let dataF = formData;
              dataF.mgmtChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          {/** 
               <View style={DefaultStyle._listElement}>
                <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  <Select
                    data={costs}
                    labelSelected="관리단가"
                    valueProps={e => this.setState({ managementUnitCost: e })}
                  />
                </View>
                <View style={DefaultStyle._element}>
                  <TextField
                    defaultValue="1000"
                    textRight="원"
                    valueProps={e => this.setState({ managementUnitCost2: e })}
                  />
                </View>
              </View>
              */}

          <TextField
            labelTextField="비고"
            value={formData.remark}
            valueProps={e => {
              this.setState({ remark: e });
              this.setState({ mgmtChrg: e });
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
)(FormInfo);
