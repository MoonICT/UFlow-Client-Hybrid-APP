/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-17 17:45:46
 * @modify date 2020-11-24 18:38:40
 * @desc [description]
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Local import
import { styles } from './style';
import { color } from '@Themes/colors';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    console.log('route', navigation.state.routeName);
    return (
      <View style={styles.tabContainer}>
        <View style={styles.itemTab}>
          {<Icon name="home" size={24} color="rgba(0, 0, 0, 0.54)" />}
        </View>
        <View style={styles.itemTab}>
          {<Icon name="search" size={24} color="rgba(0, 0, 0, 0.54)" />}
        </View>
        <View style={styles.itemTab}>
          {<Icon name="message" size={24} color="rgba(0, 0, 0, 0.54)" />}
        </View>
        <View style={styles.itemTab}>
          {<Icon name="more" size={24} color="rgba(0, 0, 0, 0.54)" />}
        </View>
      </View>
    );
  }
}

export default Footer;
