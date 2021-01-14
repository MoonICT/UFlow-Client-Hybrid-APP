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
    this.navigation = props.navigation;
    this.state = {
      groupOrderIndex: props.groupOrderIndex
    }
  }

  render() {
    /**
     * TENANT - RQ00 - TRUST
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

    let viewRequestTrust =
      calUnitDvCodes && calUnitDvCodes.length > 0 &&
      calStdDvCodes && calStdDvCodes.length > 0 &&
      estmtTrustGroups && estmtTrustGroups.length > 0 &&
      // estmtTrustGroups[this.props.groupOrders ? this.props.groupOrders.length - 1 : 0].map((item, index) => {
      estmtTrustGroups[this.state.groupOrderIndex].map((item, index) => {

          let dataRequest = [
            {
              type: '요청일자',
              value: StringUtils.dateStr(item.occrYmd),
            },
            {
              type: '요청 수탁기간',
              value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
            },
            {
              type: '요청 가용수량',
              value: item.rntlValue ? StringUtils.numberComma(item.rntlValue) : '-',
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

          return (
            <Fragment key={index}>

              {/*<Text>{this.state.groupOrderIndex}</Text>*/}
              {/*<Text>{this.props.groupOrderIndex}</Text>*/}
              {/*<Text>{item.occrYmd}</Text>*/}

              <View style={DefaultStyle._card}>
                <View style={DefaultStyle._headerCard}>
                  <Text style={DefaultStyle._headerCardTitle}>
                    {item.estmtDvCd === 'RQ00' ? '요청한 견적 정보' : '창고주의 견적응답 정보'}
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

    // console.log(data.orders, 'data.orders');

    if (groupOrders) {
      const dataSelect = groupOrders ? groupOrders.map((item, index) => {
        return {
          label: StringUtils.dateStr(item) + `(${(index + 1)}차)`,
          value: index
        };
      }) : [];

      // console.log(dataSelect[this.state.groupOrderIndex].value);
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

            {viewRequestTrust}

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                <Text style={DefaultStyle._headerCardTitle}>
                  견적 응답 정보
                </Text>
              </View>
              <Text style={S.noticeWaitting}>
                창고주가 보내주신 견적 요청서를 확인하고 있습니다.
                견적 응답이 올 때까지 잠시만 기다려 주세요.
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
                <Text style={DefaultStyle._textButton}>견적 재요청</Text>
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

    console.log('::componentDidMount::');
    // this.setState({
    //   groupOrderIndex: this.props.groupOrders ? this.props.groupOrders.length - 1 : 0
    // })
    // if (prevState.groupOrderIndex !== this.state.groupOrderIndex) {
    //   console.log(this.props.groupOrders, 'this.props.groupOrders');
    //   console.log(this.props.groupOrders.length - 1, 'this.props.groupOrders');
    // console.log(this.props, '>> props')
    // console.log(this.props.groupOrders, '> props.groupOrders')
      // this.setState({
      //   groupOrderIndex: this.props.groupOrders ? this.props.groupOrders.length - 1 : 0
      // })
    // }

  }
}

export default TenantRq00Trust;
