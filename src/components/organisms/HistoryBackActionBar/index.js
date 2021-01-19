/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 15:58:18
 * @modify date 2021-01-06 18:35:44
 * @desc [description]
 */

import React, { Component } from 'react';
// import {Appbar} from 'react-native-paper';
import { View } from 'react-native';

// Local Imports
import { styles } from './style';
import AppBar from '@Components/organisms/AppBar';
import DefaultStyle from '@Styles/default';
import { Appbar } from 'react-native-paper';

class HistoryBackActionBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, rightComponent } = this.props;
    return (
      <AppBar {...this.props}>
        <Appbar.Action
          icon="arrow-left"
          color="black"
          onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
          title={title}
          color="black"
          fontSize="16"
          titleStyle={DefaultStyle.headerTitle}
        />
        {rightComponent && rightComponent}
      </AppBar>
    );
  }
}

export default HistoryBackActionBar;
