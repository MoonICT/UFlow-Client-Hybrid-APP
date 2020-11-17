/**
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import Ratings from '@Components/organisms/Rating';

import DefaultStyle from '@Styles/default';

export default class RatingScreen extends Component {
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
        <Text style={DefaultStyle.titleDf}>Rating</Text>
        <Ratings
          typeAirbnb="Airbnb"
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
        <Ratings
          showRating
          onFinishRating={this.ratingCompleted}
          style={{paddingVertical: 10}}
        />
        <Ratings
          type="heart"
          ratingCount={4}
          imageSize={60}
          showRating
          onFinishRating={this.ratingCompleted}
        />
        <Ratings
          type="custom"
          ratingImage={null}
          ratingColor="#3498db"
          ratingBackgroundColor="rgba(0, 0, 0, 0.26)"
          ratingCount={10}
          imageSize={30}
          onFinishRating={this.ratingCompleted}
          style={{paddingVertical: 10}}
        />
      </ScrollView>
    );
  }
}
