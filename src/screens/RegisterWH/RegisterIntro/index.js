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
import { Appbar, Searchbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '../../../actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
class RegisterIntro extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { text: '' };

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

  _addImage = () => console.log('_addImage');
  _removeImage = () => console.log('_removeImage');

  onChangeTitle = textTitle => {
    this.setState({ textTitle });
    console.log('textTitle', textTitle);
  };
  onChangeLocation = textLocation => {
    this.setState({ textLocation });
    console.log('textLoca', textLocation);
  };
  onChangeLogistic = textLogistic => {
    this.setState({ textLogistic });
    console.log('textLogistic', textLogistic);
  };
  render() {
    const { imageStore, route } = this.props;
    console.log('route', route);
    // console.log('this.state.value', this.state.value);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 소개"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={S.containerRegister}>
          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>
                {route && route.params.type === 'ModifyWH' ? '제목' : '창고명'}
                <Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <TextInput
              style={SS.inputIntro}
              multiline={true}
              numberOfLines={2}
              onChangeText={text => this.onChangeTitle(text)}
              value={this.state.textTitle}
              placeholder={'예)신논혁역 도보 5분 거리, 깨끗한 창고입니다.'}
            />
          </View>

          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>
                창고 소개<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <TextInput
              style={SS.inputIntro}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.onChangeIntro(text)}
              value={this.state.textIntro}
              placeholder={
                '상세 설명 작성 주의사항              - 창고 정보와 관련없는 홍보성 정보는 입력하실 수 없습니다. (홈페이지 주소, 블로그, SNS, 메신저ID, 전화번호, 이메일 등)              - 중개수수료를 언급한 내용은 입력할 수 없습니다. (중개수수료 무료, 공짜, 반값 등)                     * 주의사항 위반시 허위정보로 간주되어 게시물 삭제 및 이용의 제한이 있을 수 있습니다.              * 유플로우의 창고 등록 규정에 위반되는 금칙어는 등록이 블가합니다. '
              }
            />
          </View>

          <View style={[S.bodyCard, S.mrBottom0]}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>
                위치<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <Searchbar
              inputStyle={S.searchRegister}
              placeholder="예)번동10-1, 강북구 번동"
              onChangeText={query => {
                this.setState({ firstQuery: query });
              }}
              value={this.state.firstQuery}
            />
            <TextInput
              style={[SS.inputIntro, SS.inputLoction]}
              onChangeText={text => this.onChangeLocation(text)}
              value={this.state.textIntro}
              placeholder={'인천광역시 중구 서해대로94번길 100'}
            />
            <TextInput
              style={[SS.inputIntro, SS.inputLoction]}
              onChangeText={text => this.onChangeLogistic(text)}
              value={this.state.textIntro}
              defaultValue={'에이씨티앤코아물류'}
            />
          </View>

          <View style={[S.footerRegister, S.footerIntro]}>
            <TouchableOpacity
              onPress={() => this.navigation.navigate('RegisterWH')}
              style={[
                S.btnSubmit,
                imageStore.length > 2 ? S.activeBtnSubmit : null,
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  S.textSubmit,
                  imageStore.length > 2 ? S.textActiveSubmit : null,
                ]}>
                확인
              </Text>
            </TouchableOpacity>
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
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterIntro);
