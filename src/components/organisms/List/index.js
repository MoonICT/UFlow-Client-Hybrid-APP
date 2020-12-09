/**
 * @author [Peter]
 * @create
 * @modify
 * @desc [description]
 */

import React, { Component } from 'react';
import { List } from 'react-native-paper';
//Local Import
// import {styles} from './style';
import DefaultStyle from '@Styles/default';

class Lists extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      listItems,
      customWrapper,
      customTitle,
      customItem,
    } = this.props;
    const listItem =
      listItems &&
      listItems.map((item, index) => {
        return (
          <List.Accordion
          color={'green'}
            style={[DefaultStyle._titleList]}
            key={index}
            title={item.titleList}
            titleStyle={customTitle}
            left={
              item.icon
                ? props => <List.Icon {...props} icon={item.icon} />
                : null
            }>
            {item.listItem &&
              item.listItem.map((el, number) => {
                return (
                  <List.Item
                    key={number}
                    style={DefaultStyle._itemList}
                    titleStyle={customItem}
                    title={el.titleItem}
                    left={
                      el.iconItem
                        ? props => <List.Icon {...props} icon={el.iconItem} />
                        : null
                    }
                  />
                );
              })}
          </List.Accordion>
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
