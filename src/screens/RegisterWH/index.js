/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {TextInput, Appbar, Checkbox, Text, Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../components/organisms/AppBar';
import ActionCreator from '../../actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import {styles as S} from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RegisterWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};
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

  render() {
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 정보 등록"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <TouchableOpacity
            style={S.imageRegister}
            onPress={() => this.navigation.navigate('RegisterImage2')}>
            <Image source={ignore3} style={S.ImageStyle} />
            <Text style={S.textImage}>사진 추가</Text>
          </TouchableOpacity>

          <TouchableOpacity style={S.btnTypeRegister} onPress={() => {}}>
            <Text style={S.textLeftBtn}>사진 추가</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={S.btnTypeRegister} onPress={() => {}}>
            <Text style={S.textLeftBtn}>창고 소개</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={S.btnTypeRegister} onPress={() => {}}>
            <Text style={S.textLeftBtn}>부가 정보</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={S.btnTypeRegister} onPress={() => {}}>
            <Text style={S.textLeftBtn}>층별 상세 정보</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={S.btnTypeRegister} onPress={() => {}}>
            <Text style={S.textLeftBtn}>계약 조건</Text>
            <View style={S.rightBtn}>
              <Text style={S.textRightBtn}>입력하세요</Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="rgba(0, 0, 0, 0.54)"
              />
            </View>
          </TouchableOpacity>
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
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterWH);
