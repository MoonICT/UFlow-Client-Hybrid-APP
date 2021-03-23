import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import Select from '@Components/organisms/Select';
import {StringUtils, DeepLogs} from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import {Text} from "react-native-paper";
import {styles as S} from "../style";
import {styles as SS} from "./style";
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang


class TenantRq00Keep extends Component {

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      groupOrderIndex: props.groupOrderIndex
    }
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
    const estmtKeepGroups = this.props.estmtKeepGroups;
    const groupOrders = this.props.groupOrders;

    let total = 0;

    let viewRequestKeep =
      calUnitDvCodes && calUnitDvCodes.length > 0 &&
      calStdDvCodes && calStdDvCodes.length > 0 &&
      estmtKeepGroups && estmtKeepGroups.length > 0 &&
      // estmtTrustGroups[this.props.groupOrders ? this.props.groupOrders.length - 1 : 0].map((item, index) => {
      estmtKeepGroups[this.state.groupOrderIndex].map((item, index) => {
        // console.log(item, '>>>>item');

        total = item.splyAmount + item.mgmtChrg;
          let dataRequest = [
            {
              type: getMsg(this.props.lang, 'ML0589', '요청 일시'),
              value: StringUtils.dateStr(item.occrYmd),
              // value: 0,
            },
            {
              type: getMsg(this.props.lang, 'ML0576', '요청 임대기간'),
              value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
              // value: 0,
            },
            {
              type: getMsg(this.props.lang, 'ML0577', '요청 가용면적'),
              value: item.rntlValue ? StringUtils.displayAreaUnit(item.rntlValue) : '-',
            },
            {
              type: getMsg(this.props.lang, 'ML0139', '정산단위'),
              value: item.calUnitDvCode ? StringUtils.toStdName(calUnitDvCodes, item.calUnitDvCode) : '-'
            },
            {
              type: getMsg(this.props.lang, 'ML0140', '산정기준'),
              value: item.calStdDvCode ? StringUtils.toStdName(calStdDvCodes, item.calStdDvCode) : '-'
            },
            {
              type: getMsg(this.props.lang, 'ML0578', '요청 임대단가'),
              value: item.splyAmount ? StringUtils.money(item.splyAmount) : '-'
            },
            {
              type: getMsg(this.props.lang, 'ML0579', '요청 관리단가'),
              value: item.mgmtChrg ? StringUtils.money(item.mgmtChrg) : '-',
            },
            {
              type: getMsg(this.props.lang, 'ML0580', '추가 요청사항'),
              value: item.remark,
            },
          ];
          return (
            <Fragment key={index}>

              {/*<Text>{this.state.groupOrderIndex}</Text>*/}
              {/*<Text>{this.props.groupOrderIndex}</Text>*/}
              {/*<Text>{item.occrYmd}</Text>*/}

              <View style={DefaultStyle._card}>
                <View style={DefaultStyle._headerCard}>
                  <Text style={DefaultStyle._headerCardTitle}>
                    {item.estmtDvCd === 'RQ00' ? getMsg(this.props.lang, 'ML0590', '요청한 견적 정보') : getMsg(this.props.lang, 'ML0591', '창고주의 견적응답 정보')}
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
        console.log(item, 'item');
        return {
          label: StringUtils.dateStr(item) + `(${(index + 1)}${getMsg(this.props.lang, 'ML0586', '차')})`,
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
                        style={SS.optionSelect}/>
              </View>
            </View>

            {viewRequestKeep}

            {/*<View style={DefaultStyle._footerCards}>*/}
              {/*<Text style={S.amount}>예상 견적 금액</Text>*/}
              {/*<Text style={S.total}>{StringUtils.money(total)}</Text>*/}
            {/*</View>*/}

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                <Text style={DefaultStyle._headerCardTitle}>
                  {getMsg(this.props.lang, 'ML0581', '견적 응답 정보')}
                </Text>
              </View>
              <Text style={S.noticeWaitting}>
                {getMsg(this.props.lang, 'ML0592', '창고주가 보내주신 견적 요청서를 확인하고 있습니다.\n견적 응답이 올 때까지 잠시만 기다려 주세요.')}
              </Text>
            </View>


            <View style={DefaultStyle._listBtn}>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
                onPress={() => {
                  /** Go To 견적 재요청 **/
                  this.navigation.navigate('RequestQuotation', {
                    data,
                    typeWH,
                    warehouseRegNo,
                    warehSeq,
                    rentUserNo,
                    status,
                    type,
                  });
                }}>
                <Text style={DefaultStyle._textButton}>{getMsg(this.props.lang, 'ML0271', '견적 재요청')}</Text>
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
    if (this.state.groupOrders && this.state.groupOrders.length > 0) {
      this.setState({
        groupOrderIndex: this.state.groupOrders.length - 1
      });
    }
  }
}

export default TenantRq00Keep;
