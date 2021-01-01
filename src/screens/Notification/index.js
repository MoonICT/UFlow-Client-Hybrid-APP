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
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

// Local Imports
import LocalNotificationService from '../../services/LocalNotificationService';
import DefaultStyle from '../../styles/default';
import AppGrid from '@Components/organisms/AppGrid';
import ImgHTW from '@Assets/images/how-to-use.png';
import iconService from '@Assets/images/ic-service.png';
import Appbars from '@Components/organisms/AppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as S } from './style';
import Carousel from '@Components/organisms/Carousel';
import { Appbar, Dialog, Paragraph, Button } from 'react-native-paper';
const data = [
  {
    title: '카테고리',
  },
  {
    title: '카테고리2',
  },
  {
    title: '카테고리3',
  },
  {
    title: '카테고리4',
  },
];
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.myRef = React.createRef();
    this.state = {
      title: '카테고리',
      heightSection1: 0,
      heightSection2: 0,
      heightSection3: 0,
      heightSection4: 0,
    };
  }
  _renderItemCarousel = ({ item }) => {
    return (
      <View style={[S.boxSection, { marginBottom: 60, paddingBottom: 100 }]}>
        <Text style={S.title}>{item.title}</Text>
        {item.description}
        <View style={S.boxTarget}>
          <Text style={S.textTarget}>{item.textTarget}</Text>
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
  _renderItemList = (url, title, content) => {
    return (
      <View style={[DefaultStyle.row, { marginTop: 30 }]}>
        <Image
          style={{
            width: 50,
            height: 50,
            marginRight: 16,
          }}
          source={iconService}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, marginBottom: 7 }}>{'포트폴리오'}</Text>
          <Text style={{ lineHeight: 20 }}>
            작업했던 프로젝트를 포트폴리오로 {'\n'} 등록하면 유사한 프로젝트를
            진행할 확률이{'\n'} 높아집니다.'
          </Text>
        </View>
      </View>
    );
  };
  handleScroll = e => {
    console.log('titi', e.nativeEvent.contentOffset.y);
  };
  // getDimesionsHeightSection1 = e => {
  //   let { height } = e.nativeEvent.layout;
  //   this.setState({ heightSection1: height });
  // };
  getDimesionsHeightSection2 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection1: height });
  };
  getDimesionsHeightSection3 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection1: height });
  };
  getDimesionsHeightSection4 = e => {
    let { height } = e.nativeEvent.layout;
    this.setState({ heightSection1: height });
  };

  render() {
    let slides = [
      {
        title: '두번 째 카테고리',
        description: (
          <Text style={{ textAlign: 'center', lineHeight: 20 }}>
            작업했던 프로젝트를 포트폴리오로{'\n'} 지원할 수 있습니다. 월 평균
            652건의 프로젝트가 {'\n'} 유플로우에 등록됩니다.
          </Text>
        ),
        textTarget: '두번 째 카테고리',
        titleSmall: '포트폴리오',
        description2: (
          <Text>
            프로필을 등록하면 유플로우 프로젝트에 편리하게 {'\n'} 등록하면
            유사한 프로젝트를 진행할 {'\n'} 확률이 높아집니다.
          </Text>
        ),
      },
      {
        title: '두번 째 카테고리',
        description: (
          <Text>
            작업했던 프로젝트를 포트폴리오로{'\n'} 지원할 수 있습니다. 월 평균
            652건의 프로젝트가 {'\n'} 유플로우에 등록됩니다.
          </Text>
        ),
        textTarget: '두번 째 카테고리',
        titleSmall: '포트폴리오',
        description2: (
          <Text>
            프로필을 등록하면 유플로우 프로젝트에 편리하게 {'\n'} 등록하면
            유사한 프로젝트를 진행할 {'\n'} 확률이 높아집니다.
          </Text>
        ),
      },
      {
        title: '두번 째 카테고리',
        description: (
          <Text>
            작업했던 프로젝트를 포트폴리오로{'\n'} 지원할 수 있습니다. 월 평균
            652건의 프로젝트가 {'\n'} 유플로우에 등록됩니다.
          </Text>
        ),
        textTarget: '두번 째 카테고리',
        titleSmall: '포트폴리오',
        description2: (
          <Text>
            프로필을 등록하면 유플로우 프로젝트에 편리하게 {'\n'} 등록하면
            유사한 프로젝트를 진행할 {'\n'} 확률이 높아집니다.
          </Text>
        ),
      },
    ];
    const {
      title,
      heightSection1,
      heightSection2,
      heightSection3,
      heightSection4,
    } = this.state;
    console.log('title', title);
    console.log('heightSection1', heightSection1);
    switch (title) {
      case '카테고리2':
        this.myRef.current?.scrollTo({
          y: 500 + 100,
          animated: true,
        });
        break;
      case '카테고리3':
        this.myRef.current?.scrollTo({
          y: 600 + 100,
          animated: true,
        });
        break;
      case '카테고리4':
        this.myRef.current?.scrollTo({
          y: 900 + 100,
          animated: true,
        });
        break;
      default:
        this.myRef.current?.scrollTo({
          y: 100,
          animated: true,
        });
    }

    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="마이페이지"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView onScroll={this.handleScroll} ref={this.myRef}>
          <AppGrid
            data={data}
            title={title}
            titleProps={e => this.setState({ title: e })}
          />
          {/* section 1 */}
          <View style={S.boxSection} onLayout={e=>this.setState({ heightSection1: e })}>
            <Text style={S.title}>두번 째 카테고리</Text>
            <Text style={S.description}>
              작업했던 프로젝트를 포트폴리오로{'\n'} 지원할 수 있습니다. 월 평균
              652건의 프로젝트가 {'\n'} 유플로우에 등록됩니다.
            </Text>
            <View style={S.boxTarget}>
              <Text style={S.textTarget}>두번 째 카테고리</Text>
              <Icon.Button
                size={20}
                color={'#ff6d00'}
                backgroundColor="transparent"
                style={S.iconArrowRight}
                // onPress={this.handleNavigationNext}
                name="arrow-right"
              />
            </View>
            <View style={[S.image, { marginBottom: 30 }]}>
              <ImageBackground
                source={ImgHTW}
                style={{ width: 320, height: 580 }}
              />
            </View>
            {this._renderItemList()}
            {this._renderItemList()}
          </View>
          {/* section 2 */}
          <View onLayout={this.getDimesionsHeightSection2}>
            <Carousel
              custom={{
                data: slides,
                renderItem: this._renderItemCarousel,
                onSlideChange: e => {
                  this.setState({ numberSlide: e });
                },
                dotStyle: {
                  backgroundColor: '#cccccc',
                  width: 8,
                  height: 8,
                  marginBottom: 180,
                },
                activeDotStyle: {
                  backgroundColor: 'black',
                  width: 8,
                  marginBottom: 180,
                  height: 8,
                },
              }}
            />
          </View>

          {/* section 3 */}
          <View style={[S.boxSection, { marginTop: 0, marginBottom: 30 }]} onLayout={this.getDimesionsHeightSection3}>
            <Text style={S.title}>두번 째 카테고리</Text>
            <Text style={S.description}>
              작업했던 프로젝트를 포트폴리오로{'\n'} 지원할 수 있습니다. 월 평균
              652건의 프로젝트가 {'\n'} 유플로우에 등록됩니다.
            </Text>
            <View style={S.boxTarget}>
              <Text style={S.textTarget}>두번 째 카테고리</Text>
              <Icon.Button
                size={20}
                color={'#ff6d00'}
                backgroundColor="transparent"
                style={S.iconArrowRight}
                // onPress={this.handleNavigationNext}
                name="arrow-right"
              />
            </View>
            <View style={[S.image, { marginBottom: 30 }]}>
              <ImageBackground
                source={ImgHTW}
                style={{ width: 320, height: 580 }}
              />
            </View>
            <View>
              <Text style={S.titleSmall}>포트폴리오</Text>
              <Text style={S.description}>
                프로필을 등록하면 유플로우 프로젝트에 편리하게 {'\n'} 등록하면
                유사한 프로젝트를 진행할 {'\n'} 확률이 높아집니다.
              </Text>
            </View>
            <View>
              <Text style={[S.titleSmall, { marginTop: 30 }]}>포트폴리오</Text>
              <Text style={S.description}>
                프로필을 등록하면 유플로우 프로젝트에 편리하게 {'\n'} 등록하면
                유사한 프로젝트를 진행할 {'\n'} 확률이 높아집니다.
              </Text>
            </View>
          </View>

          <View
          onLayout={this.getDimesionsHeightSection4}
            style={[
              S.boxSection,
              { marginTop: 0, marginBottom: 0, paddingBottom: 80 },
            ]}>
            {this._renderItemList()}
            {this._renderItemList()}
            {this._renderItemList()}
          </View>
          <View style={S.footer}>
            <Text style={S.footerText}>
              Copyright © 2020 Uflow Inc. 모든 권리 보유.{'\n'}v 1(20201112)
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
