/**
 * @author [Life]
 * @create
 * @modify
 * @desc [description]
 */

import React, { Component } from 'react';
import { View } from 'react-native';
//Local Import
import * as ProgressNative from 'react-native-progress';
import PropTypes from "prop-types";

class Progress extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { type, progress } = this.props;

    if (type === 'Pie') {
      return <ProgressNative.Pie progress={progress} size={50} />;
    }
    if (type === 'Circle') {
      return (
        <ProgressNative.Circle indeterminate={true} progress={progress} size={50} />
      );
    }
    if (type === 'CircleSnail') {
      return (
        <View style={{
          width: '100%',
          alignItems: 'center',
          flex: 1,
          height: (40 + 32),
        }}>
          <View style={{ width: 40, }}>
            <ProgressNative.CircleSnail color={'#ff6d00'} />
          </View>
        </View>
      );
    }
    return <ProgressNative.Bar progress={progress} width={200} />;
  }
}

// Check Props Type.
Progress.defaultProps = {
  type: 'CircleSnail',
  progress: 0,
};
Progress.protoType = {
  type: PropTypes.string,
  progress: PropTypes.number,
};


export default Progress;
