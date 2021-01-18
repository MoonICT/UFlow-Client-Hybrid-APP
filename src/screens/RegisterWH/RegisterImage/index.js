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
import { connect } from 'react-redux';
import { Appbar, Text, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ImagePanoram from './imagePanoram';
import UpImage from './image';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
import { MediaUpload } from '@Services/apis';
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

  _removeImage = () => this.setState({ isRemove: !this.state.isRemove });

  // TODO @Deprecated ios에서 갤러리 업로드 안됨.
  chooseFile = async (type) => {
    try {
      // TODO 이미지 피커 교체 필요 (ios에서 갤러리 선택 안됨.)
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ singleFile: res }, async () => {
        if (res != null) {
          // If file selected then create FormData
          let { singleFile, valueTab } = this.state;
          const data = new FormData();
          data.append('name', singleFile.name);
          data.append('file', singleFile);
          // Please change file upload URL
          await MediaUpload.uploadFile(data).then(respon => {
            if (respon.status === 200) {
              let { url } = respon.data;
              let { filename } = respon.data;
              // let pimages = [{ uri: url }];
              // pimages.push();
              // this.setState({ pimages });
              console.log('url', url);
              this.props.uploadImage({
                url: url,
                name: filename,
                value: valueTab,
              });
            }
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

  handlePicker = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    try {
      launchImageLibrary(options, (response) => {
        console.log('image response ::: ', response)

        let file = {
          fileCopyUri: response.uri,
          name: response.fileName,
          size: response.fileSize,
          type: response.type,
          uri: response.uri
        }

        // 이미지를 선택 안한 경우.
        if (response && response.didCancel) {
          return false;
        }

        this.setState({ singleFile: file }, async () => {
          if (response != null) {
            // If file selected then create FormData
            let { singleFile, valueTab } = this.state;
            const data = new FormData();
            data.append('name', singleFile.name);
            data.append('file', singleFile);

            // Progress
            this.props.setProgress({ is: true, type: 'CIRCLE' });
            // Please change file upload URL
            await MediaUpload.uploadFile(data).then(respon => {
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
            }).catch(error => {
              this.props.setProgress({ is: false });
              console.log(error)
              alert(' MediaUpload.uploadFile:' + error.reponse);
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

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="사진 추가"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
          <Appbar.Action
            icon="image-plus"
            color="black"
            onPress={() => {
              console.log('tab: ', valueTab)
              if (valueTab === 0) {
                this.handlePicker('photo');
              } else if (valueTab === 1) {
                console.log('imageStore.pnImages', pnImages)
                if (pnImages && pnImages.length > 0) {
                  alert('파노라마 사진은 1장만 등록 가능합니다.');
                } else {
                  this.handlePicker('photo');
                }
              }
              // this.chooseFile('photo');
              // this.props.registerAction('44444');
            }}
          />
          {/* TODO 이미지 개별 삭제 가능해야함. */}
          <Appbar.Action
            icon="delete"
            color={isRemove === true ? '#ff6d00' : 'black'}
            onPress={this._removeImage}
          />
        </Appbars>
        <ScrollView>
          <View style={DefaultStyle._tabBar}>
            <TouchableOpacity
              style={valueTab === 0 ? DefaultStyle._btnTabBar : null}
              onPress={() => this.setState({ valueTab: 0 })}>
              <Text style={DefaultStyle._textTabBar}>일반 사진</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={valueTab === 1 ? DefaultStyle._btnTabBar : null}
              onPress={() => this.setState({ valueTab: 1 })}>
              <Text style={DefaultStyle._textTabBar}>파노라마 사진</Text>
            </TouchableOpacity>
          </View>
          {valueTab === 0 ? (
            <UpImage
              valueTab={valueTab}
              isRemove={isRemove}
              handldeProps={() => this.handlePicker(valueTab)}
            />
          ) : (
            <ImagePanoram
              valueTab={valueTab}
              isRemove={isRemove}
              handldeProps={() => this.handlePicker(valueTab)}
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
