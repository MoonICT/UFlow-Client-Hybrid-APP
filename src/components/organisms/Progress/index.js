/**
 * @author [Life]
 * @create
 * @modify
 * @desc [description]
 */

import React, {Component} from 'react';
//Local Import
import * as ProgressNative from 'react-native-progress';

class Progress extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {type} = this.props;
    if (type === 'Pie') {
      return <ProgressNative.Pie progress={0.4} size={50} />;
    }
    if (type === 'Circle') {
      return (
        <ProgressNative.Circle indeterminate={true} progress={0.3} size={200} />
      );
    }
    if (type === 'CircleSnail') {
      return (
        <ProgressNative.CircleSnail
          indeterminate={true}
          progress={0.3}
          size={200}
        />
      );
    }
    return <ProgressNative.Bar progress={0.3} width={200} />;
  }
}

export default Progress;
