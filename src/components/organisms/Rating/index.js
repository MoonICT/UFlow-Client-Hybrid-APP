/**
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

export default class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {typeAirbnb} = this.props;
    if (typeAirbnb === 'Airbnb') {
      return <AirbnbRating {...this.props} />;
    }
    return (
      <ScrollView>
        <Rating {...this.props} />
      </ScrollView>
    );
  }
}
