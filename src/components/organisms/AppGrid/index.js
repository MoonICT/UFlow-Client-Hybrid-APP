/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component, Fragment} from 'react';
import {StyleSheet, ScrollView, Text, View, Platform} from 'react-native';
import {List, Button} from 'react-native-paper';
import DefaultStyle from '@Styles/default';

class AppGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.data && props.data[0].title,
      content: props.data && props.data[0].content,
    };
  }
  handlePress = item => {
    console.log('item', item);
    this.setState({active: item.title, content: item.content});
  };
  render() {
    const {data} = this.props;
    console.log('active', this.state.active);

    const tabItem =
      data &&
      data.map((item, index) => {
        return (
          <Button
            key={index}
            color={
              this.state.active === item.title
                ? '#000000'
                : 'rgba(0, 0, 0, 0.54)'
            }
            onPress={() => this.handlePress(item)}
            style={[
              DefaultStyle._tabItem,
              this.state.active === item.title
                ? DefaultStyle._tabItemActive
                : '',
            ]}>
            {item.title}
          </Button>
        );
      });
    return (
      <Fragment>
        <ScrollView horizontal={true} style={DefaultStyle._tabGrid}>
          {tabItem}
        </ScrollView>
        <Text style={DefaultStyle._contentGrid}>{this.state.content}</Text>
      </Fragment>
    );
  }
}

export default AppGrid;