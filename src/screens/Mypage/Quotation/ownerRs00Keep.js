import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper";


class OwnerRs00Keep extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    /**
     * OWNER - RS00 - KEEP
     */

    const { route } = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    const data = route && route.params && route.params.data;
    const calUnitDvCodes = route && route.params && route.params.calUnitDvCodes;
    const calStdDvCodes = route && route.params && route.params.calStdDvCodes;

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

export default OwnerRs00Keep;
