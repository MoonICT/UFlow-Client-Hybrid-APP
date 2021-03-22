// Global Imports
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {TextInput, Appbar, Text, Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '../../styles/default';
// import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import {styles as S} from './style';
// import DoneRegister from './done';
import Icon from 'react-native-vector-icons/MaterialIcons';
import account from '@Assets/images/more-account.png';
import addwarehouse from '@Assets/images/more-addwarehouse.png';
import estimate from '@Assets/images/more-estimate.png';
import inquiry from '@Assets/images/more-inquiry.png';
import save from '@Assets/images/more-save.png';
import transport from '@Assets/images/more-transport.png';
import warehouse from '@Assets/images/more-warehouse.png';

import {AuthContext} from '@Store/context';

import {TOKEN} from '@Constant';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang


//---> Assets
import AsyncStorage from '@react-native-community/async-storage';
import {Account, Menu} from '@Services/apis';

class More extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      isLogin: false,
      menus: []
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

    Menu.menus()
      .then(res => {
        const menu = res._embedded
        && res._embedded.menus
        && res._embedded.menus.length > 0 ?
          res._embedded.menus[0] : [];

        console.log('menu', menu)
        this.setState({
          menu: menu
        });
      })
      .catch(err => {
        console.log('errHome:Menu', err);
      })
    if (value) {
      this.setState({token: value});
    }
  }

  render() {
    let {email, fullName, isLogin} = this.state;
    // const { route, isLogin } = this.props;
    const {signOut} = this.context;

    return (
      <SafeAreaView style={S.container}>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <Text style={[DefaultStyle._textTitleCard, {marginBottom: 18}]}>
              {getMsg(this.props.lang, 'ML0103', '더 보기')}
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
                  {isLogin === false ? getMsg(this.props.lang, 'ML0001', '로그인') : fullName}
                </Text>
                <Text style={DefaultStyle.contentItem}>
                  {isLogin === false
                    ? getMsg(this.props.lang, 'ML0047', '로그인 후 더 많은 정보를 확인해보세요.')
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
          <View style={{
            borderBottomColor: '#d7d7d7',
            borderBottomWidth: 1,
          }}></View>
          {isLogin && (
            <Fragment>
              {this.state.menu && this.state.menu.subMenus &&

              this.state.menu.subMenus.map(item => {

                if (!item.execute) {
                  return <View style={[DefaultStyle._cards, S.listPage]}>
                    {item.name !== '#hide' &&
                    <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>
                      {item.name}
                    </Text>}

                    {item.subMenus && item.subMenus.length > 0 &&

                      item.subMenus.map(item =>
                        <TouchableOpacity
                          key={item.menuId}
                          style={DefaultStyle.btnItem}
                          onPress={() => {
                            if (item.execute) {

                              console.log(item.url ,'tab');

                              if (item.url && item.url.startsWith('#Mypage')) {
                                return this.navigation.navigate('Mypage', {
                                  title: item.name,
                                  tab: item.url.replace('#', '')
                                });
                              } else {
                                return this.navigation.navigate(item.url.replace('#', ''));
                              }

                            }
                          }}>
                          <View style={[DefaultStyle.leftItem, S.item]}>
                            {item.url && item.url === '#Mypage_cntr' &&
                            <Image style={S.iconItem} source={estimate}/>
                            }
                            {item.url && item.url === '#Mypage_io' &&
                            <Image style={S.iconItem} source={transport}/>
                            }
                            {item.url && item.url === '#Mypage_settlement' &&
                            <Image style={S.iconItem} source={account}/>
                            }
                            {item.url && item.url === '#Inquiry' &&
                            <Image style={S.iconItem} source={inquiry}/>
                            }
                            {item.url && item.url === '#Mypage_mywhrg' &&
                            <Image style={S.iconItem} source={warehouse}/>
                            }
                            {item.url && item.url === '#Mypage_fav' &&
                            <Image style={S.iconItem} source={save}/>
                            }
                            {item.url && item.url === '#WarehouseType' &&
                            <Image style={S.iconItem} source={addwarehouse}/>
                            }
                            <Text style={DefaultStyle.titleItem}>{item.name}</Text>
                          </View>
                          <View style={DefaultStyle.rightItem}>
                            <Icon
                              name="arrow-forward-ios"
                              size={12}
                              color="rgba(0, 0, 0, 0.54)"
                            />
                          </View>
                        </TouchableOpacity>
                      )

                    }
                  </View>;
                } else {
                  return <Text>{item.name}</Text>;
                }
              })
              }
              {/*<View style={[DefaultStyle._cards, S.listPage]}>*/}
              {/*  <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>*/}
              {/*    마이페이지*/}
              {/*  </Text>*/}

                {/*<TouchableOpacity*/}
                {/*  style={DefaultStyle.btnItem}*/}
                {/*  onPress={() =>*/}
                {/*    this.navigation.navigate('Mypage', {*/}
                {/*      title: '견적･계약 관리',*/}
                {/*      tab: 'Mypage_cntr'*/}
                {/*    })*/}
                {/*  }>*/}
                {/*  <View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*    <Image style={S.iconItem} source={estimate}/>*/}
                {/*    <Text style={DefaultStyle.titleItem}>견적･계약관리</Text>*/}
                {/*  </View>*/}
                {/*  <View style={DefaultStyle.rightItem}>*/}
                {/*    <Icon*/}
                {/*      name="arrow-forward-ios"*/}
                {/*      size={12}*/}
                {/*      color="rgba(0, 0, 0, 0.54)"*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*  style={DefaultStyle.btnItem}*/}
                {/*  onPress={() =>*/}
                {/*    this.navigation.navigate('Mypage', {*/}
                {/*      title: '입･출고 관리',*/}
                {/*      tab: 'Mypage_io'*/}
                {/*    })*/}
                {/*  }>*/}
                {/*  <View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*    <Image style={S.iconItem} source={transport}/>*/}
                {/*    <Text style={DefaultStyle.titleItem}>입･출고관리</Text>*/}
                {/*  </View>*/}
                {/*  <View style={DefaultStyle.rightItem}>*/}
                {/*    <Icon*/}
                {/*      name="arrow-forward-ios"*/}
                {/*      size={12}*/}
                {/*      color="rgba(0, 0, 0, 0.54)"*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*  style={DefaultStyle.btnItem}*/}
                {/*  onPress={() =>*/}
                {/*    this.navigation.navigate('Mypage', {*/}
                {/*      title: '정산관리',*/}
                {/*      tab: 'Mypage_settlement'*/}
                {/*    })*/}
                {/*  }>*/}
                {/*  <View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*    <Image style={S.iconItem} source={account}/>*/}
                {/*    <Text style={DefaultStyle.titleItem}>정산관리</Text>*/}
                {/*  </View>*/}
                {/*  <View style={DefaultStyle.rightItem}>*/}
                {/*    <Icon*/}
                {/*      name="arrow-forward-ios"*/}
                {/*      size={12}*/}
                {/*      color="rgba(0, 0, 0, 0.54)"*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*  style={DefaultStyle.btnItem}*/}
                {/*  onPress={() => this.navigation.navigate('Inquiry')}>*/}
                {/*  <View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*    <Image style={S.iconItem} source={inquiry}/>*/}
                {/*    <Text style={DefaultStyle.titleItem}>문의내역</Text>*/}
                {/*  </View>*/}
                {/*  <View style={DefaultStyle.rightItem}>*/}
                {/*    <Icon*/}
                {/*      name="arrow-forward-ios"*/}
                {/*      size={12}*/}
                {/*      color="rgba(0, 0, 0, 0.54)"*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*  style={DefaultStyle.btnItem}*/}
                {/*  onPress={() =>*/}
                {/*    this.navigation.navigate('Mypage', {*/}
                {/*      title: '내 창고',*/}
                {/*      tab: 'Mypage_mywhrg'*/}
                {/*    })*/}
                {/*  }>*/}
                {/*  <View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*    <Image style={S.iconItem} source={warehouse}/>*/}
                {/*    <Text style={DefaultStyle.titleItem}>내 창고</Text>*/}
                {/*  </View>*/}
                {/*  <View style={DefaultStyle.rightItem}>*/}
                {/*    <Icon*/}
                {/*      name="arrow-forward-ios"*/}
                {/*      size={12}*/}
                {/*      color="rgba(0, 0, 0, 0.54)"*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity*/}
                {/*  style={DefaultStyle.btnItem}*/}
                {/*  onPress={() => this.navigation.navigate('Mypage', {*/}
                {/*    title: '관심 창고',*/}
                {/*    tab: 'Mypage_fav'*/}
                {/*  })}>*/}
                {/*  <View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*    <Image style={S.iconItem} source={save}/>*/}
                {/*    <Text style={DefaultStyle.titleItem}>관심창고</Text>*/}
                {/*  </View>*/}
                {/*  <View style={DefaultStyle.rightItem}>*/}
                {/*    <Icon*/}
                {/*      name="arrow-forward-ios"*/}
                {/*      size={12}*/}
                {/*      color="rgba(0, 0, 0, 0.54)"*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*</TouchableOpacity>*/}
              {/*</View>*/}

              {/*<View style={[DefaultStyle._cards, S.listPage]}>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() =>*/}
              {/*      // this.navigation.navigate('RegisterBusinessInfo')*/}
              {/*      this.navigation.navigate('WarehouseType')*/}
              {/*    }>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Image style={S.iconItem} source={addwarehouse}/>*/}
              {/*      <Text style={DefaultStyle.titleItem}>창고등록</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}

              {/*</View>*/}

              {/*<View style={[DefaultStyle._cards, S.listPage]}>*/}
              {/*  <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>*/}
              {/*    Premium*/}
              {/*  </Text>*/}
              {/*  /!* TODO 완료 전까지 임시 숨김.*!/*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('Consulting')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>물류 컨설팅</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('LogisticsKnowledge')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>물류지식 게시판</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('Emergency')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>긴급차량 지원</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('LogisticConsulting')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>물류컨설팅 지원</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*</View>*/}

              {/*<View*/}
              {/*  style={[*/}
              {/*    DefaultStyle._cards,*/}
              {/*    S.listPage,*/}
              {/*    isLogin === false ? DefaultStyle._margin0 : null,*/}
              {/*  ]}>*/}
              {/*  <Text style={[DefaultStyle._textTitleCard, S.textTitle]}>*/}
              {/*    고객센터*/}
              {/*  </Text>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('Notification')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>이용방법</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('Annoucement')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>공지사항</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('Question')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>문의하기</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}
              {/*  <TouchableOpacity*/}
              {/*    style={DefaultStyle.btnItem}*/}
              {/*    onPress={() => this.navigation.navigate('FAQ')}>*/}
              {/*    <View style={[DefaultStyle.leftItem, S.item]}>*/}
              {/*      <Text style={DefaultStyle.titleItem}>자주 묻는 질문</Text>*/}
              {/*    </View>*/}
              {/*    <View style={DefaultStyle.rightItem}>*/}
              {/*      <Icon*/}
              {/*        name="arrow-forward-ios"*/}
              {/*        size={12}*/}
              {/*        color="rgba(0, 0, 0, 0.54)"*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  </TouchableOpacity>*/}

                {/**              <TouchableOpacity
                 style={DefaultStyle.btnItem}
                 onPress={() => this.navigation.navigate('SignatureCapture')}>
                 <View style={[DefaultStyle.leftItem, S.item]}>
                 <Text style={DefaultStyle.titleItem}>SignatureCapture</Text>
                 </View>
                 <View style={DefaultStyle.rightItem}>
                 <Icon
                 name="arrow-forward-ios"
                 size={12}
                 color="rgba(0, 0, 0, 0.54)"
                 />
                 </View>
                 </TouchableOpacity>
                 */}

                {/*<TouchableOpacity*/}
                {/*style={DefaultStyle.btnItem}*/}
                {/*onPress={() => this.navigation.navigate('SampleScreen')}>*/}
                {/*<View style={[DefaultStyle.leftItem, S.item]}>*/}
                {/*<Text style={DefaultStyle.titleItem}>Screen Test</Text>*/}
                {/*</View>*/}
                {/*<View style={DefaultStyle.rightItem}>*/}
                {/*<Icon*/}
                {/*name="arrow-forward-ios"*/}
                {/*size={12}*/}
                {/*color="rgba(0, 0, 0, 0.54)"*/}
                {/*/>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
              </Fragment>
                )}


              <View style={S.footerMore}>
                <TouchableOpacity
                  style={DefaultStyle.btnItem}
                  onPress={() => this.navigation.navigate('Language')}>
                  <View style={[DefaultStyle.leftItem, S.item]}>
                    <Text style={DefaultStyle.titleItem}>
                      {getMsg(this.props.lang, 'ML0040', '언어 설정')}
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

                <TouchableOpacity
                  onPress={() => {
                    signOut();
                    this.navigation.navigate('Login');
                  }}>
                  {isLogin === false ? null : (
                    <Text style={S.textLogout}>
                      {getMsg(this.props.lang, 'ML0002', '로그아웃')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
            </SafeAreaView>
            );
          }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMont::More');
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
    isLogin: state.home.isLogin,
    lang: state.global.lang,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(More);
