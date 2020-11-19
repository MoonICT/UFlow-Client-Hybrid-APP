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
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';F

// Local Imports
import DefaultStyle from '../../styles/default';

export default class Sample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={[
            DefaultStyle.container,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{marginBottom: 20, fontSize: 20}}>Sample</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Webview')}
            style={DefaultStyle.btn}>
            <Text>{'WebView Mode'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Camera')}
            style={DefaultStyle.btn}>
            <Text>{'Camera Mode'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Notification')}
            style={DefaultStyle.btn}>
            <Text>{'Notification Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Geolocations')}
            style={DefaultStyle.btn}>
            <Text>{'Geolocation Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TextFeild')}
            style={DefaultStyle.btn}>
            <Text>{'TextFeild Sample'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('testScreen')}
            style={DefaultStyle.btn}>
            <Text>{'testScreen Sample'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegisterWH')}
            style={DefaultStyle.btn}>
            <Text>{'RegisterWH Sample'}</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            {/*<Button
            title="카카오톡 공유하기"
            onPress={() =>
              NativeModules.RNKakaoSample.link(result => {
                console.log('카카오 링크 공유 실행', result);
              })
            }
          />*/}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 4,
    borderRadius: 5,
  },
});
