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
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-paper';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Local Imports
import { styles as SS } from './style';
import TextField from '@Components/organisms/TextField';
import { Chat } from '@Services/apis';
import avatarImg from '@Assets/images/appicon.png';
import avatarPersonImg from '@Assets/images/placeholderPerson.png';

class Chatting extends Component {
  constructor (props) {
    super(props);
    this.scrollView = null;
    this.state = {
      chatting: '', // 챗 내용.
      dataChat: [],
    };
    this.navigation = props.navigation;
  }

  /**
   * 채팅 목록 불러오기.
   * */
  getDataChat = () => {
    const { warehouseRegNo, rentUserNo } = this.props.route.params
    Chat.getListChat({
      warehouseRegNo: warehouseRegNo,
      rentUserNo: rentUserNo
    }).then(res => {
      let dataChatList = res._embedded.cntrChat;

      if (dataChatList.length > 0) {
        // let oldTime = lastMsgCreateTime.toString()
        // let newTime = dataChatList[dataChatList.length - 1].createTime.toString()
        // setIsLastMsg(oldTime === newTime);
        // if (isScrollBottom) {
        //   setLastMsgCreateTime(newTime)
        // }
      }

      // if (isScrollBottom) {
      //   handleScrollBottom()
      // }

      this.setState({
        dataChat: dataChatList,
      });
    }).catch(err => {
      console.log(err);
    });
  };

  /**
   * 채팅 전송.
   * */
  handleSendChat = () => {
    const { chatting } = this.state
    const { type, warehouseRegNo, rentUserNo } = this.props.route.params
    if (!chatting) {
      return false;
    }
    console.log(':::Message:::', chatting)
    console.log(':::Type:::', type)
    console.log(':::warehouseRegNo:::', warehouseRegNo)
    console.log(':::rentUserNo:::', rentUserNo)
    // 창고주 일때.
    if (type === 'owner') {
      Chat.chatOwner({
        chatDvCd: 'TXT',
        warehouseRegNo: warehouseRegNo,
        chatCount: chatting,
        rentUserNo: rentUserNo
      }).then(res => {
        // console.log(res);
        this.getDataChat()
        this.setState({ chatting: '' });
      }).catch(err => {
        console.log(err);
      });
    }
    // 임차인 일떄.
    if (type === 'tenant') {
      Chat.chatTenant({
        chatDvCd: 'TXT',
        warehouseRegNo: warehouseRegNo,
        chatCount: chatting
      }).then(res => {
        // console.log(res);
        this.getDataChat()
        this.setState({ chatting: '' });
      }).catch(err => {
        console.log(err);
      });
    }
  };

  /**
   * 시간 계산
   * 1분 이내 : 방금전
   * 오늘 이내 : 시간
   * 그 외 : 날짜시간
   * */
  calcDateTime = (date) => {
    let result = moment(date).format('YYYY.MM.DD HH:MM')
    let createdDate = moment(date);
    let today = moment();
    let beforeOwnMinutes = today.subtract(1, 'minutes')
    // 현재보다 이후이고 현재 1분뒤 보다 전인
    if (createdDate.isAfter(beforeOwnMinutes)) {
      result = '방금 전';
    } else if (createdDate.isSame(today, 'day')) {
      result = moment(date).format('HH:MM')
    } else if (createdDate.isSame(today, 'year')) {
      result = moment(date).format('MM월 DD일 HH:MM')
    }
    return result
  }


  render () {
    const { route } = this.props;
    const { dataChat, chatting } = this.state;
    let type = route && route.params && route.params.type;
    let warehouse = route && route.params && route.params.warehouse;
    let rentUser = route && route.params && route.params.rentUser;
    let thumbnail = route && route.params && route.params.thumbnail;
    console.log('rout params : ', route.params);
    console.log('warehouse', warehouse);
    console.log('rentUser', rentUser);
    console.log('type', type);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <HistoryBackActionBar
          title={'채팅'}
          navigation={this.navigation}
        />
        {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
        {/*</TouchableWithoutFeedback>*/}
        <View style={[styles.inner]}>
          {/** 창고명 */}
          <View style={SS.header}>
            <View style={[SS.infoSM]}>
              <Fragment>
                <Image source={{ uri: thumbnail }} style={SS.avatarSM} />
                <Text style={SS.nameSM}>{warehouse.warehouse}</Text>
              </Fragment>
            </View>
          </View>

          <View style={{
            flex: 1,
            paddingBottom: 20,
            height: 300,
          }}>
            <ScrollView ref={ref => {this.scrollView = ref}}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
              <View style={SS.chatting}>
                {/*<View style={SS.dateTop}>*/}
                {/*<Text style={SS.textDateTop}>2020년 10월 30일</Text>*/}
                {/*</View>*/}

                {/** 채팅 목록 */}
                {dataChat && dataChat.map((item, index) =>
                  <View style={[SS.user, type.toUpperCase() === item.type ? SS.userMe : '']} key={index}>
                    {item.me ? (
                      // 내 챗
                      <View>
                        <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 12, textAlign: 'right' }}>
                          {this.calcDateTime(item.createTime)}
                        </Text>
                        <View style={[SS.body, SS.bodyMe]}>
                          <Text style={[SS.content, SS.contentMe]}>
                            {item.chatCount}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      // 3자 챗
                      <View>
                        <View style={SS.info}>
                          {type.toUpperCase() === item.type ? null : (
                            <Fragment>
                              <View>
                                {item.type === 'MANAGER' && <Image source={avatarImg} style={SS.avatar} />}
                                {item.type === 'OWNER' && <Image source={{ uri: thumbnail }} style={SS.avatar} />}
                                {item.type === 'TENANT' && <Image source={avatarPersonImg} style={SS.avatar} />}
                                <View style={SS.status} />
                              </View>
                              <Text style={SS.name}>
                                {item.type === 'MANAGER' ? '관리자' : item.userName ? item.userName : 'unknown'}
                              </Text>
                            </Fragment>
                          )}
                          <Text style={{ marginLeft: 10, fontSize: 12 }}>{this.calcDateTime(item.createTime)}</Text>
                        </View>

                        <View style={SS.body}>
                          <Text style={SS.content}>{item.chatCount}</Text>
                        </View>
                      </View>
                    )}
                  </View>)}

              </View>
            </ScrollView>
          </View>

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
                        this.handleSendChat()
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
      </KeyboardAvoidingView>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    this.getDataChat();
    setInterval(() => {
      this.getDataChat();
    }, 3000);
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
  }

  componentWillUnmount () {
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {};
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
