/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import ActionCreator from '@Actions';
import { styles as S } from '../style';

class AttachDocument extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checked: false,
    };

    this.navigation = props.navigation;
  }
  render() {
    const { route } = this.props;
    const { checked } = this.state;

    return (
      <View style={S.contentAlignLeft}>
        <Text style={[S.styleTextTitleNomarl, { marginBottom: 20 }]}>
          4. 첨부 자료를 등록해 주세요.
        </Text>
        <Text style={[DefaultStyle._textDF, { color: 'rgba(0, 0, 0, 0.54)' }]}>
          jpg, gif, png, pdf, zip 파일 형식만 업로드 가능합니다. (최대 5MB 이하)
        </Text>
        <View style={S.attach}>
          <View style={S.infoAttach}>
            <Text style={S.textInfoAttach}>에이아트.pdf</Text>
          </View>
          <TouchableOpacity style={S.btnAttach}>
            <Text style={S.textBtnAttach}>파일첨부</Text>
          </TouchableOpacity>
        </View>
        <Text style={S.completeAttach}>성공적으로 파일을 등록했습니다.</Text>
      </View>
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
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachDocument);
