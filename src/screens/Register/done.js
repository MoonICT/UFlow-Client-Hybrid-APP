/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:48
 * @modify date 2020-11-24 19:27:10
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView,Image } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { TextInput, Appbar, Text, Button } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from './style';
import illust9 from '@Assets/images/illust9.png';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

//---> Assets

class DoneRegister extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      name: '',
      timer:3
    };
    this.navigation = props.navigation;
  }

  componentDidMount(){
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  
  componentDidUpdate(){
    if(this.state.timer === 1){ 
      clearInterval(this.interval);
      this.navigation.push('Home');
    }
  }
  
  componentWillUnmount(){
   clearInterval(this.interval);
  }

  render() {
    let { name } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.BackAction
            onPress={() => this.navigation.navigate('Login')}
          />
          <Appbar.Content
            title={getMsg(this.props.lang, 'ML0003', '회원가입')}
            color="rgba(0, 0, 0, 0.76)"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[S.content, S.contentDone]}>
            <Image style={DefaultStyle._imageDialog} source={illust9} />
            <Text style={[DefaultStyle._textTitleCard, S.titleDone]}>
              {getMsg(this.props.lang, 'ML0185', '회원가입이 완료되었습니다.')}
            </Text>
            <Text style={[S.contentDoneNoti, S.fontRegular, S.fontS14]}>
              {getMsg(this.props.lang, 'ML0186', '5초 뒤 자동으로\n메인 화면으로 이동합니다.')}
            </Text>
            <Button
              mode="contained"
              style={[
                DefaultStyle.containerBTN,
                S.loginBtn,
                DefaultStyle._primary,
              ]}
              color="red"
              onPress={() => {
                this.navigation.push('Home');
              }}>
              {getMsg(this.props.lang, 'ML0187', '홈으로')}
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    count: state.home.count,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    countUp: diff => {
      dispatch(ActionCreator.countUp(diff));
    },
    countDown: diff => {
      dispatch(ActionCreator.countDown(diff));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DoneRegister);
