// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { TextInput, Appbar, Checkbox, Text, Button } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
// import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from './style';
// import DoneRegister from './done';
import Icon from 'react-native-vector-icons/MaterialIcons';
import account from '@Assets/images/more-account.png';
import addwarehouse from '@Assets/images/more-addwarehouse.png';
import estimate from '@Assets/images/more-estimate.png';
import inquiry from '@Assets/images/more-inquiry.png';
import save from '@Assets/images/more-save.png';
import transport from '@Assets/images/more-transport.png';
import warehouse from '@Assets/images/more-warehouse.png';

import { AuthContext } from '@Store/context';

import { TOKEN } from '@Constant';

//---> Assets
import AsyncStorage from '@react-native-community/async-storage';
import { Account } from '@Services/apis';
class More extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      isLogin: false,
    };
    this.navigation = props.navigation;
  }

  async UNSAFE_componentWillMount() {
    const value = await AsyncStorage.getItem(TOKEN);
    // console.log('More Token ==>', value);
    Account.getMe()
      .then(res => {
        // console.log('::::: Get Me :::::', res);
        const status = res.status;
        if (status === 200) {
          this.setState({
            isLogin: true,
            email: res.data.email,
            fullName: res.data.fullName,
          });
        }
      })
      .catch(err => {
        console.log('errHome', err);
      });
    if (value) {
      this.setState({ token: value });
    }
  }

  render() {
    let { email, fullName, isLogin } = this.state;
    // const { route, isLogin } = this.props;
    const { signOut } = this.context;

    // console.log('routeMore :>> ', route);
    // const isLogin = getLoginStatus();
    console.log('isLogin More==>', isLogin);

    return (
      <SafeAreaView style={S.container}>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <Text style={[DefaultStyle._textTitleCard, { marginBottom: 18 }]}>
              더보기
            </Text>
            <TouchableOpacity
              style={[DefaultStyle.btnItem, S.infoUser]}
              onPress={() =>
                isLogin
                  ? this.navigation.navigate('Information')
                  : this.navigation.navigate('Login')
              }>
              <View style={DefaultStyle.leftItem}>
                <Text style={[DefaultStyle.titleItem, S.textInfo]}>
                  {isLogin === false ? '로그인' : fullName}
                </Text>
                <Text style={DefaultStyle.contentItem}>
                  {isLogin === false
                    ? '로그인 후 더 많은 정보를 확인해보세요.'
                    : email}
                </Text>
              </View>
              <View style={DefaultStyle.rightItem}>
                <Icon
                  name="arrow-forward-ios"
                  size={12}
                  color="rgba(0, 0, 0, 0.54)"
                />
              </View>
            </TouchableOpacity>
          </View>
          {isLogin === false ? null : (
            <Fragment>
              <View style={[DefaultStyle._cards, S.listPage]}>
                <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>
                  마이페이지
                </Text>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() =>
                    this.navigation.navigate('Mypage', {
                      title: '견적･계약 관리',
                    })
                  }>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={estimate} />
                    <Text style={DefaultStyle.titleItem}>견적･계약관리</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() =>
                    this.navigation.navigate('Mypage', {
                      title: '입･출고 관리',
                    })
                  }>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={transport} />
                    <Text style={DefaultStyle.titleItem}>입･출고관리</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() =>
                    this.navigation.navigate('Mypage', {
                      title: '정산관리',
                    })
                  }>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={account} />
                    <Text style={DefaultStyle.titleItem}>정산관리</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() => this.navigation.navigate('Inquiry')}>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={inquiry} />
                    <Text style={DefaultStyle.titleItem}>문의내역</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() => this.navigation.navigate('DetailAnnoucement')}>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={save} />
                    <Text style={DefaultStyle.titleItem}>관심창고</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() =>
                    this.navigation.navigate('Mypage', {
                      title: '내 창고',
                    })
                  }>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={warehouse} />
                    <Text style={DefaultStyle.titleItem}>내 창고</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[DefaultStyle._cards, S.listPage]}>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() =>
                    this.navigation.navigate('RegisterBusinessInfo')
                  }>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Image style={S.iconItem} source={addwarehouse} />
                    <Text style={DefaultStyle.titleItem}>창고등록</Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}

          {isLogin && (
            <View style={[DefaultStyle._cards, S.listPage]}>
              <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>
                Premium
              </Text>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('Consulting')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>물류 컨설팅</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('ConsultingComplete')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>ConsultingComplete</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('LogisticsKnowledge')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>물류지식 게시판</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('FindPassWord')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>긴급차량지원</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {isLogin && (
            <View
              style={[
                DefaultStyle._cards,
                S.listPage,
                isLogin === false ? DefaultStyle._margin0 : null,
              ]}>
              <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>
                고객센터
              </Text>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('Notification')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>이용방법</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('Annoucement')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>공지사항</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('Question')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>문의하기</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('FAQ')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>자주 묻는 질문</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={DefaultStyle.btnItem}
                onPress={() => this.navigation.navigate('SampleScreen')}>
                <View style={[DefaultStyle.leftItem, S.item]}>
                  <Text style={DefaultStyle.titleItem}>Screen Test</Text>
                </View>
                <View style={DefaultStyle.rightItem}>
                  <Icon
                    name="arrow-forward-ios"
                    size={12}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={S.footerMore}>
            <TouchableOpacity
              onPress={() => {
                signOut();
                this.navigation.navigate('Login');
              }}>
              {isLogin === false ? null : (
                <Text style={S.textLogout}>로그아웃</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    // const value = await AsyncStorage.getItem(TOKEN);
    // console.log('hello==>', value);
    // Account.getMe()
    //   .then(res => {
    //     console.log('::::: Get Me :::::', res);
    //     const status = res.status;
    //     if (status === 200) {
    //       this.setState({
    //         isLogin: true,
    //         email: res.data.email,
    //         fullName: res.data.fullName,
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log('errHome', err);
    //   });
    // if (value) {
    //   this.setState({ token: value });
    // }

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
    isLogin: state.home.isLogin,
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
)(More);
