/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TableInfo from '@Components/atoms/TableInfo';
import warehouse1 from '@Assets/images/warehouse-1.png';
import ContractInformation from './ContractInformation';

import { styles as S } from '../style';
import { Warehouse } from '@Services/apis';

class RequestContract extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  coverTime = value => {
    let time = new Date();
    time.setTime(value);
    let changeTime = time.toLocaleDateString();
    return changeTime;
  };
  coverStatus = value => {
    switch (value) {
      case '1100':
        // code block
        return {
          data: [],
          processing: '계약 요청',
        };
      case '2100':
        // code block
        return {
          data: [],
          processing: '계약 요청 대기',
        };
      case '4100':
        // code block
        return {
          data: [],
          processing: '계약 진행 중',
          processingTrust: '계약 요청 대기',
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
  render() {
    const { route } = this.props;
    const warehouseRegNo = route && route.params && route.params.warehouseRegNo;
    const warehSeq = route && route.params && route.params.warehSeq;
    // const seq = route && route.params && route.params.seq;
    const rentUserNo = route && route.params && route.params.rentUserNo;
    const type = route && route.params && route.params.type;
    const typeWH = route && route.params && route.params.typeWH;
    const status = route && route.params && route.params.status;
    console.log('routeRequescontract', route);
    const { dataApi } = this.state;
    console.log('dataApiRequest', dataApi);

    let dataKeep = dataApi &&
      typeWH === 'KEEP' && [
        {
          type: '창고명',
          value: dataApi.warehouse.warehouse,
        },
        {
          type: '창고주',
          value: dataApi.warehouse.owner,
        },
        {
          type: '위치',
          value: dataApi.warehouse.address,
        },
        {
          type: '선택 창고 유형',
          // value: this.coverStatus(status).processing,
          value: '임대 요청',
          highlight: true,
        },
        {
          type: '보관유형',
          value: dataApi.keep.whrgMgmtKeep.typeCode.stdDetailCodeName,
        },
        {
          type: '정산단위',
          value: dataApi.keep.whrgMgmtKeep.calUnitDvCode.stdDetailCodeName,
        },
        {
          type: '산정기준',
          value: dataApi.keep.whrgMgmtKeep.calStdDvCode.stdDetailCodeName,
        },
        {
          type: '가용면적',
          value: dataApi.keep.whrgMgmtKeep.usblValue,
        },
        {
          type: '임대 가능 기간',
          value: this.coverTime(dataApi.keep.whrgMgmtKeep.usblYmdFrom),
        },
        {
          type: '보관단가',
          value: dataApi.keep.whrgMgmtKeep.splyAmount,
        },
        {
          type: '관리단가',
          value: dataApi.keep.whrgMgmtKeep.mgmtChrg,
        },
      ];
    let dataTrust = dataApi &&
      typeWH === 'TRUST' && [
        {
          type: '창고명',
          value: dataApi.warehouse.warehouse,
        },
        {
          type: '창고주',
          value: dataApi.warehouse.owner,
        },
        {
          type: '위치',
          value: dataApi.warehouse.address,
        },
        {
          type: '선택 창고 유형',
          // value: this.coverStatus(status).processing,
          value: '수탁',
          highlight: true,
        },
        {
          type: '보관유형',
          value: dataApi.trust.whrgMgmtTrust.typeCode.stdDetailCodeName,
        },
        {
          type: '정산단위',
          value: dataApi.trust.whrgMgmtTrust.calUnitDvCode.stdDetailCodeName,
        },
        {
          type: '산정기준',
          value: dataApi.trust.whrgMgmtTrust.calStdDvCode.stdDetailCodeName,
        },
        {
          type: '수탁 가능 기간',
          value: this.coverTime(dataApi.trust.whrgMgmtTrust.usblYmdFrom),
        },
        {
          type: '수탁 가용 수량',
          value: dataApi.trust.whrgMgmtTrust.usblValue,
        },
        {
          type: '보관단가',
          value: dataApi.trust.whrgMgmtTrust.splyAmount,
        },
        {
          type: '입고단가',
          value: dataApi.trust.whrgMgmtTrust.whinChrg,
        },
        {
          type: '출고단가',
          value: dataApi.trust.whrgMgmtTrust.whoutChrg,
        },
        {
          type: '인건단가',
          value: dataApi.trust.whrgMgmtTrust.psnChrg,
        },
        {
          type: '가용면적',
          value: dataApi.trust.whrgMgmtTrust.mnfctChrg,
        },
        {
          type: '택배단가',
          value: dataApi.trust.whrgMgmtTrust.dlvyChrg,
        },
        {
          type: '운송단가',
          value: dataApi.trust.whrgMgmtTrust.shipChrg,
        },
      ];

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="마이페이지"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={DefaultStyle._body}>
            <View style={[DefaultStyle._titleBody, DefaultStyle._titleStatus]}>
              <Text style={DefaultStyle._textTitleCard}>견적･계약 상세</Text>
              <Text
                style={[
                  DefaultStyle._statusProcessing,
                  status === '5100' ? { backgroundColor: '#4caf50' } : '',
                ]}>
                {this.coverStatus(status) &&
                this.coverStatus(status).processingTrust &&
                typeWH === 'TRUST'
                  ? this.coverStatus(status).processingTrust
                  : this.coverStatus(status).processing}
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                <Image source={warehouse1} style={DefaultStyle._avatarHeader} />
              </View>
              <View>
                <View style={DefaultStyle._infoTable}>
                  <TableInfo
                    data={typeWH === 'KEEP' ? dataKeep && dataKeep : dataTrust}
                  />
                </View>
              </View>
            </View>
            {typeWH === 'KEEP' ? (
              <View style={[DefaultStyle._body, DefaultStyle._margin0]}>
                <View style={DefaultStyle._footerCards}>
                  <Text style={S.amount}>예상 견적 금액</Text>
                  <Text style={S.total}>
                    {dataApi && dataApi.keep && dataApi.keep.estimatedPrice}원
                  </Text>
                </View>
              </View>
            ) : null}
            <ContractInformation
              warehouseRegNo={warehouseRegNo}
              rentUserNo={rentUserNo}
              warehSeq={warehSeq}
              type={type}
              status={status}
              rentUser={
                dataApi && dataApi.warehouse && dataApi.warehouse.rentUser
              }
              warehouse={dataApi && dataApi.warehouse}
              navigation={this.navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let rentUserNo = this.props.route.params.rentUserNo;
    let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
    let typeWH = this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
    let url =
      type +
      '/' +
      warehouseRegNo +
      '-' +
      warehSeq +
      '/' +
      typeWH +
      '/' +
      rentUserNo;
    let urlTenant = type + '/' + warehouseRegNo + '-' + warehSeq + '/' + typeWH;
    // console.log('url', url);
    // console.log('urlTenant', urlTenant);
    await Warehouse.quotation(
      this.props.route.params.type === 'OWNER' ? url : urlTenant,
    )
      .then(res => {
        console.log('resRequest', res);
        if (res.status === 200) {
          this.setState({
            dataApi: res.data,
          });
          // this.props.quotationData(res.data);
        }
      })
      .catch(err => {
        console.log('errRequest', err);
      });
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestContract);
