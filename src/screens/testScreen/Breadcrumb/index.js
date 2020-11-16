/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import DefaultStyle from '@Styles/default';

export default class BreadcrumbScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {valueBtn: 'left'};
  }
  render() {
    return (
      <ScrollView>
        <Text style={DefaultStyle.titleDf}>Breadcrumb</Text>
        <View style={DefaultStyle._breadcrumb}>
          <View style={DefaultStyle._itemBreadcrumb}>
            <Button
              icon={'home'}
              style={DefaultStyle._iconBreadcrumb}
              color={'rgba(0, 0, 0, 0.54)'}
            />
            <Text>Material-UI</Text>
            <Text style={DefaultStyle._separator}>/</Text>
          </View>
          <View style={DefaultStyle._itemBreadcrumb}>
            <Button
              icon={'home'}
              style={DefaultStyle._iconBreadcrumb}
              color={'rgba(0, 0, 0, 0.54)'}
            />
            <Text>Core</Text>
            <Text style={DefaultStyle._separator}>/</Text>
          </View>
          <View style={DefaultStyle._itemBreadcrumb}>
            <Button
              icon={'star'}
              style={[
                DefaultStyle._iconBreadcrumb,
                DefaultStyle._activeIconBreadcrumb,
              ]}
              color={'rgba(0, 0, 0, 0.54)'}
            />
            <Text>Breadcrumb</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
