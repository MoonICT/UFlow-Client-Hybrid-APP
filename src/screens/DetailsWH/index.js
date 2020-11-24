/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  DataTable,
  Appbar,
  Paragraph,
  Text,
  Button,
  IconButton,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';
import Dialogs from '@Components/organisms/Dialog';
import Checkbox from '@Components/atoms/Checkbox';
import AppGrid from '@Components/organisms/AppGrid';
import CarouselSnap from '@Components/organisms/CarouselSnap';
import ProductCard from '@Components/organisms/ProductCard';

import ActionCreator from '../../actions';
import card from '@Assets/images/card-img.png';
import circle from '@Assets/images/avatars-circle-icon.png';
import mainBG from '@Assets/images/main-bg.png';
import cardBG from '@Assets/images/card-img.png';
import mapLink from '@Assets/images/mapLink.png';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
class RegisterWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { active: 0, checked: true, checked2: false, activeIndex: 0 };
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

  _renderProductItem = ({ item }) => {
    return <ProductCard data={{ ...item, img: cardBG }} />;
  };
  render() {
    const { imageStore, workComplete } = this.props;
    const dataTab = [
      {
        title: 'TOP10',
        content: '* 중앙 탭 클릭 부터는 중앙 정렬 (ref. 배달의민족)',
      },
      {
        title: '회원가입',
        content: '회원가입',
      },
      {
        title: '창고조회',
        content: '창고조회',
      },
      {
        title: '창고등록',
        content: '창고등록',
      },
      {
        title: '창고등록5',
        content: '창고등록5',
      },
      {
        title: '창고등록6',
        content: '창고등록6',
      },
    ];
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title=""
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
          <Appbar.Action
            icon="heart-outline"
            color="black"
            onPress={() => {
              this.handlePicker();
              // this.props.registerAction('44444');
            }}
          />
        </Appbars>
        <ScrollView style={S.backgroundPage}>
          <View style={DefaultStyle._cards}>
            <Text style={S.titleWH}>제휴창고</Text>
            <Text style={S.describeTitle}>보관창고, 수탁창고</Text>
            <Text style={S.header}>에이씨티앤코아물류</Text>
            <View style={S.labels}>
              <Text style={[S.textlabel, S.orange]}>상온</Text>
              <Text style={[S.textlabel, S.azure]}>상온</Text>
              <Text style={[S.textlabel, S.green]}>상온</Text>
              <Text style={[S.textlabel, S.gray]}>상온</Text>
              <Text style={S.textlabel}>12,345평</Text>
            </View>
            <View style={S.background}>
              <Image style={S.backgroundImage} source={card} />
              <Image style={S.iconBackground} source={circle} />
            </View>
            <View style={S.info}>
              <Text style={S.title}>창고 정보</Text>
              <View style={S.tabBar}>
                <TouchableOpacity
                  style={[
                    S.btnTabBarLeft,
                    this.state.active === 0 ? S.activeBtn : null,
                  ]}
                  onPress={() => this.setState({ active: 0 })}>
                  <Text
                    style={[
                      S.textBtn,
                      this.state.active === 0 ? S.activeText : null,
                    ]}>
                    보관
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    S.btnTabBarRight,
                    this.state.active === 1 ? S.activeBtn : null,
                  ]}
                  onPress={() => this.setState({ active: 1 })}>
                  <Text
                    style={[
                      S.textBtn,
                      this.state.active === 1 ? S.activeText : null,
                    ]}>
                    수탁
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={DefaultStyle._cardBody}>
                <View style={S.headerCard}>
                  <View style={S.imageHeader} />
                  <Checkbox
                    checked={this.state.checked}
                    onPress={() =>
                      this.setState({ checked: !this.state.checked })
                    }
                  />
                </View>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        보관유형
                      </Text>
                      <Text style={S.textTable}>보관유형</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        정산단위
                      </Text>
                      <Text style={S.textTable}>제곱미터(m²)</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        산정기준
                      </Text>
                      <Text style={S.textTable}>일(Day)</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        가용면적
                      </Text>
                      <Text style={S.textTable}>1,200m²</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        보관 가능 기간
                      </Text>
                      <Text style={S.textTable}>2020.10.10 - 2021.10.10</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>보관료</Text>
                      <Text style={S.textTable}>5,000원</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>관리비</Text>
                      <Text style={S.textTable}>일반관리비 / 5,000원</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={DefaultStyle._cardBody}>
                <View style={S.headerCard}>
                  <View style={S.imageHeader} />
                  <Checkbox
                    checked={this.state.checked2}
                    onPress={() =>
                      this.setState({ checked2: !this.state.checked2 })
                    }
                  />
                </View>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        보관유형
                      </Text>
                      <Text style={S.textTable}>보관유형</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        정산단위
                      </Text>
                      <Text style={S.textTable}>제곱미터(m²)</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        산정기준
                      </Text>
                      <Text style={S.textTable}>일(Day)</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        가용면적
                      </Text>
                      <Text style={S.textTable}>1,200m²</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        보관 가능 기간
                      </Text>
                      <Text style={S.textTable}>2020.10.10 - 2021.10.10</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>보관료</Text>
                      <Text style={S.textTable}>5,000원</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>관리비</Text>
                      <Text style={S.textTable}>일반관리비 / 5,000원</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>창고 정보</Text>
              <View style={DefaultStyle._cardBody}>
                <View style={S.headerCard}>
                  <Text style={S.textHeaderCard}>
                    인천터미널 부근 리모델링 창고
                  </Text>
                </View>
                <View style={S.bodyCard}>
                  <View style={S.viewBody}>
                    <Text style={S.textBodyCard}>
                      인천터미널 10분 연수역 10분 거리에 위치해 있고 주위에
                      먹자골목이 형성되어 있어 살기 편합니다. 세계로 마트가
                      가깝고 국민은행, 힘찬 병원 등 각종 시설이 잘 갖추어져
                      있습니다.
                    </Text>
                    <Text style={[S.textBodyCard, { marginTop: 10 }]}>
                      궁금하신 점 언제나 문의 환영합니다. 친절
                      상담해드리겠습니다.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>창고 정보</Text>
              <Text style={S.titleDescribe}>인천광역시 서구 석남동 650-31</Text>
              <View style={DefaultStyle._cardBody}>
                <View style={S.bodyCard}>
                  <TouchableOpacity
                    onPress={() => {
                      this.navigation.navigate('DetailsLocationWH');
                    }}>
                    <ImageBackground source={mapLink} style={S.imageMap} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>추가 정보</Text>
              <View style={DefaultStyle._cardBody}>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>준공일</Text>
                      <Text style={S.textTable}>2015.12.23</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        전용면적
                      </Text>
                      <Text style={S.textTable}>4,885평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        대지면적
                      </Text>
                      <Text style={S.textTable}>8,000평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        공용면적
                      </Text>
                      <Text style={S.textTable}>8,000평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        건축면적
                      </Text>
                      <Text style={S.textTable}>6,000평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>연면적</Text>
                      <Text style={S.textTable}>14,000원</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        보험 가입
                      </Text>
                      <Text style={S.textTable}>건물보험 / 재고보험</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>층별 상세 정보</Text>
              <View style>
                <AppGrid data={dataTab} />
              </View>
              <View style={DefaultStyle._cardBody}>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        창고면적
                      </Text>
                      <Text style={S.textTable}>1,234평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        사무실면적
                      </Text>
                      <Text style={S.textTable}>234평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        주차장면적
                      </Text>
                      <Text style={S.textTable}>567평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        공욤면적
                      </Text>
                      <Text style={S.textTable}>300평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>유효고</Text>
                      <Text style={S.textTable}>8.5</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        접안 방식
                      </Text>
                      <Text style={S.textTable}>40FT 컨테이너</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        도크 수
                      </Text>
                      <Text style={S.textTable}>29</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <View style={S.titleView}>
                <Text style={S.title}>문의 (123)</Text>
                <View style={S.rightTitle}>
                  <TouchableOpacity
                    style={S.btnInquiry}
                    onPress={() => console.log('add')}>
                    <Text style={S.textInquiry}>문의하기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={DefaultStyle._cardBody}>
                <View style={S.bodyCard}>
                  <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={S.titleInquiry}>미답변</Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View>
                  <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={S.titleInquiry}>미답변</Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View>
                  <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={[S.titleInquiry,S.titleCompleted]}>답변완료</Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View>
                  <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={S.titleInquiry}>미답변</Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={S.btnViewAll}
                    onPress={() => this.navigation.navigate('InquiryWH')}>
                    <Text style={S.textViewAll}>전체보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>유사한 창고</Text>
              <View style={S.mainProductList}>
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
            <TouchableOpacity
              style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
              onPress={() => {
                // this.showDialog();
              }}>
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  DefaultStyle.textActiveSubmit,
                ]}>
                견적 요청하기
              </Text>
            </TouchableOpacity>
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
)(RegisterWH);
