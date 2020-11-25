/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';

// Local Imports
import DefaultStyle from '@Styles/default';

export default class Selected extends Component {
  constructor(props) {
    super(props);
    this.countNotification = 0;
    this.state = {
      checked: props.data[0].value,
    };
  }

  render() {
    const { data, labelSelected, colorLabel, valueProps } = this.props;
    const items =
      data &&
      data.map((item, index) => {
        return (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value}
            style={DefaultStyle._itemSelected}
            itemStyle={DefaultStyle._itemSelected}
          />
        );
      });
    return (
      <View style={DefaultStyle._selected} valueState={this.state.checked}>
        {labelSelected ? (
          <Text
            style={[
              DefaultStyle._lableSelected,
              colorLabel ? { color: colorLabel } : null,
            ]}>
            {labelSelected}
          </Text>
        ) : null}
        <Picker
          style={DefaultStyle._textSelected}
          mode="dropdown"
          selectedValue={this.state.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedValue: itemValue });
            valueProps && valueProps(itemValue);
          }}
          {...this.props}>
          {items}
        </Picker>
      </View>
    );
  }
}
