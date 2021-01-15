// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, } from 'react-native-paper';

// Local Imports
import DefaultStyle from '../../styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { LANG_STATUS_KEY } from '@Constant';
import { Menu } from '@Services/apis';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class Language extends Component {
  constructor (props) {
    super(props);
    this.state = {
      langStatus: '',
      langList: [
        {
          label: '한국어',
          value: 'ko-KR',
        },
        {
          label: '영어',
          value: 'en-US',
        }
      ]
    }
    ;
    this.navigation = props.navigation;
  }

  /**
   * 언어 설정 변경.
   * */
  onChangeLanguage = async (langStatus) => {
    if (langStatus !== this.state.langStatus) {
      console.log('::: 1')
      // 번역 데이터 요청.
      const data = await Menu.localization({ language: langStatus ? langStatus : 'ko-KR' });
      // key: value  형태로 변환.
      let resultObj = {}
      if (data && data.length > 0) {
        data.map(item => {
          Object.assign(resultObj, item);
        });
      }
      console.log('::: 2')
      // 전역 스토어 저장.
      this.props.setLangData(resultObj);
      console.log('::: 3')
      // 앱 로컬 저장소에 언어 상태값 저장.
      AsyncStorage.setItem(LANG_STATUS_KEY, langStatus);
      // 리스트 상태 변경.
      this.setState({
        langStatus: langStatus,
      })
      console.log('::: 4', langStatus)
      // 완료 모달.
      this.props.showPopup({
        type: 'confirm',
        title: '언어 설정 완료',
        content: '언어 설정을 완료하였습니다.',
        navigation: () =>
          this.navigation.navigate('More'),
      });
    }
  };

  render () {
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => {
              this.navigation.goBack();
            }}
          />
          <Appbar.Content
            title="언어 설정"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>

        {/** Code Sample */}
        {/*<Text>{getMsg(this.props.lang, 'CERT0001', 'Empty')}</Text>*/}

        <ScrollView style={DefaultStyle.backgroundGray}>
          <View
            style={[
              DefaultStyle._cards,
              S.listPage,
            ]}>

            {this.state.langList && this.state.langList.map((item, key) =>
              <TouchableOpacity
                key={key}
                style={DefaultStyle.btnItem}
                onPress={() => this.onChangeLanguage(item.value)}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>{item.label}</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  {this.state.langStatus === item.value ?
                    <Icon
                      name="check"
                      size={16}
                      color="#4caf50"
                    /> : null}
                </View>
              </TouchableOpacity>)}
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    const langData = await AsyncStorage.getItem(LANG_STATUS_KEY);
    console.log('언어 상태', langData)
    this.setState({
      langStatus: langData ? langData : 'ko-KR',
    });
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    lang: state.global.lang, // TODO Require Lang
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
    setLangData: status => {
      dispatch(ActionCreator.setLangData(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);
