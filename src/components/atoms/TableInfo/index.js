/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { Linking, View } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

// Local Imports
import DefaultStyle from '@Styles/default';

class TableInfo extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  render () {
    const {
      data,
      styleLeft,
      styleRight,
      borderRow,
      style,
      borderBottom,
    } = this.props;
    return (
      <View>
        {data && data.length > 0 && data.map((item, index) =>
         item.type ? <View
            style={[
              DefaultStyle._rowTable,
              style,
              borderRow === false ? DefaultStyle._border0 : null,
              borderBottom === true ? DefaultStyle._borderBottom : null,
            ]}
            key={index}>
            <View style={[DefaultStyle._leftInfoTable, styleLeft]}>
              {item.type &&
              <Text style={DefaultStyle._leftTitleTable}>
                {item.type ? item.type : '-'}
              </Text>}

              {item.note ? (
                <Text style={DefaultStyle._leftContentTable}>
                  {item.note ? item.note : '-'}
                </Text>
              ) : null}
            </View>

            {item.isImageLink ? (
              <Text
                style={[
                  DefaultStyle._rightInfoTable,
                  DefaultStyle.linkColor,
                  styleRight,
                ]}
                onPress={() => Linking.openURL(item.value)}>
                {item.fileName ? item.fileName : '-'}
              </Text>
            ) : (
              <Text
                style={[
                  DefaultStyle._rightInfoTable,
                  styleRight,
                  item && item.highlight === true
                    ? DefaultStyle._highlightInfoTable
                    : item.highlight === false
                    ? DefaultStyle._completeInfoTable
                    : '',
                  item && item.colorValue
                    ? { color: item.colorValue }
                    : '',
                ]}>
                {item.value ? item.value : '-'}
              </Text>
            )}
          </View>
        : null
          )}
      </View>
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
