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
import { MyPage } from '@Services/apis';

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
      addOptDvCodesData,
      insrDvCodeData,
    } = this.state;
    console.log('dataMoreInfo :>> ', dataMoreInfo);

    let checkbox0001 = [-1, -1, -1, -1, -1, -1];

    if (addOptDvCodes.length > 0) {
      checkbox0001[0] = addOptDvCodes.indexOf('0001');
      checkbox0001[1] = addOptDvCodes.indexOf('0002');
      checkbox0001[2] = addOptDvCodes.indexOf('0003');
    }

    if (insrDvCodes.length > 0) {
      checkbox0001[3] = insrDvCodes.indexOf('0001');
      checkbox0001[4] = insrDvCodes.indexOf('0002');
      checkbox0001[5] = insrDvCodes.indexOf('0003');
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
    console.log('addOptDvCodes :>> ', addOptDvCodes);
    let viewOptionMore =
      addOptDvCodesData &&
      addOptDvCodesData.map((item, index) => {
        let checkItem = addOptDvCodes.find(el => el === item.value);

        return (
          <View style={S.optionCheck}>
            <Checkbox
              status={checkItem ? 'checked' : 'unchecked'}
              onPress={() => {
                let indexItem = addOptDvCodes.indexOf(item.value);
                indexItem > -1
                  ? this.setState({ ...addOptDvCodes.splice(indexItem, 1) })
                  : this.setState({ ...addOptDvCodes.push(item.value) });
              }}
            />
            <Text style={S.labelCheck}>{item.label}</Text>
          </View>
        );
      });
    let viewInsrDvCodes =
      insrDvCodeData &&
      insrDvCodeData.map((item, index) => {
        let checkItem = insrDvCodes.find(el => el === item.value);

        return (
          <View style={S.optionCheck}>
            <Checkbox
              status={checkItem ? 'checked' : 'unchecked'}
              onPress={() => {
                let indexItem = insrDvCodes.indexOf(item.value);
                indexItem > -1
                  ? this.setState({ ...insrDvCodes.splice(indexItem, 1) })
                  : this.setState({ ...insrDvCodes.push(item.value) });
              }}
            />
            <Text style={S.labelCheck}>{item.label}</Text>
          </View>
        );
      });
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
                    {console.log(
                      '======> toLocaleDateString: ',
                      from.toLocaleDateString(),
                    )}

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
                keyboardType="numeric"
                value={numberToStd(bldgArea)}
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  this.setState({ bldgArea: stdToNumber(text) });
                }}
              />
              <TextField
                labelTextField="대지면적"
                textRight="평"
                placeholder="0"
                defaultValue={siteArea ? numberToStd(siteArea) : ''}
                colorLabel="#000000"
                keyboardType="numeric"
                value={numberToStd(siteArea)}
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  this.setState({ siteArea: stdToNumber(text) });
                }}
              />
              <TextField
                labelTextField="연면적"
                textRight="평"
                placeholder="0"
                defaultValue={totalArea ? numberToStd(totalArea) : ''}
                colorLabel="#000000"
                keyboardType="numeric"
                value={numberToStd(totalArea)}
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  this.setState({ totalArea: stdToNumber(text) });
                }}
              />
              <TextField
                labelTextField="전용면적"
                textRight="평"
                placeholder="0"
                defaultValue={prvtArea ? numberToStd(prvtArea) : ''}
                colorLabel="#000000"
                keyboardType="numeric"
                value={numberToStd(prvtArea)}
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  this.setState({ prvtArea: stdToNumber(text) });
                }}
              />
              <TextField
                labelTextField="공용면적"
                textRight="평"
                placeholder="0"
                defaultValue={cmnArea ? numberToStd(cmnArea) : ''}
                colorLabel="#000000"
                keyboardType="numeric"
                value={numberToStd(cmnArea)}
                valueProps={e => {
                  let text = e.replace(/[^0-9]/g, '');
                  this.setState({ cmnArea: stdToNumber(text) });
                }}
              />
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleBody}>
              <Text style={[DefaultStyle._textTitleBody]}>추가옵션</Text>
            </View>
            <View style={S.options}>{viewOptionMore}</View>
          </View>

          <View style={DefaultStyle._body}>
            <View style={DefaultStyle._titleBody}>
              <Text style={DefaultStyle._textTitleBody}>보험 가입 여부</Text>
            </View>
            <View style={[S.options, S.optionsFooter]}>{viewInsrDvCodes}</View>
            <TouchableOpacity
              disabled={isSubmitUpdate === true ? false : true}
              onPress={() => {
                this.navigation.navigate('RegisterWH', {
                  completeMoreInfo: true,
                });
                this.props.updateInfo({
                  addOptDvCodes,
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
    await MyPage.getDetailCodes('WHRG0008')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;
          let addOptDvCodesData =
            data &&
            data.map((item, index) => {
              return {
                label: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ addOptDvCodesData });
        }
      })
      .catch(err => {
        console.log('errAddOptDvCodesData', err);
      });
    await MyPage.getDetailCodes('WHRG0009')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;
          console.log('datasssssssssssssss :>> ', data);
          let insrDvCodeData =
            data &&
            data.map((item, index) => {
              return {
                label: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ insrDvCodeData });
        }
      })
      .catch(err => {
        console.log('errInsrDvCodeData', err);
      });
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
