/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-11 14:22:05
 * @modify date 2020-11-16 15:41:12
 * @desc [description]
 */

import React, { Component } from 'react';
import CarouselSnap, { Pagination } from 'react-native-snap-carousel';
//Local Import
// import {styles} from './style';

class CarouselSnaps extends Component {
  constructor(props) {
    super(props);
  }

  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 8,
          height: 8,
          marginTop: 1,
          marginBottom: 6,
          backgroundColor: 'rgba(0, 0, 0, 0.26)',
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return
    <View>
      <CarouselSnap {...this.props} />
      {this.props.isPagination ? this.pagination : ''}
    </View>
  }
}

export default CarouselSnaps;
