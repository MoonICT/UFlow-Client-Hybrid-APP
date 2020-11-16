/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component, Fragment} from 'react';
import {TextInput} from 'react-native-paper';
import DefaultStyle from '@Styles/default';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    return (
      <TextInput
        style={DefaultStyle._inputSearch}
        mode="outlined"
        left={
          <TextInput.Icon
            style={DefaultStyle._searchIcon}
            name={'search-web'}
          />
        }
        right={
          <TextInput.Icon
            style={DefaultStyle._searchRightIcon}
            name={'close'}
          />
        }
        {...this.props}
      />
    );
  }
}

export default AppComponent;
