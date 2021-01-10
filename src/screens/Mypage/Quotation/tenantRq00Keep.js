import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import Select from '@Components/organisms/Select';
import {StringUtils, DeepLogs} from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import {Text} from "react-native-paper";
import {styles as S} from "../style";
import {styles as SS} from "./style";


class TenantRq00Keep extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    /**
     * TENANT - RQ00 - KEEP
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


    let viewRequest =
      calUnitDvCodes && calUnitDvCodes.length > 0 &&
      calStdDvCodes && this.calStdDvCodes.length > 0 &&
      data &&
      data.estmtKeeps &&
      data.estmtKeeps.map((item, index) => {

        let dataRequest = [
          {
            type: item.estmtDvCd === 'RQ00' ? '요청 일시' : '응답 일시',
            value: StringUtils.dateStr(item.occrYmd),
          },
          {
            type: '요청 보관 기간',
            value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
          },
          {
            type: '요청 가용 면적',
            value: item.rntlValue ? item.rntlValue.toLocaleString() : '-',
          },
          {
            type: '정산단위',
            value: item.calUnitDvCode ? StringUtils.toStdName(this.state.calUnitDvCodes, item.calUnitDvCode) : '-'
          },
          {
            type: '산정기준',
            value: item.calStdDvCode ? StringUtils.toStdName(this.state.calStdDvCodes, item.calStdDvCode) : '-'
          },
          {
            type: '요청 보관단가',
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

        let orders = data?.orders[0] || [
          {
            label: StringUtils.dateStr(new Date()) + '(1차)',
            value: StringUtils.dateStr(new Date()) + '(1차)',
          },
        ];

        const dataSelect = [
          {
            label: StringUtils.dateStr(orders) + '(1차)',
            value: StringUtils.dateStr(orders) + '(1차)',
          },
        ];

        return (
          <Fragment key={index}>
            {item.estmtDvCd === 'RQ00' ? (
              <View
                style={[DefaultStyle._cards, DefaultStyle._margin0, {marginTop: 0}]}
                key={index}>
                {(data.estmtKeeps[index - 1] &&
                  data.estmtKeeps[index - 1].estmtDvCd !== 'RQ00') ||
                !data.estmtKeeps[index - 1] ? (
                  <View style={[DefaultStyle._titleCard, SS.titleCustom]}>
                    <Text style={DefaultStyle._textTitleCard}>
                      견적 요청 정보
                    </Text>
                    <View style={DefaultStyle._optionList}>
                      <Select data={dataSelect} style={SS.optionSelect}/>
                    </View>
                  </View>
                ) : null}
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataRequest}/>
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={S.amount}>예상 견적 금액</Text>
                  <Text style={S.total}>{item.estimatedPrice}원</Text>
                </View>
              </View>
            ) : null}
            {item.estmtDvCd === 'RS00' ? (
              <View
                style={[DefaultStyle._cards, DefaultStyle._margin0, {marginTop: 0}]}
                key={index}>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>
                  </View>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataRequest}/>
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={S.amount}>예상 견적 금액</Text>
                  <Text style={S.total}>{item.estimatedPrice}원</Text>
                </View>
              </View>
            ) : null}
          </Fragment>
        );
      });


  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {

  }
}

export default TenantRq00Keep;
