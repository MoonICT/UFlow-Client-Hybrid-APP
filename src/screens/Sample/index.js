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
            onPress={() => this.props.navigation.navigate('Pagination')}
            style={DefaultStyle.btn}>
            <Text>{'Pagination Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Rating')}
            style={DefaultStyle.btn}>
            <Text>{'Rating Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Progress')}
            style={DefaultStyle.btn}>
            <Text>{'Progress Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dialog')}
            style={DefaultStyle.btn}>
            <Text>{'Dialog Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SnackBar')}
            style={DefaultStyle.btn}>
            <Text>{'SnackBar Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Slider')}
            style={DefaultStyle.btn}>
            <Text>{'Slider Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Switch')}
            style={DefaultStyle.btn}>
            <Text>{'Switch Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AppBar')}
            style={DefaultStyle.btn}>
            <Text>{'AppBar Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ToggleButton')}
            style={DefaultStyle.btn}>
            <Text>{'ToggleButton Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Breadcrumb')}
            style={DefaultStyle.btn}>
            <Text>{'Breadcrumb Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Accordion')}
            style={DefaultStyle.btn}>
            <Text>{'Accordion Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SpeedDial')}
            style={DefaultStyle.btn}>
            <Text>{'SpeedDial Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List')}
            style={DefaultStyle.btn}>
            <Text>{'List Sample'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Table')}
            style={DefaultStyle.btn}>
            <Text>{'Table Sample'}</Text>
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
