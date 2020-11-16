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
 * @modify date 2020-11-16 18:54:24
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react'
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {connect} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
  Menu,
  Divider,
  List,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Local Imports
import DefaultStyle from '../../styles/default'
import {color} from '@Themes/colors'

import ActionCreator from '../../actions'
import Carousel from '@Components/organisms/Carousel'
import CarouselSnap from '@Components/organisms/CarouselSnap'
import AppBars from '@Components/organisms/AppBar'
import ProductCard from '@Components/organisms/ProductCard'

// import Menus from '@Components/organisms/Menu';
// import TreeViews from '@Components/organisms/TreeView';

import {styles} from './styles'

import mainBG from '@Assets/images/main-bg.png'
import symbolsBG from '@Assets/images/symbol.png'
import factoryBG from '@Assets/images/factory.png'
import cardBG from '@Assets/images/card-img.png'

// import VersionCheckService from '../../services/VersionCheckService';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const LeftContent = props => <Avatar.Icon {...props} icon='folder' />

const slides = [
  {
    key: 'somethun',
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
    key: 'somethun',
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
    key: 'somethun',
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
    key: 'somethun',
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
    key: 'somethun',
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
]

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
]

class Home extends Component {
  constructor (props) {
    super(props)
    this.webView = null
    this.state = {
      activeIndex: 0,
      isShow: false,
      expanded: true,
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  componentWillUnmount () {
    console.log('::componentWillUnmount::')
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <Image source={item.image} />
      </View>
    )
  }

  _renderProductItem = ({item}) => {
    return <ProductCard data={{...item, img: cardBG}} />
  }

  _onDone = () => {
    this.setState({showRealApp: true})
  }

  render () {
    const {showPopup} = this.props
    // const {isShow, expanded} = this.state;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        {/**### APPBAR ###*/}
        <AppBars style={[styles.appBar]}>
          <View style={[styles.actionBar]}>
            <Appbar.Action icon='menu' color='white' onPress={() => {}} />
            {/* <Text styles={[styles.notifiAppbar, styles.font14]}>
              더 많은 혜택을 위해 회원가입하러 가기
            </Text> */}
            <Button
              mode='contained'
              style={[DefaultStyle.containerBTN, styles.btnAction]}
              color='red'
              onPress={() => showPopup()}>
              회원가입
            </Button>
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
              dotStyle: {backgroundColor: '#757575', width: 8, height: 8},
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
            {/*--Content--*/}
            <View style={styles.introRow}>
              <Text style={styles.introTitle}>어떤 창고를 찾고 계시나요?</Text>
            </View>

            <View style={styles.introDivider} />

            <View style={[styles.introRow, styles.introBottom]}>
              <View style={styles.introColum}>
                {<Icon name='check' size={12} color='white' />}
                <Text style={[styles.font9, styles.introColumText]}>
                  빠르고 편리하게
                </Text>
              </View>
              <View style={styles.introColum}>
                {<Icon name='check' size={12} color='white' />}
                <Text style={[styles.font9, styles.introColumText]}>
                  신뢰할 수 있는
                </Text>
              </View>
              <View style={styles.introColum}>
                {<Icon name='check' size={12} color='white' />}
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
                    name='arrow-forward'
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
                onSnapToItem={index => this.setState({activeIndex: index})}
              />
            </View>
          </View>

          {/**____MainCallForBinding___*/}
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
          </View>

          {/**MainStep */}
          <View style={styles.mainStep}>
            {/* <CarouselSnap
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={slides}
              sliderWidth={'300'}
              itemWidth={'300'}
              renderItem={this._renderStepItem}
              onSnapToItem={index => this.setState({activeIndex: index})}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  async componentDidMount () {
    console.log('::componentDidMount::')
    /** App Version Check (배포시 활성.) */
    // await VersionCheckService.init();
    /** Complete Initialize. */
    SplashScreen.hide()
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::')
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    count: state.home.count,
  }
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    showPopup: status => {
      dispatch(
        ActionCreator.show({
          title: '문의 완료',
          content:
            '답변 내용은 [마이페이지 > 문의내역[ 혹은 등록하신 이메일에서 확인해 주세요.',
        }),
      )
    },
    hidePopup: status => {
      dispatch(ActionCreator.hide(status))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
