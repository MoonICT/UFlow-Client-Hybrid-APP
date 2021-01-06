/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 15:58:18
 * @modify date 2021-01-06 18:11:04
 * @desc [description]
 */

import React, { Component } from 'react';
// import {Appbar} from 'react-native-paper';
import { View, Text } from 'react-native';

// Local Imports
import { styles } from './style';
import DefaultStyle from '@Styles/default';

class AppBars extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children, isHide = false } = this.props;
    return (
      <>
        {isHide ? null : (
          <View
            style={[
              DefaultStyle.header,
              styles.container,
              this.props.customStyle,
            ]}
            {...this.props}>
            {children}
          </View>
        )}
      </>
    );
  }
}

export default AppBars;
