/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
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
          style={[styles.checkbox, this.props.checked ? styles.checked : styles.unchecked, (this.props.disabled && styles.disabled)]}>
          {this.props.checked &&
          <Icon name={'check'} style={[styles.icon, (this.props.disabled && styles.disabled)]} />}
        </View>
        <Text style={styles.label}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default Checkbox;
