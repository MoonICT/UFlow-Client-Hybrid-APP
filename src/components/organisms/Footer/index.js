/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Platform} from 'react-native';
import {List, Button} from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import Lists from '@Components/organisms/List';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data} = this.props;
    console.log('data', data);
    return (
      <View>
        <Lists
          customWrapper={DefaultStyle._wrapperFooter}
          customItem={DefaultStyle._wrapperTitle}
          listItems={data}
        />
      </View>
    );
  }
}

export default Footer;
