/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements';

export default class Ratings extends Component {
  constructor(props) {
    super(props);
    this.countNotification = 0;
    this.state = {};
  }
  ratingCompleted = e => {
    console.log('e', e);
  };

  render() {
    return (
      <ScrollView>
        <AirbnbRating
          count={11}
          reviews={[
            'Terrible',
            'Bad',
            'Meh',
            'OK',
            'Good',
            'Hmm...',
            'Very Good',
            'Wow',
            'Amazing',
            'Unbelievable',
            'Jesus',
          ]}
          defaultRating={11}
          size={20}
        />
        <Rating
          type="heart"
          ratingCount={3}
          imageSize={60}
          showRating
          onFinishRating={this.ratingCompleted}
        />

        <Rating
          type="custom"
          ratingImage={null}
          ratingColor="#3498db"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={10}
          imageSize={30}
          onFinishRating={this.ratingCompleted}
          style={{paddingVertical: 10}}
        />
      </ScrollView>
    );
  }
}
