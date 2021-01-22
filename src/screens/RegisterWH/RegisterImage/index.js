/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
// Local Imports
import DefaultStyle from '@Styles/default';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import Appbars from '@Components/organisms/AppBar';
import ImagePanoram from './imagePanoram';
import UpImage from './image';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
import { Warehouse } from '@Services/apis';
import DocumentPicker from 'react-native-document-picker';

class RegisterImage extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      singleFile: null,
      valueTab: 0,
      isRemove: false,
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  _removeImage = () => {
    if (this.props.imageStore.length > 0 || this.props.pnImages.length > 0) {
      this.setState({ isRemove: !this.state.isRemove });
    }
  };

  // TODO @Deprecated ios에서 갤러리 업로드 안됨.
  // chooseFile = async type => {
  //   try {
  //     // TODO 이미지 피커 교체 필요 (ios에서 갤러리 선택 안됨.)
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });
  //     this.setState({ singleFile: res }, async () => {
  //       if (res != null) {
  //         // If file selected then create FormData
  //         let { singleFile, valueTab } = this.state;
  //         const data = new FormData();
  //         data.append('name', singleFile.name);
  //         data.append('file', singleFile);
  //         // Please change file upload URL
  //         await MediaUpload.uploadFile(data).then(respon => {
  //           if (respon.status === 200) {
  //             let { url } = respon.data;
  //             let { filename } = respon.data;
  //             // let pimages = [{ uri: url }];
  //             // pimages.push();
  //             // this.setState({ pimages });
  //             console.log('url', url);
  //             this.props.uploadImage({
  //               url: url,
  //               name: filename,
  //               value: valueTab,
  //             });
  //           }
  //         });
  //       } else {
  //         // If no file selected the show alert
  //         alert('등록된 파일이 없습니다. 파일을 등록해주세요.');
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

  handlePicker = async (type) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
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
            // 이미지 업로드시 창고 아이디 필요함.
            let { idWH } = this.props.route.params
            if (!idWH) {
              console.log('Error ::: 창고 아이디가 없습니다. ')
              return false;
            }

            if (!type) {
              console.log('Error ::: 이미지 업로드 타입이 없습니다. ')
              return false;
            }

            // If file selected then create FormData
            let { singleFile, valueTab } = this.state;
            const data = new FormData();
            data.append('file', singleFile);
            data.append('id', idWH);
            data.append('code', type); // 이미지(0001) 또는 파노라마(0002)

            // Progress
            this.props.setProgress({ is: true, type: 'CIRCLE' });
            // Please change file upload URL
            {/**
             * @param body {
             *   file => 파일
             *   id => 창고 ID
             *   code => 이미지(0001) 또는 파노라마(0002)
             * }
             * @returns {Promise<AxiosResponse<any>>}
             */
            }
            await Warehouse.uploadImage(data)
              .then(respon => {
                console.log('이미지 업로드 완료 : ', respon)
                if (respon.status === 200) {
                  let { url } = respon.data;
                  let { filename } = respon.data;
                  // let pimages = [{ uri: url }];
                  // pimages.push();
                  // this.setState({ pimages });
                  console.log('저장 이미지 :::', {
                    url: url,
                    name: filename,
                    value: valueTab,
                  });
                  this.props.uploadImage({
                    url: url,
                    name: filename,
                    value: valueTab,
                  });
                }

                // Progress
                setTimeout(() => {
                  this.props.setProgress({ is: false });
                }, 300);
              })
              .catch(error => {
                this.props.setProgress({ is: false });
                console.log(error);
                // alert(' MediaUpload.uploadFile:' + error.reponse);
              });
          } else {
            // If no file selected the show alert
            // alert('등록된 파일이 없습니다. 파일을 등록해주세요.');
          }
        });
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  render () {
    const { imageStore, pnImages } = this.props;
    const { valueTab, isRemove } = this.state;
    // console.log('imageStore', imageStore);
    let checkRemove = false;
    if (
      (valueTab === 0 && imageStore && imageStore.length === 0) ||
      (pnImages === 1 && pnImages && pnImages.length === 0)
    ) {
      checkRemove = true;
    }
    console.log('checkRemove :>> ', checkRemove);
    return (
      <SafeAreaView style={S.container}>
        <HistoryBackActionBar
          title={'사진 추가'}
          navigation={this.navigation}
          rightComponent={
            isRemove === true && checkRemove === false ? (
              <Appbar.Content
                color={'black'}
                onPress={this._removeImage}
                title={'완료'}
                titleStyle={S.textHeaderRight}
                style={S.itemHeaderRight}
              />
            ) : (
              <Fragment>
                <Appbar.Action
                  icon="image-plus"
                  color="black"
                  onPress={() => {
                    console.log('tab: ', valueTab);
                    if (valueTab === 0) {
                      this.handlePicker('001'); // 창고 이미지
                    } else if (valueTab === 1) {
                      console.log('imageStore.pnImages', pnImages);
                      if (pnImages && pnImages.length > 0) {
                        alert('파노라마 사진은 1장만 등록 가능합니다.');
                      } else {
                        this.handlePicker('002'); // 파노라마 이미지
                      }
                    }
                    // this.chooseFile('photo');
                    // this.props.registerAction('44444');
                  }}
                />
                <Appbar.Action
                  icon="delete"
                  color="black"
                  onPress={this._removeImage}
                />
              </Fragment>
            )
          }
        />

        <ScrollView>
          <View style={DefaultStyle._tabBar}>
            <TouchableOpacity
              style={valueTab === 0 ? DefaultStyle._btnTabBar : null}
              onPress={() => {
                this.setState({ valueTab: 0, isRemove: false });
              }}>
              <Text style={DefaultStyle._textTabBar}>일반 사진</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={valueTab === 1 ? DefaultStyle._btnTabBar : null}
              onPress={() => this.setState({ valueTab: 1, isRemove: false })}>
              <Text style={DefaultStyle._textTabBar}>파노라마 사진</Text>
            </TouchableOpacity>
          </View>
          {valueTab === 0 ? (
            <UpImage
              valueTab={valueTab}
              isRemove={isRemove}
              handldeProps={() => this.handlePicker('001')}
            />
          ) : (
            <ImagePanoram
              valueTab={valueTab}
              isRemove={isRemove}
              handldeProps={() => this.handlePicker('002')}
            />
          )}

          <View
            style={[
              DefaultStyle.footerRegister,
              { marginTop: 24, marginBottom: 18 },
            ]}>
            <TouchableOpacity
              onPress={() => this.navigation.navigate('RegisterWH')}
              style={[
                DefaultStyle.btnSubmit,
                imageStore && imageStore.length > 0
                  ? DefaultStyle.activeBtnSubmit
                  : null,
              ]}
              disabled={imageStore && imageStore.length > 0 ? false : true}>
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  imageStore && imageStore.length > 0
                    ? DefaultStyle.textActiveSubmit
                    : null,
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  componentDidMount () {
    console.log('이미지 등록을 위한 창고 아이디', this.props.route.params)
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.whImages,
    pnImages: state.registerWH.pnImages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    uploadImage: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterImage);
