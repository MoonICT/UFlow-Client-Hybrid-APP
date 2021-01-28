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
import AsyncStorage from "@react-native-community/async-storage";

// Local Imports
import DefaultStyle from '@Styles/default';
import Select from '@Components/organisms/SelectFilter';
import CardMypage from '@Components/organisms/CardMypage';

import { styles as S } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Warehouse } from '@Services/apis';
import ActionCreator from '@Actions';
import { StringUtils } from '@Services/utils';
import { MY_PAGE_TAB_STATUS_KEY } from '@Constant';

const dataSelect = [
  {
    label: '계약유형',
    value: '',
  },
  {
    label: '임대',
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
  constructor (props) {
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

  /** when exits screen */
  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  cover = value => {

    const debugStatus = ''; //(' ' + value.status);

    switch (value.status) {
      case 'RQ00':
        // code block
        return {
          data: [
            {
              type: '창고 ID',
              value: value.warehouseRegNo,
            },
            {
              type: '계약 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대',
            },
            // value.type2 === 'TRUST'
            //   ? {}
            //   : {
            //     type: '견적 금액',
            //     value: StringUtils.moneyConvert(
            //       (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
            //       (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
            //       (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
            //       (value.cntrKeep && value.cntrKeep.estimatedPrice),
            //     ),
            //   },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate ? StringUtils.dateStr(value.createdDate) : '',
            },
            {
              type: '견적 상태',
              value: '견적요청' + debugStatus,
              highlight: true,
            },
          ],
          // listBtnOwner: true,
          footerTitle: this.state.valueTab === 'OWNER' ? '견적 응답' : '견적 재요청',
          navigation: '',
          status: 'RQ00',
          userType: this.state.valueTab,
          contractType: value.type2,
        };
      case 'RS00':
        // code block
        return {
          data: [
            {
              type: '창고 ID',
              value: value.warehouseRegNo,
            },
            {
              type: '계약 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대',
            },
            // value.type2 === 'TRUST'
            //   ? {}
            //   : {
            //     type: '견적 금액',
            //     value: StringUtils.moneyConvert(
            //       (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
            //       (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
            //       (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
            //       (value.cntrKeep && value.cntrKeep.estimatedPrice),
            //     ),
            //   },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate ? StringUtils.dateStr(value.createdDate) : '',
            },
            {
              type: '견적 상태',
              value: '견적응답' + debugStatus,
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
              type: '창고 ID',
              value: value.warehouseRegNo,
            },
            {
              type: '계약 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대',
            },
            // value.type2 === 'TRUST'
            //   ? {}
            //   : {
            //     type: '견적 금액',
            //     value: StringUtils.moneyConvert(
            //       (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
            //       (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
            //       (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
            //       (value.cntrKeep && value.cntrKeep.estimatedPrice),
            //     ),
            //   },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate ? StringUtils.dateStr(value.createdDate) : '',
            },
            {
              type: '견적 상태',
              // value: this.state.valueTab === 'OWNER' ? '계약협의' : '계약중',
              value: '계약협의' + debugStatus,
              highlight: true,
            },
          ],
        };

      case '2100':
        // code block
        return {
          data: [
            {
              type: '창고 ID',
              value: value.warehouseRegNo,
            },
            {
              type: '계약 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대',
            },
            // value.type2 === 'TRUST'
            //   ? {}
            //   : {
            //     type: '견적 금액',
            //     value: StringUtils.moneyConvert(
            //       (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
            //       (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
            //       (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
            //       (value.cntrKeep && value.cntrKeep.estimatedPrice),
            //     ),
            //   },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate ? StringUtils.dateStr(value.createdDate) : '',
            },
            {
              type: '견적 상태',
              value: '계약요청대기' + debugStatus,
              highlight: true,
            },
          ],
        };

      case '4100':
        // code block
        return {
          data: [
            {
              type: '창고 ID',
              value: value.warehouseRegNo,
            },
            {
              type: '계약 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대',
            },
            // value.type2 === 'TRUST'
            //   ? {}
            //   : {
            //     type: '견적 금액',
            //     value: StringUtils.moneyConvert(
            //       (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
            //       (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
            //       (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
            //       (value.cntrKeep && value.cntrKeep.estimatedPrice),
            //     ),
            //   },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate ? StringUtils.dateStr(value.createdDate) : '',
            },
            {
              type: '견적 상태',
              value: '계약중' + debugStatus,
              highlight: true,
            },
          ],
        };
      case '5100':
        // code block
        return {
          data: [
            {
              type: '창고 ID',
              value: value.warehouseRegNo,
            },
            {
              type: '계약 유형',
              value: value.type2 === 'TRUST' ? '수탁' : '임대',
            },
            // value.type2 === 'TRUST'
            //   ? {}
            //   : {
            //     type: '견적 금액',
            //     value: StringUtils.moneyConvert(
            //       (value.estmtTrust && value.estmtTrust.estimatedPrice) ||
            //       (value.estmtKeep && value.estmtKeep.estimatedPrice) ||
            //       (value.cntrTrust && value.cntrTrust.estimatedPrice) ||
            //       (value.cntrKeep && value.cntrKeep.estimatedPrice),
            //     ),
            //   },
            {
              type: '창고 주소',
              value: value.info.address,
            },
            {
              type: '견적 요청일',
              value: value.createdDate ? StringUtils.dateStr(value.createdDate) : '',
            },
            {
              type: '견적 상태',
              value: '계약완료' + debugStatus,
              highlight: false,
            },
          ],
        };
    }
  };

  /**
   * 탭 상태 저장을 위해 로컬 저장소에 상태 저장.
   * @Param type : 탭 상태
   * */
  onChangeTabStatus = (type) => {
    this.setState({ valueTab: type });
    AsyncStorage.setItem(MY_PAGE_TAB_STATUS_KEY, type);
  };

  render () {
    const { dataContractWH } = this.props;
    /** type, typeWH,  */
    let {
      valueTab,
      // dataApi,
      contractType,
      contractStatus,
      dataSteps,
    } = this.state;
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

    // console.log('dataFilter', dataFilter);
    // console.log('dataSteps', dataSteps);

    let checkStep = dataFilter.length === 0;

    const viewStep = dataSteps && dataSteps.map((item, index) => {
      return (
        <View style={S.step} key={index}>
          <View style={S.stepLeft}>
            <Text style={S.textStep}>{item.title}</Text>
            <TouchableOpacity
              style={[S.textNumber, item.status === true && !checkStep ? S.textNumberActive : null]}>
              <Text
                style={[S.textNumber2, item.status === true && !checkStep ? S.textNumber2Active : null]}>{checkStep ? 0 : item.number}</Text>
            </TouchableOpacity>
          </View>
          {(index + 1) % 3 === 0 ? null : (
            <View style={S.rightStep}>
              <Icon
                name="arrow-forward-ios"
                size={12}
                style={[]}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          )}
        </View>
      );
    });

    const goDetail = (item, mode) => {

      console.log(mode, 'mode');
      console.log(item, 'item');
      if (item) {
        console.log('상세보기 클릭')
        this.navigation.navigate(
          item.status === 'RQ00' || item.status === 'RS00'
            ? 'Quotation' // Goto RQ00, RS00
            : 'RequestContract', // Goto 1100, 2100, 4100, 5100
          {
            onRefresh: this.onRefresh,
            type: valueTab,
            typeWH: item.type2,
            warehouseRegNo: item.warehouseRegNo,
            warehSeq: item.warehSeq,
            seq: item.seq,
            rentUserNo: item.rentUserNo,
            status: item.status,
            rentUserID: item.rentUser?.id || item.rentUserNo,
            regUserDate: item.cntrYmdFrom,
            mode: mode,
            thumbnail: item.thumbnail
          },
        )
      }
    }

    const viewProprietor = dataFilter && dataFilter.map((item, index) => {
      let dataTable = this.cover(item) && this.cover(item).data;
      let listBtnTenant = this.cover(item) && this.cover(item).listBtnTenant;
      let titleButton = this.cover(item) && this.cover(item).footerTitle;
      let status = this.cover(item) && this.cover(item).status;
      let contractType = this.cover(item) && this.cover(item).contractType;
      let userType = this.cover(item) && this.cover(item).userType;

      return (
        <Fragment key={index}>
          <CardMypage
            key={index}
            item={item}
            onPressHeader={() => goDetail(item, null)}
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
            footer={<Fragment>
              {item &&
              (listBtnTenant === true && valueTab === 'TENANT' ? (
                <View style={[DefaultStyle.row, { marginTop: 20 }]}>

                  <TouchableOpacity
                    style={[
                      DefaultStyle._btnOutline,
                      DefaultStyle._btnLeft,
                    ]}
                    // 계약 재요청
                    onPress={() => {
                      console.log(item, 'footer item');
                      goDetail(item, 'RE');
                    }}>

                    <Text style={DefaultStyle._textButton}>
                      견적 재요청
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      DefaultStyle._btnInline,
                      DefaultStyle._btnRight,
                    ]}
                    // 계약요청
                    onPress={() => goDetail(item, 'CT')}>
                    <Text
                      style={[
                        DefaultStyle._textButton,
                        DefaultStyle._textInline,
                      ]}>
                      계약 요청
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : titleButton ? (
                <View style={[DefaultStyle.row, { marginTop: 20 }]}>
                  <TouchableOpacity
                    style={DefaultStyle._btnOutline}
                    onPress={() => goDetail(item, userType === 'OWNER' ? "RS" : "RE")}>
                    <Text
                      style={[
                        DefaultStyle._textButton,
                        // DefaultStyle._textInline,
                      ]}>
                      {titleButton}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null)}
            </Fragment>
            }
          />
        </Fragment>
      );
    });

    return (
      <View style={[DefaultStyle._body, { paddingBottom: 180 }]}>
        <View style={DefaultStyle._titleBody}>
          <Text style={[DefaultStyle._textTitleCard]}>견적･계약 관리</Text>
        </View>

        {/** 탭 (OWNER/TENANT) **/}
        <View style={DefaultStyle._tabBar}>
          <TouchableOpacity
            style={valueTab === 'OWNER' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.onChangeTabStatus('OWNER')}>
            <Text
              style={
                valueTab === 'OWNER'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청 받은 견적･계약 (창고주)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={valueTab === 'TENANT' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.onChangeTabStatus('TENANT')}>
            <Text
              style={
                valueTab === 'TENANT'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청한 견적･계약 (임차인)
            </Text>
          </TouchableOpacity>
        </View>

        {/** Contract Process **/}
        <View style={[DefaultStyle._card, { marginBottom: 0 }]}>
          <View style={S.steps}>{viewStep}</View>
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

  onRefresh = (valueTab) => {
    console.log("::::ContractManager Mount::::", valueTab);
    this.props.doRefresh(valueTab);
    // this.setState({
    //   valueTab: valueTab
    // })
  }

  /** when after render DOM */
  async componentDidMount () {
    // Progress
    this.props.setProgress({ is: true, });

    const type = this.state.valueTab;
    await Warehouse.contractManager(type)
      .then(res => {
        const status = res.status;
        if (status === 200) {

          this.props.contractData({ dataApi: res.data.data.content });
          let data = res.data;
          let dataSteps = [
            {
              statusCode: 'RS00',
              title: '견적요청',
              status: data.countRQ00 > 0 ? true : false,
              number: data.countRQ00,
            },
            {
              statusCode: 'RQ00',
              title: '견적응답',
              status: data.countRS00 > 0 ? true : false,
              number: data.countRS00,
            },
            {
              statusCode: '1100',
              title: '계약협의',
              status: data.count1100 > 0 ? true : false,
              number: data.count1100,
            },
            {
              statusCode: '2100',
              title: '계약요청대기',
              status: data.count2100 > 0 ? true : false,
              number: data.count2100,
            },
            {
              statusCode: '4100',
              title: '계약중',
              status: data.count4100 > 0 ? true : false,
              number: data.count4100,
            },
            {
              statusCode: '5100',
              title: '계약완료',
              number: data.count5100,
              status: data.count5100 > 0 ? true : false,
            },
          ];

          this.setState({ dataSteps });
          // Progress
          this.props.setProgress({ is: false, });
        }
      })
      .catch(err => {
        console.log('err', err);
        // Progress
        this.props.setProgress({ is: false, });
      });


    // 탭 초기화.
    const tabStatus = await AsyncStorage.getItem(MY_PAGE_TAB_STATUS_KEY);
    if (tabStatus) {
      this.setState({ valueTab: tabStatus === 'OWNER' ? 'OWNER' : 'TENANT' });
    }
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    let valueState = this.state.valueTab;
    let valuePrev = prevState.valueTab;
    if (valueState !== valuePrev) {
      // Progress
      this.props.setProgress({ is: true, });
      Warehouse.contractManager(valueState)
        .then(res => {
          console.log('resContractUpdate', res.data.data.content);
          const status = res.status;
          if (status === 200) {
            // this.setState({ dataApi: res.data.data.content });
            this.props.contractData({ dataApi: res.data.data.content });
            let data = res.data;

            let dataSteps = [
              {
                statusCode: 'RS00',
                title: '견적요청',
                status: data.countRQ00 > 0 ? true : false,
                number: data.countRQ00,
              },
              {
                statusCode: 'RQ00',
                title: '견적응답',
                status: data.countRS00 > 0 ? true : false,
                number: data.countRS00,
              },
              {
                statusCode: '1100',
                title: '계약협의',
                status: data.count1100 > 0 ? true : false,
                number: data.count1100,
              },
              {
                statusCode: '2100',
                title: '계약요청대기',
                status: data.count2100 > 0 ? true : false,
                number: data.count2100,
              },
              {
                statusCode: '4100',
                title: '계약중',
                status: data.count4100 > 0 ? true : false,
                number: data.count4100,
              },
              {
                statusCode: '5100',
                title: '계약완료',
                number: data.count5100,
                status: data.count5100 > 0 ? true : false,
              },
            ];

            this.setState({ dataSteps });
            // Progress
            this.props.setProgress({ is: false, });
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }


    // TODO 여기서 호출할 필요가 있는지???
    if (prevState.isConfirmRequest !== this.state.isConfirmRequest) {

      let warehSeq = this.state.dataProps.warehSeq;
      let warehouseRegNo = this.state.dataProps.warehouseRegNo;
      let rentUserNo = this.state.dataProps.rentUserNo;

      let type = this.state.valueTab;
      let typeWH = this.state.dataProps.typeWH === 'TRUST' ? 'trust' : 'keep';
      let data =
        this.state.dataProps.typeWH === 'TRUST'
          ? { warehouseRegNo, mgmtTrustSeq: warehSeq }
          : { warehouseRegNo, mgmtKeepSeq: warehSeq };

      Warehouse.requestContract({ typeWH, data })
        .then(res => {

          if (res.status === 200) {

            // TODO 견적요청 하기로 가기전에 현재 기본값을 가져가야함
            this.navigation.navigate('RequestContract', {
              type,
              warehouseRegNo,
              warehSeq,
              typeWH: this.state.dataProps.typeWH,
              rentUserNo,
              status: '1100',
            });
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    dataContractWH: state.warehouse.dataContractWH,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    contractData: action => {
      dispatch(ActionCreator.contractData(action));
    },
    filterTypeContractData: action => {
      dispatch(ActionCreator.filterContractData(action));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContractManager);
