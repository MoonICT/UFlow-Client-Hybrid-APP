/**
 * Webview Header Component
 *
 * @format
 * @flow strict-local
 * */
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchURL: this.props.defaultURL,
    };
  }

  // Submit search url
  // This is Sample, so change it if necessary.
  _SearchSubmit() {
    let url = this.state.searchURL.toLocaleLowerCase();
    let regexProtocol = /^http[s]?\:\/\//i;
    if (!regexProtocol.test(url)) {
      url = 'http://' + url;
    }
    this.setState({
      searchURL: url,
    });
    this.props.onChangeUrl({
      searchURL: url,
    });
  }

  render() {
    let Loading = null;
    // If web page is loading, indicator is displayed.
    if (this.state.isLoading) {
      Loading = (
        <ActivityIndicator
          color="#ccc"
          style={{backgroundColor: '#ddd', paddingRight: 4}}
        />
      );
    }
    return (
      <View style={styles.WebViewHeader}>
        <TextInput
          style={styles.WebViewHeaderInput}
          returnKeyType="search"
          value={this.state.searchURL}
          onChangeText={text => {
            this.setState({searchURL: text})
          }}
          onSubmitEditing={() => this._SearchSubmit()}
        />
        {Loading}
      </View>
    );
  }

  // 컴포넌트가 만들어지고 render가 호출된 이후에 호출.
  // 비동기 요청을 처리하는 부분.
  componentDidMount() {
    console.log('::componentDidMount::');
  }
}

const styles = StyleSheet.create({
  WebViewHeader: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  WebViewHeaderInput: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#ddd',
    flex: 1,
  },
});
