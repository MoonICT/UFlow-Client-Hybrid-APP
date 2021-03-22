/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Switch } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import TextField from '@Components/organisms/TextField';
import { Warehouse } from '@Services/apis';

import ActionCreator from '@Actions';
import { styles as SS } from './style';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class CreateInquiryWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
       isSwitchOn: false,
       questionContent:''
      };
    this.navigation = props.navigation;
  }
  onToggleSwitch = () => this.setState({ isSwitchOn: !this.state.isSwitchOn });

 /**
   * Request question
   * */
  handleSubmitQna = () => {
    const {questionContent} = this.state;
    const {route} = this.props;
    Warehouse.postWhrgQuestion({
      warehouseRegNo: route.params.idWH,
      content: questionContent
    }).then(res => {
      this.props.route.params.onReloadQna()
      this.navigation.goBack()
    })
  }

  render() {
    const { imageStore } = this.props;
    const { questionContent } = this.state;

    return (
      <SafeAreaView style={DefaultStyle._container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title={getMsg(this.props.lang, 'ML0219', '창고 문의 작성')}
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
          <Appbar.Content
            color={questionContent ? '#ff6d00' : 'rgba(0, 0, 0, 0.47)'}
            title={getMsg(this.props.lang, 'ML0429', '등록')}
            onPress={() => this.handleSubmitQna()}
            titleStyle={DefaultStyle._textHeaderRight}
          />
        </Appbars>
        <ScrollView>
          <View style={SS.bodyCard}>
            <View style={SS.titleBody}>
              <Text style={SS.textTitleBody}>{getMsg(this.props.lang, 'ML0219', '창고 문의 작성')}</Text>
            </View>
            {/* <TextField
              labelTextField="제목"
              placeholder="제목을 입력해 주세요."sdffy
              colorLabel="#000000"
            /> */}
            <TextField
              labelTextField="내용"
              placeholder={getMsg(this.props.lang, 'ML0220', '문의하실 내용을 입랙해 주세요.')}
              colorLabel="#000000"
              numberOfLines={15}
              style={DefaultStyle._textAreaStyle}
              multiline={true}
              valueProps={text => this.setState({
                questionContent: text
              })}
            />
          </View>
          {/* <View style={SS.bodyCard}>
            <View style={SS.titleBody}>
              <Text style={SS.textTitleBody}>비밀글 설정</Text>
              <View style={S.rightTitle}>
                <Switch
                  // thumbColor={color.primary.main}
                  value={this.state.isSwitchOn}
                  onValueChange={this.onToggleSwitch}
                />
              </View>
            </View>
          </View> */}
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
    imageStore: state.registerWH.pimages,
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
)(CreateInquiryWH);
