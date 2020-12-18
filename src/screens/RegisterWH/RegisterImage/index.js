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

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
// import ignore2 from '@Assets/images/ignore2x.png';
// import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import ImagePicker from 'react-native-image-picker';

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

class RegisterImage extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { title: 'Profile Photo', confirm: false };
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

  handlePicker = () => {
    // console.log('edit');
    ImagePicker.showImagePicker({}, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let pimages = [{ uri: response.uri }];
        pimages.push();
        this.props.registerAction({ uri: response.uri });
        this.setState({
          avatar: { uri: response.uri },
          title: 'Updating...',
          imgData: pimages,
        });
        fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          // eslint-disable-next-line no-undef
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', //Specifying the Content-Type
          }),
          body: createFormData(response, { id: '123' }),
        })
          .then(data => data.json())
          .then(res => {
            console.log('upload succes', res);
            this.setState({
              avatar2: { uri: response.image },
              title: 'Profile Photo',
            });
          })
          .catch(error => {
            console.log('upload error', error);
            this.setState({
              title: 'Profile Photo',
            });
          });
        // here we can call a API to upload image on server
      }
    });
  };
  // componentWillUpdate(nextProps, nextState) {
  //   const state = this.state.avatar;
  //   // this.props.registerAction(state);
  //   console.log('Component WILL UPDATE!');

  // }
  render() {
    const { imageStore,route } = this.props;
    console.log('imageStore', imageStore);
    const listImg =
      imageStore &&
      imageStore.map((item, index) => {
        // console.log('index', index);
        if (index !== 0) {
          return (
            <View>
              <Image style={S.itemImage} source={item} key={index} />
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
                source={imageStore[0]}
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
                S.btnSubmit,
                imageStore.length > 2 ? S.activeBtnSubmit : null,
              ]}
              disabled={imageStore.length > 2 ? false : true}>
              <Text
                style={[
                  S.textSubmit,
                  imageStore.length > 2 ? S.textActiveSubmit : null,
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
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
