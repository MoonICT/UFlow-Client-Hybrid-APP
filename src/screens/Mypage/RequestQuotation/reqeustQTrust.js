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

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class ReqeustQTrust extends Component {

  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    console.log(props.warehSeq, 'props.warehSeq');

    this.state = {
      fromDate: props.from ? Moment(props.from).toDate() : new Date(),
      toDate: props.to ? Moment(props.to).toDate() : new Date(),
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
    this.setState({
      fromDate: selectedDate,
      showFrom: false,
    });
    // this.setState({
    //   formData: {
    //     ...this.state.formData,
    //     from: Moment(selectedDate).isValid() ? Moment(selectedDate).format('YYYY-MM-DD') : '',
    //   }, showFrom: false
    // });
  };

  onChangeTo = (selectedDate) => {
    this.setState({
      toDate: selectedDate,
      showTo: false,
    });
    // this.setState({
    //   formData: {
    //     ...this.state.formData,
    //     to: Moment(selectedDate).isValid() ? Moment(selectedDate).format('YYYY-MM-DD') : '',
    //   }, showTo: false
    // });
  };

  render() {

    const {
      showFrom,
      showTo,
      isSubmit,
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
      remark
    } = this.state.formData;

    // console.log(psnChrg, 'psnChrg 11');

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
              {this.state.fromDate ? Moment(this.state.fromDate).format('YYYY.MM.DD') : ''}
              {/*{from ? Moment(this.state.formData.from).format('YYYY.MM.DD') : ''}*/}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                {color: '#000000'},
              ]}>
              {getMsg(this.props.lang, 'ML0632', '수탁기간 시작일')}
              <Text style={[
                {color: 'red'}
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showFrom}
              date={this.state.fromDate}
              // date={from ? Moment(this.state.formData.from).toDate() : new Date()}
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
              {this.state.toDate ? Moment(this.state.toDate).format('YYYY.MM.DD') : ''}
              {/*{to ? Moment(this.state.formData.to).format('YYYY.MM.DD') : ''}*/}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                {color: '#000000'},
              ]}>
              {getMsg(this.props.lang, 'ML0631', '수탁기간 종료일')}
              <Text style={[
                {color: 'red'}
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showTo}
              date={this.state.toDate}
              // date={to ? Moment(this.state.formData.to).toDate() : new Date()}
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
        labelTextField={getMsg(this.props.lang, 'ML0630', '수탁 요청 수량')}
        keyboardType="numeric"
        placeholder={"0"}
        defaultValue={
          rntlValue ? String(rntlValue) : '0'
        }

        isRequired={true}
        value={rntlValue}
        onChangeText={e => {
          let value = e.replace(/[^0-9]/g, '').replace(/(^0+)/, "");
          this.setState({
            formData: {
              ...this.state.formData,
              rntlValue: value
            }
          });

        }}
        maxLength={7}
      />

      {/** 보관 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField={getMsg(this.props.lang, 'ML0149', '보관단가')}
        textRight={getMsg(this.props.lang, 'ML0126', '원')}
        keyboardType="numeric"
        defaultValue={
          splyAmount ? String(splyAmount) : '0'
        }
        placeholder="0"
        isRequired={true}
        value={splyAmount}
        onChangeText={e =>{
          let value = e.replace(/[^0-9]/g, '').replace(/(^0+)/, "");
          this.setState({
            formData: {
              ...this.state.formData,
              splyAmount: value
            }
          })
        }
        }
        maxLength={7}
      />
      {/** 입고 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField={getMsg(this.props.lang, 'ML0150', '입고단가')}
        textRight={getMsg(this.props.lang, 'ML0126', '원')}
        keyboardType="numeric"
        defaultValue={
          whinChrg ? String(whinChrg) : '0'
        }
        placeholder="0"
        isRequired={true}
        value={whinChrg}
        onChangeText={e => {
          let value = e.replace(/[^0-9]/g, '').replace(/(^0+)/, "");
          this.setState({
            formData: {
              ...this.state.formData,
              whinChrg: value
            }
          })
        }

        }
        maxLength={7}
      />
      {/** 출고 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField={getMsg(this.props.lang, 'ML0151', '출고단가')}
        textRight={getMsg(this.props.lang, 'ML0126', '원')}
        keyboardType="numeric"
        defaultValue={
          whoutChrg ? String(whoutChrg) : '0'
        }
        placeholder="0"
        isRequired={true}
        value={whoutChrg}
        onChangeText={e => {
          let value = e.replace(/[^0-9]/g, '').replace(/(^0+)/, "");
          this.setState({
            formData: {
              ...this.state.formData,
              whoutChrg: value
            }
          })
        }

        }
        maxLength={7}
      />
      {/** 인건 단가 **/}

      {/*<TextField*/}
        {/*colorLabel="#000000"*/}
        {/*labelTextField="인건단가"*/}
        {/*keyboardType="numeric"*/}
        {/*defaultValue={*/}
          {/*psnChrg ? String(psnChrg) : '0'*/}
        {/*}*/}
        {/*textRight="원"*/}
        {/*placeholder="0"*/}
        {/*onChangeText={e =>*/}
          {/*this.setState({*/}
            {/*formData: {*/}
              {/*...this.state.formData,*/}
              {/*psnChrg: Number(e.replace(/[^0-9]/g), '')*/}
            {/*}*/}
          {/*})*/}
        {/*}*/}
      {/*/>*/}
      {/** 가공 단가 **/}
      {/*<TextField*/}
        {/*colorLabel="#000000"*/}
        {/*labelTextField="가공단가"*/}
        {/*textRight="원"*/}
        {/*keyboardType="numeric"*/}
        {/*defaultValue={*/}
          {/*mnfctChrg ? String(mnfctChrg) : '0'*/}
        {/*}*/}
        {/*placeholder="0"*/}
        {/*onChangeText={e =>*/}
          {/*this.setState({*/}
            {/*formData: {*/}
              {/*...this.state.formData,*/}
              {/*mnfctChrg: Number(e.replace(/[^0-9]/g), '')*/}
            {/*}*/}
          {/*})*/}
        {/*}*/}
      {/*/>*/}
      {/** 택배 단가 **/}
      {/*<TextField*/}
        {/*colorLabel="#000000"*/}
        {/*labelTextField="택배단가"*/}
        {/*textRight="원"*/}
        {/*keyboardType="numeric"*/}
        {/*defaultValue={*/}
          {/*dlvyChrg ? String(dlvyChrg) : '0'*/}
        {/*}*/}
        {/*placeholder="0"*/}
        {/*onChangeText={e =>*/}
          {/*this.setState({*/}
            {/*formData: {*/}
              {/*...this.state.formData,*/}
              {/*dlvyChrg: Number(e.replace(/[^0-9]/g), '')*/}
            {/*}*/}
          {/*})*/}
        {/*}*/}
      {/*/>*/}
      {/** 운송 단가 **/}
      {/*<TextField*/}
        {/*colorLabel="#000000"*/}
        {/*labelTextField="운송단가"*/}
        {/*textRight="원"*/}
        {/*keyboardType="numeric"*/}
        {/*defaultValue={*/}
          {/*shipChrg ? String(shipChrg) : '0'*/}
        {/*}*/}
        {/*placeholder="0"*/}
        {/*onChangeText={e =>*/}
          {/*this.setState({*/}
            {/*formData: {*/}
              {/*...this.state.formData,*/}
              {/*shipChrg: Number(e.replace(/[^0-9]/g), '')*/}
            {/*}*/}
          {/*})*/}
        {/*}*/}
      {/*/>*/}
      {/** 추가 요청 사항 **/}
      <TextField
        colorLabel="#000000"
        labelTextField={getMsg(this.props.lang, 'ML0626', '추가 요청 사항')}
        placeholder={getMsg(this.props.lang, 'ML0625', '내용을 입력하세요.')}
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
            alert(getMsg(this.props.lang, 'ML0624', '필수값을 모두 입력하세요.'))
            return;
          }

          let formData = this.state.formData;


          // TODO 유효성 검사
          if (formData.rntlValue > this.props.rntlValue) {
            // alert(`수탁 요수량은 ${this.props.rntlValue} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.splyAmount <= 0) {
            alert(getMsg(this.props.lang, 'ML0623', '보관단가는 0이상으로 요청가능합니다.'));
            return;
          } else if (formData.splyAmount > this.props.splyAmount) {
            // alert(`보관단가는 ${this.props.splyAmount} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.whinChrg <= 0) {
            alert(getMsg(this.props.lang, 'ML0622', '입고단가는 0이상으로 요청가능합니다.'));
            return;
          } else if (formData.whinChrg > this.props.whinChrg) {
            // alert(`입고단가는 ${this.props.whinChrg} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.whoutChrg <= 0) {
            alert(getMsg(this.props.lang, 'ML0621', '출고단가는 0이상으로 요청가능합니다.'));
            return;
          } else if (formData.whoutChrg > this.props.whoutChrg) {
            // alert(`출고단가는 ${this.props.whoutChrg} 이하로 요청가능합니다.`);
            // return;
          }

          // formData.to = formData.to ? Moment(formData.to).format('x') : null;
          // formData.from = formData.from ? Moment(formData.from).format('x') : null;

          formData = {
            warehouseRegNo: this.props.warehouseRegNo,
            seq: this.props.warehSeq,
            from: this.state.fromDate ? Moment(this.state.fromDate).format('x') : null,
            to: this.state.toDate ? Moment(this.state.toDate).format('x') : null,
            // from: formData.from,
            // to: formData.to,
            rntlValue: formData.rntlValue,
            splyAmount: formData.splyAmount,
            whinChrg: formData.whinChrg,
            whoutChrg: formData.whoutChrg,
            // psnChrg: formData.psnChrg,
            // mnfctChrg: formData.mnfctChrg,
            // dlvyChrg: formData.dlvyChrg,
            // shipChrg: formData.shipChrg,
            remark: formData.remark
          };

          console.log(formData, 'formData');

          Warehouse.responQuotation({
            type: `tenant/warehouse/${formData.warehouseRegNo}/trust/${formData.seq}`,
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
                alert(getMsg(this.props.lang, 'ML0620', '견적요청이 완료되었습니다.'));
                // this.props.navigation.goBack();
                this.props.navigation.push('Mypage', {
                  title: getMsg(this.props.lang, 'ML0250', '견적･계약 관리'),
                  tab: 'Mypage_cntr',
                  prevView: 'PrevView',
                })
              }
            })
            .catch(err => {
              console.log('err.response :>> ', err.response);
              let message = err.response && err.response.data.message;
              alert(message);
            });

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
          {getMsg(this.props.lang, 'ML0100', '확인')}
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

export default ReqeustQTrust;
