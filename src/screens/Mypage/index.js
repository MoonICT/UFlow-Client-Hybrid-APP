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
import ActionCreator from '@Actions';

import card from '@Assets/images/card-img.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Warehouse } from '@Services/apis';

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
    title: '문의내역',
  },
  {
    title: '관심 창고',
  },
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
const dataInfo = [
  {
    type: '창고 유형',
    value: '보관창고, 수탁창고',
  },
  {
    type: '창고 주소',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '요약',
    value: '상온/냉동/냉장/보세 12,345평',
  },
  {
    type: '보관 가능 기간',
    value: '2020.10.21 - 2023.10.27',
  },
  {
    type: '보관비',
    value: '20,000원',
  },
  {
    type: '관리비',
    value: '5,000원',
  },
];
const listImage = [card, card, card];
const dataEstimate = [
  {
    type: '창고명',
    value: '에이씨티앤코아물류',
  },
  {
    type: '창고주',
    value: '(주)에이씨티앤코아물류',
  },
  {
    type: '위치',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '선택 창고 유형',
    value: '보관 요청',
    highlight: true,
  },
  {
    type: '보관유형',
    value: '저온',
  },
  {
    type: '정산단위',
    value: ' 제곱미터(m²)',
  },
  {
    type: '산정기준',
    value: '일(Day)',
  },
  {
    type: '가용면적',
    value: '2,000m²',
  },
  {
    type: '보관 가능기간',
    value: '2020.10.10 - 2021.10.10)',
  },
  {
    type: '보관비',
    value: '입고비(5,000원)',
  },
  {
    type: '관리비',
    value: '입고비(5,000원)',
  },
];

const dataRequest = [
  {
    type: '요청 일시',
    value: '2020.10.26 13:12:01',
  },
  {
    type: '요청 보관기간',
    value: '2020.11.10 - 2021.01.10',
  },
  {
    type: '요청 가용 면적',
    value: '8,000평',
  },
  {
    type: '정산단위',
    value: '제곱미터(m²)',
  },
  {
    type: '산정기준',
    value: '일(Day)',
  },
  {
    type: '요청 보관비',
    value: '19,000원',
  },
  {
    type: '요청 관리비',
    value: '일반관리비(7,000원)',
  },
  {
    type: '추가 요청사항',
  },
];

const dataReply = [
  {
    type: '요청 일시',
    value: '2020.10.26',
  },
  {
    type: '요청 보관기간',
    value: '2020.11.10 - 2021.01.10',
  },
  {
    type: '요청 가용 면적',
    value: '1,000평',
  },
  {
    type: '정산단위',
    value: '정산단위',
  },
  {
    type: '산정기준',
    value: '일(Day)',
  },
  {
    type: '보관비',
    value: ' 20,000원',
  },
  {
    type: '관리비',
    value: '일반관리비(5,000원)',
  },
  {
    type: '추가 요청사항',
  },
];

const dataEstimateTrust = [
  {
    type: '창고명',
    value: '에이씨티앤코아물류',
  },
  {
    type: '창고주',
    value: '(주)에이씨티앤코아물류',
  },
  {
    type: '위치',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '선택 창고 유형',
    value: '수탁 요청',
    highlight: true,
  },
  {
    type: '보관유형',
    value: '상온',
  },
  {
    type: '정산단위',
    value: '제곱미터(m²)',
  },
  {
    type: '산정기준',
    value: '일(Day)',
  },
  {
    type: '가용면적',
    value: '2,000m²',
  },

  {
    type: '수탁 가능기간',
    value: '2020.10.10 - 2021.10.10)',
  },
  {
    type: '보관료',
    value: '5,000원',
  },
  {
    type: '관리비',
    value: '5,000원',
  },
];

const dataRequestTrust = [
  {
    type: '요청 일시',
    value: '2020.10.26',
  },
  {
    type: '요청 보관기간',
    value: '2020.11.10 - 2021.01.10',
  },
  {
    type: '정산단위',
    value: '제곱미터(m²)',
  },
  {
    type: '산정기준',
    value: '일(Day)',
  },
  {
    type: '요청 입고비',
    value: '19,000평',
  },
  {
    type: '요청 관리비',
    value: '일반관리비(7,000원)',
  },
  {
    type: '추가 요청 사항',
  },
];

const dataReplyTrust = [
  {
    type: '요청 일시',
    value: '2020.10.26',
  },
  {
    type: '요청 보관기간',
    value: '2020.11.10 - 2021.01.10',
  },
  {
    type: '응답 가용 면적',
    value: '1,000평',
  },
  {
    type: '정산단위',
    value: '제곱미터(m²)',
  },
  {
    type: '산정기준',
    value: '일(Day)',
  },

  {
    type: '응답 보관비',
    value: ' 20,000원',
  },

  {
    type: '응답 관리비',
    value: '일반관리비(5,000원)',
  },
  {
    type: '추가 요청 사항',
  },
];
class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchOn: true,
      visibleConfirm: false,
      title: props.route.params && props.route.params.title,
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
  render() {
    const { imageStore, workComplete } = this.props;
    const { title, isSwitchOn } = this.state;
    console.log('title', title);
    let viewComponent = (
      <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
        <View style={DefaultStyle._titleCard}>
          <Text style={[DefaultStyle._textTitleCard]}>내 창고</Text>
        </View>
        <CardMypage
          headerComponent={
            <View style>
              <Text
                style={[
                  DefaultStyle._titleWH,
                  // { padding: 15, marginLeft: 16, marginTop: 16 },
                ]}>
                상온창고
              </Text>
              <Text style={[DefaultStyle._headerCardTitle, { paddingTop: 4 }]}>
                에이씨티앤코아물류
              </Text>
            </View>
          }
          rightHeader={
            <Switch
              value={isSwitchOn}
              onValueChange={() => {
                this.setState({ isSwitchOn: !isSwitchOn });
              }}
            />
          }
          data={dataInfo}
          borderRow={false}
          styleLeft={S.styleLeftTable}
          styleRight={S.styleRightTable}
          bgrImage={card}
          footer={
            <TouchableOpacity
              style={[DefaultStyle._btnOutline, { borderColor: '#000000' }]}
              onPress={() => {
                this.navigation.navigate('RegisterWH', {
                  type: 'ModifyWH',
                });
                this.props.imageAction(listImage);
              }}>
              <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                상세정보 수정하기
              </Text>
            </TouchableOpacity>
          }
        />
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
    );
    switch (title) {
      case '견적･계약 관리':
        viewComponent = (
          <ContractManager
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
      // case '입･출고 관리':
      //   viewComponent = <InOutManager navigation={this.navigation} />;
      //   break;
      // case '정산관리':
      //   viewComponent = <SettlementManagement navigation={this.navigation} />;
      //   break;
      // case '관심 창고':
      //   viewComponent = <InterestWH navigation={this.navigation} />;
      //   break;
      default:
      // code block
    }

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
          <AppGrid
            data={data}
            title={title}
            titleProps={e => this.setState({ title: e })}
          />
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
  async componentDidMount() {
    // console.log('::componentDidMount::');
    const getWH = await Warehouse.myWH();
    // console.log('getWH :>> ', getWH);
    if (getWH.status === 200) {
      const dataWH = getWH.data.data.content;
      console.log('dataWH :>> ', dataWH);
    }
    // SplashScreen.hide();
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
    imageAction: action => {
      dispatch(ActionCreator.dataImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mypage);
