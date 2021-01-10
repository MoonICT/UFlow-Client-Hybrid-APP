/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Moment from 'moment';
import Select from '@Components/organisms/Select';
import {MyPage} from '@Services/apis';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import {StringUtils} from '@Services/utils';
import TableInfo from '@Components/atoms/TableInfo';
import {styles as SS} from './style';
import {styles as S} from '../style';

import moment from 'moment';

class RequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calUnitDvCodes: [],
      calStdDvCodes: [],
    };
  }

  coverStatus = value => {
    switch (value) {
      case 'RQ00':
        return {processing: '견적 요청', data: []};
      case 'RS00':
        return {
          data: [],
          processing: '견적 응답',
        };

      case '1100':
        return {
          data: [],
          processing: '계약 요청',
        };
      case '4100':
        // code block
        return {
          data: [],
          processing: '계약 진행',
        };
      case '5100':
        // code block
        return {
          data: [],
          processing: '계약 완료',
        };

      // code block
    }
  };
  // coverTime = value => {
  //   let time = new Date();
  //   time.setTime(value);
  //   let changeTime = time.toLocaleDateString();
  //   console.log('changeTime', changeTime);
  // };

  render() {

    /** 요청 응답에 대한 차수 선택 (요청-요청-요청-응답 , 요청-응답 >>> 응답으로 끝나는 부분이 한 차수 (API 로 정리되서 옴.) ) **/
    const {data, typeWH} = this.props;
    let orders = data?.orders[0] || [
      {
        label: StringUtils.dateStr(new Date()) + '(1차)',
        value: StringUtils.dateStr(new Date()) + '(1차)',
      },
    ];

    // console.log('orders==>', orders);
    // console.log('data==>', data);

    const dataSelect = [
      {
        label: StringUtils.dateStr(orders) + '(1차)',
        value: StringUtils.dateStr(orders) + '(1차)',
      },
    ];


    let viewRequest =
      this.state.calStdDvCodes && this.state.calStdDvCodes.length > 0 &&
      this.state.calUnitDvCodes && this.state.calUnitDvCodes.length > 0 &&
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

    let viewRequestTrust =
      this.state.calStdDvCodes && this.state.calStdDvCodes.length > 0 &&
      this.state.calUnitDvCodes && this.state.calUnitDvCodes.length > 0 &&
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

          console.log(item, 'item');

          let dataRequest = [
            {
              type: reqDateLabel,
              value: StringUtils.dateStr(item.occrYmd),
            },
            {
              type: '요청 보관기간',
              value: StringUtils.dateStr(item.from) + ' - ' + StringUtils.dateStr(item.to),
            },
            {
              type: '요청 가용수량',
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
              type: '가공단가',
              value: item.mnfctChrg ? StringUtils.money(item.mnfctChrg) : '-'
            },
            {
              type: '인건단가',
              value: item.psnChrg ? StringUtils.money(item.psnChrg) : '-'
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
              type: '택배단가',
              value: item.dlvyChrg ? StringUtils.money(item.dlvyChrg) : '-'
            },
            {
              type: '운송단가',
              value: item.shipChrg ? StringUtils.money(item.shipChrg) : '-'
            },
            {
              type: '추가 요청 사항',
              value: item.remark ? item.remark : '-',
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
      <Fragment>{typeWH === 'TRUST' ? viewRequestTrust : viewRequest}</Fragment>
    );
  }

  /** when after render DOM */

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');


  }

  componentDidMount() {
    console.log('::componentDidMount::');

    const {data, typeWH} = this.props;

    MyPage.getDetailCodes('WHRG0014').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calStdDvCodes: res.data._embedded.detailCodes
        });
      }
    });

    MyPage.getDetailCodes('WHRG0013').then((res) => {

      if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
        // console.log('detailCodes', res.data._embedded.detailCodes)
        this.setState({
          calUnitDvCodes: res.data._embedded.detailCodes
        });
      }
    });
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

export default RequestView;

const coverUnit = value => {
  switch (value.status) {
    case 'RQ00':
      // code block
      return;
  }
};
