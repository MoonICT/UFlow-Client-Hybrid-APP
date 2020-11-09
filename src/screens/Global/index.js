/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 14:57:42
 * @modify date 2020-11-09 18:52:13
 * @desc [description]
 */

// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, View} from 'react-native';

// Local Imports
import DefaultStyle from '../../styles/default';
import {styles as S} from './style';

//---> Components
import Popup from '@Components/organisms/Popup';

class Global extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return (
      <SafeAreaView style={[DefaultStyle.container]}>
        <Popup />
        {children}
      </SafeAreaView>
    );
  }
}

export default Global;
