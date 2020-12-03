/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

// Local Imports
import DefaultStyle from '@Styles/default';
class TableInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  render() {
    const {
      data,
      styleLeft,
      styleRight,
      borderRow,
      style,
      borderBottom,
    } = this.props;
    return (
      <Fragment>
        {data &&
          data.map((item, index) => {
            return (
              <View
                style={[
                  DefaultStyle._rowTable,
                  style,
                  borderRow === false ? DefaultStyle._border0 : null,
                  borderBottom === true ? DefaultStyle._borderBottom : null,
                ]}
                key={index}>
                <View style={[DefaultStyle._leftInfoTable, styleLeft]}>
                  <Text style={DefaultStyle._leftTitleTable}>
                    {item.type && item.type}
                  </Text>
                  {item.note ? (
                    <Text style={DefaultStyle._leftContentTable}>
                      {item.note}
                    </Text>
                  ) : null}
                </View>
                <Text
                  style={[
                    DefaultStyle._rightInfoTable,
                    styleRight,
                    item && item.highlight === true
                      ? DefaultStyle._highlightInfoTable
                      : item.highlight === false
                      ? DefaultStyle._completeInfoTable
                      : null,
                  ]}>
                  {item.value ? item.value : '-'}
                </Text>
              </View>
            );
          })}
      </Fragment>
    );
  }
}

// Check Props Type.
TableInfo.protoType = {
  data: PropTypes.array,
  borderRow: PropTypes.bool,
  style: PropTypes.object,
  styleRight: PropTypes.object,
  styleLeft: PropTypes.object,
  label: PropTypes.string,
};
export default TableInfo;
