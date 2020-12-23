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

const dataSelect = [
  {
    label: '1개월',
    value: '1개월',
  },
  {
    label: '2개월',
    value: '2개월',
  },
];
const dataSelect2 = [
  {
    label: '상태',
    value: '상태',
  },
  {
    label: '상태2',
    value: '상태2',
  },
  {
    label: '상태3',
    value: '상태3',
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
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });

  render() {
    const {
      dataSteps,
      dataEstimate,
      dataRequest,
      dataReply,
      type,
      typeWH,
    } = this.props;
    const { valueTab, dataApi } = this.state;
    console.log('dataApi :>> ', dataApi);

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
      dataApi &&
      dataApi.map((item, index) => {
        let dataTable = cover(item).data;
        let listBtnOwner = cover(item).listBtnOwner;
        let listBtnTenant = cover(item).listBtnTenant;
        let titleButton = cover(item).footerTitle;
        let textNavigation = cover(item).navigation;
        let listBtn = cover(item).listBtn;
        return (
          <Fragment key={index}>
            <CardMypage
              key={index}
              onPressHeader={() =>
                this.navigation.navigate('Quotation', {
                  status: 'notAnswerd',
                  type,
                  typeWH,
                  dataEstimate,
                  dataRequest,
                  dataReply,
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
                  {(listBtnOwner === true && valueTab === 'OWNER') ||
                  (listBtnTenant === true && valueTab === 'TENANT') ? (
                    <View style={DefaultStyle._listBtn}>
                      <TouchableOpacity
                        style={[
                          DefaultStyle._btnOutline,
                          DefaultStyle._btnLeft,
                        ]}
                        onPress={() => console.log('견적 응답')}>
                        <Text style={DefaultStyle._textButton}>
                          {valueTab === 'OWNER' ? '견적 응답' : '견적 재요청'}
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
                  ) : (
                    <TouchableOpacity
                      style={DefaultStyle._btnInline}
                      onPress={() => console.log(titleButton)}>
                      <Text
                        style={[
                          DefaultStyle._textButton,
                          DefaultStyle._textInline,
                        ]}>
                        {titleButton}
                      </Text>
                    </TouchableOpacity>
                  )}
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
          ]}>
          <View style={S.optionSelect}>
            <Select data={dataSelect} style={S.select} />
          </View>
          <View style={[S.optionSelect, S.selectLong]}>
            <Select data={dataSelect2} style={S.select} />
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
          this.setState({ dataApi: res.data.data.content });
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
    console.log('aaaaa', valueState, valuePrev);
    if (valueState !== valuePrev) {
      Warehouse.contractManager(valueState)
        .then(res => {
          const status = res.status;
          if (status === 200) {
            this.setState({ dataApi: res.data.data.content });
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
)(ContractManager);

const cover = value => {
  console.log('value', value);
  switch (value.status) {
    case 'RQ00':
      // code block
      return {
        data: [
          {
            type: '창고 유형',
            value: '보관창고, 수탁창고',
          },
          {
            type: '견적 금액',
            value:
              (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
              (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
              (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
              (value.cntrKeep && value.cntrKeep.estimatedPrice),
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
        listBtnOwner: true,

        footerTitle: '견적 재요청',
        navigation: '',
      };
    case 'RS00':
      // code block
      return {
        data: [
          {
            type: '요청자',
            value: value.type2 === 'TRUST' ? '수탁' : '보관',
          },
          {
            type: '요청 창고 유형',
            value: '보관',
          },
          {
            type: '요청 견적 금액',
            value:
              (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
              (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
              (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
              (value.cntrKeep && value.cntrKeep.estimatedPrice),
          },
          {
            type: '견적 요청일',
            value: value.createdDate,
          },
          {
            type: '견적 상태',
            value: '견적 응답',
            highlight: false,
          },
        ],
        listBtnTenant: true,
      };
    case '1100':
      // code block
      return {
        data: [
          {
            type: '요청자',
            value: 'abc123',
          },
          {
            type: '요청 창고 유형',
            value: '보관',
          },
          {
            type: '요청 견적 금액',
            value:
              (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
              (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
              (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
              (value.cntrKeep && value.cntrKeep.estimatedPrice),
          },
          {
            type: '견적 요청일',
            value: value.createdDate,
          },
          {
            type: '견적 상태',
            value: '계약 요청',
            highlight: true,
          },
        ],
        // footerTitle: 'test',
        // navigation: '',
      };
    case '4100':
      // code block
      return {
        data: [
          {
            type: '창고 유형',
            value: '보관창고, 수탁창고',
          },
          {
            type: '견적 금액',
            value:
              (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
              (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
              (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
              (value.cntrKeep && value.cntrKeep.estimatedPrice),
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
            type: '견적 승인일',
            value: '2020.10.26',
          },
          {
            type: '견적 상태',
            value: '계약 진행 중',
            highlight: true,
          },
        ],
        footerTitle: '계약서 작성',
        navigation: '',
      };
    case '5100':
      // code block
      return {
        data: [
          {
            type: '창고 유형',
            value: '보관창고, 수탁창고',
          },
          {
            type: '견적 금액',
            value:
              (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
              (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
              (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
              (value.cntrKeep && value.cntrKeep.estimatedPrice),
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
            type: '견적 승인일',
            value: '2020.10.26',
          },
          {
            type: '견적 상태',
            value: '계약 완료',
            highlight: false,
          },
        ],
        footerTitle: '입출고 관리',
        navigation: '',
      };
    // code block
  }
};
