/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 14:05:00
 * @modify date 2020-11-09 15:28:27
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {TextInput, Appbar, Checkbox, Text, Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
import ActionCreator from '../../actions';
import {styles as S} from './style';

class ForgotID extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      email: '',
      password: '',
      isRemember: false,
    };
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

  render() {
    const {email} = this.state;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        <Appbar.Header style={DefaultStyle.header}>
          <Appbar.Action
            icon="keyboard-backspace"
            color="white"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content title="아이디 찾기" color="white" />
        </Appbar.Header>
        <ScrollView>
          <Text style={[S.titleLogin]}>아이디를 찾기 위해 </Text>
          <Text style={[S.titleLogin]}>전화번호를 입력해 주세요.</Text>
          <View style={S.formLogin}>
            <TextInput
              label="전화번호"
              mode="outlined"
              value={email}
              type="number"
              maxLength={20}
              style={[S.inputs]}
              theme={{
                colors: {
                  primary: 'rgba(0, 0, 0, 0.1)',
                  underlineColor: 'transparent',
                },
              }}
              onChangeText={text => this.setState({email: text})}
            />
            <Button
              mode="contained"
              style={[DefaultStyle.containerBTN, S.loginBtn]}
              onPress={() => {
                this.navigation.navigate('Home');
              }}>
              확인
            </Button>
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
)(ForgotID);
