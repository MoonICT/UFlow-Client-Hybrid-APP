/**
 * @author [Peter]
 * @create
 * @modify
 * @desc [description]
 */

import React, {Component} from 'react';
import {List} from 'react-native-paper';
//Local Import
// import {styles} from './style';
import DefaultStyle from '@Styles/default';

class Lists extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {title, listItems, customWrapper, customItem} = this.props;
    const listItem =
      listItems &&
      listItems.map((item, index) => {
        return (
          <List.Accordion
            style={[DefaultStyle._titleList, customItem]}
            key={index}
            title={item.titleList}
            titleStyle={customItem}
            left={props => <List.Icon {...props} icon={item.icon} />}>
            {item.listItem &&
              item.listItem.map((el, number) => {
                return (
                  <List.Item
                    key={number}
                    style={DefaultStyle._itemList}
                    titleStyle={customItem}
                    title={el.titleItem}
                    left={props => <List.Icon {...props} icon={el.iconItem} />}
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
        {...this.props}>
        {listItem}
      </List.Section>
    );
  }
}

export default Lists;
