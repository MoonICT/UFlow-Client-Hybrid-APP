/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Local Imports
import { styles } from './style';

class FilterButton extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <TouchableOpacity {...this.props} style={[
        this.props.isToggle ? styles.buttonOn : styles.buttonOff,
        styles.button,
        this.props.style
      ]}>
        <Text>{this.props.label}</Text>
        {this.props.isToggle ?
          <Icon name={'menu-up'} style={[styles.icon, { color: '#000' }]} /> :
          <Icon name={'menu-down'} style={[styles.icon, { color: 'rgba(0, 0, 0, 0.47)' }]} />}
      </TouchableOpacity>
    );
  }
}

// Check Props Type.
FilterButton.protoType = {
  isToggle: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.string,
};

export default FilterButton;
