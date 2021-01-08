/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, IconButton } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
// import ignore2 from '@Assets/images/ignore2x.png';
// import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import { MediaUpload } from '@Services/apis';
import DocumentPicker from 'react-native-document-picker';
class RegisterImage extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      title: 'Profile Photo',
      confirm: false,
      singleFile: null,
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  _addImage = () => console.log('_addImage');
  _removeImage = () => this.props.removeAction(0);

  changeContent = e => {
    console.log('e', e);
  };

  handlePicker = async () => {
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
              // let pimages = [{ uri: url }];
              // pimages.push();
              // this.setState({ pimages });
              console.log('url', url);
              this.props.registerAction({ url: url });
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
    const { pimages } = this.state;
    console.log('imageStore', imageStore);
    const listImg =
      imageStore &&
      imageStore.map((item, index) => {
        console.log('item.url :>> ', item.url);
        // console.log('index', index);
        if (index !== 0) {
          return (
            <View key={index}>
              <Image style={S.itemImage} source={{ uri: item.url }} />
              <IconButton
                style={S.btnRemove}
                icon="close-circle"
                onPress={() => this.props.removeAction(index)}
              />
            </View>
          );
        }
      });
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
              this.handlePicker();
              // this.props.registerAction('44444');
            }}
          />

          <Appbar.Action
            icon="delete"
            color="black"
            onPress={this._removeImage}
          />
        </Appbars>
        <ScrollView>
          {imageStore.length === 0 ? (
            <View style={S.bgrRegister}>
              <Image source={ignore3} style={S.ImageStyle} />
              <Text style={S.textBgr}>최소 3장 이상 등록하세요.</Text>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                style={S.ImageUpload}
                source={{ uri: imageStore[0].url }}
                PlaceholderContent={<ActivityIndicator />}
              />

              <View
                style={[
                  S.listImage,
                  (imageStore.length - 1) % 3 === 0 ? S.threeImage : null,
                ]}>
                {listImg}
              </View>
            </View>
          )}

          <View style={DefaultStyle.footerRegister}>
            <TouchableOpacity
              onPress={() => this.navigation.navigate('RegisterWH')}
              style={[
                DefaultStyle.btnSubmit,
                imageStore.length > 0 ? DefaultStyle.activeBtnSubmit : null,
              ]}
              disabled={imageStore.length > 0 ? false : true}>
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  imageStore.length > 0 ? DefaultStyle.textActiveSubmit : null,
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
    // count: state.home.count,
    // imageStore: state.registerWH.pimages,
    imageStore: state.registerWH.whImages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterImage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  body: { flex: 1 },
});
