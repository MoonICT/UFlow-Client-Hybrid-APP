import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper";


class OwnerRq00Trust extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    /**
     * OWNER - RQ00 - TRUST
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
            // this.navigation.navigate('ResponseQuotation', {
            //   typeWH,
            //   warehouseRegNo,
            //   warehSeq,
            //   rentUserNo,
            //   status,
            //   type,
            // });
          }}>
          <Text style={DefaultStyle._textButton}>XXXXX</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
          onPress={() =>{}}>
          <Text
            style={[
              DefaultStyle._textButton,
              DefaultStyle._textInline,
            ]}>
            XXXXX
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

export default OwnerRq00Trust;
