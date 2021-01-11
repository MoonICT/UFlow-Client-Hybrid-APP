import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper";
import {styles as S} from "../style";


class SampleTenantRq00Trust extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    const data = route && route.params && route.params.data;

    return <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
      <View style={DefaultStyle._card}>
        <View style={DefaultStyle._headerCard}>
          <Text style={DefaultStyle._headerCardTitle}>
            견적 응답 정보
          </Text>
        </View>
        <Text style={S.noticeWaitting}>
          {type === 'OWNER' ? (
            <TouchableOpacity
              onPress={() => {
                this.navigation.navigate('ResponseQuotation', {
                  typeWH,
                  warehouseRegNo,
                  warehSeq,
                  rentUserNo,
                  status,
                  type,
                  data
                });
              }}
              style={[
                DefaultStyle._btnOutline,
                {flex: 0, marginRight: 16},
              ]}
              // disabled={this.state.checked ? false : true}
            >
              <Text style={DefaultStyle._textButton}>
                견적 응답하기
              </Text>
            </TouchableOpacity>
          ) : (
            '창고주가 보내주신 견적 요청서를 확인하고 있습니다. 견적 응답이 올 때까지 잠시만 기다려 주세요.'
          )}
        </Text>
      </View>
      {type === 'TENANT' ? (
        <TouchableOpacity
          onPress={() => {
            // this.props.dataAction(this.state);

            this.navigation.navigate('ResponseQuotation', {
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
              type,
            });
          }}
          style={[
            type === 'OWNER'
              ? DefaultStyle._btnInline
              : DefaultStyle._btnOutline,
          ]}
          // disabled={this.state.checked ? false : true}
        >
          <Text style={[DefaultStyle._textButton]}>견적 재요청</Text>
        </TouchableOpacity>
      ) : null}
    </View>;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {

  }
}

export default SampleTenantRq00Trust;
