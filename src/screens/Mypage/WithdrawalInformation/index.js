/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import TextField from '@Components/organisms/TextField';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import Checkbox from '@Components/atoms/Checkbox';
import { styles as S } from '../style';
import { styles as SS } from './style';

class WithdrawalInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      firstQuery: '',
      visible: false,
      arrList: [
        {
          id: 1,
          label: '고객서비스',
          isCheck: false,
        },
        {
          id: 2,
          label: '방문 빈도가 낮음',
          isCheck: false,
        },
        {
          id: 3,
          label: '서비스 기능 불만',
          isCheck: false,
        },
        {
          id: 4,
          label: '서비스 내용 불만',
          isCheck: false,
        },
      ],
      arrLabel: [],
    };

    this.navigation = props.navigation;
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

  onCheck = (item, index) => {
    let newList = [...this.state.arrList];
    newList[index].isCheck = !newList[index].isCheck;
    let arrListCheck = newList.filter(item => item.isCheck === true);
    let arrLabelChecked = arrListCheck.map(item => item.label);
    this.setState({
      arrList: newList,
      arrLabel: arrLabelChecked,
    });
  };

  render() {
    const { arrList, arrLabel } = this.state;
    console.log('arrList :>> ', arrList);
    console.log('arrLabel :>> ', arrLabel);
    return (
      <SafeAreaView style={S.container}>
        {/* <Appbars>
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
        </Appbars> */}

        <HistoryBackActionBar title={'회원탈퇴'} navigation={this.navigation} />
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
              {arrList.map((item, index) => {
                return (
                  <View key={index} style={S.checkItem}>
                    <Checkbox
                      checked={item.isCheck}
                      onPress={() => this.onCheck(item, index)}
                    />
                    <Text style={S.textCheck}>{item.label}</Text>
                  </View>
                );
              })}
            </View>
            <TextField
              numberOfLines={5}
              placeholder="고객님의 진심어린 충고 부탁드립니다."
              colorLabel="#000000"
              styleProps={SS.textInput}
              ref={ref => {
                this.askInput = ref;
              }}
              // valueProps={e => console.log('e :>> ', e)}
              multiline
              textAlignVertical="top"
            />
            <View style={SS.listBtn}>
              <TouchableOpacity
                style={SS.btnCancel}
                onPress={() => this.navigation.goBack()}>
                <Text style={SS.textBtn}>취소하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SS.btnUnsubscribe}
                onPress={() =>
                  // this.navigation.navigate('ConfirmPass', {
                  //   arrLabel: arrLabel,
                  // })
                  {
                    let text = this.askInput.state.value
                      ? ',' + this.askInput.state.value
                      : '';
                    let leaveReason = arrLabel.toString() + text;
                    this.navigation.navigate('ConfirmPass', {
                      arrLabel: leaveReason,
                    });
                  }
                }>
                <Text style={SS.textBtn}>탈퇴하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default WithdrawalInformation;
