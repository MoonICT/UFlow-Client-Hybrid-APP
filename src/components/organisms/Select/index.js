/**
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-community/picker';
// import RNPickerSelect from 'react-native-picker-select';
// Local Imports
import { debounce } from 'lodash';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';

export default class Selected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
      isToggle: false,
      indexActive: 0,
    };
  }
  _showSelect = () => this.setState({ isToggle: true });

  _hideSelect = () => this.setState({ isToggle: false });

  setDebounce = debounce(callback => {
    callback();
  });

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataDefault !== this.props.dataDefault) {
      this.setDebounce(() => {
        this.setState({ selectedValue: this.props.dataDefault.label });
      });
    }
  }

  componentDidMount() {
    const { dataDefault } = this.props;
    dataDefault
      ? this.setState({ selectedValue: dataDefault.label })
      : this.setState({ selectedValue: '' });
  }

  render() {
    const {
      data,
      labelSelected,
      labelSelectedSize,
      valueSelected,
      colorLabel,
      color,
      valueProps,
      indexProps,
      required,
    } = this.props;
    const { isToggle, selectedValue, indexActive } = this.state;
    // console.log('required',required);
    // console.log('valueSelected',valueSelected);
    const items =
      data &&
      data.map((item, index) => {
        return (
          <Text
            key={index}
            label={item.label}
            value={data[indexActive].value}
            style={DefaultStyle._itemSelected}
            onPress={() => {
              this.setState({
                value: item.value,
                selectedValue: item.label,
                isToggle: false,
                indexActive: index,
              });
              valueProps && valueProps(item.value);
              indexProps && indexProps(item.value, index);
            }}
            // itemStyle={DefaultStyle._itemSelected}
          >
            {item.label}
          </Text>
        );
      });
    // console.log('selectedValue :>> ', selectedValue);
    // const items =
    //   data &&
    //   data.map((item, index) => {
    //     return (
    //       <Picker.Item
    //         key={index}
    //         label={item.label}
    //          ={item.value}
    //         style={DefaultStyle._itemSelected}
    //         itemStyle={DefaultStyle._itemSelected}
    //       />
    //     );
    //   });
    return (
      <Fragment>
        <TouchableOpacity
          // {...this.props}
          onPress={() => this._showSelect()}
          style={[
            DefaultStyle._selected,
            { borderColor: required ? 'red' : '#cccccc' },
          ]}>
          {labelSelected ? (
            <Text
              style={[
                DefaultStyle._lableSelected,
                colorLabel ? { color: colorLabel } : null,
                labelSelectedSize ? { fontSize: labelSelectedSize } : null,
              ]}>
              {labelSelected}
            </Text>
          ) : null}
          <Text
            style={[
              DefaultStyle._textDefaultSelected,
              color ? { color: color } : null,
            ]}>
            {selectedValue ? selectedValue : valueSelected}
          </Text>
          {isToggle === true ? (
            <Icon name={'menu-up'} style={[styles.icon, { color: '#000' }]} />
          ) : (
            <Icon
              name={'menu-down'}
              style={[styles.icon, { color: 'rgba(0, 0, 0, 0.47)' }]}
            />
          )}
        </TouchableOpacity>
        <Portal>
          <Dialog visible={isToggle} onDismiss={() => this._hideSelect()}>
            <Dialog.Content>{items}</Dialog.Content>
          </Dialog>
        </Portal>
        {/**
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
       */}
      </Fragment>
    );
  }
}
