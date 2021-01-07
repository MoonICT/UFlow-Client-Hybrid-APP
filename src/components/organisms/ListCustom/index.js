/**
 * @author [Peter]
 * @create
 * @modify
 * @desc [description]
 */

import React, { Component } from 'react';
import { List, Button } from 'react-native-paper';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//Local Import
// import {styles} from './style';
import DefaultStyle from '@Styles/default';
const windowWidth = Dimensions.get('window').width;
class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: [false, -1],
    };
  }
  handleClick = index => {
    const { toggle } = this.state;
    this.setState({ toggle: [!toggle[0], index] });
  };
  render() {
    const {
      title,
      listItems,
      customWrapper,
      customTitle,
      customItem,
    } = this.props;
    const { toggle } = this.state;
    const listItem =
      listItems &&
      listItems.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              position: 'relative',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => this.handleClick(index)}
              style={{
                flex: 1,
                flexDirection: 'row',
                position: 'relative',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                {item.titleList}
              </Text>
              {item.listItem && (
                <View
                  style={{
                    position: 'absolute',
                    right: -23,
                    top: -10,
                  }}>
                  <Icon.Button
                    size={20}
                    backgroundColor="transparent"
                    color="white"
                    name={`chevron-${!toggle[0] ? 'down' : 'up'}`}
                  />
                </View>
              )}
            </TouchableOpacity>
            {item.listItem && toggle[0] && toggle[1] === index && (
              <View style={{ marginBottom: 15 }}>
                {item.listItem.map((el, number) => {
                  return (
                    <Text
                      style={{
                        color: 'white',
                        paddingLeft: 30,
                        marginTop: 15,
                        fontSize: 14,
                      }}>
                      {el.titleItem}
                    </Text>
                  );
                })}
              </View>
            )}
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
