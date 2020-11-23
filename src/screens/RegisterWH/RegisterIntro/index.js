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
import {
  Appbar,
  Searchbar,
  Text,

} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../../components/organisms/AppBar';
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
    const { imageStore } = this.props;
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
                제목<Text style={S.textNote}>*</Text>
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
                제목<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <TextInput
              style={SS.inputIntro}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.onChangeIntro(text)}
              value={this.state.textIntro}
              placeholder={'상세 설명 작성 주의사항'}
            />
          </View>

          <View style={[S.bodyCard,S.mrBottom0]}>
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
              placeholder={'에이씨티앤코아물류'}
            />
          </View>

          <View style={[S.footerRegister,S.footerIntro]}>
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
