/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-11 14:22:05
 * @modify date 2020-11-12 17:21:39
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
    const {custom} = this.props;
    return <CarouselSnap {...custom} />;
  }
}

export default CarouselSnaps;
