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

const data = [
  {
    title: '내 창고',
  },
  {
    title: '견적･계약 관리',
  },
  {
    title: '입･출고 관리',
  },
  {
    title: '정산관리',
  },
  {
    title: '관심 창고',
  },
  // {
  //   title: '관심 창고',
  // },
];
const dataSteps = [
  {
    title: '견적요청',
    status: true,
    number: 25,
  },
  {
    title: '견적응답',
    status: true,
    number: 12,
  },
  {
    title: '견적승인',
    status: false,
    number: 0,
  },
  {
    title: '계약진행중',
    status: false,
    number: 0,
  },
  {
    title: '계약완료',
    status: false,
    number: 0,
  },
  {
    title: '계약승인',
    number: 0,
    status: false,
  },
];

class Mypage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSwitchOn: true,
      visibleConfirm: false,
      refreshKey: '',
      title:
        props.route.params && props.route.params.title
          ? props.route.params.title
          : '내 창고',
    };

    this.navigation = props.navigation;
  }

  /** when exits screen */
  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  /**
   * 탭 리로드를 위한 함수.
   * */
  doRefreshTab = (title) => {
    this.setState({ title: '' });
    setTimeout(() => {
      this.setState({ title: title ? title : '내 창고' });
    });
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
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
      return '보관창고, 수탁창고';
    }
    if (value.keep !== null && value.trust === null) {
      return '보관창고';
    }
    if (value.keep === null && value.trust !== null) {
      return ' 수탁창고';
    }
    if (value.keep === null && value.trust === null) {
      return '';
    }
  };

  render () {
    const { route, workComplete } = this.props;
    const { title, isSwitchOn, dataWH } = this.state;
    // console.log('title :>> ', title);
    // console.log('dataWH :>> ', dataWH);
    // console.log('route :>> ', route.params);
    let viewWH =
      dataWH &&
      dataWH.map((item, index) => {
        let subTitle = item.keep && item.keep.subTitle;
        let splyAmount = item.keep && money(item.keep.splyAmount);
        let mgmtChrg = item.keep && money(item.keep.mgmtChrg);
        let unit = item.keep && item.keep.unit;

        let subTitleTrust = item.trust && item.trust.subTitle;
        let whoutChrgTrustTrust = item.trust && money(item.trust.whoutChrg);
        let whinChrgTrust = item.trust && money(item.trust.whinChrg);
        let unitTrust = item.trust && item.trust.unit;
        let typeCover = this.coverType(item);

        let dataKeep =
          '최대' +
          (subTitle ? subTitle : '') +
          ',\n보관단가 ' +
          (splyAmount ? splyAmount : '') +
          '~/' +
          (unit ? unit : '') +
          ',\n관리단가 ' +
          (mgmtChrg ? mgmtChrg : '') +
          '~/' +
          (unit ? unit : '');

        let dataTrust =
          '최대' +
          (subTitleTrust ? subTitleTrust : '') +
          ',\n보관단가 ' +
          (whinChrgTrust ? whinChrgTrust : '') +
          '~/' +
          (unitTrust ? unitTrust : '') +
          ',\n관리단가 ' +
          (whoutChrgTrustTrust ? whoutChrgTrustTrust : '') +
          '~/' +
          (unitTrust ? unitTrust : '');

        let dataTable = [
          {
            type: '등록 상태',
            value:
              item.sttsDbCode && item.sttsDbCode.stdDetailCode === '0001'
                ? '미검증 공실'
                : item.sttsDbCode.stdDetailCodeName,
            colorValue: this.coverColor(
              item.sttsDbCode && item.sttsDbCode.stdDetailCode,
            ),
          },
          {
            type: '창고 유형',
            value: typeCover,
          },
          {
            type: '창고 주소',
            value: item.address && item.address,
          },
          {
            type: '보관 요약',
            value: dataKeep,
          },
          {
            type: '수탁 요약',
            value: dataTrust,
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
              item.modify === true ? (
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline, { borderColor: '#000000' }]}
                  onPress={() => {
                    item.sttsDbCode.stdDetailCode === '0001'
                      ? this.props.showPopup({
                        type: 'confirm',
                        image: '',
                        content: '공실이 검증되지 않은 창고입니다.',
                      })
                      : this.navigation.navigate('RegisterWH', {
                        type: 'ModifyWH',
                        warehouseRegNo: item.id,
                      });
                    // this.props.imageAction(listImage);
                  }}>
                  <Text
                    style={[DefaultStyle._textButton, { color: '#000000' }]}>
                    상세정보 수정하기
                  </Text>
                </TouchableOpacity>
              ) : null
            }
          />
        );
      });
    let viewComponent = (<View>
      <Progress />
    </View>);
    switch (this.state.title) {
      // TODO 라우트 갱신할 합수 전달.
      case '내 창고':
        viewComponent = (
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={[DefaultStyle._textTitleCard]}>내 창고</Text>
            </View>
            {viewWH}
            <TouchableOpacity
              style={DefaultStyle._btnInline}
              onPress={() => {
                this.navigation.navigate('RegisterWH');
                this.props.imageAction([]);
              }}>
              <Text style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                신규 등록
              </Text>
            </TouchableOpacity>
          </View>
        )
        break;
      case '견적･계약 관리':
        viewComponent = (
          <ContractManager
            doRefresh={this.doRefreshTab}
            dataSteps={dataSteps}
            navigation={this.navigation}
            // type="ProprietorMypage"
            // typeWH="Trust"
            // dataEstimate={dataEstimate}
            // dataRequest={dataRequest}
            // dataReply={dataReply}
          />
        );
        break;
      case '입･출고 관리':
        viewComponent = <InOutManager navigation={this.navigation} doRefresh={this.doRefreshTab} />;
        break;
      case '정산관리':
        viewComponent = <SettlementManagement navigation={this.navigation} doRefresh={this.doRefreshTab} />;
        break;
      case '관심 창고':
        viewComponent = <InterestWH navigation={this.navigation} doRefresh={this.doRefreshTab} />;
        break;
      // default:
      //   viewComponent;
      // code block
    }

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() =>
              route.params && route.params.prevView === 'PrevView'
                ? this.navigation.navigate('Home')
                : this.navigation.goBack()}
          />
          <Appbar.Content
            title={this.state.title}
            color="black"
            fontSize="16"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>

        <ScrollView>
          <AppGrid
            data={data}
            title={this.state.title}
            titleProps={e => {
              this.setState({
                title: e,
              });
            }}
          />
          <Text>{this.state.refreshKey}</Text>
          {viewComponent}
        </ScrollView>

        <Dialog
          visible={this.state.visibleConfirm}
          onDismiss={this.hideConfirm}>
          <Dialog.Title style={DefaultStyle._titleDialog}>
            Alert Title
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              창고주에게 응답 받은 견적 금액으로 계약을 진행하시겠습니까?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              color="rgba(0, 0, 0, 0.54)"
              style={[DefaultStyle._buttonElement]}
              onPress={this.hideConfirm}>
              아니오
            </Button>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={this.showDialog}>
              네
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            회원정보 수정 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              회원정보가 수정되었습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {
                this.hideDialog();
                this.hideConfirm();
                this.navigation.navigate('AvaliableChate');
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    // Progress
    this.props.setProgress({ is: true, })

    console.log('::componentDidMount:: MyPage', this.props.route.params.title);
    this.setState({ title: this.props.route.params.title });
    // const getWH = await Warehouse.myWH();
    // if (getWH.status === 200) {
    //   const dataWH = getWH.data._embedded.warehouses;
    //   console.log('dataWH :>> ', dataWH);
    // }

    await Warehouse.myWH()
      .then(res => {
        console.log('res', res);
        if (res.status === 200) {
          let dataWH = res.data._embedded.warehouses;
          this.setState({ dataWH });
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

    // SplashScreen.hide();
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
    imageAction: action => {
      dispatch(ActionCreator.dataImage(action));
    },
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
