/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Global Imports
import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';

// Local Imports
import DefaultStyle from '../../styles/default';
import ActionCreator from '../../actions';
import BarcodeScanner from '../../components/organisms/BarcodeScanner';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      temp: 'Temp Data',
    };
  }

  /*
   * React Component Lifecycle
   * - Mount
   *    getDerivedStateFromProps => render => componentDidMount
   * - Update
   *    getDerivedStateFromProps => shouldComponentUpdate(true) => render => getSnapshotBeforeUpdate => componentDidMount
   * */

  // 컴포넌트 업데이트 직전에 호출되는 메소드다.
  // props 또는 state가 변경되었을 때, 재랜더링을 여부를 return 값으로 결정한다.
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  // 컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행되는 메소드다.
  // 컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용하다.
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  /**
   * [BarcodeScanner]
   * 바코드 스캔 결과 처리.
   * */
  _onScanBarcodeComplete(result) {
    console.debug('::: _onScanBarcodeComplete :::', result);
    Alert.alert('Scan Complete!', '바코드 스캔이 완료되었습니다.', [
      {
        text: '확인',
        style: 'cancel',
      },
    ]);
  }

  // 컴포넌트 랜더링.
  render() {
    return (
      <SafeAreaView style={DefaultStyle.container}>
        <BarcodeScanner onScanComplete={result => this._onScanBarcodeComplete(result)}
                        onClose={() => {
                          this.props.navigation.navigate('Sample');
                        }} />
      </SafeAreaView>
    );
  }

  // 컴포넌트가 만들어지고 render가 호출된 이후에 호출.
  // 비동기 요청을 처리하는 부분.
  async componentDidMount() {
    console.log('::componentDidMount::');
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {};
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
