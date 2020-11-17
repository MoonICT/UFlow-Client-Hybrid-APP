/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-11 14:22:05
 * @modify date 2020-11-12 10:42:49
 * @desc [description]
 */

import React, {Component} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
//Local Import
// import {styles} from './style';

class Carousels extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {custom} = this.props;
    return <AppIntroSlider {...custom} />;
  }
}

export default Carousels;
