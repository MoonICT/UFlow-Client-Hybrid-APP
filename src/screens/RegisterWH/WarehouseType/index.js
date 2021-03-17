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
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Searchbar,
  Text,
  List,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import illust1 from '@Assets/images/illust1.png';
import illust21 from '@Assets/images/illust21.png';
import { styles as S } from './style';
import { Warehouse } from '@Services/apis';
import Postcode from 'react-native-daum-postcode';
class WarehouseType extends Component {
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
    //console.log('//::componentWillUnmount::');
  }

  render() {
    const { route, dataIntro } = this.props;
    const {
      name,
      description,
      gps,
      address,
      roadAddr,
      listSearch,
    } = this.state;

    return (
      <SafeAreaView style={[DefaultStyle._container]}>
        <HistoryBackActionBar
          title={'창고형 선택'}
          navigation={this.navigation}
        />
        <ScrollView>
          <View style={S.container}>
            <Image style={S.image} source={illust1} />
            <Text style={[S.title, {marginBottom: 0}]}>
              오픈형
            </Text>
            <Text style={{marginBottom: 10}}>(공인중개사, 부동산컨설팅 법인, 자산운용사)</Text>
            <Text style={[S.content, {fontSize: 13}]}>
              오픈형으로 등록시 상세주소를 정확히 입력 부탁드립니다.
            </Text>
            <Text style={[S.content, {color:'#F44336', fontSize: 13}]}>
              ※ 조회시에는 창고 상세주소가 표시되지 않습니다.
            </Text>
            <TouchableOpacity
              style={[DefaultStyle._btnOutline, S.btnType]}
              onPress={() => this.navigation.navigate('RegisterWH',{warehMgmtType: '0001'})}>
              <Text style={DefaultStyle._textButton}>등록하기</Text>
            </TouchableOpacity>
            <View style={S.underlined} />
          </View>
          <View style={[S.container, {paddingBottom: 80}]}>
            <Image source={illust21} />
            <Text style={[S.title, {marginBottom: 0}]}>UFLOW 의뢰형</Text>
            <Text style={{marginBottom: 10}}>(직영, 가맹, 일반창고)</Text>
            <TouchableOpacity
              style={[DefaultStyle._btnOutline, S.btnType]}
              onPress={() => this.navigation.navigate('RegisterBusinessInfo')}>
              <Text style={DefaultStyle._textButton}>등록하기</Text>
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
  componentDidUpdate(prevProps, prevState) {}
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    dataIntro: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WarehouseType);
