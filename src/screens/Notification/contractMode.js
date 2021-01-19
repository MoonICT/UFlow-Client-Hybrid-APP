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
  Dimensions,
  ImageBackground,
} from 'react-native';

// Local Imports
import DefaultStyle from '../../styles/default';
import AppGrid from '@Components/organisms/AppGrid';
import ImgHTW from '@Assets/images/how-to-use.png';
import ImgHTW3 from '@Assets/images/how-to-use3.png';
import ImgHTW4 from '@Assets/images/how-to-use4.png';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import Diagram from '@Assets/images/diagram-1.png';
import Diagram2 from '@Assets/images/diagram-2.png';
import Diagram3 from '@Assets/images/diagram-3.png';
import iconService3 from '@Assets/images/ic-service3.png';
import iconService4 from '@Assets/images/ic-service4.png';
import iconServiceUse from '@Assets/images/ic-service_use.png';
import iconServiceUse1 from '@Assets/images/ic-service1_use.png';
import Footer from '@Components/organisms/Footer';
import iconService5 from '@Assets/images/ic-service5.png';
import Appbars from '@Components/organisms/AppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as S } from './style';
import Carousel from '@Components/organisms/Carousel';
import { Appbar, Title } from 'react-native-paper';
const data = [
  {
    title: '책임형',
  },
  {
    title: '오픈형',
  },
];

//Data Footer
// const _data = [
//   {
//     titleList: '창고 등록',
//     listItem: [
//       { titleItem: '공급사 등록' },
//       { titleItem: '수요사 등록' },
//       { titleItem: '회원 조회' },
//       { titleItem: '기본 조회' },
//     ],
//   },
//   {
//     titleList: '창고 찾기',
//   },
//   {
//     titleList: '이용 방법',
//   },
//   {
//     titleList: '고객센터',
//   },
//   {
//     titleList: '패밀리사이트',
//   },
// ];
const windowHeight = Dimensions.get('window').height;
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '책임형',
    };
  }

  render() {
    const { title } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: 'white',minHeight:windowHeight }}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.props.nav.goBack()}
          />
          <Appbar.Content
            title="이용방법"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}
        
        <HistoryBackActionBar
            title={'이용방법'}
            navigation={this.navigation}
          />
        <View style={S.tabTopbar}>
          <View style={S.boxSelect}>{this.props.navitationTitle}</View>
          <AppGrid
            type="controlTitleActive"
            titleActive={title}
            data={data}
            titleCenter={true}
            titleProps={e => this.setState({ title: e })}
          />
        </View>
        <ScrollView>
          {title === '책임형' ? (
            <View>
              <View
                style={{
                  flex: 1,
                  marginTop: 160,
                  marginBottom: 60,
                  alignItems: 'center',
                }}>
                <Text style={S.title}>
                  계약 결정까지 유플로우가{'\n'}
                  쌍방간의 계약을 {'\n'}
                  책임지고 관리합니다.
                </Text>

                <ImageBackground
                  source={Diagram}
                  style={{ width: 312, height: 106, marginTop: 20 }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                  marginBottom: 60,
                  alignItems: 'center',
                }}>
                <Text style={S.title}>
                  계약 확정 후 입출고 작업에 따른{'\n'} 문의는 3자간 채{'\n'}
                  팅을 통해 진행할 수 있습니다.
                </Text>

                <ImageBackground
                  source={Diagram2}
                  style={{ width: 312, height: 106, marginTop: 50 }}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 160,
                marginBottom: 60,
                alignItems: 'center',
              }}>
              <Text style={S.title}>
                유플로우에 등록된 창고주와{'\n'}
                자유롭게 소통하세요.
              </Text>

              <ImageBackground
                source={Diagram3}
                style={{ width: 312, height: 106, marginTop: 20 }}
              />
              <Text style={[S.description, { marginTop: 25 }]}>
                창고주에게 직접 연락하여 {'\n'}
                임대 혹은 수탁 계약을 진행할 수 있습니다.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
