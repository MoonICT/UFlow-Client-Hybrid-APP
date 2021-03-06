/**
 * @author [Life]
 * @desc [description]
 * */
import React, { Component, Fragment } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import { debounce } from 'lodash';

class AppGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      content: '',
    };
  }

  setDebounce = debounce(callback => {
    callback();
  });

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.title !== this.props.title) {
      this.setDebounce(() => {
        this.setState({
          active:
            this.props && this.props.title
              ? this.props.title
              : this.props.data && this.props.data[0].title,
          content:
            this.props.data &&
            this.props.data.length > 0 &&
            this.props.data[0].content,
        });
      });
    }
  }

  // componentDidMount() {
  //   const {title} = this.props;
  //   title
  //     ? this.setState({ active: this.props.title })
  //     : this.setState({
  //       active: this.props.data && this.props.data[0].title,
  //       content:  this.props.data && this.props.data[0].content

  //     });
  // }

  handlePress = item => {
    this.setState({ active: item.title, content: item.content });
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    const dataTitle = newProps.dataTitle;
    const data = newProps.data;
    const value = newProps.value;
    const title = newProps.title;
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
    const {
      data,
      titleProps,
      titleCenter,
      valueActive,
      titleActive,
    } = this.props;
    const { active } = this.state;

    if (this.props.type === 'controlTitleActive') {
      const { data, titleProps } = this.props;
      const tabItem =
        data &&
        data.map((item, index) => {
          return (
            <Button
              key={index}
              color={
                titleActive === item.title ? '#000000' : 'rgba(0, 0, 0, 0.54)'
              }
              onPress={() => {
                this.handlePress(item);
                titleProps && titleProps(item.title, index);
              }}
              style={[
                DefaultStyle._tabItem,
                titleActive === item.title ? DefaultStyle._tabItemActive : '',
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
                  flexDirection: 'row',
                  justifyContent: 'space-around',
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
            color={active === item.title ? '#000000' : 'rgba(0, 0, 0, 0.54)'}
            onPress={() => {
              this.handlePress(item);
              titleProps && titleProps(item);
            }}
            style={[
              DefaultStyle._tabItem,
              active === item.title ? DefaultStyle._tabItemActive : '',
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
