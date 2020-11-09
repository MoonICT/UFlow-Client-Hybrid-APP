/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 15:58:18
 * @modify date 2020-11-09 16:12:50
 * @desc [description]
 */

import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';

// Local Imports
import {styles} from './style';
import DefaultStyle from '@Style/default';

class AppBars extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {children} = this.props;
    return (
      <Appbar.Header style={[DefaultStyle.header, styles.container]}>
        {children}
      </Appbar.Header>
    );
  }
}

export default AppBars;
