import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,  ActivityIndicator, Modal } from 'react-native';

// Local Imports
import { styles } from './style';

class Loading extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const {loading,onRequestClose} = this.props;
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} size="large" color="#ff6d00" />
          </View>
        </View>
      </Modal>
    );
  }
}

// Check Props Type.
Loading.protoType = {
  loading: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default Loading;
