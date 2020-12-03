/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-11 14:22:05
 * @modify date 2020-11-24 18:38:47
 * @desc [description]
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import CarouselSnap, {Pagination} from 'react-native-snap-carousel';
//Local Import
import {styles} from './style';

class CarouselSnaps extends Component {
  constructor(props) {
    super(props);
  }

  pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 8,
          height: 8,
          marginTop: 1,
          marginBottom: 6,
          backgroundColor: 'rgba(0, 0, 0, 0.26)',
        }}
        // inactiveDotStyle={
        //   {
        //     // Define styles for inactive dots here
        //   }
        // }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <CarouselSnap {...this.props} />

      // <View style={styles.container}>
      //   <CarouselSnap {...this.props} />
      //   {this.pagination}
      // </View>
    );
  }
}

export default CarouselSnaps;
