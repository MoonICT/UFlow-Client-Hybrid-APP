import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import Select from '@Components/organisms/Select';
import {StringUtils, DeepLogs} from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import {Text} from "react-native-paper";
import {styles as SS} from "./style";
import {styles as S} from "../style";


class OwnerRq00Keep extends Component {

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      groupOrderIndex: props.groupOrderIndex
    }
  }

  render() {
    /**
     * OWNER - RQ00 - KEEP
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
    const estmtKeepGroups = this.props.estmtKeepGroups;
    const groupOrders = this.props.groupOrders;

    let lastRequestData = {};
    if (estmtKeepGroups && estmtKeepGroups.length > 0) {
      lastRequestData = estmtKeepGroups[this.state.groupOrderIndex][estmtKeepGroups[this.state.groupOrderIndex].length - 1];
    }

    let viewRequestKeep =
      calUnitDvCodes && calUnitDvCodes.length > 0 &&
      calStdDvCodes && calStdDvCodes.length > 0 &&
      estmtKeepGroups && estmtKeepGroups.length > 0 &&
      estmtKeepGroups[this.state.groupOrderIndex].map((item, index) => {

          let dataRequest = [
            {
              type: '요청 일자',
              value: StringUtils.dateStr(item.occrYmd),
            },
            {
              type: '요청 임대기간',
              value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
            },
            {
              type: '요청 가용면적',
              value: item.rntlValue ? StringUtils.displayAreaUnit(item.rntlValue) : '-',
            },
            {
              type: '정산단위',
              value: item.calUnitDvCode ? StringUtils.toStdName(calUnitDvCodes, item.calUnitDvCode) : '-'
            },
            {
              type: '산정기준',
              value: item.calStdDvCode ? StringUtils.toStdName(calStdDvCodes, item.calStdDvCode) : '-'
            },
            {
              type: '요청 임대단가',
              value: item.splyAmount ? StringUtils.money(item.splyAmount) : '-'
            },
            {
              type: '요청 관리단가',
              value: item.mgmtChrg ? StringUtils.money(item.mgmtChrg) : '-',
            },
            {
              type: '추가 요청사항',
              value: item.remark,
            },
          ];
          return (
            <Fragment key={index}>

              <View style={DefaultStyle._card}>
                <View style={DefaultStyle._headerCard}>
                  <Text style={DefaultStyle._headerCardTitle}>
                    {item.estmtDvCd === 'RQ00' ? '견적 요청 정보' : '견적 응답 정보'}
                  </Text>
                </View>
                <View style={DefaultStyle._infoTable}>
                  <TableInfo data={dataRequest}/>
                </View>
              </View>

            </Fragment>
          );
        }
      );

    if (groupOrders) {
      const dataSelect = groupOrders ? groupOrders.map((item, index) => {
        return {
          label: StringUtils.dateStr(item) + `(${(index + 1)}차)`,
          value: index
        };
      }) : [];

      return (
        <Fragment>
          <View
            style={[DefaultStyle._cards, DefaultStyle._margin0]}>

            <View style={[DefaultStyle._titleCard, SS.titleCustom]}>
              <Text style={DefaultStyle._textTitleCard}>
                견적 요청 정보
              </Text>
              <View style={DefaultStyle._optionList}>
                <Select data={dataSelect}
                        valueSelected={dataSelect[this.state.groupOrderIndex].label}
                        valueProps={(value) => {
                          this.setState({
                            groupOrderIndex: value
                          });
                        }}
                        style={SS.optionSelect}/>
              </View>
            </View>

            {viewRequestKeep}

            <View style={DefaultStyle._listBtn}>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
                onPress={() => {
                  /** GO TO 견적응답하기 **/
                  this.navigation.navigate('ResponseQuotation', {
                    lastRequestData,
                    typeWH,
                    warehouseRegNo,
                    warehSeq,
                    rentUserNo,
                    status,
                    type,
                  });
                }}>
                <Text style={DefaultStyle._textButton}>견적 응답하기</Text>
              </TouchableOpacity>
            </View>
          </View>


        </Fragment>
      );
    } else {
      return <></>;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {
// 마지막 차수로 설정.
    if (this.state.groupOrders && this.state.groupOrders.length > 0) {
      this.setState({
        groupOrderIndex: this.state.groupOrders.length - 1
      });
    }
  }
}

export default OwnerRq00Keep;
