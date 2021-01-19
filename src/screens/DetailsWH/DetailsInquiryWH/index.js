/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { styles as S } from '../style';
import { styles as SS } from './style';
class DetailsInquiryWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {};
    this.navigation = props.navigation;
  }

  render() {
    const { imageStore } = this.props;
    return (
      <SafeAreaView style={S.container}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 문의 상세"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}
        
        <HistoryBackActionBar
            title={'창고 문의 상세'}
            navigation={this.navigation}
          />
        <ScrollView>
          <View style={S.inquirys}>
            <View style={S.leftInquiry}>
              <Text style={S.titleInquiry}>미답변</Text>
              <Text style={S.contentInquiry}>비밀글입니다.</Text>
              <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
            </View>
            <View style={S.detailInquiry}>
              <Text style={S.textDetail}>
                창고 내에 조리 시설이 있나요? 숙식도 해결이 가능해야해서요. 꼭
                확인 부탁드립니다.
              </Text>
            </View>
          </View>
          <View style={SS.content}>
            <Text style={SS.textContent}>안녕하세요. 유플로우입니다.</Text>
            <Text style={SS.textContent}>
              해당 창고에는 조리 시설은 따로 없습니다. 감사합니다.
            </Text>
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
)(DetailsInquiryWH);
