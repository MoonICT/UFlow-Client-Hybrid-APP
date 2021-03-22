/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  Appbar
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Select from '@Components/organisms/Select';
import CertMobile from '@Components/organisms/CertMobile';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import Appbars from '@Components/organisms/AppBar';
import { WarehouseProprietorInfo } from "@Services/apis/models/warehouse";
import { WarehouseTenant, Warehouse, MediaUpload } from '@Services/apis';
import configURL from '@Services/http/ConfigURL';
import Loading from '@Components/atoms/Loading';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Postcode from 'react-native-daum-postcode';
import validator from 'validator';
import ActionCreator from '@Actions';
import { isBizNum } from "@Services/utils/validate";
import { connect } from "react-redux";

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class DetailRegisterTenant extends Component {
  constructor (props) {
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
      loading: false,
      businessList: [{
        label: getMsg(this.props.lang, 'ML0192', '사업자정보 신규 등록'),
        value: -1,
      }],
      isPossible: false,
      singleFile: null,
      // Validation(TODO Temp)
      valid: {
        checkName: true,
        checkBusiness: true,
        checkBusinessFormat: true,
        checkAddress: true,
        checkRepreNm: true,
        checkPhone: true,
        checkPhoneFormat: true,
        checkInchgNm: true,
        checkEmail: true,
        checkEmailFormat: true,
      }
    };
    this.navigation = props.navigation;
    this.tabSelect = [
      {
        id: 'tab1',
        title: getMsg(this.props.lang, 'ML0190', '기본 정보')
      },
      {
        id: 'tab2',
        title: getMsg(this.props.lang, 'ML0191', '사업자 등록 정보')
      },
    ]
  }

  handleClickTab = (tabName, index) => {
    this.setState({ tabInfo: this.tabSelect[index].title });
  }

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  /** 주소 검색 API*/
  getKakaoAddress = (data) => {
    const { businessInfo } = this.state;

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

    this.setState({
      imageList: [{
        data_url: `${configURL.API_SERVER_ADDRESS}/${data.regFile}`,
      }],
      businessInfo: setData
    });
    // reset(setData)
  };

  chooseFile = (type) => {
    const { businessInfo } = this.state;

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => {
      let file = {
        fileCopyUri: response.uri,
        name: response.fileName,
        size: response.fileSize,
        type: response.type,
        uri: response.uri
      }

      this.setState({ singleFile: file }, async () => {
        if (response != null) {
          // If file selected then create FormData
          let { singleFile } = this.state;
          const data = new FormData();
          data.append('name', singleFile.name);
          data.append('file', singleFile);
          // Please change file upload URL

          // 이미지를 선택 안한 경우.
          if (response && response.didCancel) {
            return false;
          }

          // Progress
          this.props.setProgress({ is: true, type: 'CIRCLE' });
          MediaUpload.uploadFile(data).then(respon => {
            if (respon.status === 200) {
              let { filename, url } = respon.data;
              // var pathArray = url.split('/');
              // var host = pathArray[pathArray.length - 1];

              this.setState({
                photo: url,
                businessInfo: {
                  ...businessInfo,
                  regFile: filename
                }
              });
              // Progress
              this.props.setProgress({ is: false, });
            }
          }).catch(error => {
            // alert('DetailRegisterTenant MediaUpload error:' + error);
            this.props.setProgress({ is: false, });
          });
        } else {
          // If no file selected the show alert
          alert('Please Select File first');
        }
      });
    });
  };

  handleOnSubmit = () => {
    const { businessInfo, isCert } = this.state;
    const { route } = this.props;
    const { typeInfo, typeWH, warehouseRegNo, warehSeq, rentUserNo, status, type } = route.params;

    let valid = {
      checkName: !!businessInfo.name,
      checkBusiness: !!businessInfo.number,
      checkBusinessFormat: isBizNum(businessInfo.number),
      checkAddress: !!businessInfo.roadAddr.address,
      checkRepreNm: !!businessInfo.repreNm,
      checkInchgNm: !!businessInfo.inchgNm,
      checkPhone: !!businessInfo.phone,
      checkPhoneFormat: businessInfo.phone ? /^\d{2,3}\d{3,4}\d{4}$/.test(businessInfo.phone) : true,
      checkEmail: !!businessInfo.email,
      checkEmailFormat: businessInfo.email ? validator.isEmail(businessInfo.email) : true,
    }
    this.setState({ valid: valid });
    for (let key in valid) {
      if (!valid[key]) {
        return false;
      }
    }

    if (!isCert) {
      alert(getMsg(this.props.lang, 'ML0193', '휴대폰 인증을 완료해주세요.'));
      return false;
    }

    // if (!businessInfo.regFile) {
    // alert(getMsg(this.props.lang, 'ML0197', '사업자등록증을 업로드 하세요.'));
    //   return false;
    // }
    // console.log('dataWE', businessInfo);
    this.setState({ loading: true });
    // 창고주 정보 등록
    WarehouseTenant.regBusinessInfoByTenant(businessInfo).then(res => {
      alert(getMsg(this.props.lang, 'ML0194', '임차인 정보 등록이 완료되었습니다.'));
      this.setState({ loading: false });
      this.navigation.goBack()
      // this.navigation.navigate('RequestQuotation', {
      //   data: {
      //     whrgMgmtTrust: typeWH === 'TRUST' ? typeInfo : null,
      //     whrgMgmtKeep: typeWH === 'KEEP' ? typeInfo : null,
      //   },
      //   typeWH: typeWH,
      //   warehouseRegNo: warehouseRegNo,
      //   warehSeq: warehSeq,
      //   rentUserNo: rentUserNo,
      //   status: status,
      //   type: type,
      // });
    }).catch(error => {
      alert(getMsg(this.props.lang, 'ML0449', '서버에러:') + error.response.data.message);
      this.setState({ loading: false });
    });
  };

  /**
   * 기등록 사업자 선택 완료.
   * */
  onClickSelectBusinessComplete = () => {
    const { businessMode, businessList } = this.state;

    console.log(businessList[businessMode]);

    this.navigation.navigate('RegisterWH', businessList[businessMode])

    // setBusinessDialog(false)
    // onComplete(businessList[businessMode])
  }


  render () {
    const { businessMode, businessInfo, photo, loading, valid } = this.state;

    return (
      <SafeAreaView style={DefaultStyle.container}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="임차인 정보 등록"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}

        <HistoryBackActionBar
          title={getMsg(this.props.lang, 'ML0195', '임차인 정보 등록')}
          navigation={this.navigation}
        />
        <ScrollView style={[DefaultStyle._container]}>
          <View style={[DefaultStyle.p_16]}>
            <View style={[DefaultStyle._titleCardCol]}>
              <Text style={[DefaultStyle._textTitleCard]}>{getMsg(this.props.lang, 'ML0195', '임차인 정보 등록')}</Text>
              <Text style={[DefaultStyle._textDesCard]}>
                {getMsg(this.props.lang, 'ML0196', '견적 요청을 위해서 회사 정보를 입력해 주세요.')}
              </Text>
            </View>
            <View>
              <View>
                <TextField
                  labelTextField={getMsg(this.props.lang, 'ML0198', '사업자 명')}
                  placeholder=""
                  labelTextFieldSize={14}
                  maxLength={50}
                  isRequired={true}
                  textError={
                    !valid.checkName ? getMsg(this.props.lang, 'ML0199', '사업자명을 입력하세요.') : ''
                  }
                  fontSize={14}
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkName: true,
                      },
                      businessInfo: {
                        ...businessInfo,
                        name: e,
                      },
                    });
                  }}
                  value={businessInfo.name ? businessInfo.name : ''}
                  colorLabel="#000000"
                />
                {/*<TextField*/}
                {/*labelTextField="법인 등록번호"*/}
                {/*placeholder="'-'없이 입력해주세요."*/}
                {/*valueProps={(e) => {*/}
                {/*this.setState({*/}
                {/*businessInfo: {*/}
                {/*...businessInfo,*/}
                {/*corpNumber: e*/}
                {/*}*/}
                {/*})*/}
                {/*}}*/}
                {/*value={businessInfo.corpNumber ? businessInfo.corpNumber : ''}*/}
                {/*colorLabel="#000000"*/}
                {/*/>*/}
                <TextField
                  labelTextField={getMsg(this.props.lang, 'ML0200', '사업자 번호')}
                  labelTextFieldSize={14}
                  fontSize={14}
                  placeholder={getMsg(this.props.lang, 'ML0201', "'-' 없이 입력해주세요.")}
                  colorLabel="#000000"
                  isRequired={true}
                  keyboardType="numeric"
                  textError={
                    (!valid.checkBusiness ? getMsg(this.props.lang, 'ML0202', '사업자 번호를 입력하세요.') : '') +
                    (!valid.checkBusinessFormat ? getMsg(this.props.lang, 'ML0203', '사업자 번호 형식이 아닙니다.') : '')
                  }
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkBusiness: true,
                        checkBusinessFormat: true,
                      },
                      businessInfo: {
                        ...businessInfo,
                        number: e.replace(/[^0-9]/g, ''),
                      },
                    });
                  }}
                  value={businessInfo.number ? businessInfo.number : ''}
                  maxLength={15}
                />

                {/* <Text style={DefaultStyle._textDF}>- 등록 가능한 파일 형식은 'jpg', 'gif', 'png' 입니다.</Text>
                <Text style={[DefaultStyle._textDF, DefaultStyle.mb_20]}>- 사진은 한 파일에 10MB 까지 등록이 가능합니다.</Text>

                {photo && (
                  <Image
                    source={{
                      uri: photo,
                      type: "image/jpeg",
                      name: 'photo'
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
                      DefaultStyle._colorMuted
                    ]}>
                    {'사업자등록증 업로드'}
                  </Text>
                </TouchableOpacity> */}
                <View style={[DefaultStyle._listBtn, DefaultStyle.d_flex, DefaultStyle.mb_20]}>
                  <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                    <TextField
                      placeholder={getMsg(this.props.lang, 'ML0204', '우편번호')}
                      colorLabel="#000000"
                      labelTextField={`${getMsg(this.props.lang, 'ML0204', '우편번호')} (${getMsg(this.props.lang, 'ML0019', '필수')})`}
                      isRequired={true}
                      labelTextFieldSize={14}
                      fontSize={14}
                      styleProps={DefaultStyle.mb_0}
                      value={businessInfo.roadAddr.zipNo}
                    />
                  </View>
                  <TouchableOpacity
                    style={[DefaultStyle._btnOutlineMuted, DefaultStyle.w_50]}
                    onPress={this._showDialog}>
                    <Text
                      style={[
                        DefaultStyle._textButton,
                        DefaultStyle._colorMuted
                      ]}>
                      {getMsg(this.props.lang, 'ML0205', '우편번호 검색')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextField
                  placeholder={getMsg(this.props.lang, 'ML0206', '도로명 주소')}
                  labelTextField={getMsg(this.props.lang, 'ML0206', '도로명 주소')}
                  colorLabel="#000000"
                  labelTextFieldSize={14}
                  fontSize={14}
                  value={businessInfo.roadAddr.address}
                  isRequired={true}
                  textError={
                    !valid.checkAddress ? getMsg(this.props.lang, 'ML0207', '주소를 입력하세요.') : ''
                  }
                />
                <TextField
                  placeholder={getMsg(this.props.lang, 'ML0208', '상세주소')}
                  colorLabel="#000000"
                  labelTextField={getMsg(this.props.lang, 'ML0208', '상세주소')}
                  labelTextFieldSize={14}
                  fontSize={14}
                  maxLength={50}
                  value={businessInfo.jibunAddr.detail}
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkAddress: true,
                      },
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
                  labelTextField={getMsg(this.props.lang, 'ML0209', '대표자 명')}
                  colorLabel="#000000"
                  labelTextFieldSize={14}
                  fontSize={14}
                  maxLength={50}
                  isRequired={true}
                  textError={
                    !valid.checkRepreNm ? getMsg(this.props.lang, 'ML0210', '대표자 명을 입력하세요.') : ''
                  }
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkRepreNm: true,
                      },
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
                  placeholder={getMsg(this.props.lang, 'ML0201', "'-' 없이 입력해주세요.")}
                  labelTextFieldSize={14}
                  fontSize={14}
                  isRequired={true}
                  colorLabel="#000000"
                  textError={(
                    (!valid.checkPhone ? getMsg(this.props.lang, 'ML0212', "휴대폰번호를 입력하세요. ") : '') +
                    (!valid.checkPhoneFormat ? getMsg(this.props.lang, 'ML0213', "전화번호 형식이 아닙니다. ") : '')
                  )}
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkPhone: true,
                        checkPhoneFormat: true,
                      },
                      businessInfo: {
                        ...businessInfo,
                        phone: e,
                      },
                    });
                  }}
                  value={businessInfo.phone ? businessInfo.phone : ''}
                  maxLength={11}
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
                  labelTextField={`${getMsg(this.props.lang, 'ML0214', '담당자 명')} (${getMsg(this.props.lang, 'ML0019', '필수')})`}
                  labelTextFieldSize={14}
                  fontSize={14}
                  colorLabel="#000000"
                  isRequired={true}
                  maxLength={50}
                  textError={
                    !valid.checkInchgNm ? getMsg(this.props.lang, 'ML0215', '담당자 명을 입력하세요.') : ''
                  }
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkInchgNm: true,
                      },
                      businessInfo: {
                        ...businessInfo,
                        inchgNm: e,
                      },
                    });
                  }}
                  value={businessInfo.inchgNm ? businessInfo.inchgNm : ''}
                />
                <TextField
                  labelTextField={`${getMsg(this.props.lang, 'ML0216', '담당자 이메일')} (${getMsg(this.props.lang, 'ML0019', '필수')})`}
                  labelTextFieldSize={14}
                  fontSize={14}
                  colorLabel="#000000"
                  maxLength={255}
                  isRequired={true}
                  textError={
                    (!valid.checkEmail ? getMsg(this.props.lang, 'ML0217', '담당자 이메일을 입력하세요. ') : '') +
                    (!valid.checkEmailFormat ? getMsg(this.props.lang, 'ML0218', '이메일 형식이 아닙니다. ') : '')
                  }
                  valueProps={e => {
                    this.setState({
                      valid: {
                        ...this.state.valid,
                        checkEmail: true,
                        checkEmailFormat: true,
                      },
                      businessInfo: {
                        ...businessInfo,
                        email: e,
                      },
                    });
                  }}
                  value={businessInfo.email ? businessInfo.email : ''}
                />
                {/*<TextField*/}
                {/*labelTextField="세금계산서 이메일"*/}
                {/*colorLabel="#000000"*/}
                {/*valueProps={(e) => {*/}
                {/*this.setState({*/}
                {/*businessInfo: {*/}
                {/*...businessInfo,*/}
                {/*taxBillEmail: e*/}
                {/*}*/}
                {/*})*/}
                {/*}}*/}
                {/*value={businessInfo.taxBillEmail ? businessInfo.taxBillEmail : ''}*/}
                {/*/>*/}
              </View>
            </View>
          </View>
          <View style={[DefaultStyle._listBtn, DefaultStyle.p_16, DefaultStyle.mt_0, DefaultStyle.d_flex_between]}>
            <Button
              mode="contained"
              style={[{ width: '48%', borderRadius: 24, height: 40 }, DefaultStyle._primary,]}
              color="red"
              onPress={() => this.navigation.goBack()}>

              {getMsg(this.props.lang, 'ML0101', '취소')}
            </Button>
            <Button
              mode="contained"
              style={[{ width: '48%', borderRadius: 24, height: 40 }, DefaultStyle._primary,]}
              color="red"
              onPress={this.handleOnSubmit}>

              {getMsg(this.props.lang, 'ML0429', '등록')}
            </Button>
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
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {};
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailRegisterTenant);
