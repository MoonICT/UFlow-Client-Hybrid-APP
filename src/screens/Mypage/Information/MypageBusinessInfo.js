/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView,TouchableOpacity } from 'react-native';
import {
  Checkbox,
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Select from '@Components/organisms/Select';
import { styles as S } from '../style';

import { getUserInfo } from '@Services/apis/MyPage';

const tabSelect = [
  {
    id: 'tab1',
    title: '기본 정보'
  },
  {
    id: 'tab2',
    title: '사업자 등록 정보'
  },
]

const dataSelect = [
  {
    label: '냉동',
    value: '0001',
  },
  {
    label: '냉장',
    value: '0002',
  },
  {
    label: '상온',
    value: '0003',
  },
  {
    label: '위험물',
    value: '0004',
  },
  {
    label: '기타',
    value: '9100',
  },
];

class MypageBusinessInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkAll: false,
      checkSMS: false,
      checkMail: false,
      firstQuery: '',
      visible: false,
      tabInfo: '',
      userInfo: {},
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    this.getInfoUser();
    SplashScreen.hide();
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  async getInfoUser() {
    await getUserInfo().then((res) => {
      console.log('res', res.data)
      if (res.status === 200) {
        this.setState({ userInfo: res.data })
      }
    })
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {

    const { checkAll, checkSMS, checkMail, tabInfo, userInfo } = this.state;

    return (
      <>
        <View style={[DefaultStyle._cards]}>
          <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
            <Text style={DefaultStyle._textTitleBody}>사업자 등록 정보</Text>
          </View>
          <View style>
            <Select
              data={dataSelect}
              labelSelected="기등록 사업자 등록정보"
              selectedValue={''}
            />
            <View style={[DefaultStyle.line, DefaultStyle.mb_20]}></View>
            <TextField
              labelTextField="사업자 명"
              placeholder=""
              colorLabel="#000000"
            />
            <TextField
              labelTextField="법인 등록번호"
              placeholder=""
              colorLabel="#000000"
            />
            <TextField labelTextField="사업자번호" colorLabel="#000000" />

            <Text style={DefaultStyle._textDF}>- 등록 가능한 파일 형식은 'jpg', 'gif', 'png' 입니다.</Text>
            <Text style={[DefaultStyle._textDF, DefaultStyle.mb_20]}>- 사진은 한 파일에 10MB 까지 등록이 가능합니다.</Text>

            <TouchableOpacity
              style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
              onPress={() => console.log(titleButton)}>
              <Text
                style={[
                  DefaultStyle._textButton,
                  DefaultStyle._colorMuted
                ]}>
                {'사업자등록증 업로드'}
              </Text>
            </TouchableOpacity>
            <View  style={[DefaultStyle._listBtn,DefaultStyle.d_flex, DefaultStyle.mb_20]}>
              <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                <TextField colorLabel="#000000" styleProps={DefaultStyle.mb_0}/>
              </View>
              <TouchableOpacity
                style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
                onPress={() => console.log(titleButton)}>
                <Text
                  style={[
                    DefaultStyle._textButton,
                    DefaultStyle._colorMuted
                  ]}>
                  {'우편번호 검색'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextField
              placeholder="도로명 주소"
              colorLabel="#000000"
            />
            <TextField
              placeholder="상세주소"
              colorLabel="#000000"
            />
            <TextField
              labelTextField="대표자 명"
              colorLabel="#000000"
            />
            <TextField
              labelTextField="담당자 휴대폰번호"
              placeholder="'-'없이 입력해주세요."
              colorLabel="#000000"
            />
            <View  style={[DefaultStyle._listBtn,DefaultStyle.d_flex]}>
              <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                <TextField colorLabel="#000000" placeholder="인증번호를 입력하세요."/>
              </View>
              <TouchableOpacity
                style={[DefaultStyle._btnOutlineMuted, DefaultStyle.mb_20, DefaultStyle.w_50]}
                onPress={() => console.log(titleButton)}>
                <Text
                  style={[
                    DefaultStyle._textButton,
                    DefaultStyle._colorMuted
                  ]}>
                  {'인증번호 발송'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextField
              labelTextField="담당자 명"
              colorLabel="#000000"
            />
            <TextField
              labelTextField="담당자 이메일"
              colorLabel="#000000"
            />
            <TextField
              labelTextField="세금계산서 이메일"
              colorLabel="#000000"
            />
          </View>
          </View>
        <View style={S.btn}>
          <Button
            mode="contained"
            style={[{ width: '95%', margin: 12, borderRadius: 24, height: 40, marginBottom: 24 }, DefaultStyle._primary,]}
            color="red"
            onPress={() => {
              this.navigation.navigate('Home');
            }}>
            확인
          </Button>
        </View>
      </>
    );
  }
}

export default MypageBusinessInfo;
