/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-11 14:22:05
 * @modify date 2020-11-11 18:26:55
 * @desc [description]
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

//Local Import
import {styles} from './style';

class Carousels extends Component {
  state = {
    showRealApp: false,
  };
  _onDone = () => {
    this.setState({showRealApp: true});
  };

  render() {
    const slides = [
      {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: 'https://picsum.photos/700',
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
      },
      {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: 'https://picsum.photos/700',
        imageStyle: styles.image,
        backgroundColor: '#febe29',
      },
      {
        key: 'somethun1',
        title: 'Rocket guy',
        text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
        image: 'https://picsum.photos/700',
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
      },
    ];
    return <AppIntroSlider slides={slides} onDone={this._onDone} />;
  }
}

export default Carousels;
