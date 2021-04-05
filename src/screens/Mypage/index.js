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
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Text,
  Dialog,
  Paragraph,
  Button,
  Switch,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Select from '@Components/organisms/Select';
import CardMypage from '@Components/organisms/CardMypage';

import ContractManager from './ContractManager';
import InOutManager from './InOutManager';
import ActionCreator from '@Actions';
import SettlementManagement from './SettlementManagement';
import InterestWH from './InterestWH';

import card from '@Assets/images/card-img.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Warehouse } from '@Services/apis';
import { money } from '@Services/utils/StringUtils';
import Progress from '@Components/organisms/Progress';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class Mypage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSwitchOn: true,
      titleSearchWH: getMsg(this.props.lang, 'ML0119', '전체'),
      refreshKey: '',
      // dataSearchWH:[],
      title:
        props.route.params && props.route.params.title
          ? props.route.params.title
          : getMsg(this.props.lang, 'ML0230', '내 창고'),
      tab:
        props.route.params && props.route.params.tab
          ? props.route.params.tab
          : 'Mypage_mywhrg',
    };

    this.tabList = [
      {
        id: 'Mypage_mywhrg',
        title: getMsg(this.props.lang, 'ML0230', '내 창고'),
      },
      {
        id: 'Mypage_cntr',
        title: getMsg(this.props.lang, 'ML0250', '견적･계약 관리'),
      },
      {
        id: 'Mypage_io',
        title: getMsg(this.props.lang, 'ML0251', '입･출고 관리'),
      },
      {
        id: 'Mypage_settlement',
        title: getMsg(this.props.lang, 'ML0252', '정산관리'),
      },
      // {
      //   id: 'Mypage_fav',
      //   title: getMsg(this.props.lang, 'ML0253', '관심 창고'),
      // },
    ]

    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  /**
   * 탭 리로드를 위한 함수.
   * */
  doRefreshTab = title => {
    this.setState({ title: '', tab: '' });
    let tabStatus = ''
    this.tabList.some((item) => {
      if (item.title === title) {
        return tabStatus = item.id
      }
    })
    setTimeout(() => {
      this.setState({
        title: title ? title : getMsg(this.props.lang, 'ML0230', '내 창고'),
        tab: tabStatus ? tabStatus : this.state.tab
      });
    });
  };

  coverColor = value => {
    switch (value) {
      case '0001':
        return 'rgba(0, 0, 0, 0.54)';
      case '1100':
        return '#2196f3';
      case '4100':
        return '#fbc02d';
      case '5100':
        return '#4caf50';
      case '9100':
        return '#f44336';
    }
  };
  coverType = value => {
    if (value.keep !== null && value.trust !== null) {
      return `${getMsg(this.props.lang, 'ML0047', '임대창고')}, ${getMsg(this.props.lang, 'ML0047', '수탁창고')}`;
    }
    if (value.keep !== null && value.trust === null) {
      return getMsg(this.props.lang, 'ML0047', '임대창고');
    }
    if (value.keep === null && value.trust !== null) {
      return getMsg(this.props.lang, 'ML0047', '수탁창고');
    }
    if (value.keep === null && value.trust === null) {
      return '';
    }
  };
  onChangeStatusWarehouse = value => {
    const { dataWH } = this.state;
    console.log('onChangeStatusWarehouse', value);
    if (value === 'All') {
      this.setState({ dataSearchWH: dataWH });
    } else {
      let _dataWH = dataWH.filter(
        item => item.sttsDbCode.stdDetailCode === value,
      );
      this.setState({ dataSearchWH: _dataWH });
    }
  };

  render () {
    const { route, workComplete } = this.props;
    const {
      title,
      refreshKey,
      dataWH,
      titleSearchWH,
      dataSearchWH,
    } = this.state;
    console.log('dataSearchWH', dataSearchWH);
    // console.log('title :>> ', title);
    // console.log('route :>> ', route.params);
    let viewWH =
      dataWH &&
      (dataSearchWH ? dataSearchWH : dataWH).map((item, index) => {
        let subTitle = item.keep && item.keep.subTitle;
        let splyAmount = item.keep && money(item.keep.splyAmount);
        let mgmtChrg = item.keep && money(item.keep.mgmtChrg);
        let unit = item.keep && item.keep.unit;

        let subTitleTrust = item.trust && item.trust.subTitle;
        let whoutChrgTrustTrust = item.trust && money(item.trust.whoutChrg);
        let whinChrgTrust = item.trust && money(item.trust.whinChrg);
        let splyAmountTrust = item.trust && money(item.trust.splyAmount);
        let unitTrust = item.trust && item.trust.unit;
        let typeCover = this.coverType(item);

        let dataKeep =
          `${getMsg(this.props.lang, 'ML0144', '임대단가')} ` +
          (splyAmount ? splyAmount : '') +
          '~/' +
          (unit ? unit : '') +
          `,\n${getMsg(this.props.lang, 'ML0145', '관리단가')} ` +
          (mgmtChrg ? mgmtChrg : '') +
          '~/' +
          (unit ? unit : '');

        let dataTrust =
          `${getMsg(this.props.lang, 'ML0150', '입고단가')} ` +
          (whinChrgTrust ? whinChrgTrust : '') +
          `,\n${getMsg(this.props.lang, 'ML0151', '출고단가')} ` +
          (whoutChrgTrustTrust ? whoutChrgTrustTrust : '') +
          `,\n${getMsg(this.props.lang, 'ML0149', '보관단가')} ` +
          (splyAmountTrust ? splyAmountTrust : '');

        let dataTable = [
          {
            type: getMsg(this.props.lang, 'ML0254', '등록 상태'),
            value: item.sttsDbCode && item.sttsDbCode.stdDetailCode === '0001' ?
              getMsg(this.props.lang, 'ML0255', '미검증 공실')
              : item.sttsDbCode.stdDetailCodeName,
            colorValue: this.coverColor(
              item.sttsDbCode && item.sttsDbCode.stdDetailCode,
            ),
          },
          {
            type: getMsg(this.props.lang, 'ML0109', '계약 유형'),
            value: typeCover,
          },
          {
            type: getMsg(this.props.lang, 'ML0256', '창고 주소'),
            value: item.address && item.address,
          },
          {
            type: item.keep && getMsg(this.props.lang, 'ML0257', '임대 요약'),
            value: item.keep && dataKeep,
          },
          {
            type: item.trust && getMsg(this.props.lang, 'ML0258', '수탁 요약'),
            value: item.trust && dataTrust,
          },
        ];

        return (
          <CardMypage
            key={index}
            headerComponent={
              <View style>
                <Text
                  style={[
                    DefaultStyle._titleWH,
                    // { padding: 15, marginLeft: 16, marginTop: 16 },
                  ]}>
                  {item.useTypeCode.stdDetailCodeName}
                </Text>
                <Text
                  style={[DefaultStyle._headerCardTitle, { paddingTop: 4 }]}>
                  {item.name}
                </Text>
              </View>
            }
            rightHeader={
              <Text />
              // <Switch
              //   value={isSwitchOn}
              //   onValueChange={() => {
              //     this.setState({ isSwitchOn: !isSwitchOn });
              //   }}
              // />
            }
            data={dataTable}
            borderRow={false}
            styleLeft={S.styleLeftTable}
            styleRight={S.styleRightTable}
            bgrImage={item.thumbnail ? { uri: item.thumbnail } : null}
            footer={
              item.modify ? (
                <View style={[DefaultStyle._listBtn]}>
                  <TouchableOpacity
                    style={[
                      DefaultStyle._btnOutline,
                      DefaultStyle.mt_16,
                      S.mr_10,
                      { borderColor: '#000000' },
                    ]}
                    onPress={() => {
                      // item.sttsDbCode.stdDetailCode === '0001'
                      //   ? this.props.showPopup({
                      //     type: 'confirm',
                      //     image: '',
                      //     content: '공실이 검증되지 않은 창고입니다.',
                      //   })
                      //   : this.navigation.navigate('RegisterWH', {
                      //     type: 'ModifyWH',
                      //     warehouseRegNo: item.id,
                      //     doRefresh: () => {
                      //       this.getWHList();
                      //     },
                      //   });
                      this.navigation.navigate('RegisterWH', {
                        type: 'ModifyWH',
                        warehouseRegNo: item.id,
                        doRefresh: () => {
                          this.getWHList();
                        },
                      })
                    }}>
                    <Text
                      style={[DefaultStyle._textButton, { color: '#000000' }]}>
                      상세정보 수정하기
                    </Text>
                  </TouchableOpacity>

                  {/** 삭제하기 */}
                  <TouchableOpacity
                    style={[
                      DefaultStyle._btnOutline,
                      DefaultStyle.mt_16,
                      { borderColor: '#000000' },
                    ]}
                    onPress={() => {
                      // 0001:공실등록, 1100:공실검증완료, 4100:계약진행중, 5100:계약체결, 9100:공실검증실패
                      if (item.sttsDbCode.stdDetailCode === '0001' // 공실등록
                        || item.sttsDbCode.stdDetailCode === '1100' // 검증완료
                        || item.sttsDbCode.stdDetailCode === '9100') { // 검증실패
                        // 삭제
                        // setDeleteTarget(WHItem.id)
                        // doRefresh: () => {
                        //   this.getWHList();
                        // }
                        this.props.showPopup({
                          // type: 'confirm',
                          title: getMsg(this.props.lang, 'ML0259', '창고삭제'),
                          image: '',
                          content: getMsg(this.props.lang, 'ML0260', '해당 창고를 정말 삭제하시겠습니까?'),
                          onConfirm: () => Warehouse.deleteWarehouse({ id: item.id }).then(res => {
                            this.getWHList();
                          })
                        })

                      } else {
                        this.props.showPopup({
                          type: 'confirm',
                          image: '',
                          content: getMsg(this.props.lang, 'ML0261', '창고 삭제를 할 수 없는 상태입니다.(공실등록, 공실검증완료, 공실검증실패 단계에 수정 가능'),
                        })
                      }
                    }}>
                    <Text
                      style={[DefaultStyle._textButton, { color: '#000000' }]}>
                      {getMsg(this.props.lang, 'ML0259', '창고삭제')}
                    </Text>
                  </TouchableOpacity>

                </View>

              ) : null
            }
          />
        );
      });
    let viewComponent = (
      <View>
        <Progress />
      </View>
    );

    // switch (this.state.title) {
    switch (this.state.tab) {
      case 'Mypage_mywhrg': // 내 창고
        viewComponent = (
          <View
            style={[
              DefaultStyle._cards,
              DefaultStyle._margin0,
              { paddingBottom: 100 },
            ]}>
            <View style={[DefaultStyle._titleBody, { flex: 1, flexWrap: 'wrap' }]}>
              <Text style={[DefaultStyle._textTitleCard]}>{getMsg(this.props.lang, 'ML0230', '내 창고')}</Text>
              {/* <Select
                arrayStyle={{ width: 250,marginLeft:30 }}
                data={dataStatusWarehouse}
                valueSelected={titleSearchWH}
                valueProps={this.onChangeStatusWarehouse}
              /> */}
            </View>
            {viewWH}
            <TouchableOpacity
              style={[DefaultStyle._btnInline, {marginTop: 16}]}
              onPress={() => {
                this.navigation.navigate('WarehouseType', {
                  doRefresh: () => {
                    // 창고 목록 갱신.
                    this.getWHList();
                  }
                });
              }}>
              <Text
                style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                {getMsg(this.props.lang, 'ML0247', '신규 등록')}
              </Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case 'Mypage_cntr': //'견적･계약 관리':
        viewComponent = (
          <ContractManager
            doRefresh={this.doRefreshTab}
            navigation={this.navigation}
          />
        );
        break;
      case 'Mypage_io': //'입･출고 관리':
        viewComponent = (
          <InOutManager
            navigation={this.navigation}
            doRefresh={this.doRefreshTab}
          />
        );
        break;
      case 'Mypage_settlement': // '정산관리':
        viewComponent = (
          <SettlementManagement
            navigation={this.navigation}
            doRefresh={this.doRefreshTab}
          />
        );
        break;
      case 'Mypage_fav': //'관심 창고':
        viewComponent = (
          <InterestWH
            navigation={this.navigation}
            doRefresh={this.doRefreshTab}
          />
        );
        break;
      // default:
      //   viewComponent;
      // code block
    }

    return (
      <SafeAreaView style={[S.container]}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() =>
              route.params && route.params.prevView === 'PrevView'
                ? this.navigation.navigate('Home')
                : this.navigation.goBack()
            }
          />
          <Appbar.Content
            title={this.state.title}
            color="black"
            fontSize="16"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>

        <ScrollView style={{}}>
          <AppGrid
            data={this.tabList}
            title={this.state.title}
            titleProps={(title, index) => {
              this.setState({
                title: title,
                tab: this.tabList[index].id
              });
            }}
          />
          {refreshKey ? <Text>{refreshKey}</Text> : null}
          {viewComponent}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /**
   * 내 창고 목록 정보 조회.
   * */
  getWHList = async () => {
    // Progress
    this.props.setProgress({ is: true });
    await Warehouse.myWH()
      .then(res => {
        console.log('res', res);
        if (res.status === 200) {
          let _dataWH = res.data._embedded.warehouses;
          // let dataWH = _dataWH.filter(
          //   item => item.sttsDbCode.stdDetailCode !== '0001',
          // );
          // console.log('dataWH=>', _dataWH);
          this.setState({ dataWH: _dataWH });
        }

        // Progress
        setTimeout(() => {
          this.props.setProgress({ is: false });
        }, 300);
      })
      .catch(err => {
        console.log('err', err);
        setTimeout(() => {
          this.props.setProgress({ is: false });
        }, 300);
      });
  };

  /** when after render DOM */
  async componentDidMount () {
    console.log('::componentDidMount:: MyPage', this.props.route.params.title);
    this.setState({ title: this.props.route.params.title });
    // const getWH = await Warehouse.myWH();
    // if (getWH.status === 200) {
    //   const dataWH = getWH.data._embedded.warehouses;
    //   console.log('dataWH :>> ', dataWH);
    // }

    await this.getWHList();
  }

  UNSAFE_componentWillReceiveProps (newProps) {
    let titleProp =
      newProps.route && newProps.route.params && newProps.route.params.title;
    console.log('titleProp :>> ', titleProp);
    this.setState({ title: titleProp });
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mypage);
