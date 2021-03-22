/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Text,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../style';
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';
import { MyPage } from '@Services/apis';
import { toSquareMeter, toPyeong } from '@Services/utils/unit';

class RegisterMoreInfo extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      isSelected: false,
      toggleCheckBox: false,
      addOptDvCodes:
        props.dataMoreInfo && props.dataMoreInfo.addOptDvCodes
          ? props.dataMoreInfo.addOptDvCodes
          : [],
      insrDvCodes:
        props.dataMoreInfo && props.dataMoreInfo.insrDvCodes
          ? props.dataMoreInfo.insrDvCodes
          : [],
      cmpltYmd:
        props.dataMoreInfo && props.dataMoreInfo.cmpltYmd
          ? props.dataMoreInfo.cmpltYmd
          : new Date().getTime(),
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

  onChangeFrom = selectedDate => {
    const currentDate = selectedDate || this.state.from;
    let d = new Date(selectedDate).getTime();

    this.setState({ from: currentDate, showFrom: false, cmpltYmd: d });
  };

  render () {
    const { imageStore, route, dataMoreInfo } = this.props;
    const {
      addOptDvCodes,
      insrDvCodes,
      cmpltYmd,
      siteArea,
      siteArea2,
      bldgArea,
      bldgArea2,
      totalArea,
      totalArea2,
      prvtArea,
      prvtArea2,
      cmnArea,
      cmnArea2,
      from,
      showFrom,
      addOptDvCodesData,
      insrDvCodeData,
    } = this.state;

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
    // console.log('checkbox0001 :>> ', checkbox0001);

    let isSubmitUpdate = true;
    // if (
    //   addOptDvCodes.length > 0 &&
    //   insrDvCodes.length > 0 &&
    //   siteArea !== '' &&
    //   bldgArea !== '' &&
    //   totalArea !== '' &&
    //   prvtArea !== '' &&
    //   cmnArea !== ''
    // ) {
    //   isSubmitUpdate = true;
    // }
    let viewOptionMore =
      addOptDvCodesData &&
      addOptDvCodesData.map((item, index) => {
        let checkItem = addOptDvCodes.find(el => el === item.value);
        return (
          <View style={S.optionCheck}>
            <CheckBox
              tintColors={{ true: '#ff6d00' }}
              onCheckColor="#ff6d00"
              onTintColor="#ff6d00"
              boxType="square"
              value={checkItem ? true : false}
              onValueChange={() => {
                let indexItem = addOptDvCodes.indexOf(item.value);
                indexItem > -1
                  ? this.setState({ ...addOptDvCodes.splice(indexItem, 1) })
                  : this.setState({ ...addOptDvCodes.push(item.value) });
              }}
            />
            {
              // <Checkbox
              //   status={checkItem ? 'checked' : 'unchecked'}
              //   onPress={() => {
              //     let indexItem = addOptDvCodes.indexOf(item.value);
              //     indexItem > -1
              //       ? this.setState({ ...addOptDvCodes.splice(indexItem, 1) })
              //       : this.setState({ ...addOptDvCodes.push(item.value) });
              //   }}
              // />
            }
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
            <CheckBox
              tintColors={{ true: '#ff6d00' }}
              onCheckColor="#ff6d00"
              onTintColor="#ff6d00"
              boxType="square"
              value={checkItem ? true : false}
              onValueChange={() => {
                let indexItem = insrDvCodes.indexOf(item.value);
                indexItem > -1
                  ? this.setState({ ...insrDvCodes.splice(indexItem, 1) })
                  : this.setState({ ...insrDvCodes.push(item.value) });
              }}
            />
            {
              // <Checkbox
              //   style={{ border: 'red', width: 50 }}
              //   status={checkItem ? 'checked' : 'unchecked'}
              //   onPress={() => {
              //     let indexItem = insrDvCodes.indexOf(item.value);
              //     indexItem > -1
              //       ? this.setState({ ...insrDvCodes.splice(indexItem, 1) })
              //       : this.setState({ ...insrDvCodes.push(item.value) });
              //   }}
              // />
            }
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
        <ScrollView style={[DefaultStyle.backgroundGray, { marginBottom: 100, }]}>
          <View>
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
                      {from.toLocaleDateString()}
                    </Text>
                    <Text
                      style={[
                        DefaultStyle._labelTextField,
                        { color: '#000000' },
                      ]}>
                      준공일
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
                    />
                  </TouchableOpacity>
                </View>
                <View style={DefaultStyle._listElement}>
                  <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                    <TextField
                      labelTextField="건축면적"
                      textRight="평"
                      defaultValue={
                        bldgArea ? numberToStd(toPyeong(bldgArea)) : ''
                      }
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let value = e.replace(/[^0-9]/g, '');
                        let valueCover = toSquareMeter(value);
                        this.setState({
                          bldgArea2: stdToNumber(value),
                          bldgArea: stdToNumber(valueCover),
                        });
                      }}
                      value={bldgArea2 && numberToStd(bldgArea2)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  <View style={DefaultStyle._element}>  
                    <TextField
                      labelTextField="건축면적"
                      textRight="m2"
                      defaultValue={bldgArea ? numberToStd(bldgArea) : '0'}
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let text = e.replace(/[^0-9]/g, '');
                        let value = stdToNumber(text);
                        let valueCover = toPyeong(value);
                        this.setState({
                          bldgArea2: stdToNumber(valueCover),
                          bldgArea: stdToNumber(text),
                        });
                        // let dataF = bldgArea;
                        // dataF.flrArea = ;
                        // valueForm && valueForm(dataF);
                      }}
                      value={bldgArea && numberToStd(bldgArea)}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                  
                </View>

                <View style={DefaultStyle._listElement}>
                  <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                  
                    <TextField
                      labelTextField="대지면적"
                      textRight="평"
                      defaultValue={
                        siteArea ? numberToStd(toPyeong(siteArea)) : ''
                      }
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let value = e.replace(/[^0-9]/g, '');
                        let valueCover = toSquareMeter(value);
                        this.setState({
                          siteArea2: stdToNumber(value),
                          siteArea: stdToNumber(valueCover),
                        });
                      }}
                      value={siteArea2 && numberToStd(siteArea2)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  <View style={DefaultStyle._element}>
                    <TextField
                      labelTextField="대지면적"
                      textRight="m2"
                      defaultValue={siteArea ? numberToStd(siteArea) : '0'}
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let text = e.replace(/[^0-9]/g, '');
                        let value = stdToNumber(text);
                        let valueCover = toPyeong(value);
                        this.setState({
                          siteArea2: stdToNumber(valueCover),
                          siteArea: stdToNumber(text),
                        });
                        // let dataF = siteArea;
                        // dataF.flrArea = ;
                        // valueForm && valueForm(dataF);
                      }}
                      value={siteArea && numberToStd(siteArea)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  
                </View>

                <View style={DefaultStyle._listElement}>
                  <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                    <TextField
                      labelTextField="연면적"
                      textRight="평"
                      defaultValue={
                        totalArea ? numberToStd(toPyeong(totalArea)) : ''
                      }
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let value = e.replace(/[^0-9]/g, '');
                        let valueCover = toSquareMeter(value);
                        this.setState({
                          totalArea2: stdToNumber(value),
                          totalArea: stdToNumber(valueCover),
                        });
                      }}
                      value={totalArea2 && numberToStd(totalArea2)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  <View style={DefaultStyle._element}>
                    <TextField
                      labelTextField="연면적"
                      textRight="m2"
                      defaultValue={totalArea ? numberToStd(totalArea) : '0'}
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let text = e.replace(/[^0-9]/g, '');
                        let value = stdToNumber(text);
                        let valueCover = toPyeong(value);
                        this.setState({
                          totalArea2: stdToNumber(valueCover),
                          totalArea: stdToNumber(text),
                        });
                        // let dataF = totalArea;
                        // dataF.flrArea = ;
                        // valueForm && valueForm(dataF);
                      }}
                      value={totalArea && numberToStd(totalArea)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  
                </View>

                <View style={DefaultStyle._listElement}>
                  
                  <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                    <TextField
                      labelTextField="전용면적"
                      textRight="평"
                      defaultValue={
                        prvtArea ? numberToStd(toPyeong(prvtArea)) : ''
                      }
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let value = e.replace(/[^0-9]/g, '');
                        let valueCover = toSquareMeter(value);
                        this.setState({
                          prvtArea2: stdToNumber(value),
                          prvtArea: stdToNumber(valueCover),
                        });
                      }}
                      value={prvtArea2 && numberToStd(prvtArea2)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  <View style={DefaultStyle._element}>
                    <TextField
                      labelTextField="전용면적"
                      textRight="m2"
                      defaultValue={prvtArea ? numberToStd(prvtArea) : '0'}
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let text = e.replace(/[^0-9]/g, '');
                        let value = stdToNumber(text);
                        let valueCover = toPyeong(value);
                        this.setState({
                          prvtArea2: stdToNumber(valueCover),
                          prvtArea: stdToNumber(text),
                        });
                        // let dataF = prvtArea;
                        // dataF.flrArea = ;
                        // valueForm && valueForm(dataF);
                      }}
                      value={prvtArea && numberToStd(prvtArea)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                </View>

                <View style={DefaultStyle._listElement}>
                  
                  <View style={[DefaultStyle._element, { marginRight: 12 }]}>
                    <TextField
                      labelTextField="공용면적"
                      textRight="평"
                      defaultValue={
                        cmnArea ? numberToStd(toPyeong(cmnArea)) : ''
                      }
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let value = e.replace(/[^0-9]/g, '');
                        let valueCover = toSquareMeter(value);
                        this.setState({
                          cmnArea2: stdToNumber(value),
                          cmnArea: stdToNumber(valueCover),
                        });
                      }}
                      value={cmnArea2 && numberToStd(cmnArea2)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                  <View style={DefaultStyle._element}>
                    <TextField
                      labelTextField="공용면적"
                      textRight="m2"
                      defaultValue={cmnArea ? numberToStd(cmnArea) : '0'}
                      placeholder="0"
                      colorLabel="#000000"
                      valueProps={e => {
                        let text = e.replace(/[^0-9]/g, '');
                        let value = stdToNumber(text);
                        let valueCover = toPyeong(value);
                        this.setState({
                          cmnArea2: stdToNumber(valueCover),
                          cmnArea: stdToNumber(text),
                        });
                        // let dataF = cmnArea;
                        // dataF.flrArea = ;
                        // valueForm && valueForm(dataF);
                      }}
                      value={cmnArea && numberToStd(cmnArea)}
                      keyboardType="numeric"
                      maxLength={7}
                    />
                  </View>
                </View>
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
              <View style={[S.options, S.optionsFooter]}>
                {viewInsrDvCodes}
              </View>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
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
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    dataMoreInfo: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterMoreInfo);
