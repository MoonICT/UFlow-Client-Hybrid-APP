/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Text, RadioButton } from 'react-native-paper';
import { styles as S } from '../style';

// Local Imports
import DefaultStyle from '@Styles/default';

class RequestType extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.navigation = props.navigation;
  }
  render() {
    const { route, optionStep2, checked } = this.props;
    console.log('route', route);

    return (
      <View style={S.contentAlignLeft}>
        <Text style={[S.styleTextTitleNomarl, { marginBottom: 20 }]}>
          2. 몇 평 필요하신가요?
        </Text>
        <View style={[DefaultStyle.row,{alignItems:'center', marginBottom: 10}]}>
          <RadioButton
            value="first"
            color="#ff6d00"
            uncheckedColor="white"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => {
              optionStep2('first');
            }}
          />

          <Text style={{ color: 'white', fontSize: 15 }}>리스트1</Text>
        </View>
        <View style={[DefaultStyle.row,{alignItems:'center', marginBottom: 10}]}>
          <RadioButton
            value="second"
            color="#ff6d00"
            uncheckedColor="white"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => {
              optionStep2('second');
            }}
          />

          <Text style={{ color: 'white', fontSize: 15 }}>리스트1</Text>
        </View>
        <View style={[DefaultStyle.row,{alignItems:'center'}]}>
          <RadioButton
            value="three"
            color="#ff6d00"
            uncheckedColor="white"
            status={checked === 'three' ? 'checked' : 'unchecked'}
            onPress={() => {
              optionStep2('three');
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

export default RequestType;
