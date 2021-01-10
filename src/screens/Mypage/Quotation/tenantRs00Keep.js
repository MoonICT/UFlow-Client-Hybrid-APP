import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper";


class TenantRs00Keep extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    /**
     * TENANT - RS00 - KEEP
     */

    const warehouseRegNo = this.props.warehouseRegNo;
    const warehSeq = this.props.warehSeq;
    const rentUserNo = this.props.rentUserNo;
    const type = this.props.type;
    const typeWH = this.props.typeWH;
    const status = this.props.status;
    const data = this.props.data;
    const calUnitDvCodes = this.props.calUnitDvCodes;
    const calStdDvCodes = this.props.calStdDvCodes;

    return <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
      <View style={DefaultStyle._listBtn}>
        <TouchableOpacity
          style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
          onPress={() => {
            this.navigation.navigate('ResponseQuotation', {
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
              type,
            });
          }}>
          <Text style={DefaultStyle._textButton}>견적 재요청</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
          onPress={
            () =>
              this.setState({
                isConfirmRequest: !this.state.isConfirmRequest,
              })
            // this.navigation.navigate('RequestContract', {
            //   type,
            //   warehouseRegNo,
            //   warehSeq,
            //   typeWH,
            // })
          }>
          <Text
            style={[
              DefaultStyle._textButton,
              DefaultStyle._textInline,
            ]}>
            계약 요청
          </Text>
        </TouchableOpacity>
      </View>
    </View>;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {

  }
}

export default TenantRs00Keep;
