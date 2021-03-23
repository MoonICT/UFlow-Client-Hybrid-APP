import React, { Component, Fragment } from 'react';
import DefaultStyle from '@Styles/default';
import { TouchableOpacity, View } from "react-native";
import Select from '@Components/organisms/Select';
import { StringUtils, DeepLogs } from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import { Text } from "react-native-paper";
import { styles as SS } from "./style";
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class OwnerRs00Trust extends Component {

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      groupOrderIndex: props.groupOrderIndex
    }
  }

  render () {
    /**
     * OWNER - RS00 - TRUST
     */
      // const gIndex = this.state.gIndex;
    const warehouseRegNo = this.props.warehouseRegNo;
    const warehSeq = this.props.warehSeq;
    const rentUserNo = this.props.rentUserNo;
    const type = this.props.type;
    const typeWH = this.props.typeWH;
    const status = this.props.status;
    const data = this.props.data;
    const calUnitDvCodes = this.props.calUnitDvCodes;
    const calStdDvCodes = this.props.calStdDvCodes;
    const estmtTrustGroups = this.props.estmtTrustGroups;
    const groupOrders = this.props.groupOrders;

    let lastRequestData = {};
    if (estmtTrustGroups && estmtTrustGroups.length > 0) {
      lastRequestData = estmtTrustGroups[0][estmtTrustGroups[0].length - 1];
    }

    let viewRequestTrust =
      calUnitDvCodes && calUnitDvCodes.length > 0 &&
      calStdDvCodes && calStdDvCodes.length > 0 &&
      estmtTrustGroups && estmtTrustGroups.length > 0 &&
      estmtTrustGroups[this.state.groupOrderIndex].map((item, index) => {

          let dataRequest = [
            {
              type: getMsg(this.props.lang, 'ML0575', '요청 일자'),
              value: StringUtils.dateStr(item.occrYmd),
            },
            {
              type: getMsg(this.props.lang, 'ML0583', '요청 수탁기간'),
              value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
            },
            {
              type: getMsg(this.props.lang, 'ML0584', '요청 가용수량'),
              value: item.rntlValue ? StringUtils.numberComma(item.rntlValue) : '-',
            },
            {
              type: getMsg(this.props.lang, 'ML0585', '요청 보관단가'),
              value: item.splyAmount ? StringUtils.money(item.splyAmount) : '-'
            },
            {
              type: getMsg(this.props.lang, 'ML0150', '입고단가'),
              value: item.whinChrg ? StringUtils.money(item.whinChrg) : '-'
            },
            {
              type: getMsg(this.props.lang, 'ML0151', '출고단가'),
              value: item.whoutChrg ? StringUtils.money(item.whoutChrg) : '-'
            },
            // {
            //   type: '인건단가',
            //   value: item.psnChrg ? StringUtils.money(item.psnChrg) : '-'
            // },
            // {
            //   type: '가공단가',
            //   value: item.mnfctChrg ? StringUtils.money(item.mnfctChrg) : '-'
            // },
            // {
            //   type: '택배단가',
            //   value: item.dlvyChrg ? StringUtils.money(item.dlvyChrg) : '-'
            // },
            // {
            //   type: '운송단가',
            //   value: item.shipChrg ? StringUtils.money(item.shipChrg) : '-'
            // },
            // {
            //   type: '정산단위',
            //   value: item.calUnitDvCode ? StringUtils.toStdName(this.state.calUnitDvCodes, item.calUnitDvCode) : '-'
            // },
            // {
            //   type: '산정기준',
            //   value: item.calStdDvCode ? StringUtils.toStdName(this.state.calStdDvCodes, item.calStdDvCode) : '-'
            // },
            {
              type: getMsg(this.props.lang, 'ML0580', '추가 요청사항'),
              value: item.remark ? item.remark : '-',
            },
          ];

          return (
            <Fragment key={index}>

              <View style={DefaultStyle._card}>
                <View style={DefaultStyle._headerCard}>
                  <Text style={DefaultStyle._headerCardTitle}>
                    {item.estmtDvCd === 'RQ00' ? getMsg(this.props.lang, 'ML0080', '견적 요청 정보') : getMsg(this.props.lang, 'ML0581', '견적 응답 정보')}
                  </Text>
                </View>
                <View style={DefaultStyle._infoTable}>
                  <TableInfo data={dataRequest} />
                </View>
              </View>

            </Fragment>
          );
        }
      );

    // console.log(data.orders, 'data.orders');

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
                {getMsg(this.props.lang, 'ML0080', '견적 요청 정보')}
              </Text>
              <View style={DefaultStyle._optionList}>
                <Select data={dataSelect}
                        valueSelected={dataSelect[this.state.groupOrderIndex].label}
                        valueProps={(value) => {
                          this.setState({
                            groupOrderIndex: value
                          });
                        }}
                        style={SS.optionSelect} />
              </View>
            </View>

            {viewRequestTrust}

          </View>


        </Fragment>
      );
    } else {
      return <></>;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('::componentDidUpdate::');
  }
  componentDidMount() {
    // console.log('::componentDidMount::');
    // 마지막 차수로 설정.
    if (this.props.groupOrders && this.props.groupOrders.length > 0) {
      this.setState({
        groupOrderIndex: this.props.groupOrders.length - 1
      });
    }
  }
}

export default OwnerRs00Trust;
