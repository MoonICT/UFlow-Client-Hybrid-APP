/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Appbar,
  Searchbar,
  Text,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Postcode from 'react-native-daum-postcode';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Select from '@Components/organisms/Select';
import CertMobile from '@Components/organisms/CertMobile';
import Appbars from '@Components/organisms/AppBar';
import Loading from '@Components/atoms/Loading';
import { WarehouseProprietorInfo } from '@Services/apis/models/warehouse';
import { WarehouseOwner, Warehouse, MediaUpload } from '@Services/apis';
import configURL from '@Services/http/ConfigURL';
import ActionCreator from '@Actions';
import validation from '@Utils/validate';
const tabSelect = [
  {
    id: 'tab1',
    title: '기본 정보',
  },
  {
    id: 'tab2',
    title: '사업자 등록 정보',
  },
];

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
      // checkName: false,
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
      loading: false,
      businessList: [
        {
          label: '사업자정보 신규 등록',
          value: -1,
        },
      ],
      defautSelect: {
        label: '사업자정보 신규 등록',
        value: -1,
      },
      isPossible: false,
      singleFile: null,
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  componentDidMount() {
    const { businessList } = this.state;

    WarehouseOwner.statusWhrgByOwner()
      .then(res => {
        console.log('redddddddddddddddds :>> ', res);
        if (res.data.status === 'IMP_REG') {
          this.setState({
            isPossible: false,
          });
          alert('창고 수 제한으로 등록이 불가합니다.');
        } else if (
          res.data.status === 'NONE' ||
          res.data.status === 'PSB_REG'
        ) {
          this.setState({
            isPossible: true,
          });
        }
      })
      .catch(error => {
        // alert('statusWhrgByOwner:' + error.response.data.message);
      });

    WarehouseOwner.possibleEntrp()
      .then(res => {
        let resultData =
          res.data &&
          res.data._embedded &&
          res.data._embedded.entrpResBodies.length > 0
            ? res.data._embedded.entrpResBodies
            : [];
        let dataConvert = [];
        resultData.forEach(element => {
          dataConvert.push({
            ...element,
            label: element.name,
            value: element.id,
          });
        });
        this.setState({
          businessList: [...businessList, ...dataConvert],
        });
      })
      .catch(error => {
        // TODO 비 로그인 시 체크 필요.
        // alert('possibleEntrp:' + error);
      });
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: tabSelect[index].title });
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  /** 주소 검색 API*/
  getKakaoAddress = data => {
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
              longitude: res.data.documents[0].y,
            },
          },
        });
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  /**
   * Set business data
   * */
  setBusinessData = data => {
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
      businessMode: -1,
    };

    console.log('setData ', setData);
    this.setState({
      imageList: [
        {
          data_url: `${configURL.API_SERVER_ADDRESS}/${data.regFile}`,
        },
      ],
      businessInfo: setData,
    });
    // reset(setData)
  };

  /**
   * 사업자 selectbox 변경
   * */
  handleChangeSelectBox = (e, i) => {
    if (e !== -1) {
      this.setState({
        businessMode: i,
      });

      // this.setBusinessData(listBusinessInfo[i]);
    } else {
      this.setState({
        businessMode: -1,
      });
    }
  };

  chooseFile = type => {
    const { businessInfo } = this.state;

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('image response ::: ', response);
      let file = {
        fileCopyUri: response.uri,
        name: response.fileName,
        size: response.fileSize,
        type: response.type,
        uri: response.uri,
      };

      // 이미지를 선택 안한 경우.
      if (response && response.didCancel) {
        return false;
      }

      this.setState({ singleFile: file }, async () => {
        if (response != null) {
          // If file selected then create FormData
          let { singleFile } = this.state;
          const data = new FormData();
          data.append('name', singleFile.name);
          data.append('file', singleFile);

          // Progress
          this.props.setProgress({ is: true, type: 'CIRCLE' });
          // console.log('size', singleFile.size / Math.pow(1024, 2))
          // Please change file upload URL
          MediaUpload.uploadFile(data)
            .then(respon => {
              let { url } = respon.data;
              console.log('respon', respon);
              var pathArray = url.split('/');
              var host = pathArray[pathArray.length - 1];

              this.setState({
                photo: url,
                businessInfo: {
                  ...businessInfo,
                  regFile: host,
                },
              });

              // Progress
              setTimeout(() => {
                this.props.setProgress({ is: false });
              }, 300);
            })
            .catch(error => {
              alert(' MediaUpload.uploadFile:' + error.reponse.data.message);
              this.props.setProgress({ is: false });
            });
        } else {
          // If no file selected the show alert
          // alert('Please Select File first');
        }
      });
    });
  };

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
          MediaUpload.uploadFile(data)
            .then(respon => {
              if (respon.status === 200) {
                let { url } = respon.data;

                var pathArray = url.split('/');
                var host = pathArray[pathArray.length - 1];

                this.setState({
                  photo: url,
                  businessInfo: {
                    ...businessInfo,
                    regFile: host,
                  },
                });
              }
            })
            .catch(error => {
              alert(' MediaUpload.uploadFile:' + error);
            });
        } else {
          // If no file selected the show alert
          alert('등록된 파일이 없습니다. 파일을 등록해주세요.');
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
    const { businessInfo, isCert } = this.state;

    // let emailError = validation('name', businessInfo.name);
    if (businessInfo.name !== undefined && businessInfo.name !== '') {
      this.setState({ checkName: true });
    } else {
      this.setState({ checkName: false });
    }
    if (businessInfo.number !== undefined && businessInfo.number !== '') {
      this.setState({ checkBusiness: true });
    } else {
      this.setState({ checkBusiness: false });
    }
    if (
      businessInfo.roadAddr.address !== undefined &&
      businessInfo.roadAddr.address !== ''
    ) {
      this.setState({ checkAddress: true });
    } else {
      this.setState({ checkAddress: false });
    }
    if (
      businessInfo.checkRepreNm !== undefined &&
      businessInfo.checkRepreNm !== ''
    ) {
      this.setState({ checkRepreNm: true });
    } else {
      this.setState({ checkRepreNm: false });
    }

    if (
      businessInfo.checkRepreNm !== undefined &&
      businessInfo.checkRepreNm !== ''
    ) {
      this.setState({ checkRepreNm: true });
    } else {
      this.setState({ checkRepreNm: false });
    }

    if (
      businessInfo.checkInchgNm !== undefined &&
      businessInfo.checkInchgNm !== ''
    ) {
      this.setState({ checkInchgNm: true });
    } else {
      this.setState({ checkInchgNm: false });
    }
    if (
      businessInfo.checkEmail !== undefined &&
      businessInfo.checkEmail !== ''
    ) {
      this.setState({ checkEmail: true });
    } else {
      this.setState({ checkEmail: false });
    }

    if (!isCert) {
      alert('휴대폰 인증을 완료해주세요.');
      return false;
    }

    console.log('dataWE', businessInfo);
    this.setState({ loading: true });
    // 창고주 정보 등록
    WarehouseOwner.regBusinessInfo(businessInfo)
      .then(res => {
        alert('창고 사업자 등록이 완료되었습니다.');
        this.setState({ loading: false });
        this.navigation.navigate('RegisterWH', res.data);
      })
      .catch(error => {
        alert('서버에러:' + error.response.data.message);
        this.setState({ loading: false });
      });
  };

  /**
   * 기등록 사업자 선택 완료.
   * */
  onClickSelectBusinessComplete = () => {
    const { businessMode, businessList } = this.state;

    console.log(businessList[businessMode]);

    this.navigation.navigate('RegisterWH', businessList[businessMode]);

    // setBusinessDialog(false)
    // onComplete(businessList[businessMode])
  };

  render() {
    const {
      businessMode,
      businessInfo,
      photo,
      businessList,
      defautSelect,
      isPossible,
      loading,
      checkName,
      checkBusiness,
      checkAddress,
      checkRepreNm,
      checkInchgNm,
      checkEmail,
    } = this.state;
    // console.log('businessInfo :>> ', businessInfo);
    return (
      <SafeAreaView
        style={[DefaultStyle.container, { backgroundColor: 'white' }]}>
        <Appbars>
          {/* <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고주 정보 등록"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          /> */}
          <HistoryBackActionBar
            title={'창고주 정보 등록'}
            navigation={this.navigation}
          />
        </Appbars>

        <ScrollView style={[DefaultStyle._container]}>
          <View style={[DefaultStyle.p_16]}>
            <View style={[DefaultStyle._titleCardCol]}>
              <Text style={[DefaultStyle._textTitleCard]}>
                창고주 정보 등록
              </Text>
              <Text style={[DefaultStyle._textDesCard]}>
                창고 등록을 위해서 회사 정보를 입력해 주세요.
              </Text>
            </View>

            <View>
              <Select
                data={businessList}
                labelSelected="기등록 사업자 등록정보"
                color={'#000000'}
                dataDefault={defautSelect}
                labelSelectedSize={14}
                indexProps={(e, index) => {
                  this.handleChangeSelectBox(e, index);
                }}
              />
              {/* <Select
              data={calUnitDvCodes}
              labelSelected="정산단위"
              dataDefault={defaultcalUnit !== undefined ? defaultcalUnit : ''}
              selectedValue={formData.calUnitDvCode}
              valueProps={e => {
                // this.setState({ calUnitDvCode: e })
                let dataF = formData;
                dataF.calUnitDvCode = e;
                valueForm && valueForm(dataF);
              }}
          /> */}
              <View style={[DefaultStyle.line, DefaultStyle.mb_20]} />
              {businessMode > -1 ? (
                <View>
                  <TextField
                    labelTextField="사업자명"
                    value={businessList[businessMode].name}
                    colorLabel="#000000"
                    labelTextFieldSize={14}
                    fontSize={14}
                  />
                  <TextField
                    labelTextField="사업자번호"
                    value={businessList[businessMode].entrpNo}
                    colorLabel="#000000"
                    labelTextFieldSize={14}
                    fontSize={14}
                  />
                  <TextField
                    labelTextField="주소"
                    colorLabel="#000000"
                    labelTextFieldSize={14}
                    fontSize={14}
                    value={businessList[businessMode].address}
                  />
                </View>
              ) : (
                <View>
                  <TextField
                    labelTextField="사업자 명"
                    placeholder=""
                    labelTextFieldSize={14}
                    isRequired={true}
                    textError={
                      checkName === false ? '사업자명을 입력하세요.' : ''
                    }
                    fontSize={14}
                    valueProps={e => {
                      this.setState({
                        checkName: true,
                        businessInfo: {
                          ...businessInfo,
                          name: e,
                        },
                      });
                    }}
                    value={businessInfo.name ? businessInfo.name : ''}
                    colorLabel="#000000"
                  />
                  {/**
                  <TextField
                    labelTextField="법인 등록번호"
                    placeholder="'-'없이 입력해주세요."
                    labelTextFieldSize={14}
                    fontSize={14}
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          corpNumber: e,
                        },
                      });
                    }}
                    value={
                      businessInfo.corpNumber ? businessInfo.corpNumber : ''
                    }
                    colorLabel="#000000"
                  />
                */}
                  <TextField
                    labelTextField="사업자번호"
                    labelTextFieldSize={14}
                    fontSize={14}
                    placeholder="'-'없이 입력해주세요."
                    colorLabel="#000000"
                    isRequired={true}
                    keyboardType="numeric"
                    textError={
                      checkBusiness === false ? '사업자 번호를 입력하세요.' : ''
                    }
                    valueProps={e => {
                      this.setState({
                        checkBusiness: true,
                        businessInfo: {
                          ...businessInfo,
                          number: e.replace(/[^0-9]/g, '') ,
                        },
                      });
                    }}
                    value={businessInfo.number ? businessInfo.number : ''}
                  />

                  <Text style={DefaultStyle._textDF}>
                    - 등록 가능한 파일 형식은 'jpg', 'gif', 'png' 입니다.
                  </Text>
                  <Text style={[DefaultStyle._textDF, DefaultStyle.mb_20]}>
                    - 사진은 한 파일에 10MB 까지 등록이 가능합니다.
                  </Text>

                  {photo && (
                    <Image
                      source={{
                        uri: photo,
                        type: 'image/jpeg',
                        name: 'photo',
                      }}
                      style={{ width: 125, height: 125, marginBottom: 20 }}
                    />
                  )}
                  <TouchableOpacity
                    style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
                    onPress={() => this.chooseFile('photo')}>
                    <Text
                      style={[
                        DefaultStyle._textButton,
                        DefaultStyle._colorMuted,
                      ]}>
                      {'사업자등록증 업로드'}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[
                      DefaultStyle._listBtn,
                      DefaultStyle.d_flex,
                      DefaultStyle.mb_20,
                    ]}>
                    <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                      <TextField
                        placeholder="우편번호"
                        colorLabel="#000000"
                        labelTextField="주소 (필수)"
                        isRequired={true}
                        labelTextFieldSize={14}
                        fontSize={14}
                        styleProps={DefaultStyle.mb_0}
                        value={businessInfo.roadAddr.zipNo}
                      />
                    </View>
                    <TouchableOpacity
                      style={[
                        DefaultStyle._btnOutlineMuted,
                        DefaultStyle.w_50,
                        { marginTop: 8 },
                      ]}
                      onPress={this._showDialog}>
                      <Text
                        style={[
                          DefaultStyle._textButton,
                          DefaultStyle._colorMuted,
                        ]}>
                        {'우편번호 검색'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextField
                    placeholder="도로명 주소"
                    labelTextField="도로명 주소"
                    colorLabel="#000000"
                    labelTextFieldSize={14}
                    fontSize={14}
                    value={businessInfo.roadAddr.address}
                    isRequired={true}
                    textError={
                      checkAddress === false ? '주소를 입력하세요.' : ''
                    }
                  />
                  <TextField
                    placeholder="상세주소"
                    colorLabel="#000000"
                    labelTextField="상세주소"
                    labelTextFieldSize={14}
                    fontSize={14}
                    value={businessInfo.jibunAddr.detail}
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          jibunAddr: {
                            ...businessInfo.jibunAddr,
                            detail: e,
                          },
                          roadAddr: {
                            ...businessInfo.roadAddr,
                            detail: e,
                          },
                        },
                      });
                    }}
                  />
                  <TextField
                    labelTextField="대표자 명"
                    colorLabel="#000000"
                    labelTextFieldSize={14}
                    fontSize={14}
                    isRequired={true}
                    textError={
                      checkRepreNm === false ? '대표자 명을 입력하세요.' : ''
                    }
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          repreNm: e,
                        },
                      });
                    }}
                    value={businessInfo.repreNm ? businessInfo.repreNm : ''}
                  />
                  <TextField
                    labelTextField="담당자 휴대폰번호"
                    placeholder="'-'없이 입력해주세요."
                    labelTextFieldSize={14}
                    fontSize={14}
                    isRequired={true}
                    colorLabel="#000000"
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          phone: e,
                        },
                      });
                    }}
                    value={businessInfo.phone ? businessInfo.phone : ''}
                  />

                  {/* cert phone */}
                  <CertMobile
                    marginTopButton={6}
                    mobile={businessInfo.phone}
                    onComplete={() => {
                      this.setState({
                        isCert: true,
                      });
                    }}
                  />

                  <TextField
                    labelTextField="담당자 직함 (필수)"
                    labelTextFieldSize={14}
                    fontSize={14}
                    colorLabel="#000000"
                    isRequired={true}
                    textError={
                      checkInchgNm === false ? '담당자 명을 입력하세요.' : ''
                    }
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          inchgNm: e,
                        },
                      });
                    }}
                    value={businessInfo.inchgNm ? businessInfo.inchgNm : ''}
                  />
                  <TextField
                    labelTextField="담당자 이메일 (필수)"
                    labelTextFieldSize={14}
                    fontSize={14}
                    colorLabel="#000000"
                    isRequired={true}
                    textError={
                      checkEmail === false ? '담당자 이메일을 입력하세요.' : ''
                    }
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          email: e,
                        },
                      });
                    }}
                    value={businessInfo.email ? businessInfo.email : ''}
                  />
                  {/**
                  <TextField
                    labelTextField="세금계산서 이메일 (필수)"
                    colorLabel="#000000"
                    labelTextFieldSize={14}
                    fontSize={14}
                    valueProps={e => {
                      this.setState({
                        businessInfo: {
                          ...businessInfo,
                          taxBillEmail: e,
                        },
                      });
                    }}
                    value={
                      businessInfo.taxBillEmail ? businessInfo.taxBillEmail : ''
                    }
                  />
                  */}
                </View>
              )}
            </View>
          </View>
          <View
            style={[
              DefaultStyle._listBtn,
              DefaultStyle.p_16,
              DefaultStyle.mt_0,
            ]}>
            {isPossible ? (
              businessMode > -1 ? (
                <Button
                  mode="contained"
                  style={[
                    { width: '100%', borderRadius: 24, height: 40 },
                    DefaultStyle._primary,
                  ]}
                  color="red"
                  onPress={this.onClickSelectBusinessComplete}>
                  선택완료
                </Button>
              ) : (
                <Button
                  mode="contained"
                  style={[
                    { width: '100%', borderRadius: 24, height: 40 },
                    DefaultStyle._primary,
                  ]}
                  color="red"
                  onPress={this.handleOnSubmit}>
                  등록
                </Button>
              )
            ) : (
              <Button
                mode="contained"
                disabled={true}
                style={[
                  { width: '100%', borderRadius: 24, height: 40 },
                  DefaultStyle._oulineDisabled,
                ]}>
                등록불가
              </Button>
            )}
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
        <Loading loading={loading} />
      </SafeAreaView>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {};
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterBusinessInfo);
