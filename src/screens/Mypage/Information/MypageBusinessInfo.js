/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Image } from 'react-native';
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
import { WarehouseProprietorInfo } from "@Services/apis/models/warehouse";
import { Entrp } from '@Services/apis';
import configURL from '@Services/http/ConfigURL';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {daumAddress} from "@Services/utils/daumAddress";

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
    label: '냉동 1',
    value: '0001',
  },
  {
    label: '냉장 2',
    value: '0002',
  },
  {
    label: '상온 3',
    value: '0003',
  },
  {
    label: '위험물 4',
    value: '0004',
  },
  {
    label: '기타 5',
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
      listBusinessInfo: [],
      imageList: [],
      businessInfo: WarehouseProprietorInfo,
      selectedInfoIndex: 0,
      isCert: false,
      photo: null
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  componentDidMount() {
    Entrp.list().then(res => {
      let resultData = res.data && res.data._embedded && res.data._embedded.businessInfoes ? res.data._embedded.businessInfoes : [];
      let dataConvert = [];
      resultData.forEach(element => {
        dataConvert.push({
          ...element,
          label: element.name,
          value: element.id
        })
      })

      console.log('dataConvert', dataConvert);

      this.setState({
        listBusinessInfo: dataConvert
      });

      this.setBusinessData(dataConvert[0])
    })
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  handleChoosePhoto = () => {
    const options={
      title:'select a photo',
      takePhotoButtonTitle:'Take a Photo',
      chooseFrmoLibraryButtonTitle:'Choose from Gallery',
      quality:1
  };
    launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  /**
     * Set business data
     * */
  setBusinessData = (data) => {
    let setData = {
      id: data.id,
      name: data.name,
      repreNm: data.repreNm,
      inchgNm: data.inchgNm,
      position: data.position,
      corpNumber: data.corpNumber,
      number: data.number,
      email: data.email,
      taxBillEmail: data.taxBillEmail,
      regFile: data.regFile,
      phone: data.phone.no1 + data.phone.no2 + data.phone.no3,
      jibunAddr: data.jibunAddr,
      roadAddr: data.roadAddr,
      gps: data.gps,
    }

    console.log('setData ', setData)
    this.setState({
      imageList: [{
        data_url: `${configURL.API_SERVER_ADDRESS}/${data.regFile}`,
      }],
      businessInfo: setData
    });
    // reset(setData)
  };

  /**
   * 사업자 selectbox 변경
   * */
  handleChangeSelectBox = (e, i) => {
    const { listBusinessInfo } = this.state;

    console.log(i)
    this.setState({
      selectedInfoIndex:i,
      isCert: false,
      imageList: []
    });

    this.setBusinessData(listBusinessInfo[i]);
  }

  handleOnSubmit = () => {
    const { businessInfo } = this.state;

    console.log('businessInfo123',businessInfo);

    Entrp.update(businessInfo).then(res => {
      console.log('::::: API Add Business Info  :::::', res)
      // setIsComplete(true)
    }).catch(err => {
      if (err.response && err.response.status >= 500) {
        alert('서버에러:' + err.response.message)
      }
    });
  };

  getKakaoAddress = () => {
    daumAddress((data) => {

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(data.roadAddress, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

          // set 주소
          this.setState({
            businessInfo: {
              ...businessInfo,
              jibunAddr: {
                ...businessInfo.jibunAddr,
                zipNo: data.zonecode,
                address: data.jibunAddress,
              },
              roadAddr: {
                ...businessInfo.roadAddr,
                zipNo: data.zonecode,
                address: data.roadAddress,
              },
              gps: {
                latitude: result[0].y,
                longitude: result[0].x
              },
            }
          })
        }
      });
    })
  }


  render() {
    const { listBusinessInfo, selectedInfoIndex,businessInfo, photo } = this.state;

    return (
      <>
        <View style={[DefaultStyle._cards]}>
          <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
            <Text style={DefaultStyle._textTitleBody}>사업자 등록 정보</Text>
          </View>
          <View style>
            <Select
              data={listBusinessInfo}
              labelSelected="기등록 사업자 등록정보"
              indexProps={(e, index) => {
                this.handleChangeSelectBox(e, index)
              }}
            />
            <View style={[DefaultStyle.line, DefaultStyle.mb_20]}></View>
            <TextField
              labelTextField="사업자 명"
              placeholder=""
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    name: e
                  }
                })
              }}
              value={businessInfo.name ? businessInfo.name : ''}
              colorLabel="#000000"
            />
            <TextField
              labelTextField="법인 등록번호"
              placeholder=""
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    corpNumber: e
                  }
                })
              }}
              value={businessInfo.corpNumber ? businessInfo.corpNumber : ''}
              colorLabel="#000000"
            />
            <TextField 
              labelTextField="사업자번호"
              colorLabel="#000000"
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    number: e
                  }
                })
              }}
              value={businessInfo.number ? businessInfo.number : ''}
             />

            <Text style={DefaultStyle._textDF}>- 등록 가능한 파일 형식은 'jpg', 'gif', 'png' 입니다.</Text>
            <Text style={[DefaultStyle._textDF, DefaultStyle.mb_20]}>- 사진은 한 파일에 10MB 까지 등록이 가능합니다.</Text>

            {photo && (
            <Image
                source={{ uri: photo.uri,
                  type: "image/jpeg",
                  name: photo.filename  }}
                style={{ width: 125, height: 125,marginBottom:20}}

              />
            )}
            <TouchableOpacity
              style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
              onPress={this.handleChoosePhoto}>
              <Text
                style={[
                  DefaultStyle._textButton,
                  DefaultStyle._colorMuted
                ]}>
                {'사업자등록증 업로드'}
              </Text>
            </TouchableOpacity>
            <View style={[DefaultStyle._listBtn, DefaultStyle.d_flex, DefaultStyle.mb_20]}>
              <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                <TextField colorLabel="#000000" styleProps={DefaultStyle.mb_0} value={businessInfo.roadAddr.zipNo}/>
              </View>
              <TouchableOpacity
                style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
                onPress={this.getKakaoAddress}>
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
              value={businessInfo.roadAddr.address}
            />
            <TextField
              placeholder="상세주소"
              colorLabel="#000000"
              value={businessInfo.jibunAddr.detail}
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    jibunAddr: {
                      ...businessInfo.jibunAddr,
                      detail: e
                    },
                    roadAddr: {
                      ...businessInfo.roadAddr,
                      detail: e
                    },
                  }
                })
              }}
            />
            <TextField
              labelTextField="대표자 명"
              colorLabel="#000000"
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    repreNm: e
                  }
                })
              }}
              value={businessInfo.repreNm ? businessInfo.repreNm : ''}
            />
            <TextField
              labelTextField="담당자 휴대폰번호"
              placeholder="'-'없이 입력해주세요."
              colorLabel="#000000"
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    phone: e
                  }
                })
              }}
              value={businessInfo.phone ? businessInfo.phone : ''}
            />
            <View style={[DefaultStyle._listBtn, DefaultStyle.d_flex]}>
              <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                <TextField colorLabel="#000000" placeholder="인증번호를 입력하세요." />
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
              labelTextField="담당자명"
              colorLabel="#000000"
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    inchgNm: e
                  }
                })
              }}
              value={businessInfo.inchgNm ? businessInfo.inchgNm : ''}
            />
            <TextField
              labelTextField="담당자 이메일"
              colorLabel="#000000"
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    email: e
                  }
                })
              }}
              value={businessInfo.email ? businessInfo.email : ''}
            />
            <TextField
              labelTextField="세금계산서 이메일"
              colorLabel="#000000"
              valueProps={(e) => {
                this.setState({
                  businessInfo:{
                    ...businessInfo,
                    taxBillEmail: e
                  }
                })
              }}
              value={businessInfo.taxBillEmail ? businessInfo.taxBillEmail : ''}
            />
          </View>
        </View>
        <View style={S.btn}>
          <Button
            mode="contained"
            style={[{ width: '95%', margin: 12, borderRadius: 24, height: 40, marginBottom: 24 }, DefaultStyle._primary,]}
            color="red"
            onPress={this.handleOnSubmit}>
            확인
          </Button>
        </View>
      </>
    );
  }
}

export default MypageBusinessInfo;
