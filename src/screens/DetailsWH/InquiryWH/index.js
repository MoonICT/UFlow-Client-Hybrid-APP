/**
 * TODO @Deprecated
 *
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
  Text,
  Switch,
  IconButton,
} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};

    this.navigation = props.navigation;
  }

  render() {
    const { imageStore } = this.props;
    // console.log('this.state.value', this.state.value);
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
          <Appbar.Content
            color="rgba(0, 0, 0, 0.47)"
            title="문의하기"
            onPress={() => this.navigation.navigate('CreateInquiryWH')}
            titleStyle={DefaultStyle._textHeaderRight}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <TouchableOpacity
            onPress={() => {
              this.navigation.navigate('DetailsInquiryWH');
            }}>
            <View style={S.inquirys}>
              <View style={S.leftInquiry}>
                <Text style={S.titleInquiry}>미답변</Text>
                <Text style={S.contentInquiry}>비밀글입니다.</Text>
                <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
              </View>
              <View style={S.rightInquiry}>
                <IconButton
                  style={S.btnIcon}
                  icon="lock"
                  onPress={() => console.log('lock')}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.navigation.navigate('DetailsInquiryWH');
            }}>
            <View style={S.inquirys}>
              <View style={S.leftInquiry}>
                <Text style={[S.titleInquiry, S.titleCompleted]}>답변완료</Text>
                <Text style={S.contentInquiry}>비밀글입니다.</Text>
                <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
              </View>
              <View style={S.rightInquiry}>
                <IconButton
                  style={S.btnIcon}
                  icon="lock"
                  onPress={() => console.log('lock')}
                />
              </View>
            </View>
          </TouchableOpacity>
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
)(RegisterInfo);
