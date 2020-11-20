/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Local Imports
import { styles } from './style';
import { color } from '@Themes/colors';

const colorVariant = {
  SUCCESS: {
    type: 'SUCCESS',
    bg: color.success.background,
    text: color.success.text,
    icon: color.success.dark,
  },
  INFO: {
    type: 'INFO',
    bg: color.info.background,
    text: color.info.text,
    icon: color.info.dark,
  },
  WARNING: {
    type: 'WARNING',
    bg: color.warning.background,
    text: color.warning.text,
    icon: color.warning.dark,
  },
  ERROR: {
    type: 'ERROR',
    bg: color.error.background,
    text: color.error.text,
    icon: color.error.dark,
  },
};

class Checkbox extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <View style={[styles.container, {
        backgroundColor: colorVariant[this.props.type].bg
      }]}>
        <View style={styles.labelWrap}>
          <Icon style={styles.icon} name={'alert-circle-outline'} />
          <Text style={[styles.font]}>
            {'이 지역 UFLOW 추천 광고 보기'}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={[styles.font]}>
            {'확인'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Check Props Type.
Checkbox.protoType = {
  type: PropTypes.oneOf(['ERROR', 'WARNING', 'INFO', 'SUCCESS']),
};

export default Checkbox;
