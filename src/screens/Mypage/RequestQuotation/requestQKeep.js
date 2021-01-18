import React, { Component, Fragment } from 'react';
import { TouchableOpacity, View } from "react-native";
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import { Text } from "react-native-paper";
import { styles as S } from "../style";
import { styles as SS } from "./style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { Warehouse } from '@Services/apis';
import { StringUtils, DeepLogs } from '@Services/utils';
import { toSquareMeter, toPyeong } from '@Services/utils/unit';

class ReqeustQKeep extends Component {

  constructor (props) {
    super(props);
    this.navigation = props.navigation;

    console.log(props.from ? Moment(props.from).toDate() : null, 'from');
    console.log(props.to ? Moment(props.to).toDate() : null, 'to');

    this.state = {
      fromMinDate: props.from ? Moment(props.from).toDate() : null,
      toMaxDate: props.to ? Moment(props.to).toDate() : null,
      formData: {
        from: props.from ? Moment(props.from).toDate() : null,
        to: props.to ? Moment(props.to).toDate() : null,
        rntlValue: props.rntlValue,
        splyAmount: props.splyAmount,
        mgmtChrg: props.mgmtChrg,
        remark: ''
      },
      rntlValuePyeong: props.rntlValue ? toPyeong(props.rntlValue) : ''
    }
  }

  showDatepicker = () => {
    this.setState({ showFrom: true });
  };

  showDatepickerTo = () => {
    this.setState({ showTo: true });
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

  render () {

    const {
      showFrom,
      showTo,
      isSubmit,
      rntlValuePyeong
    } = this.state;

    const {
      from,
      to,
      rntlValue,
      splyAmount,
      mgmtChrg,
      remark,
    } = this.state.formData;

    let isSubmitKeep = false;

    // 유효성 검사
    if (
      from &&
      to &&
      rntlValue &&
      splyAmount
    ) {
      isSubmitKeep = true;
    }


    return <Fragment>

      {/** 임대기간 (필수) **/}
      <View
        style={[
          S.row,
          { justifyContent: 'center', marginBottom: 18 },
        ]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.showDatepicker}
            style={DefaultStyle._btnDate}>
            <Text style={DefaultStyle._textDate}>
              {from ? Moment(from).format('YYYY.MM.DD') : ''}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                { color: '#000000' },
              ]}>
              임대기간 시작일
              <Text style={[
                { color: 'red' }
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showFrom}
              date={from ? Moment(from).toDate() : new Date()}
              maximumDate={this.state.toMaxDate}
              minimumDate={this.state.fromMinDate}
              onConfirm={(date) => {
                console.log(date, 'date');
                this.onChangeFrom(date);
              }}
              onCancel={() => {
                this.setState({ showFrom: false });
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={SS.hyphen}>-</Text>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.showDatepickerTo}
            style={DefaultStyle._btnDate}>
            <Text style={DefaultStyle._textDate}>
              {to ? Moment(to).format('YYYY.MM.DD') : ''}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                { color: '#000000' },
              ]}>
              임대기간 종료일
              <Text style={[
                { color: 'red' }
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showTo}
              date={to ? Moment(to).toDate() : new Date()}
              maximumDate={this.state.toMaxDate}
              minimumDate={this.state.fromMinDate}
              onConfirm={(date) => {
                console.log(date, 'date');
                if (date)
                  this.onChangeTo(date);
              }}
              onCancel={() => {
                this.setState({ showTo: false });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/** END:임대기간 (필수) **/}

      {/** 요청 면적 (필수) **/}
      <View style={DefaultStyle._listElement}>
        <View style={[DefaultStyle._element, { marginRight: 12 }]}>
          <TextField
            colorLabel="#000000"
            labelTextField="임대 요청 수치"
            textRight={'평'}
            keyboardType="numeric"
            placeholder={"0"}
            defaultValue={rntlValuePyeong ? String(rntlValuePyeong) : ''}
            isRequired={true}
            onChangeText={e => {
              let value = Number(e.replace(/[^0-9]/g), '')
              this.setState({
                formData: {
                  ...this.state.formData,
                  rntlValue: value ? toSquareMeter(value) : ''
                },
                rntlValuePyeong: value
              });
            }}
          />
        </View>
        <View style={[DefaultStyle._element]}>
          <TextField
            colorLabel="#000000"
            labelTextField="임대 요청 수치"
            textRight={'m2'}
            keyboardType="numeric"
            placeholder={"0"}
            defaultValue={rntlValue ? String(rntlValue) : ''}
            isRequired={true}
            onChangeText={e => {
              let value = Number(e.replace(/[^0-9]/g), '')
              this.setState({
                ...this.state,
                formData: {
                  ...this.state.formData,
                  rntlValue: value
                },
                rntlValuePyeong: value ? toPyeong(value) : ''
              });
            }}
          />
        </View>
      </View>

      {/** 임대 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="임대단가"
        textRight="원"
        keyboardType="numeric"
        defaultValue={
          splyAmount ? String(splyAmount) : '0'
        }
        placeholder="0"
        isRequired={true}
        onChangeText={e =>
          this.setState({
            formData: {
              ...this.state.formData,
              splyAmount: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }
      />

      {/** 관리 단가 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="관리단가"
        textRight="원"
        keyboardType="numeric"
        defaultValue={
          mgmtChrg ? String(mgmtChrg) : '0'
        }
        placeholder="0"
        isRequired={true}
        onChangeText={e =>
          this.setState({
            formData: {
              ...this.state.formData,
              mgmtChrg: Number(e.replace(/[^0-9]/g), '')
            }
          })
        }
      />
      {/** 추가 요청 사항 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="추가 요청 사항"
        placeholder="내용입력"
        numberOfLines={5}
        textAlignVertical="top"
        multiline={true}
        styleProps={{ height: 100 }}
        valueProps={value =>
          this.setState({
            formData: {
              ...this.state.formData,
              remark: value
            }
          })
        }
      />
      {/*<View style={[DefaultStyle._footerCards, {marginBottom: 30}]}>*/}
      {/*<Text style={S.amount}>예상 견적 금액</Text>*/}
      {/*<Text style={S.total}>{StringUtils.money((this.state.formData.mgmtChrg ? Number(this.state.formData.mgmtChrg) : 0) + (this.state.formData.splyAmount ? Number(this.state.formData.splyAmount) : 0))}</Text>*/}
      {/*</View>*/}


      <TouchableOpacity
        onPress={() => {
          if (!isSubmitKeep) {
            alert('필수값을 모두 입력하세요.')
            return;
          }

          let formData = this.state.formData;


          // TODO 유효성 검사
          if (formData.rntlValue > this.props.rntlValue) {
            // alert(`임대 요청 면적은 ${this.props.rntlValue} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.splyAmount <= 0) {
            alert(`임대단가는 0이상으로 요청가능합니다.`);
            return;
          } else if (formData.splyAmount > this.props.splyAmount) {
            // alert(`임대단가는 ${this.props.splyAmount} 이하로 요청가능합니다.`);
            // return;
          } else if (formData.mgmtChrg <= 0) {
            alert(`관리단가는 0이상으로 요청가능합니다.`);
            return;
          } else if (formData.mgmtChrg > this.props.mgmtChrg) {
            // alert(`관리단가는 ${this.props.mgmtChrg} 이하로 요청가능합니다.`);
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
            mgmtChrg: formData.mgmtChrg,
            remark: formData.remark
          };

          Warehouse.responQuotation({
            type: `tenant/warehouse/${formData.warehouseRegNo}/keep/${formData.seq}`,
            data: formData,
          })
            .then(res => {
              // const status = res.status;
              console.log('resRespon', res);
              if (res.status === 200) {
                console.log('res', res);

                this.setState({
                  isSubmitKeep: false
                });
                // TODO change illustrator popup
                alert('견적요청이 완료되었습니다.');
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
          isSubmitKeep ? null : SS.btnDisabled,
        ]}
        disabled={isSubmitKeep ? false : true}>
        <Text
          style={[
            DefaultStyle._textButton,
            SS.textSubmit,
            isSubmitKeep ? null : SS.textDisabled,
          ]}>
          확인
        </Text>
      </TouchableOpacity>

    </Fragment>;
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount () {
    console.log('::componentDidMount::');
  }
}

export default ReqeustQKeep;
