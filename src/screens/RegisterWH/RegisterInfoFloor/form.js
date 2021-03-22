/**
 * @create
 * @modify
 * @desc [description]
 */
// Global Imports
import React, { Component } from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
// Local Imports
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';
import { styles as S } from '../style';
import { toSquareMeter, toPyeong } from '@Services/utils/unit';
import { stdToNumber, numberToStd } from '@Services/utils/StringUtils';

class FormInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: 'Profile Photo', confirm: false, value: 1 };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { formData, valueForm, flrDvCodes, aprchMthdDvCodes } = this.props;
    // console.log('formData :>> ', formData);
    const {
      flrAreaValue2,
      parkAreaValue2,
      opcAreaValue2,
      prvtAreaValue2,
      cmnAreaValue2,
      flrHi,
      efctvHi,
      dockQty,
    } = this.state;

    let defaultFlrDvCode =
      flrDvCodes && flrDvCodes.find(item => item.value === formData.flrDvCode);
    let defaultAprchMthdDvCodes =
      aprchMthdDvCodes &&
      aprchMthdDvCodes.find(item => item.value === formData.aprchMthdDvCode);
    // console.log(defaultFlrDvCode, 'defaultFlrDvCode');
    return (
      <Card style={[S.cards]}>
        <View style>
          <Select
            data={flrDvCodes}
            valueSelected={
              defaultFlrDvCode !== undefined ? defaultFlrDvCode.label : ''
            }
            dataDefault={defaultFlrDvCode !== undefined ? defaultFlrDvCode : ''}
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
                placeholder="0"
                textRight="평"
                defaultValue={
                  formData.flrArea
                    ? numberToStd(toPyeong(formData.flrArea))
                    : ''
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
                value={formData.flrArea === '' ? '' : flrAreaValue2}
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="층면적"
                textRight="m2"
                placeholder="0"
                defaultValue={
                  formData.flrArea ? numberToStd(formData.flrArea) : ''
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
                value={flrAreaValue2 === '' ? '' : formData.flrArea}
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            
          </View>

          <View style={DefaultStyle._listElement}>
            
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="주차면적"
                defaultValue={
                  formData.parkArea
                    ? numberToStd(toPyeong(formData.parkArea))
                    : ''
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
                value={formData.parkArea === '' ? '' : parkAreaValue2}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="주차면적"
                defaultValue={
                  formData.parkArea ? numberToStd(formData.parkArea) : ''
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
                value={flrAreaValue2 === '' ? '' : formData.parkArea}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
          </View>

          <View style={DefaultStyle._listElement}>
            
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="사무실면적"
                defaultValue={
                  formData.opcArea
                    ? numberToStd(toPyeong(formData.opcArea))
                    : ''
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
                value={formData.opcArea === '' ? '' : opcAreaValue2}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="사무실면적"
                defaultValue={
                  formData.opcArea ? numberToStd(formData.opcArea) : ''
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
                value={opcAreaValue2 === '' ? '' : formData.opcArea}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
          </View>

          <View style={DefaultStyle._listElement}>
            
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="전용면적"
                defaultValue={
                  formData.prvtArea
                    ? numberToStd(toPyeong(formData.prvtArea))
                    : ''
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
                value={formData.prvtArea === '' ? '' : prvtAreaValue2}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="전용면적"
                defaultValue={
                  formData.prvtArea ? numberToStd(formData.prvtArea) : ''
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
                value={prvtAreaValue2 === '' ? '' : formData.prvtArea}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
          </View>

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
                colorLabel="#000000"
                valueProps={e => {
                  let value = parseInt(e.replace(/[^0-9]/g, ''));
                  let valueCover = toSquareMeter(value);
                  this.setState({ cmnAreaValue2: e.replace(/[^0-9]/g, '') });
                  let dataF = formData;
                  dataF.cmnArea = stdToNumber(valueCover);
                  valueForm && valueForm(dataF);
                }}
                value={formData.cmnArea === '' ? '' : cmnAreaValue2}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            <View style={DefaultStyle._element}>
              <TextField
                labelTextField="공용면적"
                defaultValue={
                  formData.cmnArea ? numberToStd(formData.cmnArea) : ''
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
                value={cmnAreaValue2 === '' ? '' : formData.cmnArea}
                placeholder="0"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
          </View>

          <TextField
            labelTextField="층고"
            defaultValue={formData.flrHi ? numberToStd(formData.flrHi) : ''}
            value={flrHi}
            placeholder="0"
            keyboardType="numeric"
            colorLabel="#000000"
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ flrHi: text });
              let dataF = formData;
              dataF.flrHi = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
            maxLength={5}
          />
          <TextField
            labelTextField="유효고"
            defaultValue={formData.efctvHi ? numberToStd(formData.efctvHi) : ''}
            value={efctvHi}
            placeholder="0"
            keyboardType="numeric"
            colorLabel="#000000"
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ efctvHi: text });
              let dataF = formData;
              dataF.efctvHi = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
            maxLength={5}
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
            data={aprchMthdDvCodes}
            colorLabel="#000000"
            dataDefault={
              defaultAprchMthdDvCodes !== undefined
                ? defaultAprchMthdDvCodes
                : ''
            }
            valueSelected={
              defaultAprchMthdDvCodes !== undefined
                ? defaultAprchMthdDvCodes.label
                : ''
            }
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
            keyboardType="numeric"
            value={dockQty}
            valueProps={e => {
              let text = e.replace(/[^0-9]/g, '');
              this.setState({ dockQty: text });
              let dataF = formData;
              dataF.dockQty = text !== '' ? stdToNumber(text) : '';
              valueForm && valueForm(dataF);
            }}
            maxLength={5}
          />
        </View>
      </Card>
    );
  }
}

export default FormInfo;
