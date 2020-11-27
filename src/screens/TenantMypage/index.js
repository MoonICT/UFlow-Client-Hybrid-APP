/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Select from '@Components/organisms/Select';

import ActionCreator from '../../actions';

import card from '@Assets/images/card-img.png';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const data = [
  {
    title: '견적･계약 관리',
  },
  {
    title: '회원가입',
  },
  {
    title: '창고조회',
  },
  {
    title: '창고등록',
  },
  {
    title: '창고등록5',
  },
  {
    title: '창고등록6',
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
class TenantMypage extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
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
  render() {
    const { imageStore, workComplete } = this.props;
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
          <AppGrid data={data} />
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleCard}>
              <Text style={[DefaultStyle._textTitleCard, S.textTitleTenant]}>
                견적･계약 관리
              </Text>
            </View>
            <View style={DefaultStyle._card}>
              <View style={S.steps}>{viewStep}</View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.options}>
              <View style={S.optionSelect}>
                <Select data={dataSelect} style={S.select} />
              </View>
              <View style={[S.optionSelect, S.selectLong]}>
                <Select data={dataSelect2} style={S.select} />
              </View>
            </View>

            <View style={DefaultStyle._card}>
              <TouchableOpacity
                style={DefaultStyle._headerCard}
                onPress={() =>
                  this.navigation.navigate('Quotation', {
                    status: 'notAnswerd',
                    type: 'Commission',
                  })
                }>
                <Text style={DefaultStyle._headerCardTitle}>
                  에이씨티앤코아물류
                </Text>
                <View style={DefaultStyle.rightTitleHeader}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.87)"
                  />
                </View>
              </TouchableOpacity>
              <View style={DefaultStyle._bodyCard}>
                <Image source={card} style={S.imgAva} />
                <View style={S.info}>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 유형</Text>
                    <Text style={S.rightInfo}>보관창고, 수탁창고</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 금액</Text>
                    <Text style={S.rightInfo}>577,000원</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 주소</Text>
                    <Text style={S.rightInfo}>
                      인천광역시 서구 석남동 650-31
                    </Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 요청일</Text>
                    <Text style={S.rightInfo}>2020.10.26</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 상태</Text>
                    <Text style={[S.rightInfo, S.highlightInfo]}>
                      견적 요청
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={S.button} onPress={() => {}}>
                  <Text style={S.textButton}>견적 재요청</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={DefaultStyle._card}>
              <TouchableOpacity
                style={DefaultStyle._headerCard}
                onPress={() =>
                  this.navigation.navigate('Quotation', {
                    status: 'Answerd',
                    type: 'Commission',
                  })
                }>
                <Text style={DefaultStyle._headerCardTitle}>
                  에이씨티앤코아물류
                </Text>
                <View style={DefaultStyle.rightTitleHeader}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.87)"
                  />
                </View>
              </TouchableOpacity>
              <View style={DefaultStyle._bodyCard}>
                <Image source={card} style={S.imgAva} />
                <View style={S.info}>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 유형</Text>
                    <Text style={S.rightInfo}>보관창고, 수탁창고</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 금액</Text>
                    <Text style={S.rightInfo}>577,000원</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 주소</Text>
                    <Text style={S.rightInfo}>
                      인천광역시 서구 석남동 650-31
                    </Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 요청일</Text>
                    <Text style={S.rightInfo}>2020.10.26</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 상태</Text>
                    <Text style={[S.rightInfo, S.highlightInfo]}>
                      견적 요청
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={S.button} onPress={() => {}}>
                  <Text style={S.textButton}>견적 재요청</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={DefaultStyle._card}>
              <TouchableOpacity
                style={DefaultStyle._headerCard}
                onPress={() =>
                  this.navigation.navigate('QuotationTrust', {
                    status: 'notAnswerd',
                    type: 'Commission',
                  })
                }>
                <Text style={DefaultStyle._headerCardTitle}>
                  에이씨티앤코아물류
                </Text>
                <View style={DefaultStyle.rightTitleHeader}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.87)"
                  />
                </View>
              </TouchableOpacity>
              <View style={DefaultStyle._bodyCard}>
                <Image source={card} style={S.imgAva} />
                <View style={S.info}>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 유형</Text>
                    <Text style={S.rightInfo}>보관창고, 수탁창고</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 금액</Text>
                    <Text style={S.rightInfo}>577,000원</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 주소</Text>
                    <Text style={S.rightInfo}>
                      인천광역시 서구 석남동 650-31
                    </Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 요청일</Text>
                    <Text style={S.rightInfo}>2020.10.26</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 상태</Text>
                    <Text style={[S.rightInfo, S.highlightInfo]}>
                      견적 요청
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={S.button} onPress={() => {}}>
                  <Text style={S.textButton}>견적 재요청</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={DefaultStyle._card}>
              <TouchableOpacity
                style={DefaultStyle._headerCard}
                onPress={() =>
                  this.navigation.navigate('QuotationTrust', {
                    status: 'notAnswerd',
                    type: 'Commission',
                  })
                }>
                <Text style={DefaultStyle._headerCardTitle}>
                  에이씨티앤코아물류
                </Text>
                <View style={DefaultStyle.rightTitleHeader}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.87)"
                  />
                </View>
              </TouchableOpacity>
              <View style={DefaultStyle._bodyCard}>
                <Image source={card} style={S.imgAva} />
                <View style={S.info}>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 유형</Text>
                    <Text style={S.rightInfo}>보관창고, 수탁창고</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 금액</Text>
                    <Text style={S.rightInfo}>577,000원</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 주소</Text>
                    <Text style={S.rightInfo}>
                      인천광역시 서구 석남동 650-31
                    </Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 요청일</Text>
                    <Text style={S.rightInfo}>2020.10.26</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 상태</Text>
                    <Text style={[S.rightInfo, S.highlightInfo]}>
                      견적 요청
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={S.button} onPress={() => {}}>
                  <Text style={S.textButton}>견적 재요청</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={DefaultStyle._card}>
              <TouchableOpacity
                style={DefaultStyle._headerCard}
                onPress={() =>
                  this.navigation.navigate('QuotationTrust', {
                    status: 'Answerd',
                    type: 'Commission',
                  })
                }>
                <Text style={DefaultStyle._headerCardTitle}>
                  에이씨티앤코아물류
                </Text>
                <View style={DefaultStyle.rightTitleHeader}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.87)"
                  />
                </View>
              </TouchableOpacity>
              <View style={DefaultStyle._bodyCard}>
                <Image source={card} style={S.imgAva} />
                <View style={S.info}>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 유형</Text>
                    <Text style={S.rightInfo}>보관창고, 수탁창고</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 금액</Text>
                    <Text style={S.rightInfo}>577,000원</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>창고 주소</Text>
                    <Text style={S.rightInfo}>
                      인천광역시 서구 석남동 650-31
                    </Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 요청일</Text>
                    <Text style={S.rightInfo}>2020.10.26</Text>
                  </View>
                  <View style={S.row}>
                    <Text style={S.leftInfo}>견적 상태</Text>
                    <Text style={[S.rightInfo, S.highlightInfo]}>
                      견적 요청
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={S.button} onPress={() => {}}>
                  <Text style={S.textButton}>견적 재요청</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
)(TenantMypage);
