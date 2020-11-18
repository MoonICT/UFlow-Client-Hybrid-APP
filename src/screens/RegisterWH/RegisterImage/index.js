/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {TextInput, Appbar, Checkbox, Text, Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../../components/organisms/AppBar';
import ActionCreator from '../../../actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import {styles as S} from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    this.state = {title: 'Profile Photo'};
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
  _removeImage = () => console.log('_removeImage');

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
        this.setState({avatar: {uri: response.uri}, title: 'Updating...'});
        fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          // eslint-disable-next-line no-undef
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', //Specifying the Content-Type
          }),
          body: createFormData(response, {id: '123'}),
        })
          .then(data => data.json())
          .then(res => {
            console.log('upload succes', res);
            this.setState({
              avatar: {uri: response.image},
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

  render() {
    console.log('this.state.avatar', this.state.avatar);
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
              this.props.registerAction('aaaa');
            }}
          />
          <Appbar.Action
            icon="delete"
            color="black"
            onPress={this._removeImage}
          />
        </Appbars>
        <ScrollView>
          {!this.state.avatar ? (
            <View style={S.bgrRegister}>
              <Image source={ignore3} style={S.ImageStyle} />
              <Text style={S.textBgr}>최소 3장 이상 등록하세요.</Text>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                style={S.ImageUpload}
                source={this.state.avatar}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          )}
        </ScrollView>
        <TouchableOpacity style={S.btnSubmit}>
          <Text style={S.textSubmit}>창고 등록하기</Text>
        </TouchableOpacity>
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
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
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
  body: {flex: 1},
});
