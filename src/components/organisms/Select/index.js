/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import { Platform ,View, Text } from 'react-native';
import { Picker,PickerIOS } from '@react-native-community/picker';

// Local Imports
import DefaultStyle from '@Styles/default';

export default class Selected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.data[0].value,
    };
  }

  render() {
    const { data, labelSelected, colorLabel, valueProps } = this.props;
    const checkPlatForm = Platform.OS === "ios";
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

      const itemsIOS =
      data &&
      data.map((item, index) => {
        return (
          <PickerIOS.Item
            key={index}
            label={item.label}
            value={item.value}
            style={DefaultStyle._itemSelected}
            itemStyle={DefaultStyle._itemSelected}
          />
        );
      });


    return (
      <View style={DefaultStyle._selected}>
        {labelSelected ? (
          <Text
            style={[
              DefaultStyle._lableSelected,
              colorLabel ? { color: colorLabel } : null,
            ]}>
            {labelSelected}
          </Text>
        ) : null}
    {checkPlatForm ?
        <PickerIOS
          style={DefaultStyle._textSelected}
          mode="dropdown"
          selectedValue={this.state.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedValue: itemValue });
            valueProps && valueProps(itemValue);
          }}
          {...this.props}>
          {itemsIOS}
        </PickerIOS>
:
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
        </Picker>}
      </View>
    );
  }
}
