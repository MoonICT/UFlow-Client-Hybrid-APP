/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
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
    title: '카테고리',
  },
  {
    title: '카테고리',
  },
  {
    title: '카테고리',
  },
];
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }
  _renderItem = ({ item }) => {
    return (
      <View style={S.boxSection}>
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
            style={{ width: 400, height: 700 }}
          />
        </View>
        <Text style={S.titleSmall}>{item.titleSmall}</Text>
        <Text style={S.description}>{item.description2}</Text>
      </View>
    );
  };
  render() {
    let slides = [
      {
        title: '두번 째 카테고리',
        description: (
          <Text style={S.description}>
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
        <ScrollView>
          <AppGrid
            data={data}
            title={'title'}
            titleProps={e => this.setState({ title: e })}
          />
          {/* section 1 */}
          <View style={S.boxSection}>
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
            <View style={S.image}>
              <ImageBackground
                source={ImgHTW}
                style={{ width: 400, height: 700 }}
              />
            </View>
          </View>
          {/* section 2 */}
          <Carousel
            custom={{
              data: slides,
              renderItem: this._renderItem,
              onSlideChange: e => {
                this.setState({ numberSlide: e });
              },
              dotStyle: {
                backgroundColor: '#cccccc',
                width: 8,
                height: 8,
                marginBottom: 100,
              },
              activeDotStyle: {
                backgroundColor: 'black',
                width: 8,
                height: 8,
                marginBottom: 100,
              },
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
