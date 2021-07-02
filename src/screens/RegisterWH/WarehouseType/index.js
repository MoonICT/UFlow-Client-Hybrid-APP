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
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang
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
          title={getMsg(this.props.lang, 'ML0511', '창고형 선택')}
          navigation={this.navigation}
        />
        <ScrollView>
          <View style={S.container}>
            <Image style={S.image} source={illust1} />
            <Text style={[S.title, {marginBottom: 0}]}>
              {getMsg(this.props.lang, 'ML0189', '오픈형')}
            </Text>
            <Text style={{marginBottom: 10}}>{getMsg(this.props.lang, 'ML0512', '(공인중개사, 부동산컨설팅 법인, 자산운용사)')}</Text>
            <Text style={[S.content, {fontSize: 13}]}>
              {getMsg(this.props.lang, 'ML0513', '오픈형으로 등록시 상세주소를 정확히 입력 부탁드립니다.')}
            </Text>
            <Text style={[S.content, {color:'#F44336', fontSize: 13}]}>
              {getMsg(this.props.lang, 'ML0514', '※ 조회시에는 창고 상세주소가 표시되지 않습니다.')}
            </Text>
            <View style={S.btnContainer}>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline, S.btnType]}
                onPress={() => this.navigation.navigate('RegisterSimple',{warehMgmtType: '0001'})}>
                <Text style={DefaultStyle._textButton}>{getMsg(this.props.lang, 'ML0656', '간편등록')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline, S.btnType]}
                onPress={() => this.navigation.navigate('RegisterWH',{warehMgmtType: '0001'})}>
                <Text style={DefaultStyle._textButton}>{getMsg(this.props.lang, 'ML0657', '상세등록')}</Text>
              </TouchableOpacity>
            </View>
            <View style={S.underlined} />
          </View>
          <View style={[S.container, {paddingBottom: 80}]}>
            <Image source={illust21} />
            <Text style={[S.title, {marginBottom: 0}]}>{getMsg(this.props.lang, 'ML0516', 'UFLOW 책임형')}</Text>
            <Text style={{marginBottom: 10}}>{getMsg(this.props.lang, 'ML0517', '(직영, 가맹, 일반창고)')}</Text>
            <View style={S.btnContainer}>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline, S.btnType]}
                onPress={() => this.navigation.navigate('RegisterSimple',{warehMgmtType: '0002'})}>
                <Text style={DefaultStyle._textButton}>{getMsg(this.props.lang, 'ML0656', '간편등록')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[DefaultStyle._btnOutline, S.btnType]}
                onPress={() => this.navigation.navigate('RegisterWH',{warehMgmtType: '0002'})}>
                <Text style={DefaultStyle._textButton}>{getMsg(this.props.lang, 'ML0657', '상세등록')}</Text>
              </TouchableOpacity>
            </View>
            
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
