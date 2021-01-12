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
  Portal
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Select from '@Components/organisms/Select';
import CertMobile from '@Components/organisms/CertMobile';
import { WarehouseProprietorInfo } from "@Services/apis/models/warehouse";
import { WarehouseOwner, Warehouse , MediaUpload} from '@Services/apis';
import configURL from '@Services/http/ConfigURL';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Postcode from 'react-native-daum-postcode';

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
    value: -1,
  },
];

class RegisterBusinessInfo extends Component {
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
      photo: null,
      businessList:[{
        label: '사업자정보 신규 등록',
        value: -1,
      }],
      isPossible: false,
      singleFile: null
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  componentDidMount() {
    const { businessList } = this.state;

    WarehouseOwner.statusWhrgByOwner().then(res => {
      if (res.data.status === 'IMP_REG') {
        this.setState({
          isPossible: false
        });

        alert('창고 수 제한으로 등록이 불가합니다.')
      } else if (res.data.status === 'NONE' || res.data.status === 'PSB_REG') {
        this.setState({
          isPossible: true
        });

      }
    }).catch(error => {
      alert('statusWhrgByOwner:' + error.response.data.message);
    });

    WarehouseOwner.possibleEntrp().then(res => {
      let resultData = res.data && res.data._embedded && res.data._embedded.entrpResBodies.length > 0 ? res.data._embedded.entrpResBodies : [];
      let dataConvert = [];
      resultData.forEach(element => {
        dataConvert.push({
          ...element,
          label: element.name,
          value: element.id
        })
      })

      console.log('dataConvert',dataConvert )

      this.setState({
        businessList: [
          ...businessList,
          ...dataConvert
        ]
      });
    }).catch(error => {
      alert('possibleEntrp:' + error);
    });
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  }

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  /** 주소 검색 API*/
  getKakaoAddress = (data) => {
    const { businessInfo } = this.state;

    console.log('dataAddress', data);

    Warehouse.searchAddressKakao({ query: data.address })
      .then(res => {
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
              latitude: res.data.documents[0].x,
              longitude: res.data.documents[0].y
            }
          }
        });
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

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
      businessMode: -1
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
    if(e !== -1){
      this.setState({
        businessMode: i
      });
  
      // this.setBusinessData(listBusinessInfo[i]);
    } else {
      this.setState({
        businessMode: -1
      });
    }
  }

  // upload image
  handlePicker = async () => {
    const { businessInfo } = this.state;

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ singleFile: res }, async () => {
        if (res != null) {
          // If file selected then create FormData
          let { singleFile } = this.state;
          const data = new FormData();
          data.append('name', singleFile.name);
          data.append('file', singleFile);
          // Please change file upload URL
          MediaUpload.uploadFile(data).then(respon => {
            if (respon.status === 200) {
              let { url } = respon.data;
            
              var pathArray = url.split( '/' );
              var host = pathArray[pathArray.length-1];

              this.setState({
                photo: url,
                businessInfo: {
                  ...businessInfo,
                  regFile: host
                }
              });
            }
          }).catch(error => {
            alert(' MediaUpload.uploadFile:' + error);
          });
        } else {
          // If no file selected the show alert
          alert('Please Select File first');
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  handleOnSubmit = () => {
    const { businessInfo,isCert } = this.state;
    if (!isCert) {
      alert('휴대폰 인증을 완료해주세요.')
      return false
    }

    console.log('dataWE', businessInfo)
    // 창고주 정보 등록
    WarehouseOwner.regBusinessInfo(businessInfo).then(res => {
      alert('창고 사업자 등록이 완료되었습니다.')
      this.navigation.navigate('RegisterWH', res.data);
    }).catch(error => {
      alert('서버에러:' + error.response.data.message);
    });
  };

  /**
   * 기등록 사업자 선택 완료.
   * */
  onClickSelectBusinessComplete = () => {
    const {businessMode,businessList } = this.state;

    console.log(businessList[businessMode]);

    this.navigation.navigate('RegisterWH', businessList[businessMode])

    // setBusinessDialog(false)
    // onComplete(businessList[businessMode])
  }


  render() {
    const { businessMode,businessInfo, photo,businessList } = this.state;

    return (
      <ScrollView style={[DefaultStyle._container]}>
        <View style={[DefaultStyle.p_16]}>
          <View style={[DefaultStyle._titleCardCol]}>
            <Text style={[DefaultStyle._textTitleCard]}>창고주 정보 등록</Text>
            <Text style={[DefaultStyle._textDesCard]}>창고 등록을 위해서 회사 정보를 입력해 주세요.</Text>
          </View>
          <View>
            <Select
              data={businessList}
              labelSelected="기등록 사업자 등록정보"
              indexProps={(e, index) => {
                this.handleChangeSelectBox(e, index)
              }}
            />
            <View style={[DefaultStyle.line, DefaultStyle.mb_20]}></View>
              {
                businessMode > -1 ?
                <View>
                  <TextField
                    labelTextField="사업자명"
                    value={businessList[businessMode].name}
                    colorLabel="#000000"
                  />
                  <TextField
                    labelTextField="사업자번호"
                    value={businessList[businessMode].entrpNo}
                    colorLabel="#000000"
                  />
                  <TextField 
                    labelTextField="주소"
                    colorLabel="#000000"
                    value={businessList[businessMode].address}
                  />
                </View>
                :
                <View>
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
                    placeholder="'-'없이 입력해주세요."
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
                    placeholder="'-'없이 입력해주세요."
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
                      source={{ uri: photo,
                        type: "image/jpeg",
                        name: 'photo'  }}
                      style={{ width: 125, height: 125,marginBottom:20}}

                    />
                  )}
                  <TouchableOpacity
                    style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
                    onPress={this.handlePicker}>
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
                      <TextField
                        placeholder="우편번호"
                        colorLabel="#000000"
                        styleProps={DefaultStyle.mb_0}
                        value={businessInfo.roadAddr.zipNo}/>
                    </View>
                    <TouchableOpacity
                      style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
                      onPress={this._showDialog}>
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

                  {/* cert phone */}
                  <CertMobile
                    mobile={businessInfo.phone}
                    onComplete={() => {
                      this.setState({
                        isCert: true
                      })
                    }}
                  />

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
              }
            </View>
        </View>
        <View style={[DefaultStyle._listBtn, DefaultStyle.p_16, DefaultStyle.mt_0]}>
          {
            businessMode > -1 ?
            <Button
              mode="contained"
              style={[{ width: '100%', borderRadius: 24, height: 40}, DefaultStyle._primary,]}
              color="red"
              onPress={this.onClickSelectBusinessComplete}>
              선택완료
            </Button>
            :
            <Button
              mode="contained"
              style={[{ width: '100%', borderRadius: 24, height: 40}, DefaultStyle._primary,]}
              color="red"
              onPress={this.handleOnSubmit}>
              등록
            </Button>
          }
        </View>

        <Portal>
          <Dialog
            style={DefaultStyle._postCode}
            visible={this.state.visible}
            onDismiss={this._hideDialog}>
            <Dialog.Content style={DefaultStyle._postCodeContent}>
              <Postcode
                style={DefaultStyle._postCodeContent}
                jsOptions={{ animated: true }}
                onSelected={data => {
                  this.getKakaoAddress(data);
                  this._hideDialog();
                }}
              />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </ScrollView>
    );
  }
}

export default RegisterBusinessInfo;
