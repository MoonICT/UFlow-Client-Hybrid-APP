/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, Text, ScrollView, View, Image} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '../../styles/default';
import ActionCreator from '../../actions';
import Carousel from '@Components/organisms/Carousel';
// import CarouselSnap from '@Components/organisms/CarouselSnaps';
import AppBars from '@Components/organisms/AppBar';
import {styles} from './styles';

import mainBG from '@Assets/images/main-bg.png';

// import VersionCheckService from '../../services/VersionCheckService';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

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
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      activeIndex: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {
    console.log('::componentWillUnmount::');
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
    );
  };

  _renderStepItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <Image source={item.image} />
      </View>
    );
  };

  _onDone = () => {
    this.setState({showRealApp: true});
  };

  render() {
    const {showPopup} = this.props;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        <AppBars style={[styles.appBar]}>
          <View style={[styles.actionBar]}>
            <Appbar.Action icon="menu" color="white" onPress={() => {}} />
            <Button
              mode="contained"
              style={[DefaultStyle.containerBTN, styles.btnAction]}
              color="red"
              onPress={() => showPopup()}>
              임대문의
            </Button>
          </View>
          <View style={[DefaultStyle.divider]} />
        </AppBars>
        <ScrollView>
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
          {/**intro */}
          <View style={styles.intro}>
            <Text>Hello</Text>
          </View>
          {/**mainProduct */}
          <View style={styles.mainProduct}>
            <Text>Hello</Text>
          </View>
          {/**mainCallForBinding */}
          <View style={styles.mainCallForBinding}>
            <Text>Hello</Text>
          </View>
          {/**MainStep */}
          <View style={styles.mainStep}>
            {/* <CarouselSnap
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={slides}
              sliderWidth={300}
              itemWidth={300}
              renderItem={this._renderStepItem}
              onSnapToItem={index => this.setState({activeIndex: index})}
            /> */}
          </View>

          <Card>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button onPress={() => showPopup()}>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  async componentDidMount() {
    console.log('::componentDidMount::');
    /** App Version Check (배포시 활성.) */
    // await VersionCheckService.init();
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
