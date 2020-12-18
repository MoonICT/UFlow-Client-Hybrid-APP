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
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Select from '@Components/organisms/Select';
import CardMypage from '@Components/organisms/CardMypage';
import ContractManager from '@Screeens/Page/ContractManager';

import InOutManager from './InOutManager';
import SettlementManagement from './SettlementManagement';
import InterestWH from './InterestWH';
import ActionCreator from '@Actions';

import card from '@Assets/images/card-img.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const data = [
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
    label: '견적 요청',
    value: '견적 요청',
  },
  {
    label: '견적 응답',
    value: '견적 응답',
  },
  {
    label: '견적 승인',
    value: '견적 승인',
  },
  {
    label: '계약 진행 중',
    value: '계약 진행 중',
  },
  {
    label: '계약 완료',
    value: '계약 완료',
  },
  {
    label: '계약 취소',
    value: '계약 취소',
  },
  {
    label: '전체',
    value: '전체',
  },
];
const dataSteps = [
  {
    title: '견적요청',
    status: true,
    number: 2,
  },
  {
    title: '견적요청',
    status: false,
    number: 0,
  },
  {
    title: '견적요청',
    status: false,
    number: 0,
  },
  {
    title: '견적요청',
    status: false,
    number: 0,
  },
  {
    title: '견적요청',
    status: true,
    number: 2,
  },
  {
    title: '견적요청',
    number: 2,
    status: true,
  },
];

const dataInfo = [
  {
    type: '창고 유형',
    value: '보관창고, 수탁창고',
  },
  {
    type: '견적 금액',
    value: '577,000원',
  },
  {
    type: '창고 주소',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '견적 요청일',
    value: '2020.10.26',
  },
  {
    type: '견적 상태',
    value: '견적 요청',
    highlight: true,
  },
];
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
    value: '5,000원',
  },
  {
    type: '보관 가능기간',
    value: '2020.10.10 - 2021.10.10)',
  },
  {
    type: '관리비',
    value: '입고비(5,000원)',
  },
];

const dataRequest = [
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
class TenantMypage extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
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
    console.log('::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  render() {
    const { imageStore, workComplete, route } = this.props;
    const { title } = this.state;
    // const viewStep =
    //   dataSteps &&
    //   dataSteps.map((item, index) => {
    //     return (
    //       <View style={S.step} key={index}>
    //         <View style={S.stepLeft}>
    //           <Text style={S.textStep}>{item.title}</Text>

    //           <Text
    //             style={[
    //               S.textNumber,
    //               item.status === true ? S.textNumberActive : null,
    //             ]}>
    //             {item.number}
    //           </Text>
    //         </View>
    //         {(index + 1) % 3 === 0 ? null : (
    //           <View style={S.rightStep}>
    //             <Icon
    //               name="arrow-forward-ios"
    //               size={12}
    //               color="rgba(0, 0, 0, 0.54)"
    //             />
    //           </View>
    //         )}
    //       </View>
    //     );
    //   });
    let viewComponent = (
      <ContractManager
        dataSteps={dataSteps}
        navigation={this.navigation}
        dataEstimate={dataEstimate}
        dataRequest={dataRequest}
        dataReply={dataReply}
      />
    );
    switch (title) {
      case '입･출고 관리':
        viewComponent = <InOutManager navigation={this.navigation} />;
        break;
      case '정산관리':
        viewComponent = <SettlementManagement navigation={this.navigation} />;
        break;
      case '관심 창고':
        viewComponent = <InterestWH navigation={this.navigation} />;
        break;
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
    console.log('::componentDidMount::');
    SplashScreen.hide();
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
)(TenantMypage);
