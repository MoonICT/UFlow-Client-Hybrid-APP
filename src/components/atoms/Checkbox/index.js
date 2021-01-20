/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:39:29
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Local Imports
import { styles } from './style';

class Checkbox extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <TouchableOpacity style={styles.container}
                        onPress={() => {
                          if (!this.props.disabled) {
                            this.props.onPress();
                          }
                        }}>
        <View
          style={[styles.checkbox, this.props.checked ? (styles.checked || this.props.borderChecked) : (styles.unchecked ,(this.props.disabled && styles.disabled) || this.props.borderUnchecked) ]}>
          {this.props.checked &&
          <Icon name={'check'} style={[styles.icon, (this.props.disabled && styles.disabled)]} />}
        </View>
        <Text style={styles.label}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

// Check Props Type.
Checkbox.protoType = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  borderUnchecked: PropTypes.object,
  borderChecked: PropTypes.object,
};

export default Checkbox;
