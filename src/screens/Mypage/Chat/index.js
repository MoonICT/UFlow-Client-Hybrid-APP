/**
 * 채팅
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import {
  // SafeAreaView,
  View,
  ScrollView,
  // TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, List, IconButton } from 'react-native-paper';

// Local Imports
import AvatarAdmin from '@Assets/images/avatar-admin.png';
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import moment from 'moment';
import TextField from '@Components/organisms/TextField';

import ActionCreator from '@Actions';

// import card from '@Assets/images/card-img.png';
// import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Warehouse } from '@Services/apis';

class Chatting extends Component {
  constructor(props) {
    super(props);
    // this.scrollRef = React.createRef();
    this.webView = null;
    this.state = {
      visible: false,
      visibleConfirm: false,
      isSendMessage: false,
      chatting: '',
      dataChat: [],
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  showConfirm = () => this.setState({ visibleConfirm: true });

  hideConfirm = () => this.setState({ visibleConfirm: false });
  getDataChat = () => {
    // let warehSeq = this.props.route.params.warehSeq;
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let rentUserNo = this.props.route.params.rentUserNo;
    // let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
    let url = warehouseRegNo + '-' + rentUserNo;
    Warehouse.listChat(url)
      .then(res => {
        console.log('resChat', res);
        if (res.status === 200) {
          let data =
            res.data && res.data._embedded && res.data._embedded.cntrChat;
          this.setState({
            dataChat: data,
          });
          // this.props.quotationData(res.data);
        }
      })
      .catch(err => {
        console.log('errChat', err);
      });
  };
  sendMessage = () => {
    let warehouseRegNo = this.props.route.params.warehouseRegNo;
    let rentUserNo = this.props.route.params.rentUserNo;
    let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
    // let url = warehouseRegNo + '-' + rentUserNo;
    let url =
      this.props.route.params.type.toUpperCase() === 'OWNER'
        ? 'owner/' + rentUserNo
        : 'tenant';
    let data = {
      chatDvCd: 'TXT',
      chatCount: this.state.chatting,
      warehouseRegNo: warehouseRegNo,
    };
    Warehouse.chatting({ url, data })
      .then(res => {
        console.log('resChatting', res);
        let dataChatUpdate = this.state.dataChat;
        if (res.status === 200) {
          let dataChatting = res.data && res.data;
          dataChatUpdate.push(dataChatting);
          console.log('dataChatting', dataChatting);
          console.log('dataChatUpdate', dataChatUpdate);
          this.setState({
            dataChat: dataChatUpdate,
            chatting: '',
          });
          // this.props.quotationData(res.data);
        }
      })
      .catch(err => {
        console.log('errChatting', err);
      });
  };
  calcDateTime = date => {
    let result = moment(date).format('YYYY.MM.DD HH:MM');
    let createdDate = moment(date);
    let today = moment();
    let beforeOwnMinutes = today.subtract(1, 'minutes');
    // 현재보다 이후이고 현재 1분뒤 보다 전인
    if (createdDate.isAfter(beforeOwnMinutes)) {
      result = getMsg('WHRG0169', '방금 전');
    } else if (createdDate.isSame(today, 'day')) {
      result = moment(date).format('HH:MM');
    } else if (createdDate.isSame(today, 'year')) {
      result = moment(date).format('MM월 DD일 HH:MM');
    }
    return result;
  };
  render() {
    const { route } = this.props;
    const { dataChat, chatting, isSendMessage } = this.state;
    let type = route && route.params && route.params.type;
    let warehouse = route && route.params && route.params.warehouse;
    let rentUser = route && route.params && route.params.rentUser;
    let thumbnail = route && route.params && route.params.thumbnail;
    console.log('dataChat', dataChat);
    console.log('type', type);
    let listChat =
      dataChat &&
      dataChat.map((item, index) => {
        return (
          <View
            style={[SS.user, type.toUpperCase() === item.type ? SS.userMe : '']}
            key={index}>
            {type.toUpperCase() === item.type ? (
              <View>
                <Text style={{ marginBottom: 5, marginTop: 5 }}>{this.calcDateTime(item.createTime)}</Text>
                <View style={[SS.body, SS.bodyMe]}>
                  <Text style={[SS.content, SS.contentMe]}>
                    {item.chatCount}
                  </Text>
                </View>
              </View>
            ) : (
                <View>
                  <View style={SS.info}>
                    {type.toUpperCase() === item.type ? null : (
                      <Fragment>
                        <View>
                          {item.type === 'MANAGER' ? <Image source={AvatarAdmin} style={SS.avatar} /> : <Image source={{ uri: thumbnail }} style={SS.avatar} />}
                          <View style={SS.status} />
                        </View>
                        {<Text style={SS.name}>{item.type === 'MANAGER' ? '관리자' : item.userName}</Text>}
                      </Fragment>
                    )}

                    <Text style={{ marginLeft: 10 }}>{this.calcDateTime(item.createTime)}</Text>
                  </View>

                  <View style={SS.body}>
                    <Text style={SS.content}>{item.chatCount}</Text>
                  </View>
                </View>
              )}
          </View>
        );
      });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>

        <HistoryBackActionBar
          title={'채팅'}
          navigation={this.navigation}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <ScrollView>
              {/* <ScrollView
              ref={ref => (this.scrollRef = ref)}
              onContentSizeChange={() => {
                this.scrollRef.scrollToEnd();
              }}> */}
              <View style={SS.header}>
                {/**TODO 창고명 바인딩 안되어있음**/}
                <List.Section>
                  <List.Accordion
                    title="창고명"
                    titleStyle={SS.name}
                    style={SS.headerChat}
                    left={() => (
                      <Image
                        source={
                          type.toUpperCase() === 'OWNER'
                            ? null
                            : { uri: warehouse?.thumbnail }
                        }
                        style={SS.avatar}
                      />
                    )}
                  />
                </List.Section>
              </View>
              <View style={SS.chatting}>
                {/* <View style={SS.dateTop}>
                  <Text style={SS.textDateTop}>2020년 10월 30일</Text>
                </View> */}
                {listChat}
              </View>
            </ScrollView>
            <View style={SS.footer}>
              <View style={SS.footerItem}>
                <View style={SS.inputChat}>
                  <TextField
                    multiline={true}
                    styleProps={SS.inputType}
                    placeholder="입력해 주세요."
                    value={chatting}
                    rightComponent={
                      <Icon
                        name="arrow-forward"
                        size={20}
                        style={SS.iconRight}
                        onPress={() =>
                          this.setState({ isSendMessage: !isSendMessage })
                        }
                      />
                    }
                    valueProps={e => this.setState({ chatting: e })}
                  />
                </View>
                {/* <IconButton
                  style={SS.btnAdd}
                  icon="plus"
                  onPress={() => console.log('remove')}
                /> */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    this.getDataChat();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.chatting !== '' &&
      this.state.isSendMessage !== prevState.isSendMessage
    ) {
      this.sendMessage();
    }
    setTimeout(() => {
      this.getDataChat();
    }, 3000);
  }
  // eslint-disable-next-line no-dupe-class-members
  componentWillUnmount() {
    this.setState({ isSendMessage: false, chatting: '', dataChat: [] });
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatting);
