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
import DatePicker from '@Components/organisms/DatePicker';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../style';
import { styles as SS } from './style';
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';

// import Form from './form';
class RegisterMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      addOptDvCodes:
        props.dataMoreInfo && props.dataMoreInfo.addOptDvCodes
          ? props.dataMoreInfo.addOptDvCodes
          : ['', '', ''],
      insrDvCodes:
        props.dataMoreInfo && props.dataMoreInfo.insrDvCodes
          ? props.dataMoreInfo.insrDvCodes
          : ['', '', ''],
      cmpltYmd:
        props.dataMoreInfo && props.dataMoreInfo.cmpltYmd
          ? props.dataMoreInfo.cmpltYmd
          : '',
      siteArea:
        props.dataMoreInfo && props.dataMoreInfo.siteArea
          ? props.dataMoreInfo.siteArea
          : '',
      bldgArea:
        props.dataMoreInfo && props.dataMoreInfo.bldgArea
          ? props.dataMoreInfo.bldgArea
          : '',
      totalArea:
        props.dataMoreInfo && props.dataMoreInfo.totalArea
          ? props.dataMoreInfo.totalArea
          : '',
      prvtArea:
        props.dataMoreInfo && props.dataMoreInfo.prvtArea
          ? props.dataMoreInfo.prvtArea
          : '',
      cmnArea:
        props.dataMoreInfo && props.dataMoreInfo.cmnArea
          ? props.dataMoreInfo.cmnArea
          : '',
      from:
        props.dataMoreInfo && props.dataMoreInfo.cmpltYmd
          ? new Date(props.dataMoreInfo.cmpltYmd)
          : new Date(),
      showFrom: false,
      mode: 'date',
    };

    this.navigation = props.navigation;
  }

  showDatepicker = () => {
    this.setState({ showFrom: true });
  };

  onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.from;
    let d = new Date(selectedDate).getTime();

    this.setState({ from: currentDate, showFrom: false, cmpltYmd: d });
  };

  render() {
    const { imageStore, route, dataMoreInfo } = this.props;
    const {
      addOptDvCodes,
      insrDvCodes,
      cmpltYmd,
      siteArea,
      bldgArea,
      totalArea,
      prvtArea,
      cmnArea,
      from,
      mode,
      showFrom,
    } = this.state;
    console.log('insrDvCodes :>> ', insrDvCodes);

    let checkbox0001  = [-1, -1, -1, -1, -1, -1];

    if(addOptDvCodes.length > 0){
      checkbox0001[0] = addOptDvCodes.indexOf("0001");
      checkbox0001[1] = addOptDvCodes.indexOf("0002");
      checkbox0001[2] = addOptDvCodes.indexOf("0003");
    }

    if(insrDvCodes.length > 0){
      checkbox0001[3] = insrDvCodes.indexOf("0001");
      checkbox0001[4] = insrDvCodes.indexOf("0002");
      checkbox0001[5] = insrDvCodes.indexOf("0003");
    }
    console.log('checkbox0001 :>> ', checkbox0001);

    let isSubmitUpdate = false;
    if (
      addOptDvCodes.length > 0 &&
      insrDvCodes.length > 0 &&
      siteArea !== '' &&
      bldgArea !== '' &&
      totalArea !== '' &&
      prvtArea !== '' &&
      cmnArea !== ''
    ) {
      isSubmitUpdate = true;
    }
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
                ? '추가 정보 수정'
                : '추가 정보'
            }
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleBody}>
              <Text style={DefaultStyle._textTitleBody}>추가 정보</Text>
            </View>
            <View style>
              {/**
              <Select
                data={dataSelect}
                labelSelected="준공일"
                colorLabel="#000000"
              />
             */}
              <View style={{ flex: 1, marginBottom: 18 }}>
                <TouchableOpacity
                  onPress={this.showDatepicker}
                  style={DefaultStyle._btnDate}>
                  <Text style={DefaultStyle._textDate}>
                  {console.log("======> toLocaleDateString: ", from.toLocaleDateString())}

                    {from.toLocaleDateString()}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000' },
                    ]}>
                    준공일
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
              <TextField
                labelTextField="건축면적"
                textRight="평"
                placeholder="0"
                defaultValue={bldgArea ? numberToStd(bldgArea) : ''}
                colorLabel="#000000"
                value={bldgArea}
                valueProps={e => {
                  this.setState({ bldgArea: stdToNumber(e) });
                }}
              />
              <TextField
                labelTextField="대지면적"
                textRight="평"
                placeholder="0"
                defaultValue={siteArea ? numberToStd(siteArea) : ''}
                colorLabel="#000000"
                value={siteArea}
                valueProps={e => {
                  this.setState({ siteArea: stdToNumber(e) });
                }}
              />
              <TextField
                labelTextField="연면적"
                textRight="평"
                placeholder="0"
                defaultValue={totalArea ? numberToStd(totalArea) : ''}
                colorLabel="#000000"
                value={totalArea}
                valueProps={e => {
                  this.setState({ totalArea: stdToNumber(e) });
                }}
              />
              <TextField
                labelTextField="전용면적"
                textRight="평"
                placeholder="0"
                defaultValue={prvtArea ? numberToStd(prvtArea) : ''}
                colorLabel="#000000"
                value={prvtArea}
                valueProps={e => {
                  this.setState({ prvtArea: stdToNumber(e) });
                }}
              />
              <TextField
                labelTextField="공용면적"
                textRight="평"
                placeholder="0"
                defaultValue={cmnArea ? numberToStd(cmnArea) : ''}
                colorLabel="#000000"
                value={cmnArea}
                valueProps={e => {
                  this.setState({ cmnArea: stdToNumber(e) });
                }}
              />
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleBody}>
              <Text style={[DefaultStyle._textTitleBody]}>
                추가옵션
              </Text>
            </View>
            <View style={S.options}>
              <View style={S.optionCheck}>
                {console.log("addOptDvCodes[0]: ", addOptDvCodes[0], addOptDvCodes[1], addOptDvCodes[2])}
                <Checkbox
                  status={checkbox0001[0] > -1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    addOptDvCodes[0] === '0001'
                      ? this.setState({ ...(addOptDvCodes[0] = '') })
                      : this.setState({ ...(addOptDvCodes[0] = '0001') });
                  }}
                />
                <Text style={S.labelCheck}>보세</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkbox0001[1] > -1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // this.setState({ checkMedicine: !checkMedicine });
                    addOptDvCodes[1] === '0002'
                      ? this.setState({ ...(addOptDvCodes[1] = '') })
                      : this.setState({ ...(addOptDvCodes[1] = '0002') });
                  }}
                />
                <Text style={S.labelCheck}>의약품</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkbox0001[2] > -1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // this.setState({ checkDanger: !checkDanger });
                    addOptDvCodes[2] === '0003'
                      ? this.setState({ ...(addOptDvCodes[2] = '') })
                      : this.setState({ ...(addOptDvCodes[2] = '0003') });
                  }}
                />
                <Text style={S.labelCheck}>위험물</Text>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._body}>
            <View style={DefaultStyle._titleBody}>
              <Text style={DefaultStyle._textTitleBody}>보험 가입 여부</Text>
            </View>
            <View style={[S.options, S.optionsFooter]}>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkbox0001[3] > -1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // this.setState({ checkBuilding: !checkBuilding });
                    insrDvCodes[0] === '0001'
                      ? this.setState({ ...(insrDvCodes[0] = '') })
                      : this.setState({ ...(insrDvCodes[0] = '0001') });
                  }}
                />
                <Text style={S.labelCheck}>건물보험</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkbox0001[4] > -1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // this.setState({ checkInventory: !checkInventory });
                    insrDvCodes[1] === '0002'
                      ? this.setState({ ...(insrDvCodes[1] = '') })
                      : this.setState({ ...(insrDvCodes[1] = '0002') });
                  }}
                />
                <Text style={S.labelCheck}>재고보험</Text>
              </View>
              <View style={S.optionCheck}>
                <Checkbox
                  status={checkbox0001[5] > -1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // this.setState({ checkCompensation: !checkCompensation });
                    insrDvCodes[2] === '0003'
                      ? this.setState({ ...(insrDvCodes[2] = '') })
                      : this.setState({ ...(insrDvCodes[2] = '0003') });
                  }}
                />
                <Text style={S.labelCheck}>영업배상보험</Text>
              </View>
            </View>
            <TouchableOpacity
              disabled={isSubmitUpdate === true ? false : true}
              onPress={() => {
                this.navigation.navigate('RegisterWH', {
                  completeMoreInfo: true,
                });
                this.props.updateInfo({
                  addOptDvCodess,
                  insrDvCodes,
                  cmpltYmd,
                  siteArea,
                  bldgArea,
                  totalArea,
                  prvtArea,
                  cmnArea,
                });
              }}
              style={[
                DefaultStyle.btnSubmit,
                isSubmitUpdate === true ? DefaultStyle.activeBtnSubmit : null,
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  isSubmitUpdate === true
                    ? DefaultStyle.textActiveSubmit
                    : null,
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
    imageStore: state.registerWH.pimages,
    dataMoreInfo: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
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
