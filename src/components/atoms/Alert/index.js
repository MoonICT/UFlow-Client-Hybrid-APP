/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:39:42
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
          {this.props.type === 'ERROR' &&
          <Icon style={[styles.icon, { color: colorVariant.ERROR.icon }]} name={'alert-circle-outline'} />}
          {this.props.type === 'WARNING' &&
          <Icon style={[styles.icon, { color: colorVariant.WARNING.icon }]} name={'alert-outline'} />}
          {this.props.type === 'INFO' &&
          <Icon style={[styles.icon, { color: colorVariant.INFO.icon }]} name={'information-outline'} />}
          {this.props.type === 'SUCCESS' &&
          <Icon style={[styles.icon, { color: colorVariant.SUCCESS.icon }]} name={'check-circle-outline'} />}
          <View>
            {this.props.title && <Text style={[styles.title]}>{this.props.title}</Text>}
            {this.props.content && <Text style={[styles.content]}>{this.props.content}</Text>}
          </View>
        </View>
        <TouchableOpacity onPress={this.props.onPress}>
          {this.props.buttonText ? <Text style={[styles.font, { color: colorVariant[this.props.type].text }]}>
            {this.props.buttonText}
          </Text> : <Icon style={styles.iconClose} name={'close'} />}
        </TouchableOpacity>
      </View>
    );
  }
}

// Check Props Type.
Checkbox.protoType = {
  type: PropTypes.oneOf(['ERROR', 'WARNING', 'INFO', 'SUCCESS']),
  title: PropTypes.string,
  contents: PropTypes.string,
  buttonText: PropTypes.string,
};

export default Checkbox;
