/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Select from '@Components/organisms/Select';
import { styles as S } from '../style';
import { WarehouseProprietorInfo } from "@Services/apis/models/warehouse";
import { Entrp, MediaUpload, Warehouse } from '@Services/apis';
import configURL from '@Services/http/ConfigURL';
import CertMobile from '@Components/organisms/CertMobile';
import Loading from '@Components/atoms/Loading';
import DocumentPicker from 'react-native-document-picker';
import Postcode from 'react-native-daum-postcode';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { connect } from "react-redux";
import ActionCreator from '@Actions';

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

class MypageBusinessInfo extends Component {
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
    };
    this.navigation = props.navigation;
  }

  /** when after render DOM */
  componentDidMount () {
    // Progress
    this.props.setProgress({ is: true, });

    Entrp.list().then(res => {
      let resultData = res.data && res.data._embedded && res.data._embedded.businessInfoes ? res.data._embedded.businessInfoes : [];
      let dataConvert = [];
      console.log('사업자 리스트 ', resultData)
      resultData.forEach(element => {
        dataConvert.push({
          ...element,
          label: element.name,
          value: element.id
        })
      })

      // console.log('dataConvert', dataConvert);

      this.setState({
        listBusinessInfo: dataConvert
      });

      this.setBusinessData(dataConvert[0])

      // Progress
      this.props.setProgress({ is: false, });
    }).catch(error => {
      alert('MypageBusinessInfo error:' + error);

      // Progress
      this.props.setProgress({ is: false, });
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

    // console.log('dataAddress', data);

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
          // console.log('append', singleFile)
          // console.log('data', data)
          // Please change file upload URL
          // Progress
          this.props.setProgress({ is: true, type: 'CIRCLE' });
          MediaUpload.uploadFile(data).then(respon => {
            // console.log('respon', respon)
            if (respon.status === 200) {
              let { url } = respon.data;

              var pathArray = url.split('/');
              var host = pathArray[pathArray.length - 1];

              this.setState({
                photo: url,
                businessInfo: {
                  ...businessInfo,
                  regFile: host
                }
              });
            }
            // Progress
            this.props.setProgress({ is: false, });
          }).catch(error => {
            alert('MediaUpload.uploadFile error:' + error.response.data.message);
            this.props.setProgress({ is: false, });
          });
        } else {
          // If no file selected the show alert
          alert('등록하신 파일이 없습니다. 파일을 등록해주세요.');
        }
      });
    });
  };

  // upload image
  // handlePicker = async () => {
  //   const { businessInfo } = this.state;

  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });
  //     this.setState({ singleFile: res }, async () => {
  //       if (res != null) {
  //         // If file selected then create FormData
  //         let { singleFile } = this.state;
  //         const data = new FormData();
  //         data.append('name', singleFile.name);
  //         data.append('file', singleFile);
  //         console.log('append', singleFile)
  //         console.log('data', data)
  //         // Please change file upload URL
  //         MediaUpload.uploadFile(data).then(respon => {
  //           if (respon.status === 200) {
  //             let { url } = respon.data;

  //             var pathArray = url.split( '/' );
  //             var host = pathArray[pathArray.length-1];

  //             this.setState({
  //               photo: url,
  //               businessInfo: {
  //                 ...businessInfo,
  //                 regFile: host
  //               }
  //             });
  //           }
  //         }).catch(error => {
  //           alert('MediaUpload.uploadFile error:' + error);
  //         });
  //       } else {
  //         // If no file selected the show alert
  //         alert('Please Select File first');
  //       }
  //     });
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

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
      // etcFileName1: 'uflow_aebfe582aa2441b98aab42ded5e876ab.jpg',
      etcFileName1: data.etcFileName1,
    }

    // console.log('setData ', setData)
    this.setState({
      imageList: [{
        data_url: `${configURL.API_SERVER_ADDRESS}/${data.regFile}`,
      }],
      businessInfo: setData,
      photo: `${configURL.FILE_SERVER_ADDRESS}/${data.regFile}`
    });
    // reset(setData)
  };

  /**
   * 사업자 selectbox 변경
   * */
  handleChangeSelectBox = (e, i) => {
    const { listBusinessInfo } = this.state;

    this.setState({
      selectedInfoIndex: i,
      isCert: false,
      imageList: []
    });

    this.setBusinessData(listBusinessInfo[i]);
  }

  handleOnSubmit = () => {
    const { businessInfo, isCert } = this.state;

    if (!isCert) {
      alert('휴대폰 인증을 완료해주세요.')
      return false
    }
    // console.log('최종 저장 사업자 정보 : ',businessInfo);

    // Progress
    this.props.setProgress({ is: true, type: 'CIRCLE' });

    Entrp.update(businessInfo).then(res => {
      // Progress
      setTimeout(() => {
        this.props.setProgress({ is: false, });
      }, 300)
      setTimeout(() => {
        alert('사업자 정보가 수정되었습니다.')
      }, 400)
      // console.log('::::: API Add Business Info  :::::', res)
      // setIsComplete(true)
    }).catch(error => {
      alert('서버에러:' + error.response.data.message);
      // Progress
      this.props.setProgress({ is: false, });
    });
  };


  render () {
    const { listBusinessInfo, businessInfo, photo } = this.state;

    // console.log(`${configURL.FILE_SERVER_ADDRESS}/${businessInfo.regFile}`)
    return (
      <ScrollView>
        <View style={[DefaultStyle._cards]}>
          <View style={[DefaultStyle._titleCard, { marginBottom: -4 }]}>
            <Text style={DefaultStyle._textTitleBody}>사업자 등록 정보</Text>
          </View>
          <View style>
            <Select
              data={listBusinessInfo}
              labelSelected="기등록 사업자 등록정보"
              valueSelected={listBusinessInfo[0] ? listBusinessInfo[0].label : ''}
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
                  businessInfo: {
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
                  businessInfo: {
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
                  businessInfo: {
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
            </TouchableOpacity>
            <View style={[DefaultStyle._listBtn, DefaultStyle.d_flex, DefaultStyle.mb_20]}>
              <View style={[DefaultStyle._element, DefaultStyle.mr_20]}>
                <TextField colorLabel="#000000" styleProps={DefaultStyle.mb_0} value={businessInfo.roadAddr.zipNo} />
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
                  businessInfo: {
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
                  businessInfo: {
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
                  businessInfo: {
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
                  businessInfo: {
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
                  businessInfo: {
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
                  businessInfo: {
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
            style={[{
              width: '95%',
              margin: 12,
              borderRadius: 24,
              height: 40,
              marginBottom: 24
            }, DefaultStyle._primary,]}
            color="red"
            onPress={this.handleOnSubmit}>
            확인
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
)(MypageBusinessInfo);
