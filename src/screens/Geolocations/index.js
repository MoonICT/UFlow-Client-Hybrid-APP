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
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Local Imports
import DefaultStyle from '../../styles/default';

export default class Geolocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchID: 0,
      latitude: 0,
      longitude: 0,
    };
  }

  /**
   * Invokes the success callback whenever the location changes.
   * */
  _watchPosition() {
    let watchID = Geolocation.watchPosition(
      (info) => {
        console.log('Watch Position ::: ', info);
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 300,
        maximumAge: 3600000,
        distanceFilter: 1,
      });
    // for Clear watch
    this.setState({watchID: watchID});
  }

  /**
   * Clear watch
   * */
  _clearWatch() {
    Geolocation.clearWatch(this.state.watchID);
  }

  /**
   * Invokes the success callback once with the latest location info.
   * */
  _getCurrentPosition() {
    console.log('::::: Get Current Position :::::');
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 300,
        maximumAge: 3600000,
        distanceFilter: 1,
      },
    );
  }

  render() {
    return (
      <SafeAreaView
        style={[
          DefaultStyle.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{marginBottom: 20, fontSize: 20}}>Geoloaction</Text>
        <TouchableOpacity onPress={() => this._getCurrentPosition()} style={DefaultStyle.btn}><Text>{'Get Current Position(Check Console...)'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this._watchPosition()} style={DefaultStyle.btn}><Text>{'Watch Position'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this._clearWatch()} style={DefaultStyle.btn}><Text>{'Clear Watch Position'}</Text></TouchableOpacity>
        <Text>{'Watch ID : '}{this.state.watchID}</Text>
        <Text>{'Latitude : '}{this.state.latitude}</Text>
        <Text>{'Longitude : '}{this.state.longitude}</Text>
      </SafeAreaView>
    );
  }

  // 컴포넌트가 만들어지고 render가 호출된 이후에 호출.
  // 비동기 요청을 처리하는 부분.
  async componentDidMount() {
    console.log('::componentDidMount::::Home');
  }
}
