import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import Select from '@Components/organisms/Select';
import {StringUtils, DeepLogs} from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import {Text} from "react-native-paper";
import {styles as S} from "../style";
import {styles as SS} from "./style";

class TenantRq00Trust extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    /**
     * TENANT - RQ00 - TRUST
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

    console.log(data, 'data');

    let viewRequestTrust =
      calUnitDvCodes && calUnitDvCodes.length > 0 &&
      calStdDvCodes && calStdDvCodes.length > 0 &&
      data &&
      data.estmtTrusts &&
      data.estmtTrusts.map((item, index) => {

          let reqDateLabel = '';
          if (item.estmtDvCd === 'RQ00') {
            reqDateLabel = '요청 일자';
          } else if (item.estmtDvCd === 'RS00') {
            reqDateLabel = '응답 일자';
          } else {
            reqDateLabel = item.estmtDvCd;
          }

          // DeepLogs.log(item, 'item');

          let dataRequest = [
            {
              type: reqDateLabel,
              value: StringUtils.dateStr(item.occrYmd),
            },
            {
              type: '요청 수탁기간',
              value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
            },
            {
              type: '요청 가용수량',
              value: item.rntlValue ? item.rntlValue.toLocaleString() : '-',
            },
            {
              type: '요청 보관단가',
              value: item.splyAmount ? StringUtils.money(item.splyAmount) : '-'
            },
            {
              type: '입고단가',
              value: item.whinChrg ? StringUtils.money(item.whinChrg) : '-'
            },
            {
              type: '출고단가',
              value: item.whoutChrg ? StringUtils.money(item.whoutChrg) : '-'
            },
            {
              type: '인건단가',
              value: item.psnChrg ? StringUtils.money(item.psnChrg) : '-'
            },
            {
              type: '가공단가',
              value: item.mnfctChrg ? StringUtils.money(item.mnfctChrg) : '-'
            },
            {
              type: '택배단가',
              value: item.dlvyChrg ? StringUtils.money(item.dlvyChrg) : '-'
            },
            {
              type: '운송단가',
              value: item.shipChrg ? StringUtils.money(item.shipChrg) : '-'
            },
            // {
            //   type: '정산단위',
            //   value: item.calUnitDvCode ? StringUtils.toStdName(this.state.calUnitDvCodes, item.calUnitDvCode) : '-'
            // },
            // {
            //   type: '산정기준',
            //   value: item.calStdDvCode ? StringUtils.toStdName(this.state.calStdDvCodes, item.calStdDvCode) : '-'
            // },
            {
              type: '추가 요청 사항',
              value: item.remark ? item.remark : '-',
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
              {/** 견적요청 상태 : 견적 재용청을 할수 있음 (최초) 창고주는 견적을 응답할 수 있다.**/}
              {item.estmtDvCd === 'RQ00' ? (
                <View
                  style={[DefaultStyle._cards, DefaultStyle._margin0]}
                  key={index}>
                  {(data.estmtTrusts[index - 1] &&
                    data.estmtTrusts[index - 1].estmtDvCd !== 'RQ00') ||
                  !data.estmtTrusts[index - 1] ? (
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
                </View>
              ) : null}
              {/** 견적응답 상태 : 임차인은 견적 재용청을 할수 있음, 창고주는 견적을 동의할 수 있음. **/}
              {item.estmtDvCd === 'RS00' ? (
                <View
                  style={[DefaultStyle._cards, DefaultStyle._margin0]}
                  key={index}>
                  <View style={DefaultStyle._card}>
                    <View style={DefaultStyle._headerCard}>
                      <Text style={DefaultStyle._headerCardTitle}>
                        견적 요청 정보
                      </Text>
                    </View>
                    <View style={DefaultStyle._infoTable}>
                      <TableInfo data={dataRequest}/>
                    </View>
                  </View>
                </View>
              ) : null}
            </Fragment>
          );
        }
      );
    return (
      <Fragment>{viewRequestTrust}</Fragment>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {
    console.log('::componentDidMount::');
  }
}

export default TenantRq00Trust;
