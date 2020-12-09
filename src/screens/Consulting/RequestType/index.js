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

// Local Imports
import DefaultStyle from '@Styles/default';

class RequestType extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checked: 'first',
    };

    this.navigation = props.navigation;
  }
  render() {
    const { route } = this.props;
    const { checked } = this.state;
    console.log('route', route);

    return (
      <View>
        <View style={DefaultStyle.row}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: 'first' });
            }}
          />
          <Text>리스트</Text>
        </View>
        <View style={DefaultStyle.row}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: 'second' });
            }}
          />
          <Text>리스트</Text>
        </View>
        <View style={DefaultStyle.row}>
          <RadioButton
            value="three"
            status={checked === 'three' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({ checked: 'three' });
            }}
          />
          <Text>리스트</Text>
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
