/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
import Select from '@Components/organisms/Select';
import FilterButton from '@Components/atoms/FilterButton';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '../../../actions';

import { styles as S } from '../style';
import { styles as SS } from './style';

const dataStart = [
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD',
  },
];
const dataEnd = [
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD',
  },
  {
    label: 'YYYY.MM.DD2',
    value: 'YYYY.MM.DD2',
  },
];
const dataSum = [
  {
    type: '입고량 합계',
    value: '200',
  },
  {
    type: '출고량 합계',
    value: '200',
  },
  {
    type: '재고량 합계',
    value: '400',
  },
  {
    type: '입고비 합계',
    value: '200,000',
  },
  {
    type: '출고비 합계',
    value: '200,000',
  },
  {
    type: '제고비 합계',
    value: '300,000',
  },
  {
    type: '총 합계',
    value: '700,000',
  },
];
const dataDate1 = [
  {
    type: '구분',
    value: '출고비',
  },
  {
    type: '일시',
    value: '2020.11.15 09:12:10',
  },
  {
    type: '출고량',
  },
  {
    type: '재고량',
    value: '100',
  },
  {
    type: '입고비',
    value: '100,000',
  },
  {
    type: '출고비',
  },
  {
    type: '재고비',
    value: '100,000',
  },
  {
    type: '합계',
    value: '200,000',
  },
  {
    type: '비고',
  },
];

const dataInfo = [
  {
    type: '창고명',
    value: '동원창고',
  },
  {
    type: '창고주',
    value: '(주)동원창고',
  },
  {
    type: '기간',
    value: '2020.11.1 ~ 2020.11.30',
  },
  {
    type: '담당자',
    value: '홍길동',
  },
  {
    type: '담당자 전화번호',
    value: '010-1234-1234',
  },
  {
    type: '담당자 이메일',
    value: 'abc@naver.com',
  },
];
const dataTotal = [
  {
    type: '공급가액',
    value: '1,800,000',
  },
  {
    type: '부가세',
    value: '180,000',
  },
  {
    type: '합계금액',
    value: '1,900.000',
  },
];
const viewProgress = [
  {
    type: '작성 일시',
    value: '2020.11.10 09:05:00',
  },
  {
    type: '작성자',
    value: '임차인(ID)',
  },
  {
    type: '구분',
    value: '입고 요청',
  },
  {
    type: '예정/ 확정 일시',
    value: '입고예정 : 2020.11.10 09:05:00',
  },
  {
    type: '입고량',
    value: '100',
  },
  {
    type: '출고량',
  },
  {
    type: '재고',
  },
  {
    type: '적용단가',
    value: '950/PLT',
  },
  {
    type: '입고비',
    value: '95,000원',
  },
  {
    type: '출고비',
  },
  {
    type: '보관비',
  },
];

const viewCosts = [
  {
    type: '정산기간',
    value: '2020.11.11 ~ 2020.11.30',
  },
  {
    type: '작성자',
    value: '파렛트',
  },
  {
    type: '전용면적',
    value: '500',
  },
  {
    type: '보관비',
    value: '1,000,000원',
  },
  {
    type: '보관비',
    value: '1,000,000원',
  },
];
class DetailsSettlement extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      toggleFee: true,
      toggleCosts: true,
      feeState: [],
    };

    this.navigation = props.navigation;
  }
  _toggle = index => {
    let FeeState = this.state.feeState;

    let findIndex = FeeState.findIndex(el => el.id === index);
    findIndex !== -1
      ? (FeeState[findIndex].toggle = !FeeState[findIndex].toggle)
      : FeeState.push({ toggle: true, id: index });
    this.setState({
      feeData: FeeState,
    });
  };
  render() {
    // const { imageStore } = this.props;
    const { route } = this.props;
    const { feeState, toggleFee, toggleCosts } = this.state;
    const dataFee = [
      {
        title: '합계',
        value: dataSum,
      },
      {
        title: '2020.11.15',
        value: dataDate1,
      },
      {
        title: '2020.11.14',
        value: dataSum,
      },
      {
        title: '2020.11.13',
        value: dataSum,
      },
    ];

    const dataCost = [
      {
        title: '합계',
        value: dataSum,
      },
      {
        title: '총 합계',
        valueTitle: '700,000',
      },
      {
        title: '보관비',
        value: dataSum,
      },
      {
        title: '관리비',
        value: dataSum,
      },
    ];
    const viewFee =
      dataFee &&
      dataFee.map((item, index) => {
        let findIndex = this.state.feeState.findIndex(el => el.id === index);
        return (
          <View key={index}>
            <FilterButton
              label={item.title}
              onPress={() => this._toggle(index)}
              isToggle={findIndex !== -1 ? feeState[findIndex].toggle : false}
              style={SS.toggle}
              styleLabel={SS.textToggle}
            />
            {feeState[findIndex] &&
            item.value &&
            feeState[findIndex].toggle === true ? (
              <TableInfo borderBottom={true} data={item.value} />
            ) : null}
          </View>
        );
      });

    const viewCost =
      dataCost &&
      dataCost.map((item, index) => {
        let findIndex = this.state.feeState.findIndex(el => el.id === index);
        return (
          <View key={index}>
            {item.valueTitle ? (
              <View style={SS.noteToggle}>
                <Text style={SS.textNote}>{item.title}</Text>
                <Text
                  style={[
                    SS.textNote,
                    { marginLeft: 'auto', marginRight: 'auto' },
                  ]}>
                  {item.valueTitle}
                </Text>
              </View>
            ) : (
              <FilterButton
                label={item.title}
                onPress={() => this._toggle(index)}
                isToggle={findIndex !== -1 ? feeState[findIndex].toggle : false}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
            )}

            {feeState[findIndex] &&
            item.value &&
            feeState[findIndex].toggle === true ? (
              <TableInfo borderBottom={true} data={item.value} />
            ) : null}
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
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <View style={DefaultStyle._titleCard}>
              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  S.textTitleTenant,
                  { paddingBottom: 0 },
                ]}>
                정산 상세 내역
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View
                style={[
                  DefaultStyle._headerCardTitle,
                  DefaultStyle._borderBottom,
                ]}>
                <Text
                  style={[
                    DefaultStyle._textTitleCard,
                    S.textTitleTenant,
                    { paddingBottom: 0 },
                  ]}>
                  계약정보
                </Text>
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo
                  data={dataInfo}
                  borderRow={false}
                  borderBottom={true}
                />
              </View>
              <View style={[DefaultStyle._footerCards, { padding: 16 }]}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline]}
                  onPress={() => {}}>
                  <Text style={[DefaultStyle._textButton]}>거래명세서</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={S.filter}>
              <View style={[S.options, { justifyContent: 'flex-start' }]}>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={dataStart} style={[S.select]} />
                </View>
                <Text style={S.hyphen}>-</Text>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={dataEnd} style={S.select} />
                </View>
              </View>
            </View>

            <View style={SS.fee}>
              <FilterButton
                label="입･출고비"
                onPress={() => this.setState({ toggleFee: !toggleFee })}
                isToggle={toggleFee}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
              {toggleFee === false ? (
                <Fragment>
                  <TableInfo
                    data={viewProgress}
                    style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                  />
                  {viewFee}
                  <View style={SS.footerCheckInfo}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('엑셀다운');
                      }}
                      style={[DefaultStyle._btnOutline, SS.btnProcess]}>
                      <Text
                        style={[
                          DefaultStyle._textButton,
                          { color: '#000000' },
                        ]}>
                        엑셀다운
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              ) : null}
            </View>

            <View style={SS.fee}>
              <FilterButton
                label="보관 및 추가비용"
                onPress={() => this.setState({ toggleCosts: !toggleCosts })}
                isToggle={toggleCosts}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
              {toggleCosts === true ? (
                <Fragment>
                  <TableInfo
                    data={viewCosts}
                    style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                  />
                  {viewCost}
                  <View style={SS.footerCheckInfo}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('엑셀다운');
                      }}
                      style={[DefaultStyle._btnOutline, SS.btnProcess]}>
                      <Text
                        style={[
                          DefaultStyle._textButton,
                          { color: '#000000' },
                        ]}>
                        엑셀다운
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              ) : null}
            </View>

            <View style={DefaultStyle._card}>
              <View
                style={[
                  DefaultStyle._headerCardTitle,
                  DefaultStyle._borderBottom,
                ]}>
                <Text
                  style={[
                    DefaultStyle._textTitleCard,
                    S.textTitleTenant,
                    { paddingBottom: 0 },
                  ]}>
                  정산 합계
                </Text>
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo
                  data={dataTotal}
                  borderRow={false}
                  borderBottom={true}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    // console.log('::componentDidMount::');
    SplashScreen.hide();
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
  }
  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    // console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsSettlement);
