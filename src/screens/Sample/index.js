/**
 * Sample Screen
 * 샘플 화면 입니다.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */
// Global Imports
import React, { Component } from 'react';
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
            { justifyContent: 'center', alignItems: 'center' },
          ]}>
          <Text style={{ marginBottom: 20, fontSize: 20 }}>Sample</Text>
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DetailsWH')}
            style={DefaultStyle.btn}>
            <Text>{'DetailsWH Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Annoucement')}
            style={DefaultStyle.btn}>
            <Text>{'Annoucement Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FAQ')}
            style={DefaultStyle.btn}>
            <Text>{'FAQ Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AvaliableChate')}
            style={DefaultStyle.btn}>
            <Text>{'AvaliableChate Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProprietorMypage')}
            style={DefaultStyle.btn}>
            <Text>{'ProprietorMypage Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TenantMypage')}
            style={DefaultStyle.btn}>
            <Text>{'TenantMypage Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Consulting')}
            style={DefaultStyle.btn}>
            <Text>{'Consulting Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Chat')}
            style={DefaultStyle.btn}>
            <Text>{'Chat Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Terms')}
            style={DefaultStyle.btn}>
            <Text>{'Terms Sample'}</Text>
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
