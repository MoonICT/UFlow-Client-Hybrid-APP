/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-16 15:12:23
 * @modify date 2020-12-03 11:31:18
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput as TextInputNormal,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Button, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-player';

// Local Imports
import DefaultStyle from '../../styles/default';
import { color } from '@Themes/colors';
import FCMService from '@Services/FCMService';

import ActionCreator from '@Actions';
import Carousel from '@Components/organisms/Carousel';
import CarouselSnap from '@Components/organisms/CarouselSnap';
// import CarouselSnapPagi from '@Components/organisms/CarouselSnapPagi';
import AppBars from '@Components/organisms/AppBar';
import ProductCard from '@Components/organisms/ProductCard';
import StepCard from '@Components/organisms/StepCard';
import SloganCard from '@Components/organisms/SloganCard';
import Footer from '@Components/organisms/Footer';

// import Menus from '@Components/organisms/Menu';
// import TreeViews from '@Components/organisms/TreeView';

import { styles } from './styles';

import mainBG from '@Assets/images/main-bg.png';
// import symbolsBG from '@Assets/images/symbol.png';
// import factoryBG from '@Assets/images/factory.png';
import boxMain from '@Assets/images/box_main_1.png';
import cardBG from '@Assets/images/card-img.png';
import stepBG from '@Assets/images/step.png';
import slogan1 from '@Assets/images/slogan1.png';
import slogan2 from '@Assets/images/slogan2.png';
import slogan3 from '@Assets/images/slogan3.png';
import slogan4 from '@Assets/images/slogan4.png';
import slogan5 from '@Assets/images/slogan5.png';

import appstore1 from '@Assets/images/appstore-1.png';
import appstore2 from '@Assets/images/appstore-2.png';
import logoWhite from '@Assets/images/logo-white.png';
import AsyncStorage from '@react-native-community/async-storage';
import { Account } from '@Services/apis';

// import VersionCheckService from '../../services/VersionCheckService';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const slides = [
  {
    key: 0,
    title: '좋은 창고 구하는 기술,\n유플로우',
    text: `유플로우는 비즈니스와 창고를 연결하고,
    더 나은 기업 물류 시스템을 만듭니다.
    1Pallet, 1주일 단위 사용이 가능하며
    보관하신 제품들은 안전 보험 서비스가 적용됩니다.
    지금 UFlow가 연결하는 새로운 물류 세상을 경험하세요.`,
    image: mainBG,
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 1,
    title: '좋은 창고 구하는 기술,\n유플로우',
    text: `유플로우는 비즈니스와 창고를 연결하고,
    더 나은 기업 물류 시스템을 만듭니다.
    1Pallet, 1주일 단위 사용이 가능하며
    보관하신 제품들은 안전 보험 서비스가 적용됩니다.
    지금 UFlow가 연결하는 새로운 물류 세상을 경험하세요.`,
    image: mainBG,
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: '좋은 창고 구하는 기술,\n유플로우',
    text: `유플로우는 비즈니스와 창고를 연결하고,
    더 나은 기업 물류 시스템을 만듭니다.
    1Pallet, 1주일 단위 사용이 가능하며
    보관하신 제품들은 안전 보험 서비스가 적용됩니다.
    지금 UFlow가 연결하는 새로운 물류 세상을 경험하세요.`,
    image: mainBG,
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 3,
    title: '좋은 창고 구하는 기술,\n유플로우',
    text: `유플로우는 비즈니스와 창고를 연결하고,
    더 나은 기업 물류 시스템을 만듭니다.
    1Pallet, 1주일 단위 사용이 가능하며
    보관하신 제품들은 안전 보험 서비스가 적용됩니다.
    지금 UFlow가 연결하는 새로운 물류 세상을 경험하세요.`,
    image: mainBG,
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 4,
    title: '좋은 창고 구하는 기술,\n유플로우',
    text: `유플로우는 비즈니스와 창고를 연결하고,
    더 나은 기업 물류 시스템을 만듭니다.
    1Pallet, 1주일 단위 사용이 가능하며
    보관하신 제품들은 안전 보험 서비스가 적용됩니다.
    지금 UFlow가 연결하는 새로운 물류 세상을 경험하세요.`,
    image: mainBG,
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
];

const slidesProduct = [
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
];

const slidesSteps = [
  {
    img: stepBG,
    step: 'Step 1. 창고 임대 진행 및 완료',
    title:
      '안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
    content:
      '• 에스크로 방식의 대금보호시스템을 통해 대금\n' +
      '걱정 없이 창고 관리에만 집중하실 수 있습니다.\n' +
      '안심 재물보험 가입으로 혹시 모를\n' +
      '위험요소까지 보장해 드립니다.\n\n' +
      '• 안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
  },
  {
    img: stepBG,
    step: 'Step 2. 창고 임대 진행 및 완료',
    title:
      '안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
    content:
      '• 에스크로 방식의 대금보호시스템을 통해 대금\n' +
      '걱정 없이 창고 관리에만 집중하실 수 있습니다.\n' +
      '안심 재물보험 가입으로 혹시 모를\n' +
      '위험요소까지 보장해 드립니다.\n\n' +
      '• 안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
  },
  {
    img: stepBG,
    step: 'Step 3. 창고 임대 진행 및 완료',
    title:
      '안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
    content:
      '• 에스크로 방식의 대금보호시스템을 통해 대금\n' +
      '걱정 없이 창고 관리에만 집중하실 수 있습니다.\n' +
      '안심 재물보험 가입으로 혹시 모를\n' +
      '위험요소까지 보장해 드립니다.\n\n' +
      '• 안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
  },
  {
    img: stepBG,
    step: 'Step 4. 창고 임대 진행 및 완료',
    title:
      '안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
    content:
      '• 에스크로 방식의 대금보호시스템을 통해 대금\n' +
      '걱정 없이 창고 관리에만 집중하실 수 있습니다.\n' +
      '안심 재물보험 가입으로 혹시 모를\n' +
      '위험요소까지 보장해 드립니다.\n\n' +
      '• 안전한 대금 보호 시스템과 혹시 모를\n' +
      '위험요소를 위한 안심보험 가입까지!',
  },
];

const slidesSlogans = [
  {
    img: slogan1,
    title: '빠르고 편리하게,\n' + '무료로 창고 등록',
  },
  {
    img: slogan2,
    title: '내게 맞는 공간 한눈에\n' + '비교하고 선택까지',
  },
  {
    img: slogan3,
    title: '빠르고 편리하게,\n' + '무료로 창고 등록',
  },
  {
    img: slogan4,
    title: '빠르고 편리하게,\n' + '무료로 창고 등록',
  },
  {
    img: slogan5,
    title: '빠르고 편리하게,\n' + '무료로 창고 등록',
  },
  {
    img: slogan3,
    title: '빠르고 편리하게,\n' + '무료로 창고 등록',
  },
];

//Data Footer
const data = [
  {
    titleList: '창고 등록',
    listItem: [
      { titleItem: '공급사 등록' },
      { titleItem: '수요사 등록' },
      { titleItem: '회원 조회' },
      { titleItem: '기본 조회' },
    ],
  },
  {
    titleList: '창고 찾기',
  },
  {
    titleList: '이용 방법',
  },
  {
    titleList: '고객센터',
  },
  {
    titleList: '패밀리사이트',
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      activeIndex: 0,
      isShow: false,
      expanded: true,
    };
    this.navigation = props.navigation;
    this.fcm = new FCMService();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide} key={item.key}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        {/* <Image source={item.image} /> */}
        {
          //   <VideoPlayer
          //   video={{
          //     uri:
          //       'https://pawsome-public-s3.s3.ap-northeast-2.amazonaws.com/LogisALL홍보동영상(국문).mp4',
          //   }}
          //   videoWidth={360}
          //   videoHeight={640}
          //   style={styles.backgroundVideo}
          //   thumbnail={item.image}
          //   autoplay={true}
          // />
        }
      </View>
    );
  };

  _renderProductItem = ({ item }) => {
    return <ProductCard data={{ ...item, img: cardBG }} />;
  };

  _renderStepItem = ({ item }) => {
    return <StepCard data={{ ...item }} />;
  };

  _onDone = () => {
    this.setState({ showRealApp: true });
  };

  render() {
    const { showPopup, route,isLogin } = this.props;
    console.log('isLoginHome :>> ', isLogin);
    const { token } = this.state;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        {/**### APPBAR ###*/}
        <AppBars style={[styles.appBar]}>
          <View style={[styles.actionBar]}>
            {/* <Appbar.Action icon="menu" color="white" onPress={() => {}} />
             */}
            <Appbar.Content
              title={
                <Text style={[styles.notifiAppbar, styles.font14]}>
                  더 많은 혜택을 위해
                  <Text style={{ color: '#ff6d00' }}> 회원가입 </Text>
                  하러 가기
                </Text>
              }
              titleStyle={DefaultStyle.headerTitle}
            />

            <TouchableOpacity
              mode="contained"
              style={[DefaultStyle.containerBTN, styles.btnAction]}
              color="red"
              // onPress={() => showPopup()}
              onPress={() => this.navigation.navigate('Register')}
              // onPress={() => this.getItem()}
            >
              <Text style={styles.textBtnAction}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View style={[DefaultStyle.divider]} />
        </AppBars>

        {/**### Content ###*/}
        <ScrollView>
          {/**### Carousel ###*/}
          <Carousel
            style={styles.carousel}
            custom={{
              data: slides,
              renderItem: this._renderItem,
              showNextButton: false,
              showDoneButton: false,
              dotStyle: { backgroundColor: '#757575', width: 8, height: 8 },
              activeDotStyle: {
                borderColor: 'white',
                borderWidth: 1,
                width: 10,
                height: 10,
              },
            }}
          />

          {/**### INTRO ###*/}
          <View style={styles.intro}>
            <View style={[styles.introImage]}>
              <Image source={boxMain} style={styles.introSymbolImage} />
              {/* <Image source={factoryBG} style={styles.introFactoryImage} /> */}
            </View>
            {/*--Content--*/}
            <View style={styles.introRow}>
              {/* <Text style={styles.introTitle}>어떤 창고를 찾고 계시나요?</Text> */}
              <TextInputNormal
                placeholder="어떤 창고를 찾고 계시나요?"
                style={styles.introInput}
                placeholderTextColor="white"
                textAlignVertical="center"
                numberOfLines={1}
                ellipsizeMode="start"
              />
              {<Icon name="search" size={24} color="white" />}
            </View>

            <View style={styles.introDivider} />

            <View style={[styles.introRow, styles.introBottom]}>
              <View style={styles.introColum}>
                {<Icon name="check" size={12} color="white" />}
                <Text style={[styles.font9, styles.introColumText]}>
                  빠르고 편리하게
                </Text>
              </View>
              <View style={styles.introColum}>
                {<Icon name="check" size={12} color="white" />}
                <Text style={[styles.font9, styles.introColumText]}>
                  신뢰할 수 있는
                </Text>
              </View>
              <View style={styles.introColum}>
                {<Icon name="check" size={12} color="white" />}
                <Text style={[styles.font9, styles.introColumText]}>
                  안전한 보험, 계약 시스템
                </Text>
              </View>
            </View>
          </View>

          {/**### MainProduct ###*/}
          <View style={styles.mainProduct}>
            <View style={styles.mainProductTitle}>
              <Text
                style={[
                  styles.bold,
                  styles.font24,
                  styles.mainProductTitleName,
                ]}>
                즉시 임대
              </Text>
              <Text
                style={[
                  styles.medium,
                  styles.font14,
                  styles.mainProductTitleContent,
                ]}>
                {
                  '창고의 용도별, 지역별, 편의 시설과 접안 편의성까지\n통합 검색이 가능한 유플로우를 통해 물류를 보관하세요.'
                }
              </Text>
            </View>

            {/**___MoreSee__*/}
            <View style={styles.mainProductMore}>
              <TouchableOpacity
                onPress={() => alert('Hello')}
                style={[styles.mainProductSeeMoreBTN]}>
                <Text
                  style={[
                    styles.medium,
                    styles.font14,
                    styles.mainProductSeeMoreTextBTN,
                  ]}>
                  임대 가능 창고 더 보기
                </Text>
                {
                  <Icon
                    name="arrow-forward"
                    size={22}
                    color={color.primary.main}
                  />
                }
              </TouchableOpacity>
            </View>

            {/**___Product List___*/}
            <View style={styles.mainProductList}>
              <CarouselSnap
                layout={'default'}
                data={slidesProduct}
                sliderWidth={328}
                itemWidth={160}
                renderItem={this._renderProductItem}
                onSnapToItem={index => this.setState({ activeIndex: index })}
              />
            </View>
          </View>

          {/**____MainCallForBinding___*/}
          {/**
          <View style={styles.mainCallForBinding}>
            <Text
              style={[
                styles.mainCallForBindingTitle,
                styles.font16,
                styles.bold,
              ]}>
              유플로우의{' '}
              <Text style={styles.mainCallForBindingTitleSub}>
                B2B 물류 서비스
              </Text>
              를 시작해보세요.
            </Text>
            <Text
              style={[
                styles.font14,
                styles.regular,
                styles.mainCallForBindingContent,
              ]}>
              {'비즈니스에 맞춤 창고가 필요하시다고요?\n' +
                '국내 최대 규모의 온라인 창고 중계 플랫폼, 유플로우에서\n' +
                '편리하고 안전하게 창고를 임대 & 매매하세요.'}
            </Text>
            <View style={styles.mainCallForBindingSearch}>
              <TextInputNormal
                placeholder="이메일을 입력해주세요."
                style={styles.mainCallForBindingSearchInput}
                placeholderTextColor="rgba(0, 0, 0, 0.54)"
              />
              <TouchableOpacity
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={styles.mainCallForBindingSearchBTN}>
                <Text
                  style={[
                    styles.mainCallForBindingSearchTextBTN,
                    styles.medium,
                  ]}>
                  임대문의
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          */}
          {/**___MainStep__*/}
          {/**
          <View style={styles.mainStep}>
            <View style={[styles.mainStepViewTitle]}>
              <Text style={[styles.mainStepTitle, styles.bold, styles.font24]}>
                남는 공간을
                <Text style={[styles.bold, styles.font24, styles.blueColor]}>
                  등록
                </Text>
                <Text
                  style={[styles.mainStepTitle, styles.bold, styles.font24]}>
                  해서 수익 창출, 필요한 창고는
                </Text>
                <Text style={[styles.bold, styles.font24, styles.blueColor]}>
                  찾기
                </Text>
                <Text
                  style={[styles.mainStepTitle, styles.bold, styles.font24]}>
                  편리하게
                </Text>
              </Text>
            </View>
            <Carousel
              style={[styles.carouselStep]}
              custom={{
                data: slidesSteps,
                renderItem: this._renderStepItem,
                showNextButton: false,
                showDoneButton: false,
                dotStyle: {
                  backgroundColor: 'rgba(0, 0, 0, 0.26)',
                  width: 8,
                  height: 8,
                  marginTop: 150,
                },
                activeDotStyle: {
                  borderColor: 'rgba(0, 0, 0, 0.54)',
                  borderWidth: 1,
                  width: 10,
                  height: 10,
                  marginTop: 150,
                },
              }}
            />
          </View>
          */}
          {/**___Slogan__*/}
          {/**
          <View style={styles.mainSlogan}>
            <Text style={[styles.mainSloganTitle, styles.bold, styles.font24]}>
              {'빠르고 편리하고 안전한\n' + '좋은 창고, 유플로우'}
            </Text>
            <View style={styles.mainSloganContent}>
              {slidesSlogans.map((v, i) => {
                return <SloganCard data={v} index={i} key={'slogan' + i} />;
              })}
            </View>
          </View>
          */}
          {/**___Video Intro__*/}
          {/*  <View style={styles.mainVideo}>
             <Video
              source={{ uri: 'https://www.youtube.com/watch?v=6hwz2mMTgIY' }}
              ref={ref => {
                this.player = ref;
              }} // Store reference
              onBuffer={this.onBuffer}
              onError={this.videoError}
              style={styles.backgroundVideo}
            /> 
            {
              // <VideoPlayer
              //   video={{
              //     uri:
              //       'https://pawsome-public-s3.s3.ap-northeast-2.amazonaws.com/LogisALL홍보동영상(국문).mp4',
              //   }}
              //   // style={styles.backgroundVideo}
              //   thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
              //   autoplay={true}
              // />
            }
          </View>*/}

          {/**___Call__*/}
          <View style={styles.mainCall}>
            <Text style={[styles.mainCallTitle, styles.bold, styles.font16]}>
              <Text style={styles.yellowColor}>좋은 창고를 공유</Text>
              하는 경험, 지금 시작해 보세요.
            </Text>
            <View
              style={[styles.introRow, styles.mainCallRow, styles.introBottom]}>
              {/** 
              <View style={styles.introColum}>
                {
                  <Icon
                    name="check"
                    size={12}
                    color="white"
                    style={{ marginLeft: 14 }}
                  />
                }
                <Text style={[styles.font9, styles.introColumText]}>
                  빠르고 편리하게
                </Text>
              </View>
              <View style={styles.introColum}>
                {
                  <Icon
                    name="check"
                    size={12}
                    color="white"
                    style={{ marginLeft: 14 }}
                  />
                }
                <Text style={[styles.font9, styles.introColumText]}>
                  신뢰할 수 있는
                </Text>
              </View>
              <View style={styles.introColum}>
                {
                  <Icon
                    name="check"
                    size={12}
                    color="white"
                    style={{ marginLeft: 14 }}
                  />
                }
                <Text style={[styles.font9, styles.introColumText]}>
                  안전한 보험, 계약 시스템
                </Text>
              </View>
            */}

              <Text
                style={[
                  styles.font14,
                  styles.introColumText,
                  styles.mainAppDowloadTitle,
                ]}>
                혹시 창고를 보유하고 계신가요?{'\n'}
                창고 등록 탭에서 창고를 등록해보세요.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.mainCallBTN}
              onPress={() => this.navigation.navigate('RegisterWH')}>
              <Text
                style={[
                  styles.btnMainCall,
                  styles.blueColor,
                  styles.medium,
                  styles.font15,
                ]}>
                {/**무료로 회원 가입하기 */}
                창고 등록하기
              </Text>
            </TouchableOpacity>
          </View>

          {/**___Help__*/}
          {/**
          <ScrollView style={[styles.mainHelp]} horizontal={true}>
            <Text style={[styles.mainHelpText, styles.bold, styles.font34]}>
              1588.1333. HELP@UFLOW.CO.KR
            </Text>
          </ScrollView>
          */}
          {/**___App Download__*/}
          {/**
          <View style={[styles.mainAppDowload]}>
            <Image source={logoWhite} />
            <Text
              style={[styles.bold, styles.white, styles.mainAppDowloadTitle]}>
              <Text style={[styles.yellowColor, styles.bold]}>U</Text>it load
              {' & '}
              <Text style={[styles.yellowColor, styles.bold]}>F</Text>ulfillment
              by{'\n'} <Text style={[styles.yellowColor, styles.bold]}>L</Text>
              ogisAll <Text style={[styles.yellowColor, styles.bold]}>O</Text>
              penable <Text style={[styles.yellowColor, styles.bold]}>W</Text>
              arehouse
            </Text>
            <View style={styles.appSupport}>
              <Image source={appstore1} style={styles.appSupportBTN} />
              <Image source={appstore2} style={styles.appSupportBTN} />
            </View>
          </View>
          */}
          {/**__Footer___ */}
          {/**
          <Footer data={data} />
          */}
          <View style={styles.copyRight}>
            <Text style={[styles.textCopyRight, styles.font9]}>
              Copyright © 2020 Uflow Inc. 모든 권리 보유.{'\n'}v 1(20201112)
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  async componentDidMount() {
    console.log('::componentDidMount::');
    /** App Version Check (배포시 활성.) */
    // await VersionCheckService.init();
    // const value = await AsyncStorage.getItem('token');
    // Account.getMe()
    //   .then(res => {
    //     console.log('::::: Get Me :::::', res);
    //     const status = res.status;
    //     if (status === 200) {
    //     }
    //   })
    //   .catch(err => {
    //     console.log('errHome', err);
    //   });
    // if (value) {
    //   this.setState({ token: value });
    // }

    // async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('token');
    //     if (value !== null) {
    //       // We have data!!f
    //       console.log('value', value);
    //     }
    //   } catch (error) {
    //     // Error retrieving data
    //   }
    // };
    /** Complete Initialize. */
    SplashScreen.hide();
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    count: state.home.count,
    isLogin: state.login,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps(dispatch) {
  return {
    showPopup: status => {
      dispatch(
        ActionCreator.show({
          title: '문의 완료',
          content:
            '답변 내용은 [마이페이지 > 문의내역[ 혹은 등록하신 이메일에서 확인해 주세요.',
        }),
      );
    },
    hidePopup: status => {
      dispatch(ActionCreator.hide(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
