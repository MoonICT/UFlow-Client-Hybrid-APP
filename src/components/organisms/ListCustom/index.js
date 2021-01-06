/**
 * @author [Peter]
 * @create
 * @modify
 * @desc [description]
 */

import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { View, Text, Button } from 'react-native';
//Local Import
// import {styles} from './style';
import DefaultStyle from '@Styles/default';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
    };
  }
  Toggle = () => {};
  render() {
    const {
      title,
      listItems,
      customWrapper,
      customTitle,
      customItem,
    } = this.props;
    const { toggleMenu } = this.state;
    const listItem =
      listItems &&
      listItems.map((item, index) => {
        return (
          <View key={index}>
            <Button onPress={() => this.Toggle()}>
              <Text>{item.titleList}</Text>
            </Button>
            {item.listItem && toggleMenu &&
              item.listItem.map((el, number) => {
                return <Text>{el.titleItem}</Text>;
              })}
          </View>
        );
      });
    return (
      <List.Section
        style={[DefaultStyle._list, customWrapper]}
        title={title}
        titleStyle={customWrapper}
        {...this.props}>
        {listItem}
      </List.Section>
    );
  }
}

export default Lists;
