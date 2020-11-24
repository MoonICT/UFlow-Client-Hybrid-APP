/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-13 11:03:45
 * @modify date 2020-11-24 18:30:18
 * @desc [description]
 */

import React, {Component} from 'react';
import {List} from 'react-native-paper';
//Local Import
// import {styles} from './style';

class TreeViews extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {children} = this.props;
    return (
      <List.Section title="treeview" {...this.props}>
        {children}
      </List.Section>
    );
  }
}

export default TreeViews;
