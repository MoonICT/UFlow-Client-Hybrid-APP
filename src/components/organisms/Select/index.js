/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { Picker } from '@react-native-community/picker';
import RNPickerSelect from 'react-native-picker-select';
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
    // const items =
    //   data &&
    //   data.map((item, index) => {
    //     return (
    //       <Picker.Item
    //         key={index}
    //         label={item.label}
    //         value={item.value}
    //         style={DefaultStyle._itemSelected}
    //         itemStyle={DefaultStyle._itemSelected}
    //       />
    //     );
    //   });
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
        <RNPickerSelect
          style={[DefaultStyle._textSelected]}
          selectedValue={this.state.selectedValue}
          value={this.state.selectedValue}
          onValueChange={value => {
            this.setState({ selectedValue: value });
            valueProps && valueProps(value);
          }}
          items={data}
          {...this.props}
        />
      </View>
    );
  }
}
