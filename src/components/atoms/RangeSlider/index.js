/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Slider from "react-native-slider";

// Local Imports
import { styles } from './style';

class RangeSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <View style={[styles.container, this.props.contentStyle]}>
        <Slider
          style={styles.slider}
          thumbTintColor={'rgba(255,109,0,1)'}
          minimumTrackTintColor="rgba(255,109,0,1)"
          maximumTrackTintColor="rgba(255,109,0,0.38)"
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          {...this.props}
        />
        <View style={styles.labelWrap}>
          <Text style={[styles.label, { width: 50, textAlign: 'left' }]}>{this.props.LabelStart || '0'}</Text>
          <Text style={styles.label}>{this.props.LabelMiddle}</Text>
          <Text style={[styles.label, { width: 50, textAlign: 'right' }]}>{this.props.LabelEnd || '최대'}</Text>
        </View>
      </View>
    );
  }
}

// Check Props Type.
RangeSlider.protoType = {
  value: PropTypes.number,
  step: PropTypes.number,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
  LabelMiddle: PropTypes.string,
  contentStyle: PropTypes.object,
  onValueChange: PropTypes.func,
};

export default RangeSlider;
