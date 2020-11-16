/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-11 14:22:05
 * @modify date 2020-11-16 15:41:12
 * @desc [description]
 */

import React, {Component} from 'react';
import CarouselSnap from 'react-native-snap-carousel';
//Local Import
// import {styles} from './style';

class CarouselSnaps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {custom} = this.props;
    return <CarouselSnap {...this.props} />;
  }
}

export default CarouselSnaps;
