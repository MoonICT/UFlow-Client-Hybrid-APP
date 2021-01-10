import React, {Component, Fragment} from 'react';
import {TouchableOpacity, View} from "react-native";
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import {Text} from "react-native-paper";
import {styles as S} from "../style";
import {styles as SS} from "./style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { StringUtils, DeepLogs } from '@Services/utils';

class ReqeustQTrust extends Component {

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {props};
  }

  showDatepicker = () => {
    this.setState({ showFrom: true });
  };

  showDatepickerTo = () => {
    this.setState({ showTo: true });
  };

  onChangeFrom = (selectedDate) => {

    this.setState({ from: StringUtils.dateStr(selectedDate), showFrom: false });
  };

  onChangeTo = (selectedDate) => {

    this.setState({ to: StringUtils.dateStr(selectedDate), showTo: false });
  };

  render() {

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

      showFrom,
      showTo,
      isSubmit,

    } = this.state;

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



    return  <Fragment>

      {/** 수탁기간 (필수) **/}
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
              {from}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                { color: '#000000' },
              ]}>
              수탁기간 시작일
              <Text style={[
                {color: 'red'}
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showFrom}
              date={from}
              onConfirm={(date) => {
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
              {to}
            </Text>
            <Text
              style={[
                DefaultStyle._labelTextField,
                { color: '#000000' },
              ]}>
              수탁기간 종료일
              <Text style={[
                {color: 'red'}
              ]}> *</Text>
            </Text>
            <DateTimePickerModal
              mode="date"
              isVisible={showTo}
              date={from}
              onConfirm={(date) => {
                this.onChangeTo(date);
              }}
              onCancel={() => {
                this.setState({ showTo: false });
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
        value={rntlValue}
        isRequired={true}
        onChangeText={e =>
          this.setState({ rntlValue: e.replace(/[^0-9]/g, '') })
        }
      />

      {/** 보관 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="보관비"
        textRight="원"
        keyboardType="numeric"
        value={splyAmount}
        placeholder="0"
        isRequired={true}
        onChangeText={e =>
          this.setState({ splyAmount: e.replace(/[^0-9]/g, '') })
        }
      />
      {/** 입고 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="입고단가"
        textRight="원"
        keyboardType="numeric"
        value={whinChrg}
        placeholder="0"
        isRequired={true}
        onChangeText={e =>
          this.setState({ whinChrg: e.replace(/[^0-9]/g, '') })
        }
      />
      {/** 출고 단가 (필수) **/}
      <TextField
        colorLabel="#000000"
        labelTextField="출고단가"
        textRight="원"
        keyboardType="numeric"
        value={whoutChrg}
        placeholder="0"
        isRequired={true}
        onChangeText={e =>
          this.setState({ whoutChrg: e.replace(/[^0-9]/g, '') })
        }
      />
      {/** 인건 단가 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="인건단가"
        keyboardType="numeric"
        value={psnChrg}
        textRight="원"
        placeholder="0"
        onChangeText={e =>
          this.setState({ psnChrg: e.replace(/[^0-9]/g, '') })
        }
      />
      {/** 가공 단가 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="가공단가"
        textRight="원"
        keyboardType="numeric"
        value={mnfctChrg}
        placeholder="0"
        onChangeText={e =>
          this.setState({ mnfctChrg: e.replace(/[^0-9]/g, '') })
        }
      />
      {/** 택배 단가 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="택배단가"
        textRight="원"
        keyboardType="numeric"
        value={dlvyChrg}
        placeholder="0"
        onChangeText={e =>
          this.setState({ dlvyChrg: e.replace(/[^0-9]/g, '') })
        }
      />
      {/** 운송 단가 **/}
      <TextField
        colorLabel="#000000"
        labelTextField="운송단가"
        textRight="원"
        keyboardType="numeric"
        value={shipChrg}
        placeholder="0"
        onChangeText={e =>
          this.setState({ shipChrg: e.replace(/[^0-9]/g, '') })
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
        styleProps={{height: 100}}
        valueProps={e => this.setState({ remark: e })}
      />


      <TouchableOpacity
        onPress={() => {
          // this.props.dataAction(this.state);
          // this.navigation.navigate('ResponseQuotation');
          console.log('submit :>> ');
          if (!isSubmitTrust) {
            alert('필수값을 모두 입력하세요.')
            return;
          }
          this.setState({isSubmit: !isSubmit});
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

export default ReqeustQTrust;
