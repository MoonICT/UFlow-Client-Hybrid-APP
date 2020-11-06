/**
 * Camera for read barcode
 *
 * @format
 * @flow strict-local
 * */
import React, {Component} from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
  }

  // on close camera
  _onClose() {
    this.props.onClose();
  }

  // On code scan
  _onBarCodeRead(result) {
    this.props.onScanComplete(result);
  }

  render() {
    return (
      <SafeAreaView style={styles.BarcodeScanner}>
        <View style={styles.BarcodeScannerContainer}>
          {/** Overlay Style */}
          <View style={styles.overlayContainer}>
            <View style={[styles.overlayInner, styles.overlayInnerTop]} />
            <View style={[styles.overlayInner, styles.overlayInnerMiddle]}>
              <View style={[styles.overlayInner, styles.overlayInnerRight]} />
              <View style={[styles.overlayInner, styles.overlayInnerCenter]} />
              <View style={[styles.overlayInner, styles.overlayInnerLeft]} />
            </View>
            <View style={[styles.overlayInner, styles.overlayInnerBottom]}>
              <Text style={{color: '#fff'}}>
                {'카메라에 바코드 또는 QR코드를 인식시켜 주세요.'}
              </Text>
            </View>
          </View>
          {/** Camera */}
          <RNCamera
            style={styles.BarcodeScannerCamera}
            onBarCodeRead={result => this._onBarCodeRead(result)}
            captureAudio={false}
          />
          {/** Bottom */}
          <TouchableOpacity
            style={styles.BarcodeScannerBtnDefault}
            activeOpacity={1}
            onPress={() => this._onClose()}>
            <Text style={styles.BarcodeScannerBarCodeText}>{'닫기'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  BarcodeScanner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 30,
  },
  BarcodeScannerContainer: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: 1,
  },
  overlayInner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlayInnerTop: {
    flex: 0.5,
  },
  overlayInnerMiddle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flex: 2,
  },
  overlayInnerBottom: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayInnerCenter: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flex: 2,
  },
  overlayInnerLeft: {
    flex: 0.2,
  },
  overlayInnerRight: {
    flex: 0.2,
  },
  BarcodeScannerCamera: {
    flex: 1,
  },
  BarcodeScannerBtnDefault: {
    backgroundColor: '#773000',
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 65 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  BarcodeScannerBarCodeText: {
    color: '#ffffff',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
    fontWeight: 'bold',
  },
});
