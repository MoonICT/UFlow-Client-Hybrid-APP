/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-13 11:03:45
 * @modify date 2020-11-24 18:38:17
 * @desc [description]
 */

import React, {Component} from 'react';
import {Menu} from 'react-native-paper';
//Local Import
// import {styles} from './style';

class Menus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Menu {...this.props} />;
  }
}

export default Menus;
