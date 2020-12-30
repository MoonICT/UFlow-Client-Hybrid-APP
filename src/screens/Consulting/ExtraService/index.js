/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Checkbox, Text } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
import ActionCreator from '@Actions';
import { styles as S } from '../style';

class ExtraService extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.navigation = props.navigation;
  }
  render() {
    const { route, optionStep3, checked } = this.props;

    return (
      <View style={S.contentAlignLeft}>
        <Text style={[S.styleTextTitleNomarl, { marginBottom: 20 }]}>
          3. 원하시는 유형을 선택해주세요.
        </Text>
        <View style={S.optionRow}>
          <Checkbox
            status={checked === 'first' ? 'checked' : 'unchecked'}
            color="#ff6d00"
            uncheckedColor="white"
            onPress={() => {
              optionStep3('first');
            }}
          />
          <Text style={{ color: 'white', fontSize: 15 }}>리스트1</Text>
        </View>
        <View style={S.optionRow}>
          <Checkbox
            status={checked === 'second' ? 'checked' : 'unchecked'}
            color="#ff6d00"
            uncheckedColor="white"
            onPress={() => {
              optionStep3('second');
            }}
          />
          <Text style={{ color: 'white', fontSize: 15 }}>리스트1</Text>
        </View>
        <View style={S.optionRow}>
          <Checkbox
            status={checked === 'three' ? 'checked' : 'unchecked'}
            color="#ff6d00"
            uncheckedColor="white"
            onPress={() => {
              optionStep3('three');
            }}
          />
          <Text style={{ color: 'white', fontSize: 15 }}>리스트1</Text>
        </View>
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
)(ExtraService);
