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
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TextField from '@Components/organisms/TextField';
import CardMypage from '@Components/organisms/CardMypage';

import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Fontisto';
import box from '@Assets/images/box.png';

import { styles as S } from '../style';

const dataLogistics = [
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

const dataList = [
  {
    data: dataLogistics,
    title: '에이씨티앤코아물류',
  },
  {
    data: dataLogistics,
    title: '에이씨티앤코아물류2',
  },
];
class SettlementManagement extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      listItem: dataList,
    };

    this.navigation = props.navigation;
  }

  render() {
    // const { imageStore } = this.props;
    const { route } = this.props;
    const { listItem } = this.state;
    let view =
      listItem &&
      listItem.map((item, index) => {
        return (
          <CardMypage
            key={index}
            onPressHeader={() => {}}
            headerComponent={
              <View style>
                <Text
                  style={[
                    DefaultStyle._titleWH,
                    { padding: 15, marginLeft: 16, marginTop: 16 },
                  ]}>
                  상온창고
                </Text>
                <Text
                  style={[DefaultStyle._headerCardTitle, { paddingTop: 4 }]}>
                  {item.title}
                </Text>
              </View>
            }
            data={item.data}
            borderRow={false}
            styleLeft={DefaultStyle._leftTableCard}
            styleRight={DefaultStyle._rightTableCard}
            footer={
              <View
                style={[
                  DefaultStyle._listBtn,
                  { marginTop: 0, marginBottom: 0, padding: 16, paddingTop: 0 },
                ]}>
                <TouchableOpacity
                  style={[DefaultStyle._btnOutline, { borderColor: '#000000' }]}
                  onPress={() => {}}>
                  <Text
                    style={[DefaultStyle._textButton, { color: '#000000' }]}>
                    삭제
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        );
      });
    return (
      <View style={DefaultStyle._body}>
        <View style={DefaultStyle._titleCard}>
          <Text style={[DefaultStyle._textTitleCard]}>관심 창고</Text>
          <Text
            style={DefaultStyle._textRightTitleCard}
            onPress={() => this.setState({ listItem: [] })}>
            전체삭제
          </Text>
        </View>
        {listItem.length > 0 ? (
          view
        ) : (
          <View style={S.boxNodata}>
            <Image source={box} />
            <Text style={[DefaultStyle._textDF3, { marginTop: 40 }]}>
              관심 창고로 등록한 창고가 없습니다.
            </Text>
          </View>
        )}
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
)(SettlementManagement);
