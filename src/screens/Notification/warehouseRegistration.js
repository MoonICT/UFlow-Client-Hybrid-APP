/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component, useRef } from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
// Local Imports
import DefaultStyle from '../../styles/default';
import AppGrid from '@Components/organisms/AppGrid';
import ImgHTW from '@Assets/images/how-to-use.png';
import ImgHTW2 from '@Assets/images/how-to-use2.png';
import ImgHTW3 from '@Assets/images/how-to-use3.png';
import ImgHTW4 from '@Assets/images/how-to-use4.png';
import ImgHTW5 from '@Assets/images/how-to-use5.png';
import iconService2 from '@Assets/images/ic-service2.png';
import iconService3 from '@Assets/images/ic-service3.png';
import iconService4 from '@Assets/images/ic-service4.png';
import Footer from '@Components/organisms/Footer';
import iconService5 from '@Assets/images/ic-service5.png';
import Appbars from '@Components/organisms/AppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as S } from './style';
import Carousel from '@Components/organisms/Carousel';
import { Appbar } from 'react-native-paper';
const data = [
  {
    title: '1.창고 등록',
  },
  {
    title: '2.공실 검증',
  },
  {
    title: '3.견적 요청 확인',
  },
  {
    title: '4.계약 요청',
  },
];

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      title: '1.창고 등록',
      heightSection1: 0,
      heightSection2: 0,
      heightSection3: 0,
      heightSection4: 0,
      heightSection5: 0,
      heightSection6: 0,
    };
  }

  getDimesionsHeightSection1 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection1: height });
  };
  getDimesionsHeightSection2 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection2: height });
  };
  getDimesionsHeightSection3 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection3: height });
  };
  getDimesionsHeightSection4 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection4: height });
  };
  getDimesionsHeightSection5 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection5: height });
  };
  getDimesionsHeightSection6 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection6: height });
  };

  _renderItemCarousel = ({ item }) => {
    return (
      <View style={[S.boxSection, { marginBottom: 60, paddingBottom: 100 }]}>
        <Text style={S.title}>{item.title}</Text>
        <Text style={S.description}>{item.description}</Text>
        <View style={S.boxTarget}>
          {/* <Text style={S.textTarget}>{item.textTarget}</Text> */}
          <Icon.Button
            size={20}
            color={'#ff6d00'}
            backgroundColor="transparent"
            style={S.iconArrowRight}
            // onPress={this.handleNavigationNext}
            name="arrow-right"
          />
        </View>
        <View style={S.image}>
          <ImageBackground
            source={ImgHTW}
            style={{ width: 320, height: 580 }}
          />
        </View>
        <View>
          <Text style={S.titleSmall}>{item.titleSmall}</Text>
          <Text style={S.description}>{item.description2}</Text>
        </View>
      </View>
    );
  };
  _renderItemCarouselText = ({ item }) => {
    return <Text style={S.description}>{item.contentText}</Text>;
  };
  renderItemCarousel = ({ item }) => {
    return (
      <View>
        <View style={[S.image, { marginBottom: 30 }]}>
          <ImageBackground
            source={item.url}
            style={{ width: 168, height: 308 }}
          />
        </View>
        <Text style={S.descriptionLarge}>{item.title}</Text>
        <Text style={S.description}>{item.content}</Text>
      </View>
    );
  };

  renderItemList = (url, title, content) => {
    return (
      <View style={[DefaultStyle.row, { marginTop: 30, position: 'relative' }]}>
        <Image style={S.imgList} source={url} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, marginBottom: 7 }}>{title}</Text>
          <Text style={{ lineHeight: 20 }}>{content}</Text>
        </View>
      </View>
    );
  };

  renderItemList2 = (url, title, content) => {
    return (
      <View style={[DefaultStyle.row, { marginTop: 50, position: 'relative' }]}>
        <Image style={S.imgList2} source={url} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, marginBottom: 7 }}>{title}</Text>
          <Text style={{ lineHeight: 20 }}>{content}</Text>
        </View>
      </View>
    );
  };
  handleScroll = e => {
    const {
      heightSection1,
      heightSection2,
      heightSection3,
      heightSection4,
    } = this.state;
    let scrollY = e.nativeEvent.contentOffset.y;
    let height2 = heightSection2 + heightSection1;
    let height3 = height2 + heightSection3;
    let height4 = height3 + heightSection4;

    if (scrollY <= heightSection1) {
      this.setState({ title: '1.창고 등록' });
    } else if (heightSection1 < scrollY && scrollY < height2) {
      this.setState({ title: '2.공실 검증' });
    } else if (scrollY > height2 && scrollY < height3) {
      this.setState({ title: '3.견적 요청 확인' });
    } else if (scrollY > height3 && scrollY < height4) {
      this.setState({ title: '4.계약 요청' });
    } else if (scrollY > height4 + 200) {
      this.setState({ title: '5' });
    }
  };

  handleChangeTitle = e => {
    const { heightSection1, heightSection2, heightSection3 } = this.state;
    console.log('handleChangeTitle', e);
    switch (e) {
      case '1.창고 등록':
        this.myRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
        break;
      case '2.공실 검증':
        this.myRef.current?.scrollTo({
          y: heightSection1 + 80,
          animated: true,
        });
        break;
      case '3.견적 요청 확인':
        this.myRef.current?.scrollTo({
          y: heightSection1 + heightSection2 + 100,
          animated: true,
        });
        break;
      case '4.계약 요청':
        this.myRef.current?.scrollTo({
          y: heightSection1 + heightSection2 + heightSection3 + 200,
          animated: true,
        });
        break;
    }
  };
  render() {
    const windowWidth = Dimensions.get('window').width;
    let slidesText = [
      {
        key: 'one',
        contentText: (
          <Text>
            [창고 등록] 버튼을 클릭하여 {'\n'}창고 등록 페이지로 이동 후 {'\n'}
            사업자 정보를 입력해 주세요.
          </Text>
        ),
      },
      {
        key: 'two',
        contentText: (
          <Text>
            [창고 등록] 버튼을 클릭하여 {'\n'}창고 등록 페이지로 이동 후 {'\n'}
            사업자 정보를 입력해 주세요.
          </Text>
        ),
      },
      {
        key: 'three',
        contentText: (
          <Text>
            [창고 등록] 버튼을 클릭하여 {'\n'}창고 등록 페이지로 이동 후 {'\n'}
            사업자 정보를 입력해 주세요.
          </Text>
        ),
      },
    ];
    let _slides = [
      {
        key: 'one',
        title: '견적 요청 정보',
        url: ImgHTW4,
        content: (
          <Text>
            임차인이 창고 정보를 기준으로 등록한 {'\n'}
            견적 요청 정보를 확인하세요.
          </Text>
        ),
      },
      {
        key: 'two',
        title: '견적 요청 정보',
        url: ImgHTW4,
        content: (
          <Text>
            임차인이 창고 정보를 기준으로 등록한 {'\n'}
            견적 요청 정보를 확인하세요.
          </Text>
        ),
      },
      {
        key: 'three',
        title: '견적 요청 정보',
        url: ImgHTW4,
        content: (
          <Text>
            임차인이 창고 정보를 기준으로 등록한 {'\n'}
            견적 요청 정보를 확인하세요.
          </Text>
        ),
      },
    ];
    let _slides2 = [
      {
        key: 'one',
        title: '전자 계약',
        url: ImgHTW5,
        content: (
          <Text>
            클릭 한 번으로 온라인에서 간편하게 {'\n'}
            날인할 수 있습니다.
          </Text>
        ),
      },
      {
        key: 'two',
        title: '전자 계약',
        url: ImgHTW5,
        content: (
          <Text>
            클릭 한 번으로 온라인에서 간편하게 {'\n'}
            날인할 수 있습니다.
          </Text>
        ),
      },
      {
        key: 'three',
        title: '전자 계약',
        url: ImgHTW5,
        content: (
          <Text>
            클릭 한 번으로 온라인에서 간편하게 {'\n'}
            날인할 수 있습니다.
          </Text>
        ),
      },
    ];

    let _slides3 = [
      {
        key: 'one',
        title: '계약 내용 확인',
        url: ImgHTW4,
        content: (
          <Text>
            유플로우 계약 담당자가 계약 내용을 최종 {'\n'}
            검토 후에 계약을 체결합니다. {'\n'}
            담당자와 조율하고 최종 검토한 계약 내용과 {'\n'}
            수수료를 확인해 주세요.
          </Text>
        ),
      },
      {
        key: 'two',
        title: '계약 내용 확인',
        url: ImgHTW4,
        content: (
          <Text>
            유플로우 계약 담당자가 계약 내용을 최종 {'\n'}
            검토 후에 계약을 체결합니다. {'\n'}
            담당자와 조율하고 최종 검토한 계약 내용과 {'\n'}
            수수료를 확인해 주세요.
          </Text>
        ),
      },
      {
        key: 'three',
        title: '계약 내용 확인',
        url: ImgHTW4,
        content: (
          <Text>
            유플로우 계약 담당자가 계약 내용을 최종 {'\n'}
            검토 후에 계약을 체결합니다. {'\n'}
            담당자와 조율하고 최종 검토한 계약 내용과 {'\n'}
            수수료를 확인해 주세요.
          </Text>
        ),
      },
    ];
    const { title } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        {/* <View style={{ backgroundColor: 'white' }}> */}
        <HistoryBackActionBar
          title={'서비스 이용안내'}
          navigation={this.props.nav}/>

        <View style={[S.line, { width: windowWidth }]}>
          <Text />
        </View>
        <View style={S.tabTopbar}>
          <View style={S.boxSelect}>{this.props.navitationTitle}</View>
          <AppGrid
            type="controlTitleActive"
            titleActive={title}
            data={data}
            titleProps={e => this.handleChangeTitle(e)}
          />
        </View>
        {/* </View> */}
        <ScrollView onScroll={this.handleScroll} ref={this.myRef}>
          {/* section 1 */}
          <View
            onLayout={this.getDimesionsHeightSection1}
            style={[S.boxSection, { marginTop: 150 }]}>
            <Text style={S.title}>임대하고 싶은{'\n'}창고를 등록해보세요.</Text>
            <Text style={S.description}>
              유플로우에 창고 정보와 사업자 정보를 등록하여 {'\n'}임대할 창고를
              등록할 수 있습니다.
            </Text>
            {/* <View style={S.boxTarget}>
              <Text style={S.textTarget}>창고 등록 하러가기</Text>
              <Icon.Button
                size={20}
                color={'#ff6d00'}
                backgroundColor="transparent"
                style={S.iconArrowRight}
                name="arrow-right"
              />
            </View> */}
            <View style={[S.image, { marginBottom: 30 }]}>
              <ImageBackground
                source={ImgHTW2}
                style={{ width: 370, height: 339 }}
              />
            </View>
            <Carousel
              custom={{
                data: slidesText,
                renderItem: this._renderItemCarouselText,
                dotStyle: {
                  backgroundColor: '#cccccc',
                  width: 8,
                  height: 8,
                  marginTop: 130,
                },
                activeDotStyle: {
                  backgroundColor: 'black',
                  width: 8,
                  marginTop: 130,
                  height: 8,
                },
              }}

            />
            <Text style={[S.descriptionSmall, { marginTop: 50 }]}>
              ･ 수탁 계약 유형 선택 시 임대 계약 유형을 선택할 수 없습니다.
              {'\n'}･ 계약 유형은 등록 후 수정이 불가하니 신중히 작성해 주세요.
            </Text>
          </View>

          {/* section 2 */}
          <View
            onLayout={this.getDimesionsHeightSection2}
            style={[S.boxSection]}>
            <Text style={S.title}>
              등록한 창고의{'\n'}공실 검증이 진행됩니다.
            </Text>
            <Text style={S.description}>
              입력한 창고 정보를 바탕으로 유플로우 담당자가{'\n'}직접 창고에
              방문하여 공실 검증을 진행합니다.
            </Text>

            {this.renderItemList(
              iconService2,
              '공실 검증 완료',
              <Text style={{ lineHeight: 20 }}>
                입력하신 정보를 바탕으로 창고 검증을 진행{'\n'}한 후 적합 판단
                시 등록을 승인하고 검증을 {'\n'}
                완료합니다.
              </Text>,
            )}

            {this.renderItemList(
              iconService2,
              '검증 불가',
              <Text style={{ lineHeight: 20 }}>
                창고 정보가 유효하지 않거나 허위 매물의 경{'\n'}우 부적합
                판단으로 검증을 종료합니다.
              </Text>,
            )}
            <View style={[S.image, { marginBottom: 30, marginTop: 50 }]}>
              <ImageBackground
                source={ImgHTW3}
                style={{ width: 380, height: 339 }}
              />
            </View>
            <Text style={S.descriptionLarge}>
              공실 검증이 완료되면{'\n'}
              등록한 창고가 공개됩니다.
            </Text>
            <Text style={[S.description, { fontWeight: '400' }]}>
              등록한 창고를 바탕으로 임차인이{'\n'}
              견적 요청을 진행할 수 있습니다.
            </Text>
            <Text style={[S.descriptionSmall, { marginTop: 25 }]}>
              * 공실 검증은 창고에 따라 영업일 N일 정도 소요될 수 있습니다.
            </Text>
          </View>
          {/* section 3 */}
          <View
            style={[S.boxSection, { marginTop: 50, paddingBottom: 90 }]}
            onLayout={this.getDimesionsHeightSection3}>
            <Text style={S.title}>
              내 창고에 요청한 견적들을
              {'\n'}확인하고 협의하세요.
            </Text>
            <Text style={S.description}>
              임차인이 요청한 견적 정보를 확인하고 {'\n'}
              적합 여부를 확인해 주세요.
            </Text>
            <Carousel
              custom={{
                data: _slides,
                renderItem: this.renderItemCarousel,
                dotStyle: {
                  backgroundColor: '#cccccc',
                  width: 8,
                  height: 8,
                  marginTop: 130,
                },
                activeDotStyle: {
                  backgroundColor: 'black',
                  width: 8,
                  marginTop: 130,
                  height: 8,
                },
              }}

            />
          </View>
          {/* section 4 */}
          <View
            style={[S.boxSection, { marginTop: 80, paddingBottom: 90 }]}
            onLayout={this.getDimesionsHeightSection4}>
            <Text style={S.title}>
              확정된 견적으로 {'\n'}
              계약을 요청하세요
            </Text>
            <Text style={S.description}>
              확정된 견적 내용을 토대로 유플로우에서 계약서를 {'\n'}
              작성해드립니다. 계약은 전자 계약, 오프라인 계약을 {'\n'}
              선택해서 진행할 수 있습니다.{'\n'}
            </Text>
            {this.renderItemList2(
              iconService3,
              '계약서 확인',
              <Text>
                계약서 내용을 확인하고 추가 필요 서류를{'\n'}
                제출해 주세요.
              </Text>,
            )}
            {this.renderItemList2(
              iconService4,
              '계약 방식',
              <Text>
                전자 계약, 오프라인 계약 중 한 가지 방식을{'\n'} 선택해 주세요.
              </Text>,
            )}
            {this.renderItemList2(
              iconService5,
              '계약 요청 완료',
              <Text>
                계약 내용을 검토 후 계약 요청을 완료해{'\n'}
                주세요.
              </Text>,
            )}
            <View style={{ marginTop: 30 }} />
            <Carousel
              custom={{
                data: _slides2,
                renderItem: this.renderItemCarousel,
                dotStyle: {
                  backgroundColor: '#cccccc',
                  width: 8,
                  height: 8,
                  marginTop: 130,
                },
                activeDotStyle: {
                  backgroundColor: 'black',
                  width: 8,
                  marginTop: 130,
                  height: 8,
                },
              }}

            />
          </View>

          {/* section 5 */}
          <View
            style={[S.boxSection, { marginTop: 50, paddingBottom: 80 }]}
            onLayout={this.getDimesionsHeightSection5}>
            <Carousel
              custom={{
                data: _slides3,
                renderItem: this.renderItemCarousel,
                dotStyle: {
                  backgroundColor: '#cccccc',
                  width: 8,
                  height: 8,
                  marginTop: 130,
                },
                activeDotStyle: {
                  backgroundColor: 'black',
                  width: 8,
                  marginTop: 130,
                  height: 8,
                },
              }}

            />
          </View>
          {/* section 6 */}
          <View
            style={[
              S.boxSection,
              { marginTop: 50, paddingBottom: 80, borderBottomWidth: 0 },
            ]}
            onLayout={this.getDimesionsHeightSection6}>
            <Text style={S.title}>
              완료된 계약의{'\n'}
              정산 금액을 확인하세요.
            </Text>
            <Text style={S.description}>
              확정된 견적 내용을 토대로 유플로우에서 계약서를 {'\n'}
              작성해드립니다. 계약은 전자 계약, 오프라인 계약을 {'\n'}
              선택해서 진행할 수 있습니다.
            </Text>

            <View style={[S.image, { marginBottom: 30 }]}>
              <ImageBackground
                source={ImgHTW5}
                style={{ width: 168, height: 308 }}
              />
            </View>
          </View>
          <View style={S.contentBottom}>
            <Text style={S.description}>
              유플로우를 통해 창고를 등록하거나{'\n'}
              필요한 창고를 편리하게 찾아보세요.
            </Text>
            <View style={S.boxTarget}>
              {/* <Text style={S.textTarget}>유플로우 회원가입하기</Text> */}
              <Icon.Button
                size={20}
                color={'#ff6d00'}
                backgroundColor="transparent"
                style={S.iconArrowRight}
                // onPress={this.handleNavigationNext}
                name="arrow-right"
              />
            </View>
          </View>

          {/* <Footer data={_data} /> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
