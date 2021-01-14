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
  constructor(props) {
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
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  _removeImage = () => this.setState({ isRemove: !this.state.isRemove });

  handlePicker = async valueTab => {
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
  render() {
    const { imageStore } = this.props;
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
              this.handlePicker(valueTab);
            }}
          />
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
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.whImages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    uploadImage: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterImage);
