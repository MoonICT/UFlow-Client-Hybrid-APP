/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';

import { styles as S } from './style';

class TableInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  render() {
    const { data } = this.props;
    console.log('data', data);
    // item && item.highlight === true ? DefaultStyle._highlightInfoTable : null;
    return (
      <Fragment>
        {data &&
          data.map((item, index) => {
            return (
              <View style={DefaultStyle._rowTable} key={index}>
                <View style={DefaultStyle._leftInfoTable}>
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
                    item && item.highlight === true
                      ? DefaultStyle._highlightInfoTable
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

export default TableInfo;
