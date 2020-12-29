/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Card, Text, RadioButton } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import warehouse1 from '@Assets/images/warehouse-1.png';
import { Warehouse } from '@Services/apis';

import { styles as S } from '../style';
import { styles as SS } from './style';

class requestView extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};

    this.navigation = props.navigation;
  }
  coverStatus = value => {
    switch (value) {
      case 'RQ00':
        // code block
        return { processing: '견적 요청', data: [] };
      case 'RS00':
        // code block
        return {
          data: [],
          processing: '견적 응답',
        };

      case '1100':
        // code block
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
  coverTime = value => {
    let time = new Date();
    time.setTime(value);
    let changeTime = time.toLocaleDateString();
    console.log('changeTime', changeTime);
  };
  render() {
    const { route, data, typeWH } = this.props;
    console.log('tessssssssssssssss', data);
    console.log('typeWH', typeWH);

    const dataSelect = [
      {
        label: '2020.10.26 (1차)',
        value: '2020.10.26 (1차)',
      },
      {
        label: '2020.10.26 (1차)2',
        value: '2020.10.26 (1차)2',
      },
    ];

    let viewRequest =
      data &&
      data.estmtKeeps &&
      data.estmtKeeps.map((item, index) => {
        let dataRequest = [
          {
            type: '요청 일시',
            value: item.occrYmd,
          },
          {
            type: '요청 보관 기간',
            value: item.from + ' - ' + item.to,
          },
          {
            type: '요청 가용 면적',
            value: item.rntlValue,
          },
          {
            type: '정산단위',
            // value: this.coverStatus(status).processing,
            value: '임대 요청',
            highlight: true,
          },
          {
            type: '보관유형',
            value: data.warehouse.warehouse,
          },
          {
            type: '보관비',
            value: item.splyAmount,
          },
          {
            type: '관리비',
            value: item.mgmtChrg,
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
                style={[DefaultStyle._cards, DefaultStyle._margin0]}
                key={index}>
                {(data.estmtKeeps[index - 1] &&
                  data.estmtKeeps[index - 1].estmtDvCd !== 'RQ00') ||
                !data.estmtKeeps[index - 1] ? (
                  <View style={[DefaultStyle._titleCard, SS.titleCustom]}>
                    <Text style={DefaultStyle._textTitleCard}>
                      견적 요청 정보
                    </Text>
                    <View style={DefaultStyle._optionList}>
                      <Select data={dataSelect} style={SS.optionSelect} />
                    </View>
                  </View>
                ) : null}
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataRequest} />
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={SS.amount}>예상 견적 금액</Text>
                  <Text style={SS.total}>{item.estimatedPrice}원</Text>
                </View>
              </View>
            ) : null}
            {item.estmtDvCd === 'RS00' ? (
              <View
                style={[DefaultStyle._cards, DefaultStyle._margin0]}
                key={index}>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>
                  </View>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataRequest} />
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={SS.amount}>예상 견적 금액</Text>
                  <Text style={SS.total}>{item.estimatedPrice}원</Text>
                </View>
              </View>
            ) : null}
          </Fragment>
        );
      });

    let viewRequestTrust =
      data &&
      data.estmtTrusts &&
      data.estmtTrusts.map((item, index) => {
        let dataRequest = [
          {
            type: '창고명',
            value: data.warehouse.warehouse,
          },
          {
            type: '창고주',
            value: data.warehouse.owner,
          },
          {
            type: '위치',
            value: data.warehouse.address,
          },
          {
            type: '선택 창고 유형',
            // value: this.coverStatus(status).processing,
            value: '수탁',
            highlight: true,
          },
          {
            type: '보관유형',
            value: item.estmtDvCd,
          },
          {
            type: '정산단위',
            value: item.calUnitDvCode,
          },
          {
            type: '관리비',
            value: item.calStdDvCode,
          },
          {
            type: '수탁 가능 기간',
            value: item.from + ' - ' + item.to,
          },
          {
            type: '수탁 가용 수량',
            value: item.from + ' - ' + item.to,
          },
        ];

        return (
          <Fragment key={index}>
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
                      <Select data={dataSelect} style={SS.optionSelect} />
                    </View>
                  </View>
                ) : null}
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataRequest} />
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={SS.amount}>예상 견적 금액</Text>
                  <Text style={SS.total}>{item.estimatedPrice}원</Text>
                </View>
              </View>
            ) : null}
            {item.estmtDvCd === 'RS00' ? (
              <View
                style={[DefaultStyle._cards, DefaultStyle._margin0]}
                key={index}>
                <View style={DefaultStyle._card}>
                  <View style={DefaultStyle._headerCard}>
                    <Text style={DefaultStyle._headerCardTitle}>
                      견적 응답 정보
                    </Text>
                  </View>
                  <View style={DefaultStyle._infoTable}>
                    <TableInfo data={dataRequest} />
                  </View>
                </View>
                <View style={DefaultStyle._footerCards}>
                  <Text style={SS.amount}>예상 견적 금액</Text>
                  <Text style={SS.total}>{item.estimatedPrice}원</Text>
                </View>
              </View>
            ) : null}
          </Fragment>
        );
      });

    return (
      <Fragment>{typeWH === 'TRUST' ? viewRequestTrust : viewRequest}</Fragment>
    );
  }

  /** when after render DOM */

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
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

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    quotationData: action => {
      dispatch(ActionCreator.quotationData(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(requestView);

const coverUnit = value => {
  switch (value.status) {
    case 'RQ00':
      // code block
      return;
  }
};
