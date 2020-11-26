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
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Card, Text, RadioButton, Checkbox } from 'react-native-paper';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../../components/organisms/AppBar';
import ActionCreator from '../../../actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
class WithdrawalInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checkService: false,
      checkVisit: false,
      checkFunction: false,
      checkContent: false,
      firstQuery: '',
      visible: false,
    };

    this.navigation = props.navigation;
  }
  render() {
    // const { imageStore } = this.props;
    const {
      checkService,
      checkVisit,
      checkFunction,
      checkContent,
    } = this.state;

    const dataSelect = [
      {
        label: '1년',
        value: '1년',
      },
      {
        label: '2년',
        value: '2년',
      },
    ];
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="회원탈퇴"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>회원탈퇴 안내</Text>
            </View>
            <View style>
              <Text style={[SS.textInfo, { marginBottom: 20 }]}>
                회원탈퇴 관련 안내글이 노출되는 영역입니다.
              </Text>
              <Text style={SS.textInfo}>
                1. 회원 탈퇴 시 고객님의 정보는 고객정보 보호 정책에 따라
                관리됩니다.
              </Text>
              <Text style={SS.textInfo}>
                2. 회원 탈퇴 후 N일간 재가입이 불가능합니다.
              </Text>
              <Text style={SS.textInfo}>
                3. 현재 계약 중인 상태이면 회원 탈퇴가 불가할 수 있습니다.
              </Text>
            </View>
          </View>

          <View style={[DefaultStyle._cards, S.cardFooter]}>
            <View style={DefaultStyle._titleCard}>
              <Text style={DefaultStyle._textTitleCard}>
                무엇이 불편하셨나요?
              </Text>
            </View>
            <View style={S.listChecks}>
              <View style={S.checkItem}>
                <Checkbox
                  status={checkService ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checkService: !checkService,
                    });
                  }}
                />
                <Text style={S.textCheck}>고객서비스</Text>
              </View>

              <View style={S.checkItem}>
                <Checkbox
                  status={checkVisit ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checkVisit: !checkVisit,
                    });
                  }}
                />
                <Text style={S.textCheck}>방문 빈도가 낮음</Text>
              </View>

              <View style={S.checkItem}>
                <Checkbox
                  status={checkFunction ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checkFunction: !checkFunction,
                    });
                  }}
                />
                <Text style={S.textCheck}>서비스 기능 불만</Text>
              </View>
              <View style={S.checkItem}>
                <Checkbox
                  status={checkContent ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checkContent: !checkContent,
                    });
                  }}
                />
                <Text style={S.textCheck}>서비스 내용 불만</Text>
              </View>
            </View>
            <TextField
              numberOfLines={5}
              placeholder="고객님의 진심어린 충고 부탁드립니다."
              colorLabel="#000000"
              styleProps={SS.textInput}
              multiline
              textAlignVertical="top"
            />

            <View style={SS.listBtn}>
              <TouchableOpacity
                style={SS.btnCancel}
                onPress={() => console.log('취소하기')}>
                <Text style={SS.textBtn}>취소하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SS.btnUnsubscribe}
                onPress={() => this.navigation.navigate('ConfirmPass')}>
                <Text style={SS.textBtn}>탈퇴하기</Text>
              </TouchableOpacity>
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
)(WithdrawalInformation);
