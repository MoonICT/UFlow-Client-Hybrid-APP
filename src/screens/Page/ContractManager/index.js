/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
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

const dataInfo = [
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
    value: '577,000원',
  },
  {
    type: '견적 요청일',
    value: '2020.10.26',
  },
  {
    type: '견적 상태',
    value: '견적 응답',
    highlight: false,
  },
];
const dataInfo2 = [
  {
    type: '창고 유형',
    value: '보관창고, 수탁창고',
  },
  {
    type: '견적 금액',
    value: '보관',
  },
  {
    type: '창고 주소',
    value: '577,000원',
  },
  {
    type: '견적 요청일',
    value: '2020.10.26',
  },
  {
    type: '견적 상태',
    value: '견적 응답',
    highlight: true,
  },
];
class ContractManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false, visibleConfirm: false };
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

    return (
      <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
        <View style={DefaultStyle._titleCard}>
          <Text style={[DefaultStyle._textTitleCard, S.textTitleTenant]}>
            견적･계약 관리
          </Text>
        </View>
        <View style={DefaultStyle._card}>
          <View style={S.steps}>{viewStep}</View>
        </View>
        <View style={S.options}>
          <View style={S.optionSelect}>
            <Select data={dataSelect} style={S.select} />
          </View>
          <View style={[S.optionSelect, S.selectLong]}>
            <Select data={dataSelect2} style={S.select} />
          </View>
        </View>

        <CardMypage
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
          headerTitle={'에이씨티앤코아물류'}
          data={dataInfo}
          borderRow={false}
          styleLeft={S.styleLeftTable}
          styleRight={S.styleRightTable}
          bgrImage={card}
        />

        <CardMypage
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
          styleLeft={S.styleLeftTable}
          styleRight={S.styleRightTable}
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
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  견적 승인
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
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
    imageStore: state.registerWH.imageData,
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
