/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  View,

} from 'react-native';
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
    this.state = {
      checked: false,
    };

    this.navigation = props.navigation;
  }
  render() {
    const { route } = this.props;
    const { checked } = this.state;

    return (
      <View style={S.options}>
        <View style={S.optionRow}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: !checked });
            }}
          />
          <Text style={DefaultStyle._textDF2}>리스트</Text>
        </View>
        <View style={S.optionRow}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: !checked });
            }}
          />
          <Text style={DefaultStyle._textDF2}>리스트</Text>
        </View>
        <View style={S.optionRow}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: !checked });
            }}
          />
          <Text style={DefaultStyle._textDF2}>리스트</Text>
        </View>
        <View style={S.optionRow}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: !checked });
            }}
          />
          <Text style={DefaultStyle._textDF2}>리스트</Text>
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
    imageStore: state.registerWH.imageData,
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
