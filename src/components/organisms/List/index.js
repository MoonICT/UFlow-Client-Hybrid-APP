/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-13 11:03:45
 * @modify date 2020-11-13 11:44:30
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
    const {children, title, listItems} = this.props;
    console.log('listItems', listItems);
    const listItem =
      listItems &&
      listItems.map((item, index) => {
        return (
          <List.Accordion
            style={DefaultStyle._titleList}
            key={index}
            title={item.titleList}
            left={props => <List.Icon {...props} icon={item.icon} />}>
            <List.Item
              style={DefaultStyle._itemList}
              title="First item"
              left={props => <List.Icon {...props} icon="star" />}
            />
            <List.Item style={DefaultStyle._itemList} title="Second item" />
          </List.Accordion>
        );
      });
    return (
      <List.Section style={DefaultStyle._list} title={title}>
        {listItem}
      </List.Section>
    );
  }
}

export default Lists;
