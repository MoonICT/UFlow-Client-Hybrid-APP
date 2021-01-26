import React, {Component, Fragment} from 'react';
import {TouchableOpacity, View} from "react-native";
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import {Text} from "react-native-paper";
import {styles as S} from "../style";
import {styles as SS} from "./style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import {Warehouse} from '@Services/apis';
import {StringUtils, DeepLogs} from '@Services/utils';
import moment from "moment";
class ResponseQTrust extends Component {

  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    console.log(props.warehSeq, 'props.warehSeq');

    this.state = {
      fromMinDate: props.from ? Moment(props.from).toDate() : null,
      toMaxDate: props.to ? Moment(props.to).toDate() : null,
      formData: {
        from: props.from ? Moment(props.from).toDate() : null,
        to: props.to ? Moment(props.to).toDate() : null,
        rntlValue: props.rntlValue,
        splyAmount: props.splyAmount,
        whinChrg: props.whinChrg,
        whoutChrg: props.whoutChrg,
        psnChrg: props.psnChrg,
        mnfctChrg: props.mnfctChrg,
        dlvyChrg: props.dlvyChrg,
        shipChrg: props.shipChrg,
        remark: ''
      }
    }
  }

  showDatepicker = () => {
    this.setState({showFrom: true});
  };

  showDatepickerTo = () => {
    this.setState({showTo: true});
  };

  onChangeFrom = (selectedDate) => {

    console.log(selectedDate, 'onChangeFrom');
    this.setState({
      formData: {
        ...this.state.formData,
        from: Moment(selectedDate).isValid() ? Moment(selectedDate).format('YYYY-MM-DD') : '',
      }, showFrom: false
    });
  };

  onChangeTo = (selectedDate) => {

    console.log(selectedDate, 'onChangeTo');
    this.setState({
      formData: {
        ...this.state.formData,
        to: Moment(selectedDate).isValid() ? Moment(selectedDate).format('YYYY-MM-DD') : '',
      }, showTo: false
    });
  };

  render() {

    const {
      showFrom,
      showTo,
      isSubmit,
      formData
    } = this.state;

    const {
      from,
      to,
      rntlValue,
      splyAmount,
      whinChrg,
      whoutChrg,
      psnChrg,
      mnfctChrg,
      dlvyChrg,
      shipChrg,
    } = this.state.formData;

    console.log(formData, 'formData');

    let isSubmitTrust = false;

    // 유효성 검사
    if (
      from &&
      to &&
      rntlValue &&
      splyAmount &&
      whinChrg &&
      whoutChrg
    ) {
      isSubmitTrust = true;
    }

    // console.log(psnChrg, 'psnChrg');
    let checkRntlValue = false;
    let checkSplyAmount = false;
    let checkWhinChrg = false;
    let checkWhoutChrg = false;
    if (( this.props.rntlValue >= rntlValue)&&(rntlValue>0)){
      checkRntlValue = true;
    }
    if (( this.props.splyAmount >= splyAmount)&&(splyAmount>0)){
      checkSplyAmount = true;
    }
    if (( this.props.whinChrg >= whinChrg)&&(whinChrg>0)){
      checkWhinChrg = true;
    }
    if (( this.props.whoutChrg >= whoutChrg)&&(whoutChrg>0)){
      checkWhoutChrg = true;
    }
    return <Fragment>

      {/** 수탁기간 (필수) **/}
      <View
        style={[
          S.row,
          {justifyContent: 'center', marginBottom: 18},
        ]}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={this.showDatepicker}
            style={DefaultStyle._btnDate}>
            <Text style={DefaultStyle._textDate}>
              {from ? moment(from).format('YYYY.MM.DD') : ''}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                {color: '#000000'},
              ]}>
              수탁기간 시작일
              <Text style={[
                {color: 'red'}
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showFrom}
              date={from ? moment(from).toDate() : new Date()}
              maximumDate={this.state.toMaxDate}
              minimumDate={this.state.fromMinDate}
              onConfirm={(date) => {
                this.onChangeFrom(date);
              }}
              onCancel={() => {
                this.setState({showFrom: false});
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={SS.hyphen}>-</Text>

        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={this.showDatepickerTo}
            style={DefaultStyle._btnDate}>
            <Text style={DefaultStyle._textDate}>
              {to ? moment(to).format('YYYY.MM.DD') : ''}
            </Text>

            <Text
              style={[
                DefaultStyle._labelTextField,
                {color: '#000000'},
              ]}>
              수탁기간 종료일
              <Text style={[
                {color: 'red'}
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showTo}
              date={to ? moment(to).toDate() : new Date()}
              maximumDate={this.state.toMaxDate}
              minimumDate={this.state.fromMinDate}
              onConfirm={(date) => {
                console.log(date, 'date');
                if (date)
                  this.onChangeTo(date);
              }}
              onCancel={() => {
                this.setState({showTo: false});
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/** END:수탁기간 (필수) **/}

      {/** 수탁 요청 수량 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="수탁 요청 수량"
        keyboardType="numeric"
        placeholder={"0"}
        defaultValue={
          rntlValue ? String(rntlValue) : '0'
        }
        textError={ checkRntlValue === true ? null : '단가가 허용범위를 초과했습니다.'}
        isRequired={true}
        onChangeText={e => {
          this.setState({
            formData: {
              ...this.state.formData,
              rntlValue: Number(e.replace(/[^0-9]/g), '')
            }
          });
        }}
      />

      {/** 보관 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="보관단가"
        textRight="원"
        // textError={ checkSplyAmount === true ? null : '단가가 허용범위를 초과했습니다.'}
        keyboardType="numeric"
        defaultValue={
          splyAmount ? String(splyAmount) : '0'
        }
        placeholder="0"
        isRequired={true}
        onChangeText={e =>{
          this.setState({
            formData: {
              ...this.state.formData,
              splyAmount: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }

        }
      />
      {/** 입고 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="입고단가"
        textRight="원"
        keyboardType="numeric"
        defaultValue={
          whinChrg ? String(whinChrg) : '0'
        }
        placeholder="0"
        // textError={ checkWhinChrg === true ? null : '단가가 허용범위를 초과했습니다.'}
        isRequired={true}
        onChangeText={e => {
          this.setState({
            formData: {
              ...this.state.formData,
              whinChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }

        }
      />
      {/** 출고 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="출고단가"
        textRight="원"
        // textError={ checkWhoutChrg === true ? null : '단가가 허용범위를 초과했습니다.'}
        keyboardType="numeric"
        defaultValue={
          whoutChrg ? String(whoutChrg) : '0'
        }
        placeholder="0"
        isRequired={true}
        onChangeText={e => {
          this.setState({
            formData: {
              ...this.state.formData,
              whoutChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }

        }
      />
      {/** 인건 단가 **/}
      {/** 
      <TextField
        colorLabel="#000000"
        labelTextField="인건단가"
        keyboardType="numeric"
        defaultValue={
          psnChrg ? String(psnChrg) : '0'
        }
        textRight="원"
        placeholder="0"
        onChangeText={e =>
          this.setState({
            formData: {
              ...this.state.formData,
              psnChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }
      />
       **/}
      {/** 가공 단가 **/}
      {/** 
      <TextField
        colorLabel="#000000"
        labelTextField="가공단가"
        textRight="원"
        keyboardType="numeric"
        defaultValue={
          mnfctChrg ? String(mnfctChrg) : '0'
        }
        placeholder="0"
        onChangeText={e =>
          this.setState({
            formData: {
              ...this.state.formData,
              mnfctChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }
      />
       **/}
      {/** 택배 단가 **/}
      {/** 
      <TextField
        colorLabel="#000000"
        labelTextField="택배단가"
        textRight="원"
        keyboardType="numeric"
        defaultValue={
          dlvyChrg ? String(dlvyChrg) : '0'
        }
        placeholder="0"
        onChangeText={e =>
          this.setState({
            formData: {
              ...this.state.formData,
              dlvyChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }
      />
       **/}
      {/** 운송 단가 **/}
      {/**
      <TextField
        colorLabel="#000000"
        labelTextField="운송단가"
        textRight="원"
        keyboardType="numeric"
        defaultValue={
          shipChrg ? String(shipChrg) : '0'
        }
        placeholder="0"
        onChangeText={e =>
          this.setState({
            formData: {
              ...this.state.formData,
              shipChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }
      />
       **/}
      {/** 추가 요청 사항 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="추가 요청 사항"
        placeholder="내용입력"
        numberOfLines={5}
        textAlignVertical="top"
        multiline={true}
        styleProps={{height: 100}}
        valueProps={value =>
          this.setState({
            formData: {
              ...this.state.formData,
              remark: value
            }
          })
        }
      />


      <TouchableOpacity
        onPress={() => {
          if (!isSubmitTrust) {
            alert('필수값을 모두 입력하세요.')
            return;
          }

          let formData = this.state.formData;

          console.log(formData, 'formData1')

          // TODO 유효성 검사
          if (formData.rntlValue > this.props.rntlValue) {
            // alert(`수탁요수량은 ${this.props.rntlValue} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.splyAmount <= 0) {
            alert(`보관단가는 0이상으로 요청가능합니다.`);
            return;
          } else if (formData.splyAmount > this.props.splyAmount) {
            // alert(`보관단가는 ${this.props.splyAmount} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.whinChrg <= 0) {
            alert(`입고단가는 0이상으로 요청가능합니다.`);
            return;
          } else if (formData.whinChrg > this.props.whinChrg) {
            // alert(`입고단가는 ${this.props.whinChrg} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.whoutChrg <= 0) {
            alert(`출고단가는 0이상으로 요청가능합니다.`);
            return;
          } else if (formData.whoutChrg > this.props.whoutChrg) {
            // alert(`출고단가는 ${this.props.whoutChrg} 이하로 요청가능합니다.`);
            // return;
          }

          formData.to = formData.to ? Moment(formData.to).format('x') : null;
          formData.from = formData.from ? Moment(formData.from).format('x') : null;

          formData = {
            warehouseRegNo: this.props.warehouseRegNo,
            seq: this.props.warehSeq,
            from: formData.from,
            to: formData.to,
            rntlValue: formData.rntlValue,
            splyAmount: formData.splyAmount,
            whinChrg: formData.whinChrg,
            whoutChrg: formData.whoutChrg,
            psnChrg: formData.psnChrg,
            mnfctChrg: formData.mnfctChrg,
            dlvyChrg: formData.dlvyChrg,
            shipChrg: formData.shipChrg,
            remark: formData.remark
          };

          Warehouse.responQuotation({
            type: `owner/warehouse/${formData.warehouseRegNo}/trust/${formData.seq}/${this.props.rentUserNo}`,
            data: formData,
          })
            .then(res => {
              // const status = res.status;
              console.log('resRespon', res);
              if (res.status === 200) {
                console.log('res', res);

                this.setState({
                  isSubmitTrust: false
                });

                // TODO change illustrator popup
                alert('견적응답이 완료되었습니다.');
                // this.props.navigation.goBack();
                this.props.navigation.navigate('Mypage', {
                  title: '견적･계약 관리',
                })
              }
            })
            .catch(err => {
              let message = err.response && err.response.data.message;
              alert(message);
            });

          console.log(formData, 'formData');
        }}
        style={[
          DefaultStyle._btnInline,
          isSubmitTrust ? null : SS.btnDisabled,
        ]}
        disabled={isSubmitTrust ? false : true}>
        <Text
          style={[
            DefaultStyle._textButton,
            SS.textSubmit,
            isSubmitTrust ? null : SS.textDisabled,
          ]}>
          확인
        </Text>
      </TouchableOpacity>

    </Fragment>;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {
    console.log('::componentDidMount::');
  }
}

export default ResponseQTrust;
