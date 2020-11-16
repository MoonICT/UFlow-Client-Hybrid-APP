/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component, Fragment} from 'react';
import {StyleSheet, ScrollView, Text, View, Platform} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  handlePress = item => {
    console.log('item', item);
    this.setState({active: item.title, content: item.content});
  };
  render() {
    const {data} = this.props;

    return (
      <TextInput
        style={DefaultStyle._inputSearch}
        mode="outlined"
        left={
          <TextInput.Icon
            style={DefaultStyle._searchIcon}
            name={'search-web'}
          />
        }
        right={
          <TextInput.Icon
            style={DefaultStyle._searchRightIcon}
            name={'close'}
          />
        }
        {...this.props}
      />
    );
  }
}

export default AppComponent;
