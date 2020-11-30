/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component, Fragment} from 'react';
import { ScrollView, Text } from 'react-native';
import { Button} from 'react-native-paper';
import DefaultStyle from '@Styles/default';

class AppGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.data && props.data[0].title,
      content: props.data && props.data[0].content,
    };
  }
  handlePress = item => {
    console.log('item', item);
    this.setState({ active: item.title, content: item.content });
  };
  render() {
<<<<<<< HEAD
    const { data } = this.props;
=======
    const {data} = this.props;
>>>>>>> origin/1929-Life

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
              item.onPress;
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
        <ScrollView horizontal={true} style={DefaultStyle._tabGrid}>
          {tabItem}
        </ScrollView>
<<<<<<< HEAD
        {this.state.content ? (
=======
        {this.state.content !== '' ? (
>>>>>>> origin/1929-Life
          <Text style={DefaultStyle._contentGrid}>{this.state.content}</Text>
        ) : null}
      </Fragment>
    );
  }
}

export default AppGrid;
