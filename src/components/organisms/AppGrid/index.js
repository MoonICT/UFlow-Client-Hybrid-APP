/**
 * @author [Life]
 * @desc [description]
 * */
import React, { Component, Fragment } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import DefaultStyle from '@Styles/default';

class AppGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.title ? props.title : props.data && props.data[0].title,
      content: props.data && props.data[0].content,
    };
  }
  handlePress = item => {
    this.setState({ active: item.title, content: item.content });
  };

  componentWillReceiveProps(newProps) {
    const dataTitle = newProps.dataTitle;
    const data = newProps.data;
    const value = newProps.value;
    const title = newProps.title;
    console.log('newProps :>> ', newProps);
    console.log('dataTitle :>> ', dataTitle);
    // if (value < data.length) {
    //   this.setState({ active: dataTitle.title });
    // }
    if (title !== this.state.active) {
      this.setState({ active: title });
    }
  }
  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { data, titleProps, titleCenter } = this.props;
    if (this.props.type === 'controlTitleActive') {
      const { data, titleProps } = this.props;
      const tabItem =
        data &&
        data.map((item, index) => {
          return (
            <Button
              key={index}
              color={
                this.props.titleActive === item.title
                  ? '#000000'
                  : 'rgba(0, 0, 0, 0.54)'
              }
              onPress={() => {
                this.handlePress(item);
                titleProps && titleProps(item.title, index);
              }}
              style={[
                DefaultStyle._tabItem,

                this.props.titleActive === item.title
                  ? DefaultStyle._tabItemActive
                  : '',
              ]}>
              {item.title}
            </Button>
          );
        });
      return (
        <Fragment>
          <ScrollView horizontal={true} style={DefaultStyle._tabGrid}>
            {!titleCenter && tabItem}
            {titleCenter && (
              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: windowWidth,
                }}>
                {tabItem}
              </View>
            )}
          </ScrollView>
          {this.state.content ? (
            <Text style={DefaultStyle._contentGrid}>{this.state.content}</Text>
          ) : null}
        </Fragment>
      );
    }
    const tabItem =
      data &&
      data.map((item, index) => {
        return (
          <Button
            key={index}
            color={
              this.state.active === item.title
                ? '#000000'
                : 'rgba(0, 0, 0, 0.54)'
            }
            onPress={() => {
              this.handlePress(item);
              titleProps && titleProps(item.title, index);
            }}
            style={[
              DefaultStyle._tabItem,
              this.state.active === item.title
                ? DefaultStyle._tabItemActive
                : '',
            ]}>
            {item.title}
          </Button>
        );
      });
    return (
      <Fragment>
        {
          <ScrollView horizontal={true} style={DefaultStyle._tabGrid}>
            {tabItem}
          </ScrollView>
        }
        {this.state.content ? (
          <Text style={DefaultStyle._contentGrid}>{this.state.content}</Text>
        ) : null}
      </Fragment>
    );
  }
}

export default AppGrid;
