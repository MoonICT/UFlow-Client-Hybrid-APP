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
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  TextInput,
  Appbar,
  Checkbox,
  Text,
  Button,
  ToggleButton,
} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../../components/organisms/AppBar';
import ActionCreator from '../../../actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

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
  _removeImage = () => console.log('_removeImage');

  // componentWillUpdate(nextProps, nextState) {
  //   const state = this.state.avatar;
  //   // this.props.registerAction(state);
  //   console.log('Component WILL UPDATE!');

  // }
  render() {
    const { imageStore } = this.props;
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 정보"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={DefaultStyle}>
            <TouchableOpacity onPress={()=>this.setState({value: '보관'})}>
              <Text>보관</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.navigation.navigate('RegisterImage')}
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
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    registerAction: (action) => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: (action) => {
      dispatch(ActionCreator.removeImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterImage);

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
