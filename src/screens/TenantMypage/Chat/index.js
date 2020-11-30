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
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Text,
  Dialog,
  Paragraph,
  Button,
  List,
  TextInput,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Select from '@Components/organisms/Select';
import CardMypage from '@Components/organisms/CardMypage';

import ActionCreator from '../../../actions';

import card from '@Assets/images/card-img.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Chatting extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false, visibleConfirm: false };
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

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  render() {
    const { imageStore, workComplete } = this.props;
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="채팅"
            color="black"
            fontSize="12"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={SS.header}>
            <List.Section>
              <List.Accordion
                title="에이씨티앤코아물류"
                titleStyle={SS.name}
                style={SS.headerChat}
                left={() => <Image source={card} style={SS.avatar} />}>
                <List.Item
                  titleStyle={{ display: 'none' }}
                  style={SS.popupBtn}
                  descriptionStyle={SS.btnConfirm}
                  description={() => (
                    <View style={[DefaultStyle._listBtn, SS.listBtn]}>
                      <TouchableOpacity
                        style={[
                          DefaultStyle._btnOutline,
                          DefaultStyle._btnLeft,
                          { borderColor: '#000000' },
                        ]}
                        onPress={() => console.log('계약 요청 취소')}>
                        <Text
                          style={[
                            DefaultStyle._textButton,
                            { color: '#000000' },
                          ]}>
                          계약 요청 취소
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          DefaultStyle._btnInline,
                          DefaultStyle._btnRight,
                        ]}
                        onPress={() => {}}>
                        <Text
                          style={[
                            DefaultStyle._textButton,
                            { color: '#ffffff' },
                          ]}>
                          계약서 작성
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </List.Accordion>
            </List.Section>
          </View>
          <View style={SS.chatting}>
            <View style={SS.dateTop}>
              <Text style={SS.textDateTop}>2020년 10월 30일</Text>
            </View>
            <View style={SS.user}>
              <View style={SS.info}>
                <View>
                  <Image source={card} style={SS.avatar} />
                  <View style={SS.status} />
                </View>
                <Text style={SS.name}>에이씨티앤코아물류</Text>
                <Text style={SS.time}>4분 전</Text>
              </View>
              <View style={SS.body}>
                <Text style={SS.content}>안녕하세요!</Text>
                <Text style={SS.content}>
                  에이씨티앤코아물류입니다. 계약 요청을 해주셔서 감사합니다.
                  계약 진행 전, 창고 및 계약 관련 문의사항을 채팅으로 문의해
                  주세요.
                </Text>
              </View>
            </View>
            <View style={[SS.user, SS.userMe]}>
              <View style={SS.info}>
                <Text style={SS.time}>방금 전</Text>
              </View>
              <View style={[SS.body, SS.bodyMe]}>
                <Text style={[SS.content, SS.contentMe]}>
                  안녕하세요, 계약 진행 관련하여 몇 가지 여쭤볼 게 있어서
                  채팅으로 남깁니다.
                </Text>
              </View>
            </View>
          </View>

          <View style={SS.footer}>
            <View style={SS.footerItem}>
              <View style={SS.inputChat}>
                <TextInput />
              </View>
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
    imageStore: state.registerWH.imageData,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatting);
