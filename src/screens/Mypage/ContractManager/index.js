/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Select from '@Components/organisms/Select';
import CardMypage from '@Components/organisms/CardMypage';

import card from '@Assets/images/card-img.png';
import { styles as S } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Warehouse } from '@Services/apis';
import ActionCreator from '@Actions';

const dataSelect = [
  {
    label: '계약유형',
    value: '',
  },
  {
    label: '보관',
    value: 'KEEP',
  },
  {
    label: '수탁',
    value: 'TRUST',
  },
];
const dataSelect2 = [
  {
    label: '견적･계약 상태',
    value: '',
  },
  {
    label: '견적요청',
    value: 'RQ00',
  },
  {
    label: '견적응답',
    value: 'RS00',
  },
  {
    label: '계약협의',
    value: '1100',
  },
  {
    label: '계약요청대기',
    value: '2100',
  },
  {
    label: '계약중',
    value: '4100',
  },
  {
    label: '계약완료',
    value: '5100',
  },
];

class ContractManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
      visibleConfirm: false,
      valueTab: 'OWNER',
      contractType: '',
      contractStatus: '',
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
  //console.log('//::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  cover = value => {
    switch (value.status) {
      case 'RQ00':
        // code block
        return {
          data: [
            {
              type: '창고 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대 요청',
            },
            {
              type: '견적 금액',
              value:
                ((value.estmtTrust && value.estmtTrust.estimatedPrice) ||
                  (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
                  (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
                  (value.cntrKeep && value.cntrKeep.estimatedPrice)) + '원',
            },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate,
            },
            {
              type: '견적 상태',
              value: '견적 요청',
              highlight: true,
            },
          ],
          // listBtnOwner: true,
          footerTitle:
            this.state.valueTab === 'OWNER' ? '견적 응답' : '견적 재요청',
          navigation: '',
        };
      case 'RS00':
        // code block
        return {
          data: [
            {
              type: '창고 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대 요청',
            },
            {
              type: '견적 금액',
              value:
                ((value.estmtTrust && value.estmtTrust.estimatedPrice) ||
                  (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
                  (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
                  (value.cntrKeep && value.cntrKeep.estimatedPrice)) + '원',
            },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate,
            },
            {
              type: '견적 상태',
              value: '견적 응답',
              highlight: true,
            },
          ],
          listBtnTenant: true,
        };
      case '1100':
        // code block
        return {
          data: [
            {
              type: '창고 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대 요청',
            },
            {
              type: '견적 금액',
              value:
                ((value.estmtTrust && value.estmtTrust.estimatedPrice) ||
                  (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
                  (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
                  (value.cntrKeep && value.cntrKeep.estimatedPrice)) + '원',
            },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate,
            },
            {
              type: '견적 상태',
              value: value.type2 === 'OWNER' ? '계약 요청' : '계약중',
              highlight: true,
            },
          ],
        };

      case '2100':
        // code block
        return {
          data: [
            {
              type: '창고 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대 요청',
            },
            {
              type: '견적 금액',
              value:
                ((value.estmtTrust && value.estmtTrust.estimatedPrice) ||
                  (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
                  (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
                  (value.cntrKeep && value.cntrKeep.estimatedPrice)) + '원',
            },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate,
            },
            {
              type: '견적 상태',
              value: '계약요청대기',
              highlight: true,
            },
          ],
        };

      case '4100':
        // code block
        return {
          data: [
            {
              type: '창고 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대 요청',
            },
            {
              type: '견적 금액',
              value:
                ((value.estmtTrust && value.estmtTrust.estimatedPrice) ||
                  (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
                  (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
                  (value.cntrKeep && value.cntrKeep.estimatedPrice)) + '원',
            },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate,
            },
            {
              type: '견적 상태',
              value: '계약중',
              highlight: true,
            },
          ],
        };
      case '5100':
        // code block
        return {
          data: [
            {
              type: '창고 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대 요청',
            },
            {
              type: '견적 금액',
              value:
                ((value.estmtTrust && value.estmtTrust.estimatedPrice) ||
                  (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
                  (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
                  (value.cntrKeep && value.cntrKeep.estimatedPrice)) + '원',
            },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate,
            },
            {
              type: '견적 상태',
              value: '계약 완료',
              highlight: false,
            },
          ],
        };
    }
  };
  render() {
    const {
      dataSteps,
      type,
      typeWH,
      dataContractWH,
    } = this.props;
    const { valueTab, dataApi, contractType, contractStatus } = this.state;
    console.log('dataContractWH', dataContractWH)
    // Data Filter type and status
    let dataFilter =
      dataContractWH &&
      dataContractWH.filter(el => {
        let types;
        let status;
        if (contractType === '') {
          types = el.type2 === 'KEEP' || el.type2 === 'TRUST';
        } else {
          types = el.type2 === contractType;
        }
        if (contractStatus !== '') {
          status = el.status === contractStatus;
        } else {
          status =
            el.status === 'RQ00' ||
            el.status === 'RS00' ||
            el.status === '1100' ||
            el.status === '2100' ||
            el.status === '4100' ||
            el.status === '5100';
        }
        return types && status;
      });
    const viewStep =
      dataSteps &&
      dataSteps.map((item, index) => {
        return (
          <View style={S.step} key={index}>
            <View style={S.stepLeft}>
              <Text style={S.textStep}>{item.title}</Text>

              <Text
                style={[
                  S.textNumber,
                  item.status === true ? S.textNumberActive : null,
                ]}>
                {item.number}
              </Text>
            </View>
            {(index + 1) % 3 === 0 ? null : (
              <View style={S.rightStep}>
                <Icon
                  name="arrow-forward-ios"
                  size={12}
                  color="rgba(0, 0, 0, 0.54)"
                />
              </View>
            )}
          </View>
        );
      });

    const viewProprietor =
      dataFilter &&
      dataFilter.map((item, index) => {
        let dataTable = this.cover(item) && this.cover(item).data;
        let listBtnTenant = this.cover(item) && this.cover(item).listBtnTenant;
        let titleButton = this.cover(item) && this.cover(item).footerTitle;
        return (
          <Fragment key={index}>
            <CardMypage
              key={index}
              onPressHeader={() =>
                this.navigation.navigate('Quotation', {
                  type: valueTab,
                  typeWH: item.type2,
                  warehouseRegNo: item.warehouseRegNo,
                  warehSeq: item.warehSeq,
                  seq: item.seq,
                  rentUserNo: item.rentUserNo,
                  status: item.status,
                })
              }
              headerTitle={item.info.warehouse}
              data={dataTable}
              borderRow={false}
              styleLeft={DefaultStyle._leftTableCard}
              styleRight={DefaultStyle._rightTableCard}
              bgrImage={
                item.thumbnail
                  ? {
                      uri: item.thumbnail,
                    }
                  : null
              }
              footer={
                <Fragment>
                  {// (listBtnOwner === true && valueTab === 'OWNER') ||
                  listBtnTenant === true && valueTab === 'TENANT' ? (
                    <View style={DefaultStyle.row}>
                      <TouchableOpacity
                        style={[
                          DefaultStyle._btnOutline,
                          DefaultStyle._btnLeft,
                        ]}
                        onPress={() =>
                          this.navigation.navigate('ResponseQuotation', {
                            // status: 'Answerd',
                            type: valueTab,
                            typeWH: item.type2,
                            warehouseRegNo: item.warehouseRegNo,
                            warehSeq: item.warehSeq,
                            seq: item.seq,
                            rentUserNo: item.rentUserNo,
                            status: item.status,
                          })
                        }>
                        <Text style={DefaultStyle._textButton}>
                          {
                            // valueTab === 'OWNER' ? '견적 응답' :
                            '견적 재요청'
                          }
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          DefaultStyle._btnInline,
                          DefaultStyle._btnRight,
                        ]}
                        onPress={() => this.showConfirm()}>
                        <Text
                          style={[
                            DefaultStyle._textButton,
                            DefaultStyle._textInline,
                          ]}>
                          견적 승인
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : titleButton ? (
                    <TouchableOpacity
                      style={DefaultStyle._btnOutline}
                      onPress={() => console.log(titleButton)}>
                      <Text
                        style={[
                          DefaultStyle._textButton,
                          // DefaultStyle._textInline,
                        ]}>
                        {titleButton}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </Fragment>
              }
            />

            {/**  <CardMypage
            onPressHeader={() =>
              this.navigation.navigate('Quotation', {
                status: 'Answerd',
                type,
                dataEstimate,
                dataRequest,
                dataReply,
              })
            }
            headerTitle={'태영종합물류센터'}
            data={dataInfo2}
            borderRow={false}
            styleLeft={DefaultStyle._leftTableCard}
            styleRight={DefaultStyle._rightTableCard}
            bgrImage={card}
            footer={
              <View style={DefaultStyle._listBtn}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
                  onPress={() => console.log('견적 재요청')}>
                  <Text style={DefaultStyle._textButton}>견적 재요청</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
                  onPress={() => this.showConfirm()}>
                  <Text
                    style={[
                      DefaultStyle._textButton,
                      DefaultStyle._textInline,
                    ]}>
                    견적 승인
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />  */}
          </Fragment>
        );
      });
    return (
      <View style={DefaultStyle._body}>
        <View style={DefaultStyle._titleBody}>
          <Text style={[DefaultStyle._textTitleCard]}>견적･계약 관리</Text>
        </View>
        <View style={DefaultStyle._card}>
          <View style={S.steps}>{viewStep}</View>
        </View>
        <View style={DefaultStyle._tabBar}>
          <TouchableOpacity
            style={valueTab === 'OWNER' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.setState({ valueTab: 'OWNER' })}>
            <Text
              style={
                valueTab === 'OWNER'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청 받은 견적･계약
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={valueTab === 'TENANT' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.setState({ valueTab: 'TENANT' })}>
            <Text
              style={
                valueTab === 'TENANT'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청한 견적･계약
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            DefaultStyle._listElement,
            DefaultStyle._flexEnd,
            DefaultStyle._optionList,
            { marginTop: 16 },
          ]}>
          <View style={[S.optionSelect, S.selectLong]}>
            <Select
              data={dataSelect}
              style={S.select}
              valueProps={e => {
                this.setState({ contractType: e });
                this.props.filterTypeContractData({ type: e });
              }}
            />
          </View>
          <View style={[S.optionSelect, S.selectLong]}>
            <Select
              data={dataSelect2}
              style={S.select}
              valueProps={e => {
                this.setState({ contractStatus: e });
                this.props.filterTypeContractData({ status: e });
              }}
            />
          </View>
        </View>
        {viewProprietor}
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    const type = this.state.valueTab;
    await Warehouse.contractManager(type)
      .then(res => {
        const status = res.status;
        if (status === 200) {
          // this.setState({ dataApi: res.data.data.content });
          this.props.contractData({ dataApi: res.data.data.content });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    // console.log('getWH :>> ', getWH);
    // if (getWH.status === 200) {
    //   const dataCT = getWH.data.data.content;
    //   // console.log('dataCT:>> ', dataCT);
    //   this.state = { data: dataCT };
    // }
    // SplashScreen.hide();
  }

  // async componentWillUpdate(nextProps, nextState) {
  //   console.log('Component WILL UPDATE!', nextState);
  //   const type = nextState.valueTab;
  //   // await Warehouse.contractManager(type)
  //   //   .then(res => {
  //   //     console.log('::::: API Sign in :::::', res);
  //   //     const status = res.status;
  //   //     if (status === 200) {
  //   //       this.setState({ dataApi: res.data.data.content });
  //   //     }
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('err', err);
  //   // });
  // }
  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    let valueState = this.state.valueTab;
    let valuePrev = prevState.valueTab;
    if (valueState !== valuePrev) {
      Warehouse.contractManager(valueState)
        .then(res => {
          const status = res.status;
          if (status === 200) {
            // this.setState({ dataApi: res.data.data.content });
            this.props.contractData({ dataApi: res.data.data.content });
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    dataContractWH: state.warehouse.dataContractWH,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    contractData: action => {
      dispatch(ActionCreator.contractData(action));
    },
    filterTypeContractData: action => {
      dispatch(ActionCreator.filterContractData(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContractManager);